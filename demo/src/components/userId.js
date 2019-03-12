import React, {Component} from 'react';
import '../App.css';
import userImage from '../assets/user.png';
import './userId.css';
import {Button} from 'react-bootstrap';
import './config';

class userId extends Component{
    constructor(props){
        super(props);
        this.user = {
            // name: userData.name, 
            // college: userData.college,
            // designation: userData.designation
            name: " Sandesh Bhusal",
            college: " IOE PULCHOWK CAMPUS",
            designation: " student"
        };
    }
    render(){
        return(
            <div className = "container-fluid">
                <div className = "container">
                    <div id = "box" className = "row">
                        <div className = "col-md-1 image">
                            < img alt = "USER" src = {userImage} width = "60" />
                        </div>
                        <div className = "col-md-4 info small">
                            <div className = "row">
                                <div className = "col-md-4">
                                    Name: <br /> 
                                    College: <br />
                                    Designation: <br />
                                </div>
                                <div className = "col-md-8">
                                    {this.user.name} <br />
                                    {this.user.college} <br />
                                    {this.user.designation}    
                                </div>
                            </div>
                            <br /> 
                            <Button bsStyle = "primary" bsSize = "small" className = "profileEditor"> Edit Profile </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default userId;