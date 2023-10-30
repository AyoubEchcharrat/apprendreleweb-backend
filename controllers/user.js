const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password,10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password : hash,
        })
        user.save()
            .then(() => res.status(201).json({message: 'Utilisateur créé.'}))
            .catch(error => res.status(400).json({error}))
    })
    .catch(error => res.status(500).json({error}))
}

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(!user) {
                return res.status(401).json({message: 'Email non enregistré'})
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if(!valid) {
                            return res.status(401).json({message: 'Paire email/mdp incorrecte.'})
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                email:req.body.email,
                                userToken: jwt.sign(
                                    {userId : user._id},
                                    'TOKEN_SECRET_ATTENTION',
                                    {expiresIn: '24h'}
                                )
                            })
                        }
                    })
                    .catch(error => res.status(500).json({error}))
            }
        })
        .catch(error => res.status(500).json({error}))
}

exports.checkSession = (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Récupérez le token depuis l'en-tête de la requête
  
    if (!token) {
      return res.status(401).json({ message: 'Session expired' }); // Si aucun token n'est fourni, la session est expirée
    }
  
    try {
      jwt.verify(token, 'TOKEN_SECRET_ATTENTION');
      res.status(200).json({ message: 'Session confirmed' }); // Token valide, la session est confirmée
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        res.status(401).json({ message: 'Session expired' }); // Token expiré, la session est expirée
      } else {
        res.status(401).json({ message: 'Session expired' }); // Autres erreurs, considérées comme une expiration de session
      }
    }
  };