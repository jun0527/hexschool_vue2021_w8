(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-38b3b6fa"],{"1dde":function(e,t,r){var n=r("d039"),o=r("b622"),a=r("2d00"),c=o("species");e.exports=function(e){return a>=51||!n((function(){var t=[],r=t.constructor={};return r[c]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},"54e2":function(e,t,r){"use strict";r.r(t);var n=r("7a23"),o={class:"wrap"},a=Object(n["h"])("div",{class:"sigInBanner"},[Object(n["h"])("div",{class:"titleArea"},[Object(n["h"])("h2",null,"後台登入")])],-1),c={class:"container py-3 py-md-6"},i={class:"row justify-content-center px-4"},s=Object(n["h"])("h2",{class:"text-center"},"管理員登入",-1),l={class:"formGroup mb-3"},u=Object(n["h"])("label",{for:"email"},"帳號",-1),d={class:"formGroup mb-3"},f=Object(n["h"])("label",{for:"password"},"密碼",-1),m=Object(n["h"])("div",{class:"formGroup mb-3"},[Object(n["h"])("button",{type:"submit",class:"btn btn-primary w-100"},"登入")],-1);function b(e,t,r,b,p,h){var v=Object(n["y"])("Field"),j=Object(n["y"])("ErrorMessage"),O=Object(n["y"])("Form");return Object(n["t"])(),Object(n["d"])("div",o,[a,Object(n["h"])("div",c,[Object(n["h"])("div",i,[Object(n["h"])(O,{class:"signInArea col-lg-4 col-md-6 col-sm-8 p-4",onSubmit:t[3]||(t[3]=function(e){return h.signIn()})},{default:Object(n["J"])((function(e){var r=e.errors;return[s,Object(n["h"])("div",l,[u,Object(n["h"])(v,{type:"email",class:["form-control",{"is-invalid":r["email"]}],id:"email",name:"email",modelValue:p.user.username,"onUpdate:modelValue":t[1]||(t[1]=function(e){return p.user.username=e}),modelModifiers:{trim:!0},placeholder:"請輸入email",rules:"required|email"},null,8,["class","modelValue"]),Object(n["h"])(j,{class:"invalid-feedback",name:"email"})]),Object(n["h"])("div",d,[f,Object(n["h"])(v,{type:"password",class:["form-control",{"is-invalid":r["密碼"]}],id:"password",name:"密碼",modelValue:p.user.password,"onUpdate:modelValue":t[2]||(t[2]=function(e){return p.user.password=e}),modelModifiers:{trim:!0},placeholder:"請輸入密碼",rules:"required"},null,8,["class","modelValue"]),Object(n["h"])(j,{class:"invalid-feedback",name:"密碼"})]),m]})),_:1})])])])}r("99af");var p=r("1940"),h=r.n(p),v={data:function(){return{user:{username:"",password:""},token:"",expired:""}},methods:{signIn:function(){var e=this,t="".concat("https://vue3-course-api.hexschool.io/","admin/signin");this.$http.post(t,this.user).then((function(t){t.data.success?(e.token=t.data.token,e.expired=new Date(t.data.expired),document.cookie="vue2021_w7=".concat(e.token,"; expires=").concat(e.expired),h()("登入成功！"),e.$router.push("/admin/")):h()("登入失敗，請確認email及密碼是否正確！")})).catch((function(){e.$swal({title:"網頁發生錯誤，請重新整理此頁面！",showConfirmButton:!1,icon:"error",timer:2e3})}))}}};v.render=b;t["default"]=v},8418:function(e,t,r){"use strict";var n=r("c04e"),o=r("9bf2"),a=r("5c6c");e.exports=function(e,t,r){var c=n(t);c in e?o.f(e,c,a(0,r)):e[c]=r}},"99af":function(e,t,r){"use strict";var n=r("23e7"),o=r("d039"),a=r("e8b5"),c=r("861d"),i=r("7b0b"),s=r("50c4"),l=r("8418"),u=r("65f0"),d=r("1dde"),f=r("b622"),m=r("2d00"),b=f("isConcatSpreadable"),p=9007199254740991,h="Maximum allowed index exceeded",v=m>=51||!o((function(){var e=[];return e[b]=!1,e.concat()[0]!==e})),j=d("concat"),O=function(e){if(!c(e))return!1;var t=e[b];return void 0!==t?!!t:a(e)},w=!v||!j;n({target:"Array",proto:!0,forced:w},{concat:function(e){var t,r,n,o,a,c=i(this),d=u(c,0),f=0;for(t=-1,n=arguments.length;t<n;t++)if(a=-1===t?c:arguments[t],O(a)){if(o=s(a.length),f+o>p)throw TypeError(h);for(r=0;r<o;r++,f++)r in a&&l(d,f,a[r])}else{if(f>=p)throw TypeError(h);l(d,f++,a)}return d.length=f,d}})}}]);
//# sourceMappingURL=chunk-38b3b6fa.e9504ae8.js.map