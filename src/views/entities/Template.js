import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getMenus, getColumns, getListData } from '../../actions/system'
import { PushNotify, Wrapper } from '../../components'
import { Customer, Address, Country, Sidebar, List, Column, Form } from '../../views'
import System from '../skelton/System';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import DashboardView from './DashboardView';



function Template(props) {

  const navigate = useNavigate()

  let param = useParams()
  const [para, setPara] = useState(param)


  useEffect(() => {
    setPara(param)
  }, [param.data_source])



  const [menu_info, setMenuItems] = useState({ menu_items: [], menuOpen: false, menu_margin: 250, form_mode: 'list' });
  // const [list_info, setListInfo] = useState({ id: "90001", data_source: 'hometiles' })
  const [list_info, setListInfo] = useState({ label: 'Home', id: "90001", data_source: 'hometiles', default_view: "list", system_name: "Home", label: "Home", columns: [] })
  const [icon, setIcon] = useState('')
  const [list, setList] = useState()


  useEffect(() => {
    props.getMenus('?ordering=sequence').then(() => {
      setMenuItems(menu_info => ({ ...menu_info, menu_items: props.menu_items }))
    })
  }, [])

  useEffect(() => {

    let ReloadPageId = sessionStorage.getItem("list")

    if (ReloadPageId == null || ReloadPageId == undefined) {
      props.getListData("90001").then(() => { })
      // if (props.list_data.data_source !== undefined)
      //   setListInfo(props.list_data)

      sessionStorage.setItem("list", "90001")
    }


    else {

      props.getListData(ReloadPageId).then(() => { })
    }



    if (props.list_data.data_source !== undefined) {

      setListInfo(props.list_data)
    }

  }, [])





  useEffect(() => {
    if (props.list_data.data_source !== undefined)
      setListInfo(props.list_data)
  }, [props.list_data])


  let getPreviousMenu = () => {
    sessionStorage.setItem("list", "90001")
    props.getListData("90001").then(() => { })
    // setListInfo(props.list_data)

  }



  // useEffect(() => {
  //   // if (sessionStorage.getItem("list_id") !== null && list !== sessionStorage.getItem("list_id")) {
  //   //   let list = JSON.parse(sessionStorage.getItem("list_id"))
  //   //   props.getListData(list.id).then(() => { })
  //   //   setIcon(list.icon)

  //   // }
  // }, [sessionStorage.getItem("list")])



  let routeForm = (list) => {
    // location.state = list.id
    props.getListData(list.id).then(() => { })
    sessionStorage.setItem("list", list.id)
    setList(list.id)
    // setListInfo(props.list_data)

    // setIcon(list.icon)
    // setMenuItems(menu_info => ({ ...menu_info, form_mode: 'list' }))
    //calling it to maintain ordering
    //let column_filter = '?list='+list.id+'&ordering=position'
    //props.getColumns(column_filter).then(() => {})
  }

  let menuToggle = () => {
    let sideBar = document.getElementById('sidebar');
    let hamburgerIcon = document.getElementById("hamburgerIcon")

    if (sideBar.style.display == "block" || sideBar.style == null) {

      // if (menu_info.menuOpen) {

      sideBar.style.display = 'none'
      hamburgerIcon.style.backgroundColor = ""
      hamburgerIcon.style.color = "#0c7db1"
      // hamburgerIcon.style.filter = ""


      // sideBar.style.right = "1864px"

    } else {

      sideBar.style.display = 'block'

      hamburgerIcon.style.backgroundColor = "#1c75bd"
      hamburgerIcon.style.color = "white"
      // sideBar.style.right = "1264px"

      // menu_margin = 250

    }

    // setMenuItems(menu_info => ({ ...menu_info, menuOpen: !menu_info.menuOpen, }))
    // navigate("/views")
  }

  function getListfromDashboard(record) {
    props.getListData(record.id).then(() => { })
    // setListInfo(props.list_data)
    sessionStorage.setItem("list", record.id)

    navigate(`/views/${record.data_source.split(" ").join("").toLowerCase()}`);
  }
  return (
    <>
      {/* {props.loginDetails.code == 200 ? */}
      <>
        <Wrapper class='m12b-2' >
          <></>
          {list_info.id == "90001"
            //  && param.data_source == "hometiles" 
            ?
            <>
              < Wrapper class='screen' >
                <></>
                <Wrapper class='m12b-0'
                  style={{
                    // marginLeft: menu_info.menu_margin,
                    // marginLeft: 20,
                    // marginTop: 30,
                    // marginRight: 20
                  }}
                >
                  <Sidebar userName={props.loginDetails} items={props.menu_items} navigateMenu={routeForm} />
                  <></>
                  <System
                    getListfromDashboard={getListfromDashboard}
                    para={para.data_source}
                    menuToggle={menuToggle} list_info={list_info} form_mode={menu_info.form_mode}
                    getPreviousMenu={getPreviousMenu} />
                </Wrapper> </Wrapper>
            </> :

            <>
              < Wrapper class='screen' >
                <></>
                <Wrapper class='m12b-0'
                  style={{
                    //  marginLeft: menu_info.menu_margin, 
                    // marginLeft: 20,
                    // marginTop: 30,
                    // marginRight: 20
                  }}
                >
                  <></>
                  <System
                    para={para.data_source}
                    menuToggle={menuToggle} list_info={list_info} form_mode={menu_info.form_mode}
                    getPreviousMenu={getPreviousMenu}
                  />
                </Wrapper></Wrapper>

            </>
          }

        </Wrapper>
      </>
      {/* : <></>} */}
      {/* : <></> */}



    </>
  );
  // return (
  //   <>

  //     {/* < Routes >
  //       <Route path={`views/${props.list_data.system_name}`} element={<System />} ></Route>
  //     </Routes > */}

  //     < Wrapper class='screen' >
  //       <Sidebar userName={props.loginDetails} items={props.menu_items} navigateMenu={routeForm} />
  //       <Wrapper class='mb-2' style={{ marginLeft: menu_info.menu_margin, marginTop: 30, marginRight: 20 }}>
  //         <></>
  //         {list_info.label === undefined || list_info.label === 'Home' ?
  //           <></> :
  //           list_info.label === 'Configurations' ?
  //             <DndProvider backend={HTML5Backend}><Droppable list_info={list_info} /></DndProvider> :
  //             <System menuToggle={menuToggle} list_info={list_info} form_mode={menu_info.form_mode} icon={icon} />
  //         }
  //       </Wrapper>
  //     </Wrapper >
  //   </>
  // )
}

const mapStateToProps = state => {
  return {
    menu_items: state.sysData.menu_items,
    list_data: state.sysData.list_data,
    loginDetails: state.authData.loginDetails,
    pendingReq: state.sysData.pendingReq
  };
};

const mapDispatchToProps = {
  getMenus, getColumns, getListData,
}

export default connect(mapStateToProps, mapDispatchToProps)(Template);