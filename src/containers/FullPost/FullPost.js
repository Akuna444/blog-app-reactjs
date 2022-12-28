import axios from "axios";
import React, { Component } from "react";
import Spinner from "../../components/Spinner/Spinner";
import "./FullPost.css";

class FullPost extends Component {
  state = {
    loadedPost: null,
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    this.loadData();
  }

  loadData() {
    if (this.props.match.params.id) {
      if (
        !this.state.loadedPost ||
        (this.state.loadedPost &&
          this.state.loadedPost.id !== this.props.match.params.id)
      ) {
        axios
          .get("posts/" + this.props.match.params.id)
          .then((response) => this.setState({ loadedPost: response.data }));
      }
    }
  }

  deletePostHandler = () => {
    axios
      .delete("posts/" + this.props.match.params.id)
      .then((response) => console.log(response));
  };

  render() {
    let post = <Spinner />;

    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button onClick={this.deletePostHandler} className="Delete">
              Delete
            </button>
          </div>
        </div>
      );
    }

    return post;
  }
}

export default FullPost;
