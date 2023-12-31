import React, { useState, useContext } from 'react';
import { UserContext } from '../Authentication/UserContext';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  font-size: 18px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #800080;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 20px;
`;

function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { login, register } = useContext(UserContext);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegistering) {
      // Handle registration
      await register(firstName, lastName, email, username, password); 
      // Clear the fields after registration
      setFirstName('');
      setLastName('');
      setEmail('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
    } else {
      // Handle login
      await login(username, password); // Use username and password to login
      // Redirect to home page after successful login
      navigate('/');
    }
  };


  return (
    <Form onSubmit={handleSubmit}>
      <h1>{isRegistering ? 'Register Your Details' : 'Login Your Details'}</h1>
      {isRegistering && (
        <>
          <Input 
            type="text" 
            placeholder="First Name" 
            value={firstName} 
            onChange={e => setFirstName(e.target.value)} 
          />
          <Input 
            type="text" 
            placeholder="Last Name" 
            value={lastName} 
            onChange={e => setLastName(e.target.value)} 
          />
          <Input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
          />
        </>
      )}
       <Input 
        type="text" // Change from email to text
        placeholder="Username" // Change placeholder
        value={username} // Change value
        onChange={e => setUsername(e.target.value)} // Change handler
      />
      <Input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
      />
      {isRegistering && (
        <Input 
          type="password" 
          placeholder="Confirm Password" 
          value={confirmPassword} 
          onChange={e => setConfirmPassword(e.target.value)} 
        />
      )}
      <SubmitButton type="submit">{isRegistering ? 'Register' : 'Login'}</SubmitButton>
      <p onClick={() => setIsRegistering(prevState => !prevState)}>
        {isRegistering ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
      </p>
    </Form>
  );
}

export default LoginPage;
