/*
    TODO: Check when params are empty and mutate page heading accordingly.
    In short, do not let the user access /edit directly on the server.
*/
import React from 'react';
import Typography from '@material-ui/core/Typography';

import {fieldList} from '../../database/fieldList';
import {Table,  TableBody, TableRow, TableCell, TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';

import TopBar from '../topbar_component/topbar';

export default class Edit extends React.Component{
    constructor(props){
        super(props);
        this.handleProp = this.handleProp.bind(this);
        this.getData = this.getData.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            articleID: '',
            articleType: '',  
            fieldList: [],
            formData: {}
        }
        this.state.articleID = this.props.location.id;
        this.state.articleType = this.props.location.type;
        console.log(this.state.articleType);
        console.log(this.props.location.id);
        this.handleProp();
        this.getData();
    }

    getData(){
        //  Fetch data according to id.
        var context = this;
        // Initialize the database code here :)
        var Datastore = require('nedb'), db = new Datastore({filename: "/home/sandesh/totalData.txt"});
        db.loadDatabase(function(err){
            if(err){
                alert("The database could not be loaded. The application cant work without this.");
            }
        })

        db.find({_id: this.state.articleID}, function(error, store){
            if(error){
                console.log("Error occured while loading the data.");
                return [];
            }
            context.setState({formData: store[0]});
            console.log("State is: ", context.state.currentData);
            console.log("Store is: ", store);
        })
    }

    handleProp(){
        console.log("HandleProp called.");
        switch(this.state.articleType){
            case 'book':{
                this.state.fieldList = fieldList[0].bookFields;
                break;
            }
            case 'journal':{
                this.state.fieldList = fieldList[0].journalArticleFields;
                break;
            }
            case 'chapter':{
                this.state.fieldList = fieldList[0].bookChapterFields;
                break;
            }
            case 'proceeding':{
                this.state.fieldList = fieldList[0].proceedingFields;
                break;
            }
            case 'research-paper':{
                this.state.fieldList = fieldList[0].researchPaperFields;
                break;
            }
            case 'article':{
                this.state.fieldList = fieldList[0].periodicalArticleFields;
                break;
            }
            case 'report':{
                this.setState({fieldList: fieldList[0].reportFields});
                break;
            }
            default:{
                console.log("Invalid Choice for form selection. DO NOT TAMPER.");
                break;
            }
        }
        // Push all the required fields into an array for form validation.
        var temp = [];
        this.state.fieldList.map((key, index)=>{
            if(key.required) {
                temp.push(key.id);
            }
        });
        // Setstate not working in array. Please fix this. :'( 
        this.state.compulsoryFields = temp;
        console.log("Changed the state a/c the prop.");
        console.log(this.state.fieldList);
    }
    
    inputChange = id => event => {
        var name = id;
        var value = event.target.value;
        console.log("Changed value: ", value);
        this.setState(prevState=>({
            formData:{
                ...prevState.formData,
                [name]: value
            },
        }));
        console.log(this.state.formData);
    }

    handleSubmit(){
        const context = this;
        // Initialize the database code here :)
        var Datastore = require('nedb'), db = new Datastore({filename: "/home/sandesh/totalData.txt"});
        db.loadDatabase(function(err){
            if(err){
                alert("The database could not be loaded. The application cant work without this.");
            }
        })
        console.log(this);
        db.remove({_id: context.state.articleID}, function(error, store){
            if(error){
                console.log("Error occured while loading the data.");
                return [];
            }
            console.log("Record deleted from database.");
        })

        db.insert(context.state.formData, function(error, docs){
            console.log("Record inserted into database.");
            alert("Record Updated successfully");
        })
    }
    render(){
        var context = this;
        return(
            <div>
                <TopBar></TopBar>
                
            <div> 
                <div style = {{
                    padding: 16,
                    width: '60%',
                    margin: "auto"
                }}>
                    <Typography>
                        {
                            (this.state.articleType != "" && 
                                "Edit Information for " + this.state.articleType
                            )|| "Please Do not access this page directly"
                        }
                    </Typography>
                    <br />
                    <Typography>
                        ( <span style = {{color: 'red'}}>*</span> denotes a required field )
                    </Typography>
                    <Table>
                        <TableBody>
                            { this.state.fieldList.map(function(item, index){
                                return (
                                    <TableRow key = {index}>
                                        <TableCell>
                                            {item.description}
                                            {item.required && <span style = {{color: 'red'}}>*</span> }
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                            required = {item.required}
                                            name = "somename"
                                            id = "someid"
                                            className = "someClassName"
                                            key = {index}
                                            value = {
                                                context.state.formData[item.id] || ""
                                            }
                                            onChange = {context.inputChange(item.id)} placeholder = "Begin typing..." />
                                        </TableCell>
                                    </TableRow>
                                );   
                            })}
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>
                                    <Button size = "large" color = "primary" onClick = {this.handleSubmit}>
                                        Submit.
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
            </div>
        )
    }
}