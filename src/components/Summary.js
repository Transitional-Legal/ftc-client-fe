import React, { useState } from "react";
import { Container, Form, Button, ProgressBar } from "react-bootstrap";

export default function Summary({ summary, setShow }) {
	const [tasks, setTasks] = useState({
		1: false,
		2: false,
		3: false,
		4: false,
		5: false,
		6: false,
		7: false,
		8: false
	});

	const progressStages = ["Case Formalisation", "Collect Evidence", "Submit Application to Court", "Finalise Case"];

	// You can modify this value to represent the current progress stage (0 to 4)
	const currentStage = 1;

	const handleCheckboxChange = (taskNumber) => (event) => {
		setTasks({
			...tasks,
			[taskNumber]: event.target.checked
		});
	};

	if (!summary) {
		return <Container></Container>;
	}

	return (
		<Container>
			<h3>Where things are at ...</h3>
			<div>
				<ProgressBar now={(currentStage / 4) * 100} label="Case Formalisation" />
				<div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginTop: "4px" }}>
					{progressStages.map((stage, index) => (
						<span key={index}>{stage}</span>
					))}
				</div>
			</div>
			<p>{summary?.summary}</p>
			<h3>Next steps ...</h3>
			<Form.Group>
				<div>
					<Form.Check inline type="checkbox" label="1. Update your details." checked={tasks[1]} onChange={handleCheckboxChange(1)} />
					<Button size="sm" onClick={setShow}>
						Update
					</Button>
				</div>
				<Form.Check
					type="checkbox"
					label="2. Sign the client agreement after you have updated your details."
					checked={tasks[2]}
					onChange={handleCheckboxChange(2)}
				/>
				<Form.Check type="checkbox" label="3. Upload your case evidence." checked={tasks[3]} onChange={handleCheckboxChange(3)} />
				<Form.Check type="checkbox" label="4. Add your key dates and children to the matter file." checked={tasks[4]} onChange={handleCheckboxChange(4)} />
				<Form.Check type="checkbox" label="5. Summaries in your works the state of the separation." checked={tasks[5]} onChange={handleCheckboxChange(5)} />
				<Form.Check
					type="checkbox"
					label="6. Summarise in your words what outcome you would like in this separation."
					checked={tasks[6]}
					onChange={handleCheckboxChange(6)}
				/>
				<Form.Check
					type="checkbox"
					label="7. Upload your evidence files (images, pdf, emails, texts, audios, videos)."
					checked={tasks[7]}
					onChange={handleCheckboxChange(7)}
				/>
				<Form.Check
					type="checkbox"
					label="8. Book a call with your lawyer to hear what your lawyer has to say."
					checked={tasks[8]}
					onChange={handleCheckboxChange(8)}
				/>
			</Form.Group>
			<p>{summary?.next_action}</p>
		</Container>
	);
}
