import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Popup from "./Popup";
const EditData = () => {
  const navigate = useNavigate();
  const initialValue = {
    Name: "",
    Phone: "",
    Email: "",
    Username: "",
    Password: "",
    Company: "",
    Nationality: "",
    token: "",
  };
  const [account, setAccount] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [popup, setPopup] = useState(false);
  const [memberData, setMemberData] = useState([]);
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
    const token = localStorage.getItem("token");
    setAccount({ ...account, token: token });
    const result = await axios.post(
      "http://localhost:4444/member/editdata",
      account
    );
    if (result.data.status === "ok") {
      alert("Your data have been changed");
      navigate("/getitem");
    } else {
      alert(result.data.error);
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      fetchData();
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexPhone = values.Phone.replace(/[^\d]/g, "");
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
    navigate("/getitem");
  };

  const DeleteAccount = () => {
    setPopup(!popup);
  };
  const getData = async () => {
    const token = localStorage.getItem("token");
    const result = await axios.get(
      `http://localhost:4444/member/getdata/${token}`
    );
    setMemberData(result.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justsifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>EditData</h1>

          {Object.keys(account).map((column, i) => {
            return (
              <div key={i}>
                {column === "token" ? (
                  ""
                ) : (
                  <div>
                    <label>{column}</label>

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
                )}
              </div>
            );
          })}
          <button type="submit">Submit</button>
          <button type="button" onClick={Navigate}>
            Cancel
          </button>
          <button type="button" onClick={DeleteAccount}>
            Delete Account
          </button>
        </form>
        {memberData.map((data, i) => {
          return (
            <div
              style={{
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
                marginLeft: "50px",
              }}
              key={i}
            >
              <p>{`Name: ${data.Name}`}</p>
              <p>{`Phone: ${data.Phone}`}</p>
              <p>{`Email: ${data.Email}`}</p>
              <p>{`Username: ${data.Username}`}</p>
              <p>{`Password:********`}</p>
              <p>{`Company: ${data.Company}`}</p>
              <p>{`Nationality: ${data.Nationality}`}</p>
            </div>
          );
        })}

        {popup && <Popup setPopup={setPopup} />}
      </div>
    </>
  );
};

export default EditData;
