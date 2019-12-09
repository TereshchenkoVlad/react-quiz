import React from "react"
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"

class Logout extends React.Component {
    componentDidMount(){
        this.props.logout()
    }

    render(){
        return <Redirect to={"/"}/>
    }
}

function mapDispatchToProps (dispatch) {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout)