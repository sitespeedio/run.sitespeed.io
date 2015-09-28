    <div id="page">
      <div id="content">
        <!--<h2>Analyze your website speed and performance:</h2>-->

        <form id="analyze-form" method="post" action="/">
          <input id="analyze-url" name="url" type="url" required pattern="https?://.+"  placeholder="http(s)://" title="Add a URL starting with http(s)://">

          <label><span>Browser:</span> <select name="browser">
            <option value="firefox" selected>Firefox [41]</option>
            <option value="chrome">Chrome [45]</option>
          </select></label>
          <label><span>Location:</span> <select name="location">
            <option value="nyc">New York [USA]</option>
            <option value="sf">San Francisco [USA]</option>
            <option value="amsterdam">Amsterdam [Netherlands]</option>
            <option value="singapore">Singapore [Singapore]</option>
          </select></label>
          <label><span>Connection type:</span> <select name="connection">
            <option value="mobile3g">mobile3g</option>
            <option value="mobile3gfast">mobile3g fast</option>
            <option value="cable" selected>cable</option>
            <option value="native">native</option>
          </select></label>
          <input type="submit" value="Start analyzing">
        </form>

      </div>
    </div>
