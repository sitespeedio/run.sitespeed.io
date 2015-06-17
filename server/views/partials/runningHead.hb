
  <meta charset='utf-8'>
  <meta name="viewport" content="initial-scale=1">
  <title>{{title}}</title>
  <noscript>
    <meta http-equiv="refresh" content="30" />
  </noscript>
  <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/img/ico/sitespeed.io-144.png">
  <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/mg/ico/sitespeed.io-114.png">
  <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/img/ico/sitespeed.io-72.png">
  <link rel="apple-touch-icon-precomposed" href="/img/ico/sitespeed.io-57.png">
  <link rel="shortcut icon" href="/img/ico/sitespeed.io.ico">
  <meta name="description" content="{{description}}">
  <meta name="keywords" content="sitespeed.io, wpo, webperf, perfmatters, performance">
  <script type = "text/javascript">

  var oldState = 'unknown';

  function worker() {

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/api/status/{{id}}", true);

  xhr.onload = function() {
    var serverResponse = JSON.parse(xhr.responseText);
     if (serverResponse.status === oldState) {
       oldState = serverResponse.status;
       setTimeout(worker, 5000);
     }
     else if (oldState !== 'unknown') {
       var display = 'Testing your site';
       if (serverResponse.status === 'waiting') {
         display = 'Waiting in line';
       } else if (serverResponse.status === 'uploading') {
         display = 'Uploading the result';
       } else if (serverResponse.status === 'crawling') {
         display = 'Crawling the site';
       } else if (serverResponse.status.indexOf('analyzing')>-1) {
         display = 'Analyzing page ' + serverResponse.status.slice(9,10);
       } else if (serverResponse.status.indexOf('measuring')>-1) {
         display = 'Collecting timing metrics for page ' +  serverResponse.status.slice(9,10);
       }
       document.getElementById('box-title').innerHTML = display;
       if (serverResponse.status === 'done' || serverResponse.status === 'failed') {
         location.reload();
         return;
       } else {
         oldState = serverResponse.status;
         setTimeout(worker, 2000);
       }
     } else {
     oldState = serverResponse.status;
     setTimeout(worker, 2000);
   }
  };

  xhr.onerror = function() {
    // oops couldn't fetch the response
  };

  xhr.send();
}

worker();

var showCats = true;

  function getContent(date) {

    if (!showCats) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/texts/webperf.json", true);

    xhr.onload = function() {
    var serverResponse = JSON.parse(xhr.responseText);

    var mess = serverResponse.messages[Math.floor(Math.random() * serverResponse.messages.length)];

     document.getElementById("randomtext").innerHTML = '<p>' + mess.m + '</p>';
   };

    xhr.onerror = function() {
      // oops couldn't fetch the response
    };

    xhr.send();
    showCats = true;
  }
  else {
    document.getElementById("result").src =
    "//thecatapi.com/api/images/get?format=src&type=gif&date=" + date;
    showCats = false;
  }

  }

  setInterval(function(){getContent(new Date())}, 20000);
  </script>
  <style>
  {{> css}}
  </style>
