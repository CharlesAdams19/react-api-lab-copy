import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function Dashboard(){
  // * Context
  const { user } = useContext(UserContext)
  return (
    <main>
      <h1>Itinero</h1>
      <p>Welcome back, {user.username}</p>
    </main>
  )
}
