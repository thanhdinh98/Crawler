const vnexpress = require('./vnexpress');
const ora = require('ora');


module.exports = async (category) => {
  const listNews = [];
  try{
    const spinner = ora().start('Fetching');
    const urls = await vnexpress.getUrls2News(category);
    for(let url of urls){
      const news = await vnexpress.getNews(url);
      listNews.push(news);
    }
    vnexpress.saveNews(category, listNews);
    spinner.succeed('Fetch successed.');
  }catch(err){
    spinner.fail('Fetch failed!')
    throw err;
  }
}