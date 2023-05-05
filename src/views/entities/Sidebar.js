import React, { useState } from 'react';
import '../../styles/views/Sidebar.css'

import Login from '../authorization/Login';
import { user_login } from '../../actions/auth';
import { useNavigate, Link, Outlet } from "react-router-dom";
import { Routes, Route, Navigate } from 'react-router-dom';
import Template from "../../views/entities/Template.js"
import System from '../skelton/System';

function Sidebar(props) {


    const [prevItem, setPrevItem] = useState()

    let shuffleDropdown = (menuID, blockID) => {
        var dropdownContent = document.getElementById(blockID);
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
            //change icon here
        } else {
            dropdownContent.style.display = "block";
        }
    }

    const groupByMake = (arr = []) => {
        let result = [];
        if (arr.length > 0) {
            result = arr.reduce((r, a) => {
                r[a.menu_category] = r[a.menu_category] || [];
                if (a.list != null)
                    r[a.menu_category].push(a);
                return r;
            }, Object.create(null))
        };
        return result;
    };

    let navigateMenu = (menu_list) => {
        // navigate(`/${menu_list.data_source}`)
        // document.getElementById(prevItem).classList.remove('active')
        // document.getElementById(menu_list.id).classList.add('active')

        // sessionStorage.setItem("list_id", JSON.stringify(menu_list))
        props.navigateMenu(menu_list)
    }

    let grouped_items = groupByMake(props.items)



    let menuBackColor = '#fffff'

    // JSON.parse(localStorage.getItem('Configuration')).map((config) => {
    //     if (config.configuration === 'Menu Background Color') {
    //         menuBackColor = config.current_value
    //     }
    // })

    let menuTextColor = '#000000'

    // JSON.parse(localStorage.getItem('Configuration')).map((config) => {
    //     if (config.configuration === 'Menu Text Color') {
    //         menuTextColor = config.current_value
    //     }
    // })

    let menuSelectedColor = ''

    // JSON.parse(localStorage.getItem('Configuration')).map((config) => {
    //     if (config.configuration === 'Menu Selected Color') {
    //         menuSelectedColor = config.current_value
    //     }
    // })

    let activeStyle = {
        background: menuSelectedColor
    }

    let menu_items = Object.keys(grouped_items).map(key => {
        return (
            <li key={key}>
                <Link to="" id={key + '-text'} style={{ color: menuTextColor }} onClick={() => { shuffleDropdown(key + '-text', key) }} >
                    <span className="menu-item">{key}<i className="fa fa-caret-down"></i></span>
                </Link>
                <Outlet />
                <div className="dropdown-container" id={key} style={{ background: menuBackColor }} >
                    {grouped_items[key].map((sub_item, indx) => {
                        let menu_name = sub_item.list != null ? sub_item.list.label : ''

                        return (<>
                            {/* <Routes>
                                <Route path={`/views/${sub_item.list.data_source}`} element={<Template />} ></Route>
                            </Routes> */}

                            {/* {sub_item.list.data_source == "Home Tiles" ?
                                <>
                                    <Link to={`/views`} className='' key={indx} style={{ color: menuTextColor }} id={sub_item.list.id} onClick={() => { navigateMenu(sub_item.list) }}>{menu_name}</Link>
                                    <Outlet />

                                </> : */}
                            <>
                                {/* <div className="flex"> */}
                                {/* <img src={sub_item.list.icon} className='icon-list' /> */}
                                <Link to={`/views/${sub_item.list.data_source?.split(" ")?.join("")?.toLowerCase()}`} className='' key={indx} style={{ color: menuTextColor }} id={sub_item.list.id} onClick={() => { navigateMenu(sub_item.list) }}>{menu_name}</Link>
                                <Outlet />
                                {/* </div> */}
                            </>
                            {/* } */}
                            {/* <Link to={`/views/${sub_item.list.data_source?.split(" ")?.join("")?.toLowerCase()}`} className='' key={indx} style={{ color: menuTextColor }} id={sub_item.list.id} onClick={() => { navigateMenu(sub_item.list) }}>{menu_name}</Link>
                            <Outlet /> */}

                        </>)
                        // return <a href={`/views/${sub_item?.list?.data_source}`} className='' key={indx} style={{ color: menuTextColor }} id={sub_item.list.id} onClick={() => { navigateMenu(sub_item.list) }}>{menu_name}</a>
                        // return <a href="#" className='' key={indx} style={{ color: menuTextColor }} id={sub_item.list.id} onClick={() => { navigateMenu(sub_item.list) }}>{menu_name}</a>
                    })}
                </div>
            </li >
        )
    });

    return (
        <>
            < div className="wrapper m12b-2" >
                <div className="sidebar" id='sidebar' style={{ background: menuBackColor }} >
                    <ul>
                        {menu_items}
                    </ul>
                </div>
            </div >

        </>
    );
}

// <img src="https://1.bp.blogspot.com/-vhmWFWO2r8U/YLjr2A57toI/AAAAAAAACO4/0GBonlEZPmAiQW4uvkCTm5LvlJVd_-l_wCNcBGAsYHQ/s16000/team-1-2.jpg" alt="profile_picture">

export default Sidebar;
