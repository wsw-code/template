<template>
  <div class="imageUpload">
    <input  
      v-show="!imgSrc"
      ref="uploadDom" 
      type="file"
      class="fmupload"
      accept="image/*" 
      :disabled="!able"
      @change="getfile"
    > 
    <div
      v-show="!imgSrc" 
      class="showFm" 
    >
      <slot></slot>    
    </div>
    <div 
      v-show="imgSrc && isInnerShow"
      class="imgBox" 
      :style="`backgroundImage:url(${imgSrc})`"
    >
      <span 
        v-show="badge && imgSrc" 
        class="badge needclick"
        @click.stop="remove()"
      >
        X
      </span>
    </div>       
    <!-- <img 
      v-show="type != `qzfm`"
      :src="imgSrc" 
      alt=""
      class="zhanwei"
    > -->
    <mt-actionsheet
      v-model="sheetVisible"
      :actions="actionsData"
    >
    </mt-actionsheet>         
  </div>
</template>

<script>

import {Actionsheet} from "mint-ui";
 export default {
   components: {
       'mt-actionsheet':Actionsheet
   },     
   props: { 
      src: { 
        type:String,
        default:'',
      },
      badge: { 
        type:Boolean,
        default:false
      },
      impl: {
        type:String, 
        default:'sqgl' //默认社区管理
      },
      type: { 
        type:String,
        default: ''
      },
      isBtn: { 
        type:Boolean,
        default: false
      },
      index: { 
        type:Number,
        default: -1
      },
      isInnerShow: { 
        type:Boolean,
        default: true
      },
      able: { 
        type:Boolean,
        default: false        
      }
   }, 
   data () {
     return {
      imgSrc:'',
      dataType:'json_text', //接口默认返回
      sheetVisible: false,
      file:'',
      actionsData: [ 
        {
          name:'选择照片',
          method:()=>{ 
              this.xzp();
          }                   
        },
        {
          name:'拍照',
          method:()=>{ 
              this.open();
          }                   
        }                                
      ],         
     }
   },
    computed: { 
      isiOS() { 
        var ua = navigator.userAgent;
        return !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      }
    },   
    watch: { 
      src() { 
          this.imgSrc = this.src;
      }
    },
    created() { 
      console.log(this.able);
      this.imgSrc = this.src;
    },

   methods: { 
    getfile($event) { 
      var file = $event.target.files[0];
      this.$emit('getfile',this.getuploadObj(file));   
    },       
    open() { 
      this.getImgFn();
      if(this.isiOS) { 
        iOSCamera();
      } else { 
        window.AndroidWebView.getCamera();
      }
    },
    xzp() { 
      if(this.isiOS) { 
        iOSPhotosAlbum();
      } else { 
        window.AndroidWebView.getAlbum();
      }
    },
    getImgFn(src) { 
      if(!src) { 
        return
      }
      this.file = src;
      this.upload();
    },
    getuploadObj(file) { 
      var obj = {file: file || this.file};
      this.index >=0 && (obj.index = this.index); 
      return obj
    },
    upload() { 
      this.$emit('upload',this.getuploadObj())
    },
    remove() { 
      this.$emit('remove',this.index);
    }       
   }
 }
</script>

<style  lang='less'>
    .imageUpload { 
        width: 100%;
        height: 100%;     
        position: relative; 
        .mint-actionsheet-list { 
            width: 100%;
        }

        .zhanwei { 
            width: 100%;
            height: auto;
            opacity: 0;
        }  
        img { 
            width: 100%;
            height: 100%;
        }
        .imgBox { 
            width: 100%;
            height: 100%;   
            position: absolute;     
            top: 0;
            left:0;
            z-index: 10; 
            background-size:cover;
            background-repeat:no-repeat;
            background-position: center center;
            .wswimgShow { 
                width: auto;
                height: auto;
                max-width: 100%;
                max-height: 100%;
                display: block;
                margin: 0 auto;
            }   
        }
        .fmupload { 
            width: 100%;
            height: 100%;
            opacity: 0;
            position: absolute;
            top:0;
            left:0;
            z-index: 15;
        }

        .showFm { 
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 1;
        }
        .badge { 
            width: 50px;
            height: 50px;
            background-color: #999;
            color: #fff;
            border-radius: 50%;
            position: absolute;
            right: -25px;
            top: -25px;
            z-index: 20;
            line-height: 50px;
            text-align: center;
        }
    }
 
</style>
