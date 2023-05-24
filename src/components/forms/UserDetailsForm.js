import React from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { open, secure } from "apis/api";

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
            // todo: submit to api
            // open.post('/users', values)
            const apiUrl = "https://king-prawn-app-pb3h2.ondigitalocean.app/api";

            fetch(apiUrl)
                .then(response => {
                    if (response.ok) {
                        console.log("API is working");
                    } else {
                        console.log("API is not working");
                    }
                })
                .catch(error => {
                    console.log("Error occurred while testing API:", error);
                });
            
            alert(JSON.stringify(values, null, 2));
        }
    });


    return (<>

        <div>
            <h1>User Details Form</h1>
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

                <button type="submit">Submit</button>
                {/* <div> */}
            </form>

        </div>


    </>
    )




}




export default UserDetailsForm;