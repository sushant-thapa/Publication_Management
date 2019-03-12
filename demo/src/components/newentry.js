import React, {Component} from 'react';
import Navibar from '../navbar';
import {FormControl} from 'react-bootstrap';
import './newentry.css';
import { BookFields, ResearchPaperFields } from './fields';
import {Button} from 'react-bootstrap';

var Datastore = require('nedb'), db = new Datastore({ filename: '/home/sandesh/se/database.db' });
db.loadDatabase(function(error){
    if(error)
        {console.log("Error while loading database: " , error);    
    }
})
console.log(db);
class Entry extends Component{
    constructor(props){
        super(props);
        this.state = {
            "user_email": "mail.sandeshbhusal@gmail.com",
            "type_of_article" : ''
        };
        console.log("Props: ", props.match.params.item);
        if(props.match.params.type === "books"){
            this.state.type_of_article = "book";
            this.type = "Book";
            this.fields = BookFields;
        }
        else if(props.match.params.type === "research-papers"){
            this.state.type_of_article = "research-paper";
            this.type = "Research paper";            
            this.fields = ResearchPaperFields;
        }
        else{
            this.type = "Research Paper";
            this.fields = ResearchPaperFields;
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAuthors = this.handleAuthors.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.authorNames = new Array();
    }
    handleChange(item){
        var name = (item.target.name).replace(" ", "_");
        var name = (item.target.name).replace("\"", "");
        this.setState({[name] : item.target.value});
    }
    handleSubmit(event){
        db.insert(this.state, function(error, newDoc){
            console.log("error of function: ", error);
            if(!error){
                alert("This record has been uploaded successfully. Please refresh the page to add another.");
            }
            console.log("New doc value:" , newDoc);
        });
        event.preventDefault();
    }
    handleAuthors(event){
        var value = event.target.value;
        var authors = value.split(",");
        this.authorNames.length = 0;
        var toReturn = new Array();
        if(authors.length > 0){
            authors.map(function(item, index){
                item = item.trim();
                var flname = item.split(" ");
                if(flname.length > 1){
                    var firstName = flname[0];
                    var secondName = flname[1];
                    var output = {"first_name" : firstName, "last_name": secondName, "email" : "random"};
                    toReturn.push(output);
                }
            });
        }
        this.authorNames = toReturn;
        this.setState({authors : this.authorNames});
    }
    clearForm(){
        this.state = {};
    }
    render(){
        return(
            <div>
                <Navibar />
                <br />
                <div className = "container-fluid">
                    <div className = 'container'>
                        Add a new <b>{this.type}</b> to the database.
                        <br /><br />
                        <form id = "fillForm" onSubmit = {this.handleSubmit}>
                            <table id = "entryTable">
                                <tbody>
                                {
                                    Object.keys(this.fields).map((key) => {
                                        return (<tr key = {key}><td>{key}:</td><td><FormControl
                                                className = "input" 
                                                name = {this.fields[key].holder}
                                                id = {key} 
                                                onChange={this.handleChange}
                                                type =  {this.fields[key].type} 
                                                placeholder = {this.fields[key].placeholder}/></td></tr>)
                                    })
                                }
                                <tr>
                                    <td>Authors: </td>
                                    <td>
                                        <FormControl className = "authors"
                                                     name = "authorHolder"
                                                     placeholder = "Enter the name of authors, seperated by single comma"
                                                     type = "string"
                                                     onChange={this.handleAuthors}
                                                     ></FormControl>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <br />
                            <Button bsStyle = "success" type = "submit"> Add </Button> &nbsp;&nbsp;&nbsp;
                            <Button bsstyle = 'danger' type = 'reset' onClick={this.clearForm}>Clear </Button>                            
                        </form>
                        <br />
                    </div>
                </div>
            </div>
        );
    }
}

export default Entry;