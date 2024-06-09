const mongoose = require('mongoose');

const AdminTypeSchema = new mongoose.Schema(
  {
   admin:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
   },
   adminTypes:[{
      role:{type:String},
      rolesAssignable:[{type:String}] 
    }],
  },
  { toJSON: { virtuals: true }}, {timestamps: true} 
);

const AdminTypeModel = mongoose.model.AdminTypeModel || mongoose.model('AdminType', AdminTypeSchema)

module.exports = AdminTypeModel