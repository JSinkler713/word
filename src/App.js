import React, { useState, useEffect } from "react"
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import LetterBox from './LetterBox';



function App() {
  return (
      <Routes>
        <Route path="*" element={<Home />}>
      </Route>
    </Routes>
  )
}

export default App;
