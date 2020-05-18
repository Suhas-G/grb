import React from "react";
import Layout from "../../components/layouts/baseLayout";
import { Jumbotron } from "react-bootstrap";

class Poems extends Layout {

    renderContent() {
        return <Jumbotron className="content"></Jumbotron>
    }

}

export default Poems