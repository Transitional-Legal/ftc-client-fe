import React from "react";
import { useLocation, useHistory, useSearchParams } from "react-router-dom";
import Layout from "components/layout/Layout";
import Card from "components/Card";
import DocumentRequestForm from "components/documents/DocumentRequestForm";
import useSWR from "swr";

const DocumentRequest = () => {
	const history = useHistory();
	const location = useLocation();

	// GUID
	const [searchParams] = useSearchParams();
	const id = searchParams.get("id");

    const { data: requestData, error: fetchDetailsError } = useSWR(`/documents/request/${id}`);

	return (
		<Layout navLinks={[]}>
			<div className="d-flex flex-column justify-content-center container align-items-center">
				<div className="d-flex justify-content-center container align-items-center">
					<Card className="d-flex flex-column justify-content-center align-items-center" style={{ flex: 1, maxWidth: "40rem" }}>
						<h3>Request for a Document</h3>
						<div className="alert alert-info">
							<b>{requestData?.lawyer}</b> has requested the following document for your matter. Please upload a copy of this document by {requestData?.deadLine}.<br></br>
						</div>
						<ul>
                            <li>
								{requestData?.request}
							</li>
							<li>
								This file is regarding your <b>Spousal Maintenance</b> application.
							</li>
                            <li>
								To be listed as Annexure 2.1.
							</li>
						</ul>
						<DocumentRequestForm initialValues={{ id }} />
					</Card>
				</div>
			</div>
		</Layout>
	);
};

export default DocumentRequest;
