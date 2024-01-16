import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import Input from "components/forms/Input";
import Toggle from "components/forms/Toggle";
import Card from "components/Card";
import { Alert, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./finStatementSCSS.scss";

const FinStatementPartC = () => {
	const [employed, setEmployed] = useState(true);
	const [selfEmployed, setSelfEmployed] = useState(false);

	const initialValues = {
		fs_partC_id: "",
		fs_partC_name: "",
		fs_partC_initials: "",
		fs_partC_type: "",
		fs_partC_etag: "",
		fs_partC_occupation: "Software Developer",
		fs_partC_employer: "Tech Corp",
		fs_partC_employed: true,
		fs_partC_self_employed: false,
		fs_partC_employer_name: "Tech Corp",
		fs_partC_employer_address: "11 Athlone Street, Prahran VIC 3181",
		fs_partC_employer_duration: "4 years",
		fs_partC_self_employed_name: ""
	};

	const [formData, setFormData] = useState(initialValues);

	const onSubmit = async (values, actions) => {
		try {
			console.log("Form Values:", values);
			actions.resetForm();
			actions.setSubmitting(false);
		} catch (e) {
			console.log(e);
			actions.setErrors({ hidden: e });
			actions.setSubmitting(false);
		}
	};

	useEffect(() => {
		const mockResponse = {
			occupation: "Software Developer",
			employer: "Tech Corp",
			employed: true,
			type: "Full-Time",
		
		};

		setFormData({
			...initialValues,
			fs_partC_occupation: mockResponse.occupation,
			fs_partC_employer: mockResponse.employer,
			fs_partC_employed: mockResponse.employed,
			fs_partC_self_employed: mockResponse.self_employed
		});
	}, []);

	return (
		<div className="container py-5">
			<Card>
				<Alert variant="info">
					<Alert.Heading>Part C: Your employment details</Alert.Heading>
				</Alert>

				<Formik initialValues={formData} onSubmit={onSubmit} enableReinitialize={true}>
					{({ isSubmitting, errors }) => (
						<Form>
							<div className="subSection">
								<Row className="mb-3">
									<Col>
										<Input name="fs_partC_occupation" label="3: What is your current occupation?" />
									</Col>
								</Row>
							</div>

							<div className="subSection">
								<Row className="mb-3">
									<Col xs={9}>
										<p>4: Are you employed?</p>
									</Col>
									<Col xs={3}>
										<Toggle className="float-right" value={employed} setValue={() => setEmployed(!employed)} />
									</Col>
								</Row>

								{employed && (
									<>
										<Row className="mb-3">
											<Col>
												<Input name="fs_partC_employer_name" label="5: What is the name of your employer?" />
											</Col>
										</Row>
										<Row className="mb-3">
											<Col>
												<Input name="fs_partC_employer_address" label="6: What is the address of your employer?" />
											</Col>
										</Row>
										<Row className="mb-3">
											<Col>
												<Input name="fs_partC_employer_duration" label="7: How long have you been at this place?" />
											</Col>
										</Row>
									</>
								)}
							</div>

							<Row className="mb-3">
								<Col xs={9}>
									<p>8: Are you self-employed?</p>
								</Col>
								<Col xs={3}>
									<Toggle className="float-right" value={selfEmployed} setValue={() => setSelfEmployed(!selfEmployed)} />
								</Col>
							</Row>

							<div className="subSection">
								{selfEmployed && (
									<Row className="mb-3">
										<Col>
											<Input name="fs_partC_self_employed_name" label="What is the name of the business?" />
										</Col>
									</Row>
								)}
							</div>

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

export default FinStatementPartC;
