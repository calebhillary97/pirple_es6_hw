var UserManager = function(){

    var users = {};
    var currentUser;

    var create = function(fname, lname, email, password){
        users[email] = {
            fname: fname,
            lname: lname,
            email: email,
            password: password
        };
        currentUser = users[email];
    };

    var getCurrentUser = function(){
        return currentUser;
    };

    return {
        create: create,
        getCurrentUser: getCurrentUser,
        toString: function(){
            return JSON.stringify(users);
        }
    };
}();