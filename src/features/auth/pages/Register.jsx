import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { processRegister } from "../userSlice";
import { toast } from "react-toastify";
import RegisterForm from "../../../components/RegisterForm";

function Register() {
  const initialValue = {
    email: "",
    passWord: "",
    name: "",
    phoneNumber: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitRegister = async (values) => {
    try {
      const respone = await dispatch(processRegister(values)).unwrap();
      // console.log("Status: ", respone.statusCode);
      toast.success("Register successful!");
      navigate("/auth/login");
    } catch (error) {
      toast.error("Register fail!");
    }
  };

  return (
    <RegisterForm
      initialValue={initialValue}
      onSubmitRegister={onSubmitRegister}
    />
  );
}

export default Register;
