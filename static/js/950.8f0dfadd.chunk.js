"use strict";(self.webpackChunkarco_design_pro=self.webpackChunkarco_design_pro||[]).push([[950,472,140],{3950:(e,t,a)=>{a.r(t),a.d(t,{default:()=>w});var r=a(4625),n=a(1402),o=a.n(n),l=a(1002),c=a(5362),i=a(3479),s=a(9562),p=a(3110),d=a(9662),m=a(4472),u=a(6146),k=a(8332);const w=function(){const[e,t]=(0,r.useState)([]),[a,n]=(0,r.useState)(!0),w=(0,d.Z)(m.default);function f(e){switch(e){case"activity":return"orangered";case"info":return"cyan";default:return"arcoblue"}}return(0,r.useEffect)((()=>{n(!0),o().get("/api/workplace/announcement").then((e=>{t(e.data)})).finally((()=>{n(!1)}))}),[]),(0,k.jsxs)(l.Z,{children:[(0,k.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,k.jsx)(c.default.Title,{heading:6,children:w["workplace.announcement"]}),(0,k.jsx)(i.Z,{children:w["workplace.seeMore"]})]}),(0,k.jsx)(s.Z,{loading:a,text:{rows:5,width:"100%"},animation:!0,children:(0,k.jsx)("div",{children:e.map((e=>(0,k.jsxs)("div",{className:u.default.item,children:[(0,k.jsx)(p.Z,{color:f(e.type),size:"small",children:w["workplace.".concat(e.type)]}),(0,k.jsx)("span",{className:u.default.link,children:e.content})]},e.key)))})})]})}},4472:(e,t,a)=>{a.r(t),a.d(t,{default:()=>r});const r={"en-US":{"workplace.welcomeBack":"Welcome Back,","workplace.totalOnlyData":"Total online data","workplace.contentInMarket":"Content in market","workplace.comments":"Comments","workplace.growth":"Growth","workplace.contentData":"Content Data","workplace.1year":"Nearly 1 Year","workplace.seeMore":"See More","workplace.popularContents":"Popular Contents","workplace.text":"Text","workplace.image":"Image","workplace.video":"Video","workplace.column.rank":"Rank","workplace.column.title":"Title","workplace.column.pv":"PV","workplace.column.increase":"Daily Increase","workplace.contentPercentage":"Percentage of content categories","workplace.shortcuts":"Shortcuts","workplace.manage":"Manage","workplace.contentMgmt":"Management","workplace.contentStatistic":"Statistic","workplace.advancedMgmt":"Advance","workplace.onlinePromotion":"Promotion","workplace.marketing":"Marketing","workplace.recent":"Recent","workplace.announcement":"Announcement","workplace.activity":"Activity","workplace.info":"Info","workplace.notice":"Notice","workplace.docs":"Document","workplace.pecs":"pecs","workplace.designLab":"DesignLab","workplace.materialMarket":"MaterialMarket","workplace.react":"React Quick Start","workplace.vue":"Vue Quick Start"},"zh-CN":{"workplace.welcomeBack":"\u6b22\u8fce\u56de\u6765\uff0c","workplace.totalOnlyData":"\u7ebf\u4e0a\u603b\u6570\u636e","workplace.contentInMarket":"\u6295\u653e\u4e2d\u7684\u5185\u5bb9","workplace.comments":"\u65e5\u65b0\u589e\u8bc4\u8bba","workplace.growth":"\u8f83\u6628\u65e5\u65b0\u589e","workplace.contentData":"\u5185\u5bb9\u6570\u636e","workplace.1year":"\u8fd11\u5e74","workplace.seeMore":"\u67e5\u770b\u66f4\u591a","workplace.popularContents":"\u7ebf\u4e0a\u70ed\u95e8\u5185\u5bb9","workplace.text":"\u6587\u672c","workplace.image":"\u56fe\u6587","workplace.video":"\u89c6\u9891","workplace.column.rank":"\u6392\u540d","workplace.column.title":"\u5185\u5bb9\u6807\u9898","workplace.column.pv":"\u70b9\u51fb\u91cf","workplace.column.increase":"\u65e5\u6da8\u5e45","workplace.contentPercentage":"\u5185\u5bb9\u7c7b\u522b\u5360\u6bd4","workplace.shortcuts":"\u5feb\u6377\u5165\u53e3","workplace.manage":"\u7ba1\u7406","workplace.contentMgmt":"\u5185\u5bb9\u7ba1\u7406","workplace.contentStatistic":"\u5185\u5bb9\u6570\u636e","workplace.advancedMgmt":"\u9ad8\u7ea7\u7ba1\u7406","workplace.onlinePromotion":"\u7ebf\u4e0a\u63a8\u5e7f","workplace.marketing":"\u5185\u5bb9\u6295\u653e","workplace.recent":"\u6700\u8fd1\u8bbf\u95ee","workplace.announcement":"\u516c\u544a","workplace.activity":"\u6d3b\u52a8","workplace.info":"\u6d88\u606f","workplace.notice":"\u901a\u77e5","workplace.docs":"\u6587\u6863\u4e2d\u5fc3","workplace.pecs":"\u4e2a","workplace.designLab":"\u98ce\u683c\u914d\u7f6e\u5e73\u53f0","workplace.materialMarket":"\u7269\u6599\u5e02\u573a","workplace.react":"React \u7ec4\u4ef6\u5e93","workplace.vue":"Vue \u7ec4\u4ef6\u5e93"}}},1002:(e,t,a)=>{a.d(t,{Z:()=>y});var r=a(4625),n=a(3408),o=a(46),l=function(){return l=Object.assign||function(e){for(var t,a=1,r=arguments.length;a<r;a++)for(var n in t=arguments[a])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},l.apply(this,arguments)},c=function(e,t){var a={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(a[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var n=0;for(r=Object.getOwnPropertySymbols(e);n<r.length;n++)t.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(a[r[n]]=e[r[n]])}return a};var i=r.forwardRef((function(e,t){var a,i=e.className,s=e.title,p=e.avatar,d=e.description,m=e.actionList,u=c(e,["className","title","avatar","description","actionList"]),k=(0,(0,r.useContext)(o.E_).getPrefixCls)("card-meta"),w=(0,n.Z)(k,i);return r.createElement("div",l({},u,{ref:t,className:w}),s||d?r.createElement("div",{className:k+"-content"},s&&r.createElement("div",{className:k+"-title"},s),d&&r.createElement("div",{className:k+"-description"},d)):null,p||m?r.createElement("div",{className:(0,n.Z)(k+"-footer ",(a={},a[k+"-footer-only-actions"]=!p,a))},p?r.createElement("div",{className:k+"-avatar"},p):null,m):null)}));i.displayName="CardMeta";const s=i;var p=r.forwardRef((function(e,t){var a,l=e.children,c=e.style,i=e.className,s=e.hoverable,p=(0,(0,r.useContext)(o.E_).getPrefixCls)("card-grid");return r.createElement("div",{ref:t,style:c,className:(0,n.Z)(p,(a={},a[p+"-hoverable"]=s,a),i)},l)}));p.displayName="CardGrid";const d=p;var m=a(2904),u=a(6099),k=function(){return k=Object.assign||function(e){for(var t,a=1,r=arguments.length;a<r;a++)for(var n in t=arguments[a])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},k.apply(this,arguments)},w=function(e,t){var a={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(a[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var n=0;for(r=Object.getOwnPropertySymbols(e);n<r.length;n++)t.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(a[r[n]]=e[r[n]])}return a},f={size:"default",bordered:!0};var v=r.forwardRef((function(e,t){var a,l,c=(0,r.useContext)(o.E_),i=c.getPrefixCls,p=c.loadingElement,v=c.componentConfig,y=c.rtl,g=(0,u.Z)(e,f,null===v||void 0===v?void 0:v.Card),h=g.className,b=g.children,N=g.bordered,x=g.loading,E=g.hoverable,C=g.size,O=g.title,j=g.extra,P=g.cover,S=g.actions,M=g.headerStyle,Z=g.bodyStyle,z=w(g,["className","children","bordered","loading","hoverable","size","title","extra","cover","actions","headerStyle","bodyStyle"]),D=i("card"),R=S&&S.length?r.createElement("div",{className:D+"-actions"},r.createElement("div",{className:D+"-actions-right"},S.map((function(e,t){return r.createElement("span",{key:"action-"+t,className:D+"-actions-item"},e)})))):null,_=!1,I=!1,L=r.Children.map(b,(function(e){if(e&&e.type)if(e.type===d)_=!0;else if(e.type===s)return I=!0,r.cloneElement(e,{actionList:R});return e}));return r.createElement("div",k({},z,{ref:t,className:(0,n.Z)(D,D+"-size-"+C,(a={},a[D+"-loading"]=x,a[D+"-bordered"]=N,a[D+"-hoverable"]=E,a[D+"-contain-grid"]=_,a[D+"-rtl"]=y,a),h)}),O||j?r.createElement("div",{className:(0,n.Z)(D+"-header",(l={},l[D+"-header-no-title"]=!O,l)),style:M},O&&r.createElement("div",{className:D+"-header-title"},O),j&&r.createElement("div",{className:D+"-header-extra"},j)):null,P?r.createElement("div",{className:D+"-cover"},P):null,r.createElement("div",{className:D+"-body",style:Z},x?p||r.createElement(m.Z,null):L,I?null:R))}));v.Meta=s,v.Grid=d,v.displayName="Card";const y=v},9562:(e,t,a)=>{a.d(t,{Z:()=>w});var r=a(4625),n=a(3408),o=a(6455);function l(e){var t,a=e.style,l=e.width,c=void 0===l?"60%":l,i=e.rows,s=void 0===i?3:i,p=e.className,d=e.prefixCls,m=(0,n.Z)(d+"-text",p),u=[];for(var k=0;k<s;k++)u.push(r.createElement("li",{className:d+"-text-row",key:k,style:{width:(t=k,(0,o.kJ)(c)?c[t]:s-1===t?c:void 0)}}));return r.createElement("ul",{className:m,style:a},u)}function c(e){var t,a=e.style,o=e.shape,l=void 0===o?"square":o,c=e.size,i=e.position,s=void 0===i?"left":i,p=e.className,d=e.prefixCls,m=(0,n.Z)(d+"-image",((t={})[d+"-image-"+s]=s,t[d+"-image-"+l]=l,t[d+"-image-"+c]=c,t),p);return r.createElement("div",{className:m,style:a})}var i=a(46),s=a(6099),p=a(4801),d=function(){return d=Object.assign||function(e){for(var t,a=1,r=arguments.length;a<r;a++)for(var n in t=arguments[a])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},d.apply(this,arguments)};function m(e){return(0,o.Kn)(e)?e:{}}var u={text:!0,loading:!0};var k=(0,r.forwardRef)((function(e,t){var a,o=(0,r.useContext)(i.E_),k=o.getPrefixCls,w=o.componentConfig,f=o.rtl,v=(0,s.Z)(e,u,null===w||void 0===w?void 0:w.Skeleton),y=v.style,g=v.className,h=v.animation,b=v.loading,N=v.image,x=v.text,E=v.children,C=m(N),O=m(x),j=k("skeleton"),P=(0,n.Z)(j,((a={})[j+"-animate"]=h,a[j+"-rtl"]=f,a),g);function S(){return N&&r.createElement("div",{className:j+"-header"},r.createElement(c,d({prefixCls:j},C)))}return r.createElement(r.Fragment,null,b?r.createElement("div",d({},(0,p.m)(v),{className:P,style:y,ref:t}),"right"!==C.position&&S(),x&&r.createElement("div",{className:j+"-content"},r.createElement(l,d({prefixCls:j},O))),"right"===C.position&&S()):E)}));k.displayName="Skeleton";const w=k},6146:(e,t,a)=>{a.r(t),a.d(t,{default:()=>r});const r={item:"item--YuvG1",link:"link--Tuzcr"}}}]);
//# sourceMappingURL=950.8f0dfadd.chunk.js.map