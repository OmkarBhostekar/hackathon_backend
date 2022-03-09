const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const tagSchema =mongoose.Schema(
    {
       name:{
           require:true,
           type:String
       }
    }
)
tagSchema.plugin(toJSON);
tagSchema.plugin(paginate);

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;