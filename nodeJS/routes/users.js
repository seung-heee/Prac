// express 모듈 셋팅
const express = require('express')
const router = express.Router()
router.use(express.json()) // http 외 모듈 'json' 사용
const conn = require('../mysql')

// Using placeholders
// conn.query(
//   'SELECT * FROM `users`',
//   function (err, results, fields) {
//     console.log(results);
//     results.map((item)=>{
//       console.log('item')

//       // console.log('key : ', item.i)
//       // console.log('title : ', item.title)
//       // console.log('sub_title : ', item.sub_title)
//       // console.log('img : ', item.img)
//     })
//   }
// );

// db
let db = new Map()
var id = 1 // 하나의 객체를 유니크하게 구별하기 위함.

// 객체가 비었는지 확인하는 함수
function isExisted(obj) {
  if (Object.keys(obj).length) {
    return true
  } else {
    return false
  }
}

// 로그인
router.post('/signin', (req, res) => {
  var loginUser = {}
  const { userId, password } = req.body

  // userId가 db에 저장된 회원인지 확인
  db.forEach((user, idx)=>{ // data, idx, totalData
    if (user.userId === userId) { // 요청데이터 userId와 db에 있는 userId가 같은지 확인
      loginUser = user 
    }
  })
  
  // userId 값을 못 찾았으면
  if(isExisted(loginUser)) {
    // pwd도 맞는지 비교
    if (loginUser.password === password) {
      res.status(200).json({
        message: `${loginUser.name}님 로그인 되었습니다.`
      })
    } else {
      res.status(400).json({
        message: `비밀번호가 틀렸습니다.`
      })
    }
  } else {
    res.status(404).json({
      message: "회원 정보가 없습니다."
    })
  }
})

// 회원가입
router.post('/signup', (req, res) => {
  if (req.body == {}) {
    res.status(400).json({
      message: '입력 값을 다시 확인해주세요.'
    })
  } else {
    const userId = req.body.userId
    db.set(userId, req.body)

    res.status(201).json({
      message: `${db.get(userId).name}님 환영합니다.`
    })
  }
})

// 회원 개별 조회
router
  .route('/users')
  .get((req, res) => {
  let {email} = req.body
  // const id = parseInt(req.params.id)
  // const user = db.get(userId)

  console.log(email)
  conn.query(
    `SELECT * FROM user Where email = ?`, email,
    function (err, results, fields) {
      // if (results.length)
        res.status(200).json(results)
        console.log(results)
      // else {
      //   res.status(404).json({
      //     message: "회원 정보가 없습니다."
      //   })
      // }
    }
  );
  })
  .delete((req, res) => {
    let { userId } = req.body
    // const id = parseInt(req.params.id)
    const user = db.get(userId)

    if (user) {
      db.delete(userId)
      
      res.status(200).json({
        message: `${user.name}님, 다음에 또 뵙겠습니다.`
      })
    } else {
      res.status(404).json({
        message: "회원 정보가 없습니다."
      })
    }
  })

module.exports = router