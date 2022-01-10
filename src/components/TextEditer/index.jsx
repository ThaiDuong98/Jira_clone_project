import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

function TextEditer({ setValue, name, initialValue }) {
  const handleEditorChange = (content) => {
    //console.log(content);
    setValue(name, content);
  };

  return (
    <Editor
      initialValue={initialValue}
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
      onEditorChange={handleEditorChange}
    />
  );
}

export default TextEditer;
