// Search Bar or button
// 7day forecast   ReadAPI- primary endpoint using coord. and response structure
//1. dates &days 2.icon 3.tempature high and low  4 weather conditions(e.g.cloudy, rainy)  

const fetchWeatherBtn = document.getElementById('fetchWeatherBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const weatherContainer = document.getElementById('weather-container');
const API_KEY = 'User-Agent:(https://github.com/Danareynolds-coding/Weather-Forecast, danareynolds77vj@gmail.com)';    

fetchWeatherBtn.addEventListener('click', handleClick);

function handleClick(){
  fetchWeatherWithLoading();
  }
    
function fetchWeatherWithLoading() {
    const latitude = 30;
    const longitude = 88;
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
        return new Promise(resolve => {
        setTimeout(() => resolve(data), 2000);
      });
      })
      .then(data => {
        loadingSpinner.style.display = 'none'; 

       const periods = data.properties.periods;
        const temps =periods.slice(0, 7);
        temps.innerHTML="";
        const daily = periods.filter(p=>p.isDaytime).slice(0,7);
        weatherContainer.innerHTML="";
        daily.forEach(day => {
        const dayDiv = document.createElement("div");
        dayDiv.className = "day";
        dayDiv.innerHTML = `
        
        <p class="icon">
          <img src="${day.icon}" alt="Weather icon representing ${day.shortForecast} for ${day.name}. The forecast describes: ${day.detailedForecast}. Temperature is ${day.temperature} degrees Fahrenheit. The icon visually summarizes the weather conditions for the day in the context of a weekly weather forecast display." />
           </p>
           <p>Temperature: ${day.temperature} degrees F</p>
            <h6><strong>${day.name}</strong><br>
           ${day.detailedForecast}
           </h6>
           
      `;
        weatherContainer.appendChild(dayDiv);
    });

  })
        .catch(error => {
          loadingSpinner.style.display = 'none';
          weatherContainer.innerHTML = `<p>Error: ${error.message}</p>`;
          console.error('Fetch Error:', error);
        });
    }

