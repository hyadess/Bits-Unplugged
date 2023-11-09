import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import left from './left.png';
import right from './right.png';

import './compControls.scss';

function NextArrow(props) {
    return (
        <img src={right}
            style={{ ...props.style, display: "block" }}
            onClick={() => {
                if (props.onClick != null) {
                    props.onClick();
                }
                props.onNext();
            }}
        />
    );
}

function PrevArrow(props) {
    return (
        <img src={left}
            style={{ ...props.style, display: "block" }}
            onClick={() => {
                if (props.onClick != null) {
                    props.onClick();
                }
                props.onPrev();
            }}
        />
    );
}

class compControls extends Component {

    constructor(props) {
        super(props);
        this.afterChangeHandler = this.afterChangeHandler.bind(this);
    }

    componentDidUpdate() {
        this.carousel.slickGoTo(this.props.active, true);
    }

    afterChangeHandler(currentSlide) {
        this.carousel.slickGoTo(this.props.active, true);
    }

    render() {
        var items = [];

        var settings = {
            dots: false,
            infinite: false,
            speed: 500,
            vertical: true,
            className: 'controls',
            arrows: true,
            nextArrow: <NextArrow onNext={this.props.onNext} />,
            prevArrow: <PrevArrow onPrev={this.props.onPrev} />,
            afterChange: this.afterChangeHandler,
        };

        this.props.data.map((item, i) => {
            items.push(
                <div
                    key={'ci' + i.toString()}>
                    {item}
                </div>)

        });

        return (
            <div>
                {<Slider ref={function (c) { this.carousel = c }.bind(this)}
                    {...settings}>
                    {items}
                </Slider>}
            </div>
        )
    }
}

compControls.propTypes = {
    active: PropTypes.number,
    data: PropTypes.array,
    onNext: PropTypes.func,
    onPrev: PropTypes.func
};

export default compControls;