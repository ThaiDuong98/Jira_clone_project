import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../../../components/CustomTextfield";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import TextEditer from "../../../components/TextEditer";
import SelectField from "../../../components/SelectField";
import { getAllCategory } from "../projectSlice";

const schema = yup
  .object({
    projectName: yup.string().required("Required"),
    description: yup.string().required("Required"),
    categoryId: yup.string().required("Required"),
  })
  .required();

function ProjectForm({
  onSubmitProjectForm,
  initialValue = {
    projectName: "",
    description: "",
    categoryId: "",
  },
  setOpen,
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });
  const { categories } = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmitProjectForm)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputField
              name="projectName"
              type="text"
              control={control}
              label="Project Name"
              errors={errors.projectName?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <FormLabel>Description</FormLabel>
            <TextEditer
              setValue={setValue}
              name="description"
              initialValue={initialValue?.description}
            />
            <FormHelperText>{errors.description?.message}</FormHelperText>
          </Grid>
          <Grid item xs={12}>
            <SelectField
              name="categoryId"
              control={control}
              label="Category"
              options={
                categories &&
                categories.map((category) => ({
                  id: category.id,
                  label: category.projectCategoryName,
                }))
              }
            />
            <FormHelperText>{errors.categoryId?.message}</FormHelperText>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            type="submit"
            variant="outlined"
            sx={{ mt: 1, mb: 2, mr: 1 }}
            size="small"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
            size="small"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default ProjectForm;
