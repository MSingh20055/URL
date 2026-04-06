const express = require("express")

const router = express.Router();

const { handleGenerateShortURL, handleRedirect, handleGetAnalytics } = require("../controllers/url")

router.post("/", handleGenerateShortURL);
router.get('/:shortId', handleRedirect);
router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;
