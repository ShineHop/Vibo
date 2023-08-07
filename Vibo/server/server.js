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
      const query2 = 'SELECT item FROM itemdb WHERE ItemID in (?) ;';

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
                      recommendItemList[j]= Object.values(rows[i]).toString(); 
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
  console.log(req.params)

  const  UID  = req.params.userID;
  const iID = req.params.itemID;
  let itemID = Number(iID);
  let userID = Number(UID);
  const query = "UPDATE likedb SET `?` = 0 WHERE UID = ? ;"

  itemdb.query(query,[itemID,userID]);
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
       // res.send(rows[0]);
        likearr = Object.values(rows[0]);
        var j = 0;
        var k = 0;
        for (i= 0 ; i < likearr.length; i++)
        {
          if (likearr[i] == 1){
            id[k]= i
            k++;
           // console.log(id);
            itemdb.query(query2, [i],function(err,rows){
            if (err){console.error('Error executing second query:',err);}
            else{ 
              userItemlist[j]={itemID:id[j], title: Object.values(rows[0])}; 
              j++;
              //console.log('k=',k);

              //console.log('j=',j);
              if (j==k){
                res.send(userItemlist);
              }
}
            
          }
          );}
        }
}});
})

  // 서버 시작
  const port = 3001;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
