const [,, ...args] = process.argv;
const {CATEGORIES} = require('./vnexpress/const');
const vnexpress = require('./');


(function(){
  if(args.length === 1){
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
      switch(args[0]){
        case CATEGORIES.DOI_SONG:
          return vnexpress(CATEGORIES.DOI_SONG);
        case CATEGORIES.DU_LICH:
          return vnexpress(CATEGORIES.DU_LICH);
        case CATEGORIES.GIAI_TRI:
          return vnexpress(CATEGORIES.GIAI_TRI);
        case CATEGORIES.GIAO_DUC:
          return vnexpress(CATEGORIES.GIAO_DUC);
        case CATEGORIES.KHOA_HOC:
          return vnexpress(CATEGORIES.KHOA_HOC);
        case CATEGORIES.KINH_DOANH:
          return vnexpress(CATEGORIES.KINH_DOANH);
        case CATEGORIES.PHAP_LUAT:
          return vnexpress(CATEGORIES.PHAP_LUAT);
        case CATEGORIES.SUC_KHOE:
            return vnexpress(CATEGORIES.SUC_KHOE);
        case CATEGORIES.THE_GIOI:
            return vnexpress(CATEGORIES.THE_GIOI);
        case CATEGORIES.THE_THAO:
          return vnexpress(CATEGORIES.THE_THAO);
        case CATEGORIES.THOI_SU:
            return vnexpress(CATEGORIES.THOI_SU);
        default:
          console.log('Option is not support!');
      }
    }
  }else{
    console.log('Command is not support!');
  }
})();