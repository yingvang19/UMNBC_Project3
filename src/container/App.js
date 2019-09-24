import React, { useContext, useState } from 'react';
import ChatRoom from '../components/ChatRoom';
import '../style/index.scss';
import { Context } from '../context';

const userState = (username) => {
  const [user, setUsername] = useState(username);
  return [user, setUsername];
}

const generateUid = () => {
  return new Date().getTime() + '' + Math.floor(Math.random() * 999 + 1);
};

const App = (props) => {
  // Get the data in the context
  const { state, dispatch } = useContext(Context);
  // Input and output user name
  const [user, setUsername] = userState();
  const handleLogin = () => {
    const uid = generateUid();
    const username = user ? user : `Visitor${uid}`;
    dispatch({ type: 'login', payload: { uid, username } });
    state.socket.emit('login', { uid, username });
  };
  const handleKeyPress = (e) => {
    if (e.key == 'Enter') {
      handleLogin();
    }
    return false;
  };
  return (
    <div>
      {state.uid ? (
        // Has logged
        <ChatRoom uid={state.uid} username={state.username} socket={state.socket} />
      ) : (
        // login interface

        <div className="login-box">
          <h2>TradeMe ChatRoom</h2>
          <div className="input">
            <input
              type="text"
              placeholder="Please Enter Username"
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="Submit">
            <button type="button" onClick={handleLogin}>
            submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
