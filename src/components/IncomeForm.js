import { useState } from "react"
import CategorySelection from "./CategorySelection"


function IncomeForm({categoryList}){

    const baseCashFlowItem = {
        date: "",
        description: "",
        amount: 0,
        category: categoryList[0].categoryName,
        notes: ""
    }

    const [incomeSource, setIncomeSource] = useState(baseCashFlowItem)

    function handleChange(event){
        console.log(event.target.name)
        console.log(event.target.value)
        setIncomeSource({...incomeSource, [event.target.name]: event.target.value})
    }

    function handleSubmit(event){
        event.preventDefault()
        
        fetch('http://localhost:4000/income', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(incomeSource)
        })
        .then(response => response.json())
        .then(data => setIncomeSource(baseCashFlowItem))

    }

    return (
        <div>
            <form onSubmit={(event) => handleSubmit(event)}>
                <label htmlFor="date">Date: </label>
                <input onChange={(event)=>{handleChange(event)}} name="date" id="date" type="date" value={incomeSource.date}/>
                <br/>
                <label htmlFor="description">Description: </label>
                <input onChange={(event)=>{handleChange(event)}} name="description" id="description" type="text" value={incomeSource.description}/>
                <br/>
                <label htmlFor="amount">Amount: </label>
                <input onChange={(event)=>{handleChange(event)}} name="amount" id="amount" type="number" value={incomeSource.amount}/>
                <br/>
                <label htmlFor="category">Category: </label>
                {/* <input onChange={(event)=>{handleChange(event)}} name="category" id="category" type="text" /> */}
                <CategorySelection categoryList={categoryList} handleChange={handleChange}/>
                <br/>
                <label htmlFor="notes">Notes: </label>
                <input onChange={(event)=>{handleChange(event)}} name="notes" id="notes" type="notes" value={incomeSource.notes}/>
                <br/>
                <input type="submit" value="Submit income source"/>

            </form>

        </div>
    )
}

export default IncomeForm