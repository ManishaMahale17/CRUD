import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  contact: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { name, email, contact } = state;

//   const history = useHistory();
  const navigate = useNavigate();

  const {id} =useParams();
  useEffect(()=>{
    axios.get(`http://localhost:5000/api/get/${id}`)
    .then((resp) => setState({...resp.data[0]}));
  },[id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("Please provide value in each input field");
    } else {
       if(!id) {
        axios
        .post("http://localhost:5000/api/post", {
          name,
          email,
          contact,
        })
        .then(() => {
          setState({ name: "", email: "", contact: "" });
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
        toast.success("Conatct added successfully");
       }else{
        axios
        .put(`http://localhost:5000/api/update/${id}`, {
          name,
          email,
          contact,
        })
        .then(() => {
          setState({ name: "", email: "", contact: "" });
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
        toast.success("Conatct updated successfully");
       }
      
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Your name.."
          name="name"
          value={name ||""}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Your Email.."
          name="email"
          value={email ||""}
          onChange={handleInputChange}
        />

        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          id="contact"
          placeholder="Your Contact.."
          name="contact"
          value={contact ||""}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ?"update":"Save"} />
        <Link to="/">
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
