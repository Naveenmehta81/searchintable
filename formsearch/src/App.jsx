import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [searchinput, setSearchinput] = useState("");
  const [originalData, setOriginalData] = useState([]);
  // const[dateinterval , setdateinterval]= useState({startdate:"" , enddate:""});
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");

  // const[isedting , setedting]= useState(false);

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

    const newdata = [...originalData, formdata];
    setOriginalData(newdata);
    setData(newdata);
    // setData((prevData) => [...prevData, formdata]);

    setFromdata({
      firstname: "",
      lastname: "",
      rollno: "",
      age: "",
      date: "",
    }); //  form data reset after submit
  }

  function handledeletebtn(index) {
    const deletedata = data.filter((_, i) => i !== index);
    setData(deletedata);
    setOriginalData(deletedata);
  }

  function handeledit(index) {
    // setedting(true);
    const edititem = data[index];

  setFromdata({ ...edititem });  
    // setFromdata({
    //   firstname: edititem.firstname,
    //   lastname: edititem.lastname,
    //   rollno: edititem.rollno,
    //   age: edititem.age,
    //   date: edititem.date,
    // });
    const deletedata = data.filter((_, i) => i !== index);
    setData(deletedata);
    setOriginalData(deletedata); // ye delte krke form me le araha h edit krne k liye but i need to not to delete it until user submit the edited data
  }

  const handleinputchange = (event) => {
    const search = event.target.value;
    setSearchinput(search);

    if (search === "") {
      setData(originalData);
      return;
    }
    const filteritem = data.filter(
      (data) =>
        data.firstname.toLowerCase().includes(search.toLowerCase()) ||
        data.lastname.toLowerCase().includes(search.toLowerCase()) ||
        data.rollno.toLowerCase().includes(search.toLowerCase())
    );
    setData(filteritem);
  };

  const handlesearchdate = (event) => {
    event.preventDefault();

    if (!startdate && !enddate) {
      setData(originalData);
      return;
    }

    const filterdate = originalData.filter((item) => {
      const itemDate = item.date;

      const Start = startdate ? itemDate >= startdate : true;
      const End = enddate ? itemDate <= enddate : true;

      return Start && End;
    });

    setData(filterdate);
  };

  const handledate = (event) => {
    // setdateinterval(() =>({
    //       [event.target.name]: event.target.value,
    // }))
    // console.log(dateinterval)
    if (event.target.name === "startdate") {
      setStartdate(event.target.value);
    } else {
      setEnddate(event.target.value);
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <h1>Employee info</h1>
          <form className="form-data" onSubmit={submithandler}>
            <label>First Name:</label>
            <input
              className="input"
              type="text"
              placeholder="ENTER FIRST NAME "
              name="firstname"
              value={formdata.firstname}
              onChange={handleform}
              required
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
              required
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
              required
            />
            <br />
            <label>Age:</label>
            <input
              className="input"
              type="number"
              placeholder="enter your age "
              min={1}
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
              required
            />
            <button type="sumbit" className="submit-btn">
              Submit
            </button>
          </form>
          <hr></hr>

          <input
            type="text"
            placeholder="search table..."
            className="search-bar"
            value={searchinput}
            onChange={handleinputchange}
          ></input>

          <label className="lable-date">
            Interval:
            <input
              type="date"
              className="input-interval"
              name="startdate"
              onChange={handledate}
            />
            <label>To</label>
            <input
              type="date"
              className="input-interval"
              name="enddate"
              onChange={handledate}
            />
            <button className="search-btn" onClick={handlesearchdate}>
              search{" "}
            </button>
          </label>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Roll No</th>
                  <th>Age</th>
                  <th>Join Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.rollno}</td>
                    <td>{item.age}</td>
                    <td>{item.date}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handeledit(index)}
                      >
                        <FaEdit />
                      </button>
                    </td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handledeletebtn(index)}
                      >
                        <AiOutlineDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
