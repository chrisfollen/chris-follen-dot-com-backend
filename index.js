require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const knex = require('knex')
const config = require('./knexfile')[process.env.NODE_ENV || 'development']
const database = knex(config)
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const cors = require('cors');
app.use(cors());

const auth = (request, response, next) => {

    const token = request.headers.authorization

    if (!token) {
        response.sendStatus(401)
    }

    try {
        const tokenOK = jwt.verify(token, process.env.SECRET)
    } catch(error) {
        response.sendStatus(403)
    }

    next()
}


app.get('/journal', (request, response) => {
    database('articles')
        .then(articles => response.json(articles))
})

app.get('/journal/:slug', (request, response) => {
    database('articles')
        .where({slug: request.params.slug})
        .then(articles => response.json(articles[0]))
})

app.post('/journal', auth, (request, response) => {
    database('articles')
        .insert({
            title: request.body.title,
            date: request.body.date,
            slug: request.body.slug,
            featured: request.body.featured,
            body1: request.body.body1,
            body2: request.body.body2,
            body3: request.body.body3,
            body4: request.body.body4,
            body5: request.body.body5,
            body6: request.body.body6,
            body7: request.body.body7,
            body8: request.body.body8,
            body9: request.body.body9,
            body10: request.body.body10,
            image_1_url: request.body.image_1_url,
            image_2_url: request.body.image_2_url,
            image_3_url: request.body.image_3_url,
            image_4_url: request.body.image_4_url,
            image_5_url: request.body.image_5_url,
            image_6_url: request.body.image_6_url,
            image_7_url: request.body.image_7_url,
            image_8_url: request.body.image_8_url,
            image_9_url: request.body.image_9_url,
            image_10_url: request.body.image_10_url,
            image_11_url: request.body.image_11_url,
            image_12_url: request.body.image_12_url,
            image_13_url: request.body.image_13_url,
            image_14_url: request.body.image_14_url,
            image_15_url: request.body.image_15_url,
            image_16_url: request.body.image_16_url,
            image_17_url: request.body.image_17_url,
            image_18_url: request.body.image_18_url,
            image_19_url: request.body.image_19_url,
            image_20_url: request.body.image_20_url,
        })
        .returning('*')
        .then(articles => response.json(articles[0]))
})

app.patch('/journal/:slug', auth, (request, response) => {
    const info = request.body
    database('articles')
        .where({slug: request.params.slug})
        .update(info)
        .returning('*')
        .then(articles => response.json(articles[0]))
})

app.delete('/journal/:slug', auth, (request, response) => {
    database('articles')
        .where({slug: request.params.slug})
        .delete()
        .then(() => response.status(204))
})

// app.delete('/journal/:id', (request, response) => {
//     database('articles')
//         .where({id: request.params.id})
//         .delete()
//         .then(() => response.status(204))
// })

// app.delete('/users/:id', (request, response) => {
//     database('tacos')
//         .where({id: request.params.id})
//         .delete()
//         .then(() => response.status(204))
// })


// const createUser = (request, response) => {
//     const { username, password } = request.body

//     bcrypt.hash(password, 12)
//         .then(hashedPassword => {
//             return database('tacos').insert({
//                 username,
//                 password_digest: hashedPassword
//             }).returning("*")
//             }).then(tacos => {
//                 response.json({user: tacos[0]})
//         })
// }

// app.post("/users", createUser)

const login = (request, response) => {
    const { username, password } = request.body
    database('tacos').select().where({ username }).first()
        .then(user => {
            if (!user) throw new Error("No user by that name!")

            return bcrypt.compare(password, user.password_digest)
                .then(passwordDidMatch => {
                    if (!passwordDidMatch) throw new Error ("Wrong password, guy")
                    return user
                })
        }).then(user => {
            
            jwt.sign(user, process.env.SECRET, (error, token) => {
                if (error) throw new Error("Prolem signing jwt")
                response.json({ token })
            })
        }).catch(error => {
            response.json({
                error: error.message
            })
        })
}

app.post("/login", login)

// app.get('/users', (request, response) => {
//     database('tacos')
//         .then(users => response.json(users))
// })


app.listen(port, () => console.log(`listening on port ${port}`))
