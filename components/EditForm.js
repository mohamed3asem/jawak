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
import CheckIcon from '@material-ui/icons/Check';
import { editFormFields } from '../fixtures/fixtures';
import { editOrganizerById } from '../redux/actions';

const validationSchema = Yup.object({
  name: Yup.string().required('Required Field'),
  email: Yup.string()
    .email('Not Valid Email')
    .required('Required Field'),
  moiNumber: Yup.string().required('Required Field'),
  nationalNum: Yup.string().required('Required Field')
});

const EditForm = ({
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
      <DialogTitle>Edit Organizer</DialogTitle>
      <DialogContent>
        <form>
          {editFormFields.map(({ name, required, label }) => (
            <TextField
              key={name}
              id={name}
              margin="normal"
              required={required}
              fullWidth
              label={label}
              name={name}
              autoFocus
              helperText={touched[name] ? errors[name] : ''}
              error={touched[name] && !!errors[name]}
              value={values[name] ? values[name] : ''}
              onChange={change.bind(null, name)}
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
          <CheckIcon />
          Save
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};

export default withFormik({
  displayName: 'EditOrganizerForm',
  mapPropsToValues: ({
    organizer: { name, phone, email, city, moiNumber, nationalNum }
  }) => ({ name, phone, email, city, moiNumber, nationalNum }),
  validationSchema,
  handleSubmit: async (values, { setSubmitting, props, setFieldError }) => {
    try {
      await editOrganizerById(props.organizer.id, values);
      setSubmitting(false);
      props.onClose();
      setSubmitting(false);
      ///////////////////////////////
      await Router.push('/clients');
      ///////////////////////////////
    } catch (e) {
      setFieldError('nationalNum', 'National ID already taken');
      setSubmitting(false);
    }
  }
})(EditForm);
