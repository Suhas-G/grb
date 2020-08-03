import React from "react";
import Layout from "../../components/layouts/baseLayout";
import { Jumbotron, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import PoemStyles from "./style.module.scss";
import { withAuthenticatedHOC } from "../../auth/auth_utils";
import PaginationComponent from "../../components/common/pagination";

const poemList = require("../../data/poems.json");

const START_PAGE = 0;
const POEMS_PER_PAGE = 10;

class Poems extends Layout {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: START_PAGE,
      poemsPerPage: POEMS_PER_PAGE,
      totalPages: Math.ceil(poemList.poems.length / POEMS_PER_PAGE),
    };
    // this.currentPage = 0
    // this.poemsPerPage = 10
    // this.totalPages = Math.ceil(poemList.poems.length / this.poemsPerPage);
  }

  getPaginatedPoems() {
    const start = this.state.currentPage * this.state.poemsPerPage;
    const end = start + this.state.poemsPerPage;
    return poemList.poems.slice(start, end);
  }

  pageClicked(page) {
    this.state.currentPage = page;
    this.setState(this.state);
  }

  renderContent() {
    const poems = this.getPaginatedPoems().map((poem) => {
      return this.getPoem(poem);
    });
    return (
      <Jumbotron className="content">
        <Container className={PoemStyles.container}>
          <h2 className={PoemStyles.listTitle}>ಕವನ ಸಂಕಲನ</h2>
          <div className={PoemStyles.poemList}>{poems}</div>
          {this.props.isAuthenticated && (
            <div className={PoemStyles.footer}>
              <Link to="/write/poems" className={PoemStyles.newButton}>
                New
              </Link>
            </div>
          )}
          <div className={PoemStyles.pagination}>
            <PaginationComponent
              currentPage={this.state.currentPage}
              totalPages={this.state.totalPages}
              callback={this.pageClicked}
              context={this}
            />
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

export default withAuthenticatedHOC(Poems);
