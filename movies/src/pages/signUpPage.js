import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import './SignUpPage.css';

const SignUpPage = props => {
  const context = useContext(AuthContext)
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);

  const register = () => {
    let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const validPassword = passwordRegEx.test(password);

    if (validPassword && password === passwordAgain) {
      context.register(userName, password);
      setRegistered(true);
    }
  }

  if (registered === true) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="signup-container">
      <h2 className="signup-heading">SignUp page</h2>
      <p className="signup-info">You must register a username and password to log in</p>
      <input value={userName} className="signup-input" placeholder="User Name" onChange={e => {
        setUserName(e.target.value);
      }}></input><br />
      <input value={password} className="signup-input" type="password" placeholder="Password" onChange={e => {
        setPassword(e.target.value);
      }}></input><br />
      <input value={passwordAgain} className="signup-input" type="password" placeholder="Password Again" onChange={e => {
        setPasswordAgain(e.target.value);
      }}></input><br />
      {/* Register web form */}
      <button className="signup-button" onClick={register}>Register</button>
    </div>
  );
};

export default SignUpPage;