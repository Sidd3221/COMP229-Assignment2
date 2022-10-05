import express from 'express';

// need passport 
import passport from 'passport';

// need to include the User Model for authentication
import Login from '../models/logins.js';

// import DisplayName Utility method
import { UserDisplayName } from '../utils/index.js';

// Display Functions
export function DisplayLoginPage(req, res, next){
    if(!req.user){
        return res.render('template', {title: 'Login', page: 'login', messages: req.flash('loginMessage'), displayName: UserDisplayName(req) });
    }

    return res.redirect('/list');
}

export function DisplayRegisterPage(req, res, next){
    if(!req.user){
        return res.render('template', {title: 'Register', page: 'register', messages: req.flash('registerMessage'), displayName: UserDisplayName(req)});
    }

    return res.redirect('/list');
}

// Processing Function
export function ProcessLoginPage(req, res, next){
    passport.authenticate('local', function(err, user, info) {
        if(err){
            console.error(err);
            res.end(err);
        }     
        
        if(!user){
            req.flash('loginMessage', 'Unable to login. Please try again!');
            return res.redirect('/login');
        }

        req.logIn(user, function(err){
            if(err){
                console.error(err);
                res.end(err);
            }

            return res.redirect('/');

        })
        
    })(req, res, next);
}

export function ProcessRegisterPage(req, res, next){
    let newLogin = new Login({
        username: req.body.username,
        phone: req.body.phone,
        password: req.body.password, 
        email: req.body.email,
        displayName: req.body.firstName + " " + req.body.lastName
    });

    Login.register(newLogin, req.body.password, function(err){
        if(err){
            if(err.name == "UserExistsError"){
                console.error('ERROR: User Already Exists!');
                req.flash('registerMessage', 'Registration Error')
            } else {
                console.error(err.name);
                req.flash('registerMessage', 'Server Error')
            }
            
            return res.redirect('/login');
        }

        return passport.authenticate('local')(req, res, function()
        {
            return res.redirect('/login');
        });
    });
}

export function ProcessLogoutPage(req, res, next){
    req.logOut(function(err){
        if(err){
            console.error(err);
            res.end(err);
        }

        console.log("user logged out successfully");
    });

    res.redirect('/login');
}