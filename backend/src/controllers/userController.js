const userModel = require("../models/userModel");

const createUser = async (req,res) =>{

    try {
        let data = req.body
        let createdUser = await userModel.create(data);
        return res.status(201).send({status : true, data  : createdUser})
    } catch (error) {
        return res.status(500).send({status : false, message : error.message})
    }

} 
module.exports = {createUser}