import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import Input from "components/forms/Input";
import Layout from "components/layout/Layout";
import Card from "components/Card";
import { Alert, Button, Row, Col } from "react-bootstrap";
import api from "apis/api";
import useSWR, { mutate } from "swr";
import Toggle from "components/forms/Toggle";
import axios from "axios";

import FinStatementPartA from "components/finstatementformsections/finStatementPartA";
import FinStatementPartD from "components/finstatementformsections/finStatementPartD";

import "./AdminFinStatement.scss";
import FinStatementPartC from "components/finstatementformsections/finStatementPartC";
import FinStatementPartE from "components/finstatementformsections/finStatementPartE";
import FinStatementPartF from "components/finstatementformsections/finStatementPartF";
import FinStatementPartG from "components/finstatementformsections/finStatementPartG";

// Developer Note:
// For consistent naming of form fields across all form sections, please follow this pattern:
// fs_partA_field_name
// fs_partB_field_name
// fs_partC_field_name
// fs_partD_field_name
// etc.
// This pattern helps in maintaining uniformity and readability in our form field naming conventions.

const initialValues = {
	title: "",
	their_ref: "",
	issued: "",
	deadline: "",
	income: ""
};

const parseSubmitValues = (v) => ({
	title: v.title,
	their_ref: v.their_ref,
	issued: v.issued,
	deadline: v.deadline
});

const FinStatement = () => {
	// Save scroll position before refreshing the page
	window.addEventListener("beforeunload", () => {
		console.log("saving scroll position");

		localStorage.setItem("scrollPosition", window.scrollY);
		console.log(localStorage.getItem("scrollPosition"));
	});

	// Restore scroll position after the page is reloaded
	window.addEventListener("load", () => {
		console.log("restoring scroll position");
		const scrollPosition = localStorage.getItem("scrollPosition");
		console.log(scrollPosition);
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

	return (
		<Layout navLinks={[]}>
			<div className="container py-5">
				<h1>Create a new Financial Statement</h1>

				<FinStatementPartA></FinStatementPartA>

				<FinStatementPartC></FinStatementPartC>

				<FinStatementPartD></FinStatementPartD>

				<FinStatementPartE></FinStatementPartE>

				<FinStatementPartF></FinStatementPartF>

				<FinStatementPartG></FinStatementPartG>

				{/* <Button>Next</Button> */}

				<Button onClick={query}>Query documents</Button>
			</div>
		</Layout>
	);
};

export default FinStatement;
