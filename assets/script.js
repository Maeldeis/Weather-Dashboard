var searchButton = $(".searchButton");
var apiKey = "95daa87d552c42aa7ee557fa71b8bf9c";
var keyCount = localStorage.length;

for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if (key.startsWith("city_")) {
        var city = localStorage.getItem(key);
        $(".list-group").append("<li class='list-group-item'>" + city + "</li>");
    }
}

searchButton.click(function () {
    var searchInput = $(".searchInput").val();
    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=" + apiKey + "&units=metric";
    var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&appid=" + apiKey + "&units=metric";

    if (searchInput !== "") {
        $.ajax({
            url: urlCurrent,
            method: "GET"
        }).then(function (response) {
            var currentCard = $(".currentCard").addClass("card-body");
            currentCard.empty();

            $(".list-group").append("<li class='list-group-item'>" + response.name + "</li>");
            localStorage.setItem("city_" + keyCount, response.name);
            keyCount++;

            var currentName = $("<p>").append(response.name + " " + new Date(response.dt * 1000).toLocaleDateString("en-GB"));
            currentName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
            var currentTemp = $("<p>").html("Temperature: " + Math.round(response.main.temp) + " °C");
            currentTemp.append("<p>" + "Humidity: " + Math.round(response.main.humidity) + "%" + "</p>");
            currentTemp.append("<p>" + "Wind Speed: " + Math.round(response.wind.speed) + " m/s" + "</p>");

            var urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${response.coord.lat}&lon=${response.coord.lon}`;
            $.ajax({
                url: urlUV,
                method: "GET"
            }).then(function (uvResponse) {
                var currentUV = $("<p>").html("UV Index: " + Math.round(uvResponse.value));
                currentUV.addClass("card-text UV");
                currentTemp.append(currentUV);
            });

            currentCard.append(currentName, currentTemp);
        });

        $.ajax({
            url: urlFiveDay,
            method: "GET"
        }).then(function (response) {
            var day = [0, 8, 16, 24, 32];
            var fiveDayCard = $(".fiveDayCard").addClass("card-body");
            var fiveDayDiv = $(".fiveDayOne").addClass("card-text");
            fiveDayDiv.empty();

            day.forEach(function (i) {
                var FiveDayTimeUTC1 = new Date(response.list[i].dt * 1000).toLocaleDateString("en-GB");
                fiveDayDiv.append("<div class='fiveDayColor'>" +
                    "<p>" + FiveDayTimeUTC1 + "</p>" +
                    `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` +
                    "<p>" + "Temp: " + Math.round(response.list[i].main.temp) + " °C</p>" +
                    "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" +
                    "</div>");
            });
        });
    }
});
