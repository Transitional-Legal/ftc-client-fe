import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "apis/api";
import "./UserDetailsForm.scss";
import { Button } from "react-bootstrap";

// Create a form that allows users to enter their name, DOB, Address, and Phone Number.

// Validation Schema
const validationSchema = Yup.object({
	firstName: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
	middleName: Yup.string().max(15, "Must be 15 characters or less"),
	lastName: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
	dob: Yup.date().max(new Date(), "Must be a valid date and not in the future").required("Required"),
	address: Yup.string().required("Required"),
	city: Yup.string().required("Required"),
	phoneNumber: Yup.number().required("Required")
});

const renderField = (name, label, type, formik) => (
	<div className="form-field">
		<label htmlFor={name}>{label}</label>
		<input
			id={name}
			name={name}
			type={type}
			onChange={formik.handleChange}
			value={formik.values[name]}
			className={formik.errors[name] && formik.touched[name] ? "error" : ""}
		/>
		{formik.errors[name] && formik.touched[name] ? <div className="error-message">{formik.errors[name]}</div> : null}
	</div>
);

const UserDetailsForm = ({ afterSubmit, iv }) => {
	const formik = useFormik({
		initialValues: {
			firstName: iv?.firstName || "",
			middleName: iv?.middleName || "",
			lastName: iv?.lastName || "",
			dob: iv?.dob || "",
			address: "",
			city: "",
			phoneNumber: ""
		},
		validationSchema,
		onSubmit: (values) => submitToAPI(values)
	});

	// Function to handle API submission
	const submitToAPI = (values) => {
		console.log(values);

		// todo build a backend function that will update the users details at action step.
		api
			.post("/user", values)
			.then((response) => {
				console.log(response.data);
				// Close the modal after successful data submission
				afterSubmit();
			})
			.catch((error) => {
				console.error(error);
				// Handle errors (like showing a notification to the user)
			});
	};

	return (
		<div className="form-container">
			<form onSubmit={formik.handleSubmit} className="user-details-form">
				{renderField("firstName", "First Name", "text", formik)}
				{renderField("middleName", "Middle Name", "text", formik)}
				{renderField("lastName", "Last Name", "text", formik)}
				{renderField("dob", "DOB", "date", formik)}
				{renderField("address", "Street Address", "text", formik)}
				{renderField("city", "City/Suburb", "text", formik)}
				{renderField("phoneNumber", "Phone Number", "text", formik)}

				<Button type="submit">Save Changes</Button>
			</form>
		</div>
	);
};
export default UserDetailsForm;
