import moreIcon from '@/static/images/more.png';
import dormIcon from '@/static/images/ico_eva_dorm.png';
import classIcon from '@/static/images/ico_eva_class.png';

const defaultRightInfo = {rightTxt:'待评',rightTxtClass:''}
var getRightInfo = {};
getRightInfo[0] = function(fz) { //宿舍/班级列表页
  console.log(fz)
  if(fz>=0) { 
    return {rightTxt:fz,rightTxtClass:'red'}
  } else { 
    return defaultRightInfo
  }
}
getRightInfo[1] = function(fz) { //评分页
  if(fz>=0) { 
    return {rightTxt:fz==0?'正常':'+'+fz,rightTxtClass:'blue'};
  } else { 
    return {rightTxt:fz,rightTxtClass:'red'};
  }
}



export default {
  functional: true,
  props: {
    leftTxt: { 
      type: String,
      default:''
    },
    fn: {  //绑定方法
      type: Function,
      default: null
    },
    leftTp: { 
      type: String,
      default:''
    },
    fz:{ 
      type: [Number,String],
      default: -1
    },
    fzStatus: { 
      type:Boolean,
      default: false
    },
    type:{ 
      type: Number,
      default: 0
    },
    pjtype: { 
      type: Number,
      default: 0      
    }
  },
  render: function (createElement,ctx) {
    var {fn,leftTxt,leftTp,fz,type,fzStatus,pjtype} = ctx.props;
    var _leftTp
    if(leftTp) { 
      _leftTp = leftTp
    } else { 
      pjtype?(_leftTp = classIcon):(_leftTp = dormIcon)
    }
    
    if(fzStatus) { 
      var {rightTxt,rightTxtClass} = getRightInfo[type](fz);
    } else { 
      var {rightTxt,rightTxtClass} = defaultRightInfo;
    }
    
    var _obj = { 
      attrs: { 
        class: 'uli'
      },
    }
    if(fn) { 
      _obj.on = {click:fn}
    }
    return createElement('div', _obj,[
      createElement('div',{ 
        attrs: { 
          class: 'leftPart',
        }
      },[
        createElement('img',{ 
          attrs: { 
            class: 'leftIcon',
            src:_leftTp 
          },
        }),
        createElement('div',{ 
          attrs: { 
            class: 'leftTxt',
          },
          domProps: { 
            innerHTML: leftTxt
          }
        }),        
      ]),
      createElement('div',{ 
        attrs: { 
          class: 'rightPart',
        }
      },[
        createElement('div',{ 
          attrs: { 
            class: `rightTxt ${rightTxtClass}`,
          },
          domProps: { 
            innerHTML: rightTxt
          }
        }),
        createElement('img',{ 
          attrs: { 
            class: 'more',
            src:moreIcon 
          },
        }),        
      ])      
    ])
  }
};
