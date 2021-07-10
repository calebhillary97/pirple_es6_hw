/*
 * Pirple: https://www.pirple.com/courses/take/keeping-up-with-the-javascripts-part-1/assignments/9455649-project-1
 *
 * Color Palette
 * {
 *     "Oxford Blue":"0b132b",
 *     "Space Cadet":"1c2541",
 *     "Independence":"3a506b",
 *     "Maximum Blue Green":"5bc0be",
 *     "Turquoise Blue":"6fffe9"
 * }
 *
 * Source: https://coolors.co/0b132b-1c2541-3a506b-5bc0be-6fffe9
 * Alternate: https://coolors.co/242d38-363d47-566569-85a68a-a5d5a1
 *            Muted Green
 * Alternate: https://coolors.co/4d9de0-e15554-e1bc29-3bb273-7768ae - Current
 *            Colorful
 * Alternate: https://coolors.co/7768ae-be6e46-cde7b0-a3bfa8-59594a - Current
 *            Violet based
 */

console.log('Script added');

var Pages = {
    index: document.getElementById('page-1-index'),
    dashboard: document.getElementById('page-2-dashboard')
};

(function () {
    var defaultBox = document.getElementById('default-box');
    var defaultForm = document.getElementById('default-form');
    var loginForm = document.getElementById('login-form');
    var signupForm = document.getElementById('signup-form');

    var signupFName = document.getElementById('signup-fname');
    var signupLName = document.getElementById('signup-lname');
    var signupEmail = document.getElementById('signup-email');
    var signupPassword = document.getElementById('signup-password');
    var signupConfirm = document.getElementById('signup-confirm');

    var validateSignup = function () {
        var nameError = document.getElementById('signup-name-error');
        var emailError = document.getElementById('signup-email-error');
        var passwordError = document.getElementById('signup-password-error');
        var isValid = true;
        //reset
        Utils.hide(nameError);
        signupFName.classList.remove('input-field-error');
        signupLName.classList.remove('input-field-error');
        Utils.hide(emailError);
        signupEmail.classList.remove('input-field-error');
        Utils.hide(passwordError);
        signupPassword.classList.remove('input-field-error');
        signupConfirm.classList.remove('input-field-error');

        if (!signupFName.checkValidity() && !signupLName.checkValidity()) {
            nameError.textContent = 'Enter first name and last name';
            signupFName.classList.add('input-field-error');
            signupLName.classList.add('input-field-error');
            Utils.show(nameError);
            isValid = false;
        } else if (!signupFName.checkValidity()) {
            nameError.textContent = 'Enter first name';
            signupFName.classList.add('input-field-error');
            Utils.show(nameError);
            isValid = false;
        } else if (!signupLName.checkValidity()) {
            nameError.textContent = 'Enter last name';
            signupLName.classList.add('input-field-error');
            Utils.show(nameError);
            isValid = false;
        }

        if (!signupEmail.checkValidity()) {
            signupEmail.classList.add('input-field-error');
            Utils.show(emailError);
            isValid = false;
        }

        if (!signupPassword.checkValidity()) {
            passwordError.textContent = 'Enter a password';
            signupPassword.classList.add('input-field-error');
            Utils.show(passwordError);
            isValid = false;
        } else if (signupPassword.value.length < 8) {
            passwordError.textContent = 'Use 8 characters or more for your password';
            signupPassword.classList.add('input-field-error');
            Utils.show(passwordError);
            isValid = false;
        } else if (!signupConfirm.checkValidity()) {
            passwordError.textContent = 'Confirm your password';
            signupConfirm.classList.add('input-field-error');
            Utils.show(passwordError);
            isValid = false;
        } else if (signupPassword.value !== signupConfirm.value) {
            passwordError.textContent = "Those passwords didn't match. Try again.";
            signupConfirm.classList.add('input-field-error');
            signupConfirm.value = '';
            Utils.show(passwordError);
            isValid = false;
        }
        return isValid;
    };

    defaultBox.addEventListener('click', function (event) {
        switch (event.target.id) {
            case 'btn-login':
                console.log('Login');
                Utils.hide(defaultForm);
                Utils.show(loginForm);
                break;
            case 'btn-signup':
                console.log('Signup');
                Utils.show(signupForm);
                Utils.hide(defaultForm);
                defaultBox.classList.add('signup-box');
                break;
            case 'btn-signup-submit':
                console.log('Signup-Submit');
                if (validateSignup()) {
                    TDLData.setUser({
                        fname: signupFName.value,
                        lname: signupLName.value,
                        email: signupEmail.value,
                        password: signupPassword.value
                    });
                }
        }
    });
})();

