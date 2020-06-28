var RegExpObj = { 
  'tel': (/^((13[0-9])|(15[^4])|(19[0-9])|(18[0-9])|(17[0-9])|(147))\d{8}$/i),
  'email':(/([a-z0-9A-Z]+[-|_|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/i)
}
export default RegExpObj
