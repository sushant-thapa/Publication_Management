import React, { Component } from 'react';
import '../App.css';
import './combined.css';
import {Button, ButtonGroup} from 'react-bootstrap';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Link} from 'react-router-dom'
import './modules/sample_data'
import { returnData } from './modules/sample_data';

var Datastore = require('nedb'), db = new Datastore({ filename: '/home/sandesh/se/database.db' });
db.loadDatabase(function(error){
    if(error)
        {console.log("Error while loading database: " , error);    
    }
})

class TableGen extends Component {
    constructor(props, context){
        super(props, context);
        this.state = {};
        this.searchKey = {};
        if(this.props.type === "combined"){
            this.title = "All Publications:";
        }
        if(this.props.type === "books"){
            this.title = "Books:";
            this.searchKey = {type_of_article:"book"};
        }
        if(this.props.type === "research-papers"){
            this.title = "Research Papers:";
            this.searchKey = {type_of_article:"research-paper"}
        }
        
        this.state = {
          modal: false,
          deleteMode: false,
          count: 1
        };

        this.adderLink = "addnew/" + this.props.type;
        this.editorLink = "editlist/";
        this.toggle = this.toggle.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.setState({data: ''});
        this.setState({loaded: false});
        var myState = this;
        db.find(this.searchKey, function(error, docs){
            console.log("State is", myState);
            console.log(docs);
            if(!error){
                myState.setState({data: docs});
                myState.setState({loaded: true})
                myState.setState({garbage: 1});
                myState.setState({count : 1});
            }
        })
    }
    
    deleteItem(event){
        var tg = event.target;
        var deleteby = tg.name;
        console.log(tg);
        db.remove({_id: deleteby}, {}, function(err, numRemoved){
            if(numRemoved === 0){
                alert("Could not delete element");
            }
            else{
                alert("Item has been removed from database.");
            }
        });
        var myState = this;
        db.find({}, function(error, docs){
            console.log("State is", myState);
            console.log(docs);
            if(!error){
                myState.setState({data: docs});
                myState.setState({loaded: true})
                myState.setState({garbage: 0});
                myState.setState({count : 1});
            }
        })
    }

    fetchData(){
        console.log("Spider man.. spider man.. Does whatever a spider")
    }
    
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render(){
        return(
            <div className = "table container-fluid ">
                <Modal className = "small text-center" isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle = {this.toggle}> Generate </ModalHeader>

                    <ModalBody>
                        Select format for <u>{this.title}</u> table to generate and download
                        or print.
                        <br /><br />
                        Table Format:
                        <form>
                            <select>
                                <option> Modern Language Association</option>
                                <option> American Psychologists' Association</option>
                            </select>
                        </form>

                        <br />
                        File Format:
                        <form>
                            <select>
                                <option>PDF</option>
                                <option>DOCX</option>
                            </select>
                        </form>
                        <br />
                        <ButtonGroup>
                            <Button bsStyle = "primary" >Generate and Download</Button>
                        </ButtonGroup>
                        <br />&nbsp;
                    </ModalBody>
                </Modal>
                <div className = "container">
                    <h6>
                        {this.title}
                        <br />
                    </h6>
                    <br />
                    <table className = "small">
                        <tbody>
                            <tr>
                                <td> S.N.</td>
                                <td> Title </td>
                                <td> Name of Journal </td>
                                <td> Volume </td>
                                <td> Authors </td>
                                <td> Date </td>
                                <td> DOI </td>
                                <td> ISBN </td>
                                <td> Link </td>
                                {/* <td> Edit </td> */}
                                <td> Delete </td>
                            </tr>
                            {   this.state.loaded && 
                                this.state.data.map((item, index)=>{
                                    console.log("Loading data into the table, row #", index);
                                    return(<tr key={item.title+this.state.count}>
                                        <td>{this.state.count++}</td>
                                        <td>{item.title}</td>
                                        <td>{item.name_of_journal}</td>
                                        <td>{item.volume}</td>
                                        <td>
                                            {item.authors && item.authors[0].first_name}&nbsp;
                                            {item.authors && item.authors[0].last_name},&nbsp;

                                            {item.authors && item.authors[1].first_name}&nbsp;
                                            {item.authors && item.authors[1].last_name}&nbsp;
                                        </td>
                                        <td>{item.date}</td>
                                        <td>{item.doi}</td>
                                        <td>{item.isbn}</td>
                                        <td><a href = {item.link_for_article}>Download</a></td>
                                        <td>
                                            <a href='#' name={item._id} onClick={this.deleteItem}>Delete</a>
                                        </td>
                                    </tr>);
                                })
                            }
                        </tbody>
                    </table>
                    <br />
                    {/* <ButtonGroup> */}
                        <Button bsSize = 'small' bsStyle = 'warning' onClick = {this.toggle}>Generate</Button>&nbsp;&nbsp;
                        {
                            this.props.type !== "combined"?
                            <Link to={this.adderLink} state={`type: this.props.type`}>Add new Entry</Link>
                            : ""
                        }
                    {/* </ButtonGroup> */}
                </div>
            </div>
        );
    }
}

export default TableGen;