//calling the account details
let allAccountDetails;
fetch("./js/allAccountDetails.json")
    .then((response) => response.json())
    .then((data) => allAccountDetails = data);

//variable for my page
const spaPage = document.querySelector(".logInContainer");



//making navigation buttons work
//refering to buttons
const button_toLogIn = document.querySelector("#toLogIn");
const button_toRegistration = document.querySelector("#toRegistration");
const button_toPasswordReset = document.querySelector("#toPasswordReset");

//refer to forms
const logIn_form = document.querySelector(".logIn_form");
const registration_form = document.querySelector(".registration_form");
const passwordReset_form = document.querySelector(".passwordReset_form");

//button to the login page
button_toLogIn.addEventListener("click", function () {
    logIn_form.style.display = "flex";
    registration_form.style.display = "none";
    passwordReset_form.style.display = "none";
    logIn_success.style.display = "none";
})

//button to the registration page
button_toRegistration.addEventListener("click", function () {
    logIn_form.style.display = "none";
    registration_form.style.display = "flex";
    passwordReset_form.style.display = "none";
    logIn_success.style.display = "none";
})

//button to the password reset page
button_toPasswordReset.addEventListener("click", function () {
    logIn_form.style.display = "none";
    registration_form.style.display = "none";
    passwordReset_form.style.display = "flex";
    logIn_success.style.display = "none";
})





//checks for the login inputs
//making the login inputs variables
const logIn_username = document.querySelector("#logIn_username");
const logIn_password = document.querySelector("#logIn_password");
const logIn_submit = document.querySelector("#logIn_submit");
const logIn_success = document.querySelector("#logIn_success")

//variables to flag pass or fail
let logInPass = false;
let logIn_userPlace = 0;

const logInAlert = function (logInPass) {

    if (logInPass == true) {
        alert("Login Succeded");
        logIn_form.style.display = "none";
        registration_form.style.display = "none";
        passwordReset_form.style.display = "none";
        logIn_success.style.display = "flex";
    }
    else {
        alert("Login Information Is Incorrect\nLogin Failed" );
    }
    return
}

logIn_submit.addEventListener("click", function () {
    //checks for username
    

    if (localStorage.getItem(logIn_username.value) != null) {
        var accountDetails = localStorage.getItem(logIn_username.value).split(',');
        if (accountDetails[0] = logIn_password.value) {
            logInPass = true;
        }
    }
    
    logInAlert(logInPass);
})





//checks for the registration inputs
//making the registration inputs variables

const registration_firstName = document.querySelector("#registration_firstName");
const registration_lastName = document.querySelector("#registration_lastName");
const registration_email = document.querySelector("#registration_email");
const registration_username = document.querySelector("#registration_username");
const registration_password = document.querySelector("#registration_password");
const registration_passwordCheck = document.querySelector("#registration_passwordCheck");
const registration_securityQuestion = document.querySelector("#registration_securityQuestion");
const registration_securityQuestionAnswer = document.querySelector("#registration_securityQuestionAnswer");
const registration_submit = document.querySelector("#registration_submit");

//variables to flag pass or fail
let registration_firstNameFail = false;
let registration_lastNameFail = false;
let registration_emailPass = false;
let registrationPass = false;

//stores valid registration data
const registrationAlert = function (registrationPass) {

    if (registrationPass == true) {
        alert("Registration Succeded");

        const registrationFormData = [registration_password.value, registration_firstName.value, registration_lastName.value, registration_email.value, registration_securityQuestion.value, registration_securityQuestionAnswer.value];

        localStorage.setItem(registration_username.value, registrationFormData);

        logIn_form.style.display = "flex";
        registration_form.style.display = "none";
        passwordReset_form.style.display = "none";
    }
    return
}

