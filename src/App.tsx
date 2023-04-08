import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navigate } from "react-router-dom";
// import "./App.css";
import { Home } from "./pages/Home";
import { MyFolders } from "./pages/MyFolders";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { Auth, useAuth, useAuthenticate } from "./context/Auth";
import { Folder } from "./components/UI/Folder";

const App: React.FC = (): JSX.Element => {
  const auth: Auth = useAuth();
  const isLoggedIn: boolean = auth.isLoggedIn;
  const authenticate = useAuthenticate(auth);

  useEffect(() => {
    const tryLogin = () => {
      const data: any = localStorage.getItem("auth");
      const parsedData: Auth = JSON.parse(data);
      console.log(parsedData);

      if (!parsedData) {
        localStorage.clear();
        return <Navigate to="/" />;
      }

      const { user, token, expiresIn, expirationTime, isLoggedIn } = parsedData;
      if (!user || !token) {
        localStorage.clear();
        return <Navigate to="/" />;
      }

      const expiryTime = new Date(expirationTime);
      const currentTime = new Date(Date.now());
      const isExpired: boolean = expiryTime < currentTime;

      if (isExpired) {
        localStorage.clear();
        return <Navigate to="/" />;
      }

      authenticate({
        user: user,
        token: token,
        expiresIn: expiresIn,
        expirationTime: expirationTime,
        isLoggedIn: isLoggedIn,
      });
    };
    tryLogin();
  }, []);

  const nonAuthRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/login",
      element: <Navigate to="/signin" />,
    },
    {
      path: "/register",
      element: <Navigate to="/signup" />,
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);

  const authRouter = createBrowserRouter([
    {
      path: "/my-folders",
      element: <MyFolders />,
    },
    {
      path: "/my-folder-idx",
      element: <Folder />,
    },
    {
      path: "*",
      element: <Navigate to="/my-folders" />,
    },
  ]);

  return (
    <div className="App">
      {!isLoggedIn && <RouterProvider router={nonAuthRouter} />}
      {isLoggedIn && <RouterProvider router={authRouter} />}
    </div>
  );
};

export default App;
