var vuexObj = { 
    state:{
      singleInfo:{zdList:[],sjMap:{},cdata:{}},
      userInfo:{},
      bdmkList:[]
    },
    mutations:{
      getSingleInfo(state,val) { 
        this.state.singleInfo = val  
      },
      getBdmkList(state,val) { 
        this.state.bdmkList = val  
      },
      getUserInfo(state,val) { 
        this.state.userInfo = val 
      }
    }
}

export {vuexObj}