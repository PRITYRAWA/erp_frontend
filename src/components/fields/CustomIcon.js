import { Dropdown } from '..'
import '../../styles/components/Field.css'

function CustomIcon(props) {
  let clickHanlder = (value) => {
    props.clickHanlder(value)
  }

  let iconStyle = {
    ...props.style,
    cursor: 'pointer'
  }

  return (
    <i className={props.icon} onClick={clickHanlder} style={iconStyle}></i>
  );
}

export default CustomIcon;