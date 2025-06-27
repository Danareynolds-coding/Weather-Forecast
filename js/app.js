
// Search Bar or button
// 7day forecast   ReadAPI- primary endpoint using coord. and response structure
//1. dates &days 2.icon 3.tempature high and low  4 weather conditions(e.g.cloudy, rainy)  

const fetchWeatherBtn = document.getElementById('fetchWeatherBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const weatherContainer = document.getElementById('weather-container');
    
fetchWeatherBtn.addEventListener('click', fetchWeatherWithLoading());

    // API key
const API_KEY = 'User-Agent:(https://github.com/Danareynolds-coding/Weather-Forecast, danareynolds77vj@gmail.com)';
    
function fetchWeatherWithLoading() {
    const coordinates  = '30, 88';
    const url = `https://api.weather.gov/gridpoints/AKQ/30,88/forecast?units=us`;
    loadingSpinner.style.display = 'block';
  fetch(url)
      .then(response => {
        if (!response.ok) {
        throw new Error('Weather data not available')
      }
      return response.json()
  })
      .then(data => {
        //  console.log(data);
        return new Promise(resolve => {
        setTimeout(() => resolve(data), 2000);
      });
      })
      .then(data => {
        // console.log(data);
        loadingSpinner.style.display = 'none';
        const periods = data.properties.periods;
        const daily = periods.filter(p=>p.isDaytime).slice(0,7);
        weatherContainer.innerHTML="";
        daily.forEach(day => {
        const dayDiv = document.createElement("div");
        dayDiv.className = "day";
        dayDiv.innerHTML = `
            <h5><strong>${day.name}</strong><br>
           ${day.detailedForecast}
           </h5>
           `;
          weatherContainer.appendChild(dayDiv);
    });
  })
        .catch(error => {
          loadingSpinner.style.display = 'none';
          weatherDiv.innerHTML = `<p>Error: ${error.message}</p>`;
          console.error('Fetch Error:', error);
        });
    }
  