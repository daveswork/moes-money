import ExpenseForm from "./ExpensesForm"
import { useOutletContext } from "react-router-dom"

function ExpenseList(){

  const {categoryList} = useOutletContext()

  console.log("these are the listed categories you may use", categoryList)

  return(
    <div>

      <h1>
        ExpenseList
        <ExpenseForm categoryList={categoryList}/>
      </h1>
    </div>
  )
}

export default ExpenseList