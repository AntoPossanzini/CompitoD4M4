const URL_PRODUCT = 'https://striveschool-api.herokuapp.com/api/product/';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQzMmJhODU0YmIwMjAwMTViNmY1NGYiLCJpYXQiOjE3MjUxMTUzMDQsImV4cCI6MTcyNjMyNDkwNH0.bFLRqsFKni5RnzVfOMq21HfrRUAKWIM5GYcH-PULg68';

const deleteProduct = async () => {
    try {
        let response = await fetch(`${URL_PRODUCT}${eventId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${API_KEY}`
            }
        });
        if (response.ok) {
            return false;
        } else {
            alert('We were able to contact the server, but there was a problem');
            return true;
        }
    } catch (error) {
        alert(error);
        return true;
    }
};

const fetchProduct = async () => {
    try {
        let response = await fetch(`${URL_PRODUCT}${eventId}`, {
            headers: {
                "Authorization": `Bearer ${API_KEY}`
            }
        });
        if (response.ok) {
            let product = await response.json();
            return product;
        } else {
            alert('We were able to contact the server, but there was a problem');
            return null;
        }
    } catch (error) {
        alert(error);
        return null;
    }
};

const queryParams = new URLSearchParams(window.location.search);
const eventId = queryParams.get('eventId');

const nameRef = document.getElementById('name');
const descriptionRef = document.getElementById('description');
const imageRef = document.getElementById('image');
const priceRef = document.getElementById('price');
const brandRef = document.getElementById('brand');

const buyBtnRef = document.getElementById('buyBtn');
const editBtnRef = document.getElementById('editBtn');
const deleteBtnRef = document.getElementById('deleteBtn');

const deleteConfBtnRef = document.getElementById('deleteConfBtn');

let product = {};

const fillSectionRef = (product) => {
    nameRef.innerText = product.name;
    product.description.trim().split('    ').forEach(element => {
        let newLiRef = document.createElement('li');
        newLiRef.innerText = element;
        descriptionRef.appendChild(newLiRef);
    });
    imageRef.setAttribute('src', product.imageUrl);
    priceRef.innerText = `${product.price} $`;
    brandRef.innerText = `${product.brand} presents`;
};

const showButtons = edit => {
    if (edit) {
        editBtnRef.classList.remove('d-none');
        deleteBtnRef.classList.remove('d-none');
    } else {
        buyBtnRef.classList.remove('d-none');
        priceRef.classList.remove('d-none');
    }
};

editBtnRef.addEventListener('click', event => {
    event.preventDefault();
    window.location.href = `./back_office.html?eventId=${product._id}&edit=1`;
});

deleteConfBtnRef.addEventListener('click', async event => {
    event.preventDefault();
    const error = await deleteProduct();
    if (!error) {
        window.location.href = `./index.html`;
    }
});

window.onload = async () => {
    product = await fetchProduct();
    localStorage.setItem('curr_product', JSON.stringify(product));
    fillSectionRef(product);
    const edit = Boolean(parseInt(queryParams.get('edit')));
    showButtons(edit);
};