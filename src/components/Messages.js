import React, { useContext, useEffect, useRef } from 'react';
import { Context } from '../context';

const Message = (props) => {
  if (props.msgType == 'system') {
    return (
      <div className="one-message system-message">
        {props.msgUser} {props.action == 'login' ? 'Entered the chat room' : 'Leaving the chat room'}
         <span className="time">&nbsp;{props.time}</span>
      </div>
    );
  } else {
    return (
      <div className={props.isMe ? 'me one-message' : 'other one-message'}>
        <p className="time">
          <span>{props.msgUser}</span> {props.time}
        </p>
        <div className="message-content">{props.action}</div>
      </div>
    );
  }
};

const Messages = (props) => {
  const messageList = useRef(null);

  // Use state in context instead of props
  const { state } = useContext(Context);

 
  // Use use effect instead of componentDidUpdate
  useEffect(() => {
    window.scrollTo(0, messageList.current.clientHeight + 50);
  });
  const { uid, messages } = state;
  return (
    <div className="messages" ref={messageList}>
      {messages.map((message) => (
        <Message key={message.msgId} msgType={message.type} msgUser={message.username} action={message.action} isMe={uid == message.uid ? true : false} time={message.time} />
      ))}
    </div>
  );
};

export default Messages;
