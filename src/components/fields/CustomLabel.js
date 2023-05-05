import '../../styles/components/Field.css'

function CustomField(props) {  
    
     
  return (
      
    <div className={'fieldWrap ' + props.parentClass}>
      <label style={{ textAlign: 'right' }} className={props.class}>{props.label}</label>
    </div>
   
  );
}

export default CustomField;
