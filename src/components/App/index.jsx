import React from "react";
import Main from '../../pages/Main';
import Login from '../../pages/Login';
import useToken from './useToken';


function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }
  
  return (
      <Main setToken={setToken}/>
  )
}

export default App;
