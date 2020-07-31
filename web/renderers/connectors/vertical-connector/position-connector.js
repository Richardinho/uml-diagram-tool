let buildPath = require('../../../new-utility/build-path.js');

function createPath(nodes) {
  let path = [];

  path[0] = { x: nodes['outer1']['x'], y: nodes['outer1']['y'] };
  path[1] = { x: nodes['outer1']['x'], y: nodes['inner1']['y'] };
  path[2] = { x: nodes['inner2']['x'], y: nodes['inner1']['y'] };
  path[3] = { x: nodes['inner2']['x'], y: nodes['outer2']['y'] };

  return  path;
}

module.exports.positionConnector = function positionConnector(connector, nodeEls) {
  const nodes = connector.nodes;
  const {outer1El, inner1El, inner2El, outer2El, pathEl} = nodeEls;

  const outer1Node = nodes['outer1'];
  const inner1Node = nodes['inner1'];
  const inner2Node = nodes['inner2'];
  const outer2Node = nodes['outer2'];

  outer1El.setAttribute('cx', outer1Node.x);
  outer1El.setAttribute('cy', outer1Node.y);

  inner1El.setAttribute('cx', outer1Node.x);
  inner1El.setAttribute('cy', inner1Node.y);

  inner2El.setAttribute('cx', inner2Node.x);
  inner2El.setAttribute('cy', inner1Node.y);

  outer2El.setAttribute('cx', inner2Node.x);
  outer2El.setAttribute('cy', outer2Node.y);

  const path = createPath(nodes);
  pathEl.setAttribute('d', buildPath(path));
}
