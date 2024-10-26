const {addCourse, getEnrollment, updateEnroll, deleteEnroll }= require("../controllers/studentEnroll.controllers.js")
const protect = require("../middlewares/protectRoute.middlewares.js")

const enrollRouter = require('express').Router()


enrollRouter.route('/')
.post(protect, addCourse)
.get(protect, getEnrollment)


enrollRouter.route('/:id')
.patch(protect, updateEnroll)
.delete(protect, deleteEnroll)



module.exports = enrollRouter;
