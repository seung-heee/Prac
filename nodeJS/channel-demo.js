// express 모듈 셋팅
const express = require('express')
const app = express()
app.listen(7777)
app.use(express.json()) // http 외 모듈 'json' 사용

// db
let db = new Map()
var id = 1 // 하나의 객체를 유니크하게 구별하기 위함.

// 채널 전체 조회
app
  .route('/channels')
  // 채널 전체 조회
  .get((req, res) => {
    if (db.size) {
      var channels = []

      db.forEach((value, key) => {
        channels.push(value)
      })

      res.status(200).json(channels)
    } else {
      res.status(404).json({
        message : "조회 할 채널이 없습니다."
      })
    }
  })
  // 채널 생성
  .post((req, res) => {
    if(req.body.channelTitle) {
      db.set(id++, req.body);
      res.status(201).json({
        message: `${db.get(id-1).channelTitle} 채널을 응원합니다.`
      })
    } else {
      res.status(400).json({
        message: '요청 값을 올바르게 입력해주세요.'
      })
    }
  })

app
  .route('/channels/:id')
  // 채널 개별 조회
  .get((req, res) => {
    const id = parseInt(req.params.id)
    var channels = db.get(id)

    if(channels) { // 객체가 있으면
      res.status(200).json(channels)
    } else {
      res.status(404).json({
        message: '채널 정보를 찾을 수 없습니다.'
      })
    }
  })
  // 채널 개별 수정
  .put((req, res) => {
    const id = parseInt(req.params.id)

    var channel = db.get(id)
    var oldTitle = channel.channelTitle

    if(channel) { // 객체가 있으면
      var newTitle = req.body.channelTitle // 새로운 채널명
      channel.channelTitle = newTitle // 채널명 덮어쓰기
      db.set(id, channel)
      res.status(200).json({
        message : `${oldTitle} -> ${newTitle} : 채널명이 변경되었습니다.`
      })
    } else {
      res.status(404).json({
        message: '채널 정보를 찾을 수 없습니다.'
      })
    }

  })
  // 채널 개별 삭제
  .delete((req, res) => {
    const id = parseInt(req.params.id)
    var channels = db.get(id)

    if(channels) { // 객체가 있으면
      db.delete(id)
      res.status(200).json({
        message : `${channels.channelTitle} 채널이 정상적으로 삭제되었습니다.`
      })
    } else {
      res.status(404).json({
        message: '삭제할 채널 정보를 찾을 수 없습니다.'
      })
    }
  })