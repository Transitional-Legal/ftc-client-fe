import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import Input from "components/forms/Input";
import Card from "components/Card";
import { Alert, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./finStatementSCSS.scss";

const initialValues = {
	family_name: "",
	given_names: ""
};

const FinStatementPartA = () => {
	const [formData, setFormData] = useState(initialValues);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		axios
			.get("https://api.transitionallegal.com.au/finstatement/parta", {
				params: { email: "saraskinner80@gmail.com" }
			})
			.then((response) => {
				console.log("RESPONSE PARTA");
				console.log(response);
				setFormData({
					family_name: response.data.family_name,
					given_names: response.data.given_name
				});
			})
			.catch((error) => setError(error))
			.finally(() => setLoading(false));
	}, []);

	const onSubmit = async (values, actions) => {
		// Convert the values object to a string for the alert
		const valuesString = JSON.stringify(values, null, 2);

		// Display the alert
		alert(`Data to be submitted:\n${valuesString}`);

		// You can comment out or remove the API call since you're just showing an alert for now
		// try {
		//     await api.open.post("/finstatement", values);
		//     actions.resetForm();
		// } catch (e) {
		//     console.log(e);
		//     actions.setErrors({ hidden: e });
		// }
		// actions.setSubmitting(false);
	};

	if (isLoading) {
		return <div>Loading...</div>; // Or use a spinner
	}

	if (error) {
		return <div>Error: {error.message}</div>; // Custom error component can be used
	}

	return (
		<div className="container py-5">
			<Card>
				<Alert variant="info">
					<Alert.Heading>Part A: About You</Alert.Heading>
					<p>This data has been pulled from our file. Please confirm it's correct.</p>
				</Alert>

				<Formik initialValues={formData} onSubmit={onSubmit}>
					{({ isSubmitting }) => (
						<Form>
							<Row>
								<Col md={6}>
									<Input name="family_name" label="Family Name" placeholder="Enter your family name" />
								</Col>
								<Col md={6}>
									<Input name="given_names" label="Given Names" placeholder="Enter your given names" />
								</Col>
							</Row>

							<div className="d-flex justify-content-end">
								<Button type="submit" disabled={isSubmitting} className="mt-3">
									{isSubmitting ? "Submitting..." : "Next"}
								</Button>
							</div>
						</Form>
					)}
				</Formik>
			</Card>
		</div>
	);
};

export default FinStatementPartA;
