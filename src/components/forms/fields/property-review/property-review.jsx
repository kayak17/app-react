import PropTypes from 'prop-types';
import CustomField from '~/components/forms/custom-elements/field/field';
import { ReviewTitles, ReviewSRTitles } from '~/constants';

const FieldPropertyReview = ({
  onFocus = () => false,
}) => (
  <CustomField
    component="textarea"
    fieldClass="mt-3 mb-2 px-3 py-3 form-rating-textarea"
    fieldId="comment"
    fieldName="comment"
    fieldType="textarea"
    onFocus={onFocus}
    labelTitle={ReviewSRTitles.REVIEW}
    placeholder={ReviewTitles.REVIEW_PLACEHOLDER}
  />
);

FieldPropertyReview.propTypes = {
  onFocus: PropTypes.func,
};

export default FieldPropertyReview;
