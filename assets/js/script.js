let key = "e41489916c332111126c216d64f6a5f9";
let cityLists = $("#list-city");
let city = [];

function init() {
  let savedCities = JSON.parse(localStorage.getItem("city"));

  if (savedCities !== null) {
    city = savedCities;
  }

  getCities()
}



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



function savedCities () {
    localStorage.setItem ('city', JSON.stringify(city));
    console.log(localStorage);
};





// click for li in ul
$(document).on("click", "", function () {
  let currentCity = $(this).attr("data-city");
  getWeatherResponse(currentCity);
});
