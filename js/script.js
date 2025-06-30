const latitude = 30;
const longitude = 88;
// headers: {'User-Agent': 'https://github.com/Danareynolds-coding/weather-app-using-ai (danareynolds77vj@gmail.com)'
//                 }
const progressBar = document.querySelector('.loading-bar');

function updateProgressBar(percentage) {
  progressBar.style.width = percentage + '%';
}
let progress = 0;
const interval = setInterval(() => {
  progress += 10;
  updateProgressBar(progress);
  if (progress >= 100) {
    clearInterval(interval);
  }
}, 2000);

const tempBtn = document.getElementById('tempBtn');
tempBtn.addEventListener("click", handleclick);

function handleclick() {
    fetchForecast();
    updateProgressBar();
}

 function fetchForecast() {
        const url = `https://api.weather.gov/gridpoints/AKQ/30,88/forecast?units=us`;
         
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
            console.log(data);
            const forecastData = data.properties.periods;
            displayForecast(forecastData);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            document.getElementById("temperature-box").innerHTML = "<p>Error loading weather data.</p>";
        });
    }

    function displayForecast(data) {
        const temperatureBox = document.getElementById("temperature-box");
        temperatureBox.innerHTML = "";
        const dailyForecast = {};
        data.forEach(period => {
            const date = new Date(period.startTime).toDateString();
            if (!dailyForecast[date]) {
                dailyForecast[date] = { minTemp: Infinity, maxTemp: -Infinity, periods: [] };
            }
            dailyForecast[date].minTemp = Math.min(dailyForecast[date].minTemp, period.temperature);
            dailyForecast[date].maxTemp = Math.max(dailyForecast[date].maxTemp, period.temperature);
            dailyForecast[date].periods.push(period);
        });

        for (const date in dailyForecast) {
            const dayData = dailyForecast[date];
            const dayElement = document.createElement("div");
            dayElement.style.backgroundColor = 'aliceblue';
            dayElement.style.borderRadius = '10px';
            dayElement.style.margin = '10px';

            dayElement.innerHTML = `
                <h2 class="col-12">${date}</h2>
                <p>Min Temperature: ${dayData.minTemp}°F</p>
                <p>Max Temperature: ${dayData.maxTemp}°F</p>
            `;
            temperatureBox.appendChild(dayElement);
        }
}
        
        
    