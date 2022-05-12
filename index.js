
const path = require('path')

let data = [
    "Иванов Иван Иванович",
    "Ян Иван Алексеевич",
    "Смирнов Петр Петрович",
    "Охтов Михаил Зауэрович",
    "Тамилова Алина Анатолевна"
    ]
    
    let i = 1
    
    const count = () => {
         for (let index = 0; index < data.length; index++) {
            console.log(data[index], i, data[index].length)        
            i++
        } 
    }
    count()