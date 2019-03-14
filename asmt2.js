$(document).ready(function () {
    $('#goButton').on('click', function(){
        var lat = $('#lat').val();
        var lon = $('#lon').val();
        //°
    
        getCurrent(lat, lon);
        getForecast(lat, lon);

        $("#weather").addClass('weather');
        $("#forecast").addClass('forecast');
    });
});

function getCurrent(lat, lon){
    $.ajax({
        url: "http://api.apixu.com/v1/forecast.json?q="+lat+","+lon+"&key=fe34f785ddd3406dbbf202145191203", success:function (data){
        console.log('Temperature');
        console.log('(Current day) Current: ' + data.current.temp_c);
        console.log('(Current day) Low: ' + data.forecast.forecastday[0].day.mintemp_c);
        console.log('(Current day) High: ' + data.forecast.forecastday[0].day.maxtemp_c);
        console.log('(Current day) Feels like: ' + data.current.feelslike_c);

        console.log('Condition');
        console.log('(Current day) Type: ' + data.current.condition.text);
        console.log('(Current day) Cloud cover: ' + data.current.cloud);
        console.log('(Current day) Humidity' + data.current.humidity);
        console.log('(Current day) Pressure: ' + data.current.pressure_mb);

        console.log('Wind');
        console.log('(Current day) Direction: ' + data.current.wind_dir);
        console.log('(Current day) Speed: ' + data.current.wind_kph);

        $("#weather").append("<h3>" + 'Temperature' + "</h3>");
        $("#weather").append("Current: " + data.current.temp_c + "°C");
        $("#weather").append("<br />" + "Low: " + data.forecast.forecastday[0].day.mintemp_c + "°C");
        $("#weather").append("<br />" + "High: " + data.forecast.forecastday[0].day.maxtemp_c + "°C");
        $("#weather").append("<br />" + "Feels like: " + data.current.feelslike_c + "°C");
        
        $("#weather").append("<h3>" + "Condition:" + "</h3>")
        $("#weather").append("Type: " + data.current.condition.text);
        $("#weather").append("<br />" + "Cloud Cover: " + data.current.cloud + "%");
        $("#weather").append("<br />" + "Humidity: " + data.current.humidity + "%");
        $("#weather").append("<br />" + "Pressure: " + data.current.pressure_mb + "mB");

        $("#weather").append("<h3>"+ "WIND:" + "</h3>");
        $("#weather").append("Direction: " + data.current.wind_dir + "°");
        $("#weather").append("<br />" + "Speed: " + data.current.wind_kph + "km/h");

        // $.each(data, function(key, value) {
        //     if (key == "location"){
        //         console.log('(From current)' , value.name);
        //     }
        //     if (key == "current"){
        //         console.log('(From current)', value.wind_mph);
        //     }
        // });
        }
    });
}

function getForecast(lat, lon){
    $.ajax({
        url: "http://api.apixu.com/v1/forecast.json?q="+lat+","+lon+"&days=7&key=fe34f785ddd3406dbbf202145191203", success:function (data){
            console.log("Forecast for next 7 days");
            $("#forecast").append("<br /><h2>"+ "Forecast: " + "</h2><br />");
            $("#forecast").append("<table>");
            $("#forecast").append("<tr><th>" + 'Date' + "</th>" + "<th>" + 'Date' + "</th>" + "<th>" + 'High' + "</th>" + "<th>" + 'Low' + "</th>" + "<th>" + 'Wind' + "</th>" + "<th>" + 'Outlook' + "</th></tr>");
            
            for (let i = 0; i < data.forecast.forecastday.length; i++){
                console.log('Day: ' + data.forecast.forecastday[i].date);
                console.log('Condition: ' + data.forecast.forecastday[i].day.condition.icon);
                console.log('High: ' + data.forecast.forecastday[i].day.maxtemp_c);
                console.log('Low: ' + data.forecast.forecastday[i].day.mintemp_c);
                console.log('Wind: ' + data.forecast.forecastday[i].day.maxwind_kph);
                console.log('Outlook: ' + data.forecast.forecastday[i].day.condition.text);
                
                $("#forecast").append("<tr><td>" + data.forecast.forecastday[i].date + "</td>" + "<td>" + data.forecast.forecastday[i].day.condition.icon + "</td>" + "<td>" + data.forecast.forecastday[i].day.maxtemp_c + "°C </td>" + "<td>" +data.forecast.forecastday[i].day.mintemp_c + "°C </td>" + "<td>" +  data.forecast.forecastday[i].day.maxwind_kph + "km/h </td>" + "<td>" + data.forecast.forecastday[i].day.condition.text + "</td></tr>");
            }
        // $.each(data, function(key, value) {
        //     if (key == "location"){
        //         console.log('(From forecast)', value.name);
        //     }
        //     if (key == "current"){
        //         console.log('(From forecast)', value.wind_mph);
        //     }
        //     // example of finding two layers of nested objects
        //     $.each(value, function(innerKey, innerValue){
        //         if (innerKey == "condition"){
        //             $.each(innerValue, function (innerInnerKey, innerInnerValue){
        //                 console.log('(From forecast) Code:' , innerValue.code);
        //             });
        //         }
        //         // example of finding 3 layers of nested objects
        //         if (innerKey == "forecastday"){
        //             $.each(innerValue, function(innerInnerKey, innerInnerValue){
        //                 if (innerInnerKey == "1"){
        //                     $.each(innerInnerValue, function (innerInnerInnerKey, innerInnerInnerValue){
        //                         if (innerInnerInnerKey == "day"){
        //                             $.each(innerInnerInnerValue, function(innerInnerInnerInnerKey, innerInnerInnerInnerValue){
        //                             console.log('(From forecast) Next day max celsius:' , innerInnerInnerValue.maxtemp_c);
        //                             });
        //                         }
        //                     });
        //                 }
        //             });
        //         }
        //     });
        // });
        }
    });
}
