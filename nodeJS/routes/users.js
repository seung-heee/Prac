// express 모듈 셋팅
const express = require('express')
const router = express.Router()
router.use(express.json()) // http 외 모듈 'json' 사용

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
      console.log('비번도 같아')
    } else {
      console.log('틀렸다.')
    }
  } else {
    console.log('없는 아이디입니다.') 
  }
})

// 회원가입
router.post('/signup', (req, res) => {
  if (req.body == {}) {
    res.status(400).json({
      message: '입력 값을 다시 확인해주세요.'
    })
  } else {
    db.set(id++, req.body)

    res.status(201).json({
      message: `${db.get(id-1).name}님 환영합니다.`
    })
  }
})

// 회원 개별 조회
router
  .route('/users/:id')
  .get((req, res) => {
  const id = parseInt(req.params.id)
  const user = db.get(id)

  if (user == undefined) {
    res.status(404).json({
      message: "회원 정보가 없습니다."
    })
  } else {
    res.status(200).json({
      userId: user.userId,
      name: user.name,
    })
    }
  })
  .delete((req, res) => {
    const id = parseInt(req.params.id)
    const user = db.get(id)

    if (user == undefined) {
      res.status(404).json({
        message: "회원 정보가 없습니다."
      })
    } else {
      db.delete(id)
      res.status(200).json({
        message: `${user.name}님, 다음에 또 뵙겠습니다.`
      })
    }
  })

module.exports = router