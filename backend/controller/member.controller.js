const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const accountModel = require('../models/account.model')

const JWT_SECRET = 'dqwbfqoomowfiqhfnoqpffbkma$ffopijpoefmowdand;fnma;gbsoib'

exports.login = async function (req, res)  {
    const { Username, Password } = req.body
    const user = await accountModel.findOne({ Username }).lean()

    if (!user) {

        return res.json({ status: 'error', data: 'Invalid username/password' })
    }

    if (await bcrypt.compare(Password, user.Password)) {
        const token = jwt.sign({
            id: user._id,
            Username: user.Username
        },
            JWT_SECRET
        )
        return res.json({ status: 'ok', token: token, Username: Username })
    }

    res.json({ status: 'error', data: 'Invalid username/password' })
}

exports.register = async function (req, res)  {
    const { Username, Password:passwordNotHash, Name, Phone, Email, Company, Nationality } = req.body

    const Password = await bcrypt.hash(passwordNotHash, 10)
    try {
        await accountModel.create({
            Username,
            Password,
            Name,
            Phone,
            Email,
            Company,
            Nationality
        })

    } catch (error) {
        if (error.code === 11000) {
            console.log(error)
            return res.json({ status: 'error', error: 'Username or Email are already used ' })
        }
        return res.json({ status: 'error', error: error })
    }
    res.json({ status: 'ok' })
}


exports.editdata = async function (req, res)  {
    const { Username, Password:passwordNotHash, Name, Phone, Email, Company, Nationality, token } = req.body
    try {
        if (token) {
            const user = jwt.verify(token, JWT_SECRET)
            const _id = user.id
            const password = await bcrypt.hash(passwordNotHash, 10)
            
            await accountModel.update(
                { _id:_id},
                {
                    $set: {Username:Username, Password:password, Name:Name, Phone:Phone,Email:Email, Company:Company, Nationality:Nationality }
                }
            )
         
        }   
        res.json({ status: 'ok' })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'error' })
    }
}

exports.getdata = async function (req, res)  {
   const token = req.params.id
   const user = jwt.verify(token, JWT_SECRET)
    const username = user.Username
    const memberData = await accountModel.find({Username:username},{_id:0}).lean().exec()
    res.send(200, memberData)
}

exports.delete = async function (req, res)  {
    const token = req.params.id
   const user = jwt.verify(token, JWT_SECRET)
   const id = user.id
   try {
    const result = await accountModel.findByIdAndDelete(id)
    res.json({status:'ok'})
   } catch (error) {
    res.json({status:"error", error:"Cant Delete"})
   }

 }
