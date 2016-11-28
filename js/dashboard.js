var dashboard = (function () {

  // DOM
  var body         = document.body;
  var q            = body.querySelector('#q');
  var newMapButton = body.querySelector('#new-map-button');
  var newMapForm   = body.querySelector('#new-map-form');
  var table        = body.querySelector('table');
  var removeButton = body.querySelector('#remove-maps-button');
  var mapsForm     = body.querySelector('#maps-form');

  function init() {
    bindUIActions();
  }

  function bindUIActions() {
    // Toggle new map form
    newMapButton.onclick = function () {
      newMapForm.classList.toggle('hidden');
    };

    removeButton.onclick = function () {
      // Submit the form
      mapsForm.submit();
    };

    // Get maps
    q.onkeyup = function () {
      getMaps(q.value);
    };
  }

  function getMaps(query) {
    var http = new XMLHttpRequest();

    http.open('POST', 'maps/fetch.php', true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
        // Render maps
        showMaps(JSON.parse(http.responseText));
      }
    };

    http.send('search=' + query);
  }

  function showMaps(maps) {
    // Hide children
    var rows = toArray(table, '.map');

    // Go though every element
    if (maps.length > 0) {
      rows.forEach(function (row) {
        var id = row.children[1].innerText;
        var i = 0;
        var f = false;

        while (i < maps.length && !f) {
          f = maps[i].id == id;
          i++;
        }

        if (i == maps.length) {
          row.classList.add('hidden');
        } else {
          row.classList.remove('hidden');
        }
      });
    }
  }

  init();
})();
