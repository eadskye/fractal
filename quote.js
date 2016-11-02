"use strict";

$( document ).ready(function() {
$(".dropdown-button").dropdown();
    getQuote();
    getOutQuote();
});

function getQuote() {
  $("#zin").click(function() {
  $.getJSON("https://g-cod.herokuapp.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]="+rand_val(50).toString()+"&callback=", function(a) {
    console.log(a);
    $("#quote").html(a[0].content + "<p>— " + a[0].title +"</p>");
  });
});
}


function getOutQuote() {
  $("#zout").click(function() {  $.getJSON("https://g-cod.herokuapp.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]="+rand_val(50).toString()+"&callback=", function(a) {
    console.log(a);
    // $("myDiv").empty();
    $("#quote").html(a[0].content + "<p>— " + a[0].title +"</p>");
  });

});

}


//g-cod.herokuapp.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(a)
