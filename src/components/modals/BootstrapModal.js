import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import  '../../styles/components/Modal.css'

function BootstrapModal(props) {
      
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      contentClassName="modal-height"
      centered>
       <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      
       {props.modalbody}
       {props.modalHeader}
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  );
}

export default BootstrapModal;