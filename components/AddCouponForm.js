import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import Router from 'next/router';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import { addCouponFields } from '../fixtures/fixtures';
import { createNewCoupon } from '../helperFunctions/couponfunctions';

const validationSchema = Yup.object({
  code: Yup.string().required('Required Field'),
  discount: Yup.number()
    .typeError('Discount must be a number')
    .positive('Discount must be positive number')
    .lessThan(101, 'Discount must not exceed 100')
    .required('Required Field')
});

const AddCouponForm = ({
  onClose,
  values,
  errors,
  touched,
  handleSubmit,
  handleChange,
  isValid,
  setFieldTouched,
  isSubmitting
}) => {
  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <React.Fragment>
      <DialogTitle>Add New Coupon</DialogTitle>
      <DialogContent>
        <form>
          {addCouponFields.map(({ name, required, label, inputProps }) => (
            <TextField
              key={name}
              id={name}
              margin="normal"
              required={required}
              fullWidth
              label={label}
              name={name}
              helperText={touched[name] ? errors[name] : ''}
              error={touched[name] && !!errors[name]}
              value={values[name] ? values[name] : ''}
              onChange={change.bind(null, name)}
              InputProps={inputProps}
            />
          ))}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          <CloseIcon />
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={!isValid || isSubmitting}
        >
          <AddIcon />
          Add
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};

export default withFormik({
  displayName: 'AddCouponForm',
  validationSchema,
  handleSubmit: async (values, { setSubmitting, props, setFieldError }) => {
    try {
      await createNewCoupon(values);
      setSubmitting(false);
      await Router.push('/coupons');
      props.onClose();
    } catch (e) {
      setSubmitting(false);
    }
  }
})(AddCouponForm);
