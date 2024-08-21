import { useOutletContext } from "react-router-dom"


function Summary(){
    const {expenditureList, incomeSourceList} = useOutletContext()

    const USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })

    const initialValue = 0

    const totalIncome = incomeSourceList.reduce((total, income) => total + Number(income.amount), initialValue)
    const incomeSortedByDate = incomeSourceList.sort((a,b) => a.date > b.date ? 1:-1 )
    const mostRecentIncome = incomeSortedByDate[incomeSortedByDate.length - 1]

    const totalExpenses = expenditureList.reduce((total, expense) => total + Number(expense.amount), initialValue)
    const expenseSortedByDate = expenditureList.sort((a,b) => a.date > b.date ? 1:-1)
    const mostRecentExpense = expenseSortedByDate[expenseSortedByDate.length - 1]

    

    return(
        <div>
            <h1>Summary</h1>
            <h2>Total Income: {USDollar.format(totalIncome)}</h2>
            <h3>Your most recent income was on {mostRecentIncome.date} for {USDollar.format(mostRecentIncome.amount)} </h3>
            <h2>Total expenses: {USDollar.format(totalExpenses)}</h2>
            <h3>Your most recent expense was on {mostRecentExpense.date} for {USDollar.format(mostRecentExpense.amount)} </h3>
        </div>
    )
}

export default Summary