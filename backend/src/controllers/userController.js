const userModel = require("../models/userModel");

exports.createUser = async (req,res) =>{

    try {
        let data = req.body
        let createdUser = await userModel.create(data);
        return res.status(201).send({status : true, data  : createdUser})
    } catch (error) {
        return res.status(500).send({status : false, message : error.message})
    }

} 

exports.login = async(req, res) => {
    try {

        let {userName, password} = req.body

        let user = await userModel.findOne({userName:userName,password:password })
        
    } catch (error) {
        return res.status(500).send({status : false, message : error.message})
    }
}
