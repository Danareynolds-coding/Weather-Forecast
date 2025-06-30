
const celsiusBtn = document.getElementById('celsiusBtn');
const celsiusBox = document.getElementById('celsius-box');
celsiusBtn.addEventListener("click", fetchCelsius);
async function fetchCelsius() {
        const url = `https://api.weather.gov/gridpoints/AKQ/30,88/forecast?units=us`;
    await fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Weather data not available');
            }
            return response.json();
            console.log(data);
        })
        .then(data => {
            return new Promise(resolve => {
                setTimeout(() => resolve(data), 2000);
            });
        })
        .then(data => {
            loadingSpinner.style.display = 'none';
            celsiusBox.innerHTML = '';
            const periods = data.properties.periods;
            periods.forEach(period => {
                    const fahrenheit = period.temperature;
                    const celsius = fahrenheitToCelsius(fahrenheit).toFixed(1);
                    const celsiusDiv = document.createElement('div');
                    celsiusDiv.classList.add('col-md-4', 'col-sm-5');                 
                    celsiusDiv.style.backgroundColor = 'aquamarine';
                    celsiusDiv.style.borderRadius = '8px';
                    celsiusDiv.style.margin = '10px';
                    celsiusDiv.style.width = 'auto';
                    celsiusDiv.innerHTML = `
                        <h2 class="col-1">${period.name}</h2>
                        <p class="col-1">Temperature: ${celsius}°C</p>
                    `;
                    celsiusBox.appendChild(celsiusDiv);
                })
            })
            .catch(error => {
                loadingSpinner.style.display = 'none';
                console.error('Error fetching or processing weather data:', error);
                return null;
            });
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}