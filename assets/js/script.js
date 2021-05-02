let key = "e41489916c332111126c216d64f6a5f9";
let cityLists = $("#list-city");
let city = [];


//initiate function
function init() {
  let savedCities = JSON.parse(localStorage.getItem("city"));

  if (savedCities !== null) {
    city = savedCities;
  }

  getCities()
}


// geting cities function
function getCities () {
    cityLists.empty();

    for (let i =0; i < city.length; i++) {
        let cities = city[i];
        let li = $('<li>').text(cities);
        li.attr("id", "listC");
        li.attr("data-city", cities);
        li.atrr("class", "list-group-item");
        console.log(li);
        cityLists.prepend(li);
    }

    if (cities) {
        return
    } else {
        getWeatherResponse(cities)
    };
}


// saving cities function
function savedCities () {
    localStorage.setItem ('city', JSON.stringify(city));
    console.log(localStorage);
};


// APIs response function
function getWeatherResponse () {
    let weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" = city = "&appid=" + key;


    // 1st API todays weather
    $("#todays-weather").empty();
    $.ajax({
        url: weatherURL,
        method : "GET"
    }).then(function(respose) {

        cityName = $("<h3>").text(respose.name + " " + FormetDay());
        $("#todays-weather").append(cityName);
        let tempToNum = parseInt((response.main.temp) * 9/5-459);
        let cityTemp = $("<p>").text("Temperature: " + tempToNum + "  °F");
        $("#todays-weather").append(cityTemp);
        let cityHumid = $("<p>").text("Humidity: " + response.main.humidity + "  %");
        $("#todays-weather").append(cityHumid);
        let cityWind = $("<p>").text("wind Speed: " + response.wind.speed + "  MPH");
        $("#todays-weather").append(cityWind);
        let coordinateLon = response.coord.lon;
        let coordinateLat = response.coord.lan;

        // 2nd API UV index colors
        let weatherURL2 = "https://api.openweathermap.org/data/2.5/weather?lat=" + key + "&lat=" + coordinateLat + "&lon=" + coordinateLon;
        $(ajax({
            url: weatherURL2,
            meathod: "GET"
        }).then(function(responseuv) {
            let cityUV = $("<span>").text(responseuv.value);
            let cityUVp = $("<p>").text("UV Index: ");
            cityUVp.append(cityUV);
            $("#today-weather").append(cityUVp);
            console.log(typeof responseuv.value);
            if(responseuv.value > 0 && responseuv.value <=2){
                cityUV.attr("class","green")
            }
            else if (responseuv.value > 2 && responseuv.value <= 5){
                cityUV.attr("class","yellow")
            }
            else if (responseuv.value > 5 && responseuv.value <= 7){
                cityUV.attr("class","orange")
            }
            else if (responseuv.value > 7 && responseuv.value <= 10){
                cityUV.attr("class","red")
            }
            else{
                cityUV.attr("class","violet")
            }
        });

        //3rd API 5-day forecast
        







// click for li in ul
$(document).on("click", "", function () {
  let currentCity = $(this).attr("data-city");
  getWeatherResponse(currentCity);
});
