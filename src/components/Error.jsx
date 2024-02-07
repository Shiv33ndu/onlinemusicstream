import React from 'react';
import Container from './Container';

const Error = () => (
  <Container>
    <div className="w-full h-[550px] flex justify-center items-center">
    <h1 className="font-semibold text-4xl text-white">Something went wrong! Please try again 😕</h1>
  </div>
  </Container>
);

export default Error;