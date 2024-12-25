import Post from "./Post";
import "../assets/styles/post.css";

function ScrollView({ scrollRef, posts }) {
  return posts.length === 0 ? (
    <div className="no-posts-wrapper">
      <span className="no-posts">No posts Found</span>
    </div>
  ) : (
    <div className="infinite-scroll" ref={scrollRef}>
      {posts.map((post, index) => (
        <Post
          key={index}
          userImage={post.user.avatar}
          username={post.user.username}
          postImage={post.post.image}
          postText={post.post.text}
          postId={post.post.postid}
          likeCount={post.post.likes_no}
          userid={post.user.userid}
        />
      ))}
      <div className="no-more-posts">
        <span>No more posts to show...</span>
      </div>
    </div>
  );
}

export default ScrollView;
