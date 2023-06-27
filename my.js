const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Зупинити перезавантаження сторінки

  const searchTerm = searchInput.value;

  // Виконати запит до API фільмів
  axios.get('http://www.omdbapi.com/?apikey=9e891ece&s='+ searchTerm)
    .then(function (response) {
      const movies = response.data.Search;

      // Відобразити результати пошуку
        displayMovies(movies);
    })
    .catch(function (error) {
      console.log(error);
    });
});

function displayMovies(movies) {
    const resultsContainer = document.getElementById('results-container');

    // Очистити попередні результати
    while (resultsContainer.firstChild) {
        resultsContainer.removeChild(resultsContainer.firstChild);
    }
  
    movies.forEach(function (movie) {
      const movieElement = document.createElement('div');
      movieElement.innerHTML = `

        <div class="card border-success mb-3" style="max-width: 20rem;">
            <div class="card-header">${movie.Title} ${movie.Year}</div>
            <div class="card-body">
                <img src="${movie.Poster}" alt="${movie.Title}"> <br> <br>
  
                <!-- Додаткова інформація про фільм -->
                <button class="btn btn-primary" onclick="showMovieDetails('${movie.imdbID}')">Детальніше</button>
                <br>
            </div>
        </div>
      `;
  
      resultsContainer.appendChild(movieElement);
    });
  }

function showMovieDetails(movieId) {
    // Виконати запит до API для отримання детальної інформації про фільм з movieId
    axios.get(`http://www.omdbapi.com/?apikey=9e891ece&i=`+ movieId)
        .then(function (response) {
        const movie = response.data;

        // Відобразити детальну інформацію про фільм
        console.log(movie)
        displayMovieDetails(movie);
    })
    .catch(function (error) {
        console.log(error);
    });
}

function displayMovieDetails(movie) {
    const movieModalBody = document.getElementById('movieModalBody');
    movieModalBody.innerHTML = `
        <h3>${movie.Title} ${movie.Year}</h3>
        <p>${movie.Plot}</p>
        <div class="img-center">
            <img src="${movie.Poster}" alt="${movie.Title}">
        </div> <br>
        <p>Жанр: ${movie.Genre}</p>
        <p>Награды: ${movie.Awards}</p>
        <p>Длительность: ${movie.Runtime}</p>
        <p>Рейтинг:  ${movie.Ratings[0].Value}</p>
        <!-- Додаткова інформація про фільм -->
    `;
  
    // Відкрити модальне вікно
    const movieModal = new bootstrap.Modal(document.getElementById('movieModal'), {
        backdrop: 'static',
        keyboard: false
    });
    movieModal.show();
}