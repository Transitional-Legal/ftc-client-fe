import React from "react";
import { Formik, Form, Field } from "formik";
import Input from "components/forms/Input";
import Toggle from "components/forms/Toggle";
import Card from "components/Card";
import { Alert, Button, Row, Col } from "react-bootstrap";
import "./finStatementSCSS.scss";

const FinStatementPartE = () => {
	const initialValues = {
		fs_partE_otherIncomeEarners: true,
		fs_partE_otherIncomeEarner1_name: "John Smith",
		fs_partE_otherIncomeEarner1_age: "45",
		fs_partE_otherIncomeEarner1_relationship: "Father",
		fs_partE_otherIncomeEarner1_wk_income: "E $45,000",
		fs_partE_otherIncomeEarner2_name: "Jane Smith",
		fs_partE_otherIncomeEarner2_age: "45",
		fs_partE_otherIncomeEarner2_relationship: "Mother",
		fs_partE_otherIncomeEarner2_wk_income: "E $45,000",
		fs_partE_otherIncomeEarner3_name: "John Smith",
		fs_partE_otherIncomeEarner3_age: "45",
		fs_partE_otherIncomeEarner3_relationship: "Father",
		fs_partE_otherIncomeEarner3_wk_income: "E $45,000"
	};


	const onSubmit = (values, actions) => {
		console.log("Form Values:", values);
		actions.setSubmitting(false);
	};

	return (
		<div className="container py-5">
			<Card>
				<Alert variant="info">
					<Alert.Heading>Part E: Other Income Earners in Your Household</Alert.Heading>
				</Alert>

				<Formik initialValues={initialValues} onSubmit={onSubmit}>
					{({ values, setFieldValue, isSubmitting }) => (
						<Form>
							<div className="subSection">
								<Row className="mb-3">
									<Col xs={9}>
										<p>17. Are there any other income earners in your household?</p>
									</Col>
									<Col xs={3}>
										<Toggle
											name="fs_partE_otherIncomeEarners"
											className="float-right"
											value={values.fs_partE_otherIncomeEarners}
											setValue={(value) => setFieldValue("fs_partE_otherIncomeEarners", value)}
										/>
									</Col>
								</Row>

								{values.fs_partE_otherIncomeEarners && (
									<>
										<div className="incomeEarnerSection">
											<Row className="mb-3">
												<Col>
													<Input name="fs_partE_otherIncomeEarner1_name" label="Name of the First Income Earner" />
												</Col>
											</Row>
											<Row className="mb-3">
												<Col>
													<Input name="fs_partE_otherIncomeEarner1_age" label="Age" />
												</Col>
											</Row>
											<Row className="mb-3">
												<Col>
													<Input name="fs_partE_otherIncomeEarner1_relationship" label="Relationship to You" />
												</Col>
											</Row>
											<Row className="mb-3">
												<Col>
													<Input name="fs_partE_otherIncomeEarner1_wk_income" label="Weekly Income" />
												</Col>
											</Row>
										</div>
										{/* Repeat the above block for each additional income earner */}

										{/* Income Earner 2 */}
										<div className="incomeEarnerSection">
											<Row className="mb-3">
												<Col>
													<Input name="fs_partE_otherIncomeEarner2_name" label="Name of the Second Income Earner" />
												</Col>
											</Row>
											<Row className="mb-3">
												<Col>
													<Input name="fs_partE_otherIncomeEarner2_age" label="Age" />
												</Col>
											</Row>
											<Row className="mb-3">
												<Col>
													<Input name="fs_partE_otherIncomeEarner2_relationship" label="Relationship to You" />
												</Col>
											</Row>
											<Row className="mb-3">
												<Col>
													<Input name="fs_partE_otherIncomeEarner2_wk_income" label="Weekly Income" />
												</Col>
											</Row>
										</div>

										{/* Income Earner 3 */}
										<div className="incomeEarnerSection">
											<Row className="mb-3">
												<Col>
													<Input name="fs_partE_otherIncomeEarner3_name" label="Name of the Third Income Earner" />
												</Col>
											</Row>
											<Row className="mb-3">
												<Col>
													<Input name="fs_partE_otherIncomeEarner3_age" label="Age" />
												</Col>
											</Row>
											<Row className="mb-3">
												<Col>
													<Input name="fs_partE_otherIncomeEarner3_relationship" label="Relationship to You" />
												</Col>
											</Row>
											<Row className="mb-3">
												<Col>
													<Input name="fs_partE_otherIncomeEarner3_wk_income" label="Weekly Income" />
												</Col>
											</Row>
										</div>
									</>
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

export default FinStatementPartE;
