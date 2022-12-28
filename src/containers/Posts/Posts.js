import React, { Component } from "react";
import axios from "../../axios";
import Post from "../../components/Post/Post";
import Spinner from "../../components/Spinner/Spinner";
import { Route } from "react-router-dom";
import FullPost from "../FullPost/FullPost";
import "./Posts.css";

class Posts extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false,
    loading: true,
  };

  componentDidMount() {
    axios
      .get("/posts")
      .then((response) => {
        const post = response.data.slice(0, 4);
        const updatedPost = post.map((post) => {
          return {
            ...post,
            author: "Akuna",
          };
        });
        this.setState({
          posts: updatedPost,
          loading: false,
        });
      })
      .catch((error) => this.setState({ error: true }));
  }

  selectedPostHandler = (id) => {
    this.props.history.push("/" + id);
  };

  render() {
    let posts = <Spinner />;
    if (!this.state.error && !this.state.loading) {
      posts = this.state.posts.map((post) => (
        <Post
          key={post.id}
          author={post.author}
          title={post.title}
          clicked={() => this.selectedPostHandler(post.id)}
        />
      ));
    }
    return (
      <div>
        <section className="Posts">{posts}</section>;
        <Route path="/:id" component={FullPost} />
      </div>
    );
  }
}

export default Posts;
