const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors");

const userRoutes = require('./routes/user')
const articleRoutes = require('./routes/article')
const sitemapRoutes = require('./routes/sitemap');

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
 
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store'); // Désactive la mise en cache
  next();
});

app.use(express.json())

app.use(cors());

app.use('/api/auth',userRoutes)
app.use('/api/articles',articleRoutes)
app.use('/api/sitemap', sitemapRoutes)

module.exports = app 