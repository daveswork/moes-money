import { useState } from "react"


function ExpenseForm(){

    const [expenseItem, setExpenseItem] = useState({
        date: "",
        description: "",
        amount: 0,
        category: "",
        notes: ""
    })

    function handleChange(event){
        console.log(event.target.name)
        console.log(event.target.value)
        setExpenseItem({...expenseItem, [event.target.name]: event.target.value})
    }

    function handleSubmit(event){
        event.preventDefault()
        
        fetch('http://localhost:4000/expenditures', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(expenseItem)
        })
        .then(response => response.json())
        .then(data => console.log(data))

    }

    return (
        <div>
            <form onSubmit={(event) => handleSubmit(event)}>
                <label htmlFor="date">Date: </label>
                <input onChange={(event)=>{handleChange(event)}} name="date" id="date" type="date"/>
                <br/>
                <label htmlFor="description">Description: </label>
                <input onChange={(event)=>{handleChange(event)}} name="description" id="description" type="text" />
                <br/>
                <label htmlFor="amount">Amount: </label>
                <input onChange={(event)=>{handleChange(event)}} name="amount" id="amount" type="number" />
                <br/>
                <label htmlFor="category">Category: </label>
                <input onChange={(event)=>{handleChange(event)}} name="category" id="category" type="text" />
                <br/>
                <label htmlFor="notes">Notes: </label>
                <input onChange={(event)=>{handleChange(event)}} name="notes" id="notes" type="notes" />
                <br/>
                <input type="submit" value="Submit income source"/>

            </form>

        </div>
    )
}

export default ExpenseForm