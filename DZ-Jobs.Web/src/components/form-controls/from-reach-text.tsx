
import { Box } from "@mui/material";
import { useField, useFormikContext } from "formik";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

interface FormRichTextProps {
  name: string;
  alwaysShowError?: boolean;
  placeholder?: string;
}

export const FormRichTextField = ({
  name,
  alwaysShowError,
  placeholder = "Enter job description...",
  ...others
}: FormRichTextProps) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (value: any) => {
    setFieldValue(name, value); // Update Formik's field value when Quill content changes
  };

  return (
    <Box sx={{ width: "100%" }}>
      <ReactQuill
        value={field.value || ""}
        onChange={handleChange}
        theme="snow"
        placeholder={placeholder}
        {...others} // Allow other props like styles or classes to be passed down
      />
      {(meta.touched || alwaysShowError) && meta.error && (
        <div style={{ color: "red", marginTop: 8 }}>{meta.error}</div>
      )}
    </Box>
  );
};
