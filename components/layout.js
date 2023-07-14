import Navbar from "./navbar";
import AddTask from "./addtask";

export default function Layout({ children }) {
  return (
      <main>
        <Navbar />
        <AddTask />
        {children}
      </main>
  )
}