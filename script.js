$(document).ready(function(){
    usersLastSearch();
    var icon = '';

    $('button').on('click', function(){
        searchCities();
        saveSearch();
        makeEverythingAppear();
    });

   //When you click on a search item is pulls up
   $('ul').on('click','.list-group-item', function clickHistory(event){
        searchCitiesTwo();
        makeEverythingAppear();
  })

         //function to build the URL need to search for a city
        function buildURL(citySearch){
            var userCity = $("#userInput").val().trim();
            userCity = userCity.replace(/\s+/g, "");
            localStorage.setItem('lastSearch', userCity)
            var citySearch = 'https://api.openweathermap.org/data/2.5/forecast?q=' + userCity + '&appid=7a55a4098897a5f61d0e5acedb9f428e';
            return (citySearch);
         }

        function buildURLTwo(){
            var userCityTwo = event.target.getAttribute('value')
            var citySearch = 'https://api.openweathermap.org/data/2.5/forecast?q=' + userCityTwo + '&appid=7a55a4098897a5f61d0e5acedb9f428e';
            return (citySearch);
        }
      

    //get the input for the user and add to list
    function saveSearch(){
        var city = $("#userInput").val().trim();
        var historyListItem = $('<li>')

        historyListItem.attr('class', 'list-group-item ')
        historyListItem.attr('value', city)
        historyListItem.text(city)
        $('#previousSearches').prepend(historyListItem);
        } 
        
    function usersLastSearch(){
      let lastSearch = localStorage.getItem('lastSearch')
      $('#latestSearch').text(lastSearch)
      $('#latestSearch').attr('value', lastSearch)

    }
    function makeEverythingAppear(){
        $('*').removeClass('startHidden')
    }



        
    function searchCities(){
        $.ajax({
            url: buildURL(),
            method: 'GET'
          })
          .then(function(response){
              //*console log of city API
        //    console.log(response)
           var cityResponse = response
           let cityLat = response.city.coord.lat
           let cityLon = response.city.coord.lon
           //creating the URL for the 2nd api
           var queryURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLat + '&lon=' + cityLon + '&units=imperial&exclude=hourly,minutely&appid=fb563408731aff3ecf1d18de5221a064';
            //*change current display to city using the 1st weather API
             $('#currentCity').text(cityResponse.city.name + ' (' + moment().format('dddd' + ', '  + 'MMMM Do YYYY') + ')' );

            //!second ajax request in ajax request
                $.ajax({
                    url: queryURL,
                    method: 'GET'
                }).then(function(response){
                    // *console.log of second API and adding the current day data
                    // console.log(response)
                     $('#currentTemp').text('Temperature (F): ' + response.current.temp);
                     $('#currentHumidity').text('Humidity: ' + response.current.humidity);
                     $('#currentWind').text('Windspeed: ' + response.current.wind_speed);
                     let uvi = response.current.uvi;
                     $('#uvIndex').text(uvi);
                     
                     //*Logic for the UV color index
                     $('#uvIndex').removeClass('severe moderate favorable');
                     if(uvi >= 8){
                        $('#uvIndex').addClass('severe');
                     } else if(uvi >= 4 && uvi <= 7.99){
                        $('#uvIndex').addClass('moderate');
                     }else{
                        $('#uvIndex').addClass('favorable');
                     }
                      //*Creating the image for icon of current weather and removing it when another search is conducted
                     icon = response.current.weather[0].icon;
                     iconAlt= response.current.weather[0].main
                     $('#currentDayIcon').attr('src', '');
                     $('#currentDayIcon').attr("alt", '');
                     var iconURL = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';
                     $('#currentDayIcon').attr('src', iconURL);
                     $('#currentDayIcon').attr("alt", iconAlt);

                     //* adding the day to the next day
                     $('#dayOne').text(moment().add(1, 'day').format('L'));

                     iconDayOne = response.daily[0].weather[0].icon;
                     iconAltDayOne= response.daily[0].weather[0].main
                     $('#dayOneIcon').attr('src', '');
                     $('#dayOneIcon').attr("alt", '');
                    var iconURLDayOne = 'https://openweathermap.org/img/wn/' + iconDayOne + '@2x.png';
                     $('#dayOneIcon').attr('src', iconURLDayOne);
                     $('#dayOneIcon').attr("alt", iconAltDayOne);
                
                     $('#dayOneTemp').text('Temperature: ' + response.daily[0].temp.day);
                     $('#dayOneHumid').text('Humidity: ' + response.daily[0].humidity);

                    //* adding the day to the second day
                     $('#dayTwo').text(moment().add(2, 'day').format('L'));

                     iconDayTwo = response.daily[1].weather[0].icon;
                     iconAltDayTwo= response.daily[1].weather[0].main
                     $('#dayTwoIcon').attr('src', '');
                     $('#dayTwoIcon').attr("alt", '');
                     var iconURLDayTwo = 'https://openweathermap.org/img/wn/' + iconDayTwo + '@2x.png';
                     $('#dayTwoIcon').attr('src', iconURLDayTwo);
                     $('#dayTwoIcon').attr("alt", iconAltDayTwo);
                
                     $('#dayTwoTemp').text('Temperature: ' + response.daily[1].temp.day);
                     $('#dayTwoHumid').text('Humidity: ' + response.daily[1].humidity);


                     //* adding the day to the third day
                     $('#dayThree').text(moment().add(2, 'day').format('L'));

                     iconDayThree= response.daily[2].weather[0].icon;
                     iconAltDayThree= response.daily[2].weather[0].main
                     $('#dayThreeIcon').attr('src', '');
                     $('#dayThreeIcon').attr("alt", '');
                     var iconURLDayThree = 'https://openweathermap.org/img/wn/' + iconDayThree + '@2x.png';
                     $('#dayThreeIcon').attr('src', iconURLDayThree);
                     $('#dayThreeIcon').attr("alt", iconAltDayThree);
                 
                     $('#dayThreeTemp').text('Temperature: ' + response.daily[2].temp.day);
                     $('#dayThreeHumid').text('Humidity: ' + response.daily[2].humidity);


                    //* adding the day to the third day
                     $('#dayThree').text(moment().add(3, 'day').format('L'));

                     iconDayThree= response.daily[2].weather[0].icon;
                     iconAltDayThree= response.daily[2].weather[0].main
                     $('#dayThreeIcon').attr('src', '');
                     $('#dayThreeIcon').attr("alt", '');
                     var iconURLDayThree = 'https://openweathermap.org/img/wn/' + iconDayThree + '@2x.png';
                     $('#dayThreeIcon').attr('src', iconURLDayThree);
                     $('#dayThreeIcon').attr("alt", iconAltDayThree);
                 
                     $('#dayThreeTemp').text('Temperature: ' + response.daily[2].temp.day);
                     $('#dayThreeHumid').text('Humidity: ' + response.daily[2].humidity);
                    

                     //* adding the day to the Fourth day
                     $('#dayFour').text(moment().add(4, 'day').format('L'));

                     iconDayFour= response.daily[3].weather[0].icon;
                     iconAltDayFour= response.daily[3].weather[0].main
                     $('#dayFourIcon').attr('src', '');
                     $('#dayFourIcon').attr("alt", '');
                     var iconURLDayFour = 'https://openweathermap.org/img/wn/' + iconDayFour + '@2x.png';
                     $('#dayFourIcon').attr('src', iconURLDayFour);
                     $('#dayFourIcon').attr("alt", iconAltDayFour);
                 
                     $('#dayFourTemp').text('Temperature: ' + response.daily[3].temp.day);
                     $('#dayFourHumid').text('Humidity: ' + response.daily[3].humidity);


                     //* adding the day to the Fiveth day
                     $('#dayFive').text(moment().add(5, 'day').format('L'));

                     iconDayFive= response.daily[4].weather[0].icon;
                     iconAltDayFive= response.daily[4].weather[0].main
                     $('#dayFiveIcon').attr('src', '');
                     $('#dayFiveIcon').attr("alt", '');
                     var iconURLDayFive = 'https://openweathermap.org/img/wn/' + iconDayFive + '@2x.png';
                     $('#dayFiveIcon').attr('src', iconURLDayFive);
                     $('#dayFiveIcon').attr("alt", iconAltDayFive);
                 
                     $('#dayFiveTemp').text('Temperature: ' + response.daily[4].temp.day);
                     $('#dayFiveHumid').text('Humidity: ' + response.daily[4].humidity);


                })
         
           //*change the current display using the 2nd API
        
          });
    };

    function searchCitiesTwo(){
        $.ajax({
            url: buildURLTwo(),
            method: 'GET'
          })
          .then(function(response){
              //*console log of city API
        //    console.log(response)
           var cityResponse = response
           let cityLat = response.city.coord.lat
           let cityLon = response.city.coord.lon
           //creating the URL for the 2nd api
           var queryURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLat + '&lon=' + cityLon + '&units=imperial&exclude=hourly,minutely&appid=fb563408731aff3ecf1d18de5221a064';
            //*change current display to city using the 1st weather API
             $('#currentCity').text(cityResponse.city.name + ' (' + moment().format('dddd' + ', '  + 'MMMM Do YYYY') + ')' );

            //!second ajax request in ajax request
                $.ajax({
                    url: queryURL,
                    method: 'GET'
                }).then(function(response){
                    // *console.log of second API and adding the current day data
                    // console.log(response)
                     $('#currentTemp').text('Temperature (F): ' + response.current.temp);
                     $('#currentHumidity').text('Humidity: ' + response.current.humidity);
                     $('#currentWind').text('Windspeed: ' + response.current.wind_speed);
                     let uvi = response.current.uvi;
                     $('#uvIndex').text(uvi);
                     
                     //*Logic for the UV color index
                     $('#uvIndex').removeClass('severe moderate favorable');
                     if(uvi >= 8){
                        $('#uvIndex').addClass('severe');
                     } else if(uvi >= 4 && uvi <= 7.99){
                        $('#uvIndex').addClass('moderate');
                     }else{
                        $('#uvIndex').addClass('favorable');
                     }
                      //*Creating the image for icon of current weather and removing it when another search is conducted
                     icon = response.current.weather[0].icon;
                     iconAlt= response.current.weather[0].main
                     $('#currentDayIcon').attr('src', '');
                     $('#currentDayIcon').attr("alt", '');
                     var iconURL = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';
                     $('#currentDayIcon').attr('src', iconURL);
                     $('#currentDayIcon').attr("alt", iconAlt);

                     //* adding the day to the next day
                     $('#dayOne').text(moment().add(1, 'day').format('L'));

                     iconDayOne = response.daily[0].weather[0].icon;
                     iconAltDayOne= response.daily[0].weather[0].main
                     $('#dayOneIcon').attr('src', '');
                     $('#dayOneIcon').attr("alt", '');
                    var iconURLDayOne = 'https://openweathermap.org/img/wn/' + iconDayOne + '@2x.png';
                     $('#dayOneIcon').attr('src', iconURLDayOne);
                     $('#dayOneIcon').attr("alt", iconAltDayOne);
                
                     $('#dayOneTemp').text('Temperature: ' + response.daily[0].temp.day);
                     $('#dayOneHumid').text('Humidity: ' + response.daily[0].humidity);

                    //* adding the day to the second day
                     $('#dayTwo').text(moment().add(2, 'day').format('L'));

                     iconDayTwo = response.daily[1].weather[0].icon;
                     iconAltDayTwo= response.daily[1].weather[0].main
                     $('#dayTwoIcon').attr('src', '');
                     $('#dayTwoIcon').attr("alt", '');
                     var iconURLDayTwo = 'https://openweathermap.org/img/wn/' + iconDayTwo + '@2x.png';
                     $('#dayTwoIcon').attr('src', iconURLDayTwo);
                     $('#dayTwoIcon').attr("alt", iconAltDayTwo);
                
                     $('#dayTwoTemp').text('Temperature: ' + response.daily[1].temp.day);
                     $('#dayTwoHumid').text('Humidity: ' + response.daily[1].humidity);


                     //* adding the day to the third day
                     $('#dayThree').text(moment().add(2, 'day').format('L'));

                     iconDayThree= response.daily[2].weather[0].icon;
                     iconAltDayThree= response.daily[2].weather[0].main
                     $('#dayThreeIcon').attr('src', '');
                     $('#dayThreeIcon').attr("alt", '');
                     var iconURLDayThree = 'https://openweathermap.org/img/wn/' + iconDayThree + '@2x.png';
                     $('#dayThreeIcon').attr('src', iconURLDayThree);
                     $('#dayThreeIcon').attr("alt", iconAltDayThree);
                 
                     $('#dayThreeTemp').text('Temperature: ' + response.daily[2].temp.day);
                     $('#dayThreeHumid').text('Humidity: ' + response.daily[2].humidity);


                    //* adding the day to the third day
                     $('#dayThree').text(moment().add(3, 'day').format('L'));

                     iconDayThree= response.daily[2].weather[0].icon;
                     iconAltDayThree= response.daily[2].weather[0].main
                     $('#dayThreeIcon').attr('src', '');
                     $('#dayThreeIcon').attr("alt", '');
                     var iconURLDayThree = 'https://openweathermap.org/img/wn/' + iconDayThree + '@2x.png';
                     $('#dayThreeIcon').attr('src', iconURLDayThree);
                     $('#dayThreeIcon').attr("alt", iconAltDayThree);
                 
                     $('#dayThreeTemp').text('Temperature: ' + response.daily[2].temp.day);
                     $('#dayThreeHumid').text('Humidity: ' + response.daily[2].humidity);
                    

                     //* adding the day to the Fourth day
                     $('#dayFour').text(moment().add(4, 'day').format('L'));

                     iconDayFour= response.daily[3].weather[0].icon;
                     iconAltDayFour= response.daily[3].weather[0].main
                     $('#dayFourIcon').attr('src', '');
                     $('#dayFourIcon').attr("alt", '');
                     var iconURLDayFour = 'https://openweathermap.org/img/wn/' + iconDayFour + '@2x.png';
                     $('#dayFourIcon').attr('src', iconURLDayFour);
                     $('#dayFourIcon').attr("alt", iconAltDayFour);
                 
                     $('#dayFourTemp').text('Temperature: ' + response.daily[3].temp.day);
                     $('#dayFourHumid').text('Humidity: ' + response.daily[3].humidity);


                     //* adding the day to the Fiveth day
                     $('#dayFive').text(moment().add(5, 'day').format('L'));

                     iconDayFive= response.daily[4].weather[0].icon;
                     iconAltDayFive= response.daily[4].weather[0].main
                     $('#dayFiveIcon').attr('src', '');
                     $('#dayFiveIcon').attr("alt", '');
                     var iconURLDayFive = 'https://openweathermap.org/img/wn/' + iconDayFive + '@2x.png';
                     $('#dayFiveIcon').attr('src', iconURLDayFive);
                     $('#dayFiveIcon').attr("alt", iconAltDayFive);
                 
                     $('#dayFiveTemp').text('Temperature: ' + response.daily[4].temp.day);
                     $('#dayFiveHumid').text('Humidity: ' + response.daily[4].humidity);


                })
         
           //*change the current display using the 2nd API
        
          });
    };
  
  })