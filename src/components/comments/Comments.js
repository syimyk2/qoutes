import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getAllComments } from "../../lib/api";
import useHttp from "../hooks/use-http";
import CommentList from "./CommentsList";
import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import { useCallback } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";

const Comments = (props) => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);
  const params = useParams();
  const { quotesId } = props;
  console.log(quotesId);

  useEffect(() => {
    sendRequest(quotesId);
  }, [sendRequest, quotesId]);

  const addedCommentHandler = useCallback(() => {
    sendRequest(quotesId);
  }, [sendRequest, quotesId]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  let comments;
  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    comments = <CommentList comments={loadedComments} />;
  }
  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className="centered">No comments were added yet!</p>;
  }
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quotesId={quotesId}
          onAddedComment={addedCommentHandler}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
