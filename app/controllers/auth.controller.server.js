import passport from 'passport';
import { UserDisplayName } from '../utils/index.js';

export function DisplayLoginPage(req, res, next){
    if(!req.user){
        res.render('template', {title: 'Login', page: 'login', messages: req.flash('loginMessage'), displayName: UserDisplayName(req) });
    }

    else{
        res.redirect('/list');
    } 
}

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

export function ProcessLogoutPage(req, res, next){
    req.logOut(function(err){
        if(err){
            console.error(err);
            res.end(err);
        }
    });
    res.redirect('/login');
}