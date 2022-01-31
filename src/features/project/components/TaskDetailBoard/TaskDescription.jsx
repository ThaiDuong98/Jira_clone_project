import React, { useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";

const TaskDescription = ({
  task = {},
  isEditDescription,
  setEditDescription,
  handleEditDescription,
}) => {
  const [description, setDescription] = useState(task.description);
  // console.log(description);

  const onEditDescription = () => {
    if (handleEditDescription) {
      handleEditDescription(description);
    }
  };
  return (
    <>
      <Typography sx={{ fontSize: "1rem", fontWeight: "405" }}>
        Description
      </Typography>
      {isEditDescription ? (
        <Box>
          <Editor
            initialValue={task.description}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image",
                "charmap print preview anchor help",
                "searchreplace visualblocks code",
                "insertdatetime media table paste wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic | \
             alignleft aligncenter alignright | \
             bullist numlist outdent indent | help",
            }}
            onEditorChange={(value) => setDescription(value)}
          />
          <Box sx={{ mt: 1 }}>
            <Button
              sx={{ mr: 2 }}
              variant="contained"
              color="primary"
              onClick={onEditDescription}
            >
              Save
            </Button>
            <Button onClick={() => setEditDescription(false)} color="primary">
              Cancel
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{ "&:hover": { backgroundColor: "#f4f5f7" }, p: 1 }}
          dangerouslySetInnerHTML={{ __html: task.description }}
          onClick={() => setEditDescription(true)}
        />
      )}
    </>
  );
};

export default TaskDescription;
