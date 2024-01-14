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
	fs_partD_salary_before_tax: "E $45,000", // Existing value
	fs_partD_investment_income_1: "",
	fs_partD_investment_income_1_paidby: "",
	fs_partD_investment_income_2: "",
	fs_partD_investment_income_2_paidby: "",
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
	fs_partD_benefitsBusinessOrEmployment_1_type: "", // Added for the employment/business benefits section
	fs_partD_benefitsBusinessOrEmployment_1_amount: "",
	fs_partD_benefitsBusinessOrEmployment_2_type: "",
	fs_partD_benefitsBusinessOrEmployment_2_amount: "",
	fs_partD_otherIncome_1_type: "", // Added for the other income section
	fs_partD_otherIncome_1_amount: "",
	fs_partD_otherIncome_2_type: "",
	fs_partD_otherIncome_2_amount: "",
};

const parseSubmitValues = (v) => ({
	title: v.title,
	their_ref: v.their_ref,
	issued: v.issued,
	deadline: v.deadline
});

const FinStatementPartD = () => {

	const [partD_weeklyIncomeFromInvestments, setWeeklyIncomeFromInvestments] = React.useState(false);
	const [partD_incomeFromBusiness, setIncomeFromBusiness] = React.useState(false);
	const [partD_govBenefits, setGovBenefits] = React.useState(false);
	const [partD_spousalMaintenceOrChildSupport, setSpousalMaintenceOrChildSupport] = React.useState(false);
	const [partD_benefitsBusinessOrEmployment, setBenefitsBusinessOrEmployment] = React.useState(false);
	const [partD_otherIncome, setOtherIncome] = React.useState(false);

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
							<div className="subSection">
							<b><Input name="fs_partD_salary_before_tax" label="9: What is your total salary or wages before tax?" value="E $45,000" /></b>

							</div>
						
						
					

							<div className="subSection">
							<b>	<p>10. Do you get any weekly income from businesses, partnerships, companyes or trusts? (e.g. rent, interest, divident) </p></b>
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
								<b><p>11. Do you get any weekly income from businesses, partnerships, companyes or trusts? (e.g. rent, interest, divident) </p></b>
								<Toggle className="float-right" value={partD_incomeFromBusiness} setValue={() => setIncomeFromBusiness(!partD_incomeFromBusiness)} />

								<div className="indentLeft">
									<Input
										name="fs_partD_business_income_2_paidby"
										label="If so who is this income paid by? (e.g. bank, mortgagor, company, tenant)"
										disabled={!partD_incomeFromBusiness}
									/>
									<Input
										name="fs_partD_investment_income_1_paidby"
										label="What type of business does this income come from?"
										disabled={!partD_incomeFromBusiness}
									/>
									<Input name="fs_partD_nameOfBusiness" label="What is the name of this busines/company/partnership/trust?" disabled={!partD_incomeFromBusiness} />
									<Input name="fs_partD_addressOfBusiness" label="What is the address?" disabled={!partD_incomeFromBusiness} />
									<Row>
										<Col>
											<Input name="fs_partD_stateOfBusiness" label="State" disabled={!partD_incomeFromBusiness} />
										</Col>
										<Col>
											<Input name="fs_partD_postcodeOfBusiness" label="Postcode" disabled={!partD_incomeFromBusiness} />
										</Col>
									</Row>
								</div>
							</div>
















							<div className="subSection">
								<b><p>12. Do you get any type of government benefits? </p></b>
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











							<div className="subSection">
								<b><p>13. Do you get spousal maintence or child support? </p></b>
								<Toggle
									className="float-right"
									value={partD_spousalMaintenceOrChildSupport}
									setValue={() => setSpousalMaintenceOrChildSupport(!partD_spousalMaintenceOrChildSupport)}
								/>

								<div className="indentLeft">
									<div>
										<Input
											disabled={!partD_spousalMaintenceOrChildSupport}
											name="fs_partD_spousalMaintenceOrChildSupport_1_type"
											label="What type of maintence do you get?"
										/>
										<Input
											disabled={!partD_spousalMaintenceOrChildSupport}
											name="fs_partD_spousalMaintenceOrChildSupport_1_amount"
											label="How much do you get per week?"
										/>
									</div>
									<br></br>
									<br></br>
									<div>
										<Input
											disabled={!partD_spousalMaintenceOrChildSupport}
											name="fs_partD_spousalMaintenceOrChildSupport_2_type"
											label="Any other types of maintence?"
										/>
										<Input
											disabled={!partD_spousalMaintenceOrChildSupport}
											name="fs_partD_spousalMaintenceOrChildSupport_2_amount"
											label="And how much do you get per week?"
										/>
									</div>
								</div>

								<br />
								<br />
							</div>


							<div className="subSection">
								<b><p>14. Do you get any benefits from your employment or business? </p></b>
								<Toggle
									className="float-right"
									value={partD_benefitsBusinessOrEmployment}
									setValue={() => setBenefitsBusinessOrEmployment(!partD_benefitsBusinessOrEmployment)}
								/>

								<div className="indentLeft">
									<div>
										<Input
											disabled={!partD_benefitsBusinessOrEmployment}
											name="fs_partD_benefitsBusinessOrEmployment_1_type"
											label="What type of benefits do you get?"
										/>
										<Input
											disabled={!partD_benefitsBusinessOrEmployment}
											name="fs_partD_benefitsBusinessOrEmployment_1_amount"
											label="How much in benfits do you get?"
										/>
									</div>
									<br></br>
									<br></br>
									<div>
										<Input
											disabled={!partD_benefitsBusinessOrEmployment}
											name="fs_partD_benefitsBusinessOrEmployment_2_type"
											label="Any other types of benefits?"
										/>
										<Input
											disabled={!partD_benefitsBusinessOrEmployment}
											name="fs_partD_benefitsBusinessOrEmployment_2_amount"
											label="And how much do you get per week?"
										/>
									</div>
								</div>

								<br />
								<br />
							</div>



							<div className="subSection">
								<b><p>15. Is there any other types of income we have missed? </p></b>
								<Toggle
									className="float-right"
									value={partD_otherIncome}
									setValue={() => setOtherIncome(!partD_otherIncome)}
								/>

								<div className="indentLeft">
									<div>
										<Input
											disabled={!partD_otherIncome}
											name="fs_partD_otherIncome_1_type"
											label="What other type of income is this?"
										/>
										<Input
											disabled={!partD_otherIncome}
											name="fs_partD_otherIncome_1_amount"
											label="How much of this income do you get per week?"
										/>
									</div>
									<br></br>
									<br></br>
									<div>
										<Input
											disabled={!partD_otherIncome}
											name="fs_partD_otherIncome_2_type"
											label="Any other types of income? antying else? (crypto currency, etc)"
										/>
										<Input
											disabled={!partD_otherIncome}
											name="fs_partD_otherIncome_2_amount"
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
