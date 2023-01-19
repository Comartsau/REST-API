const express = require('express')
const cors = require('cors')
const Sequelize = require('sequelize')
const app = express()

const sequelize = new Sequelize('orm','root','4452410012',{
    host:'localhost',
    dialect:'mysql'
})

const User = sequelize.define('user',{
    username:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false,
    },    
    password:{
        type:Sequelize.STRING,
        allowNull:false,
    },    
    fullname:{
        type:Sequelize.STRING,
        allowNull:false,
    },    
    avatar:{
        type:Sequelize.STRING,
        allowNull:false,
    },    
})    

// sequelize.sync({force: true}).then(()=>{
//     console.log('Table created successsfully')


// async function initDB() {

//     const user = await User.findAll({
//         where:{
//             username: 'comartsau',
//         },
//     });
    
//     if (user) {
    
//         const newUser = await User.create({
//             username: 'comartsau',
//             password: '12345',
//             fullname: 'Pop munt',
//             avatar: 'https://www.melivecode.com/users/1.png'
        
//         });
//     }

// }    

// initDB()
// })

app.use(express.json())
app.use(cors())

app.get('/users', async (req,res)=>{
    try {
        const users = await User.findAll()
        res.json(users)
    } catch (error) {
        res.status(500).send(error)
    }
})


app.post('/users',async(req,res)=>{
    try {
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            fullname: req.body.fullname,
            avatar: req.body.avatar
        })
        res.json(user)
    } catch (error) {
        res.status(400).send(error)
    }

})

app.put('/users/:id', async (req, res) =>{
    try {
        const user = await User.findByPk(req.params.id)
        if (!user) {
            res.status(404).send('User not found')
            return
        }
        await user.update({
            username: req.body.username,
            password: req.body.password,
            fullname: req.body.fullname,
            avatar: req.body.avatar
        })
        res.json(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        if (!user) {
            res.status(404).send('User not found')
            return
        }
        await user.destroy()
        res.send('User deleted')
    } catch (error) {
        res.status(500).send(error)
    }
})


const port = 5000

app.listen(port,()=>{
    console.log(`Server started on port ${port}...`)
})
