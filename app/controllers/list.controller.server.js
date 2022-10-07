import loginModel from '../models/logins.js';

import { UserDisplayName } from '../utils/index.js';

export function displayBusinessContactsList(req, res, next){
    if(!req.user){
        req.flash('loginMessage', 'You must login first!');
        return res.render('template', {title: 'Login', page: 'login', messages: req.flash('loginMessage'), displayName: UserDisplayName(req) });
    }

    else if(req.user){
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
    
    loginModel.find(function(err, logins) {
        if(err){
            console.error(err);
            res.end(err);
        }
    })

    loginModel.findById(id, (err, login) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        else {
            console.log(`Now editing details for ${login.displayName}`);
            res.render('template', { title: 'Update Info', page: 'update', login: login, displayName: UserDisplayName(req) });
        }

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
        }

        else {
            res.redirect('/list');  
        }
        
    } )
}



export function deleteLogin(req, res, next){
    let id = req.params.id;

    loginModel.remove({_id: id}, (err) => {
        if (err){
            console.error(err);
            res.end(err);
        }

        else{
            res.redirect('/list');
        }

        
    })
}