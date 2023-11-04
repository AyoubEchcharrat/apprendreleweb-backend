// sitemap.js
const express = require('express');
const { SitemapStream, streamToPromise } = require('sitemap');
const Article = require('../models/article'); 

const router = express.Router();

router.get('/sitemap.xml', async (req, res) => {
  try {
    const smStream = new SitemapStream({ hostname: 'https://apprendreleweb.ayoub-echcharrat.fr' });

    const articles = await Article.find(); 

    articles.forEach((article) => {
      smStream.write({
        url: `/article/${article._id}`, 
        changefreq: 'daily', 
        priority: 0.7, 
        lastmod: article.date, 
      });
    });

    smStream.end();

    res.header('Content-Type', 'application/xml');
    res.send((await streamToPromise(smStream)).toString());
  } catch (error) {
    res.status(500).send('Erreur lors de la génération du sitemap.');
  }
});

module.exports = router;