import React from "react";
import { Container } from "react-bootstrap";

export default function Summary({ summary }) {

    if (!summary) {
        return <Container></Container>
    }

	return (
		<Container>
			<h3>Where things are at ...</h3>
			<p>{summary?.summary}</p>
			<h3>Next steps ...</h3>
			<p>{summary?.next_action}</p>
		</Container>
	);
}
