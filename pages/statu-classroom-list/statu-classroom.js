Page({data:{preHtml:'<div>&nbsp;符号说明: <font color="darkred">Ｌ</font>:临时调课;&nbsp;&nbsp;<font color="blue">Ｇ</font>:固定调课;&nbsp;&nbsp;<font color="red">Κ</font>:考试;&nbsp;&nbsp;<font color="red">Ｘ</font>:锁定;&nbsp;&nbsp;<font color="red">Ｊ</font>:借用;&nbsp;&nbsp;<font color="black">◆</font>:正常上课;</div>',html:'',week:1,buildingId:24,tagStyle:"font-size: 20rpx;",notifucationText:"该页面加载需要时间,若加载失败请更换网络重试",cookie:""},onLoad:function(a){var b=this this.setData({week:parseInt(a.week)+1,buildingId:a.buildingId})wx.request({url:'https://dong12138.online/cur/getMain3.php',method:'GET',success(e){b.setData({notifucationText:e.data})}})wx.request({url:'https://dong12138.online/cur/getCookie.php',method:'GET',success(e){b.setData({cookie:e.data})wx.request({url:'https://jwxt.ncepu.edu.cn/jsxsd/kbxx/jsjy_query2',header:{"Content-Type":"application/x-www-form-urlencoded","Referer":"https://jwxt.ncepu.edu.cn/jsxsd/kbxx/jsjy_query","Cookie":b.data.cookie},data:{"typewhere":"jszq","xnxqh":"2021-2022-1","xqbh":"2","jxlbh":b.data.buildingId,"bjfh":"=","zc":""+b.data.week+"","zc2":""+b.data.week+""},method:"POST",success(e){b.setData({html:e.data})}})}})}})