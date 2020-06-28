import Vue from 'vue';
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; 
let elWidth = 0;
let elHeight = 0;
let limitWidth = 0;
let limitHeight = 0;
Vue.directive('drag',{ 
  inserted:function(el) { 
      let oDiv = el; //当前元素
      const {clientWidth,clientHeight} = document.body;
      if(!elWidth) { 
        elWidth = oDiv.clientWidth;
        elHeight = oDiv.clientHeight;
        limitWidth = clientWidth-elWidth-10;
        limitHeight = clientHeight-elHeight-10;
      }
      console.log(elWidth,limitWidth)
      oDiv.ontouchstart = function(e) {
        //鼠标按下，计算当前元素距离可视区的距离
        let disX = e.touches[0].clientX - oDiv.offsetLeft;
        let disY = e.touches[0].clientY - oDiv.offsetTop;
        oDiv.style.zIndex = 3;
        if(!isAndroid) { 
          e.preventDefault();
        }
        // e.preventDefault();
        oDiv.ontouchmove = function(e) {
          //通过事件委托，计算移动的距离
          e.preventDefault();
          let l = e.touches[0].clientX - disX;
          let t = e.touches[0].clientY - disY;
          if(l>limitWidth) { 
            l = limitWidth;
          }
          if(l<100) { 
            l = 100;
          }
          if(t>limitHeight) { 
            t = limitHeight
          }
          if(t<300) { 
            t = 300
          }
          oDiv.style.left = l+'px';
          oDiv.style.top = t+'px';   
          document.ontouchend = function() {
            oDiv.ontouchmove = null;
            oDiv.ontouchend = null;
          }
        };
      };
  }

})