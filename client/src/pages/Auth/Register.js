import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

import Icon from "react-icons-kit";
import { basic_eye } from "react-icons-kit/linea/basic_eye";
import { basic_eye_closed } from "react-icons-kit/linea/basic_eye_closed";
import { arrows_exclamation } from "react-icons-kit/linea/arrows_exclamation";
import { arrows_circle_check } from "react-icons-kit/linea/arrows_circle_check";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // form function

  // validated states
  const [lowerValidated, setLowerValidated] = useState(false);
  const [upperValidated, setUpperValidated] = useState(false);
  const [numberValidated, setNumberValidated] = useState(false);
  const [specialValidated, setSpecialValidated] = useState(false);
  const [lengthValidated, setLengthValidated] = useState(false);
  let f1 = 0,
    f2 = 0,
    f3 = 0,
    f4 = 0,
    f5 = 0;
  //validation
  const handleChange = (value) => {
    const lower = new RegExp("(?=.*[a-z])");
    const upper = new RegExp("(?=.*[A-Z])");
    const number = new RegExp("(?=.*[0-9])");
    const special = new RegExp("(?=.[!@#$%^&])");
    const length = new RegExp("(?=.{8,})");
    if (lower.test(value)) {
      setLowerValidated(true);
    } else {
      setLowerValidated(false);
    }
    if (upper.test(value)) {
      setUpperValidated(true);
    } else {
      setUpperValidated(false);
    }
    if (number.test(value)) {
      setNumberValidated(true);
    } else {
      setNumberValidated(false);
    }
    if (special.test(value)) {
      setSpecialValidated(true);
    } else {
      setSpecialValidated(false);
    }
    if (length.test(value)) {
      setLengthValidated(true);
    } else {
      setLengthValidated(false);
    }
    setPassword(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //e.handleChange();
    //validation(password);
    const lower = new RegExp("(?=.*[a-z])");
    const upper = new RegExp("(?=.*[A-Z])");
    const number = new RegExp("(?=.*[0-9])");
    const special = new RegExp("(?=.[!@#$%^&])");
    const length = new RegExp("(?=.{8,})");
    try {
      if (
        lower.test(password) &&
        upper.test(password) &&
        number.test(password) &&
        special.test(password) &&
        length.test(password)
      ) {
        const res = await axios.post("/api/v1/auth/register", {
          name,
          email,
          password,
          phone,
          address,
          answer,
        });
        if (res && res.data.success) {
          toast.success(res.data && res.data.message);
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      } else {
        toast.error("Strong Password is required");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register - Ecommer App">
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">REGISTER FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Name"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              maxLength={8}
              minLength={6}
              onChange={(e) => handleChange(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
            {/* {type === "password" ? (
              <span className="icon-span" onClick={() => setType("text")}>
                <Icon icon={basic_eye_closed} size={18} />
              </span>
            ) : (
              <span className="icon-span" onClick={() => setType("password")}>
                <Icon icon={basic_eye} size={18} />
              </span>
            )} */}
            <main className="tracker-box">
              <div className={lowerValidated ? "validated" : "not-validated"}>
                {lowerValidated ? (
                  <span className="list-icon green">
                    <Icon icon={arrows_circle_check} />
                  </span>
                ) : (
                  <span className="list-icon">
                    <Icon icon={arrows_exclamation} />
                  </span>
                )}
                At least one lowercase letter
              </div>
              <div className={upperValidated ? "validated" : "not-validated"}>
                {upperValidated ? (
                  <span className="list-icon green">
                    <Icon icon={arrows_circle_check} />
                  </span>
                ) : (
                  <span className="list-icon">
                    <Icon icon={arrows_exclamation} />
                  </span>
                )}
                At least one uppercase letter
              </div>
              <div className={numberValidated ? "validated" : "not-validated"}>
                {numberValidated ? (
                  <span className="list-icon green">
                    <Icon icon={arrows_circle_check} />
                  </span>
                ) : (
                  <span className="list-icon">
                    <Icon icon={arrows_exclamation} />
                  </span>
                )}
                At least one number
              </div>
              <div className={specialValidated ? "validated" : "not-validated"}>
                {specialValidated ? (
                  <span className="list-icon green">
                    <Icon icon={arrows_circle_check} />
                  </span>
                ) : (
                  <span className="list-icon">
                    <Icon icon={arrows_exclamation} />
                  </span>
                )}
                At least one special character
              </div>
              <div className={lengthValidated ? "validated" : "not-validated"}>
                {lengthValidated ? (
                  <span className="list-icon green">
                    <Icon icon={arrows_circle_check} />
                  </span>
                ) : (
                  <span className="list-icon">
                    <Icon icon={arrows_exclamation} />
                  </span>
                )}
                At least 8 characters
              </div>
            </main>
          </div>
          <div className="mb-3">
            <input
              type="text"
              minLength={10}
              maxLength={10}
              value={phone}
              onChange={(e) => {
                if (e.target.value.length > 10) {
                  return;
                }
                setPhone(e.target.value);
              }}
              // handlephone(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Phone"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="What is Your Favorite sports"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            REGISTER
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
