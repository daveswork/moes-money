import ExpenseForm from "./ExpensesForm"
import ExpenseCashFlowItem from "./ExpenseCashFlowItem"
import { useOutletContext } from "react-router-dom"
import { useState } from "react"


function ExpenseList(){

  const {categoryList, expenditureList, updateExpenseList, removeExpense, updateExpense} = useOutletContext()

  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
})

  const [expenseFilter, setExpenseFilter] = useState("All")

  const filteredExpenses = expenditureList.filter((expense =>{
    if(expenseFilter === "All"){
      return true
    } else {
      return expense.category === expenseFilter
    }
  }))

  function handleCategoryChange(event){
    setExpenseFilter(event.target.value)
  }

  const categoryFilterOptions = categoryList.map((category, index) => {
    return <option key={index}>{category.categoryName}</option>
  })


  const initialValue = 0

  const totalExpenses = filteredExpenses.reduce((total, expense) => total + Number(expense.amount), initialValue)

  const expensesListElements = filteredExpenses.map((expense, index) =>{

    const background = index%2===0?"lightRedColor":"lightOrangeColor"

    return (
      
    <ExpenseCashFlowItem key={index} cashEntry={expense} categoryList={categoryList} removeExpense={removeExpense} updateExpense={updateExpense} backgroundClass={background}/>
    
  )

  })

  return(
    <div className="list">
        <h1>Expense List</h1>
        <br/>
        <h3>Filter by category</h3>
        <select onChange={handleCategoryChange}>
          <option>All</option>
          {categoryFilterOptions}
        </select>
        <br/>
        <h2>{expenseFilter} Expenses: {USDollar.format(totalExpenses)}</h2>
        <br/>
        <h3>Add new expense:</h3>
        <ExpenseForm categoryList={categoryList} updateExpenseList={updateExpenseList}/>
        <br/>
        <div className="grid">
          <h3>Current expenses:</h3>
          <table>
            <tbody>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Notes</th>
              <th>Amount</th>
            </tr>
        {expensesListElements}
        </tbody>
        </table>
        </div>
    </div>
  )
}

export default ExpenseList