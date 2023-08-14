import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateAccount } from "./features/createAccount/CreateAccount";
import React from "react";
import { Signup } from "./features/signup/Signup";

export const Router = () => {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "create-account",
          element: <CreateAccount />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
      ])}
    />
  );
};
