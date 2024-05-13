const mongoose = require('mongoose');

const data = new mongoose.Schema({
    Category  : {
        type : String,
       required : true
    },
    Quirk : {
        type : String,
         required : true
    },
   Level : {
        type : String,
         required : true
    },
   Name : {
        type : String,
         required : true
    }
    
})

const DataSet = mongoose.model('category',data);

module.exports = DataSet