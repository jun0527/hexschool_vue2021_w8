(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b9d35"],{3530:function(t,e,o){"use strict";o.r(e);var n=o("7a23"),a={class:"nav navbar navbar-expand-md fixed-top top-0 w-100 bg-dark"},c={class:"container"},l=Object(n["h"])("button",{class:"navbar-toggler mobileMenuBtn",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"},[Object(n["h"])("i",{class:"bi bi-list"})],-1),s=Object(n["h"])("h1",null,[Object(n["h"])("a",{class:"navbar-brand title",href:"#"},"Pinpin")],-1),i={class:"mobileMenu collapse navbar-collapse bg-dark",ref:"mobileMenu",id:"navbarSupportedContent"},r={class:"navbar-nav me-auto mb-2 mb-md-0"},u={class:"nav-item"},d=Object(n["g"])("商品管理"),b={class:"nav-item"},h=Object(n["g"])("訂單管理"),p={class:"nav-item"},O=Object(n["g"])("優惠券管理"),j={class:"nav-item"},v={class:"wrap container"};function f(t,e,o,f,m,g){var k=Object(n["y"])("router-link"),M=Object(n["y"])("router-view"),w=Object(n["y"])("LogoutModal");return Object(n["t"])(),Object(n["d"])(n["a"],null,[Object(n["h"])("nav",a,[Object(n["h"])("div",c,[l,s,Object(n["h"])("div",i,[Object(n["h"])("ul",r,[Object(n["h"])("li",u,[Object(n["h"])(k,{class:"nav-link",to:"/admin/"},{default:Object(n["J"])((function(){return[d]})),_:1})]),Object(n["h"])("li",b,[Object(n["h"])(k,{class:"nav-link",to:"/admin/orders"},{default:Object(n["J"])((function(){return[h]})),_:1})]),Object(n["h"])("li",p,[Object(n["h"])(k,{class:"nav-link",to:"/admin/coupon"},{default:Object(n["J"])((function(){return[O]})),_:1})]),Object(n["h"])("li",j,[Object(n["h"])("a",{class:"nav-link",href:"#",onClick:e[1]||(e[1]=Object(n["L"])((function(){return g.openModal&&g.openModal.apply(g,arguments)}),["prevent"]))},"登出")])])],512)])]),Object(n["h"])("div",v,[m.check?(Object(n["t"])(),Object(n["d"])(M,{key:0})):Object(n["e"])("",!0),Object(n["h"])(w,{ref:"logoutModal"},null,512)])],64)}o("ac1f"),o("5319");var m={class:"modal fade",tabindex:"-1",ref:"modal"},g={class:"modal-dialog"},k={class:"modal-content"},M={class:"modal-header bg-dark"},w=Object(n["h"])("h5",{class:"modal-title text-white"},"登出確認",-1),y=Object(n["h"])("div",{class:"modal-body"},[Object(n["h"])("p",null,"確定要登出？")],-1),$={class:"modal-footer"};function C(t,e,o,a,c,l){return Object(n["t"])(),Object(n["d"])("div",m,[Object(n["h"])("div",g,[Object(n["h"])("div",k,[Object(n["h"])("div",M,[w,Object(n["h"])("button",{type:"button",class:"btn-close btn-close-white",onClick:e[1]||(e[1]=function(){return l.closeModal&&l.closeModal.apply(l,arguments)})})]),y,Object(n["h"])("div",$,[Object(n["h"])("button",{type:"button",class:"btn btn-outline-dark",onClick:e[2]||(e[2]=function(){return l.closeModal&&l.closeModal.apply(l,arguments)})},"取消"),Object(n["h"])("button",{type:"button",class:"btn btn-danger",onClick:e[3]||(e[3]=function(){return l.logOut&&l.logOut.apply(l,arguments)})},"登出")])])])],512)}var x=o("7b17"),J=o("1940"),S=o.n(J),_={data:function(){return{logoutModal:{}}},methods:{openModal:function(){this.logoutModal.show()},closeModal:function(){this.logoutModal.hide()},logOut:function(){var t=this,e="".concat("https://vue3-course-api.hexschool.io/","logout");this.$http.post(e).then((function(e){e.data.success?(S()("登出成功！"),document.cookie='vue2021_w7="";',t.closeModal(),t.$router.push("/signIn")):S()("登出失敗！")})).catch((function(){S()("網頁發生錯誤，請重新整理此頁面！")}))}},mounted:function(){this.logoutModal=new x["c"](this.$refs.modal,{backdrop:"static",keyboard:!1})}};_.render=C;var I=_,B={data:function(){return{check:!1}},components:{LogoutModal:I},methods:{checkSignIn:function(){var t=this,e="".concat("https://vue3-course-api.hexschool.io/","api/user/check");this.$http.post(e).then((function(e){e.data.success?t.check=!0:(t.check=!1,t.$router.push("/signIn"),t.$swal({title:"".concat(e.data.message),showConfirmButton:!1,icon:"error",timer:2e3}))})).catch((function(){t.$swal({title:"網頁發生錯誤，請重新整理此頁面！",showConfirmButton:!1,icon:"error",timer:2e3})}))},openModal:function(){this.$refs.logoutModal.openModal()}},created:function(){var t=document.cookie.replace(/(?:(?:^|.*;\s*)vue2021_w7\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=t,this.checkSignIn()}};B.render=f;e["default"]=B}}]);
//# sourceMappingURL=chunk-2d0b9d35.7d57000f.js.map