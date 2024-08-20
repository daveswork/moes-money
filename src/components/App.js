import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './App.css';
import NavBar from './NavBar';


function App() {


  // Category states and functions

  const [categoryList, setCategoryList] = useState([])
  useEffect(()=>{
    fetch("http://localhost:4000/categories")
    .then(response => response.json())
    .then(categories => {
      setCategoryList(categories)
      console.log("Initial set Category list ", categoryList)
    })
  
  }, [])

  function updateCategory(newCategory){
    console.log(newCategory)
    console.log([...categoryList, newCategory])
    setCategoryList([...categoryList, newCategory])
  }


  // All income states and functions

  const [incomeSourceList, setIncomeSourceList] = useState([])
  useEffect(()=>{
    fetch("http://localhost:4000/income")
    .then(response => response.json())
    .then(income => {
      setIncomeSourceList([...income])
    })
  }, [])
  function updateIncome(newIncome){
    setIncomeSourceList([...incomeSourceList, newIncome])
  }



  // All expense states and functions
  const [activeExpenseList, setActiveExpenseList] = useState([])
  useEffect(()=>{
    fetch("http://localhost:4000/expenditures")
    .then(response => response.json())
    .then(expenses => {
      setActiveExpenseList([...expenses])
    })
  }, [])

  function updateExpense(newExpense){
    setActiveExpenseList([...activeExpenseList, newExpense])
  }

  function removeExpense(expenseId){
    const prunedExpenseList = activeExpenseList.filter(expense => {
      if(expense.id === expenseId){
        return false
      } else {
        return true
      }
    })
    setActiveExpenseList(prunedExpenseList)
  }

  return (
    
    <div>
      <header>
        <NavBar />
      </header>
      <Outlet context={{
        categoryList:categoryList, setCategoryList:setCategoryList, updateCategory: updateCategory,
        incomeSourceList:incomeSourceList, setIncomeSourceList:setIncomeSourceList, updateIncome: updateIncome,
        expenditureList:activeExpenseList, setExpenditureList:setActiveExpenseList, updateExpense: updateExpense, removeExpense:removeExpense
        }}/>
    </div>
  );
}

export default App;
