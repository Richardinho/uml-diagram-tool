
module.exports = function createPath(nodes) {
  let path = [];

  path[0] = { x: nodes['outer1']['x'], y: nodes['outer1']['y'] };
  path[1] = { x: nodes['inner1']['x'], y: nodes['outer1']['y'] };
  path[2] = { x: nodes['inner1']['x'], y: nodes['inner2']['y'] };
  path[3] = { x: nodes['outer2']['x'], y: nodes['inner2']['y'] };

  return  path;
}

