const findMe = () => {
const success = (position) => {
    console.log(position);
    status.textContent = "success";
    const { latitude, longitude } = position.coords;
    ;
  };
  const error = () => {
    
  };
  navigator.geolocation.getCurrentPosition(success, error);
};
// Search Bar or button
// 7day forecast   ReadAPI- primary endpoint using coord. and response structure
//1. dates &days 2.icon 3.tempature high and low  4 weather conditions(e.g.cloudy, rainy)  


// Selecting Elements
    const fetchWeatherBtn = document.getElementById('fetchWeatherBtn');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const weatherContainer = document.getElementById('weatherContainer');
    
    // API key
    const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
    
    // Function to Fetch Weather Data
    function fetchWeatherWithLoading() {
      const city = 'Biloxi';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
 
      // Show Loading Spinner
    loadingSpinner.style.display = 'block';
     
    weatherContainer.innerHTML = ''; // Clear previous content
    
    fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Weather data not available');
          }
          return response.json();
        })
        .then(data => {
             return new Promise(resolve => {
            setTimeout(() => resolve(data), 2000);
             });
        })
        .then(data => {
          // Hide Loading Spinner
          loadingSpinner.style.display = 'none';
        // Display Weather Data  
          weatherContainer.innerHTML = `
            <h2>${data.name}</h2>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Weather: ${data.weather[0].description}</p>
          `;
          console.log('Weather Data:', data);
        })
        .catch(error => {
            loadingSpinner.style.display = 'none';
          weatherContainer.innerHTML = `<p>Error: ${error.message}</p>`;
          console.error('Fetch Error:', error);
        });
    }
    
    // Adding Event Listener to the Button
    fetchWeatherBtn.addEventListener('click', fetchWeatherWithLoading);