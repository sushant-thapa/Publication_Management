import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Typography } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import Select from '@material-ui/core/Select';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {Link} from 'react-router-dom';

import './table.css';

import downloader from '../../database/downloader';

import { fieldList } from '../../database/fieldList';

class DataTable extends React.Component{
    constructor(props){
        super(props);

        this.expandButton = this.expandButton.bind(this);
        this.setFields = this.setFields.bind(this);
        this.getData = this.getData.bind(this);
        this.deleteRecord = this.deleteRecord.bind(this);
        this.handleBibChange = this.handleBibChange.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
        this.handleDocChange = this.handleDocChange.bind(this);

        this.state = {
            expanded: false,
            fields: this.setFields(),
            data: [],
            formatForDownload: {format: "MLA", fileFormat: "PDF"}
        }
        this.getData();
    }
    setFields(){
        // This function sets all the data in the table. 
        // First, the prop of "type" is checked, and fields in table heading are fetched 
        // from the fieldList.js file. Then the related data are fetched from teh database.
        // here, only the compulsory fields are shown. Other fields still exist.
        var a, toReturn;
        switch(this.props.type){
            case "book":{
                a = fieldList[0].bookFields;
                toReturn = [];
                a.map((item, index) => {
                    if (item.required){
                        toReturn.push(item);
                    }
                    return true;
                })
                return toReturn;
            }

            case "proceeding":{
                a = fieldList[0].proceedingFields;
                toReturn = [];
                a.map((item, index) => {
                    if (item.required){
                        toReturn.push(item);
                    }
                    return true;
                })
                return toReturn;
            }

            case "chapter":{
                a = fieldList[0].bookChapterFields;
                toReturn = [];
                a.map((item, index) => {
                    if (item.required){
                        toReturn.push(item);
                    }
                    return true;
                })
                return toReturn;
            }

            case "journal":{
                a = fieldList[0].journalArticleFields;
                toReturn = [];
                a.map((item, index) => {
                    if (item.required){
                        toReturn.push(item);
                    }
                    return true;
                })
                return toReturn;
            }

            case "report":{
                a = fieldList[0].reportFields;
                toReturn = [];
                a.map((item, index) => {
                    if (item.required){
                        toReturn.push(item);
                    }
                    return true;
                })
                return toReturn;
            }

            case "article":{
                a = fieldList[0].articleFields;
                toReturn = [];
                a.map((item, index) => {
                    if (item.required){
                        toReturn.push(item);
                    }
                    return true;
                })
                return toReturn;
            }

            case "misc":{
                a = fieldList[0].miscellaneousFields;
                toReturn = [];
                a.map((item, index) => {
                    if (item.required){
                        toReturn.push(item);
                    }
                    return true;
                })
                return toReturn;
            }
            default:{
                a = fieldList[0].bookFields;
                toReturn = [];
                a.map((item, index) => {
                    if (item.required){
                        toReturn.push(item);
                    }
                    return true;
                })
                return toReturn;
            }
        }
    }

    deleteRecord = id => event => {
        var x = window.confirm("Do you really want to delete this record? ");
        if(x){
            // Initialize the database code here :)
            var Datastore = require('nedb'), db = new Datastore({filename: "/home/sandesh/totalData.txt"});
            db.loadDatabase(function(err){
                if(err){
                    alert("The database could not be loaded. The application cant work without this.");
                }
            })
            db.remove({_id: id}, {}, function(err, numRemoved){
                console.log(id) // Log the ID that is going to be deleted.
                if(err){
                    console.log(err);
                }
            })
            window.alert("The record was deleted.");
            window.location.reload();
        }
    }

    getData(){
        var context = this;
        // Initialize the database code here :)
        var Datastore = require('nedb'), db = new Datastore({filename: "/home/sandesh/totalData.txt"});
        db.loadDatabase(function(err){
            if(err){
                alert("The database could not be loaded. The application cant work without this.");
            }
        })

        db.find({type: this.props.type}, function(error, store){
            if(error){
                console.log("Error occured while loading the data.");
                return [];
            }
            context.setState({data:store})
            return store;
        })
    }

    expandButton(){
        this.setState({expanded: !this.state.expanded});
    }

