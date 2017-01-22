// JavaScript File

$(window).on("load", main());

function main()
{
  getDate();
  getTime();
  getWeather();
}

//The following function loads the current date to tag "date"
function getDate()
{
    var currentDate = new Date();
    var dateAsString = currentDate.toString()
    .split(" ")
    .splice(0, 4)
    .join(" ");
    
    //Adds "day" to the end of the first part of the day name
    var dayIDMaxLength = 5;
    var dayID = dateAsString.substring(0,dayIDMaxLength);
    var dayName = correctDayID(dayID, dayIDLength);
    dateAsString = dayName + ", " + dateAsString.substring(dayIDLength(dayID), dateAsString.length - 5) + ", " + dateAsString.substring(dateAsString.length - 4);
    
    document.getElementById("date").innerText = dateAsString;
}

//Finds the length of the day abbreviation
function dayIDLength(dayID)
{
  if (dayID.substring(0, 3) == "Sun"
  || dayID.substring(0, 3) == "Mon"
  || dayID.substring(0, 3) == "Wed"
  || dayID.substring(0, 3) == "Fri"
  || dayID.substring(0,3) == "Sat")
  {
    return 3;
  }
  else if (dayID.substring(0, 4) == "Tues")
  {
    return 4;
  }
  else if (dayID.substring(0, 5) == "Thurs")
  {
    return 5;
  }
}

//Returns correct day name
function correctDayID(dayID, dayIDLength)
{
  if (dayID.substring(0, dayIDLength(dayID)) == "Mon")
  {
    return "Monday";  
  }
  else if (dayID.substring(0, dayIDLength(dayID)) == "Tues")
  {
    return "Tuesday";
  }
  else if (dayID.substring(0, dayIDLength(dayID)) == "Wed")
  {
    return "Wednesday";
  }
  else if (dayID.substring(0, dayIDLength(dayID)) == "Thurs")
  {
    return "Thursday";
  }
  else if (dayID.substring(0, dayIDLength(dayID)) == "Fri")
  {
    return "Friday";
  }
  else if (dayID.substring(0, dayIDLength(dayID)) == "Sat")
  {
    return "Saturday";
  }
  else if (dayID.substring(0, dayIDLength(dayID)) == "Sun")
  {
    return "Sunday";
  }
  else
  {
    return "";
  }
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
    else if (timeAsString == 0)
    {
      timeAsString = 12;
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
      weatherID.innerText = Math.floor(data.currently.temperature + 0.5)
      + " ºF";
    });
  }

  // This message is displayed if there is a geolocation error:
  function error() 
  {
    weatherID.innerText = "Unable to retrieve your location for weather.";
  }

  // geolocation API call
  navigator.geolocation.getCurrentPosition(success, error);

  // the text that will be displayed while the geolocation request is being made
  weatherID.innerText = "Accessing weather information...";
}