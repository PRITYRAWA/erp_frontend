import React from 'react';
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from '..';

function CustomDropdown(props) {


  let buttonStyle = {
    padding: 4,
    marginLeft: 4,
    marginRight: 3,
    marginBottom: 4,
    width: 40,
    height: 35,
    float: 'right',
    border: '1px solid #0c7db1',
    borderRadius: '3px',
    color: '#0c7db1'
  }
  let handleClick = (option) => {
    props.DropFunction(option)
  }


  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Button type='button' btn='' icon={props.icon} style={buttonStyle} value='' clickHanlder={onClick} />
  ));

  const CustomButton = React.forwardRef(({ children, onClick }, ref) => (
    <button onClick={onClick}>in this</button>
  ));


  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-basic" >

      </Dropdown.Toggle>

      <Dropdown.Menu drop={'start'} align='end'>
        {props.options.map((option, indx) => {
          return <Dropdown.Item onClick={() => { handleClick(option) }} key={indx}>{props.check == true ? <><input type='checkbox'
            //  onClick={() => { handleClick() }}
            checked />&nbsp;&nbsp;</> : <></>}{option}</Dropdown.Item>
        })}

      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CustomDropdown;