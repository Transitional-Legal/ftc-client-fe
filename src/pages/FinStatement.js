import React from "react";
import { Formik, Form, Field } from "formik";
import Input from "components/forms/Input";
import Layout from "components/layout/Layout";
import Card from "components/Card";
import { Alert, Button } from "react-bootstrap";
import api from "apis/api";
import useSWR, { mutate } from "swr";
import Table from "components/Table";

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

// dataField (key) props (value)
const columnConfig = {
	name: {
		children: "Name",
		width: "30%"
	},
	age: {
		children: "Age"
	},
	relationship: {
		children: "Relationship"
	},
	amount: {
		children: "Average Weekly Amount"
	},
};

const FinStatement = () => {
	// get the document summary

	const [data, setData] = React.useState(null);
	// const [query, setQuery] = React.useState(null);
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [step, setStep] = React.useState(0);
	const [partF, setPartF] = React.useState(null);

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
		income: "100000"
	};

	const part_e = [];

	const prompts = [
		{
			c_3: "What is your current occupation"
		}
	];

	const _earners = [
		{
			name: "John Smith",
			age: "30",
			relationship: "Partner",
			amount: "1000"
		}
	];

	const [earners, setEarners] = React.useState(_earners);

	// Post the .csv to the backend to parse
	const getData = async () => {
		const { data } = await api.open.post(`/finstatement/parse`);
		setData(data);
		return data;
	};

	const query = async () => {
		const prompt = "What is Sarah's current occupation?";
		const { data } = await api.open.get(`/query/${prompt}`);
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

	const addEarner = () => {
		setEarners([...earners, {
			name: "John Smith",
			age: "30",
			relationship: "Partner",
			amount: "1000"
		}]);
	}

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
								<Input name="family_name" label="3: What is your current occupation" value={income?.response} />
								<Input name="given_names" label="4: Are you employed?" />

								{/* <ErrorMessage error={errors.hidden} />
							<SubmitSpinnerButton submitText="Upload a document" isSubmitting={isSubmitting} />
							<SubmitSpinnerButton submitText="Submit" isSubmitting={isSubmitting} /> */}
							</Form>
						)}
					</Formik>
				</Card>

				<Card>
					<Alert variant="info">
						<Alert.Heading>Part E: Other income earners in your household</Alert.Heading>
						<p>Give the name, age and relationship to you and gross income of each other occupant in your house hold</p>
					</Alert>

					<Table>
						data={earners}
						columnConfig={columnConfig}
						keyField="id" className="address-table"
					</Table>

					<Formik initialValues={initialValues} onSubmit={onSubmit}>
						{({ isSubmitting, errors }) => (
							<Form style={{ flex: 1, width: "100%" }}>
								<Input name="name" label="Name" />
								<Input name="age" label="Age" />
								<Input name="relationship" label="Relationship to you" />
								<Input name="amount" label="Average weekly amount" />
							</Form>
						)}
					</Formik>

					<Button onClick={addEarner}>Add Earner</Button>
				</Card>

				{/* <Button>Next</Button> */}

				<Button onClick={query}>Query documents with AI</Button>
			</div>
		</Layout>
	);
};

export default FinStatement;
