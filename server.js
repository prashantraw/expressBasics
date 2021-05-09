// My first express server
const Express = require('Express')

// First step to create a server is to create an app using express 
const app = Express()
const fs = require('fs')

const Data = fs.readFileSync(`${__dirname}/../data/gym.json`, 'utf-8')
const gymsData = JSON.parse(Data)

// middleware
app.use(Express.json())


// const { stringify } = require('querystring')

const PORT = 3000;

// create a route 
app.get("/", (req, res) => {
    res.send("Hello from my first server")
})

app.get('/api/gyms', (req, res) => {

    fs.readFile(`${__dirname}/../data/gym.json`, 'utf-8', (err, data) => {
        res.status(200).json({
            status: "success",
            count: gymsData.length,
            data: gymsData
        })

    })


})

app.post('/api/gyms', (req, res) => {
    console.log(req.body)

    // now there is a need to add this data to existing gyms and write it back to gyms.json
    const newGym = { id: gymsData.length + 1, ...req.body }
    const newGyms = [...gymsData, newGym]
    console.log(newGyms)

    // now for writing it back to file 
    fs.writeFile(`${__dirname}/../data/gym.json`, JSON.stringify(newGyms), (err) => {
        console.log(err)
        if (!err) {
            res.status(201).json({
                status: "successfully added"
            })
        }
        else {
            res.send(500).json({
                status: "internal server error",
                err: err.message
            })

        }

    })


})

// getting data of a specific gym by the help of id
app.get('/api/gyms/:id', (req, res) => {
    console.log(req.params)
    const gym = gymsData.find(item => item.id == req.params.id) 
    res.status(200).send({
        status: "success",
        data: gym
    })


})

// to start the server /  listening to the request 

app.listen(PORT, () => {
    console.log("Server started succesfuly")
})

// const gyms = fs.readFile(`${__dirname}/../data/gym.json`, 'utf-8', (err, data) => {
//     console.log(data)

//     const JsonData = JSON.parse(data)

//     let id = 0

//     const newData = JsonData.map(item => {
//         id++;
//         return ({ id: id, ...item })
//     })
//     fs.writeFile(`${__dirname}/../data/gym.json`, JSON.stringify(newData), (err) => {
//         console.log(err, "done")

//     })

// })

// first server completed.....