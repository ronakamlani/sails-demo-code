/**
 * User.js 
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');
module.exports = {
  attributes: {
  	firstName: {
        type: 'string',
        maxLength: 50,
        required: [true, 'First Name required'],        
    },
    lastName: {
        type: 'string',
        maxLength: 50,
        required: [true, 'Last Name required'],
    },
    email: {
        type: 'email',
        maxLength: 255,
        unique: true,
        required: [true, 'Email required'],
    },
    //Country Code
    coCode: {
        type: 'string',
        maxLength: 6,
        minLength:3,
        required: [true, 'Country Code required'],
    },
    mobileNo: {
        type: 'integer',
        maxLength: 10,
        minLength:8,
        required: [true, 'Mobile Number required'],
    },
    fullNo:{
        type: 'string',
        maxLength: 16,
        minLength:11,
        index : true,
        required: [true, 'Full Number required'],
    },
    password: {
        type: 'string',
        maxLength: 100,
        required: [true, 'Password required'],
    },
    address: {
        type: 'string',
    },
    access: {
        type: 'array',        
        required: [true, 'Access required'],
        minLength:1,
        maxLength:5,
        isNumber:true,
        isValidAccess:true,
    },
    status: {
        type: 'integer',
        required: [true, 'Status required'],
        index:true,
        enum: [sails.config.myGlobalVariables.active, sails.config.myGlobalVariables.deactive, sails.config.myGlobalVariables.block],
    },    
    image: {
        type: 'string',
        defaultsTo : null
    },
    imageOriginal: {
        type: 'string',
        defaultsTo : null
    },
    hasShop: {
        type: 'boolean',
        defaultsTo : false        
    },    
    toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
    }   
  },
  types: {
    isNumber: function(value){
      for(i=0;i<value.length;i++){
        if(isNaN(value[i]) || value[i]==null)
            return false;
      }      
      return true;
    },
    isValidAccess: function(value) { 
      for(i=0;i<value.length;i++){
        if(value[i]<1 || value[i]>3)
            return false;
      }      
      return true;
    },
  },  
  beforeCreate: function(user, cb) {
        user=validateService.validateFields(user);
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    console.log(err);
                    cb(err);
                } else {
                    user.password = hash;
                    cb();
                }
            });
        });
    },
    beforeUpdate: function(user, cb) {
        if(user.password){
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    console.log(err);
                    cb(err);
                } else {
                    user.password = hash;
                    cb();
                }
            });
        });    
        }
        else
            cb();
    },    
};

