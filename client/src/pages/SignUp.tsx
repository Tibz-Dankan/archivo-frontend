import React, { Fragment, useRef } from "react";
import { gql, useMutation } from "@apollo/client";

const CREATE_USER = gql`
  mutation createUser($name: String!, $email: String!, $password: String!) {
    signUp(name: $name, email: $email, password: $password)
  }
`;

export const SignUp: React.FC = (): JSX.Element => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [signUp, { loading, data, error }] = useMutation(CREATE_USER, {
    onCompleted: ({ response }) => {
      console.log(response);
      // set token in global context and local storage
    },
  });

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
