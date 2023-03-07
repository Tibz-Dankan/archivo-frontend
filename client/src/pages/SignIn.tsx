import React, { Fragment } from "react";

export const SignIn: React.FC = (): JSX.Element => {
  const name: String = "Dankan";
  return (
    <Fragment>
      <div>
        <form>
          <input type="email" placeholder="Enter Email" />
          <input type="password" placeholder="Enter Password" />
          <button>SignIn</button>
        </form>
      </div>
    </Fragment>
  );
};
