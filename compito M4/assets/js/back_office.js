const URL_PRODUCT = 'https://striveschool-api.herokuapp.com/api/product/';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQzMmJhODU0YmIwMjAwMTViNmY1NGYiLCJpYXQiOjE3MjUxMTUzMDQsImV4cCI6MTcyNjMyNDkwNH0.bFLRqsFKni5RnzVfOMq21HfrRUAKWIM5GYcH-PULg68';

const saveProduct = async newProduct => {
    try {
        const url = eventId ? `${URL_PRODUCT}${eventId}` : URL_PRODUCT;
        let response = await fetch(url, {
            method: eventId ? 'PUT' : 'POST',
            body: JSON.stringify(newProduct),
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
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

const queryParams = new URLSearchParams(window.location.search);
const eventId = queryParams.get('eventId');
const edit = Boolean(parseInt(queryParams.get('edit')));

const product = JSON.parse(localStorage.getItem('curr_product'));

const formRef = document.getElementById('formProduct');
const nameFormRef = document.getElementById('name');
const descriptionFormRef = document.getElementById('description');
const imageUrlFormRef = document.getElementById('imageUrl');
const brandFormRef = document.getElementById('brand');
const priceFormRef = document.getElementById('price');
const priceInvalidRef = document.getElementById('priceInvalid');
const resetFormRef = document.getElementById('resetForm');
const submitBtnRef = document.getElementById('submitBtn');

const checkNameValue = () => {
    if (nameFormRef.value.trim()) {
        nameFormRef.classList.remove('is-invalid');
        nameFormRef.classList.add('is-valid');
        return false;
    } else {
        nameFormRef.classList.remove('is-valid');
        nameFormRef.classList.add('is-invalid');
        return true;
    }
};

const checkDescriptionValue = () => {
    if (descriptionFormRef.value.trim()) {
        descriptionFormRef.classList.remove('is-invalid');
        descriptionFormRef.classList.add('is-valid');
        return false;
    } else {
        descriptionFormRef.classList.remove('is-valid');
        descriptionFormRef.classList.add('is-invalid');
        return true;
    }
};

const checkImageUrlValue = () => {
    if (imageUrlFormRef.value.trim()) {
        imageUrlFormRef.classList.remove('is-invalid');
        imageUrlFormRef.classList.add('is-valid');
        return false;
    } else {
        imageUrlFormRef.classList.remove('is-valid');
        imageUrlFormRef.classList.add('is-invalid');
        return true;
    }
};

const checkBrandValue = () => {
    if (brandFormRef.value.trim()) {
        brandFormRef.classList.remove('is-invalid');
        brandFormRef.classList.add('is-valid');
        return false;
    } else {
        brandFormRef.classList.remove('is-valid');
        brandFormRef.classList.add('is-invalid');
        return true;
    }
};

const checkPriceValue = () => {
    priceFormRef.classList.remove('is-valid');
    priceFormRef.classList.add('is-invalid');

    const price = priceFormRef.value.trim();

    if (price) {
        if (!Number.isInteger(Number(price))) {
            priceInvalidRef.innerText = 'Price must be an integer!';
            return true;
        } else {
            priceFormRef.classList.remove('is-invalid');
            priceFormRef.classList.add('is-valid');
            return false;
        }
    } else {
        priceInvalidRef.innerText = 'Insert Price!';
        return true;
    }
};

const checkFormValues = () => {
    let errors = [
        checkNameValue(),
        checkDescriptionValue(),
        checkImageUrlValue(),
        checkBrandValue(),
        checkPriceValue()
    ];
    return errors.every((error) => !error);
};

const fillForm = () => {
    nameFormRef.value = product.name;
    descriptionFormRef.value = product.description.trim();
    imageUrlFormRef.value = product.imageUrl;
    brandFormRef.value = product.brand;
    priceFormRef.value = product.price;
};

formRef.addEventListener('submit', async (event) => {
    event.preventDefault();
    let isFormValid = checkFormValues();
    console.log(isFormValid);
    if (!isFormValid) {
        return;
    }
    let newProduct = {
        "name": nameFormRef.value,
        "description": descriptionFormRef.value,
        "imageUrl": imageUrlFormRef.value,
        "brand": brandFormRef.value,
        "price": parseInt(priceFormRef.value)
    };
    let errSave = await saveProduct(newProduct); // PUT || POST
    if (!errSave) {
        formRef.reset();
        window.location.href = "index.html";
    }
});

resetFormRef.addEventListener(('click'), event => {
    event.preventDefault();
    formRef.reset();
});

window.onload = () => {
    formRef.reset();
    if (edit) {
        fillForm();
        submitBtnRef.innerText = 'Update Product';
    }
};