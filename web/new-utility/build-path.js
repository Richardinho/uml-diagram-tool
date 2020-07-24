
function buildPath(pointsArray, closePath) {
  var path = "M" + pointsArray[0].x + " " + pointsArray[0].y + "L";

  for (var i = 1; i < pointsArray.length; i++) {
    path += (pointsArray[i].x + " ");
    path += (pointsArray[i].y + " ");
  }

  if (closePath) {
    path += "Z";
  }

  return path;
}

module.exports = buildPath;
