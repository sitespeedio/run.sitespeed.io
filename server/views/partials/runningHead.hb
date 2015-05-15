
  <meta charset='utf-8'>
  <meta name="viewport" content="initial-scale=1">
  <title>{{title}}</title>
  <meta name="robots" content="noindex,nofollow">
  <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/img/ico/sitespeed.io-144.png">
  <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/mg/ico/sitespeed.io-114.png">
  <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/img/ico/sitespeed.io-72.png">
  <link rel="apple-touch-icon-precomposed" href="/img/ico/sitespeed.io-57.png">
  <link rel="shortcut icon" href="/img/ico/sitespeed.io.ico">
  <meta name="description" content="{{description}}">
  <meta name="keywords" content="sitespeed.io, wpo, webperf, perfmatters">
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
       location.reload();
     } else {
     oldState = serverResponse.status;
     setTimeout(worker, 5000);
   }
  };

  xhr.onerror = function() {
    // oops couldn't fetch the response
  };

  xhr.send();
}

worker();


  function getACat(date) {
      document.getElementById("result").src = "http://thecatapi.com/api/images/get?format=src&type=gif&date=" + date;
  }

  setInterval(function(){getACat(new Date())}, 8000);
  </script>
  <style>
  {{> css}}
  </style>
