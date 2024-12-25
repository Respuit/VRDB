let gamesData = [];
let filteredGamesData = [];
let softwareValue = '';
let searchValue = '';
let ratingValue = '';

document.getElementById("hamburger").addEventListener("click", function() {
    document.querySelector("header").classList.toggle("menu-active");
  });
  

const dataRenderFn = (dataPage) => {

    return `${dataPage
      .map(
        (game) => {
            const icons = {
                '1': 'fa-solid fa-face-laugh-beam',
                '2': 'fa-solid fa-face-smile',
                '3': 'fa-solid fa-face-meh',
                '4': 'fa-solid fa-face-frown',
                '5': 'fa-solid fa-face-angry'
            };
          const imageHTML = game.image;
          const parser = new DOMParser();
          const doc = parser.parseFromString(imageHTML, 'text/html');
          const imgElem = doc.body.firstChild;
          const gameAverages = game.averages;
          const averages = JSON.parse(gameAverages.replace('\n', ''));
          return `<a href="games/${game.id}.html" class="game-link">
                <article class="game-card">
                <img class="game-img" src="${imgElem.href}" alt="Descripción de ${game.title}">
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
                            <td><i class="rating rating-${averages.steamVR} ${icons[averages.steamVR?.toString()] || 'fa-solid fa-circle-question'} icon-dark icon-size"></i></td>
                            <td><i class="rating rating-${averages.monado} ${icons[averages.monado?.toString()] || 'fa-solid fa-circle-question'} icon-dark icon-size"></i></td>
                            <td><i class="rating rating-${averages.alvr} ${icons[averages.alvr?.toString()] || 'fa-solid fa-circle-question'} icon-dark icon-size"></i></td>
                            <td><i class="rating rating-${averages.wivrn} ${icons[averages.wivrn?.toString()] || 'fa-solid fa-circle-question'} icon-dark icon-size"></i></td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
                </article>
            </a>`;
        })
      .join('')}`;
  };


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
    const icons = {
        '1': 'fa-solid fa-face-laugh-beam',
        '2': 'fa-solid fa-face-smile',
        '3': 'fa-solid fa-face-meh',
        '4': 'fa-solid fa-face-frown',
        '5': 'fa-solid fa-face-angry'
    };
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
                    <td><i class="rating rating-${game.averages.steamVR} {icons[game.averages.steamVR.toString()] || 'fa-solid fa-circle-question'} icon-dark icon-size"></i></td>
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
    const gameAverages = game.averages;
    const averages = JSON.parse(gameAverages.replace('\n', ''));
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
                ratingGame = averages['steamVR'];
                break;
            default:
                ratingGame = averages[softwareValue];
                break;
        }
    
        if (softwareValue !== '' && (ratingGame > ratingValue || !ratingGame)) {
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
    softwareValue = document.getElementById('software-filter').value.toLowerCase();
    ratingValue = parseFloat(ratingFilter.value);
    searchValue = document.getElementById('searchInput').value.toLowerCase(); 
  
    //const games = document.querySelectorAll('.game-card');

    filteredGamesData = gamesData.filter(filters);
    

    if (filteredGamesData.length > 0) {
        new PaginationSystem({
            dataContainer: document.querySelector('.game-list'),
            dataRenderFn: dataRenderFn,
            perPage: 50,
            isShowPerPage: false,
            data: filteredGamesData || [],
            pagingContainer: document.querySelector('.paging-container'),
            countRecords: filteredGamesData.length || 0,
        });
    } else {
        document.querySelector('.game-list').innerHTML = '<p>No results found</p>';
        document.querySelector('.paging-container').innerHTML = '';
    }
  
    ratingFilter.disabled = softwareValue === '';
}

// En desuso
async function search() {
    const searchInput = document.getElementById('searchInput').value.trim();
    const resultsContainer = document.getElementById('game-list');

    if (searchInput === "") {
    resultsContainer.textContent = "Please, search a game title.";
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

        new PaginationSystem({
            dataContainer: document.querySelector('.game-list'),
            dataRenderFn: dataRenderFn,
            perPage: 50,
            isShowPerPage: false,
            data: gamesData || [],
            pagingContainer: document.querySelector('.paging-container'),
            countRecords: gamesData.length || 0,
        });
    });
});