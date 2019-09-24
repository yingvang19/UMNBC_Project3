import React, { useContext, useState } from 'react';
import Messages from './Messages';
import ChatInput from './ChatInput';
import { Context } from '../context';

// Generate message id
const generateMsgId = () => {
  return new Date().getTime() + '' + Math.floor(Math.random() * 899 + 100);
};

// Time format
const generateTime = () => {
  let hour = new Date().getHours();
  let minute = new Date().getMinutes();
  hour = hour == 0 ? '00' : hour;
  minute = minute < 10 ? '0' + minute : minute;
  return hour + ':' + minute;
};

const ChatRoom = (props) => {
  const { state, dispatch } = useContext(Context);
  const [init, setInit] = useState(false);
  // Update system message
  const updateSysMsg = (o, action) => {
    const newMsg = { type: 'system', username: o.user.username, uid: o.user.uid, action: action, msgId: generateMsgId(), time: generateTime() };
    dispatch({
      type: 'UPDATE_SYSTEM_MESSAGE',
      payload: {
        onlineCount: o.onlineCount,
        onlineUsers: o.onlineUsers,
        message: newMsg
      }
    });
  };

  // Send a new message

  const updateMsg = (obj) => {
    const newMsg = { type: 'chat', username: obj.username, uid: obj.uid, action: obj.message, msgId: generateMsgId(), time: generateTime() };
    dispatch({
      type: 'UPDATE_USER_MESSAGE',
      payload: {
        message: newMsg
      }
    });
  };
  // Listening for message transmission

  const ready = () => {
    const { socket } = props;
    setInit(true);
    socket.on('login', (o) => {
      updateSysMsg(o, 'login');
    });
    socket.on('logout', (o) => {
      updateSysMsg(o, 'logout');
    });
    socket.on('message', (obj) => {
      updateMsg(obj);
    });
  };
  if (!init) {
    ready();
  }
  const renderUserList = () => {
    const users = state.onlineUsers;
    let userhtml = '';
    let separator = '';
    for (const key in users) {
      if (users.hasOwnProperty(key)) {
        userhtml += separator + users[key];
        separator = ',';
      }
    }
    return userhtml
  }
  return (
    <div className="chat-room">
      <div className="welcome">
        <div className="room-action">
          <div className="room-name">TradeMe Chat Room | {props.username}</div>
          <div className="button">
            <button onClick={() => window.location.reload()}>Sign out</button>
          </div>
        </div>
      </div>
      <div className="room-status">
      online users: {state.onlineCount}, Online list: {renderUserList()}
      </div>
      <div>
        <Messages messages={state.messages} myId={props.uid} />
        <ChatInput myId={props.uid} myName={props.username} socket={props.socket} />
      </div>
    </div>
  );
};
export default ChatRoom;