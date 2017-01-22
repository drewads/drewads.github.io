// JavaScript File

setBackground();

function setBackground()
{
  var currentDate = new Date();
  var dateAsString = currentDate.toString();
  if (dateAsString.substring(0, 1) == "M")
  {
    document.body.style.backgroundImage = "url('img_F9.jpg')";
  }
  else if (dateAsString.substring(0, 2) == "Tu")
  {
     
  }
  else if (dateAsString.substring(0, 1) == "W")
  {
    
  }
  else if (dateAsString.substring(0, 2) == "Th")
  {
     
  }
  else if (dateAsString.substring(0, 1) == "F")
  {
     
  }
  else if (dateAsString.substring(0, 2) == "Sa")
  {
     $('body').css('background-image', 'url(img_F9.jpg)');
  }
  else if (dateAsString.substring(0, 2) == "Su")
  {
     $('body').css('background-image', 'url(img_launchExposure.jpg)');
  }
}  