const mongoose = require("mongoose") ;

const account = new mongoose.Schema(
  {
Username: {
  type: String,
  unique: true,
  require:true
},
Email: {
  type: String,
  unique: true,
  require:true
},
Password: {
  type: String,
  require:true
},
token: {
  type: String,
  // required:true
},
},
  {
    strict:false
  }
);



module.exports = mongoose.model("account", account,"account");
