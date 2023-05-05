import { Dropdown } from '..'
import { Link, Outlet } from 'react-router-dom'
import '../../styles/components/Field.css'

function CustomButton(props) {
  let clickHanlder = (value) => {
    props.clickHanlder(value)
  }
  let clickHandler2 = (value) => {
    props.clickHanlder(value)
  }

  let htmlButton = <button ref={props.ref} style={props.style} id={props.id} className='formButton' onClick={() => clickHanlder(props.value)}>{props.btn}<i className={props.icon}></i></button>
  let htmlButtonLink = <div><Link to="/views/hometiles"> <button ref={props.ref} style={props.style} className='formButton' onClick={() => clickHanlder(props.value)}>{props.btn}<i className={props.icon}></i></button></Link><Outlet /></div>
  // let htmlButtonLink =
  //   props.para == "hometiles" ?
  //     <>
  //       <Link to="/views/hometiles">
  //         <button ref={props.ref} style={props.style} className='formButton' onClick={() => clickHanlder(props.value)}>{props.btn}
  //           <i className={props.icon}></i>
  //         </button>
  //       </Link>
  //       <Outlet />
  //     </>
  //     : <>
  //       <Link to="">
  //         <button ref={props.ref} style={props.style} className='formButton' onClick={() => clickHanlder(props.value)}>{props.btn}
  //           <i className={props.icon}></i>
  //         </button>
  //       </Link>
  //       <Outlet />
  //     </>


  let typeButton = props.type === 'dropdown' ? <Dropdown DropFunction={clickHandler2} button={htmlButton} icon={props.icon} options={props.options} check={props.check} /> : props.link ? htmlButtonLink : htmlButton



  return (
    <>
      {typeButton}
    </>
  );
}

export default CustomButton;