
const path = require('path')
const fs = require('fs')
const dirNames = require('./data')
const createCsvWriter = require('csv-writer').createArrayCsvWriter

const csvWriter = createCsvWriter({
    header: ['ФИО'],
    path: __dirname + "\\" + "testData.csv"
})

function fileHandlerAppend(body, message) {
/* 
    fs.appendFile('testFile.txt', body, (err) => {
        if (err) throw err
        console.log("txt" + message)
    }) 
*/

    csvWriter.writeRecords(body)     
    .then(() => {
    console.log(message)
    })

}

const app = async () => {

/*  txt
    for (let index = 0; index < dirNames.length; index++) {
        fileHandlerAppend(dirNames[index] +  "\r\n", 'Data has been added!')
    } 
*/

//csv

const array = []

for (let index = 0; index < dirNames.length; index++) {
    
   const content = await fs.readFileSync(path.join(__dirname, 'users', dirNames[index], "data.txt"), 'utf8', async (err, fileContent) => {
        if(err) throw err   
        return fileContent   
    }) 
    array.push([dirNames[index], content]) 

    /*  */
   
    if(index + 1 === dirNames.length) {
        fileHandlerAppend(array, 'The data has been added to the testData.csv file')
        console.log(array)
    }
} 

}

app()