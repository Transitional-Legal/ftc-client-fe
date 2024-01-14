import React from "react";
import { Formik, Form, Field } from "formik";
import Input from "components/forms/Input";
import Layout from "components/layout/Layout";
import Card from "components/Card";
import { Alert, Button, Row, Col } from "react-bootstrap";
import api from "apis/api";
import useSWR, { mutate } from "swr";
import Toggle from "components/forms/Toggle";

import "./AdminFinStatement.scss";

const initialValues = {
	title: "",
	their_ref: "",
	issued: "",
	deadline: ""
};

const parseSubmitValues = (v) => ({
	title: v.title,
	their_ref: v.their_ref,
	issued: v.issued,
	deadline: v.deadline
});

const AdminDocumentRequest = () => {
	// Save scroll position before refreshing the page
	window.addEventListener("beforeunload", () => {
		console.log("saving scroll position")

		localStorage.setItem("scrollPosition", window.scrollY);
		console.log(localStorage.getItem("scrollPosition"))
	});

	// Restore scroll position after the page is reloaded
	window.addEventListener("load", () => {
		console.log("restoring scroll position")
		const scrollPosition = localStorage.getItem("scrollPosition");
		console.log(scrollPosition)
		if (scrollPosition) {
			window.scrollTo(0, parseInt(scrollPosition));
			localStorage.removeItem("scrollPosition");
		}
	});

	// get the document summary

	const [data, setData] = React.useState(null);
	// const [query, setQuery] = React.useState(null);
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [step, setStep] = React.useState(0);

	const [employed, setEmployed] = React.useState(false);
	const [selfEmployed, setSelfEmployed] = React.useState(false);
	const [incomeFromBusiness, setIncomeFromBusiness] = React.useState(false);

	const part_a = {
		family_name: "Smith",
		given_names: "John",
		address_1: "123 Fake Street",
		address_2: "Fakeville",
		state: "NSW",
		postcode: "2000"
	};

	const part_c = {
		occupation: "Software Engineer",
		employed: true,
		income: "100000"
	};

	const prompts = [
		{
			c_3: "What is your current occupation?"
		}
	];

	// Post the .csv to the backend to parse
	const parseData = async () => {
		const { data } = await api.open.post(`/finstatement/parse`);
		console.log(data);
		setData(data);
		return data;
	};

	const query = async () => {
		const prompt = "What is Sarah's current occupation?";
		const { data } = await api.open.get(`http://localhost:8000/query/${prompt}`);
		console.log(data);
		setData(data.response);
		return data;
	};

	const onSubmit = async (values, actions) => {
		try {
			const parsedValues = parseSubmitValues(values);
			await api.open.post("/finstatement", parsedValues);
			// history.push("/");
		} catch (e) {
			console.log(e);
			actions.setErrors({ hidden: e });
			actions.setSubmitting(false);
		}
	};

	const { data: income } = useSWR(`http://localhost:8000/query/test`);
	console.log(income);

	return (
		<Layout navLinks={[]}>
			<div className="container py-5">
				<h1>Create a new Financial Statement</h1>

				{/* <Card>
					<Card.Body>
						<Card.Title>Part A</Card.Title>
						<Card.Text>
							<p>Part A is the personal details of the person who is filling out the form.</p>
							<p>These details are used to identify the person who is filling out the form.</p>
							<Alert variant="info">
								<p>Data pulled from our file. Please confirm they're correct</p>
							</Alert>
						</Card.Text>
					</Card.Body>
				</Card> */}

				<Card>
					<Alert variant="info">
						<Alert.Heading>Part A: About you</Alert.Heading>
						<p>This data has been pulled from our file. Please confirm it's correct.</p>
					</Alert>

					<Formik initialValues={initialValues} onSubmit={onSubmit}>
						{({ isSubmitting, errors }) => (
							<Form style={{ flex: 1, width: "100%" }}>
								<Input name="family_name" label="What is your family name as used now?" value={part_a?.family_name} />
								<Input name="given_names" label="Given names?" value={part_a?.given_names} />

								{/* <ErrorMessage error={errors.hidden} />
							<SubmitSpinnerButton submitText="Upload a document" isSubmitting={isSubmitting} />
							<SubmitSpinnerButton submitText="Submit" isSubmitting={isSubmitting} /> */}
							</Form>
						)}
					</Formik>
				</Card>

				<Card>
					<Alert variant="info">
						<Alert.Heading>Part C: Your employment details</Alert.Heading>
					</Alert>

					<Formik initialValues={initialValues} onSubmit={onSubmit}>
						{({ isSubmitting, errors }) => (
							<Form style={{ flex: 1, width: "100%" }}>
								<Input name="family_name" label="3: What is your current occupation?" value={income?.response} />

								<p>4: Are you employed?</p>
								<Toggle className="float-right" value={employed} setValue={() => setEmployed(!employed)} />

								<Input disabled={!employed} name="employer_name" label="5: What is the name of your employer?" />
								<Input disabled={!employed} name="employer_address" label="6: What is the address of your employer?" />

								<Input name="employer_duration" label="7: How long have you been at this place?" />

								<p>8: Are you self-employed?</p>
								<Toggle className="float-right" value={selfEmployed} setValue={() => setSelfEmployed(!selfEmployed)} />

								<Input disabled={!selfEmployed} name="self_employed" label="STATE THE NAME OF THE BUSINESS / COMPANY / PARTNERSHIP / TRUST" />
								{/* <ErrorMessage error={errors.hidden} />
								<SubmitSpinnerButton submitText="Upload a document" isSubmitting={isSubmitting} />
								<SubmitSpinnerButton submitText="Submit" isSubmitting={isSubmitting} /> */}
							</Form>
						)}
					</Formik>
				</Card>


				<Card>
					<Alert variant="info">
						<Alert.Heading>Part D: Your income</Alert.Heading>
					</Alert>

					<Formik initialValues={initialValues} onSubmit={onSubmit}>
						{({ isSubmitting, errors }) => (
							<Form style={{ flex: 1, width: "100%" }}>
								<Input name="salary_before_tax" label="9: What is your total salary or wages before tax?" value="E $45,000" />

								{/* <p>9: What is your total salary or wages before tax?</p> */}
								{/* <Toggle className="float-right" value={employed} setValue={() => setEmployed(!employed)} /> */}

								<Input name="investment_income_1" label="10. What is your weekly income from all your investments after tax? (e.g. rent, interest, divident)" />
								<div className="indentLeft">
								<Input name="investment_income_1_paidby" label="Who is this income paid by? (e.g. bank, mortgagor, company, tenant)" />



								</div>
								{/* <Input name="business_income_2" label="10.Do you have any other weekly inccome?" /> */}
								<p>11. Do you get any weekly income from businesses, partnerships, companyes or trusts? (e.g. rent, interest, divident) </p>
								<Toggle className="float-right" value={incomeFromBusiness} setValue={() => setIncomeFromBusiness(!incomeFromBusiness)} />

								{/* <Input name="investment_income_1" label="11. Do you get any weekly income from businesses, partnerships, companyes or trusts? (e.g. rent, interest, divident)" /> */}

								<div className="indentLeft">
								<Input name="business_income_2_paidby" label="If so who is this income paid by? (e.g. bank, mortgagor, company, tenant)" />

									<Input name="investment_income_1_paidby" label="What type of business does this income come from?" />
									<Input
										name="nameOfBusiness"
										label="What is the name of this busines/company/partnership/trust?"
									/>
									
									<Input
										name="addressOfBusiness"
										label="Waht is the address?"
									/>
									<Row>
										<Col>
											<Input
												name="stateOfBusiness"
												label="State"
											/>
										</Col>
										<Col>
											<Input
												name="postcodeOfBusiness"
												label="Postcode"
											/>
										</Col>
									</Row>
								</div>









								<Input
									name="incomeFromBusiness"
									label="11. Do you get any weekly income from businesses, partnerships, companies or trusts? (e.g., rent, interest, dividend)"
								/>
								<Input
									name="typeOfIncomeBusiness"
									label="What type of business does this income come from?"
								/>


								<Input name="business_income_2" label="10.Do you have any other weekly inccome?" />
								<Input name="business_income_2_paidby" label="If so who is this income paid by? (e.g. bank, mortgagor, company, tenant)" />



								<Input name="employer_address" label="6: What is the address of your employer?" />

								<Input name="employer_duration" label="7: How long have you been at this place?" />

								<p>8: Are you self-employed?</p>
								<Toggle className="float-right" value={selfEmployed} setValue={() => setSelfEmployed(!selfEmployed)} />

								<Input disabled={!selfEmployed} name="self_employed" label="STATE THE NAME OF THE BUSINESS / COMPANY / PARTNERSHIP / TRUST" />
								{/* <ErrorMessage error={errors.hidden} />
								<SubmitSpinnerButton submitText="Upload a document" isSubmitting={isSubmitting} />
								<SubmitSpinnerButton submitText="Submit" isSubmitting={isSubmitting} /> */}
							</Form>
						)}
					</Formik>
				</Card>

				{/* <Button>Next</Button> */}

				<Button onClick={query}>Query documents</Button>
			</div>
		</Layout>
	);
};

export default AdminDocumentRequest;
