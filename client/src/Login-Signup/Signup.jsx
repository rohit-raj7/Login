import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { assets } from './assets/assets.js';
import clientId from './GoogleOAuthProvider.js'; 

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };
const validatePassword = (password) => {
  // At least 6 characters, including a number
  const pattern = /^(?=.*\d).{6,}$/;
  return pattern.test(password);
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear old errors
    setEmailError('');
    setPasswordError('');

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        'Password must be 6+ chars'
      );
      return;
    }

    try { 
      const result = await axios.post('https://loginpage-ten-delta.vercel.app/signup', {
        name,
        email,
        password,
      });
      console.log('User registered:', result.data);
      navigate('/login');
    } catch (err) {
      if (err.response?.data?.message === 'User with this email already exists') {
        alert('Email already exists. Redirecting to login.');
        navigate('/login');
      } else {
        console.error('Error:', err.response?.data || err.message);
        alert('Registration failed. Please try again.');
      }
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    console.log("Google Sign In Success", credentialResponse);
    // TODO: Handle Google login/signup
     navigate('/dashboard');
  };

  const handleGoogleError = () => {
    console.log("Google Sign In Error");
  };

  const handleFacebookLogin = () => {
    alert('Facebook login clicked');
  };

  return (                       
    <GoogleOAuthProvider clientId={clientId}>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
        style={{ backgroundImage: `url(${assets.bg_img})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
        <div className="absolute w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-30 top-10 left-10 animate-pulse z-0"></div>
        <div className="absolute w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-30 bottom-10 right-10 animate-pulse z-0"></div>

        <div className="z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-cyan-300 text-center tracking-wide">Sign Up</h2>

          <form onSubmit={handleSubmit}>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter Name"
              className="w-full mb-4 px-4 py-2 rounded-lg bg-white/10 border border-gray-500 text-white placeholder-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={name}
              required
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter Email"
              className="w-full mb-1 px-4 py-2 rounded-lg bg-white/10 border border-gray-500 text-white placeholder-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={email}
              required
            />
            {emailError && <p className="text-red-400 text-sm mb-2">{emailError}</p>}

            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter Password"
              className="w-full mb-4 mt-3 px-4 py-2 rounded-lg bg-white/10 border border-gray-500 text-white placeholder-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={password}
              required
            />
            {passwordError && <p className="text-red-400 text-sm mb-4">{passwordError}</p>}

            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 rounded-lg transition duration-300"
            >
              Register
            </button>

            <p className="text-md text-center text-gray-200 mt-4">
              Already have an account?{' '}
              <Link to="/login" className="text-cyan-300 hover:underline">Login</Link>
            </p>
          </form>

          <div className="mt-6">
            <p className="text-center text-gray-100 mb-4">Or sign up with</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
               
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Signup;
