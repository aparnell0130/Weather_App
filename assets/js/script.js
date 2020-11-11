$('#searchBtn').click(function (event) {
    event.preventDefault()
    var citySearch = $('#citySearch').val()
    var APIKey = '0af4143c0ff70e72a85f52f2443a7b6a';
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + citySearch + '&appid=' + APIKey;
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response);
        var lat = response.coord.lat
        var lon = response.coord.lon
        var queryURL2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=hourly,minutely&appid=' + APIKey
        $.ajax({
            url: queryURL2,
            method: 'GET'
        }).then(function (response2) {
            console.log(response2)
            var dateString = moment(response2.current.dt * 1000).format('M/DD/YYYY')
            var temp = ((response2.current.temp - 273.15) * 9 / 5 + 32).toFixed(2)
            var uvi = response2.current.uvi
            var uvSpan = $('<span>').text(uvi)
            uvSpan.css({ 'width': '30px', 'padding': '2px', 'border-radius': '5px', 'color': 'white' })
            $('#city').text(response.name + ' ' + dateString + ' ' + response2.current.weather[0].icon)
            $('#mainTemp').text('Temperature: ' + temp)
            $('#windSpeed').text('Wind Speed: ' + response2.current.wind_speed)
            var uviIndex = $('#uvIndex').text('UV Index: ')
            uviIndex.append(uvSpan)
            uviColor()
            function uviColor() {
                if (uvi >= 11) {
                    uvSpan.css({ 'backgroundColor': 'plum' })
                }
                else if (uvi < 11 && uvi >= 8) {
                    uvSpan.css({ 'backgroundColor': 'red' })
                }
                else if (uvi < 8 && uvi >= 6) {
                    uvSpan.css({ 'backgroundColor': 'orange' })
                }
                else if (uvi < 6 && uvi >= 3) {
                    uvSpan.css({ 'backgroundColor': 'yellow', 'color': 'black' })
                }
                else {
                    uvSpan.css({ 'backgroundColor': 'green' })
                }
            }
        })
    });
})
