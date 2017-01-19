// JavaScript File

getDate();
getTime();
loadWeather();


//The following function loads the current date to tag "date"
function getDate()
{
    var currentDate = new Date();
    var dateAsString = currentDate.toString()
    .split(" ")
    .splice(0, 4)
    .join(" ");
    
    document.getElementById("date").innerHTML = dateAsString;
}

//The following function loads the current time to tag "time"
function getTime()
{
    var currentTime = new Date();
    var timeAsString = currentTime.getHours().toString();
    var isAfterNoon = false;
    
    if (timeAsString > 12)
    {
        timeAsString -= 12;
        isAfterNoon = true;
    }
    
    if (currentTime.getMinutes() < 10)
    {
      timeAsString = timeAsString + ":0" + currentTime.getMinutes();
    }
    else
    {
      timeAsString = timeAsString + ":" + currentTime.getMinutes();
    }
    
    if (!isAfterNoon)
    {
        timeAsString += " am";
    }
    else
    {
        timeAsString += " pm"
    }
    
    document.getElementById("time").innerHTML = timeAsString;
}

function loadWeather() {
  var weather = "weather";
  var url = "https://api.forecast.io/forecast/"; // Dark Sky API url
  var apiKey = "YOUR API KEY"; // API key from Dark Sky

  function success(position) {
    var latitude = position.coords.latitude; // latitude using geolocation
    var longitude = position.coords.longitude; // longitude using geolocation
    
    alert(latitude, longitude);

    // API request:
    $.getJSON(url + apiKey + "/" + latitude + "," + longitude + "?callback=?", function(data) {
      weather.text("Based on your current location, it is " + data.currently.temperature + "° F right now");
    });
  }

  // This message is displayed if their is a geolocation error:
  function error() {
    alert("Unable to retrieve your location for weather");
  }

  // calling the geolocation API
  navigator.geolocation.getCurrentPosition(success, error);

  // the text that will be displayed while the function is making the request
  weather.text("fetching weather...");
}