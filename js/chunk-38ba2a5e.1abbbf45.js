(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-38ba2a5e"],{"1dde":function(t,e,o){var a=o("d039"),n=o("b622"),c=o("2d00"),i=n("species");t.exports=function(t){return c>=51||!a((function(){var e=[],o=e.constructor={};return o[i]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},8418:function(t,e,o){"use strict";var a=o("c04e"),n=o("9bf2"),c=o("5c6c");t.exports=function(t,e,o){var i=a(e);i in t?n.f(t,i,c(0,o)):t[i]=o}},"99af":function(t,e,o){"use strict";var a=o("23e7"),n=o("d039"),c=o("e8b5"),i=o("861d"),r=o("7b0b"),s=o("50c4"),l=o("8418"),d=o("65f0"),u=o("1dde"),b=o("b622"),h=o("2d00"),p=b("isConcatSpreadable"),f=9007199254740991,m="Maximum allowed index exceeded",v=h>=51||!n((function(){var t=[];return t[p]=!1,t.concat()[0]!==t})),O=u("concat"),j=function(t){if(!i(t))return!1;var e=t[p];return void 0!==e?!!e:c(t)},g=!v||!O;a({target:"Array",proto:!0,forced:g},{concat:function(t){var e,o,a,n,c,i=r(this),u=d(i,0),b=0;for(e=-1,a=arguments.length;e<a;e++)if(c=-1===e?i:arguments[e],j(c)){if(n=s(c.length),b+n>f)throw TypeError(m);for(o=0;o<n;o++,b++)o in c&&l(u,b,c[o])}else{if(b>=f)throw TypeError(m);l(u,b++,c)}return u.length=b,u}})},a434:function(t,e,o){"use strict";var a=o("23e7"),n=o("23cb"),c=o("a691"),i=o("50c4"),r=o("7b0b"),s=o("65f0"),l=o("8418"),d=o("1dde"),u=d("splice"),b=Math.max,h=Math.min,p=9007199254740991,f="Maximum allowed length exceeded";a({target:"Array",proto:!0,forced:!u},{splice:function(t,e){var o,a,d,u,m,v,O=r(this),j=i(O.length),g=n(t,j),w=arguments.length;if(0===w?o=a=0:1===w?(o=0,a=j-g):(o=w-2,a=h(b(c(e),0),j-g)),j+o-a>p)throw TypeError(f);for(d=s(O,a),u=0;u<a;u++)m=g+u,m in O&&l(d,u,O[m]);if(d.length=a,o<a){for(u=g;u<j-a;u++)m=u+a,v=u+o,m in O?O[v]=O[m]:delete O[v];for(u=j;u>j-a+o;u--)delete O[u-1]}else if(o>a)for(u=j-a;u>g;u--)m=u+a-1,v=u+o-1,m in O?O[v]=O[m]:delete O[v];for(u=0;u<o;u++)O[u+g]=arguments[u+2];return O.length=j-a+o,d}})},de8a:function(t,e,o){"use strict";o.r(e);var a=o("7a23"),n={class:"nav navbar navbar-expand-md fixed-top top-0 w-100 bg-dark"},c={class:"container"},i=Object(a["h"])("button",{class:"navbar-toggler mobileMenuBtn",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"},[Object(a["h"])("i",{class:"bi bi-list"})],-1),r=Object(a["h"])("h1",null,[Object(a["h"])("a",{class:"navbar-brand title",href:"#"},"Pinpin")],-1),s={class:"navbar-nav d-flex flex-row d-md-none position-relative"},l={href:"#",class:"nav-link cartBtn position-relative p-2","data-bs-toggle":"dropdown","aria-expanded":"false","data-bs-auto-close":"outside",ref:"mobileMyFavoriteList"},d=Object(a["h"])("i",{class:"bi bi-bookmark-star"},null,-1),u={key:0,class:"cartNum bg-danger"},b={class:"dropdownCartList dropdown-menu dropdown-menu-end p-4 overflow-auto\n          position-absolute"},h={href:"#",class:"nav-link cartBtn position-relative p-2","data-bs-toggle":"dropdown","aria-expanded":"false","data-bs-auto-close":"outside",ref:"mobileDropdownList"},p=Object(a["h"])("i",{class:"bi bi-cart3"},null,-1),f={key:0,class:"cartNum bg-danger"},m={class:"dropdownCartList dropdown-menu dropdown-menu-end p-4 overflow-auto\n          position-absolute"},v={key:0},O={class:"mobileMenu collapse navbar-collapse bg-dark",ref:"mobileMenu",id:"navbarSupportedContent"},j={class:"navbar-nav me-auto mb-2 mb-md-0"},g={class:"nav-item"},w=Object(a["g"])("首頁"),y={class:"nav-item"},C=Object(a["g"])("拼圖列表"),D={class:"nav-item"},k=Object(a["g"])("客製拼圖"),L={class:"dropdown d-none flex-row d-md-flex"},F={href:"#",class:"nav-link cartBtn position-relative p-2 me-3","data-bs-toggle":"dropdown","aria-expanded":"false","data-bs-auto-close":"outside",ref:"myFavoriteList"},x=Object(a["h"])("i",{class:"bi bi-bookmark-star"},null,-1),B={key:0,class:"cartNum bg-danger"},P={class:"dropdownCartList dropdown-menu dropdown-menu-end p-4 overflow-auto\n          position-absolute"},$={href:"#",class:"nav-link cartBtn position-relative p-2",id:"dropdownMenuButton1","data-bs-toggle":"dropdown","aria-expanded":"false","data-bs-auto-close":"outside",ref:"dropdownList"},N=Object(a["h"])("i",{class:"bi bi-cart3"},null,-1),M={key:0,class:"cartNum bg-danger"},q={class:"dropdownCartList dropdown-menu dropdown-menu-end p-4 overflow-auto"},S={key:0},A={class:"footer bg-dark d-flex"},J={class:"container d-flex justify-content-between align-items-center py-6"},T=Object(a["h"])("a",{class:"title text-white me-4",href:"#"},"Pinpin",-1),G=Object(a["h"])("p",{class:"text-white mb-0"},"Copyright © Pinpin 2021 | 僅個人作品，無商業用途",-1);function _(t,e,o,_,E,z){var I=Object(a["y"])("DropdownFavoriteList"),Q=Object(a["y"])("DropdownCartList"),U=Object(a["y"])("router-link"),H=Object(a["y"])("router-view");return Object(a["t"])(),Object(a["d"])(a["a"],null,[Object(a["h"])("nav",n,[Object(a["h"])("div",c,[i,r,Object(a["h"])("div",s,[Object(a["h"])("div",null,[Object(a["h"])("a",l,[d,0!==E.myFavorite.length?(Object(a["t"])(),Object(a["d"])("span",u,Object(a["B"])(E.myFavorite.length),1)):Object(a["e"])("",!0)],512),Object(a["h"])("div",b,[Object(a["h"])(I,{listName:"mobileMyFavoriteList",onCloseDropdownList:z.closeDropdownList,onGetFavoriteData:z.getFavoriteData},null,8,["onCloseDropdownList","onGetFavoriteData"])])]),Object(a["h"])("div",null,[Object(a["h"])("a",h,[p,0!==E.cartData.carts.length?(Object(a["t"])(),Object(a["d"])("span",f,Object(a["B"])(E.cartData.carts.length),1)):Object(a["e"])("",!0)],512),Object(a["h"])("div",m,["{}"!==JSON.stringify(E.cartData)?(Object(a["t"])(),Object(a["d"])("div",v,[Object(a["h"])(Q,{cartData:E.cartData,listName:"mobileDropdownList",onGetCartData:z.getCartData,onCloseDropdownList:z.closeDropdownList},null,8,["cartData","onGetCartData","onCloseDropdownList"])])):Object(a["e"])("",!0)])])]),Object(a["h"])("div",O,[Object(a["h"])("ul",j,[Object(a["h"])("li",g,[Object(a["h"])(U,{class:"nav-link",to:"/",onClick:z.closeCollapse},{default:Object(a["J"])((function(){return[w]})),_:1},8,["onClick"])]),Object(a["h"])("li",y,[Object(a["h"])(U,{class:"nav-link",to:"/products",onClick:z.closeCollapse},{default:Object(a["J"])((function(){return[C]})),_:1},8,["onClick"])]),Object(a["h"])("li",D,[Object(a["h"])(U,{class:"nav-link",to:"/customization",onClick:z.closeCollapse},{default:Object(a["J"])((function(){return[k]})),_:1},8,["onClick"])])])],512),Object(a["h"])("div",L,[Object(a["h"])("div",null,[Object(a["h"])("a",F,[x,0!==E.myFavorite.length?(Object(a["t"])(),Object(a["d"])("span",B,Object(a["B"])(E.myFavorite.length),1)):Object(a["e"])("",!0)],512),Object(a["h"])("div",P,[Object(a["h"])("div",null,[Object(a["h"])(I,{listName:"myFavoriteList",onCloseDropdownList:z.closeDropdownList,onGetFavoriteData:z.getFavoriteData},null,8,["onCloseDropdownList","onGetFavoriteData"])])])]),Object(a["h"])("div",null,[Object(a["h"])("a",$,[N,0!==E.cartData.carts.length?(Object(a["t"])(),Object(a["d"])("span",M,Object(a["B"])(E.cartData.carts.length),1)):Object(a["e"])("",!0)],512),Object(a["h"])("div",q,["{}"!==JSON.stringify(E.cartData)?(Object(a["t"])(),Object(a["d"])("div",S,[Object(a["h"])(Q,{cartData:E.cartData,listName:"dropdownCartList",onGetCartData:z.getCartData,onCloseDropdownList:z.closeDropdownList},null,8,["cartData","onGetCartData","onCloseDropdownList"])])):Object(a["e"])("",!0)])])])])]),Object(a["h"])(H),Object(a["h"])("footer",A,[Object(a["h"])("div",J,[T,G,Object(a["h"])("button",{type:"button",class:"btn btn-outline-light d-none d-md-block",onClick:e[1]||(e[1]=function(e){return t.$router.push("/admin")})},"管理員登入")])])],64)}o("99af");var E=o("7b17"),z={key:0},I=Object(a["h"])("h2",{class:"h3 text-center fw-bold"},"購物車列表",-1),Q={class:"list-unstyled m-0"},U={class:"cartPictureArea me-2"},H={class:"productContent"},K={class:"h6 mb-0"},R={class:"mb-0"},V={class:"d-flex align-items-center"},W=Object(a["h"])("i",{class:"icon bi bi-dash-square"},null,-1),X=Object(a["h"])("i",{class:"hover bi bi-dash-square-fill"},null,-1),Y={class:"qty"},Z=Object(a["h"])("i",{class:"icon bi bi-plus-square"},null,-1),tt=Object(a["h"])("i",{class:"hover bi bi-plus-square-fill"},null,-1),et=Object(a["h"])("i",{class:"bi bi-x text-dark"},null,-1),ot={class:"d-flex justify-content-end align-items-center py-2"},at=Object(a["h"])("p",{class:"mb-0"},"總金額",-1),nt={class:"totalPrice fw-bold mb-0 ms-3"},ct={class:"d-flex justify-content-end"},it={key:1},rt=Object(a["h"])("h2",{class:"h3 text-center mb-3"},"購物車中沒有產品",-1),st={class:"d-flex justify-content-center"};function lt(t,e,o,n,c,i){return 0!==o.cartData.carts.length?(Object(a["t"])(),Object(a["d"])("div",z,[I,Object(a["h"])("ul",Q,[(Object(a["t"])(!0),Object(a["d"])(a["a"],null,Object(a["x"])(o.cartData.carts,(function(e){return Object(a["t"])(),Object(a["d"])("li",{class:"productLi d-flex align-items-center justify-content-between",key:e.id,onClick:function(t){return i.toOtherPages("product",e.product.id)}},[Object(a["h"])("div",U,[Object(a["h"])("img",{src:e.product.imageUrl,alt:"產品圖片",class:{straight:"直"===e.product.category,horizontal:"橫"===e.product.category}},null,10,["src"])]),Object(a["h"])("div",H,[Object(a["h"])("h3",K,"【"+Object(a["B"])(e.product.piece)+"】"+Object(a["B"])(e.product.title),1),Object(a["h"])("p",R,"NT$"+Object(a["B"])(t.toCurrency(e.product.price)),1),Object(a["h"])("div",V,[Object(a["h"])("button",{class:"qtyBtn",type:"button",onClick:Object(a["L"])((function(t){return i.changeQty(e,"reduce")}),["stop"]),disabled:1===e.qty},[W,X],8,["onClick","disabled"]),Object(a["h"])("span",Y,Object(a["B"])(e.qty),1),Object(a["h"])("button",{class:"qtyBtn",type:"button",onClick:Object(a["L"])((function(t){return i.changeQty(e,"add")}),["stop"])},[Z,tt],8,["onClick"])])]),Object(a["h"])("button",{class:"deleteBtn",onClick:Object(a["L"])((function(t){return i.deleteCartAlert(e)}),["stop"])},[et],8,["onClick"])],8,["onClick"])})),128)),Object(a["h"])("div",ot,[at,Object(a["h"])("p",nt," NT$"+Object(a["B"])(t.toCurrency(o.cartData.final_total)),1)]),Object(a["h"])("div",ct,[Object(a["h"])("button",{class:"w-100 btn btn-primary",type:"button",onClick:e[1]||(e[1]=function(t){return i.toOtherPages("cart")})},"結帳去")])])])):(Object(a["t"])(),Object(a["d"])("div",it,[rt,Object(a["h"])("div",st,[Object(a["h"])("button",{type:"button",class:"btn btn-primary",onClick:e[2]||(e[2]=function(t){return i.toOtherPages("products")})},"開始選購")])]))}var dt={emits:["getCartData","closeDropdownList"],props:["cartData","listName"],methods:{changeQty:function(t,e){var o=this,a=t.qty;"add"===e?a+=1:a-=1;var n={data:{product_id:t.id,qty:a}},c="".concat("https://vue3-course-api.hexschool.io/","api/").concat("jun0527","/cart/").concat(t.id);this.$http.put(c,n).then((function(e){e.data.success?(o.$emit("getCartData"),o.$swal({html:'<span class="fw-bold">【'.concat(t.product.piece,"】").concat(t.product.title,"</span>購買數量改為").concat(e.data.data.qty,"！"),showConfirmButton:!1,icon:"success",timer:3e3})):o.$swal({html:'<span class="fw-bold">【'.concat(t.product.piece,"】").concat(t.product.title,"</span>購買數量修改失敗！"),showConfirmButton:!1,icon:"error",timer:3e3})})).catch((function(){o.$swal({title:"網頁發生錯誤，請重新整理此頁面！",showConfirmButton:!1,icon:"error",timer:2e3})}))},deleteCartAlert:function(t){var e=this;this.$swal({title:"刪除確認",html:'<p>確定要將<span class="fw-bold">【'.concat(t.product.piece,"】").concat(t.product.title,"</span>從購物車刪除？</p>"),showCancelButton:!0,confirmButtonClass:"btn btn-danger me-3",confirmButtonText:"刪除",cancelButtonText:"取消"}).then((function(o){o.value&&e.deleteCart(t)}))},deleteCart:function(t){var e=this,o="".concat("https://vue3-course-api.hexschool.io/","api/").concat("jun0527","/cart/").concat(t.id);this.$http.delete(o).then((function(o){o.data.success?(e.$emit("getCartData"),e.$swal({html:'將<span class="fw-bold">【'.concat(t.product.piece,"】").concat(t.product.title,"</span>從購物車中刪除！"),showConfirmButton:!1,icon:"success",timer:3e3})):e.$swal({title:"購物車刪除失敗！",showConfirmButton:!1,icon:"error",timer:2e3})})).catch((function(){e.$swal({title:"網頁發生錯誤，請重新整理此頁面！",showConfirmButton:!1,icon:"error",timer:2e3})}))},toOtherPages:function(t,e){"cart"===t?this.$router.push("/cart"):"product"===t?(this.$router.push("/product/".concat(e)),this.emitter.emit("getProductData",e)):"products"===t&&this.$router.push("/products"),this.$emit("closeDropdownList",this.listName)}}};dt.render=lt;var ut=dt,bt={key:0},ht=Object(a["h"])("h2",{class:"h3 text-center fw-bold"},"收藏列表",-1),pt={class:"list-unstyled m-0"},ft={class:"cartPictureArea me-2"},mt={class:"productContent"},vt={class:"h6 mb-0"},Ot={class:"mb-0 ps-2"},jt={class:"d-flex align-items-center"},gt=Object(a["h"])("i",{class:"bi bi-x text-dark"},null,-1),wt={key:1},yt=Object(a["h"])("h2",{class:"h3 text-center mb-3"},"收藏列表沒有產品",-1),Ct={class:"d-flex justify-content-center"};function Dt(t,e,o,n,c,i){return 0!==c.myFavoriteProducts.length?(Object(a["t"])(),Object(a["d"])("div",bt,[ht,Object(a["h"])("ul",pt,[(Object(a["t"])(!0),Object(a["d"])(a["a"],null,Object(a["x"])(c.myFavoriteProducts,(function(e,o){return Object(a["t"])(),Object(a["d"])("li",{class:"favoriteLi d-flex justify-content-between align-items-center",key:e.id,onClick:function(t){return i.toOtherPages("product",e.id)}},[Object(a["h"])("div",ft,[Object(a["h"])("img",{src:e.imageUrl,alt:"產品圖片",class:{straight:"直"===e.category,horizontal:"橫"===e.category}},null,10,["src"])]),Object(a["h"])("div",mt,[Object(a["h"])("h3",vt,"【"+Object(a["B"])(e.piece)+"】"+Object(a["B"])(e.title),1),Object(a["h"])("p",Ot,"NT$"+Object(a["B"])(t.toCurrency(e.price)),1)]),Object(a["h"])("div",jt,[Object(a["h"])("button",{class:"deleteBtn",onClick:Object(a["L"])((function(t){return i.deleteFavorite(e,o)}),["stop"])},[gt],8,["onClick"])])],8,["onClick"])})),128))])])):(Object(a["t"])(),Object(a["d"])("div",wt,[yt,Object(a["h"])("div",Ct,[Object(a["h"])("button",{type:"button",class:"btn btn-primary",onClick:e[1]||(e[1]=function(t){return i.toOtherPages("products")})},"產品列表")])]))}o("159b"),o("a434");var kt={save:function(t){var e=JSON.stringify(t);localStorage.setItem("pinpinFavorite",e)},get:function(){return JSON.parse(localStorage.getItem("pinpinFavorite"))}},Lt={data:function(){return{myFavorite:kt.get()||[],allProducts:[],myFavoriteProducts:[]}},emits:["getFavoriteData","closeDropdownList"],props:["listName"],methods:{getAllProductsData:function(){var t=this,e="".concat("https://vue3-course-api.hexschool.io/","api/").concat("jun0527","/products/all");this.$http.get(e).then((function(e){e.data.success?(t.allProducts=e.data.products,t.getFavoriteProducts()):t.$swal({title:"我的收藏讀取失敗！",showConfirmButton:!1,icon:"error",timer:2e3})})).catch((function(){t.$swal({title:"網頁發生錯誤，請重新整理此頁面！",showConfirmButton:!1,icon:"error",timer:2e3})}))},getFavoriteProducts:function(){var t=this;this.myFavoriteProducts=[],this.myFavorite.forEach((function(e){t.allProducts.forEach((function(o){e===o.id&&t.myFavoriteProducts.push(o)}))}))},deleteFavorite:function(t,e){this.myFavorite.splice(e,1),kt.save(this.myFavorite),this.$swal({title:"將".concat(t.title,"從收藏列表中移除！"),showConfirmButton:!1,icon:"success",timer:2e3}),this.$emit("getFavoriteData"),this.getAllProductsData(),this.emitter.emit("getFavorite",t)},toOtherPages:function(t,e){"cart"===t?this.$router.push("/cart"):"product"===t?(this.$router.push("/product/".concat(e)),this.emitter.emit("getProductData",e)):"products"===t&&this.$router.push("/products"),this.$emit("closeDropdownList",this.listName)}},mounted:function(){var t=this;this.getAllProductsData(),this.emitter.on("getfavoriteProduct",(function(){t.myFavorite=kt.get(),t.getAllProductsData()}))},unmounted:function(){var t=this;this.emitter.off("getfavoriteProduct",(function(){t.myFavorite=kt.get(),t.getAllProductsData()}))}};Lt.render=Dt;var Ft=Lt,xt={get:function(){return JSON.parse(localStorage.getItem("pinpinFavorite"))}},Bt={data:function(){return{menuCollapse:{},dropdownCartList:{},mobileDropdownList:{},mobileMyFavoriteList:{},myFavoriteList:{},cartData:{carts:[],total:3600,final_total:3700},myFavorite:xt.get()||[],allProducts:[],myFavoriteProducts:[]}},components:{DropdownCartList:ut,DropdownFavoriteList:Ft},methods:{closeCollapse:function(){this.menuCollapse.hide()},closeDropdownList:function(t){this[t].hide()},getFavoriteData:function(){this.myFavorite=xt.get()},getCartData:function(){var t=this,e="".concat("https://vue3-course-api.hexschool.io/","api/").concat("jun0527","/cart");this.$http.get(e).then((function(e){e.data.success?t.cartData=e.data.data:t.$swal({title:"購物車資料讀取失敗！",showConfirmButton:!1,icon:"error",timer:2e3})})).catch((function(){t.$swal({title:"網頁發生錯誤，請重新整理此頁面！",showConfirmButton:!1,icon:"error",timer:2e3})}))}},mounted:function(){var t=this;this.getCartData(),this.emitter.on("getCartData",(function(){t.getCartData()})),this.emitter.on("getfavoriteProduct",(function(){t.getFavoriteData()})),this.menuCollapse=new E["a"](this.$refs.mobileMenu,{toggle:!1}),this.dropdownCartList=new E["b"](this.$refs.dropdownList),this.mobileDropdownList=new E["b"](this.$refs.mobileDropdownList),this.myFavoriteList=new E["b"](this.$refs.myFavoriteList),this.mobileMyFavoriteList=new E["b"](this.$refs.mobileMyFavoriteList)},unmounted:function(){var t=this;this.emitter.off("getCartData",(function(){t.getCartData()})),this.emitter.off("getfavoriteProduct",(function(){t.getFavoriteData()}))}};Bt.render=_;e["default"]=Bt}}]);
//# sourceMappingURL=chunk-38ba2a5e.1abbbf45.js.map