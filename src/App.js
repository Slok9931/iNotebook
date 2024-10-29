import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import TodoState from "./context/todos/TodoState";
import Expense from "./components/Expense";
import ExpenseState from "./context/expenses/ExpenseState";

function App() {
  return (
    <>
      <ExpenseState>
      <TodoState>
      <NoteState>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/expense-tracker" element={<Expense />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
          <Footer/>
        </Router>
      </NoteState>
      </TodoState>
      </ExpenseState>
    </>
  );
}

export default App;
