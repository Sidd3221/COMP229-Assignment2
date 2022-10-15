// Filename: index.js
// Student Name: Siddharth Verma
// Student ID: 301207026
// Date: October 1, 2022

// Defining the function to check if a user 'exists' i.e. is logged in or not. If user exists, the function returns the user's display name which is displayed on the website.
export function displayUserName(req) {
    if(req.user){
        return req.user.displayName;
    }

    return '';
};

// Defining the AuthGuard function which secures the website pages. For example, it ensures that the list is displayed only if the user is logged in.
export function AuthGuard(req, res, next) {
    if(!req.isAuthenticated()){
        return res.redirect("/login");
    }

    next();
}