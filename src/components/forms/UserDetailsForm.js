import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "apis/api";
import { Button, Card, Modal } from "react-bootstrap";
import LabelledTable from "components/LabelledTable";

const UserDetailsForm = () => {
    const [showModal, setShowModal] = useState(false);

    const [firstName, setFirstName] = useState("John");
    const [lastName, setLastName] = useState("Smith");
    const [dob, setDob] = useState("14/9/1975");
    const [address, setAddress] = useState("11 Smith Street, Sydney, NSW 2000");
    const [phoneNumber, setPhoneNumber] = useState("0459877564");

    let initialValues = {
        fName: firstName,
        lName: lastName,
        dob: dob,
        address: address,
        phone: phoneNumber,
    };

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

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

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
            console.log("NextSteps ?=> Submit to AS and backend.");
            console.log(values);
            setFirstName(values.firstName);
            setLastName(values.lastName);
            setDob(values.dob);
            setAddress(values.address);
            setPhoneNumber(values.phoneNumber);

            // todo: submit to api and action step
            // api.post("/user", values)
            //     .then((response) => {
            //         console.log(response.data, "response good");
            //     })
            //     .catch((error) => {
            //         console.log(error, "error");
            //     });

            setShowModal(false);
        },
    });

    const data = initialValues;
    const columns = getColumns(data);

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
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                className="form-control"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.firstName}
                            />
                            {formik.touched.firstName && formik.errors.firstName && (
                                <div className="error">{formik.errors.firstName}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                className="form-control"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.lastName}
                            />
                            {formik.touched.lastName && formik.errors.lastName && (
                                <div className="error">{formik.errors.lastName}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="dob">DOB</label>
                            <input
                                id="dob"
                                name="dob"
                                type="date"
                                className="form-control"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.dob}
                            />
                            {formik.touched.dob && formik.errors.dob && (
                                <div className="error">{formik.errors.dob}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input
                                id="address"
                                name="address"
                                type="text"
                                className="form-control"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address}
                            />
                            {formik.touched.address && formik.errors.address && (
                                <div className="error">{formik.errors.address}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="text"
                                className="form-control"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phoneNumber}
                            />
                            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                <div className="error">{formik.errors.phoneNumber}</div>
                            )}
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
