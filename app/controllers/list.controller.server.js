// Filename: list.controller.server.js
// Student Name: Siddharth Verma
// Student ID: 301207026
// Date: October 1, 2022

// Importing login schema 
import loginModel from '../models/logins.js';

// importing function that displays user's display name when logged in
import { UserDisplayName } from '../utils/index.js';

// Rendering contact list if user is logged in
export function displayBusinessContactsList(req, res, next){
    if(!req.user){
        req.flash('loginMessage', 'You must login first!');
        res.redirect('/login');
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

// Rendering update page
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

// Rendering search page
export function displaySearchPage(req, res, next){
    const searchMessage = "";
    res.render('template', { title: 'Search', page: 'search', result: {}, searchMessage: searchMessage, displayName: UserDisplayName(req)});
}

// Processing search request
export function processSearchBar(req, res, next) {
    var queryArray = [];
    var searchMessage = "";
    loginModel.find(function (err, result) {
        if (err) {
            console.error(err);
            res.end(err);
        }

        for (var i = 0; i < result.length; i++) {
            if (Number(req.body.use.trim()) == result[i].phone) {
                queryArray.push(result[i]);
                if(queryArray.length > 1){
                    searchMessage = `Found ${queryArray.length} results matching your query!`;
                }

                else if(queryArray.length === 1){
                    searchMessage = `Found 1 result matching your query!`;
                } 
            }

            if(queryArray.length === 0){
                searchMessage = "Found no results matching your query. Please try again!";
            }
        }
        res.render('template', { title: 'Search', page: 'search', result: queryArray, searchMessage: searchMessage, displayName: UserDisplayName(req)});
    })    
}

// Processing update request
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