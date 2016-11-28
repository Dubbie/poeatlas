var atlas = (function () {
  var completed = 0;
  var total = 0;

  // DOM stuff
  var atlasContainer = document.getElementById('atlas-container');
  var atlasCounter = atlasContainer.querySelector('#atlas-counter');
  var atlasTotal = atlasContainer.querySelector('#atlas-total');
  var atlasBar = atlasContainer.querySelector('#atlas-bar');

  function init() {
    events.on('mapsChanged', setTotal);
  }

  function setTotal(maps) {
    total = maps.length;
    count = maps.filter(function (m) { return m.completed; }).length;

    atlasTotal.innerText = total;
    atlasCounter.innerText = count;

    atlasBar.style.width = (count / total) * 100 + '%';
  }

  init();
})();
