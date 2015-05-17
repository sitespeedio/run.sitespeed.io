<!DOCTYPE html>
<html>
  <head>
    <meta charset='utf-8'>
    <meta name="viewport" content="initial-scale=1">
    <link href="css/style.css" rel="stylesheet" type="text/css">
  </head>
  <body id="{{bodyId}}" class="resultpage">
    <div id="container">
      <div id="top"></div>

      <header>
        <a class="homelink" href="/">sitespeed.io</a>
      </header>
      <div id="page">
        <div id="content">
          <h1 id="box-title">{{boxTitle}}</h1>
          <div id="stars">{{{stars}}}</div>

            <input id="analyze-url" type="text" disabled
                   value="{{url}}"/>

          <p class="result-test-info">
            Test performed Mon Dec 15 2014 22:16:30 GMT+0100 (CET) with sitespeed.io-desktop rules
          </p>

          <p class="result-user-agent">
            <strong>
              User-Agent:
            </strong>
            <em>Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4)</em>

            speedIndex: {{speedIndex}},
            score: {{score}},
          </p>

          <div id="share-result">
            <a href="{{link}}"><button id="result-see-details" class="result-button">See details</button></a>
            <a href="{{id}}.tar.gz"><button id="result-download" class="result-button">Download</button></a>
            <ul id="share">
              <li class="twitter"><a href="https://twitter.com/intent/tweet?text=http://sitespeed.io/" title="Share on Twitter"><span class="count">Tw</span></a></li>
              <li class="facebook"><a href="https://www.facebook.com/sharer/sharer.php?u=http://sitespeed.io/" title="Share on Facebook"><span class="count">Fb</span></a></li>
              <li class="googleplus"><a href="https://plus.google.com/share?url=http://sitespeed.io/" title="Share on Google Plus"><span class="count">G+</span></a></li>
              <li class="linkedin"><a href="https://pinterest.com/pin/create/button/?url=&media=http://sitespeed.io&description=">Pinterest</a></li>
              <li class="pinterest"><a href="https://www.linkedin.com/shareArticle?mini=true&url=http://sitespeed.io&title=&summary=&source=">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>
      <footer>

        <a class="homelink" href="/">Sitespeed.io</a>

        <ul id="footerlinks" class="footerlist">
          <li><a href="extra.html">Extra</a></li>
          <li><a href="process.html">Process</a></li>
          <li><a href="bad_result.html">Bad result</a></li>
          <li><a href="good_result.html">Good Result</a></li>
          <li><a href="great_result.html">Great result</a></li>
        </ul>

        <ul id="footershare" class="socialcount footerlist" data-url="http://sitespeed.io/" data-facebook-action="recommend" data-share-text="Sitespeed.io">
          <li class="facebook"><a href="https://www.facebook.com/sharer/sharer.php?u=http://sitespeed.io/" title="Share on Facebook"><span class="count">Fb</span></a></li>
          <li class="twitter"><a href="https://twitter.com/intent/tweet?text=http://sitespeed.io/" title="Share on Twitter"><span class="count">Tw</span></a></li>
          <li class="googleplus"><a href="https://plus.google.com/share?url=http://sitespeed.io/" title="Share on Google Plus"><span class="count">G+</span></a></li>
        </ul>

      </footer>
    </div>
  </body>
</html>
