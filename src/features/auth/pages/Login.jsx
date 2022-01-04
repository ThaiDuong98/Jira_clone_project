import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { processLogin } from "../userSlice";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import LoginForm from "../../../components/LoginForm";

const initialValue = {
  email: "",
  passWord: "",
};

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userInfo);

  const onSubmitLogin = async (values) => {
    try {
      const respone = await dispatch(processLogin(values)).unwrap();
      // const userInfo = unwrapResult(respone)
      navigate("/");
    } catch (error) {
      toast.error("Login Failed!");
    }
  };

  return (
    <LoginForm onSubmitLogin={onSubmitLogin} initialValue={initialValue} />
  );
}

export default Login;
