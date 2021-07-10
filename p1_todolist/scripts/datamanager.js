var TDLData = (function () {
    var user;
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

    var setUser = function (inputUser) {
        user = inputUser;
        if (!user.lists) {
            user.lists = [];
        }
        DashBoardView.open(user);
    };

    var getUser = function () {
        return user;
    };

    var isListNameValid = function (name) {
        var lists = user.lists;
        for (var i = 0; i < lists.length; i++) {
            if (name === lists[i].name) {
                return false;
            }
        }
        return true;
    };

    var saveList = function (newList, index) {
        var lists = user.lists;
        if (!isListNameValid(newList.name)) {
            return false;
        }
        if(index!==undefined) {
            lists[index] = newList;
            DashBoardView.updateList(newList, index);
        } else {
            lists.push(newList);
            DashBoardView.updateList(newList);
        }
        return true;
    };

    var getListAtIndex = function(index){
        return user.lists[index];
    };

    return {
        setUser: setUser,
        getUser: getUser,
        isListNameValid: isListNameValid,
        saveList: saveList,
        getListAtIndex: getListAtIndex
    };
})();
