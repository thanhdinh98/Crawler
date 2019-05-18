const fetch = require('node-fetch');
const {JSDOM} = require('jsdom');

module.exports.fetchPage = async (url)=>{
  const options = {
    mode: 'cors',
    method: 'get'
  };
  try{
    const response = await fetch(url, options);
    return response.text(); 
  }catch(err){
    throw err;
  }
}

module.exports.selectNodes = (data)=>{
  return (type, selector)=>{
    const {document} = (new JSDOM(data)).window;
    
    switch(type){
      case 'all':{
        return document.querySelectorAll(selector);
      }
      case 'one':{
        return document.querySelector(selector);
      }
      default:
        return [];
    } 
  }
}

module.exports.getLink2Detail = (node)=>{
  return node.children[0].children[0].getAttribute('href');
}

module.exports.formatNews = ({title, description, contents, image})=>{
  let fullContent = '';
  for(let content of contents){
    if(content !== null)
      fullContent += content.innerHTML + '\n';
  }

  return {
    title: title === null ? '' : title.innerHTML,
    description: description === null ? '' : description.innerHTML,
    image: image === null ? '' : image.getAttribute('src'),
    fullContent
  };
}