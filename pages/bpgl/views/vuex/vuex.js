var vuexObj = { 
  state:{
      plObj: null,
      GLOBAL_ROLE:'',
      kjtsUpadte:false, //缓存的首页是否需要更新
      keepPage:['RoleoOne','RoleTwo','RoleThree','RoleFour','Bjpj','Sspj'],
      kstsId:'',
      userId:'', // 用户id
      indexDeyu:{ids:[],list:{}},
      personalDeyu:{ids:[],list:{}}
  },
  mutations:{
    plChange(state,val){
      var id = val.id;
      this.state.plObj = val;
      if(this.state.indexDeyu.list[id]) { 
        this.state.indexDeyu.list[id] = val;
      } 
      if(this.state.personalDeyu.list[id]) { 
        this.state.personalDeyu.list[id] = val;
      } 
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
    deyuChange(state,val) { 
      var {list,type} = val;
      var $list = {};
      var $ids = [];
      list.forEach(el=>{ 
        $list[el.id] = el;
        $ids.push(el.id);
      })
      if(val.replace) { 
        this.state[type].list = {...$list};
        this.state[type].ids = [...$ids]; 
      } else { 
        this.state[type].list = {...this.state[type].list,...$list};
        this.state[type].ids = [...this.state[type].ids,...$ids]; 
      } 
    },
    clearDeyu(state,type) { 
      this.state[type].list = {};
      this.state[type].ids = [];
    }
  } 
}

export {vuexObj}