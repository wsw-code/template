<template>
  <div id="fcpublish">
    <ul>
      <li class="publishCell">
        <span class="key">标题</span>
        <input
          v-model="title" 
          type="text" 
          placeholder="请输入标题(20字以内)"
        >
      </li>
      <li class="fcpublishCell areaCell">
        <span class="key">封面图</span>
        <div 
          class="uploadTp"
          :class="curpath?'':'uploadTpAdd'"
          :style="curpath?`background-image:url(${showImg(curpath)})`:''"
        >
          <input 
            type="file"
            @change="getfile($event,'bjfc_cover')"
          >
        </div>
      </li>
      <li class="fcpublishCell areaCell">
        <span class="key">内容</span>
        <textarea 
          v-model="content"
          class="textarea"
          placeholder="请输入内容"
        ></textarea>
        <div 
          class="uploadTp"
          :class="curconpath?'':'uploadTpAdd'"
          :style="curconpath?`background-image:url(${showImg(curconpath)})`:''"
        >
          <input 
            type="file"
            @change="getfile($event,'bjfc_content')"
          >
          <div 
            v-show="curconpath"
            class="icon"
            @click="del"
          ></div>
        </div>
      </li>            
    </ul>
    <div class="btnWrapper">
      <button @click="save">保 存</button>
    </div>
  </div>
</template>

<script>

  import {uploadImage,saveBjfc} from '@/request/bpgl.js';
  export default {
    name:'Publish',
    components:{

    },
    props:{ 
      ggdata:{
        type:Object,
        default() { 
          return {}
        }
      }
    },
    data(){
      return { 
        title:'',
        content:'',
        curpath:'',
        curconpath:''
      }
    },
    computed:{
      getStartTime() { 
        if(this.startTime) { 
          return this.getTimeFormat(this.startTime) 
        } else {
          return ''
        }
      },
      getEndTime() { 
        if(this.endTime) { 
          return this.getTimeFormat(this.endTime) 
        } else {
          return ''
        }        
      }
    },
    watch:{ 
      title() { 
        this.title = this.title.substr(0,20); 
      }
    },
    mounted() { 

    },
    methods:{
      del() { 
        this.curconpath = '';
      },
      save() { 
        if(!this.title) { 
          this.$toast('请输入标题')
          return 
        }
        if(!this.content) { 
          this.$toast('请输入内容')
          return 
        }
        if(!this.curpath) { 
          this.$toast('请上传封面')
          return
        }
        var content = '';
        content = `<p>${this.content}</p>`
        if(this.curconpath) { 
          content+=`<img src=${this.showImg(this.curconpath)} />`
        } 
        saveBjfc([
          {
            id:'',
            title:this.title,
            content,
            cover:this.curpath
          },
          [this.$route.query.macdz]
        ])
        .then(()=>{ 
          window.history.go(-1);
          this.$emit('update');
        })
      },
      getfile(e,type) { 
        var file = e.target.files[0];
				this.fixImageOrientation(file)
        .then((file) => {
          var formData = new FormData();
          console.log(file)
          formData.append("impl", "dzbp");
          formData.append("file", file);
          formData.append("ext", ".jpeg");
          formData.append("dataType", "json_text");
          formData.append("type", type);
          uploadImage(formData).then(data => {
            if(data.success) { 
              if(type == 'bjfc_cover') { 
                this.curpath = data.path;
              } else { 
                this.curconpath = data.path;
              }
              
            }
          })
        })
        .catch(() => {
        })           
      }
    }
  }
</script>

<style lang='less'>
  #fcpublish { 
    position: absolute;
    z-index: 99;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    top:0;
    left:0;
    background-color: #fff;
    .icon { 
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: url('~@/static/images/del.png') 0 0 no-repeat;
      background-size: 60px 60px;
      position: absolute;
      right: -30px;
      top: -30px;
    }
    .btnWrapper { 
      padding: 30px;
      width:100%;
      position: absolute;
      bottom:0;
      left:0;
      z-index: 88;
      button { 
        width: 100%;
        height: 90px;
        background:linear-gradient(90deg,rgba(56,140,255,1) 0%,rgba(11,197,254,1) 100%);
        border-radius:45px;
        color:#fff;
        text-align: center;
        line-height: 90px;
        font-size: 36px;
      }
    }
  }
  .fcpublishCell { 
    display: flex;
    align-items: center;
    min-height: 100px;
    padding: 0 30px;
    &.areaCell { 
      flex-direction: column;
      align-items: flex-start;
      padding: 30px;
    }
    .bd(#ddd,'bottom');
    input { 
      padding-left: 40px;
    }
    .textarea { 
      width: 100%;
      height: 200px;
      margin-top: 30px;
    }
    .key {
      color:#333;
      font-size: 28px;
    }
  }

  .uploadTp { 
    width:250px;
    height: 140px;
    background-color: #eee;
    margin-top: 30px;
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    input { 
      opacity: 0;
      width:100%;
      height: 100%;
    }
    &.uploadTpAdd { 
      &::before { 
        content: '';
        position: absolute;
        width:40px;
        height: 4px;
        background-color: #ccc;
        top:0;
        left:0;
        right: 0;
        bottom:0;
        margin:auto;
      }
      &::after { 
        content: '';
        position: absolute;
        width:40px;
        height: 4px;
        background-color: #ccc;
        top:0;
        left:0;
        right: 0;
        bottom:0;
        margin:auto;
        transform: rotate(90deg)
      }      
    }
  }

</style>