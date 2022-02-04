import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const [details, setDetails] = useState([]);
  const id = useParams().id;


  useEffect(() => {
    axios.get(`https://aircall-job.herokuapp.com/activities/${id}`).then((result) => {
      setDetails(result.data);
    });
  }, []);


  // sort calls by timestamp

  return <div>{}</div>;
};

export default Details;
