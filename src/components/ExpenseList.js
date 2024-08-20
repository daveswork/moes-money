import ExpenseForm from "./ExpensesForm"
import CashFlowItem from "./CashFlowItem"
import Category from "./Category"
import { useOutletContext } from "react-router-dom"
import { useState } from "react"

function ExpenseList(){

  const {categoryList, expenditureList, updateExpenseList, removeExpense, updateExpense} = useOutletContext()

  const expensesListElements = expenditureList.map((expense, index) =>{
    return (
    <CashFlowItem key={index} cashEntry={expense} categoryList={categoryList} removeExpense={removeExpense} updateExpense={updateExpense}/>
  )

  })

  return(
    <div>
        <h1>ExpenseList</h1>
        <br/>
        <ExpenseForm categoryList={categoryList} updateExpenseList={updateExpenseList}/>
        <br/>
        <div className="grid">
          <table>
        {expensesListElements}
        </table>
        </div>
    </div>
  )
}

export default ExpenseList