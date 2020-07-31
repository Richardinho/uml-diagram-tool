
module.exports = function createPath(nodes) {
  let path = [];

  path[0] = { x: nodes['outer1']['x'], y: nodes['outer1']['y'] };
  path[1] = { x: nodes['outer1']['x'], y: nodes['inner1']['y'] };
  path[2] = { x: nodes['inner2']['x'], y: nodes['inner1']['y'] };
  path[3] = { x: nodes['inner2']['x'], y: nodes['outer2']['y'] };

  return  path;
}

