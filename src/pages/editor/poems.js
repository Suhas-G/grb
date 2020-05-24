import Editor from ".";
import Axios from "axios";
const poemList = require('../../data/poems.json');

const APIUrl =
  "https://gj575k2es5.execute-api.us-east-1.amazonaws.com/default/savePost";


class PoemEditor extends Editor {
  constructor() {
    super();
    this.dataType = "poems";
    this.postList = poemList.poems;
    this.APIUrl = APIUrl;
    if (this.props) {
        this.postId = this.props.match.params.id;
    }
    
  }

  componentDidMount() {
      if (this.postId) {
          const filename = this.postList[this.findPostById(this.postId, this.postList)].filename;
          Axios.get(`./data/${this.dataType}/${filename}`)
          .then(data => console.log(data))
          .catch(error => console.error(error));
      }
  }

  findMaximumId(postList) {
    const ids = postList.map((postData) => {
      return postData.id;
    });
    return Math.max(ids);
  }

  findPostById(id, postList) {
    const postIndex = postList.findIndex((postData) => {
      return postData.id === id;
    });
    return postIndex;
  }

  getPostId() {
      if (this.postId) {
          return this.postId;
      } else {
          return this.findMaximumId(this.postList) + 1;
      }
  }
}

export default PoemEditor
