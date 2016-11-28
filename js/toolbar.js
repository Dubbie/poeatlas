var toolbar = (function () {

  var completed = [];

  // DOM
  var body = document.body;
  var toolbar = body.querySelector('#toolbar');
  var resetButton = toolbar.querySelector('#reset');
  var completeButton = toolbar.querySelector('#complete');
  var expandButton = toolbar.querySelector('#expand');
  var toggleButton = toolbar.querySelector('#toggle-incomplete');
  var topButton = body.querySelector('#top-button');

  function bindUIActions() {
    // Reset button
    resetButton.onclick = function () {
      if (confirm('Are you sure you want to reset all of your completed maps?')) {
        // Send reset command to maps.js
        events.emit('resetCompleted', completed);
      }
    };

    // Complete button
    completeButton.onclick = function () {
      if (confirm('Are you sure you want to set all the maps to completed?')) {
        // Send set command to maps.js
        events.emit('completeAll');
      }
    };

    // Expand button
    expandButton.onclick = function () {

      // Toggle active
      expandButton.classList.toggle('active');

      // Change Icon and tooltip
      var fa = expandButton.children[0];

      if (!expandButton.classList.contains('active')) {
        expandButton.setAttribute('data-tooltip-text', 'Expand tiers');
      } else {
        expandButton.setAttribute('data-tooltip-text', 'Collapse tiers');
      }

      fa.classList.toggle('fa-compress');
      fa.classList.toggle('fa-expand');

      events.emit('toggleExpandos', expandButton.classList.contains('active'));
    };

    // Toggle Incompleted tiers
    toggleButton.onclick = function () {
      toggleButton.classList.toggle('active');
      toggleIncomplete();
    };

    // Toggle top button if scrolled
    window.onscroll = function () {
      var btn = body.querySelector('#top-button');
      if (window.pageYOffset > 0) {
        btn.classList.remove('hidden');
      } else {
        btn.classList.add('hidden');
      }
    };

    // Top button smooth scrolling
    topButton.onclick = function () {
      scrollTo(document.body, 0, 500);
    };
  }

  function toggleIncomplete() {
    var mode = toggleButton.classList.contains('active');

    if (mode) {
      toggleButton.setAttribute('data-tooltip-text', 'Show all');
    } else {
      toggleButton.setAttribute('data-tooltip-text', 'Show incomplete only');
    }

    events.emit('toggleIncompletedTiers', mode);
  }

  function setCompleted(maps) {
    completed = maps.filter(function (m) { return m.completed; });
  }

  function init() {
    bindUIActions();

    events.on('mapsChanged', setCompleted);
    events.on('completedChanged', toggleIncomplete);
  }

  init();
})();
