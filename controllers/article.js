const Articles = require('../models/article')

exports.createArticle = (req, res, next) => {
    const article = new Articles({
        content: req.body.content,
        title: req.body.title,
        introduction: req.body.introduction,
        userId: req.auth.userId,
        tags: req.body.tags,
        imageurl: req.body.imageurl,
        date: req.body.date
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
    const object = { ...req.body };
    delete object._userId;
    Articles.findOne({_id : req.params.id})
        .then((article) => {
            if(article.userId != req.auth.userId) {
                res.status(401).json({message : "Vous n'êtes pas l'auteur de l'article."})
            } else {
                Articles.updateOne({_id: req.params.id},
                {
                ...object,
                _id: req.params.id
                })
                .then(() => { res.status(200).json({message : 'Article modifié.'})})
                .catch(error => res.status(401).json({error : error}))
            }
        })
        .catch((error) => res.status(400).json({ error }));
}

exports.deleteArticle = (req,res,next) => {
    Articles.findOne({_id: req.params.id})
        .then(article => {
            if(article.userId != req.auth.userId) {
                res.status(401).json({message : 'Non autorisé.'})
            } else {
                Articles.deleteOne({_id: req.params.id})
                    .then(() => { res.status(200).json({message : 'Article supprimé.'})})
                    .catch(error => res.status(401).json({error}))
            }
        })
        .catch( (error) => res.status(501).json({error}))
}