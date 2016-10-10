/**
 * UserController
 * 
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
isArray = function(a) {
    return (!!a) && (a.constructor === Array);
};
var countryCodes = require( "../../../helper/countryCodes.js" );
var fs = require('fs');

module.exports = {

	create:function (req, res) {
    	res.render( 'admin/user/registration_form',{'codes':countryCodes.codes,'message':null,'err':null});
        return; 
    },
	save: function (req, res) {
        if(isArray(req.param("access")))
        	var access=req.param("access");
        else
        	var access=[req.param("access")];   
        User.create({
            firstName : req.param("firstName"),
            lastName : req.param("lastName"),
            email : req.param("email"),
            coCode : req.param("coCode"),
            mobileNo : req.param("mobileNo"),
            fullNo: req.param("coCode")+req.param("mobileNo"),
            password : req.param("password"),
            address : req.param("address"),
            access : access,
            status : req.param("status")
        },  function(err,user){
           // Error handling
            if(err){return res.json(err.status, {err: err,message:""});}
            else {
                res.render("admin/user/registration_form",{'codes':countryCodes.codes,'message':"Record Inserted",'err':null})
                return;
            }
        });
        
    },	
    
    list : function(req,res){       
    var page=1;
    var searchString=null;
    var conditions=[];
    var sortString=null;
    var status=null;
    var fromDate=null;
    var toDate=null;
    if(!req.param("page")){
        page=1;
    }   
    else{
        page=req.param("page");
    }    
    var records=(page-1)*3;
    var email=(req.param("email"))?req.param('email'):"";
    console.log(email);
    var fullNo=(req.param("fullNo"))?req.param('fullNo'):""; 
    console.log(fullNo)
    conditions.push({email: { startsWith: email }});
    conditions.push({fullNo: { startsWith: fullNo }});
    if(req.param("status")){
        conditions.push({status: req.param("status")});        
        status=req.param("status");
    }             
    if(req.param("from") && req.param("to")){
        fromDate=req.param("from");
        toDate=req.param("to")
        conditions.push({createdAt: {$gte: fromDate, $lt: toDate}});
    }    
    searchString={"$and": conditions};
    async.parallel({
    totalRecords:function(callback) {
        User.count(searchString, function(err, count) {
          if(err){return res.json(err.status, {err: err,message:""});}
          callback(err,count);
      });
    },
    users:function(callback) {
        var myQuery = User.find(searchString,{select:["firstName","lastName","email","fullNo","access","status","image","hasShop","createdAt"]});
        myQuery.skip(records);
        myQuery.limit(3);
        if(req.param("sortOn")){
            sortString=req.param("sortOn").split(",");
            myQuery.sort(sortString[0]+" "+sortString[1]);
        }    
        
        myQuery.exec(function(err, users)  {
            if(err){return res.json(err.status, {err: err,message:""});}                              
            callback(err, users);  
        });
    }
  },
  // optional callback
  function(err, results) {
      // the results array will equal ['one','two'] even though
      // the second function had a shorter timeout.
      if(err){return res.json(err.status, {err: err,message:""});}
      else
      {
        //return res.json({records:results['users'],"queryRecordCount":results['users'].length,"totalRecordCount":results['totalRecords']});
        res.render('admin/user/list', {users:results['users'],from:fromDate,to:toDate,email:email,fullNo:fullNo,status:status,sortOn:sortString,count:results['totalRecords']});
      }
  });
       
    },

    delete: function (req, res) {
        var id=req.param("id");
        User.findOne(id).exec(function (err, user) {
            if(err){return res.json(err.status, {err: err,message:""});}
        	if(user.image!=null){
        		fs.unlink('./assets/' + user.image,function(err){
            	if(err){return res.json(err.status, {err: err,message:""});}
              		console.log('file deleted successfully');
            	});
            }
            user.destroy(function(err) {
                if(err){return res.json(err.status, {err: err,message:""});}
                res.redirect( '/admin/user/list');                
            });

        });          
    },
    delete_all: function (req, res) {
        var id=req.param("id");
    
        isArray = function(a) {
            return (!!a) && (a.constructor === Array);
        };
        if(isArray(id)==false){
             id=[id];
    
        }      

        var query=User.find({id : { $in: id }},{select:["image"]});
        query.exec(function (err, users){
            if(err){return res.json(err.status, {err: err,message:""});}
            for(i=0;i<users.length;i++){
                im=users[i].image;
                if(im!=null){
                    fs.unlink('./assets/' + im,function(err){
                        if(err){return res.json(err.status, {err: err,message:""});}
                        console.log('file deleted successfully');
                    });  
                }      
            } 
        });    
        User.destroy({id: { $in: id }}).exec(function (err){
            if(err){return res.json(err.status, {err: err,message:""});}
            res.redirect( '/admin/user/list');                
        });
            
    },        
    edit:function (req, res) {
    	var id=req.param("id");
    	User.findOne(id).exec(function (err, user) {
            if(err){return res.json(err.status, {err: err,message:""});}
            res.render( 'admin/user/edit_form',{'users':user,'codes':countryCodes.codes,'err':null});
        	return; 
      	});  
    },
    view:function (req, res) {
    	var id=req.param("id");
    	User.findOne(id).exec(function (err, user) {
            if(err){return res.json(err.status, {err: err,message:""});}
        	res.render( 'admin/user/view',{'users':user});
        	return; 
      	});  
    },
    add_image: function (req, res) {
    	var id=req.param("id");
    	res.render( 'admin/user/add_image',{'users':id});
    },
    save_image: function (req, res) {
    	var id=req.param("hidden_id");
    	req.file('image').upload({
  				dirname: require('path').resolve(sails.config.appPath, 'assets/admin/vendors/user/images')
				},function (err, uploadedFiles) {
					if(err){return res.json(err.status, {err: err,message:""});}
					var ind=(uploadedFiles[0].fd).lastIndexOf("admin");
					var val=(uploadedFiles[0].fd).substr(ind-1)
                    console.log(val)
    				User.findOne(id).exec(function (err, user){ 
                        if(err){return res.json(err.status, {err: err,message:""});}
    					user.image = val;
    					user.save(function(err){
                		if(err){return res.json(err.status, {err: err,message:""});}
                		else {
                    		res.redirect( '/admin/user/list');
                		}
            		});
        		});
        	});	    
    },
    edit_image: function (req, res) {
    	var id=req.param("id");
        console.log("edit ",id)
    	User.findOne(id).exec(function (err, user){ 
            if(err){return res.json(err.status, {err: err,message:""});}
    		res.render( 'admin/user/edit_image',{'users':user});
    		return; 
      	});  
    },	
    update_image: function (req, res) {
    	var id=req.param("hidden_id");
        req.file('image').upload({
  				dirname: require('path').resolve(sails.config.appPath, 'assets/admin/vendors/user/images')
				},function (err, uploadedFiles) {
					if(err){return res.json(err.status, {err: err,message:""});}
					var ind=(uploadedFiles[0].fd).lastIndexOf("admin");
					var val=(uploadedFiles[0].fd).substr(ind-1)
    				console.log('inside');
    				User.findOne(id).exec(function (err, user){ 
    					if(err){return res.json(err.status, {err: err,message:""});}
                        console.log("no errorrrr")
    					fs.unlink('./assets/' + user.image,function(err){
    						console.log('in fs');	
            				if(err){return res.json(err.status, {err: err,message:""});}
              				console.log('file deleted successfully');
            			});
    					user.image = val;
    					user.save(function(err){
	                		if(err){return res.json(err.status, {err: err,message:""});}
            	    		else {
                	    		res.redirect( '/admin/user/list');
                			}
            			});
        			});
			    });	
    }, 
    update: function (req, res) {  
       var id=req.param("hidden_id");
       var updateQuery="";
       if(isArray(req.param("access")))
            var access=req.param("access");
        else
            var access=[req.param("access")];   
        if(req.param("password"))
            updateQuery={firstName:req.param("firstName"),lastName:req.param("lastName"),coCode:req.param("coCode"),mobileNo:req.param("mobileNo"),fullNo:req.param("coCode")+req.param("mobileNo"),password:req.param("password"),address:req.param("address"),access:access,status:req.param("status")};
        else
            updateQuery={firstName:req.param("firstName"),lastName:req.param("lastName"),coCode:req.param("coCode"),mobileNo:req.param("mobileNo"),fullNo:req.param("coCode")+req.param("mobileNo"),address:req.param("address"),access:access,status:req.param("status")}
        //console.log(updateQuery);
       User.update({id:id},updateQuery).exec(function (err, user){ 
           if(err){return res.json(err.status, {err: err,message:""});}
            else {
                res.redirect( '/admin/user/list');
            }
        });            
    }      
};

