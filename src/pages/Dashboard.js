import React, { useContext, useState, useRef } from "react";
import useSWR from "swr";
import Layout from "components/layout/Layout";
import DocumentTable from "components/documents/DocumentTable";
import TransactionTable from "components/transactions/TransactionTable";
import CurrentInvoice from "components/invoice/CurrentInvoice";
import WorkUpdate from "components/invoice/WorkUpdate";
import UserDetails from "components/users/UserDetails";
import ErrorMessage from "components/ErrorMessage";
import Loader from "components/Loader";
import { AuthContext } from "components/auth/Auth";
import UserDetailsForm from "../components/forms/UserDetailsForm";

import Card from "components/Card";
import "./Dashboard.scss";

import { CSVLink } from "react-csv";
import { Alert, Button, Container, Modal } from "react-bootstrap";
import api from "../apis/api";
import Summary from "components/Summary";

const Dashboard = () => {
	const { user } = useContext(AuthContext);
	const [year, setYear] = useState(new Date().getFullYear());
	const [transactionsDownload, setTransactionsDowload] = useState([]);
	const [downloadError, setDownloadError] = useState({
		show: false,
		message: ""
	});

	const csvRef = useRef();

	const { data: userDetails, error: fetchDetailsError } = useSWR(`/users/${user.email}`);
	const { data: interactions, error: fetchInteractionsError } = useSWR(`/interactions/${user.email}`);
	const { data: documents, error: fetchDocumentsError } = useSWR(`/documents/${user.email}`);
	const { data: summary, error: fetchSummaryError } = useSWR(`/users/${user.email}/summary`);
	const { data: invoices } = useSWR(`/invoices/${user.email}`);

	// model for update details
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	// todo: query the user and if they have saved their user details, then set the model to true so it shows them the UpdateDetailsForm

	const isFetching = false;
	const currentYear = new Date().getFullYear();

	const handleDownload = async () => {
		setDownloadError({ show: false, message: "" });
		try {
			if (year) {
				const filterTransactions = await api.secure.get(`/transaction/download/${year}`);
				if (filterTransactions.data.length > 0) {
					setTransactionsDowload(filterTransactions.data);
					await new Promise((resolve) => setTimeout(resolve, 3000));
					csvRef.current.link.click();
				} else {
					setDownloadError({ show: true, message: "No transactions found" });
				}
			}
		} catch (error) {
			console.error(error);
			setDownloadError({ show: true, message: error.message });
		}
	};

	return (
		<Layout activeTab="Dashboard">
			<div className="dashboard container-fluid py-4">
				<Loader loading={false} />

				<div className="container">
					<div className="row text-center justify-content-center mb-5">
						<div className="col-xl-12 col-lg-12">
							<h2>{summary?.matter || "No matter assigned"}</h2>
						</div>
					</div>
				</div>

				<section className="main row">
					{/* <div className={isVerified ? "overlay" : "overlay active"} /> */}
					<aside className="col-lg-5">
						<section>
							<Card>
								<h4>Account Details</h4>
								<ErrorMessage error={fetchDetailsError} />
								<Loader loading={isFetching} />
								<UserDetails details={userDetails} />
							</Card>
						</section>

						<section>
							<Button block variant="primary" onClick={handleShow} className="mt-2">
								Update my details
							</Button>

							<Modal show={show} onHide={handleClose}>
								<Modal.Header closeButton>
									<Modal.Title>
										{" "}
										<h1>User Details</h1>
									</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<UserDetailsForm iv={userDetails} afterSubmit={handleClose} />
								</Modal.Body>
								<Modal.Footer>
									<Button variant="secondary" onClick={handleClose}>
										Close
									</Button>
								</Modal.Footer>
							</Modal>

							<Button
								block
								// variant="link"
								className="mt-2"
								// onClick={() => history.push("/login")}
							>
								Book a call
							</Button>
						</section>

						{/* <section style={{ position: "relative" }}> */}
						<section>
							<Card>
								<h4>Invoices</h4>
								<ErrorMessage error={fetchDetailsError} />
								<Loader loading={isFetching} />

								<CurrentInvoice invoice={invoices?.last}></CurrentInvoice>
								<WorkUpdate update={invoices?.update}></WorkUpdate>
							</Card>
						</section>
						<section>
							<Button
								block
								className="mt-2"
								// onClick={() => history.push("/login")}
							>
								Deposit Crypto
							</Button>
							{/* <Button
                block
                className="mt-2"
              >
                View payments
              </Button> */}
							<Button
								block
								className="mt-2"
								// onClick={() => history.push("/login")}
							>
								Apply for finance
							</Button>
						</section>
					</aside>
					<section className="content col-lg-7">
						<section style={{ position: "relative" }}>
							<Summary summary={summary}></Summary>
							<Card>
								<div className="d-flex flex-row">
									<div className="mr-auto p-2">
										<h4>Interactions</h4>
									</div>
									<div className="p-2">
										<select
											className="form-control"
											id="downloadYear"
											onChange={(e) => {
												setYear(e.target.value);
											}}
										>
											<option>{currentYear}</option>
											<option>{currentYear - 1}</option>
											<option>{currentYear - 2}</option>
											<option>{currentYear - 3}</option>
										</select>
									</div>
									<div className="p-2">
										<Button onClick={handleDownload}>Download CSV</Button>
										<CSVLink data={transactionsDownload} filename={"User-transactions.csv"} className="hidden" target="_blank" ref={csvRef} />
									</div>
								</div>
								{downloadError.show && <Alert variant="danger">{downloadError.message}</Alert>}
								<ErrorMessage error={fetchInteractionsError} />
								<Loader loading={isFetching} />
								<TransactionTable transactions={interactions} />
							</Card>
							<Card>
								<div className="d-flex flex-row">
									<div className="mr-auto p-2">
										<h4>Documents</h4>
									</div>
									<div className="p-2">
										<Button onClick={handleDownload}>Upload Documents</Button>
									</div>
								</div>
								<ErrorMessage error={fetchDocumentsError} />
								<Loader loading={isFetching} />
								<DocumentTable documents={documents} />
							</Card>
						</section>
					</section>
				</section>
			</div>
		</Layout>
	);
};

export default Dashboard;
