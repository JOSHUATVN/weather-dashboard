let APIkey = "b0499bde02e99be17b0f2032e6691304";
let cityLists = $("#list-city");
let city = [];



function formatDay(date) {
    let date = new Date();
    console.log(date);
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let year = date.getFullYear() + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;
    return year;
}



init()

//initiate function
function init() {
  let savedCities = JSON.parse(localStorage.getItem("city"));

  if (savedCities !== null) {
    city = savedCities;
  }
  getCities()
}

// when user submits
$("#add-city").on("click", function(e){
    e.preventDefualt();

    // taking line from input
    let city = $("#city-input").val().trim();

    // if blank return to start of submission
    if (city === "") {
        return;
    }
    // putting cities into array
    city.push(cities);
    // storing users citys in localstorage
    savedCities();
    getCities();
});

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
    } if (!cities) {
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

//1st API get current weather for user city
function getWeatherResponse () {
    let weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + APIkey;

    $("#todays-weather").empty();
    $.ajax({
        url: weatherURL,
        method : "GET"
    }).then(function(respose) {

        cityName = $("<h3>").text(respose.name + " " + FormatDay());
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


        //2nd API long and lat
        let weatherURL2 = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIkey + "&lat=" + coordinateLat + "&lon=" + coordinateLon;
        $.ajax({
            url: weatherURL2,
            meathod: "GET"
        }).then(function(responseuv) {
            let cityUVs = $("<span>").text(responseuv.value);
            let cityUVc = $("<p>").text("UV Index:  ");
            cityUVc.append(cityUVs);
            $("#todays-weather").append(cityUVc);
            console.log(typeof responseuv.value);
            
            if (responseuv.value > 0 && responseuv.value <=2) {
                cityUVs.attr("class", "green")
            } else if ( responseuv.value > 2 && responseuv.value <=5) {
                cityUVs.attr("class", "yellow")
            } else if (responseuv.value > 5 && responseuv.value <=7) {
                cityUVs.attr("class", "orange")
            } else if (responseuv.value > 7 && responseuv.value <=10) {
                cityUVs.attr("class", "red")
            } else {
                cityUVs.attr("class", " violet")
            }
        });

        // 3rd API 5-Day forecast
        let weatherURL3 = "https://api.openweathermap.org/data/2.5/forecast?q=" +cityName + "appid=" + APIkey;
        $.ajax({
            url: weatherURL3,
            method: "GET"
        }).then(function(response5day) {
            $("#weather-box").empty();
            console.log(response5day);
            for (let i = 0, u = 0; u <= 5; i = i + 6) {
                let readDate = response5day.list[i].dt;
                if (response5day.list[i].dt != response5day.list [i+1].dt) {
                    let fiveDay = $("<div>");
                    fiveDay.attr("class", "col-3 m-2 bg-primary")
                    let c = new Date(0);
                    c.setUTCSeconds(readDate);
                    let date = c;
                    console.log(date);
                    let month = date.getMonth() + 1;
                    let day = date.getDate();
                    let year = date.getFullYear() + '/' + (month < 10 ? '0' : ' ') + month + '/' + (day < 10 ? '0' : ' ') + day;
                    let fiveDayText = $("<h6>").text(year);

                    let img = $("<img>");
                    let skyStat = response5day.list[i].weather[0].main;
                    if (skyStat === "Clouds") {
                        img.attr("src", "https://img.icons8.com/color/48/000000/cloud.png")
                    } else if (skyStat === "Clear") {
                        img.attr("src", "https://img.icons8.com/color/48/000000/summer.png")
                    } else if (skyStat === "Rain") {
                        img.attr("src", "https://img.icons8.com/color/48/000000/rain.png")
                    }
                    
                    let getTemp = response5day.list[i].main.temp;
                    console.log(skyStat);
                    let tempToNum = parseInt((getTemp) * 9/5 - 459);
                    let getTempK = $("<p>").text("Temperature: " + tempToNum + " °F");
                    let getHumid = $("<p>").text("Humidity: " + response5day.list[i].main.humidity + " %");
                    fiveDay.append(fiveDayText);
                    fiveDay.append(img);
                    fiveDay.append(getTempK);
                    fiveDay.append(getHumid);
                    $("#weather-box").append(fiveDay);
                    console.log(response5day);
                    u++;
                }
            }
        })
    })
}




// click for li 
$(document).on("click", "", function () {
  let currentCity = $(this).attr("data-city");
  getWeatherResponse(currentCity);
});
