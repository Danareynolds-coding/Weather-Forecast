
// Search Bar or button
// 7day forecast   ReadAPI- primary endpoint using coord. and response structure
//1. dates &days 2.icon 3.tempature high and low  4 weather conditions(e.g.cloudy, rainy)  

// Selecting Elements
    const fetchWeatherBtn = document.getElementById('fetchWeatherBtn');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const weatherContainer = document.getElementById('weatherContainer');
    
    // API key
    const API_KEY = 'User-Agent:(https://github.com/Danareynolds-coding/Weather-Forecast, danareynolds77vj@gmail.com)';
    
    function fetchWeatherWithLoading() {
      const coordinates = '30, 88';
      const url = `https://api.weather.gov/gridpoints/AKQ/30,88/forecast?units=us`;
      
    loadingSpinner.style.display = 'block';
     
    weatherContainer.innerHTML = ''; 
    
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
          
          loadingSpinner.style.display = 'none';
          const currentDate = new Date();
          weatherContainer.innerHTML = `
            <h2>${data.name}</h2>
            <p>${data.Date}</p>
            <p>Temperature: ${data.temperature} °F </p>
            <P>Temperature: ${data.maxTemperature}°F </p>
            <P>Temperature: ${data.minTemperature}°F </p>
            <p>Weather: ${data.weatherconditions}</p>
          `;
          console.log('Weather Data:', data);
        })
        .catch(error => {
          loadingSpinner.style.display = 'none';
          weatherContainer.innerHTML = `<p>Error: ${error.message}</p>`;
          console.error('Fetch Error:', error);
        });
    }

    fetchWeatherBtn.addEventListener('click', fetchWeatherWithLoading);