function detectTypeBoxCollision(store, nodeX, nodeY) {

  const typeBoxes = store.getState().typeBoxes;

  let collision;

  for(let i = 0; i < typeBoxes.length; i++) {
    const {x, y, width, height} = typeBoxes[i];

    let x1 = x;
    let x2 = x + width;
    let y1 = y;
    let y2 = y + height;

    if (nodeX > x1 && nodeX < x2 && nodeY > y1 && nodeY < y2) {
      collision = typeBoxes[i];

      break;
    } 
  }

  return collision;
}

module.exports.detectTypeBoxCollision = detectTypeBoxCollision;
