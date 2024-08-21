import { useState } from "react"
import CategorySelection from "./CategorySelection"


function IncomeCashFlowItem({cashEntry, categoryList, removeIncome, updateIncome, backgroundClass}){

    const [displayForm, setDisplayForm] = useState(false)

    const [editIncomeItem, setEditIncomeItem] = useState(cashEntry)

    const USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })
  
  
    function handleChangeForm(event){
      setEditIncomeItem({...editIncomeItem, [event.target.name]: event.target.value})
  }

    function handleFormToggle(event){
        setDisplayForm(displayForm => !displayForm)
    }

    function handleDelete(event){
        fetch(`http://localhost:4000/income/${cashEntry.id}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(() => removeIncome(cashEntry.id))
    }

    function handleSubmitChange(event){
        event.preventDefault()
        updateIncome(cashEntry.id, editIncomeItem)
        handleFormToggle()
    }

    return (
        < >
        { displayForm ?
        <div>
            <form className={backgroundClass} onSubmit={(event) => handleSubmitChange(event)}>
            <label htmlFor="date">Date: </label>
                <input onChange={(event)=>{handleChangeForm(event)}} name="date" id="date" type="date" value={editIncomeItem.date}/>
                <br/>
                <label htmlFor="description">Description: </label>
                <input onChange={(event)=>{handleChangeForm(event)}} name="description" id="description" type="text" value={editIncomeItem.description}/>
                <br/>
                <label htmlFor="amount">Amount: </label>
                <input onChange={(event)=>{handleChangeForm(event)}} name="amount" id="amount" type="number" value={editIncomeItem.amount}/>
                <br/>
                <label htmlFor="category">Category: </label>
                <CategorySelection categoryList={categoryList} handleChange={handleChangeForm} selectedCategory={editIncomeItem.category}/>
                <br/>
                <label htmlFor="notes">Notes: </label>
                <input onChange={(event)=>{handleChangeForm(event)}} name="notes" id="notes" type="notes" value={editIncomeItem.notes}/>
                <br/>
                <input type="submit" value="Submit change"/>
                <button onClick={handleFormToggle}>Cancel</button>
            </form>
            <br/>
        </div>:
            <tr className={backgroundClass}>
            <td><span>{cashEntry.date} </span></td>
            <td><span>{cashEntry.category} </span></td> 
            <td><span>{cashEntry.description} </span></td> 
            <td><span>{cashEntry.notes}</span></td>
            <td className="currencyAlign"><span >{USDollar.format(cashEntry.amount)}</span></td>
            <button onClick={handleFormToggle}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            
            
            </tr>
            


}
</>

    )
    
}

export default IncomeCashFlowItem