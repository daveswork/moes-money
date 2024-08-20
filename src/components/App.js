import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './App.css';
import NavBar from './NavBar';
import Summary from './Summary';


function App() {

  //==============================================================================================
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

  //==============================================================================================
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


  //==============================================================================================
  // All expense states and functions

  // Set expense state
  const [activeExpenseList, setActiveExpenseList] = useState([])

  // Load data from db
  useEffect(()=>{
    fetch("http://localhost:4000/expenditures")
    .then(response => response.json())
    .then(expenses => {
      setActiveExpenseList([...expenses])
    })
  }, [])

  // Adding a new expense item
  function updateExpenseList(newExpense){
    setActiveExpenseList([...activeExpenseList, newExpense])
  }

  // Removing an existing expense item
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

  function updateExpense(id, editExpenseItem){
    fetch(`http://localhost:4000/expenditures/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(editExpenseItem)
    })
    .then(response => response.json())
    .then(updatedExpense => setActiveExpenseList( expenses => expenses.map( expense =>{
      if(updatedExpense.id === expense.id){
        return updatedExpense
      } else{
        return expense
      }
    }

    )

    )

    )

  }



  return (
    
    <div>
      <header>
        <NavBar />
      </header>
      
      <Outlet context={{
        categoryList:categoryList, setCategoryList:setCategoryList, updateCategory: updateCategory,
        incomeSourceList:incomeSourceList, setIncomeSourceList:setIncomeSourceList, updateIncome: updateIncome,
        expenditureList:activeExpenseList, setExpenditureList:setActiveExpenseList, updateExpenseList: updateExpenseList, removeExpense:removeExpense, updateExpense:updateExpense
        }}/>
        
    </div>
  );
}

export default App;
