var TDLData = (function () {

    var custom = 'abcdefghijklmnopqrstuvwxyz1234567890';
    var MD5 = new Hashes.MD5();

    var currentUser;
    // {
    //     fname: 'Caleb',
    //     lname: 'Hillary',
    //     email: 'calebhillary97@gmail.com',
    //     password: '********',
    //     lists: [
    //         {
    //             name: 'List one',
    //             items: [
    //                 { name: 'Item one', checked: false },
    //                 { name: 'Item two', checked: true }
    //             ],
    //             time: 1625955131800
    //         }
    //     ]
    // }
    var getHash = function(password){
        return MD5.any(password, custom);
    };

    var isEmailAvailable = function (email) {
        if (localStorage.getItem(email) === null) {
            return true;
        }
        return false;
    };

    var signup = function (inputUserData) {
        if(inputUserData.password) {
            inputUserData.passwordHash = getHash(inputUserData.password);
            delete inputUserData.password;
        }
        currentUser = inputUserData;
        if (!currentUser.lists) {
            currentUser.lists = [];
        }
        localStorage.setItem(currentUser.email, JSON.stringify(currentUser));
        DashBoardView.open(currentUser);
    };

    var login = function (email, password) {
        if (!checkPassword(email, password)) {
            return false;
        }
        var userObj = JSON.parse(localStorage.getItem(email));
        currentUser = userObj;
        DashBoardView.open(currentUser);
        return true;
    };

    var logout = function(){
        currentUser=undefined;
    };

    var checkPassword = function (email, password) {
        var userObj;
        if(email==undefined) {
            userObj = currentUser;
        } else {
            userObj = JSON.parse(localStorage.getItem(email));
        }
        if (userObj === null) {
            return false;
        }
        if (getHash(password) !== userObj.passwordHash) {
            return false;
        }
        return true;
    };

    var getUser = function () {
        return currentUser;
    };

    var isListNameValid = function (name, currentIndex) {
        var lists = currentUser.lists;
        for (var i = 0; i < lists.length; i++) {
            if (i == currentIndex) {
                continue;
            }
            if (name === lists[i].name) {
                return false;
            }
        }
        return true;
    };

    var saveList = function (newList, index) {
        var lists = currentUser.lists;
        if (!isListNameValid(newList.name, index)) {
            return false;
        }
        if (index != -1) {
            lists[index] = newList;
            DashBoardView.updateList(newList, index);
        } else {
            lists.push(newList);
            DashBoardView.updateList(newList);
        }
        localStorage.setItem(currentUser.email, JSON.stringify(currentUser));
        return true;
    };

    var getListAtIndex = function (index) {
        return currentUser.lists[index];
    };

    var updateUser = function(userData){
        currentUser.fname = userData.fname;
        currentUser.lname = userData.lname;
        if(userData.password){
            currentUser.passwordHash = getHash(userData.password);
        }
        localStorage.setItem(currentUser.email, JSON.stringify(currentUser));
        DashBoardView.open(currentUser);
    };

    return {
        isEmailAvailable: isEmailAvailable,
        signup: signup,
        login: login,
        logout: logout,
        checkPassword: checkPassword,
        getUser: getUser,
        isListNameValid: isListNameValid,
        saveList: saveList,
        getListAtIndex: getListAtIndex,
        updateUser: updateUser
    };
})();
