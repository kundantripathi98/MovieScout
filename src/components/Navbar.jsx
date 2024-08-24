import SearchBar from "./SearchBar";
import Logo from "./Logo";

const Navbar = ({children}) => {

    return  <nav className="nav-bar">
       <Logo/>
       <SearchBar/>
      {children}
  </nav>
}

export default Navbar;