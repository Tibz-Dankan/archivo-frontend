import React, { Fragment, useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { useAuth, useAuthenticate } from "../context/Auth";

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
  const auth = useAuth();
  const authenticate = useAuthenticate(auth);

  const [logIn, { loading, data, error }] = useMutation(LOGIN);

  const authenticateHandler = (data: any) => {
    authenticate({
      user: data.login.user,
      token: data.login.token,
      expiresIn: data.login.expiresIn,
      expirationTime: data.login.expirationTime,
      isLoggedIn: !!data.login.token,
    });
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
      authenticateHandler(data);
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
