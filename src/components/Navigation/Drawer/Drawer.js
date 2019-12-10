import React from "react";
import "./Drawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import {NavLink} from "react-router-dom";

class Drawer extends React.Component {
    clickHandler = () => {
        this.props.onClose();
    }

    renderLinks(links){
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName="active"
                        onClick={this.props.onClose}
                    >
                        {link.label}
                    </NavLink>
                </li>
            );
        });
    }
    
    render(){
        const cls = [
            "Drawer",
            !this.props.isOpen ? "Drawer_close" : ""
        ];

        const links = [{to: "/", label: "List", exact: true}];

        if (this.props.isAuthorized){
            links.push({to: "/quiz-creator", label: "Create Test", exact: false});
            links.push({to: "/logout", label: "Log out", exact: false});
        } else {
            links.push({to: "/auth", label: "Authorization", exact: false});
        }

        return (
            <React.Fragment>
                <nav className={cls.join(" ")}>
                    <ul>
                        { this.renderLinks(links) }
                    </ul>
                </nav>
                { this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null } 
            </React.Fragment>
        );
    }
}

export default Drawer;