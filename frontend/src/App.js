import { ToastContainer } from "react-toastify";

import React from "react";
import "react-toastify/dist/ReactToastify.css";
import ListTasks from "./components/ListTasks";
export const URL = process.env.REACT_APP_URL;
function App() {
  console.log(URL);
  return (
    <React.Fragment>
      <div className="app">
        <div className="task-container">
          <ListTasks />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
