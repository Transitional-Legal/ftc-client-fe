import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import Input from "components/forms/Input";
import Layout from "components/layout/Layout";
import Card from "components/Card";
import { Alert, Button, Row, Col } from "react-bootstrap";
import api from "apis/api";
import useSWR, { mutate } from "swr";
import Toggle from "components/forms/Toggle";

import "./finStatementSCSS.scss";

const parseSubmitValues = (v) => ({
	title: v.title,
	their_ref: v.their_ref,
	issued: v.issued,
	deadline: v.deadline
});

const FinStatementPartD = () => {
	const [partD_incomeFromBusiness, setIncomeFromBusiness] = React.useState(true);
	const [partD_govBenefits, setGovBenefits] = React.useState(false);
	const [partD_spousalMaintenceOrChildSupport, setSpousalMaintenceOrChildSupport] = React.useState(false);
	const [partD_benefitsBusinessOrEmployment, setBenefitsBusinessOrEmployment] = React.useState(false);
	const [partD_otherIncome, setOtherIncome] = React.useState(false);

	const initialValues = {
		fs_partD_salary_before_tax: "E $45,000", // Existing value
		fs_partD_weeklyIncomeFromInvestments: true,
		fs_partD_investment_income_1: "E $350",
		fs_partD_investment_income_1_paidby: "Rental Tennants",
		fs_partD_investment_income_2: "no",
		fs_partD_investment_income_2_paidby: "Transitional Legal",
		fs_partD_business_income_2_paidby: "", // Added for the business income section
		fs_partD_nameOfBusiness: "",
		fs_partD_addressOfBusiness: "",
		fs_partD_stateOfBusiness: "",
		fs_partD_postcodeOfBusiness: "",
		fs_partD_government_benefits_1_type: "", // Added for the government benefits section
		fs_partD_government_benefits_1_amount: "",
		fs_partD_government_benefits_2_type: "",
		fs_partD_government_benefits_2_amount: "",
		fs_partD_spousalMaintenceOrChildSupport_1_type: "", // Added for the spousal maintenance or child support section
		fs_partD_spousalMaintenceOrChildSupport_1_amount: "",
		fs_partD_spousalMaintenceOrChildSupport_2_type: "",
		fs_partD_spousalMaintenceOrChildSupport_2_amount: "",
		fs_partD_benefitsBusinessOrEmployment_1_type: "Frige beneftis", // Added for the employment/business benefits section
		fs_partD_benefitsBusinessOrEmployment_1_amount: "E $53",
		fs_partD_benefitsBusinessOrEmployment_2_type: "no",
		fs_partD_benefitsBusinessOrEmployment_2_amount: "",
		fs_partD_otherIncome_1_type: "", // Added for the other income section
		fs_partD_otherIncome_1_amount: "",
		fs_partD_otherIncome_2_type: "",
		fs_partD_otherIncome_2_amount: "",
		// New state values with fs_ prefix
		fs_partD_incomeFromBusiness: true,
		fs_partD_govBenefits: false,
		fs_partD_spousalMaintenceOrChildSupport: false,
		fs_partD_benefitsBusinessOrEmployment: true,
		fs_partD_otherIncome: false
	};



	

	const [formData, setFormData] = useState(initialValues);

	useEffect(() => {
		const mockResponse = {
			// occupation: "Software Developer",
		};

		setFormData({
			...initialValues
			// new values
		});
	}, []);

	const onSubmit = async (values, actions) => {
		try {
			const parsedValues = parseSubmitValues(values);
			console.log("Form Values:", values);
			await api.open.post("/finstatement", parsedValues);
			// history.push("/");

		} catch (e) {
			console.log(e);
			actions.setErrors({ hidden: e });
			actions.setSubmitting(false);
		}
	};

	// const { data: income } = useSWR(`http://localhost:8000/query/test`);
	// console.log(income);

	return (
		<div className="container py-5">
			<Card>
				<Alert variant="info">
					<Alert.Heading>Part D: Your income</Alert.Heading>
				</Alert>

				<Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize={true}>
					{({ isSubmitting, errors, values, setFieldValue }) => (
						<Form style={{ flex: 1, width: "100%" }}>
							<div className="subSection">
								<b>
									<Input name="fs_partD_salary_before_tax" label="9: What is your total salary or wages before tax?" value="E $45,000" />
								</b>
							</div>

							<div className="subSection">
								<b>
									{" "}
									<p>10. Do you get any weekly income from investments? (e.g. rent, interest, divident) </p>
								</b>
								<Toggle
									className="float-right"
									value={values.fs_partD_weeklyIncomeFromInvestments}
									setValue={(value) => setFieldValue("fs_partD_weeklyIncomeFromInvestments", value)}
								/>

								<div className="indentLeft">
									<div>
										<Input
											disabled={!values.fs_partD_weeklyIncomeFromInvestments}
											name="fs_partD_investment_income_1"
											label="What is your weekly income from all your investments after tax? (e.g. rent, interest, divident)"
										/>
										<Input
											disabled={!values.fs_partD_weeklyIncomeFromInvestments}
											name="fs_partD_investment_income_1_paidby"
											label="Who is this income paid by? (e.g. bank, mortgagor, company, tenant)"
										/>
									</div>
									<br></br>
									<br></br>
									<div>
										<Input
											disabled={!values.fs_partD_weeklyIncomeFromInvestments}
											name="fs_partD_investment_income_2"
											label="Do you get any other weekly income from any other investments? (e.g. rent, interest, divident)"
										/>
										<Input
											disabled={!values.fs_partD_weeklyIncomeFromInvestments}
											name="fs_partD_investment_income_2_paidby"
											label="Who is additional this income paid by? (e.g. bank, mortgagor, company, tenant)"
										/>
									</div>
								</div>

								<br />
								<br />
							</div>

							<div className="subSection">
								<b>
									<p>11. Do you get any weekly income from businesses, partnerships, companies, or trusts? (e.g. rent, interest, dividend) </p>
								</b>
								<Toggle
									className="float-right"
									value={values.fs_partD_incomeFromBusiness}
									setValue={(value) => setFieldValue("fs_partD_incomeFromBusiness", value)}
								/>

								<div className="indentLeft">
									<Input
										name="fs_partD_business_income_2_paidby"
										label="If so who is this income paid by? (e.g. bank, mortgagor, company, tenant)"
										disabled={!values.fs_partD_incomeFromBusiness}
									/>
									<Input
										name="fs_partD_investment_income_1_paidby"
										label="What type of business does this income come from?"
										disabled={!values.fs_partD_incomeFromBusiness}
									/>
									<Input
										name="fs_partD_nameOfBusiness"
										label="What is the name of this business/company/partnership/trust?"
										disabled={!values.fs_partD_incomeFromBusiness}
									/>
									<Input name="fs_partD_addressOfBusiness" label="What is the address?" disabled={!values.fs_partD_incomeFromBusiness} />
									<Row>
										<Col>
											<Input name="fs_partD_stateOfBusiness" label="State" disabled={!values.fs_partD_incomeFromBusiness} />
										</Col>
										<Col>
											<Input name="fs_partD_postcodeOfBusiness" label="Postcode" disabled={!values.fs_partD_incomeFromBusiness} />
										</Col>
									</Row>
								</div>
							</div>

							<div className="subSection">
								<b>
									<p>12. Do you get any type of government benefits? </p>
								</b>
								<Toggle className="float-right" value={values.fs_partD_govBenefits} setValue={(value) => setFieldValue("fs_partD_govBenefits", value)} />

								<div className="indentLeft">
									<div>
										<Input
											disabled={!values.fs_partD_govBenefits}
											name="fs_partD_government_benefits_1_type"
											label="What type of government benefit do you get?"
										/>
										<Input disabled={!values.fs_partD_govBenefits} name="fs_partD_government_benefits_1_amount" label="How much do you get per week?" />
									</div>
									<br></br>
									<br></br>
									<div>
										<Input disabled={!values.fs_partD_govBenefits} name="fs_partD_government_benefits_2_type" label="Any other types of government benefits?" />
										<Input disabled={!values.fs_partD_govBenefits} name="fs_partD_government_benefits_2_amount" label="And how much do you get per week?" />
									</div>
								</div>

								<br />
								<br />
							</div>

							<div className="subSection">
								<b>
									<p>13. Do you get spousal maintenance or child support? </p>
								</b>
								<Toggle
									className="float-right"
									value={values.fs_partD_spousalMaintenceOrChildSupport}
									setValue={(value) => setFieldValue("fs_partD_spousalMaintenceOrChildSupport", value)}
								/>

								<div className="indentLeft">
									<div>
										<Input
											disabled={!values.fs_partD_spousalMaintenceOrChildSupport}
											name="fs_partD_spousalMaintenceOrChildSupport_1_type"
											label="What type of maintenance do you get?"
										/>
										<Input
											disabled={!values.fs_partD_spousalMaintenceOrChildSupport}
											name="fs_partD_spousalMaintenceOrChildSupport_1_amount"
											label="How much do you get per week?"
										/>
									</div>
									<br></br>
									<br></br>
									<div>
										<Input
											disabled={!values.fs_partD_spousalMaintenceOrChildSupport}
											name="fs_partD_spousalMaintenceOrChildSupport_2_type"
											label="Any other types of maintenance?"
										/>
										<Input
											disabled={!values.fs_partD_spousalMaintenceOrChildSupport}
											name="fs_partD_spousalMaintenceOrChildSupport_2_amount"
											label="And how much do you get per week?"
										/>
									</div>
								</div>

								<br />
								<br />
							</div>

							<div className="subSection">
								<b>
									<p>14. Do you get any benefits from your employment or business? </p>
								</b>
								<Toggle
									className="float-right"
									value={values.fs_partD_benefitsBusinessOrEmployment}
									setValue={(value) => setFieldValue("fs_partD_benefitsBusinessOrEmployment", value)}
								/>

								<div className="indentLeft">
									<div>
										<Input
											disabled={!values.fs_partD_benefitsBusinessOrEmployment}
											name="fs_partD_benefitsBusinessOrEmployment_1_type"
											label="What type of benefits do you get?"
										/>
										<Input
											disabled={!values.fs_partD_benefitsBusinessOrEmployment}
											name="fs_partD_benefitsBusinessOrEmployment_1_amount"
											label="How much in benefits do you get?"
										/>
									</div>
									<br></br>
									<br></br>
									<div>
										<Input
											disabled={!values.fs_partD_benefitsBusinessOrEmployment}
											name="fs_partD_benefitsBusinessOrEmployment_2_type"
											label="Any other types of benefits?"
										/>
										<Input
											disabled={!values.fs_partD_benefitsBusinessOrEmployment}
											name="fs_partD_benefitsBusinessOrEmployment_2_amount"
											label="And how much do you get per week?"
										/>
									</div>
								</div>

								<br />
								<br />
							</div>

							<div className="subSection">
								<b>
									<p>15. Is there any other types of income we have missed? </p>
								</b>
								<Toggle className="float-right" value={values.fs_partD_otherIncome} setValue={(value) => setFieldValue("fs_partD_otherIncome", value)} />

								<div className="indentLeft">
									<div>
										<Input disabled={!values.fs_partD_otherIncome} name="fs_partD_otherIncome_1_type" label="What other type of income is this?" />
										<Input disabled={!values.fs_partD_otherIncome} name="fs_partD_otherIncome_1_amount" label="How much of this income do you get per week?" />
									</div>
									<br></br>
									<br></br>
									<div>
										<Input
											disabled={!values.fs_partD_otherIncome}
											name="fs_partD_otherIncome_2_type"
											label="Any other types of income? anything else? (cryptocurrency, etc)"
										/>
										<Input disabled={!values.fs_partD_otherIncome} name="fs_partD_otherIncome_2_amount" label="And how much do you get per week?" />
									</div>
								</div>

								<br />
								<br />
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

export default FinStatementPartD;
