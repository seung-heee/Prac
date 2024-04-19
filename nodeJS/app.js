// express 모듈 셋팅
const express = require('express')
const app = express()
app.listen(7777)
app.use(express.json()) // http 외 모듈 'json' 사용

const userRouter = require('./routes/users')
const channelRouter = require('./routes/channels')

app.use("/", userRouter)
app.use("/channels", channelRouter)