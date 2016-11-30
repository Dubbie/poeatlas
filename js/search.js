var events = require('./pubsub.js');

var search = (function () {
  // Other stuff
  var maps = [];

  // Dom
  var body = document.body;
  var searchForm = body.querySelector('#search-form');
  var searchInput = searchForm.querySelector('#search-input');
  var dropDown = searchForm.querySelector('.dd');

  function init() {
    // PubSub pattern <3
    events.on('mapsChanged', setMaps);
    bindUIActions();
  }

  function setMaps(newMaps) {
    maps = newMaps;
  }

  function bindUIActions() {
    searchInput.onkeyup = function () {
      searchMaps(this.value);
    };

    searchInput.onclick = function () {
      searchMaps(this.value);
    };

    // Close the dropdown if not focused
    body.onclick = function (e) {
      var p = e.target.parentElement;

      if (p.className.indexOf('dd') == -1) {
        toggleDropdown('hide');
      }
    };
  }

  function searchMaps(query) {
    // Dropdown toggling
    if (query.length > 2) {
      // Reset dropdown
      resetDropdown();

      // Find the correct maps
      var found = maps.filter(function (m) {
        return m.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
      });

      if (found.length > 0) {
        found.forEach(function (m) {
          // Highlight the input text, hot damn thats a lot of code for something so small
          var i = m.name.toLowerCase().indexOf(query.toLowerCase());
          var bq = m.name.substr(0, i);
          var q = m.name.substr(i, query.length);
          var aq = m.name.substr(i + query.length, m.name.length);
          var newText = bq + '<b>' + q + '</b>' + aq;

          // Render the map
          var map = document.createElement('span');
          map.innerHTML = newText;
          map.classList.add('map-name');

          if (m.unique) {
            map.classList.add('unique');
          }

          map.onclick = function () {
            searchInput.value = '';
            toggleDropdown('hide');

            // Toggle map's expando, then scroll into view
            m.element.parentElement.classList.remove('collapsed');

            scrollTo(document.body, m.element.getBoundingClientRect().top, 500);

            // window.setTimeout(function () {
            //   m.element.scrollIntoView(true);
            // }, 250);
          };

          // Append it to the dropdown container
          dropDown.appendChild(map);
        });

        // Show the dropdown
        toggleDropdown('show');
      } else {
        // Didn't find anything, hide the dropdown
        toggleDropdown('hide');
      }
    } else {
      resetDropdown();
    }
  }

  function toggleDropdown(mode) {
    if (mode == 'show') {
      dropDown.classList.remove('hidden');
      searchInput.classList.remove('rounded');
    } else if (mode === 'hide') {
      dropDown.classList.add('hidden');
      searchInput.classList.add('rounded');
    }
  }

  function resetDropdown() {
    toggleDropdown('hide');

    while (dropDown.lastChild) {
      dropDown.removeChild(dropDown.lastChild);
    }
  }

  init();
})();
