import React, { useEffect, useState } from "react";
import Input from "../Components/Input";
import { LoginFormData } from "../Data.js/LoginFormData";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userdata"));
    if (user) {
      setLoginUser(user);
      if (loginUser.username === "sunil@123" && loginUser.password === "1234") {
        navigate("/home", { replace: true });
      }
    } else {
      setLoginUser({
        username: "",
        password: "",
      });
    }
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;
    const newUser = { ...loginUser };
    newUser[fieldName] = fieldValue;
    setLoginUser(newUser);
  };
  const loginFormHandler = (e) => {
    e.preventDefault();
    if (loginUser.username === "sunil@123" && loginUser.password === "1234") {
      localStorage.setItem("userdata", JSON.stringify(loginUser));
      navigate("/home", { replace: true });
    } else {
      alert("Username and Password not matched");
    }
  };

  return (
    <div>
      <form onSubmit={loginFormHandler}>
        {LoginFormData.map((data) => (
          <Input
            key={data.id}
            name={data.name}
            type={data.type}
            placeholder={data.placeholder}
            onChange={handleForm}
          />
        ))}
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
