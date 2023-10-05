const express = require('express')
const mongoose = require('mongoose')

const userRoutes = require('./routes/user')
const articleRoutes = require('./routes/article')

const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

const config = dotenv.config();
dotenvExpand.expand(config);

const app = express()

mongoose.connect(process.env.MONGODB_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
 
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    if (res.Method == "OPTIONS") {
      w.WriteHeader(http.StatusOK)
      return
  }
    next();
});

app.use('/api/auth',userRoutes)
app.use('/api/articles',articleRoutes)

module.exports = app 