import React from "react";
import "./Home.css";

const Home = () => {
  const [hasAccount, setHasAccount] = useState(true);

  return (
    <div className="Home">
      <div className="video">
        <iframe width="400" height="300" src="https://www.youtube.com/embed/Vfsux6V2-hU?controls=0" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>
    </div>
  );
};

export default Home;
