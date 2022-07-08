import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import CounterList from '~/components/counters/counter-list/counter-list';
import { addCounter } from '~/modules/counters';
import { AppTitles } from '~/constants';

const PageCountersContent = () => {
  const dispatch = useDispatch();

  const onCounterAddBtnClick = (evt) => {
    evt.preventDefault();
    dispatch(addCounter(uuidv4()));
  };

  return (
    <section className="page-content-wrapper">
      <h1 className="app-title page-content-title">
        {AppTitles.COUNTERS}
      </h1>
      <div className="page-form">
        <ul></ul>
        <li>Every fourth counter on the page doesn't have "+" and "-" buttons, but every second increases its value by one</li>
        <li>Value of every new counter on the page is set equal to the sum of the values of all previous counters on the page</li>
        <button
          type="button"
          className="btn btn-success mt-3 mb-3"
          onClick={onCounterAddBtnClick}
        >
          {AppTitles.ADD_COUNTER}
        </button>
        <CounterList />
      </div>
    </section>
  );
};

export default PageCountersContent;
