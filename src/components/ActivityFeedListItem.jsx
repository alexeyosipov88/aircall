import React from "react";


const ActivityFeedListItem = (props) => {
  const timestamp = new Date(props.created);
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = timestamp.toLocaleDateString('en-CA', dateOptions);
  return (
    <div>
      <div>{date}</div> 
      <div>
        {props.from}
      </div>
      <div>
        {props.via}
      </div>

    </div>
  )
};

export default ActivityFeedListItem;   