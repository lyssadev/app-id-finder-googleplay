const gplay = require('google-play-scraper');

const fetchSimilarApps = async (appName) => {
    try {
        const appList = await gplay.search({
            term: appName,
            num: 5,
            full: true,
        });

        return appList.map(app => ({
            id: app.appId,
            title: app.title,
            developer: app.developer,
            score: app.score,
            url: app.url,
        }));
    } catch (error) {
        console.error('Error fetching similar apps:', error);
        return [];
    }
};

module.exports = { fetchSimilarApps };