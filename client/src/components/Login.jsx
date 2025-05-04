import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getLoginUrl } from '../services/spotify';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  background-color: #121212;
  color: white;
  padding: 20px;
`;

const Title = styled.h1`
  color: #1DB954;
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
  max-width: 600px;
`;

const LoginButton = styled.a`
  background-color: #1DB954;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 30px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1ed760;
  }
`;

const ErrorMessage = styled.div`
  color: #ff5252;
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ff5252;
  border-radius: 5px;
  max-width: 600px;
  display: ${props => props.show ? 'block' : 'none'};
`;

const Login = () => {
  const [loginUrl, setLoginUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLoginUrl = async () => {
      try {
        const url = await getLoginUrl();
        setLoginUrl(url);
      } catch (error) {
        setError('Unable to connect to the server. Please make sure the server is running on http://localhost:5000');
      }
    };

    fetchLoginUrl();
  }, []);

  return (
    <LoginContainer>
      <Title>Spotify Stats</Title>
      <Description>Discover your top artists, tracks, and more with this app.</Description>
      {loginUrl && <LoginButton href={loginUrl}>Login with Spotify</LoginButton>}
      <ErrorMessage show={error !== ''}>
        {error}
      </ErrorMessage>
    </LoginContainer>
  );
};

export default Login; 