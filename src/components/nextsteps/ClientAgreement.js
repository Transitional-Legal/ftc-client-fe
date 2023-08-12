import React, { useState } from "react";
import { Container, Form, Button, ProgressBar } from "react-bootstrap";
import ToggleField from "../forms/Toggle";

const ClientAgreement = ({ summary, setShow }) => {

	// const handleCheckboxChange = (taskNumber) => (event) => {
	// 	setTasks({
	// 		...tasks,
	// 		[taskNumber]: event.target.checked,
	// 	});
	// };

	if (!summary) {
		return <Container></Container>;
	}

	return (
		<Container>
			<h3>Next step</h3>
			
			<p>Click here to upload your client agreement.</p>
            <ToggleField></ToggleField>
		</Container>
	);
}

export default ClientAgreement;