import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  const initialValue = {
    Name: "",
    Phone: "",
    Email: "",
    Username: "",
    Password: "",
    Company: "",
    Nationality: "",
  };
  const [account, setAccount] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setAccount((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(account));
    setIsSubmit(true);
  };
  const fetchData = async () => {
    const result = await axios.post(
      "http://localhost:4444/member/register",
      account
    );
    if (result.data.status === "ok") {
      alert("Your Journey has Begun");
      navigate("/login");
    } else {
      alert(result.data.error);
    }
  };
  // console.log(Object.keys(formErrors));
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      fetchData();
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const numberRegex = new RegExp(/^[0-9\b]=$/);
    const regexPhone = values.Phone.replace(/[^\d]/g, "");
    // console.log('hello11111',!/[0-9]/.test(values.Phone) )
    // console.log('hello',!numberRegex.test(values.Phone) )
    // console.log('regexPhone',regexPhone.length !== 10)
    // console.log('regexPhone',regexPhone)
    // console.log('values.Phone.length != 10',values.Phone.length !== 10 )
    // console.log('values.Phone.length',values.Phone.length)
    if (!values.Username) {
      errors.Username = "Username is required!";
    }
    if (!values.Phone) {
      errors.Phone = "Phone is required!";
    } else if (!/[0-9]/.test(values.Phone)) {
      errors.Phone = "Fill Number Please";
    } else if (values.Phone.length !== 10 || regexPhone.length !== 10) {
      errors.Phone = "Number Invalid";
    }
    if (!values.Name) {
      errors.Name = "Name is required!";
    }
    if (!values.Company) {
      errors.Company = "Company is required!";
    }
    if (!values.Nationality) {
      errors.Nationality = "Nationality is required!";
    }
    if (!values.Email) {
      errors.Email = "Email is required!";
    } else if (!regex.test(values.Email)) {
      errors.Email = "This is not a valid Email format!";
    }
    if (!values.Password) {
      errors.Password = "Password is required";
    } else if (values.Password.length < 8) {
      errors.Password = "Password must be more than 8 characters";
    } else if (values.Password.length > 20) {
      errors.Password = "Password cannot exceed more than 20 characters";
    }
    return errors;
  };
  const Navigate = () => {
    navigate("/login");
  };
  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justsifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Register</h1>
          {Object.keys(account).map((column, i) => {
            return (
              <div key={i}>
                <label>{column}</label>
                <div className="form-group">
                  {column === "Password" ? (
                    <div
                      style={{
                        color: "red",
                        display: "flex",
                        flexDirection: "column",
                        justsifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <input
                        placeholder={column}
                        value={account[column]}
                        type="password"
                        name={column}
                        id={column}
                        onChange={handleChange}
                      />
                      <span>{formErrors[column]}</span>
                    </div>
                  ) : (
                    <div
                      style={{
                        color: "red",
                        display: "flex",
                        flexDirection: "column",
                        justsifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <input
                        placeholder={column}
                        value={account[column]}
                        type="text"
                        name={column}
                        id={column}
                        onChange={handleChange}
                      />
                      <span>{formErrors[column]}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <button type="submit">Submit</button>
          <button onClick={Navigate}>Cancel</button>
        </form>
      </div>
    </>
  );
};

export default Register;
