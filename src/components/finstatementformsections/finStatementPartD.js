import React from "react";
import { Formik, Form, Field } from "formik";
import Input from "components/forms/Input";
import Layout from "components/layout/Layout";
import Card from "components/Card";
import { Alert, Button, Row, Col } from "react-bootstrap";
import api from "apis/api";
import useSWR, { mutate } from "swr";
import Toggle from "components/forms/Toggle";

import "./finStatementPartD.scss";

const initialValues = {
	fs_partD_salary_before_tax: "E $45,000", // This has a specific initial value
	fs_partD_investment_income_1: "", // Assuming default as empty
	fs_partD_investment_income_1_paidby: "", // Assuming default as empty
	fs_partD_investment_income_2: "", // Assuming default as empty
	fs_partD_investment_income_2_paidby: "", // Assuming default as empty
	partD_nameOfBusiness: "", // Assuming default as empty
	partD_addressOfBusiness: "", // Assuming default as empty
	partD_stateOfBusiness: "", // Assuming default as empty
	partD_postcodeOfBusiness: "" // Assuming default as empty
};

const parseSubmitValues = (v) => ({
	title: v.title,
	their_ref: v.their_ref,
	issued: v.issued,
	deadline: v.deadline
});

const FinStatementPartD = () => {
	const [partD_incomeFromBusiness, setIncomeFromBusiness] = React.useState(false);
	const [partD_weeklyIncomeFromInvestments, setWeeklyIncomeFromInvestments] = React.useState(false);
	const [partD_govBenefits, setGovBenefits] = React.useState(false);

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

	// const { data: income } = useSWR(`http://localhost:8000/query/test`);
	// console.log(income);

	return (
		<div className="container py-5">
			<Card>
				<Alert variant="info">
					<Alert.Heading>Part D: Your income</Alert.Heading>
				</Alert>

				<Formik initialValues={initialValues} onSubmit={onSubmit}>
					{({ isSubmitting, errors }) => (
						<Form style={{ flex: 1, width: "100%" }}>
							<Input name="fs_partD_salary_before_tax" label="9: What is your total salary or wages before tax?" value="E $45,000" />

							<br />
							<br />

							<div className="subSection">
								<p>10. Do you get any weekly income from businesses, partnerships, companyes or trusts? (e.g. rent, interest, divident) </p>
								<Toggle
									className="float-right"
									value={partD_weeklyIncomeFromInvestments}
									setValue={() => setWeeklyIncomeFromInvestments(!partD_weeklyIncomeFromInvestments)}
								/>

								<div className="indentLeft">
									<div>
										<Input
											disabled={!partD_weeklyIncomeFromInvestments}
											name="fs_partD_investment_income_1"
											label="What is your weekly income from all your investments after tax? (e.g. rent, interest, divident)"
										/>
										<Input
											disabled={!partD_weeklyIncomeFromInvestments}
											name="fs_partD_investment_income_1_paidby"
											label="Who is this income paid by? (e.g. bank, mortgagor, company, tenant)"
										/>
									</div>
									<br></br>
									<br></br>
									<div>
										<Input
											disabled={!partD_weeklyIncomeFromInvestments}
											name="fs_partD_investment_income_2"
											label="Do you get any other weekly income from any other investments? (e.g. rent, interest, divident)"
										/>
										<Input
											disabled={!partD_weeklyIncomeFromInvestments}
											name="fs_partD_investment_income_2_paidby"
											label="Who is additional this income paid by? (e.g. bank, mortgagor, company, tenant)"
										/>
									</div>
								</div>

								<br />
								<br />
							</div>

							<div className="subSection">
								<p>11. Do you get any weekly income from businesses, partnerships, companyes or trusts? (e.g. rent, interest, divident) </p>
								<Toggle className="float-right" value={partD_incomeFromBusiness} setValue={() => setIncomeFromBusiness(!partD_incomeFromBusiness)} />

								<div className="indentLeft">
									<Input
										name="partD_business_income_2_paidby"
										label="If so who is this income paid by? (e.g. bank, mortgagor, company, tenant)"
										disabled={!partD_incomeFromBusiness}
									/>
									<Input
										name="partD_investment_income_1_paidby"
										label="What type of business does this income come from?"
										disabled={!partD_incomeFromBusiness}
									/>
									<Input name="partD_nameOfBusiness" label="What is the name of this busines/company/partnership/trust?" disabled={!partD_incomeFromBusiness} />
									<Input name="partD_addressOfBusiness" label="What is the address?" disabled={!partD_incomeFromBusiness} />
									<Row>
										<Col>
											<Input name="partD_stateOfBusiness" label="State" disabled={!partD_incomeFromBusiness} />
										</Col>
										<Col>
											<Input name="partD_postcodeOfBusiness" label="Postcode" disabled={!partD_incomeFromBusiness} />
										</Col>
									</Row>
								</div>
							</div>
















							<div className="subSection">
								<p>Do you get any type of government benefits? </p>
								<Toggle
									className="float-right"
									value={partD_govBenefits}
									setValue={() => setGovBenefits(!partD_govBenefits)}
								/>

								<div className="indentLeft">
									<div>
										<Input
											disabled={!partD_govBenefits}
											name="fs_partD_government_benefits_1_type"
											label="What type of govermnet benefit do you get?"
										/>
										<Input
											disabled={!partD_govBenefits}
											name="fs_partD_government_benefits_1_amount"
											label="How much do you get per week?"
										/>
									</div>
									<br></br>
									<br></br>
									<div>
										<Input
											disabled={!partD_govBenefits}
											name="fs_partD_government_benefits_2_type"
											label="Any other types government benefits?"
										/>
										<Input
											disabled={!partD_govBenefits}
											name="fs_partD_government_benefits_2_amount"
											label="And how much do you get per week?"
										/>
									</div>
								</div>

								<br />
								<br />
							</div>











						</Form>
					)}
				</Formik>
			</Card>

			{/* <Button>Next</Button> */}
		</div>
	);
};

export default FinStatementPartD;
