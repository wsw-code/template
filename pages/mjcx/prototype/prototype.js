import Vue from 'vue'; // 扩展Vue原型
import { Toast } from 'mint-ui';

Vue.prototype.$toast = function(msg){
  Toast(msg)
}
Vue.prototype.GetQueryString = function (key) { //获取地址栏参数
  // 获取参数
  var url = window.location.search;
  // 正则筛选地址栏
  var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
  // 匹配目标参数
  var result = url.substr(1).match(reg);
  //返回参数值
  return result ? decodeURIComponent(result[2]) : null;
  }

  Vue.prototype.tsDate = function() { 
    return Vue.prototype.GetQueryString("rq");
  }