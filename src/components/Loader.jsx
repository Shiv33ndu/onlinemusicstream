import React from 'react'
import Container from './Container'

function Loader() {
  return (
    <Container>
    <div className="w-full h-[550px] flex flex-col justify-center items-center">
    <div className="loader"></div>
    <h1 className="font-semibold text-white text-4xl">Loading......</h1>
  </div>
  </Container>
  )
}

export default Loader