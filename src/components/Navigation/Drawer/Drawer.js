import React from "react";
import "./Drawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const links = [1, 2, 3];

class Drawer extends React.Component {

    renderLinks(){
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <a href="http://localhost:3000/">Link{link}</a>
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