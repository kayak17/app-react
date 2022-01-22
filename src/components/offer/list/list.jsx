import OfferCard from '../card/card';
import { offersPropTypes } from '~/prop-types';

const OffersList = ({
  offers,
}) => {
  return (
    <ul className="row row-cols-1 g-0 list-unstyled">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
        />
      ))}
    </ul>
  );
}

OffersList.propTypes = {
  offers: offersPropTypes,
};

export default OffersList;
