import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, AppBar, IconButton, Typography, Toolbar, Paper } from '@material-ui/core'
import { ThumbUp, ThumbDown, Menu } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
}));

export const App = ({ questions, answers, handleVote }) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Q&A Tool
                    </Typography>
                </Toolbar>
            </AppBar>
            {questions.map(({questionId, content}, index) => (
                <Paper className={classes.paper} key={questionId} elevation={3}>
                    <h3>{`${index + 1}. ${content}`}</h3>
                    <div>
                        {answers.filter(answer => answer.questionId === questionId).map(
                            ({content, upvotes, answerId}) => (
                                <div key={answerId}>
                                    <span>{content} - {upvotes}</span>
                                    <Button onClick={() => handleVote(answerId, 1)}><ThumbUp/></Button>
                                    <Button onClick={() => handleVote(answerId, -1)}><ThumbDown/></Button>
                                </div>
                            )
                        )}
                    </div>
                </Paper>
            ))}
        </React.Fragment>
    )
}
