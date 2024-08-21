import IncomeForm from "./IncomeForm"
import IncomeCashFlowItem from "./IncomeCashFlowItem"
import { useOutletContext } from "react-router-dom"
import { useState } from "react"


function IncomeList(){
    const {categoryList,incomeSourceList, updateIncome, removeIncome, updateIncomeList} = useOutletContext()


    const USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
  })

    const [incomeFilter, setIncomeFitler] = useState("All")

    const filteredIncomes = incomeSourceList.filter(income =>{
      if(incomeFilter === "All"){
        return true
      } else {
        return income.category === incomeFilter
      }
    })

    function handleCategoryChange(event){
      setIncomeFitler(event.target.value)
    }

    const categoryFilterOptions = categoryList.map((category, index) => {
      return <option key={index}>{category.categoryName}</option>
    })
  
    const initialValue = 0
  
    const totalIncome = filteredIncomes.reduce((total, expense) => total + Number(expense.amount), initialValue)
  
    const incomeListElements = filteredIncomes.map((income, index) =>{
  
      const background = index%2===0?"lightBlueBackground":"lightSeaGreenBackground"
  
      return (
      <IncomeCashFlowItem key={index} cashEntry={income} categoryList={categoryList} removeIncome={removeIncome} updateIncome={updateIncome} backgroundClass={background}/>
    )
  
    })

    return(
    <div className="list">
        <h1>Income List</h1>
        <br/>
        <h3>Filter by category</h3>
        <select onChange={handleCategoryChange}>
          <option>All</option>
          {categoryFilterOptions}
        </select>
        <br/>
        <h2>{incomeFilter} Income: {USDollar.format(totalIncome)}</h2>
        <br/>
        <h3>Add new income:</h3>
        <IncomeForm categoryList={categoryList} updateIncomeList={updateIncomeList}/>
        <br />
        <div className="grid">
          <h3>Current income:</h3>
          <table>
            <tbody>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Notes</th>
              <th>Amount</th>
            </tr>
            {incomeListElements}
            </tbody>
            </table>
            </div>
    </div>
    )
}

export default IncomeList