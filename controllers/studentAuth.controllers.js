const jwt = require("jsonwebtoken");
const studentSignup = require("../models/student.models.js");
const bcrypt = require('bcryptjs');


const signToken = id => {
    const jwt = process.env.JWT_SECRET_STR ;
    if(!jwt){
        return res.status(404).json({
            status:"fail",
            message:"provide json token"})
        
    return jwt.sign({'id': id}, jwt, { expiresIn: 200000 })
}

const signUp = async (req, res) => {
    const {name, email, password} = req.body;
    
    if(!name || !email || !password){
        return res.status(400).json({
            status:"fail",
            message:"missing data for signup"
        })
    }
    
    // check student already present
    const checkStudent = await studentSignup.findOne({email:{$eq: email}})
    if(checkStudent){
        return res.status(400).json({
            status:"fail",
            message:"user alread present"
        })
    }
    const incryptPass = await bcrypt.hash(password, 12);
    const student = new studentSignup({
        name,
        email,
        password: incryptPass,
    })

    try{
        await student.save();
        res.status(200).json({
            status: "success",
            data:{
                student: student
            }
        })
    }
    catch (error){
        res.status(404).json({
            status: "fail",
            message: `Error occur at save data error: ${error}`
        })
    }
}


// login the user
const login = async (req, res) =>{
    const {email, password} = req.body;

    if( !email || !password ){
        return res.status(400).json({
            status: "fail",
            message: "Provide email and password"
        })
    }
    
    const studentObj = await studentSignup.findOne({email}).select('+password')
    
    
    if(!studentObj || !await bcrypt.compare(password, studentObj.password)){
        res.status(400).json({
            status: "fail",
            message: "Does not have any account"
        })}
    else{
        const token = signToken(studentObj.id)
        res.status(200).json({
            status:"success",
            token
        })
    }

}










module.exports = {signUp, login}
