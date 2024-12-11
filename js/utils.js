export function getCart(){
    return JSON.parse(localStorage.getItem('cart'));
}

export function getUserId(){
    const loggedIn = JSON.parse(sessionStorage.getItem('loggedIn'));
    if(!loggedIn) return null;
    return loggedIn.userId;
}

export function getUserCart(cart, userId){
    return cart.find(userCart => userCart.userId === userId);
}

export function isLoggedIn(){
    if(JSON.parse(sessionStorage.getItem('loggedIn'))){
        return true;
    }
    return false;
}

export function getUserCartItems(){
    const userId = getUserId();

    if(!userId) return 0;

    const cart = getCart();
    if(!cart) return 0;

    const userCart = getUserCart(cart, userId);
    if(!userCart) return 0;

    let itemsQuantity = 0;
    userCart.games.forEach(game => {
        itemsQuantity += game.quantity;
    })
    return itemsQuantity;
}

export function updateCartItems(){
    const cartLink = document.querySelector('.cart-items');
    cartLink.textContent = getUserCartItems();
}

export function showToast(text, success){
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


export function checkIfLoggedIn(){
    if(!isLoggedIn()){
        return false;
    }

    // 1 - Obtengo los links de la nav
    const registerLink = document.querySelector('.register-cart-link');
    const loginLink = document.querySelector('.login-user-link');
    loginLink.removeChild(loginLink.firstChild);

    // 2 - Elimino los links de la nav dejando solo el LI
    registerLink.removeChild(registerLink.firstChild);

    // 3 - Reemplazo el link de registro por el carrito
    const cartIcon = document.createElement('i');
    const cartLink = document.createElement('a');
    cartLink.className = 'nav-link';

    if(location.pathname.includes('carrito')){
        cartLink.classList.add('active');
    }

    cartLink.setAttribute('href', 'carrito.html');

    cartIcon.className = 'fa fa-shopping-cart';
    cartIcon.setAttribute('aria-hidden', true);

    const cartItems = document.createElement('p');
    cartItems.className = 'cart-items';
    cartItems.textContent = getUserCartItems(); 

    // ----
    const logoutIcon = document.createElement('i');
    const logoutLink = document.createElement('a');
    logoutLink.className = 'nav-link';

    logoutIcon.className = 'fa fa-sign-out';
    logoutIcon.setAttribute('aria-hidden', true);

    logoutLink.appendChild(logoutIcon);

    logoutLink.onclick = () => {
        sessionStorage.clear();
        showToast('Se ha cerrado la sesión', true);

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500)
    };

    cartLink.appendChild(cartIcon);
    registerLink.appendChild(cartLink);
    registerLink.appendChild(cartItems);
    loginLink.appendChild(logoutLink);

    // Footer
    const footerRegisterCart = document.querySelector('.footer-register-cart');
    const footerLogin = document.querySelector('.footer-login-profile');
  
    footerLogin.removeChild(footerLogin.firstChild);
    footerLogin.appendChild(logoutLink.cloneNode(true));
    footerRegisterCart.removeChild(footerRegisterCart.firstChild);
    footerRegisterCart.appendChild(cartLink.cloneNode(true));

    return true;
}

export function getUserInformation(userId){
    const users = JSON.parse(localStorage.getItem('users'));
    console.log(users);
    
    return users.find(user => user.userId == userId);
}

export function hideLoader(time){
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.style.display = "none"; 
    }, time); 
}