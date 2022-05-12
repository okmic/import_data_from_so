
const path = require('path')
const fs = require('fs')
const dirNames = require('./data')
const createCsvWriter = require('csv-writer').createArrayCsvWriter
const jsonfile = require('jsonfile')

const csvWriter = createCsvWriter({
    header: ['ФИО', 'Дата Рождения'],
    path: __dirname + "\\" + "testData.csv"
})

function fileHandlerAppend(body, message) {

    csvWriter.writeRecords(body)     
    .then(() => {
    console.log(message)
    })
 
    jsonfile.writeFile(path.join(__dirname, 'testData.json'), body)


}

const app = async () => {

const array = []

for (let index = 0; index < dirNames.length; index++) {
    
   const content = await fs.readFileSync(path.join(__dirname, 'users', dirNames[index], "data.txt"), 'utf8', async (err, fileContent) => {
        if(err) throw err   
        return fileContent   
    }) 
    array.push([dirNames[index], content]) 

    //txt write

    const txtContent = dirNames[index] + "," + content + "\r\n"

    fs.appendFile(path.join(__dirname, "testData.txt"), txtContent, (err) => {
        if (err) throw err
    })  
    
   //csv and json write
    if(index + 1 === dirNames.length) {
        fileHandlerAppend(array, 'The data has been added to the testData.csv file')
        console.log(array)
    }
} 
}

app()