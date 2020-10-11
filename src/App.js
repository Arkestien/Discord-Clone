import React, { useEffect } from 'react';
import './App.css';
import Sidebar from './features/Sidebar';
import Chat from './features/Chat';
import { selectUser } from './features/userSlice'
import { useSelector, useDispatch } from 'react-redux';
import Login from './Login.js';
import { auth } from './firebase'
import { login, logout } from './features/userSlice'

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        }))
      } else {
        dispatch(logout())
      }
    })
  }, [dispatch])
  return (
    <div className="app">
      {user ? (
        <React.Fragment>
          <Sidebar />
          <Chat />
        </React.Fragment>
      ) :
        (
          <Login />
        )}

    </div>
  );
}

export default App;
