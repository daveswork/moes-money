import { NavLink } from "react-router-dom";

function NavBar(){
    return(
        <div>
            <nav className="navbar">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/summary">Summary</NavLink>
            <NavLink to="/expenselist">Expense List</NavLink>
            <NavLink to="/incomelist">Income List</NavLink>
            <NavLink to="/categories">Categories</NavLink>
            </nav>
        </div>
        
    )
}

export default NavBar