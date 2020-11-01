import React from 'react';
import '../App.css';
import { useState } from 'react';

function AuthView() {

  const [signin, setSignin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (event) => {
    event.preventDefault();
    console.log(email + " " + password)
  }

  const handleSignUp = () => {
    console.log(email + " " + password)
  }

  return (
  <>
      <form onSubmit={handleSignIn}>
        <label htmlFor="email" />
        <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password" />
        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Sign In</button>
      </form>
  </>
)

}

export default AuthView;