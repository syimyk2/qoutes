import React from "react";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Comments from "../comments/Comments";
import HighlightedQuote from "../quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../../lib/api";
import { useEffect } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useRouteMatch } from "react-router-dom";
const QuoteDetail = () => {
  const params = useParams();
  const math = useRouteMatch();

  const { quotesId } = params;
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);
  // console.log(loadedQuote);

  useEffect(() => {
    sendRequest(quotesId);
  }, [sendRequest, quotesId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <p className="centered">{error}</p>;
  }
  if (!loadedQuote.text) {
    return <p>No Quote found</p>;
  }
  return (
    <>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={`/quotes/${params.quotesId}`} exact>
        <div className="centered">
          <Link
            className="btn--flag"
            to={`/quotes/${params.quotesId}/comments`}
          >
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`/quotes/${params.quotesId}/comments`}>
        <Comments quotesId={quotesId} />
      </Route>
    </>
  );
};
export default QuoteDetail;
