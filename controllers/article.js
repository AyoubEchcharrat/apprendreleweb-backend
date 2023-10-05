const Articles = require('../models/article')

exports.createArticle = (req, res, next) => {
    const articleObject = req.body.article;
    const articleTitle = req.body.title
    const article = new Articles({
        article:articleObject,
        title:articleTitle,
        userId: req.auth.userId,
    });
    article.save()
    .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
    .catch(error => { res.status(405).json( { error })})
}

exports.getOneArticle = (req,res,next) => {
    Articles.findOne({_id: req.params.id})
        .then(article => res.status(200).json(article))
        .catch(error => res.status(404).json({error}))
}

exports.getAllArticles = (req,res,next) => {
    Articles.find()
    .then(articles => res.status(200).json(articles))
    .catch(error => res.status(400).json({Erreur : {error}}))
}

exports.modifyArticle = (req,res,next) => {
    Articles.findOne({_id : req.params.id})
        .then(article => {
            if(article.userId != req.auth.userId) {
                res.status(401).json({message : "Vous n'êtes pas l'auteur de l'article."})
            } else {
                article.updateOne({_id: req.params.id},
                {
                ...article,
                article:req.body.article,
                title:req.body.title,
                })
                .then(() => { res.status(200).json({message : 'Article modifié.'})})
                .catch(error => res.status(401).json({error : "Erreur lors de la mise à jour de l'article."}))
            }
        })
}

exports.deleteArticle = (req,res,next) => {
    Articles.findOne({_id: req.params.id})
        .then(article => {
            if(article.userId != req.auth.userId) {
                res.status(401).json({message : 'Non autorisé.'})
            } else {
                Thing.deleteOne({_id: req.params.id})
                    .then(() => { res.status(200).json({message : 'Article supprimé.'})})
                    .catch(error => res.status(401).json({error}))
            }
        })
        .catch( error => res.status(500).json({error}))
}