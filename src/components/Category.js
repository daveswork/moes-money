import CategoryForm from "./CategoryForm";
import { useOutletContext } from "react-router-dom";


function Category(){
    const {categoryList, updateCategory} = useOutletContext()

    const categoryListElements = categoryList.map((category, index)  => {
        return <li key={index}>{category.categoryName}</li>
    })
    
    return(
        <div>
            <h1>Category Maintenance</h1>
            <br/>
            <CategoryForm updateCategory={updateCategory}/>
            <br/>
            <h4>Existing categories:</h4>
            <ul>{categoryListElements}</ul>
        </div>
    )
}

export default Category