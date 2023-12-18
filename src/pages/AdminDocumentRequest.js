import React from "react";
import { useSearchParams } from "react-router-dom";
import { Formik, Form } from "formik";
import Input from "components/forms/Input";
import Layout from "components/layout/Layout";
import Card from "components/Card";
import { Alert, Button } from "react-bootstrap";
import DocumentRequestForm from "components/documents/DocumentRequestForm";
import useSWR from "swr";

const initialValues = {
	date: "",
	notes: ""
};

const AdminDocumentRequest = () => {
	// get the document summary

	const onSubmit = async (values, actions) => {
		try {
			// const parsedValues = parseSubmitValues(values);
			// await api.open.post("/documents", parsedValues);
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
				<Button>Attach Letter from the other side</Button>

				<Formik initialValues={initialValues} onSubmit={onSubmit}>
					{({ isSubmitting, errors }) => (
						<Form style={{ flex: 1, width: "100%" }}>
							<Input name="title" label="Document title" placeholder="" />
							<Input name="their_ref" label="Their Ref" placeholder="" />
							<Input name="issued" label="Issued Date" placeholder="" />
							<Input name="deadline" label="Deadline" placeholder="" />
							<Input name="summary" label="Summary" placeholder="" />
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
