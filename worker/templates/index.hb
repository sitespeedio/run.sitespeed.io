<!DOCTYPE html>
<html>
  <head>
    <meta charset='utf-8'>
    <meta name="viewport" content="initial-scale=1">
    <link href="css/style.css" rel="stylesheet" type="text/css">
    <title>Sitespeed.io results for {{url}}</title>
  </head>
  <body id="{{bodyId}}" class="resultpage">
    <div id="container">
      <div id="top"></div>

      <header>
        <a class="homelink" href="http://run.sitespeed.io">sitespeed.io</a>
      </header>
      <div id="page">
        <div id="content">
          <h1 id="box-title">{{boxTitle}}</h1>
          <div id="stars">{{{stars}}}</div>

            <input id="analyze-url" type="text" disabled
                   value="{{url}}"/>

          <p class="result-test-info">
            Test performed {{date}} with {{browser}} using a {{connection}} connection from {{location}}.
          </p>

          <p class="result-user-agent">
            <em>SpeedIndex:</em> <strong>{{speedIndex}}</strong>
            <em>Score:</em> <strong>{{score}}</strong>
          </p>

          <div id="share-result">
            <a href="{{link}}"><button id="result-see-details" class="result-button">See details</button></a>
            <a href="{{id}}.tar.gz"><button id="result-download" class="result-button">Download</button></a>
            <ul id="share">
              <li class="twitter"><a href="https://twitter.com/intent/tweet?text={{myUrl}}" title="Share on Twitter"><span class="count">Tw</span></a></li>
              <li class="facebook"><a href="https://www.facebook.com/sharer/sharer.php?u={{myUrl}}" title="Share on Facebook"><span class="count">Fb</span></a></li>
              <li class="googleplus"><a href="https://plus.google.com/share?url={{myUrl}}" title="Share on Google Plus"><span class="count">G+</span></a></li>
              <li class="linkedin"><a href="https://pinterest.com/pin/create/button/?url=&media={{myUrl}}&description=">Pinterest</a></li>
              <li class="pinterest"><a href="https://www.linkedin.com/shareArticle?mini=true&url={{myUrl}}&title=&summary=&source=">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>
      <footer>

        <a class="homelink" href="/">Sitespeed.io</a>

        <ul id="footerlinks" class="footerlist">
          <li><a href="//run.sitespeed.io/about/">About</a></li>
          <li><a href="//run.sitespeed.io/sponsors/">Sponsors</a></li>
          <li><a href="//run.sitespeed.io/dashboard/">Dashboard</a></li>
          <li><a href="//run.sitespeed.io/faq/">FAQ</a></li>
        </ul>

        <ul id="footershare" class="socialcount footerlist">
          <li class="facebook"><a href="https://www.facebook.com/sitespeed.io" title="Like on Facebook"></a></li>
          <li class="twitter"><a href="https://twitter.com/sitespeedio" title="Follow on Twitter"></a></li>
          <li class="github"><a href="https://github.com/sitespeedio/sitespeed.io" title="Star on Github"></a></li>
        </ul>

      </footer>
    </div>
  </body>
</html>
