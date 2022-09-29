import React from 'react'

const Page404 = () => {

  const removeToken = () => { 
    window.location = "/"
  }

  return(
  <div className="ed-grid mt-8">
    <h1>404 Not found</h1>
    <span onClick={() => removeToken()}>Regresar</span>
  </div>
  )
}

export default Page404
