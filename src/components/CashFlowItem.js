import { useState } from "react"
import CategorySelection from "./CategorySelection"


function CashFlowItem({cashEntry, categoryList, removeExpense, updateExpense, backgroundClass}){

    console.log("Category list from Cash flow form ", categoryList)
    console.log("Current item", cashEntry)

    const [displayForm, setDisplayForm] = useState(false)

    const [editExpenseItem, setEditExpenseItem] = useState(cashEntry)

    const USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })

    console.log(USDollar.format(editExpenseItem.amount))
  
  
    function handleChangeForm(event){
      setEditExpenseItem({...editExpenseItem, [event.target.name]: event.target.value})
  }

    function handleFormToggle(event){
        setDisplayForm(displayForm => !displayForm)
    }

    function handleDelete(event){
        fetch(`http://localhost:4000/expenditures/${cashEntry.id}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(() => removeExpense(cashEntry.id))
    }

    function handleSubmitChange(event){
        event.preventDefault()
        console.log(editExpenseItem)
        updateExpense(cashEntry.id, editExpenseItem)
        handleFormToggle()
    }

    return (
        < >
        { displayForm ?
        <div>
            <form className={backgroundClass} onSubmit={(event) => handleSubmitChange(event)}>
            <label htmlFor="date">Date: </label>
                <input onChange={(event)=>{handleChangeForm(event)}} name="date" id="date" type="date" value={editExpenseItem.date}/>
                <br/>
                <label htmlFor="description">Description: </label>
                <input onChange={(event)=>{handleChangeForm(event)}} name="description" id="description" type="text" value={editExpenseItem.description}/>
                <br/>
                <label htmlFor="amount">Amount: </label>
                <input onChange={(event)=>{handleChangeForm(event)}} name="amount" id="amount" type="number" value={editExpenseItem.amount}/>
                <br/>
                <label htmlFor="category">Category: </label>
                <CategorySelection categoryList={categoryList} handleChange={handleChangeForm} selectedCategory={editExpenseItem.category}/>
                <br/>
                <label htmlFor="notes">Notes: </label>
                <input onChange={(event)=>{handleChangeForm(event)}} name="notes" id="notes" type="notes" value={editExpenseItem.notes}/>
                <br/>
                <input type="submit" value="Submit change"/>
                <button onClick={handleFormToggle}>Cancel</button>
            </form>
            <br/>
        </div>:
        <tbody>
            <tr className={backgroundClass}>
            <td><span>{cashEntry.date} </span></td>
            <td><span>{cashEntry.category} </span></td> 
            <td><span>{cashEntry.description} </span></td> 
            <td><span>{cashEntry.notes}</span></td>
            <td className="currencyAlign"><span >{USDollar.format(cashEntry.amount)}</span></td>
            <button onClick={handleFormToggle}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            
            
            </tr>
            

        </tbody>

}
</>

        // <>
        //     <span>{cashEntry.date} </span><span>{cashEntry.description} </span> <span>{cashEntry.amount}</span>
        //     <br/>
        //     <p>{cashEntry.notes}</p>
        // </>

    )
    
}

export default CashFlowItem