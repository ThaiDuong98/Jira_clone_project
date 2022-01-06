import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import InputField from "../CustomTextfield";
import CustomButton from "../CustomButton";
import { Link } from "react-router-dom";
import { useStyle } from "../../assets/styles/useStyle";

const schema = yup
  .object({
    email: yup.string().required("Required").email("Mail is invalid"),
    passWord: yup
      .string()
      .required("Required")
      .min(8, "password have to at least 8 character"),
    name: yup
      .string()
      .required("Required")
      .min(2, "Name must be at least 2 characters"),
    phoneNumber: yup
      .number()
      .required("Required")
      .typeError("Phone must be a number")
      .positive()
      .integer()
      .test("Phone number is invalid.", (val) => val.toString().length === 10),
  })
  .required();

function RegisterForm({ initialValue, onSubmitRegister }) {
  const classes = useStyle();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });

  return (
    <Box sx={{ paddingTop: "50px" }}>
      <Card
        sx={{
          margin: "0 auto",
          maxWidth: 400,
          padding: "8px 0px 6px",
        }}
      >
        <Typography variant="h4" align="center">
          Register
        </Typography>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmitRegister)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputField
                  name="email"
                  type="email"
                  control={control}
                  label="Email"
                  errors={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  name="passWord"
                  control={control}
                  label="Password"
                  type="password"
                  errors={errors.passWord?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  name="name"
                  control={control}
                  label="Name"
                  type="text"
                  errors={errors.name?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  name="phoneNumber"
                  control={control}
                  label="Phone Number"
                  type="text"
                  errors={errors.phoneNumber?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomButton type="submit" fullWidth variant="contained">
                  Register
                </CustomButton>
              </Grid>
            </Grid>
          </form>
        </CardContent>
        <Typography align="center">
          <Link to="/auth/login" className={classes.link}>
            Do you already have an account ?. Please click here to login
          </Link>
        </Typography>
      </Card>
    </Box>
  );
}

export default RegisterForm;
