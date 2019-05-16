import React from 'react';
import Typography from '@material-ui/core/Typography';

import {fieldList} from '../../database/fieldList';
import {Table,  TableBody, TableRow, TableCell, TextField, Radio } from '@material-ui/core';
import { Button } from '@material-ui/core';
import addPublication from '../../database/insert';

class FormGenerator extends React.Component{
    constructor(props){
        super(props);
        console.log("Constructor called.");
        this.state = {
            fieldList: '',
            compulsoryFields: [],
            type: '',
            formData : {},
        }

        this.state.type = this.props.type;
        this.state.formData.type = this.props.type;
        this.state.fieldList = fieldList[0].bookFields;

        this.handleProp = this.handleProp.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleProp();
    }
    
    inputChange = id => event => {
        var name = id;
        var value = event.target.value;
        this.state.formData[name] = value;
    }

    handleProp(){
        console.log("HandleProp called.");
        console.log(this.state.type);
        switch(this.state.type){
            case 'book':{
                this.setState({fieldList: fieldList[0].bookFields});
                break;
            }
            case 'journal':{
                this.setState({fieldList: fieldList[0].journalArticleFields});
                break;
            }
            case 'chapter':{
                this.setState({fieldList: fieldList[0].bookChapterFields});
                break;
            }
            case 'proceeding':{
                this.setState({fieldList: fieldList[0].proceedingFields});
                break;
            }
            case 'article':{
                this.setState({fieldList: fieldList[0].articleFields});
                break;
            }
            case 'report':{
                this.setState({fieldList: fieldList[0].reportFields});
                break;
            }

            case 'misc':{
                this.setState({fieldList: fieldList[0].miscellaneousFields});
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
    }
    
    handleSubmit(){
        console.log(this.state.formData);
        console.log("Submit button clicked.");
        var returnArray = this.validateForm();
        if(returnArray.length == 0){
            // process record into a database.
            // TRY for now -_-
            var retVal = addPublication(this.state.formData);
            alert("Record added successfully to database.");
        }
        else{
            // Some fields are missing. Print them.
            console.log("Empty Required field: ", returnArray[0]);
        }
    }

    componentWillReceiveProps(newProps ){
        this.state.type = newProps.type;
        console.log("Set a new prop type. ", newProps.type);
        this.state.formData.type = newProps.type;
        this.handleProp();
    }

    validateForm(){
        // Check for all the required fields in the state data.
        // For any fields that are non existent or empty, push and return as array.
        // If the array length is 0, then it means all fields are filled. Else, fields need filling.
        var failedFields = [];
        this.state.compulsoryFields.map((item, index)=>{
            if(!this.state.formData[item] || this.state.formData[item] === ""){
                failedFields.push(item);
            }
        })
        return failedFields;
    }

    render(){
        var context = this;
        return(
            <div> 
                <div>
                    <Typography>
                        Enter the information related to {this.props.type}.
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
        )
    }
}

export default FormGenerator;