import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import Input from "components/forms/Input";
import Layout from "components/layout/Layout";
import Card from "components/Card";
import { Alert, Button } from "react-bootstrap";
import api from "apis/api";
import useSWR, { mutate } from "swr";
import Toggle from "components/forms/Toggle";

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

const FinStatement = () => {
	// get the document summary

	const part_c = {
		employer: "", // 5 What is the name of your employer?
		occupation: "", // 3 What is your current occupation?
		employed: true, // 4 Are you employed?
		employment_type: "",
		employer_address: {
			address_1: "",
			address_2: "",
			state: "",
			postcode: "",
			phone: ""
		}, // What is the address of your employer?
		employer_duration: 0,
		self_employed: false, // 8 Are you self-employed?
	};

	const [data, setData] = React.useState(null);
	const [partC, setPartC] = React.useState(part_c);

	// const [query, setQuery] = React.useState(null);
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [step, setStep] = React.useState(0);

	const [employed, setEmployed] = React.useState(false);
	const [selfEmployed, setSelfEmployed] = React.useState(false);

	const part_a = {
		family_name: "Smith",
		given_names: "John",
		address_1: "123 Fake Street",
		address_2: "Fakeville",
		state: "NSW",
		postcode: "2000"
	};

	const prompts = [
		{
			c_3: "What is your current occupation?"
			// What is the name of your employer?
		}
	];

	useEffect(() => {
		getPartC();
	}, []);

	const getPartC = async () => {
		const { data } = await api.open.get(`/finstatement/part_c`);
		console.log(data);
		setData(data);
		return data;
	};

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

				

				{/* <Button>Next</Button> */}

				<Button onClick={query}>Query documents</Button>
			</div>
		</Layout>
	);
};

export default FinStatement;
