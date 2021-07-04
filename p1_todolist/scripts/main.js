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
                    UserManager.create(
                        signupFName.value,
                        signupLName.value,
                        signupEmail.value,
                        signupPassword.value
                    );
                    var user = UserManager.getCurrentUser();
                    ListViewManager.open(user);
                }
        }
    });
})();

var ListViewManager = (function () {
    var topBand = document.getElementById('top-band');

    var populateTopBand = function (user) {
        document.getElementById('tb-user-name').textContent = user.fname + ' ' + user.lname;
    };

    var open = function (user) {
        populateTopBand(user);
        document.getElementById('top-band').classList.add('top-band-active');
    };

    return {
        open: open
    };
})();
