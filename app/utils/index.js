// Filename: index.js
// Student Name: Siddharth Verma
// Student ID: 301207026
// Date: October 1, 2022


export function UserDisplayName(req) {
    if(req.user){
        return req.user.displayName;
    }

    return '';
};

export function AuthGuard(req, res, next) {
    if(!req.isAuthenticated()){
        return res.redirect("/login");
    }

    next();
}