import React from 'react';
import Header from './Header';
import Footer from './Footer';
import "./Layout.css";
import ErrorView from "./view/errorView/ErrorView";
const Layout = ({ children}: any) => {
  return (
    <>
      <ErrorView>
      <Header />
      {children}
      <Footer />
      </ErrorView>
    </>
  );
}

export default Layout;