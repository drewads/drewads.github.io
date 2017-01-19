// JavaScript File
$(window).on("load", main());

function main()
{
  getDate();
  getTime();
  getWeather();
  getLocation();
}



//The following function loads the current date to tag "date"
function getDate()
{
    var currentDate = new Date();
    var dateAsString = currentDate.toString()
    .split(" ")
    .splice(0, 4)
    .join(" ");
    
    document.getElementById("date").innerText = dateAsString;
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
    
    document.getElementById("time").innerText = timeAsString;
}

function getWeather() {
  var weatherID = document.getElementById('weather');
  var url = "https://api.forecast.io/forecast/"; // Dark Sky API url
  var apiKey = "f417f17969571f97cf5e00a5ef052376"; // API key from Dark Sky

  //If able to get location
  function success(position)
  {
    var latitude = position.coords.latitude; // user's latitude using geolocation
    var longitude = position.coords.longitude; // user's longitude using geolocation

    // API request
    $.getJSON(url + apiKey + "/" + latitude + ","
    + longitude + "?callback=?", function(data) {
      weatherID.innerText = "Based on your current location, it is "
      + Math.floor(data.currently.temperature + 0.5)
      + " degrees Fahrenheit right now";
    });
  }

  // This message is displayed if there is a geolocation error:
  function error() 
  {
    weatherID.innerText = "Unable to retrieve your location for weather";
  }

  // geolocation API call
  navigator.geolocation.getCurrentPosition(success, error);

  // the text that will be displayed while the geolocation request is being made
  weatherID.innerText = "fetching weather...";
}

function getLocation(latitude, longitude)
{
  var latlng = {lat: latitude, lng: longitude};
  document.getElementById('weather').innerText = geocoder.geocode({'location': latlng});
}