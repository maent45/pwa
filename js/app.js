/*--- API ---*/

$.getJSON("https://newsapi.org/v1/articles?source=time&sortBy=top&apiKey=f639fcbf28744c87a2a59c86cfc28a14", function(data){

  console.log(data);

  for (var i = 0; i < 10; i++) {

    $(".article-list").append(
      "<li>"
      + "<h3>" + data.articles[i].title + "</h3>"
      + "<img src=" + data.articles[i].urlToImage + ">"
      + "<i>Author: " + data.articles[i].author + "</i></br>"
      + "<i>Published on: " + data.articles[i].publishedAt + "</i></br>"
      + "<span>" + data.articles[i].description + "</span>"
      + "<a href=" + data.articles[i].url + " target='_blank'> ...read more</a>"
      + "</li>"

    );

  }

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
