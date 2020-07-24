function createVisibility(visibility) {
  switch(visibility) {
    case 'private':
      return '-';
    case 'protected':
      return '#';
    case 'public':
      return '+';
    default:
      return '-';
  }
}

function createPropertyText({visibility, name, type}) {
  return createVisibility(visibility) + name + ':' + type;
}

module.exports.createPropertyText = createPropertyText;
