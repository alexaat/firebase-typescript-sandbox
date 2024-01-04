import Home from './pages/home';
import SignUp from './pages/signup';
import { UserProvider } from './context/UserContext';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import SignIn from './pages/signin/SignIn';
import Root from './layouts/Root';
import { ProvideUser } from './context/UserContext';
import Error from './pages/error';
import Loading from './pages/loading/Loading';


function App() {

  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route>
  //       <Route element={<Root />}>
  //         <Route path="/home" element={<Home />} />
  //       </Route>
  //       <Route path="/signup" element={<SignUp />} />
  //       <Route index element={<SignIn />} />
  //     </Route>
  //   )
  // );

  const user = ProvideUser();

  const routes = user === undefined ?
      [
        {   
          path: '*',
          element: <Loading/>

        }
      ] : user === null ?
      [
        {   
          path: '/',
          element: <SignIn/>       
        },
        {   
            path: 'signup',
            element: <SignUp/>       
        },
        {   
          path: 'signin',
          element: <SignIn/>       
        },
        {
          path: '*',
          element: <Error/>
        }
      ] :
      [
        {   
          path: '/',
          element: <Home/>       
        },
        {   
            path: 'signup',
            element: <SignUp/>       
        },
        {   
          path: 'signin',
          element: <SignIn/>       
        },
        {
          path: '*',
          element: <Error/>
        }
      ]

  const router = createBrowserRouter(routes);


/*******************
  const auth = ProvideUser();

  const loggedOff = [
    {
      path: 'signup',
      element: <SignUp/>      
    },
    {
      path: '/',
      element: <SignIn/>,
      errorElement: <Error />
    }

  ];

  const loggedIn = [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />         
        },
        {
          path: "home",
          element: <Home />         
        }
      ]
    },
    {
      path: 'signup',
      element: <SignUp/>
    },
    {
      path: 'signin',
      element: <SignIn/>
    }
  ]

  let currentRoute = undefined;

  if(auth !== null && auth.currentUser){
    currentRoute = loggedIn;
  }else{
    currentRoute = loggedOff;
  }

  const router = createBrowserRouter(currentRoute);
********************/
  return (
    <div className="App">     
        <RouterProvider router={router} />      
    </div>
  );
  
}

export default App;
