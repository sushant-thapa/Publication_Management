import React from 'react';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import DataTable from '../table_component/table';
import TopBar from '../topbar_component/topbar';
import User from '../user_component/user';

import './homepage.css';

class Homepage extends React.Component{
    render(){
        return(
            <div>
                <TopBar></TopBar>
                <User></User>
                <br />
                <br />
                <Grid container>
                    <Grid item xs = {1}></Grid>
                    <Grid item>
                        <Link to = "/add">
                            <Fab size = "small" variant = "extended" color = "secondary" className = "plus_button">
                                <strong style={{color: "white", fontSize: 13, padding: 10}}>Add a new item</strong>
                            </Fab>
                        </Link>
                        &nbsp;
                        {/* <Fab size = "small" variant = "extended" style = {{backgroundColor: blue[500], padding: 16, marginLeft: 16}} className = "plus_button">
                            <strong style={{color: "white", fontSize: 13}}>Generate Table For all</strong>
                        </Fab> */}
                    </Grid>
                </Grid>
                <br />
                <Grid container>
                    <Grid item xs={1}></Grid>
                    <Grid item xs = {10}>
                        <DataTable type = "journal"></DataTable>
                        <br />              
                        <DataTable type = "article"></DataTable>
                        <br />
                        <DataTable type = "book"></DataTable>
                        <br />                        
                        <DataTable type = "proceeding"></DataTable>
                        <br />
                        <DataTable type = "chapter"></DataTable>
                        <br />
                        <DataTable type = "report"></DataTable>
                        <br />
                        <DataTable type = "misc"></DataTable>
                        <br />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Homepage;