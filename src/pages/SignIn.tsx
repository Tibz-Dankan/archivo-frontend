import React, { Fragment, useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { Auth } from "../store/reducers/auth";
import { authenticate } from "../store/actions/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        name
        email
        imageUrl
      }
      token
      expiresIn
      expirationTime
    }
  }
`;

export const SignIn: React.FC = (): JSX.Element => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const [logIn, { loading, data, error }] = useMutation(LOGIN);

  const authenticateHandler = async (auth: Auth) => {
    localStorage.setItem("auth", JSON.stringify(auth));
    await dispatch(authenticate(auth));
    navigate("/my-folders", { replace: true });
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) return;

    logIn({
      variables: {
        email: email,
        password: password,
      },
    });
    if (data) {
      authenticateHandler(data.login);
    }
  };
  return (
    <Fragment>
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>{error.message}</p>}
        <form onSubmit={(event) => submitHandler(event)}>
          <input
            type="email"
            ref={emailRef}
            placeholder="Enter email"
            required
          />
          <input
            type="password"
            ref={passwordRef}
            placeholder="Enter password"
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </Fragment>
  );
};
