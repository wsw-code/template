<template>
  <ul class="imagesUl">
    <li 
      v-for="(item,index) in srcArr"
      :key="item"
      class="imagesLi"
      :class="item?'active':''"
      @click="viewImg(srcArr,index)"
    >
      <imageUpload
        :able="able"
        :src="showImages(item)"
        :index="item?index:-1"
        :badge="badgeFn(item)"
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
      v-show="able"
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
  import {uploadImage} from "@/request/wdda"
  import Mixin from '@/static/js/mixins'
  export default {
    name:'Images', 
    components: { 
      imageUpload
    }, 
    mixins:[Mixin],  
    data(){
      return { 
        srcArr:[],
        badge:true
      }
    },
    watch: { 
      srcArr() { 
        this.emitValFn();
      }
    },    
    created() { 
    },
    methods: {
      viewImg(srcArr,index) { 
        this.$bus.$emit('zoom',{img:srcArr,index})
      },
      getImgId() {
        var imgId = Date.parse(new Date()) + "";
        return imgId.substring(0, 10);
      },
      badgeFn(item) { 
        if(!this.able) return false
        return item?true:false;
      },
      remove(index) { 
        console.log(index);
        this.srcArr.splice(index,1);
      },
      getfile(obj) {
        this.fixImageOrientation(obj.file)
        .then(file=>{ 
          var formData = new FormData();
          formData.append("xxh",sessionStorage.getItem("xxh"))
          formData.append("type", "img");
          formData.append("impl", "jsfzgl"); 
          formData.append("userid", NODE_USERID);       
          formData.append("file", file);  
          formData.append("imgId",this.getImgId())
          uploadImage(formData).then(data=>{ 
            console.log(obj)
            if(data.code == '0') {
              if(obj.index) { 
                this.srcArr.splice(obj.index,1,data.imgId);
              } else { 
                this.srcArr.unshift(data.imgId);
              }
            } else { 
              this.vmsg('',data.msg);
            }
          })
        })
      },
      emitValFn() { 
        var _arr = [...this.srcArr];
        this.val = _arr.join(',');
        this.$emit('input',this.val);
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