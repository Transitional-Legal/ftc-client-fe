import React from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "components/layout/Layout";
import Card from "components/Card";
import { Alert, Button } from "react-bootstrap";
import DocumentRequestForm from "components/documents/DocumentRequestForm";
import useSWR from "swr";

const DocumentRequest = () => {
	// const history = useNavigate();
	// const location = useLocation();

	// GUID
	const [searchParams] = useSearchParams();
	const id = searchParams.get("id");
	console.log(id);

	// const { data: requestData, error: fetchRequestError } = useSWR(`/documents/request/${id}`);
	const { data: requestData, error: fetchRequestError } = useSWR(`/documents/request/8fd3c03a-6f87-4bc3-aaa0-5c49e76e9b6f`);
	console.log(requestData);

	const pageNumber = 1;

	return (
		<Layout navLinks={[]}>
			<div className="dashboard container-fluid py-4">
				<section className="main row">
					<aside className="col-lg-4">
						<div className="d-flex flex-column justify-content-center container align-items-center">
							<div className="d-flex justify-content-center container align-items-center">
								<Card className="d-flex flex-column justify-content-center align-items-center" style={{ flex: 1, maxWidth: "40rem" }}>
									<h3>Request for a Documents</h3>
									<div className="alert alert-info">
										<b>{requestData?.lawyer}</b> has requested the following document for your matter as described in the letter "Request.pdf". Please complete
										this task by {requestData?.deadLine}.<br></br>
									</div>
									<div>PDF PREVIEW ISSUE #</div>
									{/* <DocumentRequestForm initialValues={{ id }} /> */}
								</Card>
							</div>
						</div>
					</aside>
					<section className="content col-lg-6">
						<Card>
							<p>1. CBA Smart Access, Lucas Cullen & Sara Skinner, Account Ending 0498</p>
							
							<div className="p-2">
								<Button>Upload</Button>
							</div>
						</Card>
						<section className="content col-lg-7"></section>
					</section>
				</section>
			</div>
		</Layout>
	);
};

export default DocumentRequest;
