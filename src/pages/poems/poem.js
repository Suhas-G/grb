import React from "react";
import Layout from "../../components/layouts/baseLayout";
import PoemStyles from "./style.module.scss";
import Axios from "axios";
import { Jumbotron, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

const poemList = require("../../data/poems.json");

class Poem extends Layout {
  state = {
    id: "",
    title: "",
    createdTime: "",
    updatedTime: "",
    paragraphs: [],
  };

  constructor(props) {
    super(props);
    this.postList = poemList.poems;
    this.dataType = 'poems';
    if (this.props) {
      this.postId = this.props.match.params.id;
    }
  }

  componentDidMount() {
    if (this.postId) {
      const filename = this.postList[
        this.findPostById(this.postId, this.postList)
      ].filename;
      Axios.get(`/data/${this.dataType}/${filename}`)
        .then((response) => {
          const data = response.data;
          console.log(data);
          this.setState({
            id: data.id,
            title: data.title,
            paragraphs: data.paragraphs,
          });
        })
        .catch((error) => console.error(error));
    }
  }

  findPostById(id, postList) {
    const postIndex = postList.findIndex((postData) => {
      return String(postData.id) === String(id);
    });
    return postIndex;
  }

  renderContent() {
    const paragraphs = this.getParagraphs();
    return (
      <Jumbotron className="content">
        <Container className={PoemStyles.poem}>
          <h2 className={PoemStyles.poemTitle}>{this.state.title}</h2>
          <div className={PoemStyles.paragraphs}>{paragraphs}</div>
        </Container>
        <Link className={PoemStyles.editButton} to={`/poems/${this.state.id}/edit`}>
            <FontAwesomeIcon icon={faPencilAlt} />
        </Link>
      </Jumbotron>
    );
  }

  getParagraphs() {
    const paragraphs = this.state.paragraphs.map((paragraph, index) => {
      return (
        <div className={PoemStyles.paragraph} key={index}>
          {paragraph.map((line, index) => {
            return (
              <div className={PoemStyles.line} key={index}>
                {line}
              </div>
            );
          })}
        </div>
      );
    });
    return paragraphs;
  }
}

export default Poem;
