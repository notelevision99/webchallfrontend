import React from 'react'

export default class InputForm extends React.Component {
    
    render() {
        return <input
            className={this.props.className}
            type="text"
            placeholder={this.props.placeholder}
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange} />
    }
}
