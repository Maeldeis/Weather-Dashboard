var searchButton = $(".searchButton");
var apiKey = "b8ecb570e32c2e5042581abd004b71bb";
for (var i = 0; i < localStorage.length; i++) {

    var city = localStorage.getItem(i);

    var cityName = $(".list-group").addClass("list-group-item");

    cityName.append("<li>" + city + "</li>");
}
var keyCount = 0;
searchButton.click(function () {

    var searchInput = $(".searchInput").val();

