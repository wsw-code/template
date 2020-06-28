<template>
  <ul class="imagesUl">
    <li 
      v-for="(item,index) in value"
      :key="item"
      class="imagesLi"
      :class="item?'active':''"
      @click="viewImg(srcArr,index)"
    >
      <imageUpload
        :able="!onlyShow"
        :src="showImages(item)"
        :index="item?index:-1"
        :badge="!onlyShow"
        @getfile="getfile" 
        @upload="upload"
        @remove="remove"     
      >
        <div class="add">
          +
        </div>
      </imageUpload>
    </li>
    <li 
      v-if="!onlyShow"
      class="imagesLi"
    >
      <imageUpload 
        :able="able"
        @upload="upload" 
        @getfile="getfile"  
      >
        <div class="add">
          +
        </div>
      </imageUpload>
    </li>
  </ul>
</template>

<script>
  import imageUpload from '@/views/base/imageUpload'
  import {uploadImage} from "@/request/deyu"
  // import Mixin from '@/static/js/mixins'
  export default {
    name:'Images', 
    components: { 
      imageUpload
    }, 
    props:{ 
      value:{ 
        type:Array,
        default() { 
          return []
        }
      },
      onlyShow:{ 
      type:Boolean,
        default:false
      }
    },
    data(){
      return { 
        srcArr:[],
        able:true,
        badge:true
      }
    },  
    watch:{ 
      value() { 
        this.init();
      }
    },
    created() { 
      this.init();
    },
    methods: {
      init() { 
        this.srcArr = this.value;
        this.$watch('srcArr',()=>{ 
          this.emitValFn();
        })
      },
      viewImg(srcArr,index) { 
        this.$bus.$emit('zoom',{img:srcArr,index})
      },
      badgeFn(item) { 
        if(!this.able) return false
        return item?true:false;
      },
      remove(index) { 
        console.log(index);
        this.srcArr.splice(index,1);
      },
      padStart(num) {
        return num<10?'0'+num:num;
      },
      fixImageOrientation (file) {
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
      },
      getfile(obj) {
        window.vueEvents.$emit('open');
        this.fixImageOrientation(obj.file)
        .then((file)=>{ 
          var formData = new FormData();
          var dateObj = new Date();
          var month = dateObj.getMonth()+1;
          var date = dateObj.getDate();
          date = this.padStart(date);
          month = this.padStart(month);
          var type = file.type.replace(/image\//ig,'')
          console.log(type)
          formData.append("type", "dyglDfImg");
          formData.append("impl", "jsfzgl"); 
          formData.append("file", file);  
          formData.append("relativePath", `/${dateObj.getFullYear()}/${month}/${date}/`);       
          formData.append("filename",`${dateObj.getTime()}.${type}`);
          uploadImage(formData).then(data=>{ 
            if(data.code == '0') {
              if(obj.index) { 
                this.srcArr.splice(obj.index,1,data.data.path);
              } else { 
                this.srcArr.unshift(data.data.path);
              }
            } else { 
              this.vmsg('',data.msg);
            }
          })
        })

      },
      emitValFn() { 
        this.$emit('input',this.srcArr);
      },
      upload(obj) { 
        this.getfile(obj);
      },
      needShow(val) { 
        this.srcArr = val?val.split(','):[];
      }
    }
  }
</script>

<style lang='less'>
  .imagesUl { 
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
    .imagesLi { 
      width: 250px;
      height: 140px;
      background-color: #eee;
      margin-right: 40px;
      margin-bottom: 40px;
    }
    .active { 
      border-width: 0px;
    }
    .add { 
      text-align: center;
      line-height: 140px;
      font-size: 60px;
    }
  }
</style>