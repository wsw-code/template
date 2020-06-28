<template>
  <div id="xc">
    <div class="xcWrapper">
      <scroll
        ref="scroll"
        :pull-down-refresh="true"
        :data="pclist"
        @pullingUp="loadmore"
      >
        <ul 
          slot="sroll"
          class="pcUl"
        >
          <li
            v-for="(item,index) in pclist"
            :key="index"
            v-lazy:background-image="showImg(item.fjdz)"
            class="pcCell"
            @touchstart="start($event,item)"
            @touchmove="move($event)"
            @touchend="end($event)"
            @click="openSee(item.fjdz)"
          ></li>
        </ul>
      </scroll>
    </div>
    <div 
      class="xcBtn"
    >
      <div class="btn">
        上 传
        <input
          type="file"
          @change="upload($event)"
        >
      </div>
    </div>
    <Popup
      v-model="visable"
    >
      <div class="uploadBox">
        <div class="inputBox">
          <input 
            v-model="tittle"
            type="text"
            placeholder="请输入标题"
          >
          <p 
            v-show="isTitle"
            class="tip"
          >
            请输入标题
          </p>
        </div>
        <div 
          class="add"
          :class="curpath?'':'addIcon'"
          :style="curpath?`background-image:url(${showImg(curpath)})`:''"
        >
          <input 
            type="file" 
            @change="upload($event)"
          >
        </div>
        <ul class="btnList">
          <li 
            @click="changeVisable(false)"
          >
            取消
          </li>
          <li @click="uploadFunc">
            上传
          </li>
        </ul>
      </div>
    </Popup>
  </div>
</template>

