import Post from "./Post";
import "../assets/styles/post.css";
import { useLayoutEffect } from "react";

function ScrollView({ scrollRef, posts }) {
  useLayoutEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current.scrollTop = -scrollRef.current.scrollHeight;
      }, 0);
    }
  }, []);

  return posts.length === 0 ? (
    <div className="no-posts-wrapper">
      <span className="no-posts">No posts Found</span>
    </div>
  ) : (
    <div className="infinite-scroll" ref={scrollRef}>
      <div className="no-more-posts">
        <span>No more posts to show...</span>
      </div>
      {posts.map((post, index) => (
        <Post
          key={index}
          userImage={post.user.avatar}
          username={post.user.username}
          postImage={post.post.image}
          postText={post.post.caption}
          postId={post.post.postid}
          likeCount={post.post.likes_no}
          userid={post.user.userid}
        />
      ))}
    </div>
  );
}

export default ScrollView;
