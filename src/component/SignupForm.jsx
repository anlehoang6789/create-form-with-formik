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

// Cách thông thường để tạo form là dùng useState() để set thay đổi giá trị cho các ô input
// Và dùng useEffect() với tham số là các state để if-else điều kiện check lỗi
// Nhưng cách này sẽ rất tốn sức vì ph tạo khá nhiều state và ph dùng rất nhiều useEffect() với tham số state
// if nó để set điều kiện input

// Nhưng ta sẽ dùng formik để quản lí form thay cho dùng useState()
// Kết hợp với Yup để validation các regex cho input
/**
 * Lợi ích của formik-- giúp hiển thị ra lỗi trực tiếp bên dưới input
 * 1. Dùng useFormik và tạo 1 giá trị ban đầu (initialValue)
 * 2. formik cung cấp sẵn handleChange để nhận giá trị thay đổi của input . Nhớ là thằng này cần
 *      thêm 1 value {values.name} để có thể biết sẽ thay đổi thằng nào
 * 3. Lưu ý: đặt id và name trong input phải trùng với initialValue của formik
 * 4. Và để submit form formik cũng hỗ trợ 1 hàm built in là handleSubmit
 * 5. Và để hiển thị lỗi thì formik có hỗ trợ 1 cái là formik.errors -- và chỉ cần để chúng dưới input để
 *      khi có lỗi sẽ hiển thị ra ngay bên dưới input
 */

/**
 * Đối với Yup thì ta có thể tạo ra một validationSchema và chứa 1 Yup.object -- để tạo ra 1 luật lệ cho input
 */
