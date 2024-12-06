function inputListener(){
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

        } else {
            
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

        if(password !== confirmPassword){
            showToast("Las contraseñas no coinciden");
            return;
        }

        console.log("Registro exitoso");
    });
}

function loginDataListener(){
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("Login exitoso");
    });
}

function showToast(text){
    const toast = new bootstrap.Toast('.toast');
    const toastBody = document.querySelector('.toast-body');
    
    toastBody.innerHTML = text;
    toast.show();
}

function showPasswordListener(){
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



showPasswordListener();
registerDataListener();
inputListener();