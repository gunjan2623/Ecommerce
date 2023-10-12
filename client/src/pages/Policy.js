import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>
            We know that you care how information about you is used and shared,
            and we appreciate your trust that we will do so carefully and
            sensibly. This Privacy Notice describes how Web-Store Seller
            Services Private Limited and its affiliates including Web-Store.com,
            Inc. (collectively "Web-Store") collect and process your personal
            information through Web-Store websites, devices, products, services,
            online marketplace and applications that reference this Privacy
            Notice (together "Web-Store Services").
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
