/*
    This component helps to add a new document to the collection.
    Backend has been programmed to use MySQL.

    If you are a future maintainer, the following things are left out in this module:
        TODO:

*/

// React Component Imports
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


// Colors used
import orange from '@material-ui/core/colors/orange';

// Custom component imports
import FormGenerator from '../formgenerator_component/formgenerator';
import TopBar from '../topbar_component/topbar';

// CSS import
import './addnewpage.css';


class AddNewPage extends React.Component{
    constructor(props){
        super(props);
        // Component state is initialized. The default field is research paper.
        // No document has been selected, in this case.
        this.state = {
            typeOfDocument : "research-paper",
            documentSelected: false,
            expanded: false
        };
        this.setTypeOfDocument = this.setTypeOfDocument.bind(this);
        this.handleTopPanel = this.handleTopPanel.bind(this);
    }
    handleTopPanel(){
        console.log("Clicked top panel");
        this.setState({documentSelected: !this.state.documentSelected});
    }
    render(){
        return(
            <div>
                <TopBar></TopBar>
                <Grid container style = {{marginTop: "100px"}}>
                    <Grid item xs = {3}
                        style = {{
                            textAlign: "right",
                            paddingRight: 50
                        }}
                    >
                        <Link to = "/">
                            <Fab size = "small" variant = "extended" style = {{padding: 16}} color = "secondary" className = "plus_button">
                                <strong>&larr;</strong>
                            </Fab>
                        </Link>
                    </Grid>
                    <Grid item xs = {6}>
                        <Typography>
                            <strong style = {{fontWeight: "lighter", fontSize:20, marginLeft: 16}}> Create a new Entry </strong>
                        </Typography>
                        <br />
                        <ExpansionPanel expanded={!this.state.documentSelected} >
                            <ExpansionPanelSummary expandIcon = {<ExpandMoreIcon></ExpandMoreIcon>} onClick = {this.handleTopPanel}>
                                <Typography >Step 1: Select the type of document</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                    <ul className = "types_ul">
                                        <li>
                                            <Fab onClick = {()=>{this.setTypeOfDocument("book")}} size = "small" variant = "extended" style = {{backgroundColor: orange[800]}}>
                                                <Typography style = {{fontSize: 12, padding: 10, color: "white"}}>
                                                    <b>Book</b>
                                                </Typography>
                                            </Fab>
                                        </li>


                                        <li>
                                            <Fab onClick = {()=>{this.setTypeOfDocument("journal")}} size = "small" variant = "extended" style = {{backgroundColor: orange[800]}}>
                                                <Typography style = {{fontSize: 12, padding: 10, color: "white"}}>
                                                    <b>Journal</b>
                                                </Typography>
                                            </Fab>
                                        </li>


                                        <li>
                                            <Fab onClick = {()=>{this.setTypeOfDocument("chapter")}} size = "small" variant = "extended" style = {{backgroundColor: orange[800]}}>
                                                <Typography style = {{fontSize: 12, padding: 10, color: "white"}}>
                                                    <b>Chapter</b>
                                                </Typography>
                                            </Fab>
                                        </li>


                                        <li>
                                            <Fab onClick = {()=>{this.setTypeOfDocument("proceeding")}} size = "small" variant = "extended" style = {{backgroundColor: orange[800]}}>
                                                <Typography style = {{fontSize: 12, padding: 10, color: "white"}}>
                                                    <b>Proceeding</b>
                                                </Typography>
                                            </Fab>
                                        </li>


                                        <li>
                                            <Fab onClick = {()=>{this.setTypeOfDocument("article")}} size = "small" variant = "extended" style = {{backgroundColor: orange[800]}}>
                                                <Typography style = {{fontSize: 12, padding: 10, color: "white"}}>
                                                    <b>Article</b>
                                                </Typography>
                                            </Fab>
                                        </li>


                                        <li>
                                            <Fab onClick = {()=>{this.setTypeOfDocument("report")}} size = "small" variant = "extended" style = {{backgroundColor: orange[800]}}>
                                                <Typography style = {{fontSize: 12, padding: 10, color: "white"}}>
                                                    <b>Report</b>
                                                </Typography>
                                            </Fab>
                                        </li>


                                        <li>
                                            <Fab onClick = {()=>{this.setTypeOfDocument("misc")}} size = "small" variant = "extended" style = {{backgroundColor: orange[800]}}>
                                                <Typography style = {{fontSize: 12, padding: 10, color: "white"}}>
                                                    <b>Other</b>
                                                </Typography>
                                            </Fab>
                                        </li>
                                    </ul>
                                <br />
                            </ExpansionPanelDetails>
                        </ExpansionPanel> 


                        <ExpansionPanel expanded={this.state.documentSelected} >
                            <ExpansionPanelSummary>
                                <Typography >Step 2: Enter relevant Details: </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <FormGenerator type = {this.state.typeOfDocument}></FormGenerator>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>                                
                    </Grid>
                </Grid>
            </div>
        )
    }

    setTypeOfDocument(type){
        this.setState({typeOfDocument: type});
        this.setState({documentSelected: true})
        console.log("Set the document type to : ", type);
        // Expand the remaining part of paper.
    }
}



export default AddNewPage;