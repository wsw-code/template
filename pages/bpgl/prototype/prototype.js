import Vue from 'vue'; // 扩展Vue原型
import banner from '@/static/images/banner.png'
import {Toast,MessageBox} from 'mint-ui';
var ToastInsance = null;
Vue.prototype.showImg = function(path,type='lbtp') { 
  var imgUrl = NODE_BASEINFO.apiUrl;
  if(imgUrl && imgUrl[imgUrl.length - 1] == '/') { 
    imgUrl = imgUrl.substr(0,imgUrl.length - 1);
  }
  console.log(path)
  if(path && path.indexOf('http')>=0) { 
    return path
  } else { 
    return path?`${imgUrl}/showImg.do?type=${type}&imgid=${path}`:banner;
  }
  
}

Vue.prototype.vmsg = MessageBox

Vue.prototype.$toast = function(msg) { 
  ToastInsance && ToastInsance.close();
  ToastInsance = Toast({
    message: msg,
    duration: 1500
  }); 
}

Vue.prototype.padStart = function(str) { 
  var _str = '0'+str;
  _str = _str.substr(-2);
  return _str
}

Vue.prototype.fixImageOrientation = function(file) {
  if (!file) return
  return new Promise((resolve, reject) => {
      // 获取图片
      const img = new Image();
      var _radio = Math.round(file.size / (1024 * 1024))
      var _quality = 1;
      if (_radio == 1) {
        _quality = 0.7
      } else if (_radio == 2) {
        _quality = 0.5
      } else if (_radio == 3) {
        _quality = 0.35
      } else if (_radio >= 4) {
        _quality = 0.25
      }
      img.src = window.URL.createObjectURL(file);
      img.onerror = () => resolve(file);
      img.onload = () => {
        // 获取图片元数据（EXIF 变量是引入的 exif-js 库暴露的全局变量）
        EXIF.getData(img, function() {
          // 获取图片旋转标志位
          var orientation = EXIF.getTag(this, "Orientation");
          // 根据旋转角度，在画布上对图片进行旋转
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (orientation === 3 || orientation === 6 || orientation === 8) {

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
            canvas.toBlob(file => resolve(file), 'image/jpeg', _quality)
          } else {
            console.log(_quality)
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            canvas.toBlob(file => resolve(file), 'image/jpeg', _quality)
            // resolve(file)
          }
        });
      };
  });
},

Vue.prototype.$bus = new Vue();