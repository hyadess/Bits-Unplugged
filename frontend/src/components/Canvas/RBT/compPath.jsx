import React, { Component } from "react";
import PropTypes from "prop-types";
import { Line } from "react-lineto";

import { TweenMax } from "gsap";

//import './Styles/Node.css';

class compPath extends Component {
  componentDidUpdate(prevProps, prevState) {
    const el = this.container;
    TweenMax.fromTo(
      el,
      0.3,
      {
        x0: this.props.prevFromX,
        y0: this.props.prevFromY,
        x1: this.props.prevToX,
        y1: this.props.prevToY,
      },

      {
        x0: this.props.fromX,
        y0: this.props.fromY,
        x1: this.props.toX,
        y1: this.props.toY,
      }
    );
  }

  componentDidMount() {
    const el = this.container;

    TweenMax.fromTo(
      el,
      0.3,
      {
        x0: this.props.fromX,
        y0: this.props.fromY,
        x1: this.props.toX,
        y1: this.props.toY,
        opacity: 0,
      },

      {
        x0: this.props.fromX,
        y0: this.props.fromY,
        x1: this.props.toX,
        y1: this.props.toY,
        opacity: 1,
      }
    );
  }

  render() {
    var styles = {
      //   position: "absolute",
      stroke: "#000000",
      zIndex: 0,
    };

    const paddingX = 255;
    const paddingY = 405; //405

    return (
      <Line
        x0={this.props.fromX + paddingX}
        y0={this.props.fromY + paddingY}
        x1={this.props.toX + paddingX}
        y1={this.props.toY + paddingY}
        borderColor={"grey"}
        borderWidth={3}
        ref={(c) => (this.container = c)}
        className="compPath"
        style={styles}
      />
    );
  }
}

export default compPath;
