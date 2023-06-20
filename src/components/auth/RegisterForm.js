import React, { useContext } from "react";
import { Formik, Form } from "formik";
import { isEmail } from "validator";
import Input from "components/forms/Input";
import SubmitSpinnerButton from "components/forms/SubmitSpinnerButton";
import api from "apis/api";
import ErrorMessage from "components/ErrorMessage";
import { AuthContext } from "components/auth/Auth";
import { minPasswordLength } from "constants/index";
import { useHistory } from "react-router-dom";
import "./RegisterForm.scss";

const defaultValues = {
	firstName: "",
	lastName: "",
	email: "",
	password: ""
};

const parseSubmitValues = (v) => ({
	firstName: v.firstName,
	lastName: v.lastName,
	email: v.email,
	password: v.password
});

const validate = ({ email, password, firstName, lastName }) => {
	const requiredMsg = "This field is required";
	const errors = {};

	// Required fields
	if (!email) errors.email = requiredMsg;
	if (!password) errors.password = requiredMsg;
	if (!firstName) errors.firstName = requiredMsg;
	if (!lastName) errors.lastName = requiredMsg;

	// Formatting
	if (!isEmail(email)) errors.email = "Please enter a valid email";
	if (password.length < minPasswordLength) errors.password = `Password must be at least ${minPasswordLength} characters`;

	return errors;
};

const RegisterForm = ({ initialValues: _iv, logo }) => {
	const initialValues = { ...defaultValues, ..._iv };
	const { login } = useContext(AuthContext);
	const history = useHistory();
	const onSubmit = async (values, actions) => {
		try {
			const parsedValues = parseSubmitValues(values);
			await api.open.post("/users", parsedValues);
			login({
				username: parsedValues.email,
				password: parsedValues.password
			});
			history.push("/");
		} catch (e) {
			console.log(e);
			actions.setErrors({ hidden: e });
			actions.setSubmitting(false);
		}
	};

	return (
		<Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
			{({ isSubmitting, errors }) => (
				<Form style={{ flex: 1, width: "100%" }}>
					<Input name="firstName" placeholder="First Name" disabled={initialValues?.firstName} />
					<Input name="lastName" placeholder="Last Name" disabled={initialValues?.lastName} />
					<Input name="email" placeholder="Your email address" disabled={initialValues?.email} />
					<Input name="password" type="password" placeholder="Password" />
					<ErrorMessage error={errors.hidden} />
					<SubmitSpinnerButton submitText="Join" isSubmitting={isSubmitting} />
				</Form>
			)}
		</Formik>
	);
};

export default RegisterForm;
