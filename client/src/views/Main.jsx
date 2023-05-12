import { useEffect, useState } from "react";
import AuthorList from "../components/AuthorList";
import axios from "axios";

const Main = () => {
  const [authors, setAuthors] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const toggleLoaded = (loaded) => {
    setLoaded(loaded);
  } 

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/authors")
      .then((res) => {
        setAuthors(res.data);
        setLoaded(true);
      })
      .catch((err) => console.error(err));
  }, [loaded]);

  return (
    <>
      {loaded && <AuthorList setLoaded={toggleLoaded} authors={authors} />}
    </>
  );
};
export default Main;