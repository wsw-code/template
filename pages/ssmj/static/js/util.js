

/* eslint-disable */
var util = {
  GetQueryString: function(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
  },
  getToken: function (OA, mk) { // 获取token
    	var token = null  
        var ua = navigator.userAgent
		var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1
		var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
		if (isiOS) {
      try {
        if (OA || mk == 'achieve') {
          token = iOSUserInfo()
				}else {
          token = iosToken() 
				}
      }catch (e) {
        // $.toast(e,3000,'toast');
        // TODO handle the exception
      }
    } else {
      try {
        if (OA) {
          try {
            var Token = window.AndroidWebView.getToken()
						var userId = window.AndroidWebView.getUserId()	
						token = {}
						token.token = Token
						token.userId = userId
						token = JSON.stringify(token)
						//token=window.AndroidWebView.getUserInfo('');
					} catch(e) {
            var Token = window.AndroidWebView.getToken()
						var userId = window.AndroidWebView.getUserId()
						token.token = Token
						token = JSON.stringify(token)
					}
        } else if (mk == 'achieve' && OA == null) {
          var Token = window.AndroidWebView.getToken()
					var userId = window.AndroidWebView.getUserId()	
					token = {}
					token.token = Token
					token.userId = userId
					token = JSON.stringify(token)
				} else{
          token = window.AndroidWebView.getToken()
				}
      } catch(e) {
        // $.toaiOSUserInfost(e,300000,'toast');
        // TODO handle the exception
      }
    }
    return token
  },
  getTaskInfo: function () {
    	var taskInfo = null  
        var ua = navigator.userAgent
		var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1
		var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
		if (isiOS) {
      try {
        taskInfo = iosTaskInfo()
	  			if (typeof taskInfo === 'string') {
	  				taskInfo = JSON.parse(taskInfo)
	  			}
      } catch(e) {
        // TODO handle the exception
      }
    } else {
      if (typeof window.AndroidWebView === undefined) {
		  	} else {
		  		try {
		  			taskInfo = window.AndroidWebView.getTaskInfo()
		  			if (typeof taskInfo === 'string') {
		  				taskInfo = JSON.parse(taskInfo)
		  			}
		  		}catch (e) {}
		  	}
    }
    return taskInfo
  },
  iosBack: function (former, lev, funcindex) {
    	// former-true:通知打开了false：通知关闭了;
    	// islist:隐藏时是否要隐藏且是否要返回上一页
    	// lev是打开了几层DIV
    	// 修复ios返回闪退问题--通知ios打开了回退时需要隐藏的DIV未隐藏
    var ua = navigator.userAgent
		var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1
		var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
		if (isiOS) {
      if (funcindex == '1') {
        try {
          iOSMultiBack()
				}catch (e) {

        }
      } else if (funcindex == '2') {
        try {
          iOSClickActionSheet()
				}catch (e) {

        }
      } else{
        if (former) {
          try {
		    			iOSIsNativeGoback(0, lev)
		    		} catch(e) {

          }
		    	} else{
		    		try {
		    		iOSIsNativeGoback(1, lev)
		    		} catch(e) {

		    		}
		    	}
      }
    	}
  },
  // token失效，返回登录页面；
  backLogin: function () {
    	var ua = navigator.userAgent
		var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1
		var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
		if (isiOS) {
      TransToLoginVC()
		} else{
      window.autoLogin()
		}
  },
  /**
     * cookie 存储 存值
     * @param {Object} key
     * @param {Object} val
     */
  setItem: function (key, val) {
    this.setCookie(key, val)
	},
  /**
	 * cookie 存储 取值
	 * @param {Object} key
	 */
  getItem: function (key) {
    return this.getCookie(key)
	},
  /**
	 * 设置cookie
	 * @param {Object} key
	 * @param {Object} val
	 */
  setCookie: function (key, val) {
    var Days = 10000 
	    var exp = new Date() 
	    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000) 
		document.cookie = key + '=' + escape(val) + ';expires=' + exp.toGMTString() 
	},
  /**
	 * 读取cookie
	 * @param {Object} key
	 * @param {Object} val
	 */
  getCookie: function (key) {
    var arr; var  reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)')
		if (arr = document.cookie.match(reg))
      {return unescape(arr[2]);}
    else
      {return null;}
  },
  /**
	 * 通知原生app播放视频
	 * @param {Object} url
	 */
  notifyVideo: function (url, id) {
    var ua = navigator.userAgent
		var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1
		var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
		if (isiOS) {
      if (typeof iOSWORK === undefined) {
		  		alert('未检测到IOS播放器')
		  	} else {
		  		try {
		  			iOSWORK(url, id)
		  		} catch (e) {}
		  	}
    } else {
      if (typeof window.AndroidWebView === undefined) {
		  		alert('未检测到android播放器')
		  	} else {
		  		try {
		  			window.AndroidWebView.showVideo(url, id)
		  		}catch (e) {}
		  	}
    }
  },
  /**
     * 提示原生关闭视频播放
     */
  closeVideo: function () {
    var ua = navigator.userAgent
		var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1
		var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
		if (isiOS) {
      if (typeof iOSOutWork === undefined) {
		  	} else {
		  		try {
		  			iOSOutWork()
		  		} catch (e) {}
		  	}
    } else {
      if (typeof window.AndroidWebView === undefined) {
		  		alert('未检测到android播放器')
		  	} else {
		  		try {
		  			window.AndroidWebView.closeVideo()
		  		}catch (e) {}
		  	}
    }
  },
  openPdf: function (kjid) {
    var ua = navigator.userAgent
		var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1
		var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
		if (isiOS) {
      if (typeof readDocument === undefined) {
		  	} else {
		  		try {
		  			readDocument(kjid)
		  		} catch (e) {}
		  	}
    } else {
      try {
  				if (window.AndroidWebView) {
  					window.AndroidWebView.showVideo('', kjid)
  				}
  			} catch(e) {

  			}
    }
  },
  closePdf: function () {
    var ua = navigator.userAgent
		var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1
		var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
		if (isiOS) {
      if (typeof quitDocument === undefined) {
		  	} else {
		  		try {
		  			quitDocument()
		  		} catch (e) {}
		  	}
    } else {
      if (typeof window.AndroidWebView === undefined) {
		  		alert('未检测到android播放器')
		  	} else {
		  		try {
		  			window.AndroidWebView.closeVideo()
		  		}catch (e) {}
		  	}
    }
  },
  /**
     * 跳转原生习题测评
     * @param {Object} sjId 试卷id(必须)
     * @param {Object} h5Lxjcjh 练习卷成绩号
     * @param {Object} endTime 截止时间
     * @param {Object} timeLimitString 倒计时(时:分:秒)
     * @param {Object} module 模块号
     * @param {Object} pk 业务号
     */
  goExercises: function (sjId, h5Lxjcjh, endTime, timeLimitString, module, pk, kmh) {
    	var ua = navigator.userAgent
		var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
		if (isiOS) {
      if (typeof iOSPreparationMeasurement === undefined) {
		  	} else {
		  		try {
		  			iOSPreparationMeasurement(sjId, h5Lxjcjh, endTime, timeLimitString, module, pk, kmh)
		  		} catch(e) {
		  			// TODO handle the exception
		  		}
		  	}
    } else {
      if (typeof window.AndroidWebView === undefined) {
      } else {
		  		try {
		  			window.AndroidWebView.h5GoCeping(sjId, h5Lxjcjh, endTime, timeLimitString, module, pk, kmh)
		  		} catch(e) {
		  			// TODO handle the exception
		  		}
		  	}
    }
  },
  /**
     * 跳转答题报告
     * @param {Object} sjId 试卷号
     * @param {Object} lxjcjh 练习卷成绩号
     * @param {Object} module 模块号
     * @param {Object} pk 业务号
     */
  goExeReport: function (sjId, lxjcjh, module, pk, kmh) {
    	var ua = navigator.userAgent
		var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
		if (isiOS) {
      if (typeof iOSPreparationReport === undefined) {
		  	} else {
		  		try {
		  			iOSPreparationReport(sjId, lxjcjh, module, pk, kmh)
		  		}catch (e) {
		  			// TODO handle the exception
		  		}
		  	}
    } else {
      if (typeof window.AndroidWebView === undefined) {
		  	} else {
		  		try {
		  			window.AndroidWebView.h5GoDaTiBaoGao(sjId, lxjcjh, module, pk, kmh)
		  		}catch (e) {
		  			// TODO handle the exception
		  		}
		  	}
    }
  },
  /**
     * 返回原生菜单页面
     */
  returnApp: function () {
    var ua = navigator.userAgent
		var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
		if (isiOS) {
      if (typeof iOSDismiss === undefined) {
		  	} else {
		  		try {
		  			iOSDismiss()
		  		}catch (e) {
		  			// TODO handle the exception
		  		}
		  	}
    } else {
      if (typeof window.AndroidWebView === undefined) {
		  	} else {
		  		try {
		  			window.AndroidWebView.closeWebView()
		  		} catch(e) {
		  			// TODO handle the exception
		  		}
		  	}
    }
  },
  // 设置标题
  tosettitle: function (title) {
    var ua = navigator.userAgent
		var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
		if (isiOS) {
      if (typeof setTitle === undefined) {
		  	} else {
		  		try {
		  			setTitle(title)
		  		}catch (e) {
		  			// TODO handle the exception
		  		}
		  	}
    } else {
      if (typeof window.AndroidWebView === undefined) {
		  	} else {
		  		try {
		  			window.AndroidWebView.setTitle(title)
		  		} catch(e) {
		  			// TODO handle the exception
		  		}
		  	}
    }
  	},
  // 移除头部按钮
  delButton: function () {
    var ua = navigator.userAgent
		var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
		if (isiOS) {
      if (typeof removeRightBarButtonItem === undefined) {
        alert('找不到头部按钮方法')
		  	} else {
		  		try {
		  			removeRightBarButtonItem()
		  		} catch(e) {
		  			// TODO handle the exception
		  		}
		  	}
    } else {
      if (typeof window.AndroidWebView === undefined) {
        alert('找不到头部按钮方法')
		  	} else {
		  		try {
		  			window.AndroidWebView.setButonVisible(false, '', '')
		  		} catch(e) {
		  			// TODO handle the exception
		  		}
		  	}
    }
  },


  /**
     * 打开原生直播视频
     */
  getOnlive: function (kcid, channelID, isLive) {
    	// var onlive = null ;
    	var PolvyUrl = 'rtmp://eb.yixx.cn:24402/live/' + channelID 
        var ua = navigator.userAgent
		var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1
		var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
		if (isiOS) {
      try {
        OpenCourseLive(PolvyUrl, kcid, channelID)
			} catch(e) {
        // TODO handle the exception
      }
    }else {
      try {
        window.AndroidWebView.goKeChengActivity(PolvyUrl, kcid, channelID, isLive)
			}catch (e) {
        // TODO handle the exception
      }
    }
    // return onlive;
  },
  // 直播头部科目筛选
  chooseKm: function (flag, list, mc, cb) {
    	var str = '';
    	if (list) {
    		var result = {}
    		result.result = list
    		str = JSON.stringify(result)
    	}
    var ua = navigator.userAgent
		var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1
		var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
		if (isiOS) {
      try {
        if (flag) {
          addRightBarbuttonItem(mc, cb)
				}else {
          removeRightBarButtonItem()
				}
      } catch(e) {
        // TODO handle the exception
      }
    }else {
      try {
        if (flag) {
          window.AndroidWebView.showKechengFilter(str)
				} else{
          window.AndroidWebView.hideKechengFilter()
				}
      } catch(e) {
        // TODO handle the exception
      }
    }
  },
  // 班主任/任课老师获取用户信息
  qualityUser: function (xdh) {
    	xdh = xdh || '';
    	var userInfo = {}
    	var obj = ''
    	var flag = false 
        var ua = navigator.userAgent
		var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1
		var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
		if (isiOS) {
      try {
        obj = iOSUserInfo(xdh)
				obj = JSON.parse(obj)
				if (obj.isRkjs) {
          flag = true 
				}else {
          alert('您暂无任课班级')
					return;
        }
      }catch (e) {
        // TODO handle the exception
      }
    }else {
      try {
        obj = window.AndroidWebView.getUserInfo(xdh)
				obj = JSON.parse(obj)
				if (obj.isRkjs) {
          flag = true 
				}else {
          alert('您暂无任课班级')
					return;
        }
      } catch(e) {
        // TODO handle the exception
      }
    }
    if (flag) {
      if (obj.isBzr == 'true') {
        userInfo = {
          xxh: obj.xxh,
          role: 'bzr',
          bjmc: obj.bjmc ? obj.bjmc:'',
          bjh: obj.bjh ? obj.bjh:'',
          bzrbjh: obj.bzrbjh ? obj.bzrbjh:'',
          bzrnjh: obj.bzrnjh ? obj.bzrnjh:'',
          bzrxx: obj.bzrxx ? obj.bzrxx:''
        }
        return userInfo 
			} else{
        userInfo = {
          xxh: obj.xxh,
          role: 'rkls',
          bjmc: obj.bjmc ? obj.bjmc:'',
          bjh: obj.bjh ? obj.bjh:''
        }
        return userInfo 
			}
    }else {
      return {
        xxh: '4', // 54为蔡亚真，7为傅婵艺,1为孙鲲/陆秀儿,4为周艳茹
        bjh: '1', // 5为孙鲲,1为周艳茹
        bjmc: '',
        role: 'bzr'
      }
    }
  },
  // 设置头部按钮
  setHeadButton: function (title, cb, flag) {
    	/*
    	 *title表示右边按钮名称，例如筛选
    	 * cb调用成功以后前端的操作，回掉函数
    	 * flag表示按钮是否存在，true表示显示，false表示不显示
    	 */
    var ua = navigator.userAgent
		var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
		if (isiOS) {
      try {
        if (typeof addRightBarbuttonItem === undefined || removeRightBarButtonItem === undefined) {
			  		alert('找不到头部按钮方法')
				} else {
          if (flag) {
            addRightBarbuttonItem(title, cb)
					}else {
            removeRightBarButtonItem()
					}
			  	}
		  	}catch (e) {
		  		// TODO handle the exception
		  	}
    } else {
      if (typeof window.AndroidWebView === undefined) {
        alert('找不到头部按钮方法')
		  	} else {
		  		try {
          if (flag) {
            window.AndroidWebView.setButonVisible(true, title, cb)
					}else {
            window.AndroidWebView.setButonVisible(false, '', '')
					}
		  		} catch(e) {
		  			// TODO handle the exception
		  		}
		  	}
    }
  	},
  	getUserTokenAndRole: function (xdh) {
  		var xdh = xdh || '';
    	var userInfo = {}
    	var obj = ''
    	var flag = false 
        var ua = navigator.userAgent
		var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1
		var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
		if (isiOS) {
      try {
        obj = iOSUserInfo(xdh)
			}catch (e) {
        // TODO handle the exception
      }
    } else{
      try {
        obj = window.AndroidWebView.getUserInfo(xdh)
			}catch (e) {
        // TODO handle the exception
      }
    }
    return obj 
		},
  // 判断是否有token
  checkLogin: function (pageType) {
    var urlParams = URL.parse(req.url, true).query
			var token = urlParams.token
			if (!token) {
      replaceState(null, '/loginFrame')
			} else {
      if (pageType === 1) {
        location.href = '/registe?token=' + token
				} else if (pageType === 2) {
        location.href = '/domApply?token=' + token
				} else if (pageType === 3) {
        location.href = '/courseSelected?token=' + token
				}
    }
  }
}
// let urls = ''
// util.checkLogin(urls)
export default util
