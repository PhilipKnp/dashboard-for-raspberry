var currentTimeElement = document.getElementById('current-time');


//function to get the current time
function currentTimeFunction() {

    //get current time
    currentTime = new Date().toLocaleTimeString('en-GB', { hour: "numeric", minute: "numeric"});

    //set inner html of div element to current time
    currentTimeElement.innerHTML = currentTime;

    //Refreshes the date at 00:00
    if(currentTime === "00:00"){
        currentDateFunction()
        console.log("new day")
    }
};
currentTimeFunction()
//Refreshes the current time every second
setInterval(currentTimeFunction, 1000);

//----------------------------------------get current date
function currentDateFunction() {
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '.' + mm + '.' + yyyy;

let newDate = new Date();
let day = newDate.getDay();

switch (day){
    case 0:
        day = "Sonntag";
        break;
    case 1:
        day = "Montag";
        break;
    case 2:
        day = "Dienstag";
        break;
    case 3:
        day = "Mittwoch";
        break;
    case 4:
        day = "Donnerstag";
        break;
    case 5: 
        day = "Freitag";
        break;
    case 6:
        day = "Samstag";
}

//set current date in format Heute ist "Montag" der "23.03.2020".
document.getElementById('current-date').innerHTML = 'Heute ist ' + day + ' der ' + today;
}
currentDateFunction()

//----------------------------------Get current weather

//Api URl with api key
const api_url = "http://api.openweathermap.org/data/2.5/weather?id=7290252&units=metric&APPID=fab659d42dc95eac538447e129ca322a"; 

// async means that it always returns a promise()
async function getWeather() {

    //await makes javascript wait until that promise settles and returns its result
    //only then the next code is executed
    //await can only be used in an async function
  
    //fetch sends a networks request to the server to 
    //load new information whenever it is needed
    const response = await fetch(api_url); 
  
    //response.json() wandelt die variable response wo die API URL enthalten ist
    //zu einem json um
    const data = await response.json(); 
    const temp = data.main.temp;
    const tempFeel = data.main.feels_like;
    const { name } = data;
  
    document.getElementById('current-temperature').innerHTML = temp + " °C";
    document.getElementById('current-temperature-feeling').innerHTML = "gefühlt " + tempFeel + " °C";
    document.getElementById('location').innerHTML = name;
    console.log(data)
  
  }
getWeather();
//refreshes the weather every 10 minutes
setInterval(getWeather, 600000);

//////////////////////////////////////////////////ALARM SEITE
//sound function
function sound(){
    var audio = document.createElement("audio");
    audio.src = "alarmsound.mp3";
    audio.addEventListener("ended", function () {
        document.removeChild(this);
    }, false);
    audio.play();   
}


let timePickerList = document.querySelectorAll('#time_pick_1,#time_pick_2,#time_pick_3,#time_pick_4,#time_pick_5,#time_pick_6');
let timePickerArray = [...timePickerList];

var whiteStyle = "3px solid white";
var greenStyle = "3px solid green";

timePickerArray.forEach(function(elem) {
    elem.style.border = whiteStyle;
    elem.addEventListener("click", function() {
        if(this.style.border === whiteStyle){
            this.style.border = greenStyle;
        } else if (this.style.border === greenStyle){
            this.style.border = whiteStyle;
        }
    });
    //PLAY AUDIO ON SPECIFIC TIME
    function playAlarm(){
        var currentTimeForAlarm = new Date().toLocaleTimeString('en-GB', { hour: "numeric", minute: "numeric"});
        if(elem.style.border === greenStyle && currentTimeForAlarm === elem.innerHTML){
            console.log("ALARM", elem.innerHTML)
            //window.location.href = "alarmscreen.html";
            sound();
        }
    }
    setInterval(playAlarm, 1000);
}) 

// Time Controlling Buttons (once, everyday, etc..)
let timeControllList = document.querySelectorAll('.time-controll');
let timeControllArray = [...timeControllList];

timeControllArray.forEach(function(elem) {
    elem.style.border = whiteStyle;
    elem.addEventListener("click", function() {
        if(this.style.border === whiteStyle){
            this.style.border = greenStyle;
        } else if (this.style.border === greenStyle){
            this.style.border = whiteStyle;
        }
    });
}) 