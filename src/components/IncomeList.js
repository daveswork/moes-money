import IncomeForm from "./IncomeForm"
import IncomeCashFlowItem from "./IncomeCashFlowItem"
import { useOutletContext } from "react-router-dom"


function IncomeList(){
    const {categoryList,incomeSourceList, updateIncome, removeIncome, updateIncomeList} = useOutletContext()


    const USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
  })
  
    const initialValue = 0
  
    const totalIncome = incomeSourceList.reduce((total, expense) => total + Number(expense.amount), initialValue)
  
    const incomeListElements = incomeSourceList.map((income, index) =>{
  
      const background = index%2===0?"lightBlueBackground":"lightSeaGreenBackground"
      console.log(background)
  
      return (
      <IncomeCashFlowItem key={index} cashEntry={income} categoryList={categoryList} removeIncome={removeIncome} updateIncome={updateIncome} backgroundClass={background}/>
    )
  
    })

    return(
    <div>
        <h1>Income List</h1>
        <br/>
        <h2>Total Income: {USDollar.format(totalIncome)}</h2>
        <br/>
        <IncomeForm categoryList={categoryList} updateIncomeList={updateIncomeList}/>
        <br />
        <div className="grid">
          <table>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Notes</th>
              <th>Amount</th>
            </tr>
            {incomeListElements}
            </table>
            </div>
    </div>
    )
}

export default IncomeList