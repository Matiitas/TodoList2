import React from "react";

const Todo = (props) => {
  const handleFinished = () => {
    props.handleFinished(props.id);
  };

  const handleRemove = () => {
    props.handleRemove(props.id);
  };

  return (
    <li className="list-group-item">
      <div className="d-sm-flex p-1 justify-content-between align-items-center">
        <div style={{ flex: 2 }}>
          {props.finalized ? (
            <span style={{ textDecoration: "line-through" }}>{props.text}</span>
          ) : (
            <span>{props.text}</span>
          )}
        </div>
        {props.finalized ? null : (
          <button
            type="button"
            onClick={handleFinished}
            className="btn btn-primary mr-1"
          >
            {" "}
            Finish
          </button>
        )}

        <button
          type="button"
          onClick={handleRemove}
          className="btn btn-danger ml-1"
        >
          Remove
        </button>
      </div>
    </li>
  );
};

export default Todo;
