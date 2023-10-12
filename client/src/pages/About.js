import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            If you would like to experience the best of online shopping for men,
            women and kids in India, you are at the right place. Web-Store is
            the ultimate destination for fashion and lifestyle, being host to a
            wide array of merchandise including clothing, footwear, accessories,
            jewellery, personal care products and more. It is time to redefine
            your style statement with our treasure-trove of trendy items. Our
            online store brings you the latest in designer products straight out
            of fashion houses. You can shop online at Web-Store from the comfort
            of your home and get your favourites delivered right to your
            doorstep.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
