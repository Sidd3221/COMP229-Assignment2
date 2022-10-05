import loginModel from '../models/logins.js';

import { UserDisplayName } from '../utils/index.js';


export function displayBusinessContactsList(req, res, next){
    loginModel.find(function(err, logins) {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.render('template', {title: 'Business Contacts List', page: 'list', login: logins, displayName: UserDisplayName(req)});
    })
}

export function displayUpdatePage(req, res, next) {
    let id = req.params.id;

    loginModel.findById(id, (err, login) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.render('template', { title: 'Update Info', page: 'update', login: login, name: UserDisplayName(req) });
    });
};

export function processUpdatePage(req, res, next){
    let id = req.params.id;
    
    let updatedLogin = loginModel({
        _id: req.body.id,
        username: req.body.username,
        phone: req.body.phone,
        email: req.body.email,
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