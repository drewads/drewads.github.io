// JavaScript File

setBackground();

function setBackground()
{
  var currentDate = new Date();
  var dateAsString = currentDate.toString();
  if (dateAsString.substring(0, 1) == "M")
  {
    document.body.style.backgroundImage = "url('img_hull.jpg')";
  }
  else if (dateAsString.substring(0, 2) == "Tu")
  {
     $('body').css('background-image', 'url(img_crs3.jpg)');
  }
  else if (dateAsString.substring(0, 1) == "W")
  {
    $('body').css('background-image', 'url(img_blockIsland.jpg)');
  }
  else if (dateAsString.substring(0, 2) == "Th")
  {
    $('body').css('background-image', 'url(img_exposureLeft.jpg)');
  }
  else if (dateAsString.substring(0, 1) == "F")
  {
     $('body').css('background-color', "gray");
  }
  else if (dateAsString.substring(0, 2) == "Sa")
  {
     $('body').css('background-image', 'url(img_lakeChutes.jpg)');
  }
  else if (dateAsString.substring(0, 2) == "Su")
  {
     $('body').css('background-image', 'url(img_exposureRight.jpg)');
  }
}  