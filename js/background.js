// JavaScript File
document.head || (document.head = document.getElementsByTagName('head')[0]);

var currentBackground = Math.floor(Math.random() * 7);

updateBackground();

function updateBackground()
{
  setInterval(function(){
    changeBackground(currentBackground);
    var newBackground = Math.floor(Math.random() * 7);
    while (newBackground == currentBackground)
    {
      newBackground = Math.floor(Math.random() * 7);
    }
    currentBackground = newBackground;
  },10000);
}

function changeBackground(imgNum)
{
  if (imgNum == 1)
  {
    document.body.style.backgroundImage = "url('/backgrounds/img_hull.jpg')";
  }
  else if (imgNum == 2)
  {
     $('body').css('background-image', 'url(/backgrounds/img_crs3.jpg)');
  }
  else if (imgNum == 3)
  {
    $('body').css('background-image', 'url(/backgrounds/img_blockIsland.jpg)');
  }
  else if (imgNum == 4)
  {
    $('body').css('background-image', 'url(/backgrounds/img_exposureLeft.jpg)');
  }
  else if (imgNum == 5)
  {
     $('body').css('background-color', "gray");
  }
  else if (imgNum == 6)
  {
     $('body').css('background-image', 'url(/backgrounds/img_lakeChutes.jpg)');
  }
  else if (imgNum == 0)
  {
     $('body').css('background-image', 'url(/backgrounds/img_exposureRight.jpg)');
  }
}

function setBackground()
{
  var currentDate = new Date();
  var dateAsString = currentDate.toString();
  
  if (dateAsString.substring(0,15) == "Tue Feb 14 2017") //Valentine's Day!
  {
    document.body.style.backgroundImage = "url('/backgrounds/img_valentine.png')";
    changeFavicon("/favicons/faviconValentine-32x32.png");
    document.getElementById("holiday").innerText = "Happy Valentine's Day!";
  }
  else if (dateAsString.substring(0,15) == "Fri Feb 10 2017") //Dani's birthday!
  {
    document.body.style.backgroundImage = "url('/backgrounds/img_birthday.jpg')";
    changeFavicon("/favicons/faviconGreen-32x32.png");
    document.getElementById("hello").innerText = "Happy Birthday, Dani!";
    document.getElementById("hello").style.color = "#003090";
  }
  else if (dateAsString.substring(0, 1) == "M")
  {
    document.body.style.backgroundImage = "url('/backgrounds/img_hull.jpg')";
  }
  else if (dateAsString.substring(0, 2) == "Tu")
  {
     $('body').css('background-image', 'url(/backgrounds/img_crs3.jpg)');
  }
  else if (dateAsString.substring(0, 1) == "W")
  {
    $('body').css('background-image', 'url(/backgrounds/img_blockIsland.jpg)');
  }
  else if (dateAsString.substring(0, 2) == "Th")
  {
    $('body').css('background-image', 'url(/backgrounds/img_exposureLeft.jpg)');
  }
  else if (dateAsString.substring(0, 1) == "F")
  {
     $('body').css('background-color', "gray");
  }
  else if (dateAsString.substring(0, 2) == "Sa")
  {
     $('body').css('background-image', 'url(/backgrounds/img_lakeChutes.jpg)');
  }
  else if (dateAsString.substring(0, 2) == "Su")
  {
     $('body').css('background-image', 'url(/backgrounds/img_exposureRight.jpg)');
  }
}

function changeFavicon(src)
{
  var link = document.createElement('link'),
     oldLink = document.getElementById('favicon');
  link.id = 'favicon';
  link.rel = 'icon';
  link.type = "image/png";
  link.sizes = "32x32";
  link.href = src;
  if (oldLink)
  {
    document.head.removeChild(oldLink);
  }
  document.head.appendChild(link);
}