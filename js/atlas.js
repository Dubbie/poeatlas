var events = require('./pubsub.js');

var atlas = (function () {
  var total = 0;

  // DOM stuff
  var atlasContainer = document.getElementById('atlas-container');
  var atlasCounter   = atlasContainer.querySelector('#atlas-counter');
  var atlasTotal     = atlasContainer.querySelector('#atlas-total');
  var atlasBar       = atlasContainer.querySelector('#atlas-bar');

  function setTotal(maps) {
    total = maps.length;
    count = maps.filter(function (m) { return m.completed; }).length;

    atlasTotal.innerText = total;
    atlasCounter.innerText = count;

    atlasBar.style.width = (count / total) * 100 + '%';
  }

  function init() {
    events.on('mapsChanged', setTotal);
  }

  init();
})();
