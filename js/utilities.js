// Array helper function
function toArray(el, selector) {
  var array = el.querySelectorAll(selector);

  if (array.length == 0) {
    return array[0];
  } else if (array.length > 0) {
    return array;
  } else {
    return false;
  }
};

// Thank you to akai @ stackoverflow
function scrollTo(element, to, duration) {
  var start = element.scrollTop;
  var change = to - start;
  var increment = 20;

  var animateScroll = function (elapsedTime) {
    elapsedTime += increment;
    var position = easeInOut(elapsedTime, start, change, duration);

    element.scrollTop = position;
    if (elapsedTime < duration) {
      setTimeout(function () {
        animateScroll(elapsedTime);
      }, increment);
    }
  };

  animateScroll(0);
}

function easeInOut(currentTime, start, change, duration) {
  currentTime /= duration / 2;
  if (currentTime < 1) {
    return change / 2 * currentTime * currentTime + start;
  }

  currentTime -= 1;
  return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
}
