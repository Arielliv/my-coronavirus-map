import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { ScrollSync } from "react-scroll-sync";

import "assets/stylesheets/application.scss";

import Header from "components/Header";
import Section from "components/Section";

const Layout = ({ children, pageName }) => {
  let className = "";

  if (pageName) {
    className = `${className} page-${pageName}`;
  }

  return (
    <ScrollSync>
      <>
        <Helmet bodyAttributes={{ class: className }}>
          <title>Gatsby Site</title>
        </Helmet>
        <div className="wrapper">
          <Header />
          <div className="main-screen">
            <main className="main">{children}</main>
            <Section place="left" />
            <Section place="right" />
          </div>
        </div>
      </>
    </ScrollSync>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pageName: PropTypes.string
};

export default Layout;
