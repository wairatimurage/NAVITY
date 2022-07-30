import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { formatBlogDate } from "../utility/formatingFunctions";

const PostCard = ({ _post, ...props }) => {
  const _createExcerpt = (_text) => {
    // return {
    //   length: _text.split(" ").length,
    //   excerpt: _text.split(" ").splice(0, 70).join(" "),
    //   complete: _text,
    // };
    return _text.split(" ").splice(0, 50).join(" ");
  };
  return (
    <Link
      to={{ pathname: `/idea/${_post.title}`, state: _post }}
      className="ideas-card section-container"
    >
      <div className="idea-card-image">
        <p className="idea-card-title-small inner-section-title">
          {_post.title}
        </p>
        <img src={_post.image} alt="" />
      </div>
      <div className="idea-card-text">
        <p
          className="idea-card-title inner-section-title"
          style={{ color: "var(--orange)" }}
        >
          {_post.title}
        </p>
        <p className="idea-card-text excerpt-paragraph">
          {_createExcerpt(_post.articleText)}
        </p>
        <div className="article-actions">
          <div className="article-details">
            <span className="">
              {formatBlogDate(new Date(_post.publishedOn))}
            </span>
          </div>
          <ArticleActionButtons
            idea={{ id: _post.id, title: _post.title, stars: _post.stars }}
            profile={props.profile}
            loadProfile={props.loadProfile}
            loadIdeas={props.loadIdeas}
          />
        </div>
      </div>
    </Link>
  );
};

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // fetch list of posts
    setPosts([]);
  }, []);

  return (
    <div>
      {posts.map((_post) => (
        <PostCard key={_post.id} _post={_post} />
      ))}
    </div>
  );
};

export default Posts;
