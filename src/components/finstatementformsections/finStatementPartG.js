import React, { useEffect, useState } from "react";
import Card from "components/Card";
import Input from "components/forms/Input";
import { Form, Formik } from "formik";
import { Alert, Button, Col, Row } from "react-bootstrap";
import "./finStatementSCSS.scss";

const FinStatementPartG = () => {
    const initialValues = {
        fs_partG_total_income_befor_tax: "E $900", // <p>19. What is your total weekly income before tax?</p>
        fs_partG_weekly_super_contribution: "E $100", // <p>20. Roughly how much superannuation do you contribute per week?</p>
        fs_partG_weekly_mortgage1_payments: "E $440", // <p>21. Roughly how much do you pay per week for your mortgage? (put $0 if no mortgage)</p>
        fs_partG_weekly_mortgage1_name_of_lender: "ANZ Bank", // <p>And what is the name of the mortgage lender?</p>
        fs_partG_weekly_rent_payments: "E $0", // <p>Roughly how much do you pay per week for your rent? (put $0 if no rent)</p>
        fs_partG_weekly_rent_name_of_landlord: "John Smith", // <p>And what is the name of the landlord? (leave blank if you don't have a landlord)</p>
        fs_partG_wekekly_rates_payments: "E $50", // <p>22. Roughly how much do you pay per week for your rates? (put $0 if no rates)</p>
        fs_partG_weekly_unit_levees_payments: "E $50", // <p>Roughly how much do you pay per week for your unit levees? (put $0 if no unit levees)</p>
        fs_partG_weekly_mortgage2_payments: "E $50", // <p>23. Roughly how much do you pay per week for your second mortgage? (put $0 if no second mortgage)</p>
        fs_partG_weekly_martgage2_name_of_lender: "ANZ Bank", // <p>And what is the name of the second mortgage lender?</p>
        fs_partG_weekly_mortgage2_address_of_property: "123 Smith Street, Woolloongabba", // <p>And what is the address of the second mortgaged property?</p>
        fs_partG_weekly_mortgage2_rates_payments: "E $50", // <p>Roughly how much do you pay per week for your second mortgage rates? (put $0 if no second mortgage)</p>
        fs_partG_weekly_life_insurance1_payments: "E $50", // <p>25. Roughly how much do you pay per week for your life insurance? (put $0 if no life insurance)</p>
        fs_partG_weekly_life_insurance1_type_of_policy: "Life Insurance", // <p>And what is the type of the life insurance policy?</p>
        fs_partG_weekly_life_isurrance1_policy_number: "123456789", // <p>And what is the policy number of the life insurance policy?</p>
        fs_partG_weekly_life_insurance1_name_of_insurer: "Life Insurance Australia", // <p>And what is the name of the life insurance insurer?</p>
        fs_partG_weekly_life_insurance2_payments: "E $0", // <p>Roughly how much do you pay per week for your second life insurance? (put $0 if no second life insurance)</p>
        fs_partG_weekly_life_insurance2_type_of_policy: "n/a", // <p>And what is the type of the second life insurance policy?</p>
        fs_partG_weekly_life_isurrance2_policy_number: "n/a", // <p>And what is the policy number of the second life insurance policy?</p>
        fs_partG_weekly_life_insurance2_name_of_insurer: "n/a", // <p>And what is the name of the second life insurance insurer?</p>
        fs_partG_weekly_other_insuracne1_payments: "E $0", // <p>26. Roughly how much do you pay per week for your other insurance? (e.g., house and contents or boat insurance etc.)</p>
        fs_partG_weekly_other_insuracne1_type_of_policy: "n/a", // <p>And what is the type of the other insurance policy?</p>
        fs_partG_weekly_other_insuracne1_policy_number: "n/a", // <p>And what is the policy number of the other insurance policy?</p>
        fs_partG_weekly_other_insuracne1_name_of_insurer: "n/a", // <p>And what is the name of the other insurance insurer?</p>
        fs_partG_weekly_other_insuracne2_payments: "E $0", // <p>Roughly how much do you pay per week for your second other insurance? (put $0 if no second other insurance)</p>
        fs_partG_weekly_other_insuracne2_type_of_policy: "n/a", // <p>And what is the type of the second other insurance policy?</p>
        fs_partG_weekly_other_insuracne2_policy_number: "n/a", // <p>And what is the policy number of the second other insurance policy?</p>
        fs_partG_weekly_other_insuracne2_name_of_insurer: "n/a", // <p>And what is the name of the second other insurance insurer?</p>
        fs_partG_weekly_other_insuracne3_payments: "E $0", // <p>Roughly how much do you pay per week for your third other insurance? (put $0 if no third other insurance)</p>
        fs_partG_weekly_other_insuracne3_type_of_policy: "n/a", // <p>And what is the type of the third other insurance policy?</p>
        fs_partG_weekly_other_insuracne3_policy_number: "n/a", // <p>And what is the policy number of the third other insurance policy?</p>
        fs_partG_weekly_other_insuracne3_name_of_insurer: "n/a", // <p>And what is the name of the third other insurance insurer?</p>
        fs_partG_weekly_motor_vehicle1_payments: "E $0", // <p>27. Roughly how much do you pay per week for your motor vehicle? (put $0 if no motor vehicle)</p>
        fs_partG_weekly_motor_vehicle1_make: "n/a", // <p>And what is the make of the motor vehicle?</p>
        fs_partG_weekly_motor_vehicle1_model: "n/a", // <p>And what is the model of the motor vehicle?</p>
        fs_partG_weekly_motor_vehicle1_year: "n/a", // <p>And what is the year of the motor vehicle?</p>
        fs_partG_weekly_motor_vehicle1_registration: "n/a", // <p>And what is the registration of the motor vehicle?</p>
        fs_partG_weekly_motor_vehicle2_payments: "E $0", // <p>Roughly how much do you pay per week for your second motor vehicle? (put $0 if no second motor vehicle)</p>
        fs_partG_weekly_motor_vehicle2_make: "n/a", // <p>And what is the make of the second motor vehicle?</p>
        fs_partG_weekly_motor_vehicle2_model: "n/a", // <p>And what is the model of the second motor vehicle?</p>
        fs_partG_weekly_motor_vehicle2_year: "n/a", // <p>And what is the year of the second motor vehicle?</p>
        fs_partG_weekly_motor_vehicle2_registration: "n/a", // <p>And what is the registration of the second motor vehicle?</p>
        fs_partG_weekly_high_purchase_payments: "E $0", // <p>28. Roughly how much do you pay per week for your hire purchase? (put $0 if no hire purchase)</p>
        fs_partG_weekly_high_purchase_type: "n/a", // <p>And what is the type of the hire purchase?</p>
        fs_partG_weekly_lease_payments: "E $0", // <p>Roughly how much do you pay per week for your lease? (put $0 if no lease)</p>
        fs_partG_weekly_lease_type: "n/a", // <p>And what is the type of the lease? (leave blank if no lease agreements)</p>
        fs_partG_weekly_personal_loan1_payments: "E $0", // <p>29. Roughly how much do you pay per week for your personal loan? (put $0 if no personal loan)</p>
        fs_partG_weekly_personal_loan1_type: "n/a", // <p>And what is the type of the personal loan?</p>
        fs_partG_weekly_personal_loan1_lender: "n/a", // <p>And what is the name of the personal loan lender?</p>
        fs_pargG_weekly_credit_card1_payments: "E $0", // <p>30. Roughly how much do you pay per week for your credit card? (put $0 if no credit card)</p>
        fs_partG_weekly_credit_card1_type: "n/a", // <p>And what is the type of the credit card?</p>
        fs_partG_weekly_credit_card1_lender: "n/a", // <p>And what is the name of the credit card lender?</p>
        fs_partG_weekly_credit_card2_payments: "E $0", // <p>Roughly how much do you pay per week for your second credit card? (put $0 if no second credit card)</p>
        fs_partG_weekly_credit_card2_type: "n/a", // <p>And what is the type of the second credit card?</p>
        fs_partG_weekly_credit_card2_lender: "n/a", // <p>And what is the name of the second credit card lender?</p>
        fs_pargG_weekly_maintence_child_support_payments: "E $0", // <p>31. Roughly how much do you pay per week for your maintenance or child support? (put $0 if no maintenance or child support)</p>
        fs_partG_weekly_maintence_child_support_type: "n/a", // <p>And what is the type of the maintenance or child support?</p>
        fs_partG_weekly_maintence_child_support_paid_for_the_benefit_of: "n/a", // <p>And what is the name of the person you pay the maintenance or child support for the benefit of?</p>
        fs_partG_weekly_maintence_child_support_assessment_agreement_order: "assessment/agreement/order", // <p>And what is the assessment, agreement or order number of the maintenance or child support?</p>
        fs_partG_weekly_other_payments1_amount: "E $0", // <p>32. Roughly how much do you pay per week for your other payments? (put $0 if no other payments)</p>
        fs_partG_weekly_other_payments1_type: "n/a", // <p>And what is the type of the other payments?</p>
        fs_partG_weekly_other_payments2_amount: "E $0", // <p>Roughly how much do you pay per week for your second other payments? (put $0 if no second other payments)</p>
        fs_pargG_weekly_other_payments2_type: "n/a", // <p>And what is the type of the second other payments?</p>
    };


 

    // Function to remove 'E ' prefix and parse as number for calculations
    const parseValueForCalculation = (value) => {
        return parseFloat(value.replace('E $', ''));
    };


    const calculateTotalAmount = (values) => {
        // Using Object.values to iterate over all values in the initialValues object
        return Object.values(values).reduce((total, value) => {
            // Check if the value is a string and contains 'E $'
            if (typeof value === 'string' && value.includes('E $')) {
                // Add parsed value to the total
                return total + parseValueForCalculation(value);
            }
            return total;
        }, 0);
    };

   

       // Use useState to manage the totalAmount state
       const [totalAmount, setTotalAmount] = useState(calculateTotalAmount(initialValues));


    const onSubmit = (values, actions) => {
        console.log("Form Values:", values);
        actions.setSubmitting(false);
    };

    return (
        <div className="container py-5">
            <Card>
                <Alert variant="info">
                    <Alert.Heading>Part G: Personal Expenditure</Alert.Heading>
                </Alert>

                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {({ values, setFieldValue, isSubmitting }) => (

                        // calculate total wheneve changes



                        <Form>
                            <div className="subSection">
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>19. What is your total weekly income before tax?</p></b>
                                        <Input
                                            name="fs_partG_total_income_befor_tax"
                                            label="Total Weekly Income Before Tax"
                                            value={values.fs_partG_total_income_befor_tax}
                                            onChange={(e) => setFieldValue('fs_partG_total_income_befor_tax', e.target.value)}
                                        />

                                    </Col>
                                </Row>
                            </div>

                            <div className="subSection">
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>20. Roughly how much superannuation do you contribute per week?</p></b>
                                        <Input
                                            name="fs_partG_weekly_super_contribution"
                                            label="Weekly Superannuation Contribution"
                                            value={values.fs_partG_weekly_super_contribution}
                                            onChange={(e) => setFieldValue('fs_partG_weekly_super_contribution', e.target.value)}
                                        />
                                    </Col>
                                </Row>
                            </div>




                            <div className="subSection">
                                {/* Mortgage 1 Payment */}
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>21. Roughly how much do you pay per week for your mortgage? (put $0 if no mortgage)</p></b>
                                        <Input
                                            name="fs_partG_weekly_mortgage1_payments"
                                            label="Weekly Mortgage Payment"
                                            value={values.fs_partG_weekly_mortgage1_payments}
                                            onChange={(e) => setFieldValue('fs_partG_weekly_mortgage1_payments', e.target.value)}

                                        />
                                    </Col>
                                </Row>

                                {/* Mortgage 1 Lender Name */}
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>And what is the name of the mortgage lender?</p></b>
                                        <Input
                                            name="fs_partG_weekly_mortgage1_name_of_lender"
                                            label="Mortgage Lender Name"
                                        />
                                    </Col>
                                </Row>

                                {/* Rent Payment */}
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>Roughly how much do you pay per week for your rent? (put $0 if no rent)</p></b>
                                        <Input
                                            name="fs_partG_weekly_rent_payments"
                                            label="Weekly Rent Payment"
                                            value={values.fs_partG_weekly_rent_payments}
                                            onChange={(e) => setFieldValue('fs_partG_weekly_rent_payments', e.target.value)}
                                        />
                                    </Col>
                                </Row>

                                {/* Landlord Name */}
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>And what is the name of the landlord? (leave blank if you don't have a landlord)</p></b>
                                        <Input
                                            name="fs_partG_weekly_rent_name_of_landlord"
                                            label="Landlord Name"
                                        />
                                    </Col>
                                </Row>
                            </div>


                            <div className="subSection">
                                {/* First Life Insurance Payment */}
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>25. Roughly how much do you pay per week for your life insurance? (put $0 if no life insurance)</p></b>
                                        <Input
                                            name="fs_partG_weekly_life_insurance1_payments"
                                            label="Weekly Life Insurance Payment"
                                            value={values.fs_partG_weekly_life_insurance1_payments}
                                            onChange={(e) => setFieldValue('fs_partG_weekly_life_insurance1_payments', e.target.value)}
                                        />
                                    </Col>
                                </Row>

                                {/* First Life Insurance Policy Type */}
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>And what is the type of the life insurance policy?</p></b>
                                        <Input
                                            name="fs_partG_weekly_life_insurance1_type_of_policy"
                                            label="Type of Life Insurance Policy"
                                        />
                                    </Col>
                                </Row>

                                {/* First Life Insurance Policy Number */}
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>And what is the policy number of the life insurance policy?</p></b>
                                        <Input
                                            name="fs_partG_weekly_life_isurrance1_policy_number"
                                            label="Life Insurance Policy Number"
                                        />
                                    </Col>
                                </Row>

                                {/* First Life Insurance Insurer Name */}
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>And what is the name of the life insurance insurer?</p></b>
                                        <Input
                                            name="fs_partG_weekly_life_insurance1_name_of_insurer"
                                            label="Life Insurance Insurer Name"
                                        />
                                    </Col>
                                </Row>

                                {/* Second Life Insurance Payment */}
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>Roughly how much do you pay per week for your second life insurance? (put $0 if no second life insurance)</p></b>
                                        <Input
                                            name="fs_partG_weekly_life_insurance2_payments"
                                            label="Weekly Second Life Insurance Payment"
                                            value={values.fs_partG_weekly_life_insurance2_payments}
                                            onChange={(e) => setFieldValue('fs_partG_weekly_life_insurance2_payments', e.target.value)}
                                        />
                                    </Col>
                                </Row>

                                {/* Second Life Insurance Policy Type */}
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>And what is the type of the second life insurance policy?</p></b>
                                        <Input
                                            name="fs_partG_weekly_life_insurance2_type_of_policy"
                                            label="Type of Second Life Insurance Policy"
                                        />
                                    </Col>
                                </Row>

                                {/* Second Life Insurance Policy Number */}
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>And what is the policy number of the second life insurance policy?</p></b>
                                        <Input
                                            name="fs_partG_weekly_life_isurrance2_policy_number"
                                            label="Second Life Insurance Policy Number"
                                        />
                                    </Col>
                                </Row>

                                {/* Second Life Insurance Insurer Name */}
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>And what is the name of the second life insurance insurer?</p></b>
                                        <Input
                                            name="fs_partG_weekly_life_insurance2_name_of_insurer"
                                            label="Second Life Insurance Insurer Name"
                                        />
                                    </Col>
                                </Row>
                            </div>



                            <div className="subSection">
                                {/* Other Insurance 1 */}
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>26. Roughly how much do you pay per week for your other insurance? (e.g. house and contents or boat insurance etc.)</p></b>
                                        <Input
                                            name="fs_partG_weekly_other_insuracne1_payments"
                                            label="Weekly Other Insurance Payment"
                                            value={values.fs_partG_weekly_other_insuracne1_payments}
                                            onChange={(e) => setFieldValue('fs_partG_weekly_other_insuracne1_payments', e.target.value)}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>And what is the type of the other insurance policy?</p></b>
                                        <Input
                                            name="fs_partG_weekly_other_insuracne1_type_of_policy"
                                            label="Type of Other Insurance Policy"
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>And what is the policy number of the other insurance policy?</p></b>
                                        <Input
                                            name="fs_partG_weekly_other_insuracne1_policy_number"
                                            label="Other Insurance Policy Number"
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>And what is the name of the other insurance insurer?</p></b>
                                        <Input
                                            name="fs_partG_weekly_other_insuracne1_name_of_insurer"
                                            label="Other Insurance Insurer Name"
                                        />
                                    </Col>
                                </Row>

                                {/* Other Insurance 2 */}
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>Roughly how much do you pay per week for your second other insurance? (put $0 if no second other insurance)</p></b>
                                        <Input
                                            name="fs_partG_weekly_other_insuracne2_payments"
                                            label="Weekly Second Other Insurance Payment"
                                            value={values.fs_partG_weekly_other_insuracne2_payments}
                                            onChange={(e) => setFieldValue('fs_partG_weekly_other_insuracne2_payments', e.target.value)}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>And what is the type of the second other insurance policy?</p></b>
                                        <Input
                                            name="fs_partG_weekly_other_insuracne2_type_of_policy"
                                            label="Type of Second Other Insurance Policy"
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>And what is the policy number of the second other insurance policy?</p></b>
                                        <Input
                                            name="fs_partG_weekly_other_insuracne2_policy_number"
                                            label="Second Other Insurance Policy Number"
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>And what is the name of the second other insurance insurer?</p></b>
                                        <Input
                                            name="fs_partG_weekly_other_insuracne2_name_of_insurer"
                                            label="Second Other Insurance Insurer Name"
                                        />
                                    </Col>
                                </Row>

                                {/* Other Insurance 3 */}
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>Roughly how much do you pay per week for your third other insurance? (put $0 if no third other insurance)</p></b>
                                        <Input
                                            name="fs_partG_weekly_other_insuracne3_payments"
                                            label="Weekly Third Other Insurance Payment"
                                            value={values.fs_partG_weekly_other_insuracne3_payments}
                                            onChange={(e) => setFieldValue('fs_partG_weekly_other_insuracne3_payments', e.target.value)}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>And what is the type of the third other insurance policy?</p></b>
                                        <Input
                                            name="fs_partG_weekly_other_insuracne3_type_of_policy"
                                            label="Type of Third Other Insurance Policy"
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>And what is the policy number of the third other insurance policy?</p></b>
                                        <Input
                                            name="fs_partG_weekly_other_insuracne3_policy_number"
                                            label="Third Other Insurance Policy Number"
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>And what is the name of the third other insurance insurer?</p></b>
                                        <Input
                                            name="fs_partG_weekly_other_insuracne3_name_of_insurer"
                                            label="Third Other Insurance Insurer Name"
                                        />
                                    </Col>
                                </Row>

                            </div>



                            <div className="subSection">
                                {/* Motor Vehicle 1 Details */}
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>27. Roughly how much do you pay per week for your motor vehicle? (put $0 if no motor vehicle)</p></b>
                                        <Input
                                            name="fs_partG_weekly_motor_vehicle1_payments"
                                            label="Weekly Motor Vehicle Payment"
                                            value={values.fs_partG_weekly_motor_vehicle1_payments}
                                            onChange={(e) => setFieldValue('fs_partG_weekly_motor_vehicle1_payments', e.target.value)}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>And what is the make of the motor vehicle?</p></b>
                                        <Input
                                            name="fs_partG_weekly_motor_vehicle1_make"
                                            label="Motor Vehicle Make"
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>And what is the model of the motor vehicle?</p></b>
                                        <Input
                                            name="fs_partG_weekly_motor_vehicle1_model"
                                            label="Motor Vehicle Model"
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>And what is the year of the motor vehicle?</p></b>
                                        <Input
                                            name="fs_partG_weekly_motor_vehicle1_year"
                                            label="Motor Vehicle Year"
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>And what is the registration of the motor vehicle?</p></b>
                                        <Input
                                            name="fs_partG_weekly_motor_vehicle1_registration"
                                            label="Motor Vehicle Registration"
                                        />
                                    </Col>
                                </Row>

                                {/* Motor Vehicle 2 Details */}
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>Roughly how much do you pay per week for your second motor vehicle? (put $0 if no second motor vehicle)</p></b>
                                        <Input
                                            name="fs_partG_weekly_motor_vehicle2_payments"
                                            label="Weekly Second Motor Vehicle Payment"
                                            value={values.fs_partG_weekly_motor_vehicle2_payments}
                                            onChange={(e) => setFieldValue('fs_partG_weekly_motor_vehicle2_payments', e.target.value)}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>And what is the make of the second motor vehicle?</p></b>
                                        <Input
                                            name="fs_partG_weekly_motor_vehicle2_make"
                                            label="Second Motor Vehicle Make"
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>And what is the model of the second motor vehicle?</p></b>
                                        <Input
                                            name="fs_partG_weekly_motor_vehicle2_model"
                                            label="Second Motor Vehicle Model"
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>And what is the year of the second motor vehicle?</p></b>
                                        <Input
                                            name="fs_partG_weekly_motor_vehicle2_year"
                                            label="Second Motor Vehicle Year"
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>And what is the registration of the second motor vehicle?</p></b>
                                        <Input
                                            name="fs_partG_weekly_motor_vehicle2_registration"
                                            label="Second Motor Vehicle Registration"
                                        />
                                    </Col>
                                </Row>
                            </div>




                            <div className="subSection">
                                {/* Hire Purchase Details */}
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>28. Roughly how much do you pay per week for your hire purchase? (put $0 if no hire purchase)</p></b>
                                        <Input
                                            name="fs_partG_weekly_high_purchase_payments"
                                            label="Weekly Hire Purchase Payment"
                                            value={values.fs_partG_weekly_high_purchase_payments}
                                            onChange={(e) => setFieldValue('fs_partG_weekly_high_purchase_payments', e.target.value)}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <p>And what is the type of the hire purchase?</p>
                                        <Input
                                            name="fs_partG_weekly_high_purchase_type"
                                            label="Type of Hire Purchase"
                                        />
                                    </Col>
                                </Row>

                                {/* Lease Agreement Details */}
                                <Row className="mb-3">
                                    <Col>
                                        <p>Roughly how much do you pay per week for your lease? (put $0 if no lease)</p>
                                        <Input
                                            name="fs_partG_weekly_lease_payments"
                                            label="Weekly Lease Payment"
                                            value={values.fs_partG_weekly_lease_payments}
                                            onChange={(e) => setFieldValue('fs_partG_weekly_lease_payments', e.target.value)}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <p>And what is the type of the lease? (leave blank if no lease agreements)</p>
                                        <Input
                                            name="fs_partG_weekly_lease_type"
                                            label="Type of Lease"
                                        />
                                    </Col>
                                </Row>
                            </div>

                            <div className="subSection">
                                {/* Personal Loan 1 Details */}
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>29. Roughly how much do you pay per week for your personal loan? (put $0 if no personal loan)</p></b>
                                        <Input
                                            name="fs_partG_weekly_personal_loan1_payments"
                                            label="Weekly Personal Loan Payment"
                                            value={values.fs_partG_weekly_personal_loan1_payments}
                                            onChange={(e) => setFieldValue('fs_partG_weekly_personal_loan1_payments', e.target.value)}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <p>And what is the type of the personal loan?</p>
                                        <Input
                                            name="fs_partG_weekly_personal_loan1_type"
                                            label="Type of Personal Loan"
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <p>And what is the name of the personal loan lender?</p>
                                        <Input
                                            name="fs_partG_weekly_personal_loan1_lender"
                                            label="Personal Loan Lender"
                                        />
                                    </Col>
                                </Row>
                            </div>


                            <div className="subSection">
                                {/* Credit Card 1 Details */}
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>30. Roughly how much do you pay per week for your credit card? (put $0 if no credit card)</p></b>
                                        <Input
                                            name="fs_partG_weekly_credit_card1_payments"
                                            label="Weekly Credit Card Payment"
                                            value={values.fs_partG_weekly_credit_card1_payments}
                                            onChange={(e) => setFieldValue('fs_partG_weekly_credit_card1_payments', e.target.value)}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <p>And what is the type of the credit card?</p>
                                        <Input
                                            name="fs_partG_weekly_credit_card1_type"
                                            label="Type of Credit Card"
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <p>And what is the name of the credit card lender?</p>
                                        <Input
                                            name="fs_partG_weekly_credit_card1_lender"
                                            label="Credit Card Lender"
                                        />
                                    </Col>
                                </Row>

                                {/* Credit Card 2 Details */}
                                <Row className="mb-3">
                                    <Col>
                                        <p>Roughly how much do you pay per week for your second credit card? (put $0 if no second credit card)</p>
                                        <Input
                                            name="fs_partG_weekly_credit_card2_payments"
                                            label="Weekly Second Credit Card Payment"
                                            value={values.fs_partG_weekly_credit_card2_payments}
                                            onChange={(e) => setFieldValue('fs_partG_weekly_credit_card2_payments', e.target.value)}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <p>And what is the type of the second credit card?</p>
                                        <Input
                                            name="fs_partG_weekly_credit_card2_type"
                                            label="Type of Second Credit Card"
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <p>And what is the name of the second credit card lender?</p>
                                        <Input
                                            name="fs_partG_weekly_credit_card2_lender"
                                            label="Second Credit Card Lender"
                                        />
                                    </Col>
                                </Row>
                            </div>


                            <div className="subSection">
                                {/* Maintenance or Child Support Details */}
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>31. Roughly how much do you pay per week for your maintenance or child support? (put $0 if no maintenance or child support)</p></b>
                                        <Input
                                            name="fs_partG_weekly_maintence_child_support_payments"
                                            label="Weekly Maintenance or Child Support Payment"
                                            value={values.fs_partG_weekly_maintence_child_support_payments}
                                            onChange={(e) => setFieldValue('fs_partG_weekly_maintence_child_support_payments', e.target.value)}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <p>And what is the type of the maintenance or child support?</p>
                                        <Input
                                            name="fs_partG_weekly_maintence_child_support_type"
                                            label="Type of Maintenance or Child Support"
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <p>And what is the name of the person you pay the maintenance or child support for the benefit of?</p>
                                        <Input
                                            name="fs_partG_weekly_maintence_child_support_paid_for_the_benefit_of"
                                            label="Beneficiary of Maintenance or Child Support"
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <p>And what is the assessment, agreement or order number of the maintenance or child support?</p>
                                        <Input
                                            name="fs_partG_weekly_maintence_child_support_assessment_agreement_order"
                                            label="Maintenance or Child Support Assessment/Agreement/Order Number"
                                        />
                                    </Col>
                                </Row>
                            </div>


                            <div className="subSection">
                                {/* Other Payments 1 Details */}
                                <Row className="mb-3">
                                    <Col>
                                        <b><p>32. Roughly how much do you pay per week for your other payments? (put $0 if no other payments)</p></b>
                                        <Input
                                            name="fs_partG_weekly_other_payments1_amount"
                                            label="Weekly Other Payments Amount"
                                            value={values.fs_partG_weekly_other_payments1_amount}
                                            onChange={(e) => setFieldValue('fs_partG_weekly_other_payments1_amount', e.target.value)}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <p>And what is the type of the other payments?</p>
                                        <Input
                                            name="fs_partG_weekly_other_payments1_type"
                                            label="Type of Other Payments"
                                        />
                                    </Col>
                                </Row>

                                {/* Other Payments 2 Details */}
                                <Row className="mb-3">
                                    <Col>
                                        <p>Roughly how much do you pay per week for your second other payments? (put $0 if no second other payments)</p>
                                        <Input
                                            name="fs_partG_weekly_other_payments2_amount"
                                            label="Weekly Second Other Payments Amount"
                                            value={values.fs_partG_weekly_other_payments2_amount}
                                            onChange={(e) => setFieldValue('fs_partG_weekly_other_payments2_amount', e.target.value)}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <p>And what is the type of the second other payments?</p>
                                        <Input
                                            name="fs_partG_weekly_other_payments2_type"
                                            label="Type of Second Other Payments"
                                        />
                                    </Col>
                                </Row>
                            </div>


                            {/* Display Total Weekly Spend */}
                            <div className="totalAmountContainer">
                                <p>Total Weekly Spend: <span className="totalAmount">${totalAmount.toLocaleString()}</span></p>
                            </div>










                            {/* Submit Button */}
                            <div className="d-flex justify-content-end">
                                <Button type="submit" disabled={isSubmitting} className="mt-3">
                                    {isSubmitting ? "Submitting..." : "Next"}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Card>
        </div >
    );
};

export default FinStatementPartG;
