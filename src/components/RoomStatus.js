import React, {Component} from 'react';

export default class RoomStatus extends Component {
  render() {
    return (<div className="room-status">online users: {this.props.onlineCount}, Online list: {this.props.userhtml}</div>);
  }
}