<script>
  import {Popup,MessageBox} from 'mint-ui';
  import {queryAlbumList,uploadImage,saveAlbum,deleteAlbum} from '@/request/bpgl.js';
  import Scroll from '@/views/base/yscroll.vue'
  export default {
    components:{ 
      Popup,
      Scroll
    },
    data(){
      return { 
        page:1,
        rows:30,
        total:0,
        tittle:'',
        pclist:[],
        curpath:'',
        isTitle:false,
        visable:false
      }
    },
    created() { 
      this.init()
    },
    methods:{ 
      start(e,item) {
        this.x = 0,
        this.y = 0,
        this.islongTap = false,
        this.timer = null;
        if (e.touches.length > 1) {
            return false;
        }
        this.timer = setTimeout(()=> {
            this.islongTap = true;
          this.x = 0,
          this.y = 0,
          this.islongTap = false;
          this.confirmDel(item)
        }, 1000);
        this.x = e.touches[0].clientX;
        this.y = e.touches[0].clientY;
      },
      move(e) { 
        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;
        if(Math.abs(this.x-x)>10 ||  Math.abs(this.y-y)>10) { 
          this.islongTap = false;
          clearTimeout(this.timer);
        }
      },
      end() {
        this.timer && clearTimeout(this.timer);
      },
      confirmDel(item) { 
        MessageBox.confirm(`确定删除该照片?`,'').then(() => {
          deleteAlbum([[item.id]])
          .then(()=>{ 
            this.$toast('操作成功')
            this.page =1;
            this.$refs.scroll.resetFn();
            this.init(this.clearData)
          })
        });        
      },
      clearData() { 
        this.pclist = [];
      },
      loadmore() { 
        this.page++;
        this.init();
      },
      openSee(path) { 
        var obj = {};
        obj.img = path;
        obj.index = 0;
        this.$bus.$emit('zoom',obj);
      },
      init(fn) { //请求相册
        queryAlbumList([{"xclx": "2","type": "4","page": this.page,"rows": this.rows,macdz:this.$route.query.macdz}])
        .then(data=>{ 
          this.total = data.total;
          fn && fn(); 
          this.pclist = [...this.pclist,...data.rows];
          this.$refs.scroll.finishPullUp();
          if(this.pclist.length == this.total) { 
            this.$refs.scroll.closePullUp();
          }
        })
      },
      changeVisable(status) { 
        this.visable = status;
      },
      upload(e) { 
				var file = e.target.files[0];
				this.fixImageOrientation(file)
					.then((file) => {
            var formData = new FormData();
            console.log(file)
						formData.append("impl", "dzbp");
            formData.append("file", file);
            formData.append("ext", ".jpeg");
            formData.append("dataType", "json_text");
            formData.append("type", "xcgl_bjxc");
						uploadImage(formData).then(data => {
              if(data.success) { 
                this.curpath = data.path;
              }
              this.changeVisable(true);
            })
					})
					.catch(() => {
						this.showImgLoading = false;
					})        
      },
      uploadFunc() { 
        if(!this.tittle) { 
          // debugger
          this.$toast('请输入标题')
          return 
        }
        if(!this.curpath) { 
          this.$toast('请上传图片')
          return 
        }       
        saveAlbum(this.saveAlbumParams())
        .then(()=>{ 
          this.visable = false;
          this.tittle = '';
          this.isTitle = false;
          this.curpath = '';
          this.$toast('操作成功')
          this.page = 1;
          this.$refs.scroll.resetFn();
          this.init(this.clearData);
        })
      },
      saveAlbumParams() { 
        return [
          {
              "id": "",
              "tittle": this.tittle,
              "type": "4",
              "xclx": "2",
              "macdz": this.$route.query.macdz
          },
          {
              "fjdz": this.curpath,
              "fjgs": ".jpeg",
              "fjmc": "xp"
          }
        ]
      },
      fixImageOrientation(file) {
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
    }
  }
</script>

<style lang='less'>
  .mint-toast { 
    z-index: 9999;
  }
  #xc { 
    width:100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .tip { 
      color:red;
      line-height: 30Px;
    }
  }
  .xcWrapper { 
    height: calc(100% - 100px);
    overflow-y: auto;
  }
  .xcBtn { 
    padding: 30px;
    position: relative;
    .bd(#ddd,'top');
    .btn { 
      width: 100%;
      height: 90px;
      text-align: center;
      line-height: 90px;
      background:linear-gradient(90deg,rgba(56,140,255,1) 0%,rgba(11,197,254,1) 100%);
      border-radius:45px;
      position: relative;
      color:#fff;
      font-size: 32px;
    }
    input { 
      width: 100%;
      height: 100%;
      opacity: 0;
      position: absolute;
      top:0;
      left:0;
    }

  }
  .uploadBox{ 
    width: 600px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    .add { 
      width: 236px;
      height: 236px;
      border: 1px solid #ddd;
      position: relative;
      margin-bottom: 30px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      &.addIcon { 
        &::before { 
          content: '';
          width: 8px;
          height: 50%;
          border-radius: 4px;
          position: absolute;
          top:0;
          left:0;
          right:0;
          bottom:0;
          margin:auto;
          background-color: #999;
        }
        &::after { 
          content: '';
          width: 8px;
          height: 50%;
          border-radius: 4px;
          position: absolute;
          top:0;
          left:0;
          right:0;
          bottom:0;
          margin:auto;
          background-color: #999;
          transform: rotate(90deg)
        }
      }

      input { 
        position: absolute;
        width:100%;
        height: 100%;
        z-index: 10;
        top:0;
        left:0;
        opacity: 0;
      }
    }
  }
  .inputBox { 
    width: 100%;
    border-radius: 6px;
    padding: 30px;
    input {
      width: 100%;
      height: 100%;
      padding: 0 30px;
      height: 80px;
      line-height: 80px;
      border: 1Px solid #ddd;
    }
  }
  .btnList {
    display: flex;
    height: 90px;
    width: 100%;
    .bd(#ddd,'top');
    li { 
      display: flex;
      flex:1;
      font-size: 16Px;
      text-align: center;
      line-height: 90px;
      justify-content: center;
      & + li { 
        .bd(#ddd,'left');
        color:#388CFF;
      }
    }
  }

  .pcCell { 
    width: 236px;
    height: 236px;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    margin-left: 10px;
    margin-bottom: 10px;
    background-color: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    &[lazy=loading] {
      &::before { 
        content: '加载中';
        text-align: center;
        line-height: 236px;
      }
    }
  }
  .pcUl { 
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
  }
</style>