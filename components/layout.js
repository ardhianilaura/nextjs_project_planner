import Navbar from "./NavBar";
import AddTask from "./addtask";

export default function Layout({ children }) {
  return (
    <div>
      <main>
        <Navbar />
        <AddTask />
        {children}
      </main>
    </div>
  )
}