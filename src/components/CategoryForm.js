import { useState } from "react"

function CategoryForm({updateCategory}){

    const dbServer = process.env.REACT_APP_DB_SERVER;
    const dbPort = process.env.REACT_APP_DB_PORT;

    const [category, setCategory] = useState({
        categoryName: ""
    })

    function handleChange(event){
        setCategory({...category, [event.target.name]:event.target.value})
    }

    function handleSubmit(event){
        event.preventDefault()
        fetch(`${dbServer}:${dbPort}/db/categories`,{
            method: "POST", 
            headers: {
                "Content-Type" : "application/JSON"
            },
            body: JSON.stringify(category)
        }).then(response => response.json())
        .then(data => {
            setCategory({
            categoryName: ""
        })
        updateCategory(data)
    }
    )
    }

    return (
        <div>
            <form onSubmit={event => handleSubmit(event)}>
                <label htmlFor="categoryName">Create New Category: </label>
                <input onChange={event => handleChange(event)} type="text" name="categoryName" id="categoryName" value={category.categoryName}/>
                <input type="submit" value="Create category" />

            </form>
            

        </div>
    )
}

export default CategoryForm
