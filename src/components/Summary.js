import { useOutletContext } from "react-router-dom"


function Summary(){
    const {categoryList, expenditureList, incomeSourceList} = useOutletContext()

    const USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })

    function expenseCategorySummary(category){
        const categoryExpenses = expenditureList.filter((expense, index)=>{
            if(expense.category === category){
                return expense
            }
        })

        const initialTally = 0

        const categoryTotals = categoryExpenses.reduce((total, expense) => total + Number(expense.amount), initialTally)

        return({category, categoryTotals})
    }

    const expenseCategoryGrouping = categoryList.map(category => {
        return expenseCategorySummary(category.categoryName)
    })

    const expenseCategoryItems = expenseCategoryGrouping.map((expense, index) =>{
        if(expense.categoryTotals > 0){
            return <li key={index}>{expense.category} : {USDollar.format(expense.categoryTotals)}</li>
        }
    })

    console.log(expenseCategoryGrouping)

    function incomeCategorySummary(category){
        const categoryIncome = incomeSourceList.filter((income, index)=>{
            if(income.category === category){
                return income
            }
        })

        const initialTally = 0

        const categoryTotals = categoryIncome.reduce((total, income) => total + Number(income.amount), initialTally)

        return({category, categoryTotals})
    }

    const incomeCategoryGrouping = categoryList.map(category => {
        return incomeCategorySummary(category.categoryName)
    })

    const incomeCategoryItems = incomeCategoryGrouping.map((income, index) =>{
        if(income.categoryTotals > 0){
            return <li key={index}>{income.category} : {USDollar.format(income.categoryTotals)}</li>
        }
    })
    console.log(incomeCategoryGrouping)

    const initialValue = 0

    const totalIncome = incomeSourceList.reduce((total, income) => total + Number(income.amount), initialValue)
    const incomeSortedByDate = incomeSourceList.sort((a,b) => a.date > b.date ? 1:-1 )
    const mostRecentIncome = incomeSortedByDate[incomeSortedByDate.length - 1]

    const totalExpenses = expenditureList.reduce((total, expense) => total + Number(expense.amount), initialValue)
    const expenseSortedByDate = expenditureList.sort((a,b) => a.date > b.date ? 1:-1)
    const mostRecentExpense = expenseSortedByDate[expenseSortedByDate.length - 1]

    

    return(
        <div className="summary">
            <h1>Summary</h1>
            <h2>Total Income: {USDollar.format(totalIncome)}</h2>
            <h3>Your most recent income was on {mostRecentIncome.date} for {USDollar.format(mostRecentIncome.amount)} </h3>
            <h4>You earned your money from the following categories:</h4>
            <ul>{incomeCategoryItems}</ul>
            <h2>Total expenses: {USDollar.format(totalExpenses)}</h2>
            <h3>Your most recent expense was on {mostRecentExpense.date} for {USDollar.format(mostRecentExpense.amount)} </h3>
            <h4>You spent your money on the following categories:</h4>
            <ul>{expenseCategoryItems}</ul>
        </div>
    )
}

export default Summary