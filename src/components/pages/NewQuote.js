import React from "react";
import { useHistory } from "react-router-dom";
import QuoteForm from "../quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { useEffect } from "react";
import { addQuote } from "../../lib/api";

const NewQuote = () => {
  const history = useHistory();
  const { sendRequest, status, } = useHttp(addQuote);
  useEffect(() => {
    if(status === 'completed'){
       history.push("./quotes");
    }
  },[status,history]);

  const addQuoteHandler = (quote) => {
    sendRequest(quote)
  };
  return (
    <>
      <QuoteForm onAddQuote={addQuoteHandler} />
    </>
  );
};

export default NewQuote;
