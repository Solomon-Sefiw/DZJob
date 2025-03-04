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
        {...others}
        style={{
          // Customize Quill editor styling
          backgroundColor: "#121212", // Dark background for dark mode
          color: "#fff", // Light text for dark mode
        }}
        modules={{
          toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline'],
            ['link'],
            [{ 'align': [] }],
            ['image'],
          ],
        }}
      />
      {(meta.touched || alwaysShowError) && meta.error && (
        <div style={{ color: "red", marginTop: 8 }}>{meta.error}</div>
      )}
    </Box>
  );
};