registration_submit.addEventListener("click", function () {

    //check first name
    registration_firstNameFail = /\d/.test(registration_firstName.value);
    if (registration_firstNameFail == true) {
        alert("Your First Name Can't Contain Numbers\nRegistration Failed");
        return registrationPass = false;
    }

    if (registration_firstName.value == "") {
        alert("First Name Is Empty\nRegistration Failed");
        return registrationPass = false;
    }

    //checking last name
    registration_lastNameFail = /\d/.test(registration_lastName.value);
    if (registration_lastNameFail == true) {
        alert("Your Last Name Can't Contain Numbers\nRegistration Failed");
        return registrationPass = false;
    }

    if (registration_lastName.value == "") {
        alert("Last Name Is Empty\nRegistration Failed");
        return registrationPass = false;
    }

    

    //username check
    if (/\s/.test(registration_username.value)) {
        alert("Username Can't Contain Spaces\nRegistraition Failed");
        return registrationPass = false;
    }
    else if (registration_username.value == "") {
        alert("Username Is Empty\nRegistraition Failed")
        return registrationPass = false;
    }
    else
    {
        if (localStorage.getItem(registration_username.value) != null) {
                alert("Username Already In Use\nRegistraition Failed");
                return registrationPass = false;
        }
    }

    //password and password confirmation check
    if (registration_password.value.length > 10 && /[A-Z]/.test(registration_password.value) && /[a-z]/.test(registration_password.value) && /[0-9]/.test(registration_password.value) && /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(registration_password.value) && !/\s/.test(registration_password.value)) {
        if (registration_password.value != registration_passwordCheck.value) {
            alert("Password and Password Confirmation Don't Match\nRegistraition Failed");
            return registrationPass = false;
        }
    }
    else {
        alert("Password Must:\n-Be More Than 10 Characters Long\n-Contain Numbers & Special Characters\n-Be Upper & Lower Case\nRegistraition Failed");
        return registrationPass = false;
    }

    //security question answer check
    if (registration_securityQuestionAnswer.value == "") {
        alert("Security Question Answer Is Empty\nRegistraition Failed");
        return registrationPass = false;
    }

    registrationPass = true;
    registrationAlert(registrationPass);
})





//checks for the password reset inputs
//making the password reset inputs variables
const passwordReset_username = document.querySelector("#passwordReset_username");
const passwordReset_securityQuestion = document.querySelector("#passwordReset_securityQuestion");
const passwordReset_securityQuestionAnswer = document.querySelector("#passwordReset_securityQuestionAnswer");
const passwordReset_newPassword = document.querySelector("#passwordReset_newPassword");
const passwordReset_confirmNewPassword = document.querySelector("#passwordReset_confirmNewPassword");
const passwordReset_submit = document.querySelector("#passwordReset_submit")

//flags for pass and fail nad variables
let passwordReset_userPlace = false;
let passwordResetPass = false;

//enter new details 
const passwordResetAlert = function (resetPass) {

    if (resetPass == true) {
        alert("Password Reset Succeded");

        const accountDetails = localStorage.getItem(passwordReset_username.value).split(',');

        localStorage.removeItem(passwordReset_username.value);

        accountDetails[0] = passwordReset_newPassword.value;

        localStorage.setItem(passwordReset_username.value, accountDetails);

        console.log(localStorage.getItem(passwordReset_username.value));

        logIn_form.style.display = "flex";
        registration_form.style.display = "none";
        passwordReset_form.style.display = "none";
    }
    return
}

passwordReset_submit.addEventListener("click", function () {
    //checks for username
    if (localStorage.getItem(passwordReset_username.value) == null) {
        alert("Username is invalid")
    }
    else {
        var accountDetails = localStorage.getItem(passwordReset_username.value).split(',');
        console.log(accountDetails);
        if (passwordReset_securityQuestion.value == accountDetails[4]) {
            console.log(accountDetails[4]);
            if (passwordReset_securityQuestionAnswer.value == accountDetails[5]) {
                console.log(accountDetails[5]);
                if (passwordReset_newPassword.value.length > 10 && /[A-Z]/.test(passwordReset_newPassword.value) && /[a-z]/.test(passwordReset_newPassword.value) && /[0-9]/.test(passwordReset_newPassword.value) && /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(passwordReset_newPassword.value) && !/\s/.test(passwordReset_newPassword.value)) {
                    if (passwordReset_newPassword.value != passwordReset_confirmNewPassword.value) {
                        alert("Password and Password Confirmation Don't Match\nRegistraition Failed");
                        return passwordResetPass = false;
                    }
                    else {
                        passwordResetPass = true;
                        passwordResetAlert(passwordResetPass);
                    }
                }
            }
        }
    }
    return
})