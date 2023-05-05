import React, { useState } from "react";
import '../../styles/components/Modal.css'
import { RxCross2 } from "react-icons/rx";

function CustomModal(props) {

  let modalDisplay = props.display == true ? 'block' : 'none'
  let style = {
    ...props.style
  }

  let closeStyle = {
    width: '50px',
    background: 'transparent'
  }

  return (
    <div id="myModal" className="modal" style={{ display: modalDisplay }}>
      <div className="modal-content" style={style}>
        <div className="modal-header">
          {props.modalheader}
          {props.closeBtn === true ?
            <button style={closeStyle} onClick={props.onHide}><i className='fa-sharp fa-solid fa-xmark fa-2x'></i></button> :


            <></>}

        </div>
        <div className="modal-body">
          {props.modalbody}
        </div>
        <div className="modal-footer">

        </div>
      </div>
    </div>
  );
}

export default CustomModal;