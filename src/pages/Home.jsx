import { useRef, useState, useEffect } from "react";

import ScrollView from "../components/ScrollView";
import SideBar from "../components/SideBar";
import { getFeedScrollContent } from "../services/getFeed";
import Loading from "../components/Loading";
function Home() {
  const scrollRef = useRef(null);
  const [feedPosts, setFeedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const getFeed = await getFeedScrollContent();
        if (getFeed) {
          setFeedPosts(getFeed);
        }
      } catch (error) {
        console.error("Error fetching feed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeed();
  }, []); // Empty dependency array means run once on mount
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="home">
      <SideBar scrollRef={scrollRef} />
      <ScrollView scrollRef={scrollRef} posts={feedPosts} />
    </div>
  );
}

export default Home;
