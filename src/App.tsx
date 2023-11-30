import Home from './pages/home';
import SignUp from './pages/signup';
import { UserProvider } from './context/UserContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './pages/signin/SignIn';


function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
