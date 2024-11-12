import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import CategorySelection from "./CategorySelection"


function ExpenseForm({updateExpenseList, categoryList}){

 

    const [expenseItem, setExpenseItem] = useState({
        date: "",
        description: "",
        amount: 0,
        category: categoryList[0].categoryName,
        notes: ""
    })

    function handleChange(event){
        setExpenseItem({...expenseItem, [event.target.name]: event.target.value})
    }

    function handleSubmit(event){
        event.preventDefault()
        
        fetch('https://moesmoney.com/db/expenditures', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(expenseItem)
        })
        .then(response => response.json())
        .then(data => {
            setExpenseItem(
                {
                    date: "",
                    description: "",
                    amount: 0,
                    category: categoryList[0].categoryName,
                    notes: ""
                }
            )
            updateExpenseList(data)
        })

    }

    return (
        <div>
            <form onSubmit={(event) => handleSubmit(event)}>
                <label htmlFor="date">Date: </label>
                <input onChange={(event)=>{handleChange(event)}} name="date" id="date" type="date" value={expenseItem.date}/>
                <br/>
                <label htmlFor="description">Description: </label>
                <input onChange={(event)=>{handleChange(event)}} name="description" id="description" type="text" value={expenseItem.description}/>
                <br/>
                <label htmlFor="amount">Amount: </label>
                <input onChange={(event)=>{handleChange(event)}} name="amount" id="amount" type="number" step="0.01" value={expenseItem.amount}/>
                <br/>
                <label htmlFor="category">Category: </label>
                <CategorySelection categoryList={categoryList} handleChange={handleChange} selectedCategory={expenseItem.category}/>
                <br/>
                <label htmlFor="notes">Notes: </label>
                <input onChange={(event)=>{handleChange(event)}} name="notes" id="notes" type="notes" value={expenseItem.notes}/>
                <br/>
                <input type="submit" value="Submit expense"/>

            </form>

        </div>
    )
}

export default ExpenseForm
