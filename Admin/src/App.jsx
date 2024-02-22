import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import Admin from './Pages/Admin/Admin'

function App() {

  return (
   
    <div>

      <Navbar />
      <Admin/>
    </div>
  )
}

export default App
