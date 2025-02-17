const express = require ('express')
const router = express.Router()

const {homePage,aboutPage} = require ('../controller/pageController')

router.get('/home',homePage)
router.get('/about',aboutPage)

module.exports = router;