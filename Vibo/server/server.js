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
    password:'',
    database:"itemdb"
});
const spawn = require('child_process').spawn;


itemdb.connect();

// post: 생성, put: 수정, get: 받아오기, delete: 삭제

// 로그인
app.post('/api/login/', (req,res, next)=>{
    const userID = req.body.id
    const userPwd = req.body.password;
    const matchingQuery = "select * from itemdb.user_info where userID = ?  AND userPwd = ?;"

    itemdb.query(matchingQuery, [userID, userPwd], function(err, result){
        if (err) {console.log("error: ", err)};

        resultlist = Object.values(result[0]);
        resultpwd = resultlist[1];
        resultlist = resultlist.toString();
        console.log(resultlist)

            if (userPwd === resultpwd){
                res.send({
                    message: "Login success",
                    status: 'success',
                    data: {
                        'id':userID,
                        'password':userPwd
                    }
                });
            } else {        // 어차피 여기서 안 먹힘. query에서 에러처리 해야함
                res.send({
                    message: "Login success",
                    status: 'unsuccess',
                    data: {
                        'id':userID,
                        'password':userPwd
                    }
                });
            }
    }); //일치하지 않는 경우 에러처리 해야함


});

// 회원가입 정보 express -> mysql로 데이터 저장
app.post('/api/join/:joinID', (req, res) => {
    const userName = req.body.username;
    const userID = req.body.id;
    const userPwd = req.body.password;

    const joinCheckQuery = 'SELECT (userID) from itemdb.user_info where userID = (?)'
    const joinQuery = 'INSERT INTO itemdb.user_info (userID, userPwd, userName) VALUES (?,?,?)'

    itemdb.query(joinCheckQuery, [userID], function(err, check_res){
        if (err){
            console.log("err: ", err);
        }
        if (check_res.length){              // id 중복 처리
            console.log('number of same ID: ', check_res.length);
            console.log("found same ID: ", check_res[0]);
            res.send({
                status: 'duplicated_id',
                data: {'id':userID}
            });
        } else{                             // id 중복되지 않을 때
            res.send({
                message: "Check ID successfully!",
                status: 'check_success',
                data: {
                    'username':userName,
                    'id':userID,
                    'password':userPwd
                }

            });

        itemdb.query(joinQuery, [userID, userPwd, userName], function(err, join_res){
            if (err) {
                console.log("err: ", err);
                // id 중복, id에 숫자 이외의 것을 쓰거나, 등 각종 오류 처리해야 함
            } else {
                console.log("Inserted values successfully!");
            }

        });
        }

    });
});

app.post('/api/join/:joinID/final', (req, res)=> {
    const joinID = req.body.joinID;
    userTaste = req.body.taste;
    userRebuy = req.body.repurchase;
    userTexture = req.body.texture;

    userTasteDetail = [];
    userSweet = req.body.sweet;
    userSour = req.body.sour;
    userFruit = req.body.fruit;
    userMilk = req.body.milk;

    userFunction = [];
    userVita = req.body.vita;
    userBio = req.body.bio;
    userDiet = req.body.diet;
    userVagina = req.body.vagina;

    const joinFinalCheckQuery = 'SELECT (userID) from itemdb.user_info where userID = ?'
    const joinFinalQuery = 'UPDATE itemdb.user_info SET userTaste=?, userRebuy=?, userTexture=?, userTasteDetail=?, userFunction=? WHERE userID = ?'

    console.log(userTaste);
    if (userTaste){
        userTaste = "맛있다"
    } else{
        userTaste = ""
    }
    if (userRebuy){
        userRebuy = "재구매의사"
    } else{
        userRebuy = ""
    }
    if (userTexture){
        userTexture = "목넘김"
    } else{
        userTexture = ""
    }
    if (userSweet){
        userSweet = "달콤"
        userTasteDetail.push(userSweet)
    }
    if (userSour){
        userSour = "새콤"
        userTasteDetail.push(userSour)
    }
    if (userFruit){
        userFruit = "과일맛"
        userTasteDetail.push(userFruit)
    }
    if (userMilk){
        userMilk = "우유맛"
        userTasteDetail.push(userMilk)
    }
    if (userVita){
        userVita = "피로회복"
        userFunction.push(userVita)
    }
    if (userBio){
        userBio = "장건강"
        userFunction.push(userBio)
    }
    if (userDiet){
        userDiet = "다이어트"
        userFunction.push(userDiet)
    }
    if (userVagina){
        userVagina = "질건강"
        userFunction.push(userVagina)
    }
    console.log(userTasteDetail);
    console.log(userFunction);

    itemdb.query(joinFinalCheckQuery, [joinID], function(err, select_res){
            if (err){
                console.log("err: ", err);
            }
            if (select_res.length){              // 회원가입한 id와 일치하는 row 선택
                console.log("found the same ID");
                itemdb.query(joinFinalQuery, [userTaste, userRebuy, userTexture, JSON.stringify(userTasteDetail), JSON.stringify(userFunction), joinID], function(err, detail_res){
                    if (err) {
                        console.log("err: ", err);
                    } else {
                        console.log("Inserted detail values successfully!");    // 사용자 취향 db에 삽입
                        res.send({
                            message: "Insert details successfully!",
                            status: 'detail_success'
                        });
                    }
                });
            } else{
                console.log("No ID");
            }

        });
});




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
                     //console.log('j: ',j);
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
        console.log('scores:',scores);
        for (j = 1; j< scores.length;j++){
          score = Number(Object.values(rows[j]));
          console.log('score:',score)

          if (score != 0){
            if (Number(score)>=5){
              k+= 5
              console.log('5로 통일')
            }
            else{
              k +=  Number(score);
            }
            console.log('k',k)
            revnum ++;

        }
        console.log('out_if_revnum:',revnum);
      }
        aver_score = k/revnum;
      console.log(aver_score);
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


//모달창에 보일 ItemBasedCommand 아이템들
app.get('/api/user/IBCF/:itemID', (req, res) => {
  const { itemID } = req.params;
  console.log('itemID', itemID)
  const IBCFList = spawn('python',['./models/IBCF.py',itemID]);
  const query = 'Select * From itemdb WHERE ItemID in (?);';

  IBCFList.stdout.on('data',function(data){
    rs = iconv.decode(data, 'euc-kr');
    rsarr = rs.split(/\'|\, |\ |\]|\[/,-1);
    rsarr = rsarr.slice(1,-1);
    resultarr = rsarr.filter(Boolean)
    resultarr =  resultarr.map(Number);

    console.log(resultarr);


    itemdb.query(query,[resultarr],function(err,rows) {

        console.log('rows:',Object.values(rows))
        res.send(rows)

    }
  )})
  })

  // 서버 시작
  const port = 3001;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
