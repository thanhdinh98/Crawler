const vnexpress = require('./vnexpress');

module.exports = async (category, pageLimit) => {
  const listNews = [];
  try{
    const urls = await vnexpress.getUrls2News(category, pageLimit);
    for(let url of urls){
      const news = await vnexpress.getNews(url);
      listNews.push(news);
    }
    vnexpress.saveNews(category, listNews);
  }catch(err){
    throw err;
  }
}