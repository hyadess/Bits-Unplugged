import React, { Component } from "react";
import PropTypes from "prop-types";
import TransitionGroup from "react-addons-transition-group";

import "./compTree.scss";
import TreeCore, { NodeCore, TreeLogger } from "./Tree";
import Node from "./compNode";
import Path from "./compPath";

class compTree extends Component {
  constructor(props) {
    super(props);
    this.handleInsert = this.handleInsert.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.getDelta = this.getDelta.bind(this);
    this.state = {
      snapshot: null,
      dimension: null,
      nodes: [],
      paths: [],
      prevTaskId: 0,
      prevNodes: {},
      prevPaths: {},
    };
  }

  componentDidMount() {
    this.setState({
      dimensions: {
        width: this.container.offsetWidth - 120,
        height: this.container.offsetHeight - 120,
      },
    });
  }

  componentWillReceiveProps(nextProps) {
    var snapshot = nextProps.snapshots[nextProps.taskId];
    var prevSnapshot = this.props.snapshots[this.props.taskId];

    this.getDelta(prevSnapshot, snapshot, nextProps.activeNodes);
  }

  handleInsert(task) {}

  handleDelete(task) {}

  calculateX(path, level, treeWidth) {
    if (path.length != level) {
      console.log("OMG");
      console.log(path, level);
    }

    var maxWidth = treeWidth;
    var x = this.partitionWidth(0, treeWidth, path);
    return x;
  }

  partitionWidth(low, high, path) {
    var half = (high + low) / 2.0;
    if (path == "") {
      return half;
    } else if (path[0] == "L") {
      return this.partitionWidth(low, half, path.slice(1));
    } else {
      return this.partitionWidth(half, high, path.slice(1));
    }
  }

  getDelta(from, to, activeNodes) {
    var nodes = [];
    var prevNodes = {};

    var width = this.state.dimensions.width;
    var height = this.state.dimensions.height;

    var nodeMap = to.compile();
    var prevNodeMap = from.compile();

    let levels = Object.getOwnPropertyNames(nodeMap);
    let depth = levels.length;
    let treeDepth = depth - 1;

    // Create nodes.
    for (var i = 0; i < depth; i++) {
      let level = levels[i];
      let nodesAtLevel = nodeMap[level];
      for (var j = 0; j < nodesAtLevel.length; j++) {
        let nodeId = nodesAtLevel[j];
        if (nodeId != null) {
          var nodeObj = to.getNode(nodeId);
          var x = this.calculateX(nodeObj.nodePath, level, width);
          var y = level * Node.SIZE;
          var prevX = 0;
          var prevY = 0;
          var appear = true;
          var prevNode = this.state.prevNodes[nodeId];
          if (typeof prevNode !== "undefined") {
            prevX = prevNode.x;
            prevY = prevNode.y;
            appear = false;
          } else {
          }

          var look = false;
          var compare = false;
          var error = false;
          if (activeNodes[0].includes(nodeId)) {
            look = true;
          } else if (activeNodes[1].includes(nodeId)) {
            compare = true;
          } else if (activeNodes[2].includes(nodeId)) {
            error = true;
          }
          var node = (
            <Node
              id={nodeId}
              level={parseInt(level)}
              index={j}
              key={nodeId}
              data={nodeObj.data}
              count={nodeObj.count}
              x={x}
              y={y}
              prevX={prevX}
              prevY={prevY}
              appear={appear}
              look={look}
              error={error}
              compare={compare}
              color={nodeObj.color}
            />
          );
          nodes.push(node);
          prevNodes[nodeId] = { x: x, y: y };
        }
      }
    }

    var paths = [];
    var prevPaths = {};

    var pathMap = to.getPathMap();
    var prevPathMap = from.getPathMap();
    var pathIds = Object.getOwnPropertyNames(pathMap);
    // Create paths.
    for (var i = 0; i < pathIds.length; i++) {
      var path = pathMap[pathIds[i]];

      var fromNode = to.getNode(path.from);
      var toNode = to.getNode(path.to);
      var pathId = fromNode.id + toNode.id;

      var fromX = prevNodes[fromNode.id].x;
      var fromY = prevNodes[fromNode.id].y;
      var toX = prevNodes[toNode.id].x;
      var toY = prevNodes[toNode.id].y;
      var prevFromX = 0;
      var prevFromY = 0;
      var prevToX = 0;
      var prevToY = 0;
      var appear = true;

      var prevPath = this.state.prevPaths[pathId];

      if (typeof prevPath !== "undefined") {
        prevFromX = prevPath.fromX;
        prevFromY = prevPath.fromY;
        prevToX = prevPath.toX;
        prevToX = prevPath.toY;
        appear = false;
      }

      console.log(path.id);

      var path = (
        <Path
          id={path.id}
          key={path.id}
          fromX={fromX}
          fromY={fromY}
          toX={toX}
          toY={toY}
          prevFromX={prevFromX}
          prevFromY={prevFromY}
          prevToX={prevToX}
          prevToY={prevToY}
          appear={appear}
        />
      );

      paths.push(path);
      prevPaths[pathId] = {
        fromX: fromX,
        fromY: fromY,
        toX: toX,
        toY: toY,
      };
    }

    this.setState({
      nodes: nodes,
      prevNodes: prevNodes,
      paths: paths,
      prevPaths: prevPaths,
    });
  }

  renderContent() {
    return (
      <div className="compTree">
        <TransitionGroup>
          {this.state.paths}
          {this.state.nodes}
        </TransitionGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="treeContainer" ref={(el) => (this.container = el)}>
        {this.state.dimensions && this.renderContent()}
      </div>
    );
  }
}

compTree.propTypes = {
  snapshots: PropTypes.array,
  taskId: PropTypes.number,
  tree: PropTypes.object,
  activeNodes: PropTypes.array,
};

export default compTree;
