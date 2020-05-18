import React from "react";
import Navbar from "../../common/navbar";
import LayoutStyles from "./style.module.scss";


class Layout extends React.Component {
  render() {
    return (
      <main id={LayoutStyles.layout}>
        <Navbar />
        {this.renderContent()}
      </main>
    );
  }

  renderContent() {}
}

export default Layout;