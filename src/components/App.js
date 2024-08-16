import { Outlet } from 'react-router-dom';

import './App.css';
import NavBar from './NavBar';


function App() {
  return (
    
    <div>
      <header>
        <NavBar />
      </header>
      <Outlet />
    </div>
  );
}

export default App;
