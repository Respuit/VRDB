let gamesData = [];
let filteredGamesData = [];
let softwareValue = '';
let searchValue = '';
let ratingValue = '';


// Función para obtener los datos del archivo JSON
async function fetchGameData() {
    try {
    const response = await fetch('games-data.json'); // Cambia a tu ruta real
    if (!response.ok) {
        throw new Error("Error al cargar el JSON");
    }
    return await response.json();
    } catch (error) {
    console.error("Error al obtener los datos del juego:", error);
    return [];
    }
}

// Función para buscar por nombre de manera flexible
async function searchByName(query) {
    //const gamesData = await fetchGameData();

    // Normalizar el query y buscar coincidencias parciales en el nombre
    const regex = new RegExp(query, 'i'); // 'i' para que sea insensible a mayúsculas/minúsculas

    // Filtrar los juegos que contengan el query dentro del nombre
    filteredGamesData = gamesData.filter(game => regex.test(game.title));

    return filteredGamesData;
}

// Función para generar la estructura HTML para los resultados
function generateGameCard(game) {
    return `
    <a href="games/${game.id}.html" class="game-link">
        <article class="game-card">
        <img class="game-img" src="${game.image}" alt="Descripción de ${game.title}">
        <div class="game-info">
            <h3>${game.title}</h3>
            <div class="rating-container">
            <table class="rating-table">
                <tbody>
                <tr class="software-list">
                    <td class="rating-text">SteamVR</td>
                    <td class="rating-text">Monado</td>
                    <td class="rating-text">ALVR</td>
                    <td class="rating-text">WiVRn</td>
                </tr>
                <tr class="rating-list">
                    <td><i class="rating rating-${game.averages.steamVR} fa-solid fa-circle-question icon-dark icon-size"></i></td>
                    <td><i class="rating rating-${game.averages.monado} fa-solid fa-circle-question icon-dark icon-size"></i></td>
                    <td><i class="rating rating-${game.averages.alvr} fa-solid fa-circle-question icon-dark icon-size"></i></td>
                    <td><i class="rating rating-${game.averages.wivrn} fa-solid fa-circle-question icon-dark icon-size"></i></td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
        </article>
    </a>
    `;
}

function generateGamesPage(index) {
    return `<span class="page-item" data-page="${index}">${index + 1}</span>`;
}

function filters(game) {
    if (searchValue !== '') {
        const regex = new RegExp(searchValue, 'i');
        if (!regex.test(game.title)) {
            return false;
        }
    }


    if (ratingValue) {
        let ratingGame = 0;
        switch(softwareValue) {
            case 'steamvr':
                ratingGame = game.averages['steamVR'];
                break;
            default:
                ratingGame = game.averages[softwareValue];
                break;
        }
    
        if (ratingGame > ratingValue || !ratingGame) {
            return false;
        }
    }

    return true;

}

function movePage(event) {

    console.log(event.target);
    const index = event.target.getAttribute('data-page');

    const resultsContainer = document.getElementById('game-list');

    const j = index*50;
    chunkData = filteredGamesData.slice(j, j+50);

    resultsContainer.innerHTML = "";
    chunkData.forEach(game => {
        const gameCardHTML = generateGameCard(game);
        resultsContainer.innerHTML += gameCardHTML;  // Agregar la tarjeta del juego
    });
}

function applyFilters() {
    const ratingFilter = document.getElementById('rating-filter');
    const resultsContainer = document.getElementById('game-list');
    const pagination = document.getElementById('pagination');
    softwareValue = document.getElementById('software-filter').value.toLowerCase();
    ratingValue = parseFloat(ratingFilter.value);
    searchValue = document.getElementById('searchInput').value.toLowerCase(); 
  
    //const games = document.querySelectorAll('.game-card');

    filteredGamesData = gamesData.filter(filters);

    let chunkData = filteredGamesData;
    let pages = 0;

    if (filteredGamesData.length > 50) {
        chunkData = filteredGamesData.slice(0, 50);
        pages = Math.round(filteredGamesData.length / 50);
    }

    resultsContainer.innerHTML = "";
    pagination.innerHTML = "";

    if (chunkData.length > 0) {
        chunkData.forEach(game => {
            const gameCardHTML = generateGameCard(game);
            resultsContainer.innerHTML += gameCardHTML;  // Agregar la tarjeta del juego
        });
        for (let index = 0; index < pages; index++) {
            const element = generateGamesPage(index);
            pagination.innerHTML += element;
            let pages = document.getElementsByClassName('page-item');
            for (let k = 0; k < pages.length; k++) {
                pages[k].addEventListener('click', movePage);
            }
        }
    } else {
        resultsContainer.textContent = `No games could be found that match the requested filters: ${searchValue}`;
    }
  
    if (softwareValue === "") {
      ratingFilter.value = "";
      ratingFilter.disabled = true;
      const regex = new RegExp(searchValue, 'i');

      filteredGamesData = gamesData.filter(game => regex.test(game.title))
    } else {
      ratingFilter.disabled = false;
    }
}

// En desuso
async function search() {
    const searchInput = document.getElementById('searchInput').value.trim();
    const resultsContainer = document.getElementById('game-list');

    if (searchInput === "") {
    resultsContainer.textContent = "Please, introduce a game title.";
    return;
    }

    const games = await searchByName(searchInput);

    // Limpiar resultados previos
    resultsContainer.innerHTML = "";

    // Mostrar resultados
    if (games.length > 0) {
    games.forEach(game => {
        const gameCardHTML = generateGameCard(game);
        resultsContainer.innerHTML += gameCardHTML;  // Agregar la tarjeta del juego
    });
    } else {
    resultsContainer.textContent = `No se encontró ningún juego que coincida con: ${searchInput}`;
    }
}

document.addEventListener("DOMContentLoaded", async (event) => {
    document.getElementById('software-filter').addEventListener('change', applyFilters);
    document.getElementById('rating-filter').addEventListener('change', applyFilters);

    // Manejar el evento de búsqueda
    document.getElementById('searchButton').addEventListener('click', applyFilters);

    await fetchGameData().then(function(result) {
        gamesData = result;
        console.log(gamesData);
    });
});