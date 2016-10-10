/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');
var countryCodes = require( "../../../helper/countryCodes.js" );
module.exports = {
	  
    dashboard: function(req, res) {
        res.render('admin/index')
    }, 
    show: function(req, res) {
        res.render('login',{message:null})
    },    
    login: function(req, res) {

        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                console.log("if")
                return res.render('login',{message:info.message})
            }
            req.logIn(user, function(err) {
                if (err) res.send(err);
                return res.render('admin/index')
            });

        })(req, res);
    },

    logout: function(req, res) {
        req.logout();
        res.redirect('/admin/login');
    },
    profile: function(req, res) {
        var id=req.session.passport.user;
        User.findOne(id).exec(function (err, user) {
            res.render( 'admin/edit_profile',{'users':user,'codes':countryCodes.codes,'err':null});
            return; 
        });         
    },
    update: function(req, res) {
        var id=req.param("hidden_id");
        var updateQuery="";
        if(req.param("password"))
            updateQuery={firstName:req.param("firstName"),lastName:req.param("lastName"),coCode:req.param("coCode"),mobileNo:req.param("mobileNo"),fullNo:req.param("coCode")+req.param("mobileNo"),password:req.param("password"),address:req.param("address"),status:req.param("status")};
        else
            updateQuery={firstName:req.param("firstName"),lastName:req.param("lastName"),coCode:req.param("coCode"),mobileNo:req.param("mobileNo"),fullNo:req.param("coCode")+req.param("mobileNo"),address:req.param("address"),status:req.param("status")}
        //console.log(updateQuery);
       User.update({id:id},updateQuery).exec(function (err, user){ 
            if (err) {
                res.send("Error");
            }
            else {
                res.redirect( '/admin/dashboard');
            }
        });           
    }
};

