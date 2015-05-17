    <div id="page">
      <div id="content">
        <!--<h2>Analyze your website speed and performance:</h2>-->

        <form id="analyze-form" method="post" action="/">
          <input id="analyze-url" name="url" type="text" required pattern="https?://.+"  placeholder="Enter website url" title="Add a URL starting with http(s)://">

          <label><span>Browser:</span> <select name="browser">
            <option value="firefox">Firefox</option>
            <option value="chrome">Chrome</option>
          </select></label>
          <label><span>Location:</span> <select name="location">
            <option value="nyc">NYC</option>
            <option value="sf">SF</option>
            <option value="amsterdam">Amsterdam</option>
          </select></label>
          <label><span>Connection type:</span> <select name="connection">
            <option value="mobile3g">Mobile3g (1.6 Mbps/768 Kbps - 300 RTT)</option>
            <option value="mobile3gfast">Mobile3g fast (1.6 Mbps/768 Kbps - 150 RTT)</option>
            <option value="cable">Cable (5 Mbps/1 Mbps - 28 RTT)</option>
          </select></label>
          <label><a href="http://www.sitespeed.io">More configuration options?</a></label>
          <input type="submit" value="Start analyzing">
        </form>

      </div>
    </div>
