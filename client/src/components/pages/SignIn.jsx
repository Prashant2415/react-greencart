import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../../utils/userUtils';
import { useDispatch, useSelector } from 'react-redux';
import { updateToken, userDetails } from '../../redux/slice/userSlice';

const SignIn = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userReducer.user);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const validateError = (value) => {
    const newError = {};
    if (!value.email.trim()) newError.email = "Email field is required";
    if (!value.password.trim()) newError.password = "Password field is required";
    return newError;
  };

  const validateUser = (inputData, userState) => {
    const users = userState || [];
    return users.find(item => item.email.toLowerCase() === inputData.email.toLowerCase());
  }


  const generateToken = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2)}`;
  };

  const handleForm = async(e)=>{
    e.preventDefault();
    const errorValue = validateError(input);
    setError(errorValue);
    if(Object.keys(errorValue).length === 0)
    {
      const existingUser = await validateUser(input, userData);
      console.log("eu",existingUser);
      if(existingUser)
      {
        const token = await generateToken();
        dispatch(updateToken(token));
        navigate("/greencart");
      }
      else
      {
        setError({ general: "Invalid email or password" });
      }
    }
  }

  return (
    <div className="page page-section">
      <div className="form-main-container margin">
        <div className="form-container">
          <h2 className="form-title">Sign In</h2>
          <form onSubmit={handleForm} className="sign-form">
            <label>Email</label>
            <input type="email" value={input.email} name="email" onChange={handleInput} />
            {error.email && <div className="error-text">{error.email}</div>}

            <label>Password</label>
            <input type="password" value={input.password} name="password" onChange={handleInput} />
            {error.password && <div className="error-text">{error.password}</div>}

            <button type="submit" className="form-button">Sign In</button>
            <div className="extra">
              <p>If you does not have an account? <Link className='extra-link' to="/signup">Sign Up</Link></p>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default SignIn
