import IncomeForm from "./IncomeForm"
import { useOutletContext } from "react-router-dom"


function IncomeList(){
    const {categoryList,setIncomeSourceList, updateIncome} = useOutletContext()
    return(
    <div>
        IncomeList
        <IncomeForm categoryList={categoryList}/>
    </div>
    )
}

export default IncomeList