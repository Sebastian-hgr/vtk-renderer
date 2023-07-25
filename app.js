const express = require('express')
const app = express()
const path = require('path')

const { spawn } = require('child_process')

app.use(express.static(path.join(__dirname, 'public')))
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')))
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')))

app.listen(3000, () => console.log('Visit http://localhost:3000'))

app.get('/getCut', (req, res) => {

    const backendProcess = spawn('g++', ['./cpp/main.cpp', '-o', './cpp/main']);

    backendProcess.on('exit', (code, signal) => {
        if (code === 0) {
            console.log('Compiled successfully!');

            const appProcess = spawn('./cpp/main');
            appProcess.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
            });
        } else {
            console.log('Compilation failed!');
        }
    })

    res.redirect('/');
})