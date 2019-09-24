import React, { Component } from 'react';

export default class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: props.socket,
      message: '',
      myId: props.myId,
      myName: props.myName
    };
  }

  
  // Monitor input changes
  handleChange(e) {
    this.setState({ message: e.target.value });
  }

  
  // enter submit
  handleClick(e) {
    e.preventDefault();
    this.sendMessage();
  }
  handleKeyPress(e) {
    if (e.key == 'Enter') {
      this.sendMessage();
    }
    return false;
  }

  // Send chat information
  sendMessage(e) {
    const message = this.state.message;
    const socket = this.state.socket;
    if (message) {
      const obj = {
        uid: this.state.myId,
        username: this.state.myName,
        message: message
      };
      socket.emit('message', obj);
      this.setState({ message: '' });
    }
    return false;
  }
  render() {
    return (
      <div className="bottom-area">
        <div className="input-box">
          <div className="input">
            <input type="text" maxLength="140" placeholder="Start Chatting" value={this.state.message} onKeyPress={this.handleKeyPress.bind(this)} onChange={this.handleChange.bind(this)} />
          </div>
          <div className="button">
            <button type="button" onClick={this.handleClick.bind(this)}>
            submit
            </button>
          </div>
        </div>
      </div>

    );
  }
}
