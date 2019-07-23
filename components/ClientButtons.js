import React, { useState } from 'react';
import { connect } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Dialoge from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AccountBalanceWallet from '@material-ui/icons/AccountBalanceWallet';
import Check from '@material-ui/icons/Check';
import OrganizerModal from './OrganizerModal';
import CustomerModal from './CustomerModal';
import EditForm from './EditForm';
import WalletDetails from './WalletDetails';
import {
  getCustomerById,
  getOrganizerById,
  changeClientState,
  getWalletForOrganizer
} from '../redux/actions';

const ClientButtons = ({
  type,
  clientStatus,
  clientId,
  getCustomerById,
  getOrganizerById,
  getWalletForOrganizer,
  client,
  walletDetails
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [updatedClientStatus, setUpdatedClientStatus] = useState(clientStatus);
  const [dialogeOpen, setDialogeOpen] = useState(false);
  const [walletDialogeOpen, setWalletDialogeOpen] = useState(false);

  const showClientInfo = async id => {
    if (type === 'organizers') {
      await getOrganizerById(id);
    } else {
      await getCustomerById(id);
    }
    setModalOpen(true);
  };

  const openWalletDetails = async id => {
    await getOrganizerById(id);
    await getWalletForOrganizer(id);
    setWalletDialogeOpen(true);
  };

  const openEditForm = async id => {
    await getOrganizerById(id);
    setDialogeOpen(true);
  };

  const handleClick = async (id, status, type) => {
    try {
      await changeClientState(id, status, type);
      setUpdatedClientStatus(!updatedClientStatus);
    } catch (e) {}
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

      <Tooltip title={updatedClientStatus ? 'Activate' : 'Archive'}>
        <IconButton
          color={updatedClientStatus ? 'default' : 'secondary'}
          onClick={() => handleClick(clientId, updatedClientStatus, type)}
        >
          {updatedClientStatus ? <Check /> : <DeleteIcon />}
        </IconButton>
      </Tooltip>

      {type === 'organizers' && (
        <Tooltip title="Edit">
          <IconButton aria-label="Edit" onClick={() => openEditForm(clientId)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      )}

      {type === 'organizers' && (
        <Tooltip title="Wallet">
          <IconButton
            aria-label="Wallet"
            onClick={() => openWalletDetails(clientId)}
          >
            <AccountBalanceWallet />
          </IconButton>
        </Tooltip>
      )}

      <Dialoge
        maxWidth="xs"
        fullWidth
        open={walletDialogeOpen}
        onClose={() => setWalletDialogeOpen(false)}
      >
        <WalletDetails
          onClose={() => setWalletDialogeOpen(false)}
          organizer={client}
          walletDetails={walletDetails}
        />
      </Dialoge>

      <Dialoge open={dialogeOpen} onClose={() => setDialogeOpen(false)}>
        <EditForm onClose={() => setDialogeOpen(false)} organizer={client} />
      </Dialoge>

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

const mapStateToProps = ({ client, walletDetails }) => ({
  client,
  walletDetails
});

const mapDispatchToProps = dispatch => ({
  getOrganizerById: id => dispatch(getOrganizerById(id)),
  getCustomerById: id => dispatch(getCustomerById(id)),
  getWalletForOrganizer: id => dispatch(getWalletForOrganizer(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientButtons);
