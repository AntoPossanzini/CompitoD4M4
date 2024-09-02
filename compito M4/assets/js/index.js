const URL_PRODUCT = 'https://striveschool-api.herokuapp.com/api/product/';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQzMmJhODU0YmIwMjAwMTViNmY1NGYiLCJpYXQiOjE3MjUxMTUzMDQsImV4cCI6MTcyNjMyNDkwNH0.bFLRqsFKni5RnzVfOMq21HfrRUAKWIM5GYcH-PULg68';

const fetchProducts = async () => {
    try {
        let response = await fetch(URL_PRODUCT, {
            headers: {
                "Authorization": `Bearer ${API_KEY}`
            }
        });
        if (response.ok) {
            let products = await response.json();
            return products;
        } else {
            alert('We were able to contact the server, but there was a problem');
            return null;
        }
    } catch (error) {
        alert(error);
        return null;
    }
};

const createCardRef = (product) => {
    const cardRef = document.createElement('div');
    cardRef.innerHTML = `
        <div class="card mb-2 px-5">
            <h1 class="card-title display-6 mt-2 text-center text-info mt-4">${product.name}</h1>
            <img src="${product.imageUrl}" alt="Product"></img>
            <div class="card-body p-0">
                <p class="card-text small">${product.description}</p>
            </div>
            <div class="d-flex justify-content-end mb-3">
                <a href="./detail.html?eventId=${product._id}&edit=1" class="card-link text-warning fs-5 mr-5">Modifica</a>
                <a href="./detail.html?eventId=${product._id}&edit=0" class="card-link text-success fs-5 mr-5">Scopri di più</a>
            </div>
        </div>`;
    return cardRef;
};

const cardsSectionRef = document.getElementById('cardsSection');
const spinnerRef = document.getElementsByClassName('spinner-border')[0];
const goUpRef = document.getElementById('goUp');
let products = [];

window.onload = async () => {
    products = await fetchProducts();
    spinnerRef.classList.add('d-none');
    products.forEach(product => {
        let cardRef = createCardRef(product);
        cardsSectionRef.appendChild(cardRef);
    });
    goUpRef.classList.remove('d-none');
};