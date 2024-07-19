import React, { useState } from "react";
import styles from './ForgetPasswordThree.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { request } from "../../axios/axios";
import { toast } from "react-toastify";

export default function ForgetPasswordThree() {

  const [isLoading, setIsLoading] = useState(false);
  const navigate= useNavigate();
  const { token}= useParams();

  const validationSchema = Yup.object({
    password: Yup.string().required("Password is required").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "Password must contain special character, number more than 8 characters and less than 18 characters"),
    PasswordConfirm: Yup.string().required("RePassword is required").oneOf([Yup.ref('password')]),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      PasswordConfirm: '',
    },
    validationSchema,
      
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await request.post(`/users/resetPasswrod/${token}`, {
          password: values.password,
          PasswordConfirm: values.PasswordConfirm,
        });
        toast.success("Updated Password")
        navigate('/login');
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
  });


  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <h2 className={styles.forgetPasswordTitle}>Reset Your Password</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className={styles.inputWrapper}>
            <label className={styles.emailLabel} htmlFor="password">
              New Password
            </label>
            <label className={styles.emailLabel} htmlFor="password">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="*"
                className={styles.input}
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div
                  className={`alert alert-danger p-2 m-2 w-75 text-center ${styles.error}`}
                >
                  {formik.errors.password}
                </div>
              ) : null}
            </label>
          </div>

          <div className={styles.inputWrapper}>
            <label className={styles.emailLabel} htmlFor="PasswordConfirm">
              Repeat New Password
            </label>
            <label className={styles.emailLabel} htmlFor="PasswordConfirm">
              <input
                type="password"
                id="PasswordConfirm"
                name="PasswordConfirm"
                placeholder="*"
                className={styles.input}
                {...formik.getFieldProps("PasswordConfirm")}
              />
              {formik.touched.PasswordConfirm &&
              formik.errors.PasswordConfirm ? (
                <div
                  className={`alert alert-danger p-2 m-2 w-75 text-center ${styles.error}`}
                >
                  {formik.errors.PasswordConfirm}
                </div>
              ) : null}
            </label>
          </div>
          <div>
            <button type="submit" className={styles.sendButton}>
              {isLoading ? "Loading..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}