    handleBibChange(event){
        console.log(event.target.value);
        this.state.formatForDownload.format = event.target.value;
    }
    
    handleDocChange(event){
        console.log(event.target.value);
        this.state.formatForDownload.fileFormat = event.target.value;
    }

    downloadFile(event){
        console.log("Downloading file as ", this.state.formatForDownload.format);
        console.log(" in file format ", this.state.formatForDownload.fileFormat);
        var type = this.state.formatForDownload.format;
        var doc = this.state.formatForDownload.fileFormat;
        type = type.toLowerCase();
        doc = doc.toLowerCase();
        downloader(this.state.data, type, doc);
        console.log("Finished Downloading file.");
        console.log(this.state.data);
    }

    render(){
        return(
            <div>
                <Typography variant = "h6" style = {{margin: 16, marginBottom: 5}}>
                    {
                        (this.props.type === "book" && 'Books:')
                        || (this.props.type === "article" && 'Articles:')
                        || (this.props.type === "journal" && 'Journals:')
                        || (this.props.type === "chapter" && 'Book Chapters:')
                        || (this.props.type === "proceeding" && 'Proceedings:') 
                        || (this.props.type === "misc" && 'Other(s):') 
                        || (this.props.type === "report" && 'Reports:') || ''
                    }
                    {/* <Typography style = {{fontSize: 13}}>
                        <i>
                            Only some fields are included here.
                            Downloading will generate a more complete table for reference.
                        </i>
                    </Typography> */}
                </Typography>
                <br />
                <Paper>
                    <Table>
                        <TableHead style={{backgroundColor: '#f1f1f1', fontWeight: "bold"}}>
                            <TableRow>
                                {
                                    this.state.fields.map((item, index) => {
                                        return <TableCell> {item.name} </TableCell>
                                    })
                                }

                            <TableCell>
                                Edit
                            </TableCell>

                            <TableCell>
                                Delete
                            </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                                {
                                    this.state.data.map((item, index) => {
                                        return(
                                            <TableRow>
                                                {
                                                    this.state.fields.map((i, j)=>{
                                                        // Print fieldwise output.
                                                        return (<TableCell>
                                                            {item[i.id]}
                                                        </TableCell>);
                                                    })
                                                }
                                                <TableCell>
                                                    <Link to = {{
                                                        pathname: '/edit',
                                                        id: item._id,
                                                        type: item.type
                                                    }}>
                                                        <EditIcon style = {{color: "#00a1ff", cursor: "pointer" }}/>
                                                    </Link>
                                                </TableCell>

                                                <TableCell>
                                                    <DeleteIcon onClick = {this.deleteRecord(item._id)} style = {{color: "red", cursor: "pointer" }}/>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                        </TableBody>
                    </Table>
                </Paper>
                <br />
                <ExpansionPanel expanded  = {this.state.expanded} style = {{width: 350, background: '#0071bd', color: 'white'}}>
                    <ExpansionPanelSummary onClick = {this.expandButton} expandIcon = {<ExpandMoreIcon />}>
                        Generate:
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <table>
                            <tr>
                                <td>Format of citation</td>
                                <td className = "second">
                                    <Select native style = {{color: "white"}} onClick = {this.handleBibChange}>
                                        <option value = "mla">MLA</option>
                                        <option value = "apa">APA</option>
                                        <option value = "ieee">IEEE</option>
                                        <option value = "ugc">UGC</option>
                                    </Select>
                                </td>
                            </tr>
                            <tr>
                                <td>Document Format: </td>
                                <td className = "second">
                                    <Select native style = {{color: "white"}} onClick = {this.handleDocChange}>
                                        <option value = "pdf">PDF</option>
                                        <option value = "docx">DOCX</option>
                                        <option value = "html">HTML</option>
                                        
                                    </Select>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td  className = "second">
                                    <br />
                                    <Fab onClick = {this.downloadFile} size = "small" variant = "extended" style = {{backgroundColor: "#fff", padding: 16}} className = "plus_button">
                                        <strong style={{color: "grey", fontSize: 13}}>Download</strong>
                                    </Fab>
                                </td>
                            </tr>
                        </table>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <br />
            </div>
        )
    }
}


export default DataTable