// Mendapatkan elemen HTML dengan ID 'movies-container' untuk menampilkan film
const moviesContainer = document.getElementById('movies-container');

// API key untuk mengakses data dari The Movie Database
const apiKey = 'f8c2a3db5e8eb0bfe178e65d75dcc350';

// Fungsi untuk mengambil data film dari API berdasarkan query
function fetchMovies(query) {
  // URL awal untuk mendapatkan daftar film populer
  let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

  // Jika terdapat query pencarian, gunakan endpoint pencarian
  if (query) {
    url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`;
  }

  // Mengambil data dari API menggunakan fetch
  fetch(url)
    .then(response => response.json()) // Mengubah respons ke dalam format JSON
    .then(data => {
      moviesContainer.innerHTML = ''; // Menghapus konten sebelum menampilkan hasil pencarian baru
      const movies = data.results; // Menyimpan hasil film dari respons API

      // Menampilkan setiap film yang diperoleh dari respons API
      movies.forEach(movie => {
        // Membuat elemen untuk setiap film yang akan ditampilkan
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        // Menampilkan judul film
        const titleElement = document.createElement('h2');
        titleElement.textContent = movie.title;
        movieElement.appendChild(titleElement);

        // Menampilkan poster film
        const posterElement = document.createElement('img');
        posterElement.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        posterElement.alt = movie.title;
        posterElement.style.width = '100%';
        movieElement.appendChild(posterElement);

        // Menampilkan tanggal rilis film
        const releaseDateElement = document.createElement('p');
        releaseDateElement.classList.add('release-date');
        releaseDateElement.innerHTML = `<strong>Release Date:</strong> ${movie.release_date}`;
        movieElement.appendChild(releaseDateElement);

        // Menampilkan rating film
        const rateElement = document.createElement('p');
        rateElement.textContent = `Rating: ${movie.vote_average}`;
        movieElement.appendChild(rateElement);

        // Menambahkan elemen film ke dalam container film
        moviesContainer.appendChild(movieElement);
      });
    })
    .catch(error => {
      console.error('Error:', error); // Menangani kesalahan jika terjadi
    });
}

// Menambahkan event listener pada form pencarian film
document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Mencegah aksi default dari form (pengiriman ulang halaman)
  const searchTerm = document.querySelector('#search-form input').value.trim(); // Mendapatkan kata kunci pencarian
  fetchMovies(searchTerm); // Memanggil fungsi fetchMovies dengan kata kunci pencarian
});

// Memanggil fungsi fetchMovies() saat halaman dimuat pertama kali
fetchMovies();
