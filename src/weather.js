
import React, { useEffect, useState } from 'react';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=ff9b41622f994b1287a73535210809&q=${city}&days=3`
        );

        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
        } else {
          console.error('Failed to fetch weather data');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  const formattedDateDisplay = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return new Date(date).toLocaleDateString('en-US', options);
  };

  const weatherGifs = {
    sunny: 'https://media.tenor.com/AXST3pQh5r8AAAAd/sunny-day-when-sharks-attack.gif',
    rainy: 'https://media.tenor.com/MWsV17cvpwMAAAAC/rain-raining.gif',
    cloudy: 'https://www.adventurebikerider.com/wp-content/uploads/2017/10/tumblr_o27c7fByaO1tchrkco1_500.gif',
    windy: 'https://media.tenor.com/NyB6CSxBjIoAAAAC/hurricane-windy.gif',
    mist: 'https://thoughtsofwordsblog.files.wordpress.com/2017/01/tumblr_nijo7fzhbz1qg20oho1_500.gif'
    // Add more conditions and URLs as needed
  };

  let weatherBgClass = 'bg-gif'; // Apply the bg-gif class by default

  if (weatherData) {
    const condition = weatherData.current.condition.text.toLowerCase();
    // Check the condition and set the background GIF accordingly
    if (condition.includes('sunny') && weatherGifs.sunny) {
      weatherBgClass = 'bg-sunny';
    } else if ((condition.includes('rain') || condition.includes('shower')) && weatherGifs.rainy) {
      weatherBgClass = 'bg-rainy';
    } else if (condition.includes('cloud') && weatherGifs.cloudy) {
      weatherBgClass = 'bg-cloudy';
    } else if (condition.includes('wind') && weatherGifs.windy) {
      weatherBgClass = 'bg-windy';
    } else if (condition.includes('mist') && weatherGifs.mist) {
        weatherBgClass = 'bg-mist';
    }
    // Add more conditions and background classes as needed
  }

  return (
    <div className={`antialiased min-h-screen ${weatherBgClass}`}>
      <div className="w-full max-w-sm mx-auto">
        <div className="bg-white shadow rounded-lg p-5 dark:bg-gray-800 w-full">
          <h2 className="font-bold text-gray-800 text-lg dark:text-gray-400">
            {formattedDateDisplay(new Date())}
          </h2>

          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border rounded-lg p-2 my-2 focus:outline-none focus:ring focus:border-blue-300"
          />

          {weatherData && (
            <div class="deva">
              <div className="flex mt-4 mb-2">
                <div className="flex-1">
                  <div className="text-gray-600 text-sm dark:text-gray-400">
                    {weatherData.location.name + ', ' + weatherData.location.region}
                  </div>
                  <div className="text-3xl font-bold text-gray-800 dark:text-gray-300">
                    {weatherData.current.temp_c}°C
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {weatherData.current.condition.text}
                  </div>
                </div>
                <div className="w-24">
                  <img
                    src={`https:${weatherData.current.condition.icon}`}
                    alt={weatherData.current.condition.text}
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="flex space-x-2 justify-between border-t dark:border-gray-500">
                {weatherData.forecast.forecastday
                  .splice(1)
                  .map((forecast, key) => (
                    <div
                      className={`flex-1 text-center pt-3 ${
                        key === 0 ? 'border-r dark:border-gray-500' : ''
                      }`}
                      key={key}
                    >
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {`${forecast.date.split('-')[2]}/${forecast.date.split('-')[1]}/${forecast.date.split('-')[0]}`}
                      </div>
                      <img
                        src={`https:${forecast.day.condition.icon}`}
                        alt={forecast.day.condition.text}
                        loading="lazy"
                        className="mx-auto"
                      />
                      <div className="font-semibold text-gray-800 mt-1.5 dark:text-gray-300">
                        {`${forecast.day.maxtemp_c}°C`}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {forecast.day.condition.text}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {weatherData == null && (
            <div className="animate-pulse">
              <div className="flex mt-4 mb-5">
                <div className="flex-1">
                  <div className="rounded h-2 mb-1.5 bg-gray-200 w-1/2"></div>
                  <div className="bg-gray-200 rounded h-4"></div>
                  <div className="rounded h-2 mt-1.5 bg-gray-200 w-1/2"></div>
                </div>
                <div className="w-24">
                  <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto"></div>
                </div>
              </div>

              <div className="flex space-x-2 justify-between border-t h-32 dark:border-gray-500">
                <div className="flex-1 text-center pt-4 border-r px-5 dark:border-gray-500">
                  <div className="rounded h-2 mb-2 bg-gray-200 w-1/2 mx-auto"></div>
                  <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2"></div>
                  <div className="rounded h-3 mt-1 bg-gray-200 mt-1.5 mx-auto"></div>
                  <div className="rounded h-2 mt-1 bg-gray-200 w-1/2 mx-auto"></div>
                </div>
                <div className="flex-1 text-center pt-4 px-5">
                  <div className="rounded h-2 mb-2 bg-gray-200 w-1/2 mx-auto"></div>
                  <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2"></div>
                  <div className="rounded h-3 mt-1 bg-gray-200 mt-1.5 mx-auto"></div>
                  <div className="rounded h-2 mt-1 bg-gray-200 w-1/2 mx-auto"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;