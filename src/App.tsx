import React from 'react';
import Home from './pages/home';
import SignUp from './pages/signup';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <SignUp />
      </UserProvider>
    </div>
  );
}

export default App;
