/*--- API ---*/

var news_api_res = "https://newsapi.org/v1/articles?source=time&sortBy=top&apiKey=f639fcbf28744c87a2a59c86cfc28a14";
var weather_api_res = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22wellington%2C%20nz%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

/*--- GET NEWS ---*/
function getNewsArticles() {
  
  $.ajax({
    dataType: "json",
    url: news_api_res,
    success: function(response) {
      
      var news_array_length = response.articles.length;
      
      // loop through news items
      for (var i = 0; i < news_array_length; i++) {

        $(".article-list").append(
          "<li style='background-image: url("+response.articles[i].urlToImage+")'>"
          + "<div>"
          + "<h3>" + response.articles[i].title + "</h3></br></br>"
          + "<i>Author: " + response.articles[i].author + "</i></br>"
          + "<i>Published on: " + response.articles[i].publishedAt + "</i></br>"
          + "<span>" + response.articles[i].description + "</span>"
          + "<a href=" + response.articles[i].url + " target='_blank'> ...read more</a>"
          + "</div>"
          + "</li>"
        );
        
      }
      
      console.log("news response", response);
      
    }
  });
  
}

/*--- GET WEATHER ---*/
function getWeather() {
  
  $.ajax({
    dataType: "json",
    url: weather_api_res,
    success: function(response) {
      
      // convert fahrenheit to celcius
      function toCelsius(f) {
          return (5/9) * (f-32);
      }
      
      var temp_fahrenheit = response.query.results.channel.item.condition.temp;
      
      console.log("weather response", response);
      
      $('.weather_container').append(
        response.query.results.channel.location.city
        + " "
        + Math.ceil(toCelsius(temp_fahrenheit)) + "&deg;C"
      );
      
      // loop through forecast
      for (var i = 0; i < 10; i++) {
        
        $('.forecast_container ul').append(
          "<li>"
          + "<h4>" + response.query.results.channel.item.forecast[i].day + "</h4>"
          + response.query.results.channel.item.forecast[i].text
          + "<i> high: " + Math.ceil(toCelsius(response.query.results.channel.item.forecast[i].high)) + "&deg;C </i>"
          + "<i> low: " + Math.ceil(toCelsius(response.query.results.channel.item.forecast[i].low)) + "&deg;C </i>"
          + "</li>"
        );
        
      }
      
    }
  });
  
}

$('.weather_container').on('click', function() {
  
  $('.forecast_container').stop().slideToggle();
  
});

getNewsArticles();
getWeather();

/*--- SW-PRECACHE SERVICE WORKER CONFIG ---*/
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function() { 
    console.log("Service Worker Registered");
  });
}