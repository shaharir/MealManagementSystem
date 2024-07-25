/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/no-unescaped-entities */
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useLoginMutation } from "../../Redux/service/auth/authService";
import { useNavigate } from "react-router-dom";

export const DEFAULT_VALUE = {
  mobile: "01710303309",
  password: "123456",
};

const AddUser = () => {
  const naviagte = useNavigate();
  const [login, { data, isLoading }] = useLoginMutation();

  const schemaResolver = yup
    .object()
    .shape({
      mobile: yup.string().required("mobile is required"),
      password: yup.string().required("Password is required"),
    })
    .required();

  const methods = useForm({
    mode: "all",
    defaultValues: DEFAULT_VALUE,
    resolver: yupResolver(schemaResolver),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = (formData) => {
    login(formData);
  };

  useEffect(() => {
    if (data?.data?.token) {
      localStorage.setItem("token", data?.data?.token);
      naviagte("/");
    }
  }, [data]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center ">
        <div className="col-md-6 col-lg-4 ">
          <div
            className="card shadow-lg border-0 text-white"
            style={{ backgroundColor: "#001529" }}
          >
            <div className="card-body p-4">
              <h4 className="card-title text-center mb-4 fw-bolder">
                Login Form
              </h4>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">
                    Mobile
                  </label>
                  <div className="input-group">
                    <Controller
                      name="mobile"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className={`form-control ${
                            errors.mobile ? "is-invalid" : ""
                          }`}
                          placeholder="Mobile"
                          autoComplete="off"
                        />
                      )}
                    />
                    {errors.mobile && (
                      <div className="invalid-feedback">
                        {errors.mobile.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="input-group">
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="password"
                          className={`form-control ${
                            errors.password ? "is-invalid" : ""
                          }`}
                          placeholder="Password"
                          autoComplete="off"
                        />
                      )}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">
                        {errors.password.message}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn w-100"
                  style={{ backgroundColor: "#4184D0", color: "white" }}
                >
                  Login{isLoading && <Spinner animation="border" size="sm" />}
                </button>

                <div className="mt-3 text-center">
                  <p>
                    Don't have an account?{" "}
                    <a href="/registration" style={{ color: "#4184D0" }}>
                      Registration
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
