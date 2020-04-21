import React from 'react'
import express from 'express'
import { readFileSync } from 'fs'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles'
import { App } from '../client/App'
import { handleModifyAnswerVotes } from '../shared/utility'
import theme from '../shared/theme'

const PORT = 7777
const data = {
    questions: [
        {
            questionId: "Q1",
            content: "Reuse-based software engineering is a software engineering strategy where the development process is geared to reusing existing software"
        },
        {
            questionId: "Q2",
            content: "The open source movement has meant that there is a huge reusable code base available at"
        },
        {
            questionId: "Q3",
            content: "Consider the example and categorize it accordingly, “A pattern-matching system developed as part of a text-processing system may be reused in a database management system”"
        }
    ],
    answers: [
        {
            answerId: "A1",
            questionId: "Q1",
            upvotes: 3,
            content: "true"
        },
        {
            answerId: "A2",
            questionId: "Q1",
            upvotes: 0,
            content: "false"
        },
        {
            answerId: "A3",
            questionId: "Q2",
            upvotes: 0,
            content: "free of cost"
        },
        {
            answerId: "A4",
            questionId: "Q2",
            upvotes: 3,
            content: "low cost"
        },
        {
            answerId: "A5",
            questionId: "Q2",
            upvotes: 0,
            content: "high cost"
        },
        {
            answerId: "A6",
            questionId: "Q2",
            upvotes: 0,
            content: "short period of time"
        },
        {
            answerId: "A7",
            questionId: "Q3",
            upvotes: 0,
            content: "Application system reuse"
        },
        {
            answerId: "A8",
            questionId: "Q3",
            upvotes: 3,
            content: "Component reuse"
        },
        {
            answerId: "A9",
            questionId: "Q3",
            upvotes: 0,
            content: "Object and function reuse"
        },
        {
            answerId: "A10",
            questionId: "Q3",
            upvotes: 0,
            content: "None of the mentioned"
        }
    ]
}

function renderFullPage(html, css) {
    let index = readFileSync(`public/index.html`, `utf8`)
    index = index.replace("{{css}}", css)
    index = index.replace("{{html}}", html)
    return index
}

function handleRender(req, res) {
    const sheets = new ServerStyleSheets();
    const html = renderToString(
        sheets.collect(
            <ThemeProvider theme={theme}>
                <App { ...data } handleVote={handleModifyAnswerVotes} />
            </ThemeProvider>,
        ),
    );
    const css = sheets.toString();
    res.send(renderFullPage(html, css));
}

const app = new express()

app.use(express.static("dist"))

app.get('/', handleRender)

app.get('/data', (req, res) => res.json(data))

app.get('/vote/:answerId', (req, res) => {
    const { query, params } = req
    data.answers = handleModifyAnswerVotes(data.answers, params.answerId, +query.increment)
    res.send('ok')
})

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`)
})
