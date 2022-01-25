import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../../../components/CustomTextfield";
import { useSelector, useDispatch } from "react-redux";
import Slider from "@mui/material/Slider";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Button,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import SelectField from "../../../components/SelectField";
import { getAssignUsers, getProjectDetail } from "../projectSlice";
import MultipleSelect from "../../../components/MultipleSelectField";
import TextEditer from "../../../components/TextEditer";

const validateTaskSchema = yup.object({
  projectId: yup.string().required("Please select project"),
  taskName: yup.string().required("Please enter task name"),
  statusId: yup.string().required("Please select status"),
  priorityId: yup.string().required("Please select prority"),
  typeId: yup.string().required("Please select task type"),
  description: yup.string().required("Please enter description"),
});

const TaskForm = (props) => {
  const {
    myProjects,
    initialValues,
    onCloseDialog,
    listStatus,
    priorities,
    listTaskType,
    onSubmitTaskForm,
  } = props;
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validateTaskSchema),
  });

  const selectedProjectId = watch("projectId");
  const timeSpent = +watch("timeTrackingSpent");
  const timeRemaining = +watch("timeTrackingRemaining");
  const dispatch = useDispatch();
  const { assignUsers } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(getProjectDetail(selectedProjectId));
    //from selected project id get all member belong to this project
    dispatch(getAssignUsers(selectedProjectId));
  }, [dispatch, selectedProjectId]);

  //get list user to assign to project (from selected project get all member)
  // console.log({ assignUsers });

  const handleSubmitTaskFrom = (values) => {
    if (onSubmitTaskForm) {
      onSubmitTaskForm(values);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(handleSubmitTaskFrom)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SelectField
              name="projectId"
              control={control}
              label="Project"
              options={
                myProjects &&
                myProjects.map((project) => ({
                  id: project.id,
                  label: project.projectName,
                  value: project.id,
                }))
              }
            />
            <FormHelperText>{errors.projectId?.message}</FormHelperText>
          </Grid>
          <Grid item xs={12}>
            <InputField
              control={control}
              name="taskName"
              type="text"
              label="Task Name"
              errors={errors.taskName?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectField
              control={control}
              label="Status"
              name="statusId"
              options={
                listStatus &&
                listStatus.map((status) => ({
                  id: status.statusId,
                  label: status.statusName,
                }))
              }
            />
            <FormHelperText>{errors.status?.message}</FormHelperText>
          </Grid>
          <Grid item xs={6}>
            <SelectField
              control={control}
              label="Priority"
              name="priorityId"
              options={
                priorities &&
                priorities.map((priority) => ({
                  id: priority.priorityId,
                  label: priority.priority,
                }))
              }
            />
            <FormHelperText>{errors.priority?.message}</FormHelperText>
          </Grid>
          <Grid item xs={6}>
            <SelectField
              control={control}
              name="typeId"
              label="Task Type"
              options={
                listTaskType &&
                listTaskType.map((tasktype) => ({
                  id: tasktype.id,
                  label: tasktype.taskType,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <MultipleSelect
              control={control}
              name="listUserAsign"
              label="Assignees"
              names={assignUsers?.map((member) => ({
                id: member.userId,
                label: member.name,
                value: member.userId,
              }))}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>Time Tracking</Typography>
            <Slider
              value={timeSpent}
              aria-label="Default"
              valueLabelDisplay="auto"
              max={timeSpent + timeRemaining}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="caption">{timeSpent}h logged</Typography>
              <Typography variant="caption">
                {timeRemaining}h remaining
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <InputField
              label="Original Estimane"
              name="originalEstimate"
              control={control}
              type="number"
            />
          </Grid>
          <Grid item xs={3}>
            <InputField
              control={control}
              type="number"
              label="Time Spent"
              name="timeTrackingSpent"
            />
          </Grid>
          <Grid item xs={3}>
            <InputField
              control={control}
              type="number"
              label="Time Remaining"
              name="timeTrackingRemaining"
            />
          </Grid>

          <Grid item xs={12}>
            <FormLabel>Description</FormLabel>
            <TextEditer
              setValue={setValue}
              name="description"
              initialValue={initialValues?.description}
            />
            <FormHelperText>{errors.description?.message}</FormHelperText>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            size="small"
            onClick={onCloseDialog}
            sx={{ mt: 1, mb: 2, mr: 1 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{ mt: 1, mb: 2 }}
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default TaskForm;
