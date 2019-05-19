const {BASE_URL} = require('./const');
const path = require('path');
const fs = require('fs');
const ora = require('ora');
const {fetchPage, selectNodes, getLink2Detail, formatNews, getNextLink} = require('./helper');

const fsPromise = fs.promises;
let spinner = ora();

const getUrls2News = async (category, pageLimit = 1)=>{
  const urls = [];
  let next = null;

  try{
    for(let i = 0; i < pageLimit; ++i){
      spinner.start(`Extracting urls from page ${i + 1} of ${category}.`); 
      let data = null;
      
      if(i > 0){
        data = await fetchPage(`${BASE_URL}${getNextLink(next)}`);
      }else{
        data = await fetchPage(`${BASE_URL}/${category}`);
      }
      
      next = selectNodes(data)('one', '.next');
      const listNews = selectNodes(data)('all', '.sidebar_1 > .list_news');
      for (let news of listNews){
        urls.push(getLink2Detail(news));
      }
      spinner.succeed('Extract successed.');
    }

    return urls;
  }catch(err){
    spinner.fail('Extract failed!');
    throw err;
  }
}

const getNews = async (url)=>{
  try{
    spinner.start(`Getting informations from ${url}.`);

    const data = await fetchPage(url);
    const title = selectNodes(data)('one', '.title_news_detail');
    const description = selectNodes(data)('one', '.description');
    const contents = selectNodes(data)('all', '.content_detail > p');
    const image = selectNodes(data)('one', 'table img');

    spinner.succeed('Get informations successed.');

    return formatNews({
      title,
      description,
      contents,
      image
    });
  }catch(err){
    spinner.fail('Get informations failed!');
    throw err;
  }
}

const saveNews = (category, listNews)=>{
  spinner.start('Saving to file');

  const dir = path.join(__dirname, `../output/vnexpress/${category}`);
  if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  fsPromise.writeFile(
    dir + `/${category}.json`, 
    JSON.stringify(listNews, null, 4)
  )
  .then(()=>{
    spinner.succeed('Save successed.');
  })
  .catch(err => {
    spinner.succeed('Save failed!');
    throw err;
  });
}

module.exports = {
  getUrls2News,
  getNews,
  saveNews
}