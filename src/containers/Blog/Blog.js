import React, { Component, Suspense } from "react";
import Posts from "../Posts/Posts";
import Spinner from "../../components/Spinner/Spinner";
import "./Blog.css";
import { Route, NavLink, Switch } from "react-router-dom";
const NewPost = React.lazy(() => import("../NewPost/NewPost"));

class Blog extends Component {
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/" exact>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/new-post">New Post</NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <section>
          <Switch>
            <Route
              path="/new-post"
              render={() => (
                <Suspense fallback={Spinner}>
                  <NewPost />
                </Suspense>
              )}
            />
            <Route path="/" component={Posts} />
          </Switch>
        </section>
      </div>
    );
  }
}

export default Blog;
