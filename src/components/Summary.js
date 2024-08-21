import { useOutletContext } from "react-router-dom"


function Summary(){
    const {expenditureList, incomeSourceList} = useOutletContext()

    const USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })

    const initialValue = 0

    const totalExpenses = expenditureList.reduce((total, expense) => total + Number(expense.amount), initialValue)

    const totalIncome = incomeSourceList.reduce((total, income) => total + Number(income.amount), initialValue)

    return(
        <div>
            <h1>Summary</h1>
            <h2>Total Income: {USDollar.format(totalIncome)}</h2>
            <h2>Total expenses: {USDollar.format(totalExpenses)}</h2>
        </div>
    )
}

export default Summary