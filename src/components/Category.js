import CategoryForm from "./CategoryForm";
import { useOutletContext } from "react-router-dom";


function Category(){
    const {updateCategory} = useOutletContext()
    
    return(
        <div>
            Category
            <CategoryForm updateCategory={updateCategory}/>
        </div>
    )
}

export default Category