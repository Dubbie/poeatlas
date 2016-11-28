var maps = (function () {

  var Map = function (map) {
    // Basic variables
    var _this = this;

    this.name = map.name;
    this.tier = map.tier;
    this.bonus = map.bonus;
    this.completed = false;
    this.unique = map.unique;

    // Functions
    this.complete = function (c) {
      if (c) {
        this.element.classList.add('completed');
      } else {
        this.element.classList.remove('completed');
      };

      this.completed = c;
      events.emit('completedChanged', this);
    };

    this.render = function () {
      // DOM stuff
      this.element = document.createElement('span');
      this.element.classList.add('map-name');

      var link = document.createElement('a');
      link.target = '_blank';
      link.href = 'http://pathofexile.gamepedia.com/index.php?search=' + map.name;
      link.innerText = map.name;

      // If map is unique, color the name accordingly
      if (_this.unique) {
        link.classList.add('unique');
      };

      this.element.appendChild(link);

      // this.element.innerText = map.name;
      this.element.setAttribute('map-name', this.name);

      this.element.onclick = function (e) {
        if (e.target != link) {
          _this.complete(!_this.completed);
        }
      };

      // Map tier container
      // Find if it exists
      this.mapTierContainer = mapsContainer.querySelector('#map-tier-' + this.tier) || document.createElement('div');

      if (!this.mapTierContainer.classList.contains('map-tier')) {
        // If not, then do initial stuff, like setting the correct heading
        var heading = document.createElement('h2');
        heading.classList.add('map-tier-heading');
        heading.innerText = 'Tier ' + this.tier;

        // Tier coloring
        if (map.tier > 10) {
          heading.classList.add('red');
        } else if (map.tier > 5) {
          heading.classList.add('yellow');
        } else {
          heading.classList.add('white');
        }

        var counter = document.createElement('span');
        counter.classList.add('map-tier-counter');

        heading.appendChild(counter);

        var completeButton = document.createElement('img');
        completeButton.classList.add('map-tier-complete');
        completeButton.src = 'img/toggle_off.png';
        completeButton.onclick = function () {
          toggleTier(map.tier);
        };

        var expando = document.createElement('div');
        expando.classList.add('map-expando');

        // BindEvent
        heading.onclick = function () {
          expando.classList.toggle('collapsed');
        };

        this.mapTierContainer.id = 'map-tier-' + this.tier;
        this.mapTierContainer.classList.add('map-tier');

        this.mapTierContainer.appendChild(heading);
        this.mapTierContainer.appendChild(completeButton);
        this.mapTierContainer.appendChild(expando);

        mapsContainer.appendChild(this.mapTierContainer);
      }

      this.mapTierContainer.querySelector('.map-expando').appendChild(this.element);
    };
  };

  // Time to learn PubSub, yay!
  var maps = [];
  var completed = typeof (localStorage.completed) !== 'undefined' ? JSON.parse(localStorage.completed) : [];

  // DOM stuff
  var body = document.body;
  var mapsContainer = body.querySelector('#maps-container');

  function isComplete(map) {
    var c = false;

    for (var i = 0; i < completed.length; i++) {
      if (completed[i].name == map.name) {
        c = true;
        break;
      }
    }

    return c;
  }

  function toggleTier(t) {
    var button = mapsContainer.querySelector('#map-tier-' + t + ' .map-tier-complete');
    var value = true;

    var mapsInTier = maps.filter(function (map) {
      return map.tier == t;
    });

    var mapsInTierCompleted = mapsInTier.filter(function (map) {
      return map.completed == true;
    });

    // Check if all maps were previously completed
    if (mapsInTierCompleted.length == mapsInTier.length) {
      value = false;
    }

    mapsInTier.forEach(function (map) {
      map.complete(value);
    });

    checkTierLabels();
  }

  function checkTierLabels() {
    // First check the tiers
    var els = [].slice.call(mapsContainer.querySelectorAll('.map-tier'));

    // Go through each tier
    els.forEach(function (el) {
      var t = parseInt(el.id.replace('map-tier-', ''));
      var counter = el.querySelector('.map-tier-counter');

      // Find the maps according to tier
      var mapsInTier = maps.filter(function (map) {
        return map.tier == t;
      });

      var mapsInTierCompleted = mapsInTier.filter(function (map) {
        return map.completed == true;
      });

      // Switch updating
      if (mapsInTier.length == mapsInTierCompleted.length) {
        counter.classList.add('hidden');
        el.querySelector('.map-tier-complete').src = 'img/toggle_on.png';
      } else {
        counter.classList.remove('hidden');
        el.querySelector('.map-tier-complete').src = 'img/toggle_off.png';
      }

      counter.innerText = mapsInTierCompleted.length + ' / ' + mapsInTier.length;
    });
  }

  function getMaps(query) {
    var http = new XMLHttpRequest();

    http.open('POST', 'maps/fetch.php', true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
        // Store maps
        var ms = JSON.parse(http.responseText);

        // Hide loader
        var l = body.querySelector('#loader');
        l.parentNode.removeChild(l);

        // Render maps
        ms.forEach(function (m) {
          var newMap = new Map(m);
          newMap.render();
          maps.push(newMap);
        });

        // Check them out
        maps.forEach(function(map) {
          map.complete(isComplete(map));
        });

        checkTierLabels();
        setExpandoHeights();
      }
    };

    http.send('search=' + query);
  }

  function setExpandoHeights() {
    var expandos = [].slice.call(mapsContainer.querySelectorAll('.map-expando'));
    expandos.forEach(function (expando) {
      expando.style.maxHeight = expando.getBoundingClientRect().height + 'px';

      // expando.classList.add('collapsed');
      expando.classList.add('collapsed', 'animated');
    });

    // Open up the first expando to show that it's a dropdown
    maps[0].element.parentNode.classList.remove('collapsed')
  }

  function updateCompleted(map) {
    var i = 0;
    var l = false;

    while (i < completed.length && !l) {
      l = completed[i].name == map.name;
      i++;
    }

    if (!l && map.completed) {
      completed.push(map);
    } else if (l && !map.completed) {
      completed.splice(i - 1, 1);
    }

    checkTierLabels();

    // Set the localStorage
    localStorage.completed = JSON.stringify(completed);
    events.emit('mapsChanged', maps);
  }

  function resetCompleted(mapsToReset) {
    mapsToReset.forEach(function (map) {
      map.complete(false);
    });
  }

  function completeAll() {
    maps.forEach(function (map) {
      map.complete(true);
    });
  }

  function toggleExpandos(mode) {
    var exps = mapsContainer.querySelectorAll('.map-expando');

    exps.forEach(function (el) {
      if (mode == true) {
        el.classList.remove('collapsed');
      } else {
        el.classList.add('collapsed');
      }
    });
  }

  function toggleIncompletedTiers(mode) {
    if (maps.length > 0) {
      // First check the tiers
      var els = [].slice.call(mapsContainer.querySelectorAll('.map-tier'));

      // Go through each tier
      els.forEach(function (el) {
        var t = parseInt(el.id.replace('map-tier-', ''));
        var counter = el.querySelector('.map-tier-counter');
        var nums = counter.innerText.split(' / ');
        var count = nums[1] - nums[0];

        var mapsInTier = maps.filter(function(m) { return m.tier == t });

        if (mode == true && count == 0) {
          el.classList.add('hidden');
        } else if (mode == true && count > 0) {
          el.classList.remove('hidden');
        } else {
          el.classList.remove('hidden');

          mapsInTier.forEach(function(map) {
            if (map.completed) {
              map.element.classList.add('hidden');
            } else {
              map.element.classList.remove('hidden');
            }
          });
        }

        // Go through each map and hide the completed
        mapsInTier.forEach(function(map) {
          if (map.completed && mode == true) {
            map.element.classList.add('hidden');
          } else {
            map.element.classList.remove('hidden');
          }
        });
      });
    }
  }

  function init() {
    events.on('completedChanged', updateCompleted);
    events.on('resetCompleted', resetCompleted);
    events.on('completeAll', completeAll);
    events.on('toggleExpandos', toggleExpandos);
    events.on('toggleIncompletedTiers', toggleIncompletedTiers);

    getMaps('');
  }

  init();
})();
