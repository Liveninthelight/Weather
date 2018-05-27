var app = new Vue({
  el: '#app',
  data: {
    city: "",
    temp_f: "",
    temp_c: "",
    weather: "",
    humidity: "",
    feels_f: "",
    feels_c: "",
    wind: "",
    image: ""
  },
});

$('body').hide();
$('#main-content').hide();
$('body').fadeIn(1800);
$('#city').hide();
$('.loading').hide();
$('.loading').fadeIn(3000);
$('#c').hide();

$(document).ready(function(){
navigator.geolocation.getCurrentPosition(function(position){


var latitude = position.coords.latitude;
var longitude = position.coords.longitude;
  
function getWeather(url){
  $.ajax({
    url: url,
    method: 'GET',
    dataType: 'json',
    success: function(data, textStatus, jqXHR){
      // Display these values:
      // feelslike_f feelslike_c
      // wind_string
      data = data.current_observation;
      app.city = data.display_location.city
      app.temp_f = data.temp_f;
      app.temp_c = data.temp_c;
      app.weather = data.weather;
      app.humidity = data.relative_humidity;
      app.feels_f = data.feelslike_f;
      app.feels_c = data.feelslike_c;
      app.wind = data.wind_string;
      app.image = data.icon_url
      console.log(data);
    },
    complete: function(){
      $('.loading').hide();
      $('#city').fadeIn(1200);
      $('#main-content').fadeIn(1400);
      $('button').click(function(){
        $('#f').toggle();
        $('#c').toggle();
        if($('#f').is(":visible")){
          $('button').html('change to celsius');
        }else{
          $('button').html('change to fahrenheit');
        }
        
      });
    }
  });
}
  
var url = 'https://api.wunderground.com/api/3e0475418dfdb024/conditions/q/'+ latitude +','+ longitude +'.json';

getWeather(url);

  


  
  
  
  

}); 
});