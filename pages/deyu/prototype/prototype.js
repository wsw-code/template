import Vue from 'vue'; // 扩展Vue原型
import { MessageBox } from 'mint-ui'
import util from 'util'

import Toast from '@/views/base/toast/toast.js';


Vue.prototype.$msg = function(options) { 
  Toast.info(options)
}

let ImgUrl = '';
function getImgUrl() { 
  if(!ImgUrl) { 
    ImgUrl = NODE_BASEURL.replace(/xyzhgl/ig,'');
    getImgUrl = ()=>{ 
      return ImgUrl;
    }
    return ImgUrl;
  } 
}
Vue.prototype.vueBus = new Vue();
Vue.prototype.util = util;
Vue.prototype.vmsg = MessageBox;
Vue.prototype.showImg = function(tpmc){ 
  return getImgUrl() + tpmc;
}
Vue.prototype.showRyImg = function(name){ 
  return `${NODE_BASEURL}/showImg.do?myfilename=${name}&type=ryglData`
} 

Vue.prototype.settitle = function(name){ 
  util.tosettitle(name);
  document.title = name; 
}

Vue.prototype.showBtn = ()=>{ 
  return process.env.NODE_ENV == 'development'?true:false
};

Vue.prototype.setHeadButton = function(name,fn){ 
  if(typeof name == 'boolean') { 
    util.setHeadButton(' ','phoneFn()',false); 
    return
  }
  phoneFn = fn; 
  util.setHeadButton(name,'phoneFn()',true);
};

Vue.prototype.showImages = function(path) { 
  return NODE_BASEURL+'/showImg.do?type=dyglDfImg&path='+path;
}

Vue.prototype.GetQueryString = function(name){
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r!=null)return  unescape(r[2]); return null;
}

Vue.prototype.$bus = new Vue();