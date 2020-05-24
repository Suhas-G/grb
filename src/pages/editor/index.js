import React from "react";
import {
  Button,
  ButtonToolbar,
  Container,
  Form,
  Jumbotron,
} from "react-bootstrap";
import Layout from "../../components/layouts/baseLayout";
import EditorStyles from "./style.module.scss";
import axios from 'axios'



class Editor extends Layout {
  state = {
    paragraphs: [""],
    title: "",
  };


  constructor(props) {
    super(props);
    this.dataType = 'posts';
    this.postList = [];
    this.APIUrl = '';
    this.postId = '';
  }

  renderContent() {
    // this.initiateEditor();
    return (
      <Jumbotron className="content">
        <Container>
          <ButtonToolbar
            className={`justify-content-between ${EditorStyles.toolbar}`}
            aria-label="Toolbar with Button groups"
          >
            <Button variant="danger" onClick={this.onClear}>
              Clear
            </Button>
            <Button variant="success" onClick={this.onSave}>
              Save
            </Button>
          </ButtonToolbar>
        </Container>
        <Container className={EditorStyles.editorContainer}>
          <div className={EditorStyles.titleField}>
            <label htmlFor="title">Title</label>
            <Form.Control
              type="text"
              name="title"
              id="title"
              onChange={(event) => this.handleTitleChange(event)}
              value={this.state.title}
            ></Form.Control>
            <div id="titleRequiredTooltip" style={{ display: "none" }}>
              Title is required
            </div>
          </div>
          <div id="editorjs">{this.renderEditor()}</div>
        </Container>
      </Jumbotron>
    );
  }

  handleTitleChange(event) {
    this.state.title = event.target.value;
    const titleTooltip = document.getElementById("titleRequiredTooltip");
    titleTooltip.style.display = "none";
    this.setState({ title: this.state.title });
  }

  onSave = async () => {
    const titleTooltip = document.getElementById("titleRequiredTooltip");
    if (!this.state.title) {
      titleTooltip.style.display = "block";
      titleTooltip.style.color = "red";
      return;
    }
    const data = {};
    data.dataType = this.dataType;
    data.id = this.getPostId();
    data.paragraphs = this.state.paragraphs.filter(
      (value) => value.trim() !== ""
    );
    data.title = this.state.title;
    data.time = new Date();
    console.log(data);
    this.savePost(data);
  };

  onClear = () => {
    this.state.paragraphs = [""];
    this.setState({ paragraphs: this.state.paragraphs });
  };

  renderEditor() {
    const paragraphs = this.state.paragraphs.map((value, index) => {
      return (
        <React.Fragment key={index}>
          <div className={EditorStyles.paragraphField}>
            <textarea className="paragraphTextArea"
              onChange={(event) => this.handleParagraphChange(event, index)}
              value={value}
              rows= {value.split(/\r?\n/).length}
            />
            <div>
              <Button
                variant="danger"
                className={`mx-1 ${EditorStyles.deleteButton}`}
                onClick={(event) => {
                  this.onDeleteParagraph(event, index);
                }}
              >
                -
              </Button>
              <Button
                variant="light"
                className={`mx-1 ${EditorStyles.addButton}`}
                onClick={(event) => {
                  this.onAddParagraph(event, index);
                }}
              >
                +
              </Button>
            </div>
          </div>
        </React.Fragment>
      );
    });

    return paragraphs;
  }

  handleParagraphChange(event, index) {
    this.state.paragraphs[index] = event.target.value;
    this.setState({ paragraphs: this.state.paragraphs });
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  }

  onAddParagraph(event, index) {
    this.state.paragraphs.splice(index + 1, 0, "");
    this.setState({ paragraphs: this.state.paragraphs });
  }

  onDeleteParagraph(event, index) {
    if (index === 0 && this.state.paragraphs.length === 1) {
      this.state.paragraphs = [""];
    } else {
      this.state.paragraphs.splice(index, 1);
    }

    this.setState({ paragraphs: this.state.paragraphs });
  }

  getPostId(){}

  async savePost(data) {
    axios({
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      },
      method: "POST",
      url: this.APIUrl,
      data: data
    }).then(data => {
      console.log(data)
    }).catch(error => {
      console.error(error)
    });
  }
}




export default Editor;
