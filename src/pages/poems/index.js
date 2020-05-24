import React from "react";
import Layout from "../../components/layouts/baseLayout";
import { Jumbotron, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import PoemStyles from "./style.module.scss";

const poemList = require("../../data/poems.json");

class Poems extends Layout {
  renderContent() {
    const poems = poemList.poems.map((poem) => {
      return this.getPoem(poem);
    });
    return (
      <Jumbotron className="content">
        <Container className={PoemStyles.container}>
            <h2 className={PoemStyles.listTitle}>ಕವನ ಸಂಕಲನ</h2>
            <div className={PoemStyles.poemList}>{poems}</div>
            <div className={PoemStyles.footer}>
              <Link to="/write/poems" className={PoemStyles.newButton}>
                New
              </Link>
            </div>
        </Container>
      </Jumbotron>
    );
  }

  getPoem(poem) {
    return (
      <Link
        to={`/poems/${poem.id}`}
        key={poem.id}
        className={PoemStyles.poemListItem}
      >
        {poem.title}
      </Link>
    );
  }
}

export default Poems;
