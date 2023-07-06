$(document).ready(function() {
  // Event listener for the form submission
  $("#search-form").submit(function(event) {
    event.preventDefault(); // Prevent form submission

    var city = $("#city-input").val().trim();
    if (city === "") {
      return; // Exit if the input is empty
    }

    // Fetch current weather data
    var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=02ed46ed421ccbbae1f2edd245303439";
    $.ajax({
      url: currentWeatherURL,
      method: "GET"
    }).then(function(response) {
      displayCurrentWeather(response);
    });

    // Fetch forecast data
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=02ed46ed421ccbbae1f2edd245303439";
    $.ajax({
      url: forecastURL,
      method: "GET"
    }).then(function(response) {
      displayForecast(response);
    });

    // Add the city to the search history
    var searchHistoryItem = $("<button>").addClass("btn btn-secondary").text(city);
    $("#search-history").prepend(searchHistoryItem);

    // Clear the input field
    $("#city-input").val("");
  });

  // Event listener for the search history buttons
  $("#search-history").on("click", ".btn-secondary", function() {
    var city = $(this).text();

    // Fetch current weather data
    var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=02ed46ed421ccbbae1f2edd245303439";
    $.ajax({
      url: currentWeatherURL,
      method: "GET"
    }).then(function(response) {
      displayCurrentWeather(response);
    });

    // Fetch forecast data
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=02ed46ed421ccbbae1f2edd245303439";
    $.ajax({
      url: forecastURL,
      method: "GET"
    }).then(function(response) {
      displayForecast(response);
    });
  });
});


function displayCurrentWeather(response) {
  // Extract the necessary data from the response
  var city = response.name;
  var date = new Date(response.dt * 1000).toLocaleDateString("en-US");
  var icon = response.weather[0].icon;
  var temperature = Math.round(response.main.temp - 273.15); // Convert temperature from Kelvin to Celsius
  var humidity = response.main.humidity;
  var windSpeed = response.wind.speed;

  // Create the HTML content for current weather
  var currentWeatherHTML = `
    <h2>Current Weather: ${city}</h2>
    <p>Date: ${date}</p>
    <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
    <p>Temperature: ${temperature}°C</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} m/s</p>
  `;

  // Update the current weather element with the HTML content
  $("#current-weather").html(currentWeatherHTML);
}



function displayForecast(response) {
  // Extract the necessary data from the response
  var forecastItems = response.list;

  // Create the HTML content for the forecast
  var forecastHTML = "";
  for (var i = 0; i < forecastItems.length; i++) {
    var forecastItem = forecastItems[i];
    var date = new Date(forecastItem.dt * 1000).toLocaleDateString("en-US");
    var icon = forecastItem.weather[0].icon;
    var temperature = Math.round(forecastItem.main.temp - 273.15); // Convert temperature from Kelvin to Celsius
    var humidity = forecastItem.main.humidity;
    var windSpeed = forecastItem.wind.speed;

    forecastHTML += `
      <div class="forecast-item">
        <p>Date: ${date}</p>
        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
      </div>
    `;
  }

  // Update the forecast element with the HTML content
  $("#forecast").html(forecastHTML);
}
