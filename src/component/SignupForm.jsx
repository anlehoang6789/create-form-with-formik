import { useFormik } from "formik";
import * as Yup from "yup";
import "./signup.css";

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required")
        .min(5, "Must be 5 characters or more"),
      email: Yup.string()
        .required("Required")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please enter a valid email address"
        ),
      password: Yup.string()
        .required("Required")
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
          "Password must be minimum eight characters, at least one uppercase, one number and one special character"
        ),
      confirmPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Password must match"),
      phone: Yup.string()
        .required("Required")
        .matches(
          /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
          "Must be a valid phone number"
        ),
    }),
    onSubmit: (values) => {
      window.alert("Form submited!!!");
      console.log(values);
    },
  });

  return (
    <section>
      <form className="infoform" onSubmit={formik.handleSubmit}>
        <label>Your Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder="Enter your name"
        />
        {formik.errors.name && <p className="errorMsg">{formik.errors.name}</p>}

        <label>Email address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="Enter your email"
        />
        {formik.errors.email && (
          <p className="errorMsg">{formik.errors.email}</p>
        )}

        <label>Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          placeholder="Enter your phone"
        />
        {formik.errors.phone && (
          <p className="errorMsg">{formik.errors.phone}</p>
        )}

        <label>Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder="Enter your password"
        />
        {formik.errors.password && (
          <p className="errorMsg">{formik.errors.password}</p>
        )}

        <label>Confirm password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          placeholder="Confirm password"
        />
        {formik.errors.confirmPassword && (
          <p className="errorMsg">{formik.errors.confirmPassword}</p>
        )}

        <button type="submit"> Continue</button>
      </form>
    </section>
  );
};

export default SignupForm;
