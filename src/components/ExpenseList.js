import ExpenseForm from "./ExpensesForm"
import CashFlowItem from "./CashFlowItem"
import { useOutletContext } from "react-router-dom"


function ExpenseList(){

  const {categoryList, expenditureList, updateExpenseList, removeExpense, updateExpense} = useOutletContext()

  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
})

  const initialValue = 0

  const totalExpenses = expenditureList.reduce((total, expense) => total + Number(expense.amount), initialValue)

  const expensesListElements = expenditureList.map((expense, index) =>{

    const background = index%2===0?"lightRedColor":"lightOrangeColor"
    console.log(background)

    return (
    <CashFlowItem key={index} cashEntry={expense} categoryList={categoryList} removeExpense={removeExpense} updateExpense={updateExpense} backgroundClass={background}/>
  )

  })

  return(
    <div>
        <h1>ExpenseList</h1>
        <br/>
        <h2>Total expenses: {USDollar.format(totalExpenses)}</h2>
        <br/>
        <ExpenseForm categoryList={categoryList} updateExpenseList={updateExpenseList}/>
        <br/>
        <div className="grid">
          <table>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Notes</th>
              <th>Amount</th>
            </tr>
        {expensesListElements}
        </table>
        </div>
    </div>
  )
}

export default ExpenseList