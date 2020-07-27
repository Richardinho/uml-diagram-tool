let xmlns = require('./xmlns.js');

function calculateTextWidth(text, fontSize) {
  const parentEl = document.getElementById('diagram');

  var el = document.createElementNS(xmlns, "text");

  el.innerHTML = text;

  el.setAttribute('font-family', 'helvetica');
  el.setAttribute('font-size', fontSize);

  parentEl.append(el);

  width = el.getBBox().width; 

  parentEl.removeChild(el);

  return width;
}

module.exports.calculateTextWidth = calculateTextWidth;
