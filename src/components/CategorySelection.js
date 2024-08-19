

function CategorySelection({categoryList}){

    const categoryOptions = categoryList.map((category, index) =>{
        return <option key={index}>{category.categoryName}</option>
    })

    return (
        <select name="category">
            {categoryOptions}
        </select>
    )
}

export default CategorySelection