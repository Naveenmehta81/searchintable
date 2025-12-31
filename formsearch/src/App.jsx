import { useState } from "react";

import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [formdata, setFromdata] = useState({
    firstname: "",
    lastname: "",
    rollno: "",
    age: "",
    date: "",
  });

  function handleform(event) {
    setFromdata((prevdata) => ({
      ...prevdata,
      [event.target.name]: event.target.value,
    }));
  }

  function submithandler(event) {
    event.preventDefault();
    const displaydata = formdata;
    console.log(displaydata);
    setData(displaydata);
  }

  return (
    <>
      <div className="wrapper">
        <div className="container">
           <input type="text" placeholder="search"></input>
           <button>search  </button>
          <form className="form-data" onSubmit={submithandler}>
            <label>First Name:</label>
            <input
              className="input"
              type="text"
              placeholder="ENTER FIRST NAME "
              name="firstname"
              value={formdata.firstname}
              onChange={handleform}
            />
            <br />
            <label>Last name:</label>
            <input
              className="input"
              type="text"
              placeholder="ENTER LAST NAME "
              name="lastname"
              value={formdata.lastname}
              onChange={handleform}
            />
            <br />
            <label>ENTER Roll NO.</label>
            <input
              className="input"
              type="text"
              placeholder="enter the roll no "
              name="rollno"
              value={formdata.rollno}
              onChange={handleform}
            />
            <br />
            <label>Age:</label>
            <input
              className="input"
              type="number"
              placeholder="enter your age "
              min={10}
              max={100}
              name="age"
              value={formdata.age}
              onChange={handleform}
            />
            <br />
            <label>Join Date:</label>
            <input
              className="input"
              type="date"
              name="date"
              value={formdata.date}
              onChange={handleform}
            />
            <button type="sumbit">Submit</button>
          </form>
          <hr></hr>
          <div className="table">
            <ol>
              <li>First name :{data.firstname}</li>
              <li>last name :{data.lastname}</li>
              <li>Roll no :{data.rollno}</li>
               <li>age:{data.age}</li>
               <li>Join date :{data.date}</li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
