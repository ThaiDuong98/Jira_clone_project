import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import InputField from "../CustomTextfield";
import CustomButton from "../CustomButton";
import { useStyle } from "../../assets/styles/useStyle";

const schema = yup
  .object({
    email: yup.string().required("Required").email("Mail is invalid"),
    passWord: yup.string().required("Required"),
  })
  .required();

function LoginForm({ onSubmitLogin, initialValue }) {
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
          Login
        </Typography>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmitLogin)}>
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
                <CustomButton type="submit" fullWidth variant="contained">
                  Login
                </CustomButton>
              </Grid>
            </Grid>
          </form>
        </CardContent>
        <Typography align="center">
          <Link to="/auth/register" className={classes.link}>
            Do you already have an account? Log in
          </Link>
        </Typography>
      </Card>
    </Box>
  );
}

export default LoginForm;
