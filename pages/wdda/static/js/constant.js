import p1 from '@/static/images/p1.png';
import p2 from '@/static/images/p2.png';
import p3 from '@/static/images/p3.png';
import p4 from '@/static/images/p4.png';
const shztInfo = {
  "0":{
    txt:"草稿",
    style:{'backgroundColor':'#FDA844'},
    canSubmit:true,
    icon:p2
  },
  "1":{
    txt:"待审核",
    style:{'backgroundColor':'#26B9D1'},
    canSubmit:false,
    icon:p3
  },
  "2":{
    txt:"已通过",
    style:{'backgroundColor':'#388CFF'},
    canSubmit:false,
    icon:p4
  },
  "3":{
    txt:"未通过",
    style:{'backgroundColor':'#F2266F'},
    canSubmit:true,
    icon:p1
  }
}


export  {shztInfo}