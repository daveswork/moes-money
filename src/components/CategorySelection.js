

function CategorySelection({categoryList, handleChange, selectedCategory}){

    const categoryOptions = categoryList.map((category, index) =>{
        return <option key={index}>{category.categoryName}</option>
    
    })

    return (
        <select onChange={(event => handleChange(event))} name="category" value={selectedCategory}>
            <option>""</option>
           
            {categoryOptions}
        </select>
    )
}

export default CategorySelection