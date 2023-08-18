const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require('cors');
const iconv = require('iconv-lite');


app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const itemdb = mysql.createConnection({
    user:"root",
    host : "localhost",
    password:"0000",
    database:"itemdb",
});
const spawn = require('child_process').spawn;


itemdb.connect();

app.get('/api/data', (req, res) => {
    const query = 'SELECT * FROM itemdb';
    itemdb.query(query, (err, rows) => {
      
      res.json(rows);
    });
  });

app.get('/api/user/:userID/recommend', (req, res) => {

      const { userID } = req.params;
      const query = 'SELECT userTaste,userTasteDetail,userRebuy,userTexture,userFunction FROM userinfo WHERE userID = ? ;';
      const query2 = 'SELECT * FROM itemdb WHERE ItemID in (?) ;';

      itemdb.query(query,[userID],function(err,rows) {
        featurelist = Object.values(rows[0]);
        featurelist = featurelist.toString();
        featurelist = featurelist.replace(/\[/g,' ');
      featurelist = featurelist.replace(/\]/g,' ');
      featurelist = featurelist.replace('\\','');
      featurelist = featurelist.replace(/\"/g,'');
      featurelist = featurelist.replace(/\,/g,'');
      console.log(featurelist)
      let recommendItemList = [];

      const recommendlist = spawn('python',['./models/CBmodeling_combined.py',featurelist]);

      recommendlist.stdout.on('data',function(data){
              rs = iconv.decode(data, 'euc-kr');
              rsarr = rs.split((/, |\]|\[/));
              rsarr = rsarr.slice(1,-1);
              resultarr =  rsarr.map(Number);
              //rsarr = rsarr[0]
             // console.log('rs의 개수: ',rsarr.length);   
              console.log(resultarr);
              var j = 0;
              itemdb.query(query2,[resultarr],function(err,rows){
                if (err){console.error('Error executing second query:',err);}
                else{
                  console.log(Object.values(rows))  
                     
                    for (i= 0 ; i < resultarr.length; i++) {   
                      //console.log(Object.values(rows[i]));
                      if (Object.values(rows[i])){
                      recommendItemList[j]= Object(rows[i]); 
                      j++;
                      //console.log(recommendItemList)
                      //console.log('i:' ,i);
                      console.log('j: ',j);
                      if (j==resultarr.length){
                        res.send(recommendItemList);
                      }
                    }
                      else{
                        j++;
                      }
      }}})
           
      });
      recommendlist.stderr.on('data', function(data) {
        console.log("222", data.toString());
    });});
   
});

app.use('/api/user/:userID/like/:itemID/update',(req,res,next)=>{
  const UID  = req.params.userID;
  const iID = req.params.itemID;
  let itemID = Number(iID);
  let userID = Number(UID);
  const querycheck = 'SELECT * FROM likedb WHERE UID = ?;'
  const query = "UPDATE likedb SET `?` = 0 WHERE UID = ? ;"
  const query1 = "UPDATE likedb SET `?` = 1 WHERE UID = ? ;"
  itemdb.query(querycheck,[userID],function(err,rows){
    //console.log(rows);
    likearr = Object.values(rows[0]);
    for (i = 0 ; i <likearr.length;i++){
      if (i == itemID){  
        console.log(likearr[itemID])
        if(likearr[i] == 1)
        { 
          itemdb.query(query,[itemID,userID]);
        }  
      else{
        itemdb.query(query1,[itemID,userID]);
      } 
     }
}})
next()

});

app.get('/api/user/:userID/like', (req, res) => {
    const { userID } = req.params;

    const query = 'SELECT * FROM likedb WHERE UID = ? ;';
    const query2 = 'SELECT item FROM itemdb WHERE ItemID = ?;';
    let userItemlist = [];
    let id = [];
    itemdb.query(query,[userID],function(err,rows) {
      if (err) {
        console.log("데이터 가져오기 실패");
      } else {
        likearr = Object.values(rows[0]);
        var j = 0;
        var k = 0;
        for (i= 0 ; i < likearr.length; i++)
        {
        if (likearr[i] == 1){
            id[k]= i
            k++;
            itemdb.query(query2, [i],function(err,rows){
            if (err){console.error('Error executing second query:',err);}
            else{ 
              userItemlist[j]={itemID:id[j], title: Object.values(rows[0])}; 
              j++;
              //console.log('k=',k);

              //console.log('j=',j);
              if (j==k){
               // console.log(userItemlist);
                res.send(userItemlist);
             }}
          }
          );}
        }
}});
})
app.get('/api/user/:userID/like/:itemID', (req, res) => {
  const  UID  = req.params.userID;
  const iID = req.params.itemID;
  let itemID = Number(iID);
  let userID = Number(UID);
  const query = 'SELECT * FROM likedb WHERE UID = ? ;';
  let id = [];
  try{
  itemdb.query(query,[userID],function(err,rows) {
    if (err) {
      console.log("데이터 가져오기 실패");
    } else {
      var k = 0;
     // res.send(rows[0]);
      likearr = Object.values(rows[0]);
      for (i= 0 ; i < likearr.length; i++)
      {if (likearr[i] == 1){
          id[k]= i
          k++;}
        }
      console.log('itemID: ',itemID);
      for (i = 0 ; i< id.length; i++){
        if( id[i] == itemID ){
          res.send(true);
         // console.log('id[i]:',id[i])
          break
        }
            }
      }}
);}catch(err){
  console.log('err',err);
  }

})


//평점 수정하기
app.use('/api/user/:userID/ratings/:itemID/update/:scores',(req,res,next)=>{
  console.log(req.params)
  const  UID  = req.params.userID;
  const iID = req.params.itemID;
  const myscore = req.params.scores;

  let itemID = Number(iID);
  let userID = Number(UID);
  let score =Number(myscore);
  const query = "UPDATE collabdb SET `?` = ? WHERE UID = ? ;"
  itemdb.query(query,[itemID,score,userID]);

  next()
});

//평점 불러오기
app.get('/api/user/:userID/ratings/:itemID', (req, res) => {
  
  const  UID  = req.params.userID;
  const iID = req.params.itemID;
  let itemID = Number(iID);
  let userID = Number(UID);
  let k = 0;

    const query = 'SELECT * FROM collabdb WHERE UID = ? ;';
    const query2 = 'SELECT `?` FROM collabdb;'
    itemdb.query(query2,[itemID], function(err,rows){
      if (err){
        console.log("query2 구문 에러");  
      }
      else{
        let revnum = 0;
        scores = Object.values(rows);
        //console.log('scores:',scores);
        for (j = 0; j< scores.length;j++){
          score = Number(Object.values(rows[j]));
         // console.log('score:',score)
          if (score != 0){
            k +=  Number(score);
            revnum ++;
        
        }
        //console.log('out_if_revnum:',revnum);
      }
        aver_score = k/revnum;
      //  console.log(aver_score);
        itemdb.query(query,[userID],function(err,rows) {
          if (err) {
            console.log("데이터 가져오기 실패");
          } else {
           // res.send(rows[0]);
           console.log('Object.values(rows[0]:',Object.values(rows[0]))
            ratings = Object.values(rows[0]);
           for (i = 0; i<ratings.length; i++){
            if(i == itemID){
              user_score = ratings[i]
              res.send([aver_score,user_score])
              break
            }}} })}})})
    
      


  // 서버 시작
  const port = 3001;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
