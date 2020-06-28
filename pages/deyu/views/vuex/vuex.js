import List from "./class/listClass.js";
class Indexlist extends List {
  constructor() {
    super()
  }
}
class Personlist extends List {
  constructor() {
    super()
    this.state.scrollY = 0;
    this.mutations.setScrollY = function(state,val){ 
      state.scrollY = val
    }
  }
}

class Mylist extends List {
  constructor() {
    super()
    this.state.scrollY = 0;
    this.mutations.setScrollY = function(state,val){ 
      state.scrollY = val
    }
  }
}

var indexlist = new Indexlist();
var personlist = new Personlist();
var mylist = new Mylist();
console.log(indexlist)
var vuexObj = { 
  state:{
      plObj: null,
      GLOBAL_ROLE:'',
      kjtsUpadte:false, //缓存的首页是否需要更新
      keepPage:['RoleoOne','RoleTwo','RoleThree','RoleFour','Bjpj','Sspj'],
      kstsId:'',
      userId:'', // 用户id
      indexDeyu:{ids:[],list:{}},
      personalDeyu:{ids:[],list:{}},
      dfObj:'', //打分
      fzObj:'', //打分详情
      detailList:'', //打分列表
      typeList:['personModule','indexModule','myModule']
  },
  mutations:{
    dzChange(state,val) { 
     this.commit('allTypeChange',val)
     if(state.plObj) { 
       this.commit('plChange',val.curData);
     }
    },
    allTypeChange(state,val) { 
      state.typeList.forEach(el=>{ 
        console.log(val)
        this.commit(`${el}/singleDeyuChange`,val)
      })
    },
    plsChange(state,val) { 
      this.commit('allTypeChange',val)
      if(state.plObj) { 
        this.commit('plChange',val.curData);
      }
    },
    plChange(state,val){
      this.state.plObj = val;
    },
    roleChange(state,val) { 
      this.state.GLOBAL_ROLE = val;
    },
    keepPageChange(state,val) { 
      this.state.keepPage = val;
    },
    kjtsUpadte(state,val) { 
      this.state.kjtsUpadte = val;
    },
    kstsIdChange(state,val) { 
      this.state.kstsId = val;
    },
    userIdChange(state,val) { 
      this.state.userId = val;
    },
    dfObjChange(state,val) { 
      this.state.dfObj = val;
    },
    fzChange(state,val) { 
      this.state.fzObj = val;
    },
    setDetailList(state,val) { 
      this.state.detailList = val;
    },
    clearDetailList(state) { 
      console.log(state);
      state.detailList = '';
    }
  },
  modules:{ 
    indexModule:indexlist,
    personModule:personlist,
    myModule:mylist
  } 
}

export {vuexObj}