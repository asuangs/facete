webpackJsonp([5],{"0di0":function(e,t){},"991W":function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=n("+RKF"),a={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{searchs:!0,"searchs-open":e.icon}},[n("form",{staticClass:"searchs-from",attrs:{action:""},on:{submit:e.checkForm}},[n("i",{class:{"search-icon":!0,"icon-open":e.icon},on:{click:e.focus}}),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.message,expression:"message"}],ref:"inp",class:{search:!0,"search-open":e.icon},attrs:{type:"text"},domProps:{value:e.message},on:{focus:e.open,blur:e.close,input:function(t){t.target.composing||(e.message=t.target.value)}}})])])},staticRenderFns:[]};var i={name:"headerCom",components:{Search:n("C7Lr")({name:"searchCom",data:function(){return{icon:!1,message:""}},computed:{search_name:function(){return this.$store.state.search_name}},watch:{message:function(e){e||this.$store.commit("search_name","")}},created:function(){this.message=this.search_name,this.message&&this.open()},methods:{focus:function(e){this.$refs.inp.focus()},open:function(e){this.icon=!0},close:function(e){this.message||(this.icon=!1)},checkForm:function(e){if(e.preventDefault(),this.message){if(this.$store.commit("search_name",this.message),"searchIndex"===this.$route.name)return;-1===this.$store.state.keepAlive.indexOf("searchIndex")&&this.$store.commit("setKeepAlive",this.$store.state.keepAlive.concat("searchIndex")),this.$router.push("/searchIndex")}}}},a,!1,function(e){n("Vcnj")},"data-v-c2490e86",null).exports},data:function(){return{username:"",accessToken:"",userlist:[],radio:0}},created:function(){},methods:{login:function(){var e=this;window.FB.login(function(t){t.authResponse?(console.log(t),e.accessToken=t.authResponse.accessToken,FB.api("/me",function(t){console.log(t),e.username=t.name,e.userid=t.id}),FB.api("me/accounts",function(t){console.log(t),t.data&&t.data.length&&(e.userlist=t.data),FB.api("105091834843768/subscribed_apps","post",function(e){console.log(e)},{subscribed_fields:"messages,messaging_postbacks",access_token:e.userlist[0].access_token}),e.userlist.forEach(function(t){e.saveInfo(t.id,t.access_token)})})):console.log("User cancelled login or did not fully authorize.")},{auth_type:"rerequest",scope:"pages_messaging,leads_retrieval,pages_show_list,pages_manage_metadata"})},saveInfo:function(e,t){var n=this;this.Axios.get("/saveInfo",{params:{userid:e,page_token:t}}).then(function(e){200===e.status?n.success=!0:n.error=!0})}}},o={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"h-ou"},[n("div",{staticClass:"header"},[n("router-link",{attrs:{to:"/"}},[e._v("首页")]),e._v(" "),n("router-link",{attrs:{to:"/aone"}},[e._v("一页面")]),e._v(" "),n("router-link",{attrs:{to:"/aonet"}},[e._v("一页面")])],1),e._v(" "),n("div",[e.username?n("div",{staticClass:"username"},[n("ul",{staticClass:"userlist"},e._l(e.userlist,function(t,s){return n("li",{key:t.name},[e._v("公共主页"+e._s(s+1)+"："+e._s(t.name)+" "),n("el-radio",{attrs:{label:s},model:{value:e.radio,callback:function(t){e.radio=t},expression:"radio"}},[e._v("公共主页"+e._s(s+1)+"："+e._s(t.name))])],1)}),0),e._v(" "),n("span",[e._v(e._s(e.username))])]):n("el-button",{attrs:{type:"primary"},on:{click:e.login}},[e._v("Facebook登录")])],1)])},staticRenderFns:[]};var r={render:function(){var e=this.$createElement,t=this._self._c||e;return t("footer",{staticClass:"footer"},[t("p",{staticClass:"f-p"},[this._v("Copyright © 2010-"+this._s((new Date).getFullYear())+" 药智网YAOZH.COM")]),this._v(" "),t("p",{staticClass:"f-p"},[this._v("All Rights Reserved.工信部备案号:渝ICP备10200070号")]),this._v(" "),t("p",{staticClass:"f-p"},[this._v("渝公网安备 50010802001068号")])])},staticRenderFns:[]};var c={name:"App",components:{Header:n("C7Lr")(i,o,!1,function(e){n("0di0")},"data-v-603e8387",null).exports,Footer:n("C7Lr")({name:"footerCom"},r,!1,function(e){n("SktG")},"data-v-860345ce",null).exports},mixins:[{data:function(){return{desc:"药智新闻是国内最权威的医药健康资讯传媒网站,汇集最新医药动态、权威数据报告、行业专家访谈、医药会展、读者声音,带您了解医药行业发展趋势及最新资讯动向"}},methods:{wxShare:function(){var e=this;/iPhone/.test(navigator.userAgent)?this.wxLoop():this.getJssdk().then(function(){var t=e;wx.ready(function(){t.initShare()})})},initShare:function(){wx.updateAppMessageShareData(this.shareData),wx.updateTimelineShareData(this.shareData)},wxLoop:function(){var e=this;sessionStorage.getItem("share")?this.initShare():setTimeout(function(){e.wxLoop()},100)},getJssdk:function(){return this.Axios.post("/api/api/wxapi/getJssdk",{url:encodeURIComponent(location.href)}).then(function(e){var t=e.data.data;wx.config({debug:!1,appId:t.appId,timestamp:t.timestamp,nonceStr:t.nonceStr,signature:t.signature,jsApiList:["updateAppMessageShareData","updateTimelineShareData","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone"]})})}}}],data:function(){return{minh:200}},computed:{keepAlive:function(){return this.$store.state.keepAlive}},created:function(){},methods:{getMinH:function(){var e=this;this.$nextTick(function(){var t=document.querySelector(".header").clientHeight,n=document.querySelector(".footer").clientHeight,s=document.body.clientHeight;e.minh=s-(t+n)})},getadvlist:function(){var e=this;this.Axios.get("/api/api/Common/getadvlist").then(function(t){200===t.data.code&&e.$store.commit("advlist",t.data.data)})},getnavlist:function(){var e=this;this.Axios.get("/api/api/common/getnavlist").then(function(t){200===t.data.code&&e.$store.commit("navlist",t.data.data.navlist)})}},mounted:function(){/iPhone/.test(navigator.userAgent)&&this.getJssdk().then(function(){wx.ready(function(){sessionStorage.setItem("share",1)})})}},u={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{ref:"main",staticClass:"main"},[t("Header"),this._v(" "),t("router-view")],1)},staticRenderFns:[]};var l=n("C7Lr")(c,u,!1,function(e){n("TLNI")},null,null).exports,h=n("bAj6");s.default.use(h.a);var d=new h.a({mode:"history",routes:[{path:"/",name:"index",component:function(){return n.e(0).then(n.bind(null,"JXTs"))}},{path:"/aonet",name:"aone",component:function(){return n.e(2).then(n.bind(null,"IlLg"))}},{path:"/aone",name:"aone",component:function(){return n.e(3).then(n.bind(null,"wGiq"))}},{path:"/nodata",name:"nodata",component:function(){return n.e(1).then(n.bind(null,"tFlJ"))},meta:{title:"药智新闻-最新医药动态、权威数据解读、最全医药资讯网站",Keywords:"医药资讯,医药新闻,药智新闻,生物医药资讯,医药资讯网,中国医药资讯",description:"药智新闻是国内权威的医药健康资讯传媒平台，汇集最新医药政策研发商业动态、权威数据报告、前沿科技、行业高端访谈、医药会展、深度报道等，带您了解医药行业发展趋势及最新资讯动态。  ",keepAlive:!1}},{path:"*",redirect:"/"}]});d.onError(function(e){e.message.match(/Loading chunk (\d)+ failed/g)?window.location.reload():console.log(e)});var m=d,p=n("OAll");s.default.use(p.a);var f=new p.a.Store({state:{navlist:[],search_name:"",keepAlive:[],advlist:{}},mutations:{navlist:function(e,t){t.push({has_cateid:null,id:null,navlisttwo:[],title:"专题"},{has_cateid:null,id:null,navlisttwo:[],title:"视频"},{has_cateid:null,id:null,navlisttwo:[],title:"图集"}),t.forEach(function(e){e.navlisttwo.forEach(function(e){e.active=!1}),e.navlisttwo.unshift({name:"最新",active:!0})}),e.navlist=t},search_name:function(e,t){e.search_name=t},setKeepAlive:function(e,t){e.keepAlive=t},advlist:function(e,t){e.advlist=t}}}),v=n("I29D"),g=n.n(v),_=n("gU9C"),k=n.n(_);n("b6Kr"),n("991W");s.default.config.productionTip=!1,s.default.use(k.a),s.default.prototype.Axios=g.a,new s.default({el:"#app",router:m,store:f,components:{App:l},template:"<App/>"})},SktG:function(e,t){},TLNI:function(e,t){},Vcnj:function(e,t){},b6Kr:function(e,t){}},["NHnr"]);