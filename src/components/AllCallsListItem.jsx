import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import iconsObject from "../icons/icons-object";
import getDate from "../helpers/get-date";
import getTime from "../helpers/get-time";

const AllCallsListItem = (props) => {
  const [clicked, setClicked] = useState(false);
  const date = getDate(props.created);
  const time = getTime(props.created);

  useEffect(() => {
    const JSON = props.is_archived
      ? { is_archived: false }
      : { is_archived: true };
    if (clicked) {
      axios.post(`https://aircall-job.herokuapp.com/activities/${props.id}`, JSON)
        .then(() => {
            props.setUpdatePage(true);
          },
          (error) => {
            console.log(error);
          }
        );
    }
    return () => setClicked(false);
  }, [clicked]);

  const archiveCall = () => { setClicked(true)};

  const archBtn = props.is_archived
    ? iconsObject.unarchive
    : iconsObject.archive;

  const infoBtn = iconsObject.info;

  const dateClass = props.sameDate ? "same-date" : "date";
  return (
    <div className="call">
      <div className={dateClass}>{date}</div>
      <div className="nodate-call">
        <div className="call-info">
          <div className="icon">
            <img src={props.icon} alt="" />
          </div>
          <div className="from-and-via">
            <div className="number">{props.from}</div>
            <div>on {props.via}</div>
          </div>
          <div className="time">{time}</div>
        </div>

        <div className="call-buttons">
          <Link to={`/calls/${props.id}`}>
            <div className="icon">
              <img src={infoBtn} />
            </div>
          </Link>
          <div className="icon" onClick={archiveCall}>
            <img src={archBtn} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCallsListItem;
