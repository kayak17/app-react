import OffersListPlaceholder from '~/components/offer/list-placeholder/list-placeholder';
import { getEmptyArray } from '~/utils';
import '../places.less';

const PlacesWrapperPlaceholder = () => {
  const dataArray = getEmptyArray(7);

  return (
    <div className="row mt-1 mb-3 mx-0" aria-hidden="true">
      <section className="col-6 text-center overflow-auto places-container placeholder-glow">
        <h2 className="my-3 app-subtitle placeholder bg-secondary col-6"></h2>
        <OffersListPlaceholder offers={dataArray} />
      </section>
      <section className="col-6 text-center bg-light places-map-container">

      </section>
    </div>
  );
};

export default PlacesWrapperPlaceholder;
