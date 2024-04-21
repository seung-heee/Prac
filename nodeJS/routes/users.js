const express = require('express')
const conn = require('../mysql')
const router = express.Router()
router.use(express.json())

// 로그인
router.post('/signin', (req, res) => {
  const { email, password } = req.body

  let SQL = `SELECT * FROM user WHERE email = ?`
  conn.query(SQL, email,
    function (err, results) {
      var loginUser = results[0]
      if (loginUser && loginUser.password == password) 
          res.status(200).json({
            message: `${loginUser.name}님 로그인 되었습니다.`
          })
      else
        res.status(404).json({
          message: "이메일 또는 비밀번호가 틀렸습니다."
        })
    }
  );
})

// 회원가입
router.post('/signup', (req, res) => {
  if (req.body == {}) {
    res.status(400).json({
      message: '입력 값을 다시 확인해주세요.'
    })
  } else {
    const {email, name, password, contact} = req.body

    let SQL = `INSERT INTO user (email, name, password, contact) VALUES (?, ?, ?, ?)`
    let values = [email, name, password, contact]
    conn.query(SQL, values,
      function (err, results) {
        res.status(201).json(results)
      }
    )
  }
})

router
  .route('/users')
  // 회원 개별 조회
  .get((req, res) => {
  let {email} = req.body

  let SQL = `SELECT * FROM user WHERE email = ?`
  conn.query(SQL, email,
    function (err, results) {
      res.status(200).json(results)
      }
  )})
  // 회원 개별 탈퇴
  .delete((req, res) => {
    const {email} = req.body

    let SQL = `DELETE FROM user WHERE email = ?`
    conn.query(SQL, email,
      function (err, results, fields) {
        res.status(200).json(results)
      }
  )})

module.exports = router