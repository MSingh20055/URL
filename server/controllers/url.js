const shortid = require('shortid');
const URL = require('../models/url')

const handleGenerateShortURL = async(req, res) => {
    const body = req.body;
    if(!body.url) return res.status(400).json({ error: "url is required"})
    console.log(body.url);
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    })
    return res.json({ id: shortID });
}

const handleRedirect = async (req, res) => {
    const shortId = req.params.shortId;
    console.log(shortId);
    try{
        const entry = await URL.findOneAndUpdate( //need to understand this part
            {
                shortId,
            },
            {
                $push: {
                    visitHistory: {timestamp: Date.now()},
                },
            }
        );
        // console.log(entry.redirectURL);
        return res.redirect(entry.redirectURL);
    }
    catch(err){
        res.status(400).json( {
            msg: "ID not found",
            error: err.message
        } )
    }
}
const handleGetAnalytics = async (req, res) => {
    const shortId  = req.params.shortId;
    let result
    try{
        result = await URL.findOne({ shortId })
    }
    catch(err){
        res.status(404).json({msg: "ID Not Found"});
    }
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    })
}

module.exports = {
    handleGenerateShortURL,
    handleRedirect,
    handleGetAnalytics,
}