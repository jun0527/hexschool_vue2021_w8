(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-397c0c03"],{"1dde":function(e,t,c){var a=c("d039"),l=c("b622"),s=c("2d00"),n=l("species");e.exports=function(e){return s>=51||!a((function(){var t=[],c=t.constructor={};return c[n]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},"50ed":function(e,t,c){"use strict";c.r(t);c("b0c0");var a=c("7a23"),l={class:"wrap"},s=Object(a["h"])("div",{class:"cartBanner"},[Object(a["h"])("div",{class:"titleArea"},[Object(a["h"])("h2",null,"結帳流程")])],-1),n={class:"container py-3 py-md-6"},r={class:"row justify-content-center"},o={class:"col-lg-6 col-md-8"},i=Object(a["h"])("h3",{class:"text-center fw-bold"},"購買人資料",-1),b=Object(a["h"])("p",null,[Object(a["h"])("span",{class:"text-danger"},"*"),Object(a["g"])("為必填")],-1),d={class:"mb-3"},u=Object(a["h"])("label",{for:"name",class:"form-label"},[Object(a["g"])("姓名 "),Object(a["h"])("span",{class:"text-danger"},"*")],-1),m={class:"mb-3"},h=Object(a["h"])("label",{for:"email",class:"form-label"},[Object(a["g"])("Email "),Object(a["h"])("span",{class:"text-danger"},"*")],-1),p={class:"mb-3"},j=Object(a["h"])("label",{for:"tel",class:"form-label"},[Object(a["g"])("手機 "),Object(a["h"])("span",{class:"text-danger"},"*")],-1),O={class:"mb-3"},f=Object(a["h"])("label",{for:"address",class:"form-label"},[Object(a["g"])("地址 "),Object(a["h"])("span",{class:"text-danger"},"*")],-1),v={class:"mb-3"},y=Object(a["h"])("label",{for:"paymentMethod",class:"form-label"},[Object(a["g"])("付款方式 "),Object(a["h"])("span",{class:"text-danger"},"*")],-1),g=Object(a["h"])("option",{value:"",selected:"",disabled:""},"請輸入付款方式",-1),k=Object(a["h"])("option",{value:"WebATM"},"WebATM",-1),x=Object(a["h"])("option",{value:"ATM"},"ATM",-1),w=Object(a["h"])("option",{value:"信用卡"},"信用卡",-1),V=Object(a["h"])("option",{value:"ApplePay"},"ApplePay",-1),A=Object(a["h"])("option",{value:"GooglePay"},"GooglePay",-1),S={class:"mb-3"},M=Object(a["h"])("label",{for:"message",class:"form-label"},"留言",-1),B={class:"mb-3 d-flex justify-content-center"},P=Object(a["h"])("button",{class:"btn btn-primary",type:"submit"},"送出訂單",-1);function T(e,t,c,T,U,$){var C=Object(a["y"])("BuySteps"),E=Object(a["y"])("Field"),_=Object(a["y"])("ErrorMessage"),q=Object(a["y"])("Form");return Object(a["t"])(),Object(a["d"])("div",l,[s,Object(a["h"])("div",n,[Object(a["h"])(C,{step:U.step},null,8,["step"]),Object(a["h"])("div",r,[Object(a["h"])("div",o,[i,b,Object(a["h"])(q,{onSubmit:$.sendOrder},{default:Object(a["J"])((function(c){var l=c.errors;return[Object(a["h"])("div",d,[u,Object(a["h"])(E,{id:"name",name:"姓名",type:"text",class:["form-control",{"is-invalid":l["姓名"]}],placeholder:"請輸入姓名",rules:"required",modelValue:U.user.name,"onUpdate:modelValue":t[1]||(t[1]=function(e){return U.user.name=e})},null,8,["class","modelValue"]),Object(a["h"])(_,{name:"姓名",class:"invalid-feedback"})]),Object(a["h"])("div",m,[h,Object(a["h"])(E,{id:"email",name:"email",type:"email",class:["form-control",{"is-invalid":l["email"]}],placeholder:"請輸入 Email",rules:"email|required",modelValue:U.user.email,"onUpdate:modelValue":t[2]||(t[2]=function(e){return U.user.email=e})},null,8,["class","modelValue"]),Object(a["h"])(_,{name:"email",class:"invalid-feedback"})]),Object(a["h"])("div",p,[j,Object(a["h"])(E,{id:"tel",name:"手機",type:"tel",class:["form-control",{"is-invalid":l["手機"]}],placeholder:"請輸入手機",rules:$.isPhone,modelValue:U.user.tel,"onUpdate:modelValue":t[3]||(t[3]=function(e){return U.user.tel=e})},null,8,["class","rules","modelValue"]),Object(a["h"])(_,{name:"手機",class:"invalid-feedback"})]),Object(a["h"])("div",O,[f,Object(a["h"])(E,{id:"address",name:"地址",type:"text",class:["form-control",{"is-invalid":l["地址"]}],placeholder:"請輸入地址",rules:"required",modelValue:U.user.address,"onUpdate:modelValue":t[4]||(t[4]=function(e){return U.user.address=e})},null,8,["class","modelValue"]),Object(a["h"])(_,{name:"地址",class:"invalid-feedback"})]),Object(a["h"])("div",v,[y,Object(a["h"])(E,{id:"paymentMethod",name:"付款方式",class:["form-control",{"is-invalid":l["付款方式"]}],rules:"required",modelValue:U.user.payment_method,"onUpdate:modelValue":t[5]||(t[5]=function(e){return U.user.payment_method=e}),as:"select"},{default:Object(a["J"])((function(){return[g,k,x,w,V,A]})),_:2},1032,["class","modelValue"]),Object(a["h"])(_,{name:"付款方式",class:"invalid-feedback"})]),Object(a["h"])("div",S,[M,Object(a["h"])(E,{id:"message",name:"留言",type:"text",class:"form-control messageArea",placeholder:"請輸入留言",modelValue:U.message,"onUpdate:modelValue":t[6]||(t[6]=function(e){return U.message=e}),as:"textarea"},null,8,["modelValue"])]),Object(a["h"])("div",B,[Object(a["h"])("button",{class:"btn btn-outline-dark me-3",type:"button",onClick:t[7]||(t[7]=function(t){return e.$router.push("/cart")})},"上一步"),P])]})),_:1},8,["onSubmit"])])])])])}c("99af");var U=c("826a"),$={data:function(){return{step:2,user:{name:"",email:"",tel:"",address:"",payment_method:""},message:""}},components:{BuySteps:U["a"]},methods:{isPhone:function(e){if(!e)return"手機 為必填";var t=/^(09)[0-9]{8}$/;return!!t.test(e)||"手機 須為正確的手機號碼"},sendOrder:function(){var e=this,t={data:{user:this.user,message:this.message}},c="".concat("https://vue3-course-api.hexschool.io/","api/").concat("jun0527","/order");this.$http.post(c,t).then((function(t){t.data.success?(e.emitter.emit("getCartData"),e.$router.push("/payment/".concat(t.data.orderId))):e.$swal({title:"訂單送出失敗！",showConfirmButton:!1,icon:"error",timer:2e3})})).catch((function(){e.$swal({title:"網頁發生錯誤，請重新整理此頁面！",showConfirmButton:!1,icon:"error",timer:2e3})}))}}};$.render=T;t["default"]=$},"826a":function(e,t,c){"use strict";var a=c("7a23"),l={class:"buySteps list-unstyled d-flex justify-content-evenly align-items-center\n    text-center px-6 mb-5"},s=Object(a["h"])("p",{class:"mb-0"},"1",-1),n=Object(a["h"])("p",{class:"mb-0"},"購物車列表確認",-1),r={key:0,class:"d-none d-md-block"},o=Object(a["h"])("i",{class:"bi bi-arrow-right-circle"},null,-1),i={key:1,class:"d-none d-md-block"},b=Object(a["h"])("i",{class:"bi bi-arrow-right-circle-fill"},null,-1),d=Object(a["h"])("p",{class:"mb-0"},"2",-1),u=Object(a["h"])("p",{class:"mb-0"},"填寫購買人資料",-1),m={key:2,class:"d-none d-md-block"},h=Object(a["h"])("i",{class:"bi bi-arrow-right-circle"},null,-1),p={key:3,class:"d-none d-md-block"},j=Object(a["h"])("i",{class:"bi bi-arrow-right-circle-fill"},null,-1),O=Object(a["h"])("p",{class:"mb-0"},"3",-1),f=Object(a["h"])("p",{class:"mb-0"},"確認付款",-1);function v(e,t,c,v,y,g){return Object(a["t"])(),Object(a["d"])("ul",l,[Object(a["h"])("li",{class:["buyStepsItem d-md-block",{stepActive:c.step>=1,"d-none":1!==c.step}]},[s,n],2),1===c.step?(Object(a["t"])(),Object(a["d"])("li",r,[o])):(Object(a["t"])(),Object(a["d"])("li",i,[b])),Object(a["h"])("li",{class:["buyStepsItem d-md-block",{stepActive:c.step>=2,"d-none":2!==c.step}]},[d,u],2),c.step<=2?(Object(a["t"])(),Object(a["d"])("li",m,[h])):(Object(a["t"])(),Object(a["d"])("li",p,[j])),Object(a["h"])("li",{class:["buyStepsItem d-md-block",{stepActive:c.step>=3,"d-none":3!==c.step}]},[O,f],2)])}var y={data:function(){return{}},props:["step"]};y.render=v;t["a"]=y},8418:function(e,t,c){"use strict";var a=c("c04e"),l=c("9bf2"),s=c("5c6c");e.exports=function(e,t,c){var n=a(t);n in e?l.f(e,n,s(0,c)):e[n]=c}},"99af":function(e,t,c){"use strict";var a=c("23e7"),l=c("d039"),s=c("e8b5"),n=c("861d"),r=c("7b0b"),o=c("50c4"),i=c("8418"),b=c("65f0"),d=c("1dde"),u=c("b622"),m=c("2d00"),h=u("isConcatSpreadable"),p=9007199254740991,j="Maximum allowed index exceeded",O=m>=51||!l((function(){var e=[];return e[h]=!1,e.concat()[0]!==e})),f=d("concat"),v=function(e){if(!n(e))return!1;var t=e[h];return void 0!==t?!!t:s(e)},y=!O||!f;a({target:"Array",proto:!0,forced:y},{concat:function(e){var t,c,a,l,s,n=r(this),d=b(n,0),u=0;for(t=-1,a=arguments.length;t<a;t++)if(s=-1===t?n:arguments[t],v(s)){if(l=o(s.length),u+l>p)throw TypeError(j);for(c=0;c<l;c++,u++)c in s&&i(d,u,s[c])}else{if(u>=p)throw TypeError(j);i(d,u++,s)}return d.length=u,d}})},b0c0:function(e,t,c){var a=c("83ab"),l=c("9bf2").f,s=Function.prototype,n=s.toString,r=/^\s*function ([^ (]*)/,o="name";a&&!(o in s)&&l(s,o,{configurable:!0,get:function(){try{return n.call(this).match(r)[1]}catch(e){return""}}})}}]);
//# sourceMappingURL=chunk-397c0c03.b41dcc3e.js.map