const validateData =  (req, res, next) => {
    const {studentId,article } = req.body;
    if(!article ){
        return res.status(400).json({
            status:"fail",
            message: "missing  data"});
         
    }
    next();
}

module.exports = validateData;