import React  from 'react'
import { hydrate } from 'react-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import { App } from './App'
import { handleModifyAnswerVotes } from '../shared/utility'
import theme from '../shared/theme'

let state;

fetch('http://localhost:7777/data')
    .then(data => data.json())
    .then(json => {
        state = json
        render()
    })

function handleVote (answerId, increment) {
    state.answers = handleModifyAnswerVotes(state.answers, answerId, increment)
    fetch(`vote/${answerId}?increment=${increment}`)
    render()
}


function render() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
        jssStyles.parentElement.removeChild(jssStyles);
    }
    hydrate(
        <ThemeProvider theme={theme}>
            <App { ...state } handleVote={handleVote} />
        </ThemeProvider>,
        document.querySelector("#root")
    )
}
