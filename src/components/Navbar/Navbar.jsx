
import { NavLink } from "react-router"
import './Navbar.css'
import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import { removeToken } from "../../utils/auth"

export default function Navbar(){
  // * Context
  const { user, setUser } = useContext(UserContext)

  const handleSignOut = () => {
    removeToken()
    setUser(null)
  }

  return (
    <header>
      <div className="brand-logo">
        <NavLink to="/">🌍</NavLink>
      </div>
      <nav>
        <NavLink to="/activities">Activities</NavLink>

        { user 
          ? (
            <>
              {/* Signed in routes */}
              <NavLink to="/activities/new">Create activity</NavLink>
              <NavLink onClick={handleSignOut} to="/login">Sign out</NavLink>
            </>
          )
          : (
            <>
              {/* Signed out routes */}
              <NavLink to="/register">Register</NavLink>
              <NavLink to="/login">Login</NavLink>
            </>
          )
        }
        

        
      </nav>
    </header>
  )
}
