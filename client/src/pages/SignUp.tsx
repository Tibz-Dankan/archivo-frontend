import React, { Fragment, useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { useAuth, useAuthenticate } from "../context/Auth";

const SIGNUP = gql`
  mutation ($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
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

export const SignUp: React.FC = (): JSX.Element => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const auth = useAuth();
  const authenticate = useAuthenticate(auth);

  const [signUp, { loading, data, error }] = useMutation(SIGNUP);

  const authenticateHandler = (data: any) => {
    authenticate({
      user: data.signup.user,
      token: data.signup.token,
      expiresIn: data.signup.expiresIn,
      expirationTime: data.signup.expirationTime,
      isLoggedIn: !!data.signup.token,
    });
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!name || !email || !password) return;

    signUp({
      variables: {
        name: name,
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
            type="text"
            ref={nameRef}
            placeholder="Enter username"
            required
          />
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
