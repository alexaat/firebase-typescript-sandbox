import Home from './pages/home';
import SignUp from './pages/signup';
import { UserProvider } from './context/UserContext';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import SignIn from './pages/signin/SignIn';
import Root from './layouts/Root';


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<Root />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route index element={<SignIn />} />
      </Route>
    )
  );

  return (
    <div className="App">
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </div>
  );
}

export default App;
