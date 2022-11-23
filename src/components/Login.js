import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const initialValue = { Username: "", Password: "" };
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
      "http://localhost:4444/member/login",
      account
    );
    if (result.data.status === "ok") {
      alert("congrat");
      localStorage.setItem("token", result.data.token);
      navigate("/getitem");
    } else {
      alert(result.data.data);
    }
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      fetchData();
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};

    if (!values.Username) {
      errors.Username = "Username is required!";
    }
    if (!values.Password) {
      errors.Password = "Password is required";
    } else if (values.Password.length < 4) {
      errors.Password = "Password must be more than 4 characters";
    } else if (values.Password.length > 10) {
      errors.Password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  const Navigate = () => {
    navigate("/register");
  };
  return (
    <>
      <div>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justsifyContent: "center",
            alignItems: "center",
          }}
          onSubmit={handleSubmit}
        >
          <h1>Login</h1>
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
          <button type="submit">Login</button>
          <button onClick={Navigate}>Register</button>
        </form>
      </div>
    </>
  );
};

export default Login;
