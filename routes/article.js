const express = require ("express")
const auth = require('../middleware/auth')

const router = express.Router()

const stuffController = require('../controllers/article')

router.post('/', auth, stuffController.createArticle)
router.get('/:id', stuffController.getOneArticle)
router.get('/', stuffController.getAllArticles)
router.delete('/:id', auth, stuffController.deleteArticle)
router.put('/:id', auth,stuffController.modifyArticle)

module.exports = router