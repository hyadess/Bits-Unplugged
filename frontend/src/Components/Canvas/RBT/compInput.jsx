import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './compInput.scss';

class compInput extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            text: null
        }
    }

    handleChange(event) {
        this.setState({ text: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.text != null) {
            this.props.onInput(this.state.text);
        }
    }

    render() {
        return (
            <div className='inputContainer'>
                <input type="number"
                    className='inputField'
                    placeholder={this.props.placeHolder}
                    onChange={this.handleChange} />
                <button className='inputButton'
                    onClick={this.handleSubmit}>
                    Ok
                </button>
            </div>

        )
    }

}

compInput.propTypes = {
    placeHolder: PropTypes.string,
    onInput: PropTypes.func
}

export default compInput;