import { NavLink } from "react-router-dom";

function NavBar(){
    return(
        <div>
            <NavLink to="/">Home</NavLink>

            <NavLink to="/summary">Summary</NavLink>

            <NavLink to="/incomelist">Income List</NavLink>

            <NavLink to="/expenselist">Expense List</NavLink>
        </div>
        
    )
}

export default NavBar