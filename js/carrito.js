import * as Utils from './utils.js';

function getCartGames(){
    const cartTable = document.querySelector('.cart-table');
    const cart = Utils.getCart();

    if(!cart){
        cartTable.innerHTML = `<p class="no-games-cart">No hay juegos en tu carrito.</p>`;
        return;
    } 
    
    const userId = Utils.getUserId();
    const userCart = Utils.getUserCart(cart, userId);

    if(!userCart || userCart.games.length === 0){
        cartTable.innerHTML = `<p class="no-games-cart">No hay juegos en tu carrito</p>`;
        return;
    }

    console.log(userCart.games);
    
    const table = document.createElement('table');
    table.className = 'table table-striped';

    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>#</th>
            <th></th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Subtotal</th>
            <th>Quitar</th>
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    let total = 0;

    userCart.games.forEach((game, index) => {
        const subtotal = game.price * game.quantity;
        total += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><img src="${game.background_image}" style="width: 50px; border-radius: 5px"></img></td>
            <td class="text-start">${game.name.length > 30 ? game.name.substring(0, 27) + '...' : game.name}</td>
            <td>
                <button class="btn-decrease quantity-decrease" data-id="${game.id}">-</button>
                ${game.quantity}
                <button class="btn-increase quantity-increase" data-id="${game.id}">+</button>
            </td>
            <td>${game.price}</td>
            <td>${subtotal.toFixed(2)}</td>
            <td>
                <button class="btn-danger delete-game" data-id="${game.id}"><i class="fa fa-trash" aria-hidden="true"></i></button>
            </td>
        `;
        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    const tfoot = document.createElement('tfoot');
    tfoot.innerHTML = `
        <tr>
            <td colspan="6" class="text-end">
                <strong>Total</strong>
            </td>

            <td>
                <strong>$${total.toFixed(2)} USD</strong>
            </td>
        </tr>
    `;
    table.appendChild(tfoot);

    cartTable.innerHTML = '';
    cartTable.appendChild(table);

    document.querySelectorAll('.quantity-decrease').forEach(button => {
        button.addEventListener('click', (e) => {
            updateQuantity(e.currentTarget.dataset.id, -1);
            Utils.updateCartItems();
        })
    });

    document.querySelectorAll('.quantity-increase').forEach(button => {
        button.addEventListener('click', (e) => {
            updateQuantity(e.currentTarget.dataset.id, 1);
            Utils.updateCartItems();
        })
    });

    
    document.querySelectorAll('.delete-game').forEach(button => {
        button.addEventListener('click', (e) => {
            deleteGame(e.currentTarget.dataset.id);
            Utils.updateCartItems();
        })
    });
}

function updateQuantity(gameId, change){
    const cart = Utils.getCart();
    const userId = Utils.getUserId();
    const userCart = Utils.getUserCart(cart, userId);

    if(!userCart) return;

    console.log('intentando actualizar');

    const game = userCart.games.find(g => g.id === gameId);
    console.log('upd quantity, game', game);
    if(!game) return;

    game.quantity += change;

    // Elimino el juego si la cantidad es cero
    if(game.quantity <= 0){
        console.log("la cantidad es cero");
        game.quantity = 1;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    getCartGames();
}

function deleteGame(gameId){
    const cart = Utils.getCart();
    const userId = Utils.getUserId();
    const userCart = Utils.getUserCart(cart, userId);

    userCart.games = userCart.games.filter(g => g.id !== gameId);

    localStorage.setItem('cart', JSON.stringify(cart));
    getCartGames();
}

function cartH1(){
    const cartH1 = document.querySelector('.cart-h1');
    const userId = Utils.getUserId();
    
    const user = Utils.getUserInformation(userId);
    cartH1.textContent = `${user.username}, tus juegos en el carrito`;
}


if(Utils.checkIfLoggedIn()){
    console.log("logueado");
    getCartGames();
} else {
    window.location.href = 'index.html';
}

cartH1();

Utils.hideLoader(500);