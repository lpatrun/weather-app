(this["webpackJsonpweather-app"]=this["webpackJsonpweather-app"]||[]).push([[0],{11:function(e,a,t){e.exports={searchBox:"SearchComponent_searchBox__1ZxWF",searchBar:"SearchComponent_searchBar__VEl_O",mainBtn:"SearchComponent_mainBtn__2q34n"}},16:function(e,a,t){},20:function(e,a,t){e.exports=t(31)},25:function(e,a,t){},31:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),o=t(18),c=t.n(o),l=(t(25),t(16),t(9)),m=t(1),i=t(10),s=t(11),u=t.n(s);var h=function(){var e=Object(m.f)(),a=Object(n.useState)(""),t=Object(i.a)(a,2),o=t[0],c=t[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement("form",{onSubmit:function(a){e.push("/results/"+o),a.preventDefault(),c("")},className:u.a.searchBox,id:"parent"},r.a.createElement("input",{id:"child",type:"text",className:u.a.searchBar,placeholder:"Tra\u017eilica...",onChange:function(e){return c(e.target.value)},value:o,required:!0}),r.a.createElement("button",{type:"submit",className:u.a.mainBtn},"Tra\u017ei")))};var p=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(h,null))},f=t(7),d=t.n(f);var E=function(){var e="http://api.openweathermap.org/data/2.5/",a="26f7c14de162ddf380af26c56863bd3a",t=Object(n.useState)({}),o=Object(i.a)(t,2),c=o[0],l=o[1],s=Object(m.g)().id;return Object(n.useEffect)((function(){fetch("".concat(e,"weather?q=").concat(s,"&units=metric&lang=hr&appid=").concat(a)).then((function(e){return e.json()})).then((function(e){l(e)}))}),[s,e,a]),r.a.createElement("div",null,"undefined"!=typeof c.main?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:d.a.locationBox},c.name,", ",c.sys.country),r.a.createElement("div",{className:d.a.weatherBox},r.a.createElement("img",{src:"http://openweathermap.org/img/wn/".concat(c.weather[0].icon,"@2x.png"),alt:""}),r.a.createElement("div",{className:d.a.weatherBoxInfo},r.a.createElement("div",{className:d.a.temp},Math.round(c.main.temp)," \xb0C"),r.a.createElement("div",{className:d.a.realFeel},"Real feel: ",c.main.feels_like," \xb0C"),r.a.createElement("div",{className:d.a.weather},c.weather[0].description)))):"")};var _=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(h,null),r.a.createElement(E,null))};var w=function(){return r.a.createElement("div",{className:"main-container"},r.a.createElement(l.a,{basename:"/weather-app"},r.a.createElement(m.c,null,r.a.createElement(m.a,{exact:!0,path:"/",component:p}),r.a.createElement(m.a,{path:"/results/:id",component:_}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(w,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},7:function(e,a,t){e.exports={locationBox:"ResultsComponent_locationBox__2MlCJ",weatherBox:"ResultsComponent_weatherBox__fX3xQ",weatherBoxInfo:"ResultsComponent_weatherBoxInfo__mMceh",temp:"ResultsComponent_temp__3ErZq",realFeel:"ResultsComponent_realFeel__1UUoA",weather:"ResultsComponent_weather__5LnJo"}}},[[20,1,2]]]);
//# sourceMappingURL=main.1f61b3ef.chunk.js.map