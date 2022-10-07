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
    
    loginModel.findOne(function(err, logins) {
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

export function displaySearchPage(req, res, next){
    const searchMessage = "";
    res.render('template', { title: 'Search', page: 'search', result: {}, searchMessage: searchMessage, displayName: UserDisplayName(req)});
}

export function processSearchBar(req, res, next) {
    var news1 = [];
    var searchMessage = "";
    loginModel.find(function (err, result) {
        if (err) {
            console.error(err);
            res.end(err);
        }

        for (var i = 0; i < result.length; i++) {
            if (Number(req.body.use) == result[i].phone) {
                news1.push(result[i]);
                if(news1.length > 1){
                    searchMessage = `Found ${news1.length} results matching your query!`;
                }

                else if(news1.length === 1){
                    searchMessage = `Found 1 result matching your query!`;
                } 
            }

            if(news1.length === 0){
                searchMessage = "Found no results matching your query. Please try again!";
            }
        }
        res.render('template', { title: 'Search', page: 'search', result: news1, searchMessage: searchMessage, displayName: UserDisplayName(req)});
    })    
}

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