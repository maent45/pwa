/*--- API ---*/

// $.getJSON("https://newsapi.org/v1/articles?source=time&sortBy=top&apiKey=f639fcbf28744c87a2a59c86cfc28a14", function(data){
//
//   var data_length = data.articles.length;
//
//   console.log("array size: " + data_length);
//
//   for (var i = 0; i < data_length; i++) {
//
//     $(".article-list").append(
//       "<li>"
//       + "<h3>" + data.articles[i].title + "</h3>"
//       + "<img src=" + data.articles[i].urlToImage + ">"
//       + "<i>Author: " + data.articles[i].author + "</i></br>"
//       + "<i>Published on: " + data.articles[i].publishedAt + "</i></br>"
//       + "<span>" + data.articles[i].description + "</span>"
//       + "<a href=" + data.articles[i].url + " target='_blank'> ...read more</a>"
//       + "</li>"
//
//     );
//
//   }
//
// });

var news_api_res = "https://newsapi.org/v1/articles?source=time&sortBy=top&apiKey=f639fcbf28744c87a2a59c86cfc28a14";
var weather_api_res = "http://api.openweathermap.org/data/2.5/weather?q=Wellington,nz&appid=aa3dff511a90b8edad0726dc2b25ad54";

$.when(

  // get news articles and weather from their endpoints
  // $.get(news_api_res),
  $.get(weather_api_res)

).then(function(weather_data) {

  // show weather data
  console.log("WEATHER DATA: ", weather_data.name);

  // var news_data_length = news_data.articles.length;

  // loop through weather array
  // for (var i = 0; i < news_data_length; i++) {
  //
  //   $(".article-list").append(
  //     "<li>"
  //     + "<h3>" + news_data.articles[i].title + "</h3>"
  //     + "<img src=" + news_data.articles[i].urlToImage + ">"
  //     + "<i>Author: " + news_data.articles[i].author + "</i></br>"
  //     + "<i>Published on: " + news_data.articles[i].publishedAt + "</i></br>"
  //     + "<span>" + news_data.articles[i].description + "</span>"
  //     + "<a href=" + news_data.articles[i].url + " target='_blank'> ...read more</a>"
  //     + "</li>"
  //
  //   );
  //
  // }

  // return;

}).fail(function(err) {
  console.log('Something went wrong ' ,err);
});

/*--- SERVICE WORKER CONFIG ---*/
if ('serviceWorker' in navigator) {

  navigator.serviceWorker
    .register('./service-worker.js', {scope: './'})
    .then(function(registration) {
      console.log('Service Worker Registered!');
    })
    .catch(function(err) {
      console.log('Service worker failed to register :(', err);
    })

}
