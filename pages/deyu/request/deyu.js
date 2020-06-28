import axios from 'axios'
import { poxcyPath } from 'appConfig'
import { MessageBox } from 'mint-ui'
function ajax(url,params,extraParams={LOADING:true}) {  
  console.log(extraParams)
  return axios.post(url, params,extraParams).then(data=>{ 
      if(data.result.code == '0') { 
        return data.result;
      } else { 
        MessageBox('',data.result.msg);
      }
  })
}

// type:1, //类型  0-首页(按权限不同显示)该显示的，1-我发起的/我创建的

// sort:cjsj,  //排序字段

// order:desc,  //排序，正反序

// page:1,  //页码

// rows:5 ,  //每页记录数

// role：SUPER_BZR //角色SUPER_BZR 

function getKjtsList (page,rows,loading=false,type=0,sort='cjsj',order='desc') {
  console.log('loading==='+loading);
  return ajax(poxcyPath + '/deyu/getKjtsList', {type,sort,order,page,rows,role:GLOBAL_ROLE},{LOADING:loading})
}

function updateDz (id) {
  return ajax(poxcyPath + '/deyu/updateDz', {id})
}

function savePl (id,txt) {
  return ajax(poxcyPath + '/deyu/savePl', {id,txt})
}

function getPllist (id,page,rows) {
  return ajax(poxcyPath + '/deyu/getPllist', {id,param:{page,rows}})
}

function queryDlList () {
  return ajax(poxcyPath + '/deyu/queryDlList')
}

// function queryPbList (param) {
//   param.role = GLOBAL_ROLE;
//   return ajax(poxcyPath + '/deyu/queryPbList',param)
// }

function getDyTreePf (param) {
  return ajax(poxcyPath + '/deyu/getDyTreePf',param)
}

function saveJc (dxlx,jclist,dxids) {
  return ajax(poxcyPath + '/deyu/saveJc',{dxlx,jclist,dxids})
}

function getGrZbList () {
  return ajax(poxcyPath + '/deyu/getGrZbList')
}

function queryRyList (rymc,page,rows,sort,order) {
  return ajax(poxcyPath + '/deyu/queryRyList',{rymc,page,rows,sort,order})
}

function getBjByXX () {
  return ajax(poxcyPath + '/deyu/getBjByXX')
}

function addBjRyJl (bjIds,ryIds,bz) {
  return ajax(poxcyPath + '/deyu/addBjRyJl',{bjIds,ryIds,bz})
}

function getMyStudents (bjid="") {
  return ajax(poxcyPath + '/deyu/getMyStudents',{bjid,role:GLOBAL_ROLE})
}

function getDqxq () {
  return ajax(poxcyPath + '/deyu/getDqxq')
}
function getXxNjList (xq) {
  return ajax(poxcyPath + '/deyu/getXxNjList',{xq})
}

function queryDytj (obj) {
  return ajax(poxcyPath + '/deyu/queryDytj',obj)
}

function queryBjPm (fw=1,xxh='',ryIds='') {
  return ajax(poxcyPath + '/deyu/queryBjPm',{fw,xxh,ryIds})
}
function queryDxDy ({dxid,fw=1,dxlx,startTime='',endTime='',mt='',pm=''}) {
  return ajax(poxcyPath + '/deyu/queryDxDy',{dxid,dxlx,fw,startTime,endTime,mt,pm})
}

function getDyAppRoleFuncs () {
  return ajax(poxcyPath + '/deyu/getDyAppRoleFuncs',{role:GLOBAL_ROLE})
}

function uploadImage (formData) {
  return axios.post(poxcyPath + '/deyu/uploadImage',formData)
}

function createdRequestPath(name) { 
  return `${poxcyPath}/deyu/postAjax_${name}`
}

function newAjax(requestPath,{url,data},extraParams={LOADING:true}) { 
  return axios.post(requestPath,{url,data},extraParams).then(data=>{ 
    if(data.result.code == '0') { 
      return data.result;
    } else { 
      MessageBox('',data.result.msg);
    }
  })
}

function getDyzb(data) { 
  var requestPath = createdRequestPath('getDyzb')
  var url = '/dygl/getDyzb.jsmeb'
  return newAjax(requestPath,{url,data})
}

function queryDyPfMx(data) { 
  var requestPath = createdRequestPath('queryDyPfMx')
  var url = '/dygl/queryDyPfMx.jsmeb'
  return newAjax(requestPath,{url,data})
}


function queryPbList (data) {
  data.role = GLOBAL_ROLE;
  var requestPath = createdRequestPath('queryPbList')
  var url = '/dygl/queryPbList.jsmeb'
  return newAjax(requestPath,{url,data})
}


export {queryDyPfMx,getDyzb,uploadImage,getDyAppRoleFuncs,queryDxDy,queryBjPm,queryDytj,getXxNjList,getDqxq,getMyStudents,addBjRyJl,getBjByXX,getKjtsList,updateDz,savePl,getPllist,queryDlList,queryPbList,getDyTreePf,saveJc,getGrZbList,queryRyList}
