import React, { PropsWithChildren, ReactElement } from 'react';
import Modal from 'react-modal';
import ConfirmationIcon from '../assets/confirmation-icon.svg';

Modal.setAppElement(document.getElementById('root') || '');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    height: '352px',
    width: '448px',
    padding: '0',
    overflow: 'hidden',
    background: '#FFFFFF',
    border: '2px solid #00022B',
    'border-radius': '10px',
  },
};

export function ConfirmationModal(props) {
  let subtitle;

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
    console.log('dd');
  }

  return (
    <Modal
      isOpen={props.modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={() => props.setIsOpen(false)}
      style={customStyles}
      contentLabel='Confirmation Modal'
    >
      <div className="flex justify-center m-6">
        <img src={ConfirmationIcon} alt="icon" />
      </div>
      <div className="w-11/12  mx-auto my-5">
        <div className='mb-3 text-2xl font-bold'>Are you sure you want to delete this person</div>

        <div className='font-base'>
          This action cannot be undone and all data associated with this person
          will be permanently removed.”
        </div>
      </div>
      <div className='flex flex-col justify-center'>
        <button className='w-11/12 mx-auto rounded bg-blue-800 text-white py-2' onClick={props.onConfirm}>Yes</button>
        <button className='w-11/12 mx-auto py-2' onClick={() => props.setIsOpen(false)}>No</button>
      </div>
    </Modal>
  );
}
