import React, { useState } from "react";
import ExpenseContext from "./expenseContext";

const ExpenseState = (props) => {
  const host = "http://10.10.240.185:2000";
  const expensesInitial = [];
  const [expenses, setExpenses] = useState(expensesInitial);

  // Fetch all expenses
  const getExpenses = async () => {
    const response = await fetch(`${host}/api/expense/fetchallexpenses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setExpenses(json); // fixed here
  };

  // Add a new expense
  const addExpense = async (amount, category, date, note, transaction) => {
    const response = await fetch(`${host}/api/expense/addexpenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ amount, category, date, note, transaction }),
    });
    const json = await response.json();
    console.log(json);

    const expense = { amount: amount, date: date, category: category, note: note, transaction:transaction };
    setExpenses(expenses.concat(expense)); // fixed here
  };

  // Delete a expense
  const deleteExpense = async (id) => {
    const response = await fetch(`${host}/api/expense/deleteexpense/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(json);

    // Use functional state update to avoid stale state issues
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense._id !== id));
  };

  // Edit a expense
  const editExpense = async (id, amount, category, date, note, transaction) => {
    const response = await fetch(`${host}/api/expense/updateexpense/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ amount, category, date, note, transaction }),
    });
    const json = await response.json();
    console.log(json);

    for (let index = 0; index < expenses.length; index++) {
      const element = expenses[index];
      if (element._id === id) {
        element.id = id;
        element.amount = amount;
        element.category = category;
        element.date = date;
        element.note = note;
        element.transaction = transaction;
      }
    }
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense, editExpense, getExpenses }}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseState;
