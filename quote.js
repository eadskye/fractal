"use strict";

$( document ).ready(function() {
    getQuote();
    getOutQuote();
});

function getQuote() {
  $("#zin").click(function() {
  $.getJSON("https://g-cod.herokuapp.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(a) {
    console.log(a);
    $("body").append(a[0].content + "<p>— " + a[0].title + "</p>");
  });
});
}

function getOutQuote() {
  $("#zout").click(function() {  $.getJSON("https://g-cod.herokuapp.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(a) {
    console.log(a);
    $("body").append(a[0].content + "<p>— " + a[0].title + "</p>");
  });

});
}
 //
 // https://g-cod.herokuapp.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(a)
