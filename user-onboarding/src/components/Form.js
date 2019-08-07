import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import UserCard from './UserCard';
import * as Yup from 'yup';

const UserForm = ({ errors, touched, values, status }) => {
  const [users, setUsers] = useState([]);
  const [value, setValue] = useState({ name: "", email: "", password: "" });
  console.log(users);

  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
      setValue({ name: "", email: "", password: "" })
    }
  }, [status]);

  return (
    <>
      <div className="user-form">
        <h1>User Form</h1>
        <Form>
          <Field type="text" name="name" placeholder="Name" />
            <p className="field-description">Please enter your full name.</p>
            {touched.name && errors.name && (
              <p className="error">*{ errors.name }</p>
            )}
          <Field type="text" name="email" placeholder="Email" />
            <p className="field-description">Please enter a legitimate email address.</p>
            {touched.email && errors.email && (
              <p className="error">*{ errors.email }</p>
            )}
          <Field type="text" name="password" placeholder="Password" />
              <p className="field-description">Passwords must contain at least 8 characters.</p>
              {touched.password && errors.password && (
                <p className="error">*{ errors.password }</p>
              )}
            <label className="checkbox-container" >
              I have read and agreed to the Terms of Service
              <Field
                type="checkbox"
                name="termsOfService"
                checked={values.termsOfService}
              />
              <span className="checkmark" />
            </label>
          <button className="btn submit-btn" type="submit">Submit</button>
        </Form>
      </div>

      <div className="users-container">
        {users.map((user, index) => (
          <UserCard user={user}
                    key={index}
          />))}
      </div>
    </>  
  )
}

const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, termsOfService }) {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      termsOfService: termsOfService || false
    }
  },

  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required('This is a required field'),
    email: Yup.string()
      .required('Email is a required field'),
    password: Yup.string()
      .required('Password is a required field')
      .min(8, 'Please make sure your password contains at least 8 characters.')
  }),

  handleSubmit(values, { setStatus, setValue }) {
    axios
      .post('https://reqres.in/api/users/', values)
      .then(response => setStatus(response.data))
      .catch(error => console.log(error.response, error))
  },

})(UserForm)

export default FormikUserForm;