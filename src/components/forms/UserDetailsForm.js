import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api, { open, secure } from "apis/api";
import { Button, Card, Modal } from "react-bootstrap";
import LabelledTable from "components/LabelledTable";
import { format as format$ } from "currency-formatter";

// todo: put initial values into the react state and pass it to the formik
// todo: add validation to the formik
// todo: add submit handler to the formik
let initialValues = {
    fName: "Johnsddfs",
    lName: "Smith",
    dob: "14/9/1975",
    address: "11 Smith Street, Sydney, NSW 2000",
    phone: "0459877564",
}


// const flattenData = () => {
//     return {
//         fName: "John",
//         lName: "Smith",
//         dob: "14/9/1975",
//         address: "11 Smith Street, Sydney, NSW 2000",
//         phone: "0459877564",
//     };
// };

const getColumns = (data) => {
    const map = {
        fName: {
            label: "First Name",
            format: (v) => v,
        },
        lName: {
            label: "Last Name",
            format: (v) => v,
        },
        dob: {
            label: "DOB",
            format: (v) => v,
        },
        address: {
            label: "Address",
            format: (v) => v,
        },
        phone: {
            label: "Phone Number",
            format: (v) => v,
        },
    };

    return Object.keys(data).map((key) => {
        return [map[key].label, map[key].format(data[key])];
    });
};

// Create a form that allows users to enter their name, DOB, Address, and Phone Number.

const UserDetailsForm = () => {
    const [showModal, setShowModal] = useState(false);

    // State variables for form values
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleOpenModal = () => {
        const data = flattenData();
        setFirstName(data.name);
        setLastName(data.matter);
        setDob(data.brc);
        setAddress(data.trust);
        setPhoneNumber(data.brc);

        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Update the client details in the LabelledTable component using the form values
        const updatedData = {
            name: firstName,
            matter: lastName,
            brc: dob,
            trust: address,
            brc: phoneNumber,
        };

        // todo: update the client details in the database
        // todo: update the client details in the LabelledTable component using the form values (updatedData) 
        // const updatedColumns = getColumns(updatedData);
        // // setColumns(updatedColumns);

        // Close the modal
        setShowModal(false);
    };

    const data = initialValues;
    const columns = getColumns(data);
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            dob: "",
            address: "",
            phoneNumber: "",
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(15, "Must be 15 characters or less")
                .required("Required"),
            lastName: Yup.string()
                .max(20, "Must be 20 characters or less")
                .required("Required"),
            dob: Yup.date()
                .max(new Date(), "Must be a valid date and not in the future")
                .required("Required"),
            address: Yup.string().required("Required"),
            phoneNumber: Yup.number().required("Required"),
        }),
        onSubmit: (values) => {
            console.log("This is cool");
            console.log(values);

            // todo: submit to api
            api
                .post("/user", values)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
            // open.post('/users', values)
            const apiUrl = "https://king-prawn-app-pb3h2.ondigitalocean.app/api";
        },
    });

    return (
        <>
            <div className="d-flex justify-content-between">
                <h4>Client Details</h4>
                <Button className="mb-3" onClick={handleOpenModal}>
                    <span className="mr-2">Edit</span>
                    <ion-icon name="create-outline" />
                </Button>
            </div>

            <LabelledTable columns={columns} hover={false} />

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Client Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                className="form-control"
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                className="form-control"
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="dob">DOB</label>
                            <input
                                id="dob"
                                name="dob"
                                type="date"
                                className="form-control"
                                onChange={(e) => setDob(e.target.value)}
                                value={dob}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input
                                id="address"
                                name="address"
                                type="text"
                                className="form-control"
                                onChange={(e) => setAddress(e.target.value)}
                                value={address}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="text"
                                className="form-control"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                value={phoneNumber}
                            />
                        </div>

                        <div className="text-center">
                            <Button type="submit">Save</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default UserDetailsForm;
