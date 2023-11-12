"use strict";(self.webpackChunkarco_design_pro=self.webpackChunkarco_design_pro||[]).push([[296,93,520,140,313,147,545,768],{3950:(e,t,n)=>{n.r(t),n.d(t,{default:()=>m});var c=n(4625),r=n(1402),a=n.n(r),o=n(1002),l=n(5362),s=n(3479),i=n(9562),d=n(3110),u=n(9662),p=n(4472),f=n(6146),h=n(8332);const m=function(){const[e,t]=(0,c.useState)([]),[n,r]=(0,c.useState)(!0),m=(0,u.Z)(p.default);function j(e){switch(e){case"activity":return"orangered";case"info":return"cyan";default:return"arcoblue"}}return(0,c.useEffect)((()=>{r(!0),a().get("/api/workplace/announcement").then((e=>{t(e.data)})).finally((()=>{r(!1)}))}),[]),(0,h.jsxs)(o.Z,{children:[(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,h.jsx)(l.default.Title,{heading:6,children:m["workplace.announcement"]}),(0,h.jsx)(s.Z,{children:m["workplace.seeMore"]})]}),(0,h.jsx)(i.Z,{loading:n,text:{rows:5,width:"100%"},animation:!0,children:(0,h.jsx)("div",{children:e.map((e=>(0,h.jsxs)("div",{className:f.default.item,children:[(0,h.jsx)(d.Z,{color:j(e.type),size:"small",children:m["workplace.".concat(e.type)]}),(0,h.jsx)("span",{className:f.default.link,children:e.content})]},e.key)))})})]})}},2093:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});n(4625);var c=n(8111),r=n(8332);const a=["//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/f7e8fc1e09c42e30682526252365be1c.jpg~tplv-uwbnlip3yd-webp.webp","//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/94e8dd2d6dc4efb2c8cfd82c0ff02a2c.jpg~tplv-uwbnlip3yd-webp.webp","//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/ec447228c59ae1ebe185bab6cd776ca4.jpg~tplv-uwbnlip3yd-webp.webp","//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/1d1580d2a5a1e27415ff594c756eabd8.jpg~tplv-uwbnlip3yd-webp.webp"];const o=function(){return(0,r.jsx)(c.Z,{indicatorType:"slider",showArrow:"never",autoPlay:!0,style:{width:"100%",height:160},children:a.map(((e,t)=>(0,r.jsx)("div",{children:(0,r.jsx)("img",{src:e,style:{width:280,transform:"translateY(-30px)"}})},t)))})}},4044:(e,t,n)=>{n.r(t),n.d(t,{default:()=>f});var c=n(4625),r=n(1002),a=n(5362),o=n(2904),l=n(6721),s=n(1402),i=n.n(s),d=n(9662),u=n(4472),p=n(8332);const f=function(){const e=(0,d.Z)(u.default),[t,n]=(0,c.useState)([]),[s,f]=(0,c.useState)(!0);return(0,c.useEffect)((()=>{f(!0),i().get("/api/workplace/content-percentage").then((e=>{n(e.data)})).finally((()=>{f(!1)}))}),[]),(0,p.jsxs)(r.Z,{children:[(0,p.jsx)(a.default.Title,{heading:6,children:e["workplace.contentPercentage"]}),(0,p.jsx)(o.Z,{loading:s,style:{display:"block"},children:(0,p.jsx)(l.DonutChart,{autoFit:!0,height:340,data:t,radius:.7,innerRadius:.65,angleField:"count",colorField:"type",color:["#21CCFF","#313CA9","#249EFF"],interactions:[{type:"element-single-selected"}],tooltip:{showMarkers:!1},label:{visible:!0,type:"spider",formatter:e=>"".concat((100*e.percent).toFixed(0),"%"),style:{fill:"#86909C",fontSize:14}},legend:{position:"bottom"},statistic:{title:{style:{fontSize:"14px",lineHeight:2,color:"rgb(--var(color-text-1))"},formatter:()=>"\u5185\u5bb9\u91cf"},content:{style:{fontSize:"16px",color:"rgb(--var(color-text-1))"},formatter:(e,t)=>{const n=t.reduce(((e,t)=>e+t.count),0);return Number(n).toLocaleString()}}}})})]})}},3542:(e,t,n)=>{n.r(t),n.d(t,{default:()=>u});n(4625);var c=n(1002),r=n(5362),a=n(3479),o=n(9662),l=n(4472),s=n(1313),i=n(8332);const d={react:"https://arco.design/react/docs/start",vue:"https://arco.design/vue/docs/start",designLab:"https://arco.design/themes",materialMarket:"https://arco.design/material/"};const u=function(){const e=(0,o.Z)(l.default);return(0,i.jsxs)(c.Z,{children:[(0,i.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,i.jsx)(r.default.Title,{heading:6,children:e["workplace.docs"]}),(0,i.jsx)(a.Z,{children:e["workplace.seeMore"]})]}),(0,i.jsx)("div",{className:s.default.docs,children:Object.entries(d).map((t=>{let[n,c]=t;return(0,i.jsx)(a.Z,{className:s.default.link,href:c,target:"_blank",children:e["workplace.".concat(n)]},n)}))})]})}},8499:(e,t,n)=>{n.r(t),n.d(t,{default:()=>j});n(4625);var c=n(3550),r=n(7054),a=n(7487),o=n(1695),l=n(4044),s=n(6828),i=n(3950),d=n(2093),u=n(3542),p=n(4147),f=n(8332);const{Row:h,Col:m}=c.default;const j=function(){return(0,f.jsxs)(r.Z,{size:16,align:"start",children:[(0,f.jsxs)(r.Z,{size:16,direction:"vertical",children:[(0,f.jsx)(a.default,{}),(0,f.jsxs)(h,{gutter:16,children:[(0,f.jsx)(m,{span:12,children:(0,f.jsx)(o.default,{})}),(0,f.jsx)(m,{span:12,children:(0,f.jsx)(l.default,{})})]})]}),(0,f.jsxs)(r.Z,{className:p.default.right,size:16,direction:"vertical",children:[(0,f.jsx)(s.default,{}),(0,f.jsx)(d.default,{}),(0,f.jsx)(i.default,{}),(0,f.jsx)(u.default,{})]})]})}},1695:(e,t,n)=>{n.r(t),n.d(t,{default:()=>y});var c=n(4625),r=n(5362),a=n(1002),o=n(3479),l=n(5187),s=n(1881),i=n(8584),d=n(1386),u=n(1402),p=n.n(u),f=n(9662),h=n(4472),m=n(7545),j=n(8332);const y=function(){const e=(0,f.Z)(h.default),[t,n]=(0,c.useState)(0),[u,y]=(0,c.useState)([]),[b,v]=(0,c.useState)(!0),[x,g]=(0,c.useState)(1),[w,k]=(0,c.useState)(0),O=(0,c.useCallback)((()=>{v(!0),p().get("/api/workplace/popular-contents?page=".concat(x,"&pageSize=5&category=").concat(t)).then((e=>{y(e.data.list),k(e.data.total)})).finally((()=>{v(!1)}))}),[x,t]);(0,c.useEffect)((()=>{O()}),[x,O]);const Z=[{title:e["workplace.column.rank"],dataIndex:"rank",width:65},{title:e["workplace.column.title"],dataIndex:"title",render:e=>(0,j.jsx)(r.default.Paragraph,{style:{margin:0},ellipsis:!0,children:e})},{title:e["workplace.column.pv"],dataIndex:"pv",width:100,render:e=>"".concat(e/1e3,"k")},{title:e["workplace.column.increase"],dataIndex:"increase",sorter:(e,t)=>e.increase-t.increase,width:110,render:e=>(0,j.jsxs)("span",{children:["".concat((100*e).toFixed(2),"%"),(0,j.jsx)("span",{className:m.default.symbol,children:e<0?(0,j.jsx)(i.Z,{style:{color:"rgb(var(--green-6))"}}):(0,j.jsx)(d.Z,{style:{color:"rgb(var(--red-6))"}})})]})}];return(0,j.jsxs)(a.Z,{children:[(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,j.jsx)(r.default.Title,{heading:6,children:e["workplace.popularContents"]}),(0,j.jsx)(o.Z,{children:e["workplace.seeMore"]})]}),(0,j.jsx)(l.Z.Group,{type:"button",value:t,onChange:n,options:[{label:e["workplace.text"],value:0},{label:e["workplace.image"],value:1},{label:e["workplace.video"],value:2}],style:{marginBottom:16}}),(0,j.jsx)(s.Z,{rowKey:"rank",columns:Z,data:u,loading:b,tableLayoutFixed:!0,onChange:e=>{g(e.current)},pagination:{total:w,current:x,pageSize:5,simple:!0}})]})}},6828:(e,t,n)=>{n.r(t),n.d(t,{default:()=>I});var c=n(4625),r=n(8446),a=n(1002),o=n(5362),l=n(3479),s=n(755),i=n(9578),d=n(7605),u=n(798),p=n(4299);function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);t&&(c=c.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,c)}return n}function h(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){(0,u.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function m(e,t){var n=(0,c.useContext)(p.P).prefixCls,r=void 0===n?"arco":n,a=e.spin,o=e.className,l=h(h({"aria-hidden":!0,focusable:!1,ref:t},e),{},{className:"".concat(o?o+" ":"").concat(r,"-icon ").concat(r,"-icon-storage")});return a&&(l.className="".concat(l.className," ").concat(r,"-icon-loading")),delete l.spin,delete l.isIcon,c.createElement("svg",(0,d.Z)({fill:"none",stroke:"currentColor",strokeWidth:"4",viewBox:"0 0 48 48"},l),c.createElement("path",{d:"M7 18h34v12H7V18ZM40 6H8a1 1 0 0 0-1 1v11h34V7a1 1 0 0 0-1-1ZM7 30h34v11a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V30Z"}),c.createElement("path",{d:"M13.02 36H13v.02h.02V36Z"}),c.createElement("path",{fill:"currentColor",stroke:"none",d:"M13 12v-2h-2v2h2Zm.02 0h2v-2h-2v2Zm0 .02v2h2v-2h-2Zm-.02 0h-2v2h2v-2ZM13 14h.02v-4H13v4Zm-1.98-2v.02h4V12h-4Zm2-1.98H13v4h.02v-4Zm1.98 2V12h-4v.02h4Z"}),c.createElement("path",{d:"M13.02 24H13v.02h.02V24Z"}))}var j=c.forwardRef(m);j.defaultProps={isIcon:!0},j.displayName="IconStorage";const y=j;var b=n(4470);function v(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);t&&(c=c.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,c)}return n}function x(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?v(Object(n),!0).forEach((function(t){(0,u.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):v(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function g(e,t){var n=(0,c.useContext)(p.P).prefixCls,r=void 0===n?"arco":n,a=e.spin,o=e.className,l=x(x({"aria-hidden":!0,focusable:!1,ref:t},e),{},{className:"".concat(o?o+" ":"").concat(r,"-icon ").concat(r,"-icon-mobile")});return a&&(l.className="".concat(l.className," ").concat(r,"-icon-loading")),delete l.spin,delete l.isIcon,c.createElement("svg",(0,d.Z)({fill:"none",stroke:"currentColor",strokeWidth:"4",viewBox:"0 0 48 48"},l),c.createElement("path",{d:"M17 14h14m6.125 28h-26.25C9.839 42 9 41.105 9 40V8c0-1.105.84-2 1.875-2h26.25C38.16 6 39 6.895 39 8v32c0 1.105-.84 2-1.875 2ZM22 33a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"}),c.createElement("circle",{cx:"24",cy:"33",r:"2",fill:"currentColor",stroke:"none"}))}var w=c.forwardRef(g);w.defaultProps={isIcon:!0},w.displayName="IconMobile";const k=w;function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);t&&(c=c.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,c)}return n}function Z(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){(0,u.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function C(e,t){var n=(0,c.useContext)(p.P).prefixCls,r=void 0===n?"arco":n,a=e.spin,o=e.className,l=Z(Z({"aria-hidden":!0,focusable:!1,ref:t},e),{},{className:"".concat(o?o+" ":"").concat(r,"-icon ").concat(r,"-icon-fire")});return a&&(l.className="".concat(l.className," ").concat(r,"-icon-loading")),delete l.spin,delete l.isIcon,c.createElement("svg",(0,d.Z)({fill:"none",stroke:"currentColor",strokeWidth:"4",viewBox:"0 0 48 48"},l),c.createElement("path",{d:"M17.577 27.477C20.022 22.579 17.041 12.98 24.546 6c0 0-1.156 15.55 5.36 17.181 2.145.537 2.68-5.369 4.289-8.59 0 0 .536 4.832 2.68 8.59 3.217 7.517-1 14.117-5.896 17.182-4.289 2.684-14.587 2.807-19.835-5.37-4.824-7.516 0-15.57 0-15.57s4.289 12.35 6.433 8.054Z"}))}var P=c.forwardRef(C);P.defaultProps={isIcon:!0},P.displayName="IconFire";const N=P;var M=n(9662),S=n(4472),E=n(3768),D=n(8332);const I=function(){const e=(0,M.Z)(S.default),t=[{title:e["workplace.contentMgmt"],key:"Content Management",icon:(0,D.jsx)(i.Z,{})},{title:e["workplace.contentStatistic"],key:"Content Statistic",icon:(0,D.jsx)(y,{})},{title:e["workplace.advancedMgmt"],key:"Advanced Management",icon:(0,D.jsx)(b.Z,{})},{title:e["workplace.onlinePromotion"],key:"Online Promotion",icon:(0,D.jsx)(k,{})},{title:e["workplace.marketing"],key:"Marketing",icon:(0,D.jsx)(N,{})}],n=[{title:e["workplace.contentStatistic"],key:"Content Statistic",icon:(0,D.jsx)(y,{})},{title:e["workplace.contentMgmt"],key:"Content Management",icon:(0,D.jsx)(i.Z,{})},{title:e["workplace.advancedMgmt"],key:"Advanced Management",icon:(0,D.jsx)(b.Z,{})}];function c(e){r.Z.info({content:(0,D.jsxs)("span",{children:["You clicked ",(0,D.jsx)("b",{children:e})]})})}return(0,D.jsxs)(a.Z,{children:[(0,D.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,D.jsx)(o.default.Title,{heading:6,children:e["workplace.shortcuts"]}),(0,D.jsx)(l.Z,{children:e["workplace.seeMore"]})]}),(0,D.jsx)("div",{className:E.default.shortcuts,children:t.map((e=>(0,D.jsxs)("div",{className:E.default.item,onClick:()=>c(e.key),children:[(0,D.jsx)("div",{className:E.default.icon,children:e.icon}),(0,D.jsx)("div",{className:E.default.title,children:e.title})]},e.key)))}),(0,D.jsx)(s.Z,{}),(0,D.jsx)("div",{className:E.default.recent,children:e["workplace.recent"]}),(0,D.jsx)("div",{className:E.default.shortcuts,children:n.map((e=>(0,D.jsxs)("div",{className:E.default.item,onClick:()=>c(e.key),children:[(0,D.jsx)("div",{className:E.default.icon,children:e.icon}),(0,D.jsx)("div",{className:E.default.title,children:e.title})]},e.key)))})]})}},6146:(e,t,n)=>{n.r(t),n.d(t,{default:()=>c});const c={item:"item--YuvG1",link:"link--Tuzcr"}},1313:(e,t,n)=>{n.r(t),n.d(t,{default:()=>c});const c={docs:"docs--xoyOv",link:"link--WU5HR"}},4147:(e,t,n)=>{n.r(t),n.d(t,{default:()=>c});const c={banner:"banner--UzyO3",content:"content--OyXPd",right:"right--HLZb7",panel:"panel--cfmJn"}},7545:(e,t,n)=>{n.r(t),n.d(t,{default:()=>c});const c={symbol:"symbol--Kwvee"}},3768:(e,t,n)=>{n.r(t),n.d(t,{default:()=>c});const c={shortcuts:"shortcuts--wBTsN",item:"item--C_DwQ",icon:"icon--NdKGr",title:"title--_EGfA",recent:"recent--ZKotA"}}}]);
//# sourceMappingURL=296.dc922fd7.chunk.js.map