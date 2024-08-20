import { useEffect, useState } from "react"
import { useOutletContext, useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import CategorySelection from "./CategorySelection"


function CashFlowItem({cashEntry, categoryList, removeExpense, updateExpense}){

    console.log("Category list from Cash flow form ", categoryList)
    console.log("Current item", cashEntry)

    const [displayForm, setDisplayForm] = useState(false)

    const [editExpenseItem, setEditExpenseItem] = useState(cashEntry)
  
  
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
        <div >
        { displayForm ?
        <div>
            <form onSubmit={(event) => handleSubmitChange(event)}>
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
            <tr>
            <td><span>{cashEntry.date} </span></td><td><span>{cashEntry.description} </span></td> <td><span>{cashEntry.amount}</span></td>
            </tr>
            <tr><p>{cashEntry.notes}</p></tr>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleFormToggle}>Edit</button>
        </tbody>

}
</div>

        // <>
        //     <span>{cashEntry.date} </span><span>{cashEntry.description} </span> <span>{cashEntry.amount}</span>
        //     <br/>
        //     <p>{cashEntry.notes}</p>
        // </>

    )
    
}

export default CashFlowItem