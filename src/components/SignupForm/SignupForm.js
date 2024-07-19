import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { signupAsync, googleSignInAsync } from '../../store/slices/userSlice';

const SignupForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = formData;

  const onChange = e => {
    console.log('Form input changed:', e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    console.log('Signup form submitted:', formData);
    try {
      await dispatch(signupAsync(formData)).unwrap();
      console.log('Signup successful');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log('Google login success:', tokenResponse);
      try {
        const result = await dispatch(googleSignInAsync(tokenResponse.access_token)).unwrap();
        console.log('Google sign-in successful', result);
      } catch (error) {
        console.error('Google sign-in failed:', error);
      }
    },
    onError: error => console.error('Google Sign-In Error:', error),
    flow: 'implicit'
  });

  
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" name="name" value={name} onChange={onChange} placeholder="Name" required />
        <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
        <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
        <button type="submit">Sign Up</button>
      </form>
      <button onClick={() => googleLogin()}>Sign up with Google</button>
    </div>
  );
};

export default SignupForm;