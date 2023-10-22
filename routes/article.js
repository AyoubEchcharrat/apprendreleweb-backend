const express = require ("express")
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const router = express.Router()

const stuffController = require('../controllers/article')

router.post('/', auth, multer, stuffController.createArticle)
router.get('/:id', stuffController.getOneArticle)
router.get('/', stuffController.getAllArticles)
router.delete('/:id', auth, stuffController.deleteArticle)
router.put('/:id', auth, multer, stuffController.modifyArticle)

module.exports = router