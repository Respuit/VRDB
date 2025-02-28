let gamesData = [];
let filteredGamesData = [];
let softwareValue = '';
let searchValue = '';
let ratingValue = '';

document.getElementById("hamburger").addEventListener("click", function() {
    document.getElementById("hamburger-menu").classList.toggle("menu-active");
  });

  document.getElementById('searchButton').addEventListener('click', () => {
    applyFilters('searchInput', 'rating-filter', 'software-filter');
});
document.getElementById('software-filter').addEventListener('click', () => {
    applyFilters('searchInput', 'rating-filter', 'software-filter');
});
document.getElementById('rating-filter').addEventListener('click', () => {
    applyFilters('searchInput', 'rating-filter', 'software-filter');
});

document.getElementById('searchButton-hmenu').addEventListener('click', () => {
    applyFilters('searchInput-hmenu', 'software-filter-hmenu', 'rating-filter-hmenu');
});

document.getElementById('software-filter-hmenu').addEventListener('change', function () {
    const selectedValue = this.value;
    softwareValue = selectedValue.toLowerCase();
    console.log("Valor seleccionado para software:", softwareValue);


    if (softwareValue === 'all') {
        document.getElementById('rating-filter-hmenu').value = ''; 
        ratingValue = ''; 
        document.getElementById('rating-filter-hmenu').disabled = true; 
    } else {
        document.getElementById('rating-filter-hmenu').disabled = false; 
    }

    applyFilters('searchInput-hmenu', 'rating-filter-hmenu', 'software-filter-hmenu');
});


document.getElementById('rating-filter-hmenu').addEventListener('change', function () {
    const selectedValue = this.value;
    ratingValue = selectedValue !== "" ? parseFloat(selectedValue) : '';  

    
    if (ratingValue === '') {
        document.getElementById('software-filter-hmenu').value = '';
        softwareValue = ''; 
    }

    applyFilters('searchInput-hmenu', 'rating-filter-hmenu', 'software-filter-hmenu');
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
          const tempElem = document.createElement('div');
            tempElem.innerHTML = game.title;
            const cleanTitle = tempElem.textContent || tempElem.innerText;
          return `<a href="games/${game.id}.html" class="game-link">
                <article class="game-card">
                <img class="game-img" src="${imgElem.href}" alt="Descripción de ${cleanTitle}">
                <div class="game-info">
                    <h3>${cleanTitle}</h3>
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
                            <td><i class="rating rating-${Math.round(averages.steamVR)} ${icons[Math.round(averages.steamVR)?.toString()] || 'fa-solid fa-circle-question'} icon-dark icon-size"></i></td>
                            <td><i class="rating rating-${Math.round(averages.monado)} ${icons[Math.round(averages.monado)?.toString()] || 'fa-solid fa-circle-question'} icon-dark icon-size"></i></td>
                            <td><i class="rating rating-${Math.round(averages.alvr)} ${icons[Math.round(averages.alvr)?.toString()] || 'fa-solid fa-circle-question'} icon-dark icon-size"></i></td>
                            <td><i class="rating rating-${Math.round(averages.wivrn)} ${icons[Math.round(averages.wivrn)?.toString()] || 'fa-solid fa-circle-question'} icon-dark icon-size"></i></td>
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



async function fetchGameData() {
    try {
    const response = await fetch('games-data.json'); 
    if (!response.ok) {
        throw new Error("Error al cargar el JSON");
    }
    return await response.json();
    } catch (error) {
    console.error("Error al obtener los datos del juego:", error);
    return [];
    }
}


async function searchByName(query) {

    const regex = new RegExp(query, 'i'); 

    
    filteredGamesData = gamesData.filter(game => regex.test(game.title));

    return filteredGamesData;
}


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
        resultsContainer.innerHTML += gameCardHTML;  
    });
}




function applyFilters(searchInput, rating, software) {
    const ratingFilter = document.getElementById(rating);
    console.log(document.getElementById(software).value.toLowerCase())
    softwareValue = document.getElementById(software).value.toLowerCase();
    ratingValue = parseFloat(ratingFilter.value);
    searchValue = document.getElementById(searchInput).value.toLowerCase(); 
  
    

    filteredGamesData = gamesData.filter(filters);
    filteredGamesData.sort((a, b) => (b.opinionsCount || 0) - (a.opinionsCount || 0));

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


document.addEventListener("DOMContentLoaded", async (event) => {
    document.getElementById('software-filter').addEventListener('change', applyFilters);
    document.getElementById('rating-filter').addEventListener('change', applyFilters);

    
    document.getElementById('searchButton').addEventListener('click', applyFilters);

    await fetchGameData().then(function(result) {
        gamesData = result;

        gamesData.sort((a, b) => (b.opinionsCount || 0) - (a.opinionsCount || 0));
        
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


// Config
const isOpenClass = "modal-is-open";
const openingClass = "modal-is-opening";
const closingClass = "modal-is-closing";
const scrollbarWidthCssVar = "--pico-scrollbar-width";
const animationDuration = 400; // ms
let visibleModal = null;

// Toggle modal
const toggleModal = (event) => {
  event.preventDefault();
  const modal = document.getElementById(event.currentTarget.dataset.target);
  if (!modal) return;
  modal && (modal.open ? closeModal(modal) : openModal(modal));
};

// Open modal
const openModal = (modal) => {
  const { documentElement: html } = document;
  const scrollbarWidth = getScrollbarWidth();
  if (scrollbarWidth) {
    html.style.setProperty(scrollbarWidthCssVar, `${scrollbarWidth}px`);
  }
  html.classList.add(isOpenClass, openingClass);
  setTimeout(() => {
    visibleModal = modal;
    html.classList.remove(openingClass);
  }, animationDuration);
  modal.showModal();
};

// Close modal
const closeModal = (modal) => {
  visibleModal = null;
  const { documentElement: html } = document;
  html.classList.add(closingClass);
  setTimeout(() => {
    html.classList.remove(closingClass, isOpenClass);
    html.style.removeProperty(scrollbarWidthCssVar);
    modal.close();
  }, animationDuration);
};

// Close with a click outside
document.addEventListener("click", (event) => {
  if (visibleModal === null) return;
  const modalContent = visibleModal.querySelector("article");
  const isClickInside = modalContent.contains(event.target);
  !isClickInside && closeModal(visibleModal);
});

// Close with Esc key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && visibleModal) {
    closeModal(visibleModal);
  }
});

// Get scrollbar width
const getScrollbarWidth = () => {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  return scrollbarWidth;
};

// Is scrollbar visible
const isScrollbarVisible = () => {
  return document.body.scrollHeight > screen.height;
};
