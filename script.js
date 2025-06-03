const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

// Elementos da DOM
const input = document.getElementById("pokemonInput");
const button = document.getElementById("searchBtn");

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const card = document.getElementById("pokemonCard");

const nameEl = document.getElementById("pokemonName");
const numberEl = document.getElementById("pokemonNumber");
const spriteEl = document.getElementById("pokemonSprite");
const heightEl = document.getElementById("pokemonHeight");
const weightEl = document.getElementById("pokemonWeight");
const typesEl = document.getElementById("pokemonTypes");

button.addEventListener("click", () => {
    const query = input.value.trim().toLowerCase();
    if (!query) return;

    showLoading(true);
    hideError();
    hideCard();

    fetch(`${baseUrl}${query}`)
        .then(response => {
            if (!response.ok) throw new Error("Pokémon não encontrado");
            return response.json();
        })
        .then(data => {
            nameEl.textContent = capitalize(data.name);
            numberEl.textContent = `#${padNumber(data.id, 3)}`;
            spriteEl.src = data.sprites.front_default;
            heightEl.textContent = `${data.height / 10} m`;
            weightEl.textContent = `${data.weight / 10} kg`;
            typesEl.textContent = data.types.map(t => t.type.name).join(", ");

            showCard();
        })
        .catch(() => {
            showError();
        })
        .finally(() => {
            showLoading(false);
            input.value = '';
        });
});

// Funções utilitárias
function padNumber(num, size) {
    return String(num).padStart(size, '0');
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function showLoading(show) {
    loading.classList.toggle("hidden", !show);
}

function showError() {
    error.classList.remove("hidden");
}

function hideError() {
    error.classList.add("hidden");
}

function showCard() {
    card.classList.remove("hidden");
}

function hideCard() {
    card.classList.add("hidden");
}
