import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import Icon from "react-icons-kit";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { arrows_exclamation } from "react-icons-kit/linea/arrows_exclamation";
import { arrows_circle_check } from "react-icons-kit/linea/arrows_circle_check";

const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [lowerValidated, setLowerValidated] = useState(false);
  const [upperValidated, setUpperValidated] = useState(false);
  const [numberValidated, setNumberValidated] = useState(false);
  const [specialValidated, setSpecialValidated] = useState(false);
  const [lengthValidated, setLengthValidated] = useState(false);

  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  // form function
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
        const { data } = await axios.put("/api/v1/auth/profile", {
          name,
          email,
          password,
          phone,
          address,
        });
        if (data?.error) {
          toast.error(data?.error);
        } else {
          setAuth({ ...auth, user: data?.updatedUser });
          let ls = localStorage.getItem("auth");
          ls = JSON.parse(ls);
          ls.user = data.updatedUser;
          localStorage.setItem("auth", JSON.stringify(ls));
          toast.success("Profile Updated Successfully");
        }
      } else {
        toast.error("Something Went Wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

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
  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-8">
            <div className="form-container" style={{ marginTop: "-40px" }}>
              <form onSubmit={handleSubmit}>
                <h4 className="title">USER PROFILE</h4>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Name"
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
                    disabled
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
                    <div
                      className={lowerValidated ? "validated" : "not-validated"}
                    >
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
                    <div
                      className={upperValidated ? "validated" : "not-validated"}
                    >
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
                    <div
                      className={
                        numberValidated ? "validated" : "not-validated"
                      }
                    >
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
                    <div
                      className={
                        specialValidated ? "validated" : "not-validated"
                      }
                    >
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
                    <div
                      className={
                        lengthValidated ? "validated" : "not-validated"
                      }
                    >
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Phone"
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
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
