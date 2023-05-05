import { useEffect, useState } from 'react'
import '../../styles/components/Field.css'
import InfiniteScroll from 'react-infinite-scroll-component'


function CustomInput(props) {
  const [fieldValid, setFieldValid] = useState({ isValid: true, errorMessage: "" });
  const [selectedValue, setSelectedValue] = useState();
  const [choice, setChoice] = useState(props?.choices?.results);

  let wdthStyle = (width) => {
    return ({
      ...props.style,
      width: width + '%',
    })
  }

  let nestedStyle = (width) => {
    return ({
      marginLeft: '4px',
      width: width + '%',
    })
  }

  let validateFormData = (value) => {
    let isValid = true;
    let errorMessageList = "";
    if (props.type != 'read-only' && props.validations) {
      let allValidations = props.validations;

      //required validation
      if (allValidations.required && !value) {
        isValid = false;
        errorMessageList += props.field_label + " is required.";
      }
      //format validation
      if (props.data_type == 'email' && value && value.length > 0 && allValidations.format && allValidations.format.length > 0) {
        let emailValid = value.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
        if (emailValid == null) {
          isValid = false;
          errorMessageList += "Please enter valid " + props.field_label + ".";
        }
      }

      if (props.data_type == 'number') {
        const num = Number((value == null ? undefined : value));
        if (isNaN(num)) {
          isValid = false;
          errorMessageList += "Please enter valid " + props.field_label + ".";
        }
        else {

          if (allValidations.hasOwnProperty('min') && num < allValidations.min) {
            isValid = false;
            errorMessageList += "Please enter valid " + props.field_label + " (Min " + allValidations.min + ").";
          }

          if (allValidations.hasOwnProperty('max') && num > allValidations.max) {
            isValid = false;
            errorMessageList += "Please enter valid " + props.field_label + " (Max " + allValidations.max + ").";
          }
        }

      }

      if (props.data_type == 'string') {
        const valueLength = (!value ? "" : value).length;
        if (allValidations.hasOwnProperty('min_length') && valueLength < allValidations.min_length) {
          isValid = false;
          errorMessageList += "Please enter valid " + props.field_label + " (Min Length " + allValidations.min_length + ").";
        }

        if (allValidations.hasOwnProperty('max_length') && valueLength > allValidations.max) {
          isValid = false;
          errorMessageList += "Please enter valid " + props.field_label + " (Max Length " + allValidations.max_length + ").";
        }
      }

      setFieldValid({ isValid: isValid, errorMessage: errorMessageList });
    }
  }

  let changeHandler = (event) => {
    const { value } = event.target;
    validateFormData(value);
    props.onChange(event, fieldValid.isValid);
  }

  useEffect(() => {
    if (props.type === 'lookup') {
    }
  }, [props.type])

  let widthset = props.type === 'search' ? 30 : props.type === 'modalField' ? props.width : 100

  let inputValue = props.value === null ? undefined : props.value

  if (props.label === 'created_time' || props.label === 'modified_time' || props.label === 'used') {
    inputValue = (new Date(props.value)).toLocaleDateString('en-US')
  }

  //composite ,, enterable , link

  useEffect(() => {

    if (props.choices != undefined) {

      setChoice((prev) => {
        if (prev !== undefined)
          return [...prev, ...props?.choices.results]

      })

    }
  }, [props.choices])





  let dropdownSelect = document.getElementById("select-option")






  // useEffect(() => {
  //   dropDown?.addEventListener("scroll", fetchMoreData);
  //   return () => dropDown?.removeEventListener("scroll", fetchMoreData);
  // }, []);


  // let choicesData =
  //   props?.choices !== undefined && props?.choices !== null ?
  //     props?.choices?.results?.map((choice, indx) => {
  //       return <option id="Option-id" key={'choice' + indx} value={choice.id} >{choice.system_name}</option>
  //     }) : <></>

  let choicesData =
    props?.choices !== undefined && props?.choices?.length > 0 && props?.choices !== null ?
      props?.choices?.map((choice, indx) => {
        return <option id="Option-id" key={'choice' + indx} value={choice.id} >{choice.system_name}</option>
      }) : <>


        <option id="Option-id" >None</option>
      </>
  return (
    <>
      {props.type === 'dropdown' ?
        <select className={`${props.class} dropDown`} style={wdthStyle(100)} value={selectedValue} onClick={props.onClick} onChange={props.onChange} >
          <option value={typeof (inputValue) !== "object" && inputValue ? inputValue : <></>} disabled selected hidden>{typeof (inputValue) !== "object" && inputValue ? inputValue : "Select an Option"}</option>
          {/* <InfiniteScroll
            // dataLength={50}
            dataLength={choice?.length == undefined ? 30 : choice?.length}
            next={fetchMoreData}
            hasMore={props?.choices?.next != null ? true : false}
            // hasMore={true}
            scrollableTarget="heyeyey"

          > */}

          {choicesData}


          {/* </InfiniteScroll> */}
        </select> :
        props.type === 'phone' ?
          <>
            <input className={props.class}
              placeholder={props.label}
              style={wdthStyle(50)}
              type='number'
              value={inputValue}
              onChange={props.onChange} />
            <select style={nestedStyle(40)}>
              <option>Office</option>
              <option>Mobile</option>
            </select></> :
          props.type === 'multi-line' ?
            <>
              <textarea className={props.class} style={wdthStyle(100)} />
            </> :
            props.type === 'read-only' ?
              // <input className={props.class} readOnly
              //   // placeholder={props.label}
              //   style={wdthStyle(widthset)}
              //   type={props.type}
              //   value={inputValue}
              //   onChange={props.onChange}
              //   disabled /> 
              <span className={props.class}>{inputValue}</span>
              :
              <input className={props.class}
                placeholder={props.label}
                style={wdthStyle(widthset)}
                type={props.type}
                value={inputValue}
                onChange={changeHandler} />
      }
      {!fieldValid.isValid ? fieldValid.errorMessage : ""}

      {/* {props.type === 'dropdown' ?
        < select className={props.class} style={wdthStyle(100)} onChange={props.onChange}>
          {props.choices.map((choice, indx) => {
            return <option key={'choice' + indx} value={choice.parent_id}> {choice.label} </option>
          })}
        </select>
        :
        props.type === 'phone' ?
          <>
            <input className={props.class}
              placeholder={props.label}
              style={wdthStyle(50)}
              type='number'
              value={inputValue}
              onChange={props.onChange} />
            <select style={nestedStyle(40)}>
              <option>Office</option>
              <option>Mobile</option>
            </select></> :
          props.type === 'multi-line' ?
            <>
              <textarea className={props.class} style={wdthStyle(100)} />
            </> :
            props.type === 'read-only' ?
              <input className={props.class} readOnly
                // placeholder={props.label}
                style={wdthStyle(widthset)}
                type={props.type}
                value={inputValue}
                onChange={props.onChange}
                disabled /> :
              <input className={props.class}
                placeholder={props.label}
                style={wdthStyle(widthset)}
                type={props.type}
                value={inputValue}
                onChange={props.onChange} /> 
      } */}



    </>
  );
}




export default CustomInput;
