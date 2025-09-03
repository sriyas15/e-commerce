import './App.css';
import Header from './Components/Header';
import HomePage from './Pages/HomePage';
import { Outlet } from 'react-router-dom';


function App() {
  return (
    <>
      <Header/>
      <Outlet/>   
    </>
  )
}

export default App
