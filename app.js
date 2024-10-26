const express = require("express");
const router = require("./routes/router.js");
const authRouter = require("./routes/authRouter.js")
const enrollRouter = require("./routes/studentEnroll.js")
const cors = require('cors')
const app = express();


app.use(express.json())
app.use(cors())

app.use('/api/v1/student/auth', authRouter)
app.use('/api/v1/student/article', router)
app.use('/api/v1/student/enroll',enrollRouter)



module.exports = { app }
