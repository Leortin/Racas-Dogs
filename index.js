// script.js

const breedsList = document.querySelector('.breeds-list');
const imageGallery = document.getElementById('image-gallery');
const loading = document.getElementById('loading');

const apiUrl = 'https://dog.ceo/api';

// Função para obter a lista de raças de cachorros
async function fetchBreeds() {
    try {
        const response = await fetch(`${apiUrl}/breeds/list/all`);
        if (!response.ok) {
            throw new Error('Não foi possível carregar a lista de raças.');
        }
        const data = await response.json();
        const breeds = Object.keys(data.message);
        renderBreeds(breeds);
    } catch (error) {
        console.error('Erro ao carregar a lista de raças:', error.message);
        showError('Erro ao carregar a lista de raças. Tente novamente mais tarde.');
    }
}

// Função para renderizar os botões das raças na lista
function renderBreeds(breeds) {
    breedsList.innerHTML = '';
    breeds.forEach(breed => {
        const button = document.createElement('button');
        button.textContent = breed;
        button.addEventListener('click', () => fetchImages(breed));
        breedsList.appendChild(button);
    });
}

// Função para obter imagens aleatórias de uma raça específica
async function fetchImages(breed) {
    try {
        loading.style.display = 'block';
        const response = await fetch(`${apiUrl}/breed/${breed}/images/random/4`);
        if (!response.ok) {
            throw new Error('Não foi possível carregar as imagens da raça.');
        }
        const data = await response.json();
        renderImages(data.message);
    } catch (error) {
        console.error('Erro ao carregar as imagens da raça:', error.message);
        showError('Erro ao carregar as imagens da raça. Tente novamente mais tarde.');
    } finally {
        loading.style.display = 'none';
    }
}

// Função para renderizar as imagens na galeria
function renderImages(images) {
    imageGallery.innerHTML = '';
    images.forEach(imageUrl => {
        const img = document.createElement('img');
        img.src = imageUrl;
        imageGallery.appendChild(img);
    });
}

// Função para exibir mensagens de erro
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('error');
    errorDiv.textContent = message;
    breedsList.appendChild(errorDiv);
}

// Inicialização da aplicação
fetchBreeds();
