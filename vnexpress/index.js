const {BASE_URL, CATEGORIES} = require('./const');
const path = require('path');
const fs = require('fs');
const {fetchPage, selectNodes, getLink2Detail, formatNews} = require('./helper');

const fsPromise = fs.promises;

const getUrls2News = async (category)=>{
  const urls = [];
  try{
    const data = await fetchPage(`${BASE_URL}/${category}`);

    const listNews = selectNodes(data)('all', '.sidebar_1 > .list_news');
    for(let news of listNews){
      urls.push(getLink2Detail(news));
    }
    return urls;
  }catch(err){
    throw err;
  }
}

const getNews = async (url)=>{
  try{
    const data = await fetchPage(url);
    const title = selectNodes(data)('one', '.title_news_detail');
    const description = selectNodes(data)('one', '.description');
    const contents = selectNodes(data)('all', '.content_detail > p');
    const image = selectNodes(data)('one', 'table img');
    return formatNews({
      title,
      description,
      contents,
      image
    });
  }catch(err){
    throw err;
  }
}

const saveNews = (category, listNews)=>{
  const dir = path.join(__dirname, `../output/vnexpress/${category}`);
  if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  fsPromise.writeFile(
    dir + `/${category}.json`, 
    JSON.stringify(listNews, null, 4)
  ).catch(err => {
    throw err;
  });
}

module.exports = {
  getUrls2News,
  getNews,
  saveNews
}