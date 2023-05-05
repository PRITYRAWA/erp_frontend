import React, { useState, useEffect } from "react"
import { Connect } from "react-redux"

import { getVendors } from "../../actions/app"

import FormView from "../entities/FormView"
import ListView from "../entities/ListView"


function Vendors(props) {
    const [vendors, setVendors] = useState({ ven_list: [], Ven_json: { 'entity': '1' } })
    const [formMode, setFormMode] = useState("list")

}




useEffect(() => {
    props.getVendors("/").then(() => { })
}, [])


const mapStateToProps = state => {
    return {
        ven_list: state.appData.vendors
    }
}


const mapDispatchToProps = {
    getVendors
}

export default connect(mapStateToProps, mapDispatchToProps)(Vendors)