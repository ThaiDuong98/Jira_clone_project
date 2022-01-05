import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import InputField from "../CustomTextfield";
import CustomButton from "../CustomButton";

const schema = yup
  .object({
    email: yup.string().required("Required"),
    passWord: yup.string().required("Required"),
  })
  .required();

function LoginForm({ onSubmitLogin, initialValue }) {
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
      </Card>
    </Box>
  );
}

export default LoginForm;
