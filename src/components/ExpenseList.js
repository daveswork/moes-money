import ExpenseForm from "./ExpensesForm"
import CashFlowItem from "./CashFlowItem"
import Category from "./Category"
import { useOutletContext } from "react-router-dom"
import { useState } from "react"

function ExpenseList(){

  const {categoryList, expenditureList, updateExpense, removeExpense} = useOutletContext()

  const expensesListElements = expenditureList.map((expense, index) =>{
    return (
    <CashFlowItem key={index} cashEntry={expense} categoryList={categoryList} removeExpense={removeExpense}/>
  )

  })

  return(
    <div>
        <h1>ExpenseList</h1>
        <br/>
        <ExpenseForm categoryList={categoryList} updateExpense={updateExpense}/>
        <br/>
        <div className="grid">
        {expensesListElements}
        </div>
    </div>
  )
}

export default ExpenseList