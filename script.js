var searchButton = $(".searchButton");
var apiKey = "b8ecb570e32c2e5042581abd004b71bb";
for (var i = 0; i < localStorage.length; i++) {
var city = localStorage.getItem(i);
var cityName = $(".list-group").addClass("list-group-item");
cityName.append("<li>" + city + "</li>");
}var keyCount = 0;
searchButton.click(function () {
    var searchInput = $(".searchInput").val();
    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";
    var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";
      if (searchInput == "") {
    } else {
        $.ajax({
            url: urlCurrent,
            method: "GET"
        }).then(function (response) {
            var cityName = $(".list-group").addClass("list-group-item");
            cityName.append("<li>" + response.name + "</li>");
            var local = localStorage.setItem(keyCount, response.name);
            keyCount = keyCount + 1;
            var currentCard = $(".currentCard").append("<div>").addClass("card-body");
            currentCard.empty();
            var currentName = currentCard.append("<p>");
            currentCard.append(currentName);


