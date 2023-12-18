import React from "react";
import { Formik, Form } from "formik";
import Input from "components/forms/Input";
import Layout from "components/layout/Layout";
import Card from "components/Card";
import { Alert, Button } from "react-bootstrap";
import api from "apis/api";

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
	// get the document summary

	const [data, setData] = React.useState(null);
	const [isSubmitting, setIsSubmitting] = React.useState(false);

	const getSummary = async () => {
		const { data } = await api.open.post(`/documents/parse`);
		console.log(data);
		setData(data);
		return data;
	};

	const onSubmit = async (values, actions) => {
		try {
			const parsedValues = parseSubmitValues(values);
			await api.open.post("/documents", parsedValues);
			// history.push("/");
		} catch (e) {
			console.log(e);
			actions.setErrors({ hidden: e });
			actions.setSubmitting(false);
		}
	};

	return (
		<Layout navLinks={[]}>
			<div className="container py-5">
				<h1>Create a new Document Request response</h1>
				<Button onClick={getSummary}>Attach Letter from the other side</Button>

				<Formik initialValues={initialValues} onSubmit={onSubmit}>
					{({ isSubmitting, errors }) => (
						<Form style={{ flex: 1, width: "100%" }}>
							<Input name="title" label="Document title" value={data?.title} />
							<Input name="their_ref" label="Their Ref" value={data?.their_ref} />
							<Input name="issued" label="Issued Date" value={data?.issued} />
							<Input name="deadline" label="Deadline" value={data?.deadline} />
							<Input name="summary" label="Summary of the request" value={data?.summary} />
							{/* <ErrorMessage error={errors.hidden} />
							<SubmitSpinnerButton submitText="Upload a document" isSubmitting={isSubmitting} />
							<SubmitSpinnerButton submitText="Submit" isSubmitting={isSubmitting} /> */}
						</Form>
					)}
				</Formik>

				<Button>Next</Button>
			</div>
		</Layout>
	);
};

export default AdminDocumentRequest;
