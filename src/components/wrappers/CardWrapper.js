import React from "react";


function CardWrapper(props) {

  let formStyle = {
    ...props.style,
    marginLeft: props.left,
    marginTop: props.top
  }

  return (
    <div className='Entity-Form' style={formStyle}>
      <div className="wrap">
        <div className="form-container">
          {props.children.map((child, indx) => (child))}
        </div>
      </div>
    </div>
  );
}

export default CardWrapper;