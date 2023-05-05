import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { Fragment } from "react";
import { Navigate } from "react-router-dom";
// import "./App.css";
import { Home } from "./pages/Home";
import { MyFolders } from "./pages/MyFolders";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { FolderContent } from "./pages/FolderContent";
import { SubFolderContent } from "./pages/SubFolderContent";
import { authenticate } from "./store/actions/auth";
import { Auth } from "./store/reducers/auth";
import { useDispatch, useSelector } from "react-redux";
import { FolderState } from "./store/reducers/folder";
import { removeFromPath } from "./store/actions/path";

const App: React.FC = (): JSX.Element => {
  const auth = useSelector((state: any) => state.auth);
  const isLoggedIn: boolean = auth.isLoggedIn;

  const parentFolder = useSelector(
    (state: FolderState) => state.folder.parentFolder
  );

  const dispatch: any = useDispatch();

  //useEffect execute on clicking browser back button
  useEffect(() => {
    const handlePopState = async () => {
      await dispatch(removeFromPath(parentFolder));
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [dispatch]);

  useEffect(() => {
    const tryLogin = async () => {
      const strAuthData: any = localStorage.getItem("auth");
      const parsedAuthData: Auth = JSON.parse(strAuthData);

      if (!parsedAuthData) {
        localStorage.clear();
        return <Navigate to="/" />;
      }

      const { user, token, expiresIn, expirationTime, isLoggedIn } =
        parsedAuthData;
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

      await dispatch(authenticate(parsedAuthData));
    };
    tryLogin();
  }, [dispatch]);

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
      path: "/my-folder-idx/:id",
      element: <FolderContent />,
    },
    {
      path: "/my-sub-folder-idx/:id",
      element: <SubFolderContent />,
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
