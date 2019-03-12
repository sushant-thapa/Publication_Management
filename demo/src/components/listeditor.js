import React, {Component} from 'react';
import Navibar from '../navbar';
import {FormControl} from 'react-bootstrap';
import './newentry.css';
import { BookFields, ResearchPaperFields } from './fields';
import {Button} from 'react-bootstrap';

class ListEditor extends Component{
    constructor(props){
        super(props);
        this.state = {
            "user_email": "mail.sandeshbhusal@gmail.com"
        };
        console.log("Props: ", props.match.params);
        if(props.match.params.type === "books"){
            this.state.type_of_article = "book";
            this.type = "Book";
            this.fields = BookFields;
        }
        else if(props.match.params.type === "research-papers"){
            this.state.type_of_article = "book";            
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
        this.authorNames = new Array();
    }
    handleChange(item){
        var name = (item.target.name).replace(" ", "_");
        this.setState({[name] : item.target.value});
    }
    handleSubmit(event){
        console.log(this.state);
        fetch("http://localhost:3000/api/addNewPublication", {
            method: "POST",
            crossDomain: true,
            cache: "no-cache",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(this.state)
        }).then(response => {
            console.log(JSON.stringify(response));
        })
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
        this.state.authors = this.authorNames;
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
                                                name = {key.toLowerCase()}
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
                            <Button bsStyle = "success" type = "submit"> Add </Button>                            
                        </form>
                        <br />
                    </div>
                </div>
            </div>
        );
    }
}

export default ListEditor;