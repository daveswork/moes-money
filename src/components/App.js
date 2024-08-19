import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './App.css';
import NavBar from './NavBar';


function App() {

  const [categoryList, setCategoryList] = useState([])

  useEffect(()=>{
    fetch("http://localhost:4000/categories")
    .then(response => response.json())
    .then(categories => {
      console.log("these are the categories", categories)
      setCategoryList([...categories])
    })
  }, [])

  console.log(categoryList)
  return (
    
    <div>
      <header>
        <NavBar />
      </header>
      <Outlet context={{categoryList:categoryList}}/>
    </div>
  );
}

export default App;
