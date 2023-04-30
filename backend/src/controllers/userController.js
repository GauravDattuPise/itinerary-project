const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
exports.createUser = async (req, res) => {

    try {
        let { userName, email, password } = req.body
        password = await bcrypt.hash(password, 10)
        console.log(password)
        let createdUser = await userModel.create({ userName, email, password });
        return res.status(201).send({ status: true, data: createdUser })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

}

exports.login = async (req, res) => {
    try {
        let data = req.body
        let { userName, password } = data;
        if (!userName || !password) {
            return res.status(400).send({ status: false, message: "pls provide both userName and password" })
        }
        let isUserNameExist = await userModel.findOne({ userName })
        if (!isUserNameExist) {
            return res.status(400).send({ status: false, message: "this userName not valid" })

        }

        let checkPass = await bcrypt.compare(password, isUserNameExist.password);
        if (!checkPass)
            return res.status(400).send({ status: false, message: "not valid user" });


        let token = jwt.sign(
            {
                userId: isUserNameExist._id,

            },
            "bonus project", { expiresIn: "11h" }
        );
        return res.status(200).send({
            status: true,
            message: "uesr login successfull", data: {token: token },
        });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};


