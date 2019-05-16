import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import config from '../../database/config';

export default class User extends React.Component{
    render(){
        return(
            <Grid container>
                <Grid item xs = {1} >
                </Grid>
                <Grid item xs = {10} >
                    <Paper className = "user_container" style = {{padding: 30}}>
                        <Grid container>
                            <Grid item xs = {1}>
                                <img />
                            </Grid>
                            <Grid item xs = {11}>
                                <Typography variant = 'h6'>
                                    {config.user_name}
                                </Typography>
                                <strong> {config.user_designation} at {config.user_institute }</strong>
                            </Grid> 
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}