import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';
const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};
const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); // asc
  const isSortingAscending = queryParams.get('sort') === 'asc';
  const changeSortingHandler = () => {
    // history.push(`${location.pathname}?sort=${(isSortingAscending ? 'desc' : 'asc')}`);
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortingAscending ? 'desc' : 'asc'}`,
    });
  };
  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? 'Descending' : 'Ascending'}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem key={quote.id} id={quote.id} author={quote.author} text={quote.text} />
        ))}
      </ul>
    </Fragment>
  );
};
export default QuoteList;
// localhost:3000/quotes/q1 = path variable
// localhost:3000/quotes?type=paper&genre=comedy = query params
//https://www.google.com/search?q=patch+variable&oq=patch+variable+&aqs=chrome..69i57j0i13l9.6200j0j7&sourceid=chrome&ie=UTF-8
//http://localhost:3000/quotes?sort=asc
//http://localhost:3000/quotes?showModal=true