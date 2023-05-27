import React from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import api, { open, secure } from "apis/api";
import { Button, Card } from "react-bootstrap";

// Create a form that allows users to enter their name, DOB, Address, and Phone Number.

const UserDetailsForm = () => {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            dob: '',
            address: '',
            phoneNumber: ''
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            lastName: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            dob: Yup.date()
                .max(new Date(), 'Must be a valid date and not in the future')
                .required('Required'),
            address: Yup.string()
                .required('Required'),
            phoneNumber: Yup.number()
                .required('Required')
        }),
        onSubmit: values => {
            console.log("This is cool")
            console.log(values)


            // todo: submit to api
            api.post('/user', values)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
            // open.post('/users', values)
            const apiUrl = "https://king-prawn-app-pb3h2.ondigitalocean.app/api";
        }
    });


    return (<>

        <div>
            <h4>Client Details</h4>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                />

                <label htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                />

                <label htmlFor="dob">DOB</label>
                <input
                    id="dob"
                    name="dob"
                    type="date"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />

                <label htmlFor="address">Address</label>
                <input
                    id="address"
                    name="address"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                />

                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.phoneNumber}
                />

                <Button block className="mt-2" type="submit">Save</Button>
                {/* <div> */}
            </form>

        </div>


    </>
    )




}




export default UserDetailsForm;