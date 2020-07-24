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

function createArgs(args) {
  return args.reduce((memo, arg) => {
    return memo + arg.name + ':' + arg.type + ',';
  }, '');
}

function createMethodText({visibility, name, args, returnType}) {
  return createVisibility(visibility) + name + '(' + createArgs(args) + '):' + returnType;
}

module.exports.createMethodText = createMethodText;
