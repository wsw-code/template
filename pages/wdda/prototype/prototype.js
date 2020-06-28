import Vue from 'vue'; // 扩展Vue原型
import { MessageBox } from 'mint-ui'
import util from 'util'
let txSrc = '';
Vue.prototype.showTx = function(random){
  if(random) { 
    txSrc = `${NODE_BASEURL}/showImg.do?type=tx&userid=${NODE_USERID}&random=${random}`
    return txSrc
  };
  if(txSrc) { 
    return txSrc;
  }

  return  `${NODE_BASEURL}/showImg.do?type=tx&userid=${NODE_USERID}&random=${random}`
  
}
Vue.prototype.$bus = new Vue();
Vue.prototype.util = util;
Vue.prototype.showImages = function(imgId){ 
  if(!imgId) return 
  return `${NODE_BASEURL}/showImg.do?type=img&userid=${NODE_USERID}&xxh=${sessionStorage.getItem("xxh")}&imgid=${imgId}`  
}

Vue.prototype.vmsg = MessageBox;
Vue.prototype.showBtn = () => {
  return process.env.NODE_ENV === 'development'
}
Vue.prototype.callback = ({data:data,fn:fn})=>{ 
  if(data.result.code == '0') { 
    fn()
  } else { 
    MessageBox('',data.result.msg)
  }  
}

Vue.prototype.showDate = function(val){
    if(!val) return
    return val.split(' ')[0];
}

Vue.prototype.showBtn = function(){
  var ua = window.navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i) == 'micromessenger'){
    return true;
  }else{
    return false;
  }  
}

Vue.prototype.fixImageOrientation = function(file) { 
  if(!file) return
  return new Promise((resolve, reject) => {
    // 获取图片
    const img = new Image();
    img.src = window.URL.createObjectURL(file);
    img.onerror = () => resolve(file);
    img.onload = () => {
      // 获取图片元数据（EXIF 变量是引入的 exif-js 库暴露的全局变量）
      EXIF.getData(img, function() {
        // 获取图片旋转标志位
        var orientation = EXIF.getTag(this, "Orientation");
        // 根据旋转角度，在画布上对图片进行旋转
        if (orientation === 3 || orientation === 6 || orientation === 8) {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          switch (orientation) {
            case 3: // 旋转180°
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.rotate((180 * Math.PI) / 180);
              ctx.drawImage(img, -img.width, -img.height, img.width, img.height);
              break;
            case 6: // 旋转90°
              canvas.width = img.height;
              canvas.height = img.width;
              ctx.rotate((90 * Math.PI) / 180);
              ctx.drawImage(img, 0, -img.height, img.width, img.height);
              break;
            case 8: // 旋转-90°
              canvas.width = img.height;
              canvas.height = img.width;
              ctx.rotate((-90 * Math.PI) / 180);
              ctx.drawImage(img, -img.width, 0, img.width, img.height);
              break;
          }
          // 返回新图片
          console.log(file.size);
          var _radio = Math.round(file.size/(1024*1024))
          var _quality = 1;
          if(_radio == 1)  {
            _quality = 0.7
          } else if(_radio == 2) { 
            _quality = 0.5
          } else if(_radio == 3) { 
            _quality = 0.35
          } else if(_radio >=4) { 
            _quality = 0.25
          }
          canvas.toBlob(file => resolve(file), 'image/jpeg', _quality)
        } else {
          return resolve(file);
        }
      });
    };
  });  
}