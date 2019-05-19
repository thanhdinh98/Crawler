const [,, ...args] = process.argv;
const {CATEGORIES} = require('./vnexpress/const');
const vnexpress = require('./');
const _ = require('lodash');

(function(){
  if(args.length > 0 && args.length < 3){
    if(args[0] === 'help' || args[0] === 'h'){
      console.log(`
        Options:
          doi-song
          du-lich
          giai-tri
          giao-duc
          khoa-hoc
          kinh-doanh
          phap-luat
          suc-khoe
          the-gioi
          the-thao
          thoi-su
      `);
    }else{
      let pageLimit = 0;

      if(args.length === 2){
        if(_.isNumber(Number(args[1])))
          pageLimit = Number(args[1]);
        else
          console.log('Page limit option is invaild!')
      }else{
        pageLimit = 1;
      }

      switch(args[0]){
        case CATEGORIES.DOI_SONG:
          return vnexpress(CATEGORIES.DOI_SONG, pageLimit);
        case CATEGORIES.DU_LICH:
          return vnexpress(CATEGORIES.DU_LICH, pageLimit);
        case CATEGORIES.GIAI_TRI:
          return vnexpress(CATEGORIES.GIAI_TRI, pageLimit);
        case CATEGORIES.GIAO_DUC:
          return vnexpress(CATEGORIES.GIAO_DUC, pageLimit);
        case CATEGORIES.KHOA_HOC:
          return vnexpress(CATEGORIES.KHOA_HOC, pageLimit);
        case CATEGORIES.KINH_DOANH:
          return vnexpress(CATEGORIES.KINH_DOANH, pageLimit);
        case CATEGORIES.PHAP_LUAT:
          return vnexpress(CATEGORIES.PHAP_LUAT, pageLimit);
        case CATEGORIES.SUC_KHOE:
            return vnexpress(CATEGORIES.SUC_KHOE, pageLimit);
        case CATEGORIES.THE_GIOI:
            return vnexpress(CATEGORIES.THE_GIOI, pageLimit);
        case CATEGORIES.THE_THAO:
          return vnexpress(CATEGORIES.THE_THAO, pageLimit);
        case CATEGORIES.THOI_SU:
            return vnexpress(CATEGORIES.THOI_SU, pageLimit);
        default:
          console.log('Option is not support!');
      }
    }
  }else{
    console.log('Command is not support!');
  }
})();