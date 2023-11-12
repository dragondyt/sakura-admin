"use strict";(self.webpackChunkarco_design_pro=self.webpackChunkarco_design_pro||[]).push([[695,472,545],{4472:(e,a,t)=>{t.r(a),t.d(a,{default:()=>r});const r={"en-US":{"workplace.welcomeBack":"Welcome Back,","workplace.totalOnlyData":"Total online data","workplace.contentInMarket":"Content in market","workplace.comments":"Comments","workplace.growth":"Growth","workplace.contentData":"Content Data","workplace.1year":"Nearly 1 Year","workplace.seeMore":"See More","workplace.popularContents":"Popular Contents","workplace.text":"Text","workplace.image":"Image","workplace.video":"Video","workplace.column.rank":"Rank","workplace.column.title":"Title","workplace.column.pv":"PV","workplace.column.increase":"Daily Increase","workplace.contentPercentage":"Percentage of content categories","workplace.shortcuts":"Shortcuts","workplace.manage":"Manage","workplace.contentMgmt":"Management","workplace.contentStatistic":"Statistic","workplace.advancedMgmt":"Advance","workplace.onlinePromotion":"Promotion","workplace.marketing":"Marketing","workplace.recent":"Recent","workplace.announcement":"Announcement","workplace.activity":"Activity","workplace.info":"Info","workplace.notice":"Notice","workplace.docs":"Document","workplace.pecs":"pecs","workplace.designLab":"DesignLab","workplace.materialMarket":"MaterialMarket","workplace.react":"React Quick Start","workplace.vue":"Vue Quick Start"},"zh-CN":{"workplace.welcomeBack":"\u6b22\u8fce\u56de\u6765\uff0c","workplace.totalOnlyData":"\u7ebf\u4e0a\u603b\u6570\u636e","workplace.contentInMarket":"\u6295\u653e\u4e2d\u7684\u5185\u5bb9","workplace.comments":"\u65e5\u65b0\u589e\u8bc4\u8bba","workplace.growth":"\u8f83\u6628\u65e5\u65b0\u589e","workplace.contentData":"\u5185\u5bb9\u6570\u636e","workplace.1year":"\u8fd11\u5e74","workplace.seeMore":"\u67e5\u770b\u66f4\u591a","workplace.popularContents":"\u7ebf\u4e0a\u70ed\u95e8\u5185\u5bb9","workplace.text":"\u6587\u672c","workplace.image":"\u56fe\u6587","workplace.video":"\u89c6\u9891","workplace.column.rank":"\u6392\u540d","workplace.column.title":"\u5185\u5bb9\u6807\u9898","workplace.column.pv":"\u70b9\u51fb\u91cf","workplace.column.increase":"\u65e5\u6da8\u5e45","workplace.contentPercentage":"\u5185\u5bb9\u7c7b\u522b\u5360\u6bd4","workplace.shortcuts":"\u5feb\u6377\u5165\u53e3","workplace.manage":"\u7ba1\u7406","workplace.contentMgmt":"\u5185\u5bb9\u7ba1\u7406","workplace.contentStatistic":"\u5185\u5bb9\u6570\u636e","workplace.advancedMgmt":"\u9ad8\u7ea7\u7ba1\u7406","workplace.onlinePromotion":"\u7ebf\u4e0a\u63a8\u5e7f","workplace.marketing":"\u5185\u5bb9\u6295\u653e","workplace.recent":"\u6700\u8fd1\u8bbf\u95ee","workplace.announcement":"\u516c\u544a","workplace.activity":"\u6d3b\u52a8","workplace.info":"\u6d88\u606f","workplace.notice":"\u901a\u77e5","workplace.docs":"\u6587\u6863\u4e2d\u5fc3","workplace.pecs":"\u4e2a","workplace.designLab":"\u98ce\u683c\u914d\u7f6e\u5e73\u53f0","workplace.materialMarket":"\u7269\u6599\u5e02\u573a","workplace.react":"React \u7ec4\u4ef6\u5e93","workplace.vue":"Vue \u7ec4\u4ef6\u5e93"}}},1695:(e,a,t)=>{t.r(a),t.d(a,{default:()=>f});var r=t(4625),o=t(5362),l=t(1002),n=t(3479),c=t(5187),i=t(1881),s=t(8584),p=t(1386),d=t(1402),k=t.n(d),m=t(9662),w=t(4472),u=t(7545),v=t(8332);const f=function(){const e=(0,m.Z)(w.default),[a,t]=(0,r.useState)(0),[d,f]=(0,r.useState)([]),[y,g]=(0,r.useState)(!0),[h,b]=(0,r.useState)(1),[x,N]=(0,r.useState)(0),C=(0,r.useCallback)((()=>{g(!0),k().get("/api/workplace/popular-contents?page=".concat(h,"&pageSize=5&category=").concat(a)).then((e=>{f(e.data.list),N(e.data.total)})).finally((()=>{g(!1)}))}),[h,a]);(0,r.useEffect)((()=>{C()}),[h,C]);const O=[{title:e["workplace.column.rank"],dataIndex:"rank",width:65},{title:e["workplace.column.title"],dataIndex:"title",render:e=>(0,v.jsx)(o.default.Paragraph,{style:{margin:0},ellipsis:!0,children:e})},{title:e["workplace.column.pv"],dataIndex:"pv",width:100,render:e=>"".concat(e/1e3,"k")},{title:e["workplace.column.increase"],dataIndex:"increase",sorter:(e,a)=>e.increase-a.increase,width:110,render:e=>(0,v.jsxs)("span",{children:["".concat((100*e).toFixed(2),"%"),(0,v.jsx)("span",{className:u.default.symbol,children:e<0?(0,v.jsx)(s.Z,{style:{color:"rgb(var(--green-6))"}}):(0,v.jsx)(p.Z,{style:{color:"rgb(var(--red-6))"}})})]})}];return(0,v.jsxs)(l.Z,{children:[(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,v.jsx)(o.default.Title,{heading:6,children:e["workplace.popularContents"]}),(0,v.jsx)(n.Z,{children:e["workplace.seeMore"]})]}),(0,v.jsx)(c.Z.Group,{type:"button",value:a,onChange:t,options:[{label:e["workplace.text"],value:0},{label:e["workplace.image"],value:1},{label:e["workplace.video"],value:2}],style:{marginBottom:16}}),(0,v.jsx)(i.Z,{rowKey:"rank",columns:O,data:d,loading:y,tableLayoutFixed:!0,onChange:e=>{b(e.current)},pagination:{total:x,current:h,pageSize:5,simple:!0}})]})}},1002:(e,a,t)=>{t.d(a,{Z:()=>y});var r=t(4625),o=t(3408),l=t(46),n=function(){return n=Object.assign||function(e){for(var a,t=1,r=arguments.length;t<r;t++)for(var o in a=arguments[t])Object.prototype.hasOwnProperty.call(a,o)&&(e[o]=a[o]);return e},n.apply(this,arguments)},c=function(e,a){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&a.indexOf(r)<0&&(t[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)a.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(t[r[o]]=e[r[o]])}return t};var i=r.forwardRef((function(e,a){var t,i=e.className,s=e.title,p=e.avatar,d=e.description,k=e.actionList,m=c(e,["className","title","avatar","description","actionList"]),w=(0,(0,r.useContext)(l.E_).getPrefixCls)("card-meta"),u=(0,o.Z)(w,i);return r.createElement("div",n({},m,{ref:a,className:u}),s||d?r.createElement("div",{className:w+"-content"},s&&r.createElement("div",{className:w+"-title"},s),d&&r.createElement("div",{className:w+"-description"},d)):null,p||k?r.createElement("div",{className:(0,o.Z)(w+"-footer ",(t={},t[w+"-footer-only-actions"]=!p,t))},p?r.createElement("div",{className:w+"-avatar"},p):null,k):null)}));i.displayName="CardMeta";const s=i;var p=r.forwardRef((function(e,a){var t,n=e.children,c=e.style,i=e.className,s=e.hoverable,p=(0,(0,r.useContext)(l.E_).getPrefixCls)("card-grid");return r.createElement("div",{ref:a,style:c,className:(0,o.Z)(p,(t={},t[p+"-hoverable"]=s,t),i)},n)}));p.displayName="CardGrid";const d=p;var k=t(2904),m=t(6099),w=function(){return w=Object.assign||function(e){for(var a,t=1,r=arguments.length;t<r;t++)for(var o in a=arguments[t])Object.prototype.hasOwnProperty.call(a,o)&&(e[o]=a[o]);return e},w.apply(this,arguments)},u=function(e,a){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&a.indexOf(r)<0&&(t[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)a.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(t[r[o]]=e[r[o]])}return t},v={size:"default",bordered:!0};var f=r.forwardRef((function(e,a){var t,n,c=(0,r.useContext)(l.E_),i=c.getPrefixCls,p=c.loadingElement,f=c.componentConfig,y=c.rtl,g=(0,m.Z)(e,v,null===f||void 0===f?void 0:f.Card),h=g.className,b=g.children,x=g.bordered,N=g.loading,C=g.hoverable,O=g.size,E=g.title,j=g.extra,S=g.cover,P=g.actions,M=g.headerStyle,Z=g.bodyStyle,I=u(g,["className","children","bordered","loading","hoverable","size","title","extra","cover","actions","headerStyle","bodyStyle"]),D=i("card"),z=P&&P.length?r.createElement("div",{className:D+"-actions"},r.createElement("div",{className:D+"-actions-right"},P.map((function(e,a){return r.createElement("span",{key:"action-"+a,className:D+"-actions-item"},e)})))):null,L=!1,R=!1,_=r.Children.map(b,(function(e){if(e&&e.type)if(e.type===d)L=!0;else if(e.type===s)return R=!0,r.cloneElement(e,{actionList:z});return e}));return r.createElement("div",w({},I,{ref:a,className:(0,o.Z)(D,D+"-size-"+O,(t={},t[D+"-loading"]=N,t[D+"-bordered"]=x,t[D+"-hoverable"]=C,t[D+"-contain-grid"]=L,t[D+"-rtl"]=y,t),h)}),E||j?r.createElement("div",{className:(0,o.Z)(D+"-header",(n={},n[D+"-header-no-title"]=!E,n)),style:M},E&&r.createElement("div",{className:D+"-header-title"},E),j&&r.createElement("div",{className:D+"-header-extra"},j)):null,S?r.createElement("div",{className:D+"-cover"},S):null,r.createElement("div",{className:D+"-body",style:Z},N?p||r.createElement(k.Z,null):_,R?null:z))}));f.Meta=s,f.Grid=d,f.displayName="Card";const y=f},7545:(e,a,t)=>{t.r(a),t.d(a,{default:()=>r});const r={symbol:"symbol--Kwvee"}}}]);
//# sourceMappingURL=695.3f5df3ff.chunk.js.map