import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Logo from '../../assets/tu-logo.png';

import './topbar.css';

export default class TopBar extends React.Component{
    render(){
        return(
            <Grid container className = "root">
                <Grid item xs = {1}>
                    <link href="https://fonts.googleapis.com/css?family=Quicksand" rel="stylesheet" /> 
                </Grid>
                <Grid item xs = {10}
                        style = {{
                            padding: 10,
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center"
                        }}
                    >
                    <img src = {Logo}
                        alt = "LOGO "
                        style = {{
                            width: 60,
                            height: 60,
                            borderRadius: 1000,
                            margin: 10,
                            marginRight: 20,
                            // padding: 10,
                            // borderColor: "white",
                            // borderStyle : "solid",
                            // borderWidth: 1,
                        }}
                    ></img>
                    <Typography style = {{color: "white", fontFamily: "quicksand", fontWeight: "bolder", fontSize: 25}} >
                        PUBLICATIONS LIST MANAGER
                    </Typography>
                </Grid>
            </Grid>
        )
    }
}