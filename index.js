const gamesInformation = [];

function checkIfLoggedIn(){
    const loggedIn = JSON.parse(sessionStorage.getItem('loggedIn'));

    if(!loggedIn){
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
    cartLink.setAttribute('href', 'carrito.html');

    cartIcon.className = 'fa fa-shopping-cart';
    cartIcon.setAttribute('aria-hidden', true);

    cartLink.appendChild(cartIcon);
    registerLink.appendChild(cartLink);

    // 4 - Reemplazo el link de login por el perfil de usuario
    const userIcon = document.createElement('i');
    const userLink = document.createElement('a');

    userLink.className = 'nav-link';
    userLink.setAttribute('href', 'perfil.html');

    userIcon.className = 'fa fa-user-circle-o';
    userIcon.setAttribute('aria-hidden', true);

    userLink.appendChild(userIcon);
    loginLink.appendChild(userLink);
}

function showToast(text, success){
    const toast = new bootstrap.Toast('.toast');
    const toastBody = document.querySelector('.toast-body');

    if(success){
        const toastHTML = document.querySelector('.toast');
        toastHTML.classList.toggle('success');
    }
    
    toastBody.innerHTML = text;
    toast.show();
}

checkIfLoggedIn();

function loadGamesIndex(){
    fetch("https://jsonfakery.com/games/random/6")
        .then(response => {
            if(!response.ok){
                showToast('Error al obtener los juegos', false);
                return;
            }

            return response.json();
        })
        .then(gamesFetched => {
            console.log("Juegos: ", gamesFetched);

            const gamesCards = document.getElementById('productos');
            gamesFetched.forEach(game => {

                const gameCard = document.createElement('div');
                gameCard.classList = 'game-card';

                // 1- Imagen del juego
                if(game.background_image === null){
                    console.log("Había un juego sin imágen, se aplicó imágen por defecto");
                    
                    game.background_image = 'assets/img/default.avif';
                }

                const gameImg = document.createElement('img');
                gameImg.src = game.background_image;
                gameImg.alt = game.slug;
                gameCard.appendChild(gameImg);

                // 2 - título
                const gameTitle = document.createElement('div');
                gameTitle.classList = 'game-title';

                gameTitle.innerHTML = `<p>${game.name}</p>`;

                gameCard.appendChild(gameTitle);

                // 3 - precio
                const gamePrice = document.createElement('div');
                gamePrice.classList = 'price';
                gameCard.appendChild(gamePrice);

                const calculatedGamePrice = calculateGamePrice(game);

                let appliedOffer = false;
                if(game.reviews_count >= 20){
                    const offerBanner = document.createElement('div');
                    offerBanner.classList = 'banner offer';
                    offerBanner.innerHTML = '<p>¡Oferta!</p>';
                    gameCard.appendChild(offerBanner);
                    
                    var previousPrice = document.createElement('small');
                    var randomDiscount = Math.floor(Math.random() * 5) + 1;

                    previousPrice.textContent = `$${(calculatedGamePrice)} USD`;

                    appliedOffer = true;
                }

                if(appliedOffer){
                    gamePrice.innerHTML = `<p>$${(calculatedGamePrice - randomDiscount).toFixed(2)} USD</p>`;
                    gamePrice.insertBefore(previousPrice, gamePrice.firstChild);
                } else {
                    gamePrice.innerHTML = `<p>$${calculatedGamePrice} USD</p>`;
                }

                // 4 - juego nuevo
                if(!appliedOffer && isNewGame(game.released)){
                    const newBanner = document.createElement('div');
                    newBanner.classList = 'banner new';
                    newBanner.innerHTML = '<p>¡Nuevo!</p>';

                    gameCard.appendChild(newBanner);
                }

                gamesCards.appendChild(gameCard);

                gamesInformation.push(game);
            });
        })
        .catch(error => {
            showToast(`Error al obtener los juegos: ${error}`, false);
        });
}

function loadMoreGames(){
    loadGamesIndex();
}

// Determina si un juego es "nuevo", si tiene menos de 5 años de lanzado
function isNewGame(releasedDate){
    const today = new Date();
    const releaseDate = new Date(releasedDate);

    const diffTime = today - releaseDate;
    const diffYears = diffTime / (1000 * 3600 * 24 * 365);

    return diffYears <= 5;
}


/* Se me ocurrió hacer un cálculo de precio en base a la información disponible del juego */
function calculateGamePrice(game){
    // Multiplicadores y sumadores segun la info
    const basePrice = 1;
    const genreMultiplier = 2;
    const platformMultiplier = 1.5;
    const reviewsFactor = 0.1;
    const ratingsFactor = 0.05;
    const recentGameBonus = 2;

    // Multiplicador por la cantidad de generos y plataformas
    const genrePrice = game.genres.length * genreMultiplier;
    const platformPrice = game.platforms.length * platformMultiplier;
    let finalPrice = basePrice + genrePrice + platformPrice;

    const reviewsPrice = Math.floor(game.reviews_count / 10) * reviewsFactor;
    finalPrice += reviewsPrice;

    const ratingsPrice = Math.floor(game.ratings_count / 10) * ratingsFactor;
    finalPrice += ratingsPrice;

    // Cálculo para ver si el juego tiene dos años o menos, en ese caso, se añade el bonus de +2
    const releaseDate = new Date(game.released);
    const currentDate = new Date();
    const diffInYears = (currentDate - releaseDate) / (1000 * 3600 * 24 * 365);
    if(diffInYears <= 2){
        finalPrice += recentGameBonus;
    }

    return finalPrice.toFixed(2);
}

function viewMoreListener(){
    const viewMoreBtn = document.querySelector('.view-more-btn');
    const gamesSection = document.querySelector('.games');

    viewMoreBtn.addEventListener("click", () => {
        loadMoreGames();
        gamesSection.removeChild(viewMoreBtn);
        gamesSection.appendChild(viewMoreBtn);
    });
}

viewMoreListener();

loadGamesIndex();
