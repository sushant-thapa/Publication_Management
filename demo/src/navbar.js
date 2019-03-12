import React, { Component } from 'react';
import './navbar.css';
import tuLogo from './assets/ioe-logo.png';

class Navibar extends Component {
    render(){
        return(
            <div className = "container-fluid navBar">
                <div className = "container">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <img alt = "IOE LOGO" width = "60" src = {tuLogo} />
                                </td>
                                <td>
                                    &nbsp;&nbsp;
                                    PUBLICATIONS LIST MANAGER
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Navibar;