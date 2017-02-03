// JavaScript File

$(window).on("load", main());

function main()
{
  getDate();
  updateTime();
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
    var IDLength = 3;
    var dayID = dateAsString.substring(0, IDLength);
    var monthID = dateAsString.substring(IDLength + 1, 2 * IDLength + 1);
    dateAsString = getDayName(dayID) + ", "
    + getMonthName(monthID) + " "
    + getDayOfMonth(dateAsString)
    + ", " + dateAsString.substring(dateAsString.length - 4);
    
    document.getElementById("date").innerText = dateAsString;
}

//Returns correct day name
function getDayName(dayID)
{
  if (dayID == "Mon")
  {
    return "Monday";  
  }
  else if (dayID == "Tue")
  {
    return "Tuesday";
  }
  else if (dayID == "Wed")
  {
    return "Wednesday";
  }
  else if (dayID == "Thu")
  {
    return "Thursday";
  }
  else if (dayID == "Fri")
  {
    return "Friday";
  }
  else if (dayID == "Sat")
  {
    return "Saturday";
  }
  else if (dayID == "Sun")
  {
    return "Sunday";
  }
  else
  {
    return "";
  }
}

//Returns correct month name
function getMonthName(monthID)
{
  if (monthID == "Jan")
  {
    return "January";
  }
  else if (monthID == "Feb")
  {
    return "February";
  }
  else if (monthID == "Mar")
  {
    return "March";
  }
  else if (monthID == "Apr")
  {
    return "April";
  }
  else if (monthID == "May")
  {
    return "May";
  }
  else if (monthID == "Jun")
  {
    return "June";
  }
  else if (monthID == "Jul")
  {
    return "July";
  }
  else if (monthID == "Aug")
  {
    return "August";
  }
  else if (monthID == "Sep")
  {
    return "September";
  }
  else if (monthID == "Oct")
  {
    return "October";
  }
  else if (monthID == "Nov")
  {
    return "November";
  }
  else if (monthID == "Dec")
  {
    return "December";
  }
  else
  {
    return "";
  }
}

function updateTime()
{
  setInterval(function(){
    getTime();
  },1000);
}

//The following function loads the current time to tag "time"
function getTime()
{
    var currentTime = new Date();
    var timeAsString = currentTime.getHours().toString();
    var isAfterNoon = false;
    
    //The following updates the date when the day changes
    if (timeAsString == 0 && currentTime.getSeconds() <= 2)
    {
      getDate();
      setBackground();
    }
    
    if (timeAsString > 12)
    {
        timeAsString -= 12;
        isAfterNoon = true;
    }
    else if (timeAsString == 12)
    {
        isAfterNoon = true;
    }
    else if (timeAsString == 0)
    {
      timeAsString = 12;
    }
    
    if (currentTime.getMinutes() < 10)
    {
      timeAsString += ":0" + currentTime.getMinutes();
    }
    else
    {
      timeAsString += ":" + currentTime.getMinutes();
    }
    
    var seconds = currentTime.getSeconds();
    if (seconds < 10)
    {
      timeAsString += ":0" + seconds;
    }
    else
    {
      timeAsString += ":" + seconds;
    }
    
    if (!isAfterNoon)
    {
        timeAsString += " am";
    }
    else
    {
        timeAsString += " pm";
    }
    
    document.getElementById("time").innerText = timeAsString;
}

function getDayOfMonth(dateAsString)
{
    var startOfDayNum = 8;  //Distance from beginning of String where the day number starts
    var endOfDayNum = 10;    //Distance from beginning of String where the day number ends
    
    if (dateAsString.substring(startOfDayNum, startOfDayNum + 1) == "0")
    {
      startOfDayNum++;
    }
    
    return dateAsString.substring(startOfDayNum, endOfDayNum);
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