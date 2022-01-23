import '../offer.less';

const OfferCardPlaceholder = () => {
  return (
    <li className="col mb-3" aria-hidden="true">
      <article className="card border-light text-start">
        <div className="d-flex">
          <div className="offer-card-img-wrapper">
            <div className="h-100 bg-secondary rounded offer-card-img placeholder"></div>
          </div>
          <div className="col-6">
            <div className="card-body px-3 py-1">
              <div className="card-text mb-1 placeholder-glow">
                <span className="col-5 bg-secondary fs-5-4 placeholder"></span>
              </div>
              <div className="card-text mb-1 placeholder-glow">
                <span className="col-4 bg-secondary fs-5-4 placeholder"></span>
              </div>
              <h6 className="card-title mb-1 placeholder-glow">
                <span className="col-8 bg-secondary placeholder fs-5-3"></span>
              </h6>
              <p className="card-text placeholder-glow">
                <small className="col-4 bg-secondary fs-6-1 placeholder"></small>
              </p>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
};

export default OfferCardPlaceholder;
