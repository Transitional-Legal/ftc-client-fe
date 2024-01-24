import React from "react";
import { Formik, Form } from "formik";
import Input from "components/forms/Input";
import Toggle from "components/forms/Toggle";
import Card from "components/Card";
import { Alert, Button, Row, Col } from "react-bootstrap";
import "./finStatementSCSS.scss";

const FinStatementPartF = () => {
	const initialValues = {
		fs_partF_weekly_expenes_paid_by_others_in_aud: true,
		fs_partF_weekly_expenes_paid_by_others_1_paidby: "John Smith",
		fs_partF_weekly_expenes_paid_by_others_1_type: "fuel",
		fs_partF_weekly_expenes_paid_by_others_1_amount: "E $35",
		fs_partF_weekly_expenes_paid_by_others_2_paidby: "Jane Smith",
		fs_partF_weekly_expenes_paid_by_others_2_type: "fuel",
		fs_partF_weekly_expenes_paid_by_others_2_amount: "E $35",
		fs_partF_weekly_expenes_paid_by_others_3_paidby: "John Smith",
		fs_partF_weekly_expenes_paid_by_others_3_type: "fuel",
		fs_partF_weekly_expenes_paid_by_others_3_amount: "E $35"
	};

	const onSubmit = (values, actions) => {
		console.log("Form Values:", values);
		actions.setSubmitting(false);
	};

	return (
		<div className="container py-5">
			<Card>
				<Alert variant="info">
					<Alert.Heading>Part F: Weekly Expenses Paid by Others for Your Benefit</Alert.Heading>
				</Alert>

				<Formik initialValues={initialValues} onSubmit={onSubmit}>
					{({ values, setFieldValue, isSubmitting }) => (
						<Form>
							<div className="subSection">
								<Row className="mb-3">
									<Col xs={9}>
										<p>18. Do you get any weekly expenses paid by others for your benefit?</p>
									</Col>
									<Col xs={3}>
										<Toggle
											name="fs_partF_weekly_expenes_paid_by_others_in_aud"
											className="float-right"
											value={values.fs_partF_weekly_expenes_paid_by_others_in_aud}
											setValue={(value) => setFieldValue("fs_partF_weekly_expenes_paid_by_others_in_aud", value)}
										/>
									</Col>
								</Row>

								<>
									{/* Expense Paid by Others 1 */}
									<div className="incomeEarnerSection">
										<Row className="mb-3">
											<Col>
												<Input
													name="fs_partF_weekly_expenes_paid_by_others_1_paidby"
													label="Paid By"
													disabled={!values.fs_partF_weekly_expenes_paid_by_others_in_aud}
												/>
											</Col>
										</Row>
										<Row className="mb-3">
											<Col>
												<Input
													name="fs_partF_weekly_expenes_paid_by_others_1_type"
													label="Type of Expense"
													disabled={!values.fs_partF_weekly_expenes_paid_by_others_in_aud}
												/>
											</Col>
										</Row>
										<Row className="mb-3">
											<Col>
												<Input
													name="fs_partF_weekly_expenes_paid_by_others_1_amount"
													label="Weekly Amount"
													disabled={!values.fs_partF_weekly_expenes_paid_by_others_in_aud}
												/>
											</Col>
										</Row>
									</div>

									{/* Expense Paid by Others 2 */}
									<div className="incomeEarnerSection">
										<Row className="mb-3">
											<Col>
												<Input
													name="fs_partF_weekly_expenes_paid_by_others_2_paidby"
													label="Paid By"
													disabled={!values.fs_partF_weekly_expenes_paid_by_others_in_aud}
												/>
											</Col>
										</Row>
										<Row className="mb-3">
											<Col>
												<Input
													name="fs_partF_weekly_expenes_paid_by_others_2_type"
													label="Type of Expense"
													disabled={!values.fs_partF_weekly_expenes_paid_by_others_in_aud}
												/>
											</Col>
										</Row>
										<Row className="mb-3">
											<Col>
												<Input
													name="fs_partF_weekly_expenes_paid_by_others_2_amount"
													label="Weekly Amount"
													disabled={!values.fs_partF_weekly_expenes_paid_by_others_in_aud}
												/>
											</Col>
										</Row>
									</div>

									{/* Expense Paid by Others 3 */}
									<div className="incomeEarnerSection">
										<Row className="mb-3">
											<Col>
												<Input
													name="fs_partF_weekly_expenes_paid_by_others_3_paidby"
													label="Paid By"
													disabled={!values.fs_partF_weekly_expenes_paid_by_others_in_aud}
												/>
											</Col>
										</Row>
										<Row className="mb-3">
											<Col>
												<Input
													name="fs_partF_weekly_expenes_paid_by_others_3_type"
													label="Type of Expense"
													disabled={!values.fs_partF_weekly_expenes_paid_by_others_in_aud}
												/>
											</Col>
										</Row>
										<Row className="mb-3">
											<Col>
												<Input
													name="fs_partF_weekly_expenes_paid_by_others_3_amount"
													label="Weekly Amount"
													disabled={!values.fs_partF_weekly_expenes_paid_by_others_in_aud}
												/>
											</Col>
										</Row>
									</div>
								</>
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

export default FinStatementPartF;
