import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { authenticateWithCode } from '../services/spotify';

const CallbackContainer = styled.div`
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

const Title = styled.h2`
  color: #1DB954;
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
  max-width: 600px;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #1DB954;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  color: #ff5252;
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ff5252;
  border-radius: 5px;
  max-width: 600px;
`;

const Callback = () => {
  const [status, setStatus] = useState('Loading...');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get('code');
      const error = searchParams.get('error');

      if (error) {
        setError(`Authentication failed: ${error}`);
        setStatus('Error');
        return;
      }

      if (!code) {
        setError('No authorization code provided');
        setStatus('Error');
        return;
      }

      try {
        await authenticateWithCode(code);
        setStatus('Success! Redirecting to dashboard...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } catch (err) {
        setError('Failed to authenticate with Spotify. Please try again.');
        setStatus('Error');
      }
    };

    handleCallback();
  }, [location, navigate]);

  return (
    <CallbackContainer>
      <Title>Spotify Authentication</Title>
      {status === 'Loading...' ? (
        <>
          <Spinner />
          <Message>{status}</Message>
        </>
      ) : status.includes('Success') ? (
        <Message>{status}</Message>
      ) : (
        <ErrorMessage>{error}</ErrorMessage>
      )}
    </CallbackContainer>
  );
};

export default Callback; 