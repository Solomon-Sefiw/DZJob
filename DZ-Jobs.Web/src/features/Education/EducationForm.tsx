import { Box, Button, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import { useCallback } from "react";
import * as yup from "yup";
import { EducationDto } from "../../app/api";
import { EducationLevel } from "../../app/api/enums";
import { Errors, FormSelectField, FormTextField } from "../../components";
import { YupShape } from "../../utils";


const initialValues: EducationDto = {
    userId: "",
    educationLevel: 14,
    schoolName: "",
    schoolCity: "",
    fieldOfStudy: "",
};

const validationSchema = yup.object<YupShape<EducationDto>>({
    startDate: yup.date().required("Start Date is required"),
    endDate: yup.date().required("End Date is required"),
    schoolName: yup.string().required("School Name is required"),
    schoolCity: yup.string().required("School City is required"),
    fieldOfStudy: yup.string().required("Field of Study is required"),
    graduationDate: yup.date().required("Graduation Date is required"),
});

interface Props {
    onCancel?: () => void;
    onSubmit: (education: EducationDto) => void;
    errors?: any;
}

export const EducationForm = ({ onCancel, onSubmit, errors }: Props) => {
    const handleSubmit = useCallback(
        async (values: EducationDto) => {
            console.log("Submitting form with values:", values);
            onSubmit(values);
        },
        [onSubmit]
    );

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            validateOnChange={true}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Grid container spacing={3}>
                        {errors && (
                            <Grid item xs={12}>
                                <Errors errors={errors} />
                            </Grid>
                        )}
                        <Grid item xs={12}>
                        <FormSelectField
                      name="educationLevel"
                      label="Education Level"
                      options={[
                        {
                          label: "Bachelor",
                          value: EducationLevel.Bachelor,
                        },
                        {
                          label: "Master",
                          value: EducationLevel.Master,
                        },
                      ]}
                    />
                        </Grid>
                        <Grid item xs={12}>
                            <FormTextField
                                name="startDate"
                                type="date"
                                label="Start Date"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormTextField
                                name="endDate"
                                type="date"
                                label="End Date"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormTextField
                                name="schoolName"
                                type="text"
                                placeholder="School Name"
                                label="School Name"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormTextField
                                name="schoolCity"
                                type="text"
                                placeholder="School City"
                                label="School City"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormTextField
                                name="fieldOfStudy"
                                type="text"
                                placeholder="Field of Study"
                                label="Field of Study"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormTextField
                                name="graduationDate"
                                type="date"
                                label="Graduation Date"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                disabled={isSubmitting}
                                fullWidth
                                sx={{ textTransform: "none", padding: "10px" }}
                            >
                                Create Education Entry
                            </Button>
                        </Grid>
                        {onCancel && (
                            <Grid item xs={12}>
                                <Box sx={{ mt: 2, textAlign: "center" }}>
                                    <Button onClick={onCancel} color="secondary" sx={{ textTransform: "none" }}>
                                        Cancel
                                    </Button>
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};
