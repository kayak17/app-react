import '../offer.less';

const OfferCardPlaceholder = () => {
  return (
    <li className="col mb-3" aria-hidden="true">
      <article className="card border-light text-start">
        <div className="row g-0">
          <div className="col-6">
            <div className="placeholder bg-secondary h-100 rounded-start offer-card-img"></div>
          </div>
          <div className="col-6">
            <div className="card-body px-3 py-1">
              <div className="card-title mb-1 placeholder-glow">
                <span className="offer-card-price placeholder bg-secondary col-6"></span>
              </div>
              <h6 className="card-text mb-1 placeholder-glow">
                <span className="offer-card-title placeholder bg-secondary col-8"></span>
              </h6>
              <p className="card-text placeholder-glow">
                <small className="fs-6 placeholder bg-secondary col-4"></small>
              </p>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
};

export default OfferCardPlaceholder;
