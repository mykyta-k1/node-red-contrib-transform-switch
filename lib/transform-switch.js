const _ = require("lodash");

module.exports = function (RED) {
  function nodeDefinition(config) {
    const node = this;
    RED.nodes.createNode(this, config);

    node.on("input", function (msg, send, done) {
      const ops = config.operations;
      const results = ops.map((op) => applyOperation(op, _.cloneDeep(msg)));
      send(results);
      done();
    });
  }

  RED.nodes.registerType("transform-switch", nodeDefinition);

  function applyOperation(op, msg) {
    switch (op.type) {
      case "set":
        _.set(msg, op.target, op.value);
        break;
      case "delete":
        _.unset(msg, op.target);
        break;
      case "move": {
        const val = _.get(msg, op.from);
        _.set(msg, op.to, val);
        _.unset(msg, op.from);
        break;
      }
      case "change": {
        const old = _.get(msg, op.from);
        const newVal = String(old).replace(op.search, op.replace);
        _.set(msg, op.from, newVal);
        break;
      }
      case "passthrough":
        break;
    }
    return msg;
  }
};
