import React, { useState } from 'react';
import { Home, SignIn, SignUp } from './views';
import { UserContext } from './contexts';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  const [user, setUser] = useState();

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
          <Routes>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/' element={<SignIn />}></Route>
            <Route path='/signin' element={<SignIn />}></Route>
            <Route path='/signup' element={<SignUp />}></Route>
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
