const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const projectSchema =mongoose.Schema(
    {
        owner:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User'
        },
        contributors: [
            {
              type: mongoose.SchemaTypes.ObjectId,
              ref: 'User'
            }
          ],
        title:{
            type:String,
            require:true
        },
        
        stars: {
            type: Number,
            default:0
        },
        tags:[
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Tag'
            }
        ],
        image:String,
        description:String,

    }
)
projectSchema.plugin(toJSON);
projectSchema.plugin(paginate);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;