import React from "react";
import "./Drawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import {NavLink} from "react-router-dom";

const links = [
    {to: "/", label: "List", exact: true},
    {to: "/auth", label: "Authorization", exact: false},
    {to: "/quiz-creator", label: "Create Test", exact: false}

];

class Drawer extends React.Component {
    clickHandler = () => {
        this.props.onClose();
    }

    renderLinks(){
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
        return (
            <React.Fragment>
                <nav className={cls.join(" ")}>
                    <ul>
                        { this.renderLinks() }
                    </ul>
                </nav>
                { this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null } 
            </React.Fragment>
        );
    }
}

export default Drawer;