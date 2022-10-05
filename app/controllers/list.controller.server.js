import loginModel from '../models/logins.js';

import { UserDisplayName } from '../utils/index.js';

import express from 'express';

// need passport 
import passport from 'passport';

// need to include the User Model for authentication
import Login from '../models/logins.js';

// import DisplayName Utility method



export function displayBusinessContactsList(req, res, next){
    if(!req.user){
        console.log('user not logged in');
        return res.render('template', {title: 'Login', page: 'login', messages: req.flash('loginMessage'), displayName: UserDisplayName(req) });
    }

    else if(req.user){
        console.log('user already logged in');
        loginModel.find(function(err, logins) {
            if(err){
                console.error(err);
                res.end(err);
            }
    
            res.render('template', {title: 'Business Contacts List', page: 'list', login: logins, displayName: UserDisplayName(req)});
        })
    }
    
    
}

export function displayUpdatePage(req, res, next) {
    let id = req.params.id;

    loginModel.findById(id, (err, login) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.render('template', { title: 'Update Info', page: 'update', login: login, displayName: UserDisplayName(req) });
    });
};

export function processUpdatePage(req, res, next){
    let id = req.params.id;
    
    let updatedLogin = loginModel({
        _id: req.body.id,
        username: req.body.username,
        phone: req.body.phone,
        password: req.body.password,
        email: req.body.email,
        displayName: req.body.displayName
    });

    loginModel.updateOne({_id: id }, updatedLogin, (err, Login) => {
        if(err){
            console.error(err);
            res.end(err);
        };

        res.redirect('/list');
    } )
}

export function deleteLogin(req, res, next){
    let id = req.params.id;

    loginModel.remove({_id: id}, (err) => {
        if (err){
            console.error(err);
            res.end(err);
        }

        res.redirect('/list');
    })
}