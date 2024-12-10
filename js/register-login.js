import * as Utils from './utils.js';

function registerInputListener(){
    const usernameInput = document.getElementById("nombre");
    const password = document.getElementById('password');
    const passwordConditions = document.querySelector('.password-conditions');

    password.addEventListener("input", (e) => {
        const passwordValue = e.target.value;

        const conditions = {
            number: false,
            length8: false,
            specialChar: false,
            mayus: false
        };

        if(passwordValue.length >= 8){
            conditions.length8 = true;
        }
        
        // Verifico si tiene un num, si tiene un char especial y si tiene una letra mayus
        for(const char of passwordValue){
            if(!isNaN(char) && char !== ' '){
                conditions.number = true;
            } else if (!char.match(/[a-zA-Z0-9\s]/)){
                conditions.specialChar = true;
            } else if (char === char.toUpperCase() && char !== char.toLowerCase()){
                conditions.mayus = true;
            }
        }

        // Si se cumple todo ...
        if(conditions.number && conditions.length8 && conditions.specialChar && conditions.mayus){
            passwordConditions.classList = 'password-conditions';
        } else {
            const passwordConditions = document.querySelector('.password-conditions');
            passwordConditions.classList = 'password-conditions showing';
        }
    });

    usernameInput.addEventListener("input", (e) => {
        // Expresión regular para permitir solo letras, números y guiones bajos
        const regex = /^[a-zA-Z0-9_]*$/;
    
        if(!regex.test(e.target.value)){
            // Reemplazo los caracteres no permitidos 
            e.target.value = e.target.value.trim().replace(/[^a-zA-Z0-9_]/g, "");
        }
    });
}

function registerDataListener(){
    const registerForm = document.getElementById("register-form");
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("nombre").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if(username.length < 3){
            Utils.showToast("El nombre de usuario debe tener al menos 3 caracteres.", false);
            return;
        }

        if(password !== confirmPassword){
            Utils.showToast("Las contraseñas no coinciden.", false);
            return;
        }

        if(!userExists(username)){
            // Guardo en LocalStorage
            addUserToLocalStorage(username, password);

            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1000);
        } else {
            Utils.showToast("El nombre de usuario ya existe, intenta con otro.", false);
        }
    });
}

function loginInputListener(){
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("nombre").value;
        const password = document.getElementById("password").value;

        login(username, password);
    });
}


function login(username, password){
    const users = JSON.parse(localStorage.getItem("users"));
    const errorMsg = 'El usuario no existe o los datos no son correctos.';

    if(!users){
        Utils.showToast(errorMsg, false);
        return;
    }

    const validLogin = users.find(user => user.username === username && user.password === password);
    if(!validLogin){
        Utils.showToast(errorMsg, false);
        return;
    } else {    
        const userId = validLogin.userId;
        sessionStorage.setItem('loggedIn', JSON.stringify({userId, username}));
        Utils.showToast('Inicio de sesión con éxito', true);

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
        return;
    }
}

function userExists(username){
    const users = JSON.parse(localStorage.getItem("users"));

    if(!users){
        return false;
    }

    const userExists = users.find(user => user.username === username);
    if(!userExists) return false;
    else return true;
}

function addUserToLocalStorage(username, password){
    let users = JSON.parse(localStorage.getItem("users"));
    if(!users){
        users = [];
    }

    const userId = users.length + 1;
    const newUser = {userId, username, password};
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    Utils.showToast("Registrado correctamente", true);
}

function loginDataListener(){
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("Login exitoso");
    });
}

function showToast(text, success){
    const toast = new bootstrap.Toast('.toast');
    const toastHTML = document.querySelector('.toast');
    const toastBody = document.querySelector('.toast-body');

    if(success){
        toastHTML.classList.add('success');
    } else{
        toastHTML.classList.remove('success');
    }
    
    toastBody.innerHTML = text;
    toast.show();
}

function showRegisterPasswordListener(){
    const togglePassword = document.querySelector('.password-show');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    togglePassword.addEventListener('click', () => {
        const typePassword = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        const typeConfirmPassword = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        
        passwordInput.setAttribute('type', typePassword);
        confirmPasswordInput.setAttribute('type', typeConfirmPassword);

        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-eye-slash');
    });
}

function showLoginPasswordListener(){
    const togglePassword = document.querySelector('.password-show');
    const passwordInput = document.getElementById('password');

    togglePassword.addEventListener('click', () => {
        const typePassword = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';

        passwordInput.setAttribute('type', typePassword);

        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-eye-slash');
    });
}


// Listeners de login
if(window.location.pathname.includes('login')){
    showLoginPasswordListener();
    loginInputListener();
}

// Listeners de registro
if(window.location.pathname.includes('registro')){
    registerDataListener();
    registerInputListener();
    showRegisterPasswordListener();
}

