
function Wrapper(props) {

  return (
       <div style={props.style} className={props.class}>
          {props.children.map((child,indx)=>(child))}
       </div>
  );
}

export default Wrapper;