document.addEventListener('DOMContentLoaded', function() {

    // Initialize variable to track available tickets
    let ticketsAvailable = 0;
  
    // Fetch all movies
    fetch("http://localhost:3000/films")
        .then(response => response.json())
        .then(data => {
            const filmsList = document.getElementById('films');
  
            // Populate movie list
            data.forEach(movie => {
                const li = document.createElement('li');
                li.classList.add('film');
                li.textContent = movie.title;
                li.addEventListener('click', () => showMovieDetails(movie));
                filmsList.appendChild(li);
            });
  
            // Display details of the first movie initially
            if (data.length > 0) {
                showMovieDetails(data[0]);
            }
        })
        .catch(error => console.error('Error fetching movies:', error));
  
    // Function to display movie details
    function showMovieDetails(movie) {
        const poster = document.getElementById('poster');
        const title = document.getElementById('movie-title');
        const runtime = document.getElementById('runtime');
        const showtime = document.getElementById('showtime');
        const availableTickets = document.getElementById('available-tickets');
        const buyTicketBtn = document.getElementById('buy-ticket-btn');
  
        poster.src = movie.poster;
        title.textContent = movie.title;
        runtime.textContent = movie.runtime;
        showtime.textContent = movie.showtime;
  
        // Calculate available tickets
        const ticketsSold = movie.tickets_sold;
        const capacity = movie.capacity;
        ticketsAvailable = capacity - ticketsSold; // Update ticketsAvailable here
        availableTickets.textContent = ticketsAvailable;
  
        // Enable/disable buy ticket button based on availability
        buyTicketBtn.disabled = ticketsAvailable === 0;
  
        // Add event listener for buy ticket button
        buyTicketBtn.addEventListener('click', () => {
            if (ticketsAvailable > 0) {
                // Simulate ticket purchase (front-end only)
                ticketsAvailable--; // Update ticketsAvailable
                availableTickets.textContent = ticketsAvailable;
                buyTicketBtn.disabled = ticketsAvailable === 0;
            }
        });
    }
  });
  