var ListPopupView = (function () {
    var listInView;
    var listIndex = -1;

    var popupElement = document.getElementById('page-2-viewlist-popup');

    var addTaskBtn = popupElement.querySelector('.add-task-btn');
    var itemList = popupElement.querySelector('#view-list-data');
    var itemTemplate = itemList.querySelector('template');

    var listTitle = popupElement.querySelector('.view-list-name');
    var listTitleError = popupElement.querySelector('#list-title-error');

    var saveListBtn = popupElement.querySelector('#save-list-submit-btn');
    var cancelListBtn = popupElement.querySelector('#save-list-cancel-btn');

    var AddTaskForm = (function () {
        var addTaskForm = popupElement.querySelector('.list-item-add-input-container');
        var canSubmitForm = false;
        var addTaskFormSubmit = addTaskForm.querySelector('#add-task-submit-btn');
        var addTaskFormCancel = addTaskForm.querySelector('#add-task-cancel-btn');
        var addTaskTextArea = addTaskForm.querySelector('textarea');

        var show = function () {
            canSubmitForm = false;
            addTaskFormSubmit.classList.add('disabled-button');
            addTaskTextArea.value = '';
            addTaskForm.classList.remove('ui-hide');
            addTaskBtn.classList.add('ui-hide');
            addTaskTextArea.focus();
        };

        var hide = function () {
            addTaskForm.classList.add('ui-hide');
            addTaskBtn.classList.remove('ui-hide');
        };

        addTaskTextArea.addEventListener('input', function () {
            if (addTaskTextArea.value.trim().length >= 1) {
                addTaskFormSubmit.classList.remove('disabled-button');
                canSubmitForm = true;
            } else {
                addTaskFormSubmit.classList.add('disabled-button');
                canSubmitForm = false;
            }
        });

        addTaskFormSubmit.addEventListener('click', function () {
            if (!canSubmitForm) {
                return;
            }
            addItem({ name: addTaskTextArea.value.trim(), checked: false });
            hide();
        });
        addTaskFormCancel.addEventListener('click', hide);

        return {
            show: show
        };
    })();

    var addItemInView = function () {
        var newItem = itemTemplate.content.cloneNode(true);
        newItem.querySelector('.list-item-text').textContent = impItem.name;
        itemList.appendChild(newItem);
    };

    var addItem = function (impItem) {
        listInView.items.push({
            checked: impItem.checked,
            name: impItem.name
        });
        addItemInView(impItem);
    };

    var onItemClick = function (event) {
        if (event.target.classList.contains('list-item-checkbox')) {
            event.target.classList.toggle('list-item-checkbox-checked');
            var allItems = itemList.querySelectorAll('.list-item-checkbox');
            var toggleIndex = Array.prototype.indexOf.call(allItems, event.target);
            listInView.items[toggleIndex].checked = !listInView.items[toggleIndex].checked;
        }
    };

    var show = function (inpList, listIndex) {
        if (!inpList) {
            listInView = {
                name: undefined,
                items: []
            };
        } else {
            //Fill list data in view
            listTitle.value = inpList.name;
            inpList.items.forEach(addItemInView);
            listInView = inpList;
            if (listIndex !== undefined) {
                listIndex = listIndex;
            }
        }
        popupElement.classList.remove('ui-hide');
    };

    var hide = function () {
        //reset
        listTitle.value = '';
        listTitleError.classList.add('ui-hide');
        listTitle.classList.remove('input-field-error');
        listIndex = -1;

        var items = itemList.querySelectorAll('li');
        items.forEach(function (elem) {
            elem.remove();
        });

        //close
        popupElement.classList.add('ui-hide');
    };

    var save = function () {
        if (listTitle.value.trim().length == 0) {
            listTitleError.textContent = 'Please enter title for list';
            listTitleError.classList.remove('ui-hide');
            listTitle.classList.add('input-field-error');
            return;
        }

        var newListName = listTitle.value.trim();
        if (!TDLData.isListNameValid(newListName)) {
            listTitleError.textContent = 'List with this name already Exists. Please change name';
            listTitleError.classList.remove('ui-hide');
            listTitle.classList.remove('input-field-error');
            return;
        }

        listInView.name = newListName;
        if (!listInView.time) {
            listInView.time = new Date().getTime();
        }
        TDLData.saveList(listInView, listIndex);
        hide();
    };

    addTaskBtn.addEventListener('click', AddTaskForm.show);
    itemList.addEventListener('click', onItemClick);
    cancelListBtn.addEventListener('click', hide);
    saveListBtn.addEventListener('click', save);

    return {
        show: show
    };
})();

var DashBoardView = (function () {
    var topBand = document.getElementById('top-band');
    var topBandName = topBand.querySelector('.top-band-name');

    var dashBoard = document.getElementById('page-2-dashboard');
    var addListBtn = document.getElementById('add-list-btn');

    var listsUL = dashBoard.querySelector('ul');
    var listTemplate = listsUL.querySelector('template');

    var isNoListInfoShown = false;
    var noListsInfo = dashBoard.querySelector('.list-default-info');

    var udpateList = function (list, index) {
        if(index==undefined) {
            if (isNoListInfoShown) {
                noListsInfo.classList.add('ui-hide');
                isNoListInfoShown = false;
            }
            var newListElem = listTemplate.content.cloneNode(true);
            newListElem.querySelector('.dashboard-list-text').textContent = list.name;
            newListElem.querySelector('.dashboard-list-details').textContent =
                'Created at ' + new Date(list.time).toLocaleString();
            listsUL.appendChild(newListElem);
        } else {
            var listElement = listsUL.querySelectorAll('li')[index];
            listElement.querySelector('.dashboard-list-text').textContent = list.name;
        }
    };

    var open = function (user) {
        topBandName.textContent = user.fname + ' ' + user.lname;
        document.getElementById('top-band').classList.add('top-band-active');
        Pages.index.classList.add('ui-hide');
        Pages.dashboard.classList.remove('ui-hide');
        if (user.lists.length == 0) {
            noListsInfo.classList.remove('ui-hide');
            isNoListInfoShown = true;
        } else {
            noListsInfo.classList.add('ui-hide');
            isNoListInfoShown = false;
        }
    };

    var onListClick = function (event) {
        console.log(event.target);
        // debugger;
        var listItems = listsUL.querySelectorAll('li');
        var clickedListIndex = Array.prototype.indexOf.call(listItems, event.target);
        var clickedList = TDLData.getListAtIndex(clickedListIndex);
        ListPopupView.show(clickedList, clickedListIndex);
    };

    addListBtn.addEventListener('click', function () {
        ListPopupView.show();
    });

    listsUL.addEventListener('click', onListClick);

    return {
        open: open,
        udpateList: udpateList
    };
})();
