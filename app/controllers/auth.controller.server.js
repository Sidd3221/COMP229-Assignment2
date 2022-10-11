// Filename: auth.controller.server.js
// Student Name: Siddharth Verma
// Student ID: 301207026
// Date: October 1, 2022

// Importing passport and function that displays user name
import passport from 'passport';
import { UserDisplayName } from '../utils/index.js';

// Rendering login page if user is not already logged in 
export function DisplayLoginPage(req, res, next){
    if(!req.user){
        res.render('template', {title: 'Login', page: 'login', messages: req.flash('loginMessage'), displayName: UserDisplayName(req) });
    }

    else{
        res.redirect('/list');
    } 
}

// Processing login page
export function ProcessLoginPage(req, res, next){
    passport.authenticate('local', function(err, user, info) {
        if(err){
            console.error(err);
            res.end(err);
        }     
        
        if(!user){
            req.flash('loginMessage', 'Incorrect login credentials. Please try again!');
            res.redirect('/login');
        }

        else{
            req.logIn(user, function(err){
                if(err){
                    console.error(err);
                    res.end(err);
                }
                res.redirect('/list');
            }) 
        }
        
    })(req, res, next);
}

// Processing log out and rendering the log out page
export function ProcessLogoutPage(req, res, next){
    req.logout(function(err){
        if(err){
            console.error(err);
            res.end(err);
        }
    });
    
    req.flash('logoutMessage', 'You are now logged out!')
    res.render('template', {title: 'Logged out', page: 'logout', messageLogout: req.flash('logoutMessage'), displayName: UserDisplayName(req) });
}