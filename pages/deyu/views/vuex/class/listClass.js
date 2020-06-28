


class List { 
  constructor() { 
    this.namespaced = true
    this.state = { 
      deyuObj:{ids:[],list:{}},
    }
    this.mutations = { 
      deyuChange(state,val) { //列表数据添加
        var list = val;
        console.log(val)
        var $list = {};
        var $ids = [];
        list.forEach(el=>{ 
          $list[el.id] = el;
          $ids.push(el.id);
        })
        console.log(state)
        state.deyuObj.list = {...state.deyuObj.list,...$list};
        state.deyuObj.ids = [...state.deyuObj.ids,...$ids]; 
      },
      deyuSet(state,val) {  //列表数据重置
        var list = val;
        var $list = {};
        var $ids = [];
        list.forEach(el=>{ 
          $list[el.id] = el;
          $ids.push(el.id);
        })
        state.deyuObj.list = {...$list};
        state.deyuObj.ids = [...$ids]; 
      },
      clearDeyu(state) { //列表数据清空
        state.deyuObj.list = {};
        state.deyuObj.ids = [];
      },
      singleDeyuChange(state,val) { 
        var {id,curData} = val;
        if(state.deyuObj.ids.length>0) { 
          state.deyuObj.list[id] = curData;
        }
      }
    }
    this.actions = { 

    }
  }
}


export default List;