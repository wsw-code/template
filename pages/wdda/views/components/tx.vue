<template>
  <div 
    class="tx"
    :style="getSrc"
  >
    <div class="txWrapper">
      <imageUpload
        :able="able"
        @getfile="getfile"
        @upload="upload"
      >
      </imageUpload>
    </div>
  </div>
</template>
<script>
import imageUpload from '@/views/base/imageUpload'
import {uploadTx,appUploadTx} from "@/request/wdda"
import Mixin from '@/static/js/mixins'
export default {
  name: 'Tx',
  components: { 
    imageUpload
  },  
  mixins:[Mixin],
  props: { 
  },
  data(){ 
    return { 
      src:'',
    }
  },
  computed: { 
    type() { //APP or 微信端
      return 'WX'
    },
    getSrc() { 
      return this.src?`background-image:url(${this.src})`:''
    }
  },
  created() { 
    this.src = this.showTx(new Date().getTime());
  },
  mounted() { 
    window.vueEvents.$on('changTx',(src)=>{
      this.src = src;
    })
  },  
  methods: { 
    getfile(obj) {
      this.fixImageOrientation(obj.file)
      .then(file=>{ 
        var formData = new FormData();
        formData.append("type", "tx");
        formData.append("impl", "jsfzgl"); 
        formData.append("userid", NODE_USERID);       
        formData.append("file", file);  
        uploadTx(formData).then(data=>{ 
          if(data.code == '0') {
            this.val = NODE_USERID;
            let _src = this.showTx(Math.random());
            window.vueEvents.$emit('changTx',_src);
            this.$emit('input',this.val);
          } else { 
            this.vmsg('',data.msg);
          }
        })
      })

    },
    upload(obj) { 
      this.getfile(obj)
    },
    needShow() { 
      this.src = this.showTx();
      this.$emit('input',NODE_USERID);
    }
  },

}
</script>
<style lang='less'>
.tx { 
  background-size: cover;
  border-radius: 50%; 
  .txWrapper { 
    border-radius: 4px;
    width: 100%;
    height: 100%;
  }
  .addIcon { 
      width: 100%;
      height: 100%;
      background-color: #fff;
      font-size: 60px;
      color: #999;
      text-align: center;
      line-height: 140px;
      border: 1Px solid #ccc;
      border-radius: 3px;
  }  
}
</style>
