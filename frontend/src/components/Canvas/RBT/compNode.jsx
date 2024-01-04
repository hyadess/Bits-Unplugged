import React, { Component } from "react";
import PropTypes from "prop-types";

import { TweenMax } from "gsap";

import "./compNode.scss";

const SLOT_SIZE = 70;

class compNode extends Component {
  static get SIZE() {
    return 50;
  }
  static get RED() {
    return "#f45a67";
  }
  static get BLACK() {
    return "#332425";
  }

  constructor(props) {
    super(props);
    this.color = compNode.RED;
  }

  get idTextColor() {
    return "";
  }

  get dataTextColor() {
    return "";
  }

  componentDidUpdate(prevProps, prevState) {
    const el = this.container;
    const halfSize = compNode.SIZE / 2;
    var prevLeft = this.props.prevX - halfSize;
    var prevTop = this.props.prevY - halfSize;
    var left = this.props.x - halfSize;
    var top = this.props.y - halfSize;
    TweenMax.fromTo(el, 0.3, { x: prevLeft, y: prevTop }, { x: left, y: top });
  }

  componentDidMount() {
    const el = this.container;
    const halfSize = compNode.SIZE / 2;
    var left = this.props.x - halfSize;
    var top = this.props.y - halfSize;
    TweenMax.fromTo(
      el,
      0.3,
      { x: left, y: top, width: 0, height: 0 },
      { x: left, y: top, width: compNode.SIZE, height: compNode.SIZE }
    );
  }

  render() {
    var styles = {
      position: "absolute",
      // left: left + 'px',
      // top: top + 'px',
      width: compNode.SIZE,
      height: compNode.SIZE,
      backgroundColor: this.props.color,
      zIndex: 99,
    };

    if (this.props.look) {
      styles.border = "10px solid green";
    } else if (this.props.compare) {
      styles.border = "10px solid blue";
    } else if (this.props.error) {
      styles.border = "10px solid coral";
    }

    return (
      <div
        className="compNode"
        ref={(c) => (this.container = c)}
        style={styles}
      >
        <div className="nodeDataContainer">
          <div className="nodeData">{this.props.data}</div>
          <div className="nodeCount">count: {this.props.count}</div>
        </div>
      </div>
    );
  }
}

compNode.propTypes = {
  id: PropTypes.string,
  level: PropTypes.number,
  index: PropTypes.number,
  treeDepth: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
  prevX: PropTypes.number,
  prevY: PropTypes.number,
  look: PropTypes.bool,
  error: PropTypes.bool,
  compare: PropTypes.bool,
};

export default compNode;
