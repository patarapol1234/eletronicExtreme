const express = require('express')
const mongoose = require('mongoose')
const app = express();
const dotenv = require('dotenv')
const cors = require('cors')
const PORT = 4444

dotenv.config()
mongoose.connect(process.env.ATLAS_URI, () => console.log("MongoDB is Ready To Rock and Roll"))


app.use(express.json()) //bodypasser
app.use(cors())

const account = require('./routes/account.route')

app.use('/member', account)


app.listen(PORT, () => {
    console.log(`Here we go agian on Port:${PORT}`)
})

