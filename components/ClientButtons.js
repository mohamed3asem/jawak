import React, { useState } from 'react';
import { connect } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import OrganizerModal from './OrganizerModal';
import CustomerModal from './CustomerModal';
import { getCustomerById, getOrganizerById } from '../redux/actions';

const ClientButtons = ({
  type,
  clientId,
  getCustomerById,
  getOrganizerById,
  client
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const showClientInfo = async id => {
    if (type === 'organizers') {
      await getOrganizerById(id);
    } else {
      await getCustomerById(id);
    }
    setModalOpen(true);
  };

  return (
    <React.Fragment>
      <Tooltip title="Show">
        <IconButton
          color="primary"
          aria-label="Show"
          onClick={() => showClientInfo(clientId)}
        >
          <PersonIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Archive">
        <IconButton aria-label="Archive">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      {type === 'organizers' && (
        <Tooltip title="Edit">
          <IconButton color="secondary" aria-label="Edit">
            <EditIcon />
          </IconButton>
        </Tooltip>
      )}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        {type === 'organizers' ? (
          <OrganizerModal
            onClose={() => setModalOpen(false)}
            organizer={client}
          />
        ) : (
          <CustomerModal
            onClose={() => setModalOpen(false)}
            customer={client}
          />
        )}
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProps = ({ client }) => ({ client });

const mapDispatchToProps = dispatch => ({
  getOrganizerById: id => dispatch(getOrganizerById(id)),
  getCustomerById: id => dispatch(getCustomerById(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientButtons);
