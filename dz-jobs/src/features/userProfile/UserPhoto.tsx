import { Avatar, Box } from "@mui/material";
import { useCallback } from "react";
import { DocumentUpload } from "../../components/DocumentUpload";
import { useAlert } from "../notification";
import { DzJobUserDto, useAddUserPhotoMutation } from "../../app/services/DZJobsApi";

interface EmployeePhotoProps {
  user?: DzJobUserDto;
}

export const UserPhoto = ({ user }: EmployeePhotoProps) => {
  const [savePhoto, { isLoading }] = useAddUserPhotoMutation();
  const { showErrorAlert, showSuccessAlert } = useAlert();

  // Callback to handle profile picture upload
  const onProfilePictureAdd = useCallback(
    async (files: File[]) => {
      if (!files[0] || files[0].size === 0) {
        showErrorAlert("Please select a valid image file.");
        return;
      }
  
      if (user?.id) {
        const formData = new FormData();
        formData.append("file", files[0]); // Append binary file
  
        try {
          await savePhoto({
            id: user.id, // Ensure user ID is passed correctly
            body: { File: files[0] }, // Send file directly
          }).unwrap();
  
          showSuccessAlert("Photo uploaded successfully.");
        } catch (error) {
          showErrorAlert("An error occurred while uploading the photo.");
        }
      }
    },
    [savePhoto, user, showErrorAlert, showSuccessAlert]
  );
  

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Avatar
          sx={{ width: 100, height: 100 }}
          src={user?.photoUrl || undefined}
          alt={user?.userName || "Employee"}
          variant="rounded"
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <DocumentUpload
          onAdd={onProfilePictureAdd}
          label={user?.photoUrl ? "Change photo" : "Add photo"}
          showIcon={false}
          size="small"
          accepts={["Image"]} // Explicitly accept image files
          disabled={isLoading} // Disable if uploading
        />
      </Box>
    </>
  );
};
