import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import React, { useContext, useEffect, useState } from "react";
import todoContext from "../context/todos/todoContext";
import dayjs from "dayjs"; 

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TodoChart = ({ completedCount, pendingCount }) => {
  const data = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        label: '# of Todos',
        data: [completedCount, pendingCount],
        backgroundColor: ['#4ddb06', '#f20404'],
        hoverBackgroundColor: ['#80c802', '#c80202'],
      },
    ],
  };

  const option = {
    animation: {
        duration: 100,
    },
  };

  const context = useContext(todoContext);
  const { todos, getTodos } = context;

  const [completedPercentage, setCompletedPercentage] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getTodos();
    }
  }, [getTodos]);

  useEffect(() => {
    if (todos && todos.length > 0) {
      
      const last7Days = [...Array(7)].map((_, i) => dayjs().subtract(i, 'day').format("YYYY-MM-DD")).reverse();

      const percentages = last7Days.map(day => {
        const dailyTodos = todos.filter(todo => dayjs(todo.date).format("YYYY-MM-DD") === day);
        const completed = dailyTodos.filter(todo => todo.status === "true").length;
        const totalCount = dailyTodos.length;

        return totalCount > 0 ? (completed / totalCount) * 100 : 0;
      });

      setCompletedPercentage(percentages);
    }
  }, [todos]);

  const data7 = {
    labels: [...Array(7)].map((_, i) => dayjs().subtract(i, 'day').format("MMM DD")).reverse(), 
    datasets: [
      {
        label: "Completed Tasks (%)",
        data: completedPercentage, 
        backgroundColor: "rgba(2, 143, 200, 0.6)", 
        borderColor: "rgba(2, 143, 200, 1)", 
        borderWidth: 1,
      }
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20, 
          callback: (value) => `${value}%`,
        },
        title: {
          display: true,
          text: '%age of Completed Tasks',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
    animation: {
        duration: 100,
    },
  };
  return (
    <>
    <div className='my-5'>
      <h2 className='my-4'>Today's Todo Status</h2>
      <Pie data={data} options={option} />
    </div>
    <div className="my-5">
      <h2 className="my-4">Completed Tasks for the last 7 Days</h2>
      <Bar data={data7} options={options} />
    </div>
    </>
  );
};

export default TodoChart;
