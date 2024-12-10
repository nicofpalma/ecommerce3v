export function getCart(){
    return JSON.parse(localStorage.getItem('cart'));
}

export function getUserId(){
    return JSON.parse(sessionStorage.getItem('loggedIn')).userId;
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

    // 2 - Elimino los links de la nav dejando solo el LI
    registerLink.removeChild(registerLink.firstChild);
    loginLink.removeChild(loginLink.firstChild);

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

    cartLink.appendChild(cartIcon);
    registerLink.appendChild(cartLink);
    registerLink.appendChild(cartItems);

    // 4 - Reemplazo el link de login por el perfil de usuario
    const userIcon = document.createElement('i');
    const userLink = document.createElement('a');

    userLink.className = 'nav-link';
    userLink.setAttribute('href', 'perfil.html');

    userIcon.className = 'fa fa-user-circle-o';
    userIcon.setAttribute('aria-hidden', true);

    userLink.appendChild(userIcon);

    loginLink.appendChild(userLink);

    // Footer
    const footerRegisterCart = document.querySelector('.footer-register-cart');
    const footerLoginProfile = document.querySelector('.footer-login-profile');

    footerRegisterCart.removeChild(footerRegisterCart.firstChild);
    footerLoginProfile.removeChild(footerLoginProfile.firstChild);

    footerRegisterCart.appendChild(cartLink.cloneNode(true));
    footerLoginProfile.appendChild(userLink.cloneNode(true));

    return true;
}

export function hideLoader(time){
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.style.display = "none"; 
    }, time); 
}