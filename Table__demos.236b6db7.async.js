"use strict";(self.webpackChunkloki_ui=self.webpackChunkloki_ui||[]).push([[1561],{43948:function(R,M,n){n.r(M);var A=n(28152),d=n.n(A),p=n(50959),e=n(89594),O=n(58229),u=n(33503),r=n(90194),t=n(11527),i=function(l){for(var a=[],f=0;f<l;f++)a.push(f);return a},L=function(){return{firstName:r.We.person.firstName(),lastName:r.We.person.lastName(),age:r.We.number.int(40),visits:r.We.number.int(1e3),progress:r.We.number.int(100),status:r.We.helpers.shuffle(["relationship","complicated","single"])[0]}};function _(){for(var o=arguments.length,l=new Array(o),a=0;a<o;a++)l[a]=arguments[a];var f=function(){var s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0,c=l[s];return i(c).map(function(W){return L()})};return f()}var C=10,x={defaultCurrent:1,pageSize:5,hideOnSinglePage:!0,total:C},j=function(){var l=p.useState(function(){return _(C)}),a=d()(l,2),f=a[0],m=a[1],s=(0,p.useState)(x),c=d()(s,2),W=c[0],K=c[1],g=p.useMemo(function(){return[{accessorKey:"firstName",cell:function(E){return(0,t.jsx)(e.pj,{children:E.getValue()})}},{accessorFn:function(E){return E.lastName},id:"lastName",cell:function(E){return(0,t.jsx)(e.pj,{children:E.getValue()})},header:function(){return(0,t.jsx)(e.ss,{children:(0,t.jsx)("span",{children:"Last Name"})})}},{accessorKey:"age",cell:function(E){return(0,t.jsx)(e.pj,{children:E.getValue()})},header:function(){return(0,t.jsx)(e.ss,{children:"age"})}},{accessorKey:"visits",cell:function(E){return(0,t.jsx)(e.pj,{children:E.getValue()})},header:function(){return(0,t.jsx)(e.ss,{children:"visits"})}},{accessorKey:"status",cell:function(E){return(0,t.jsx)(e.pj,{children:E.getValue()})},header:function(){return(0,t.jsx)(e.ss,{children:"status"})}},{accessorKey:"progress",cell:function(E){return(0,t.jsx)(e.pj,{children:E.getValue()})},header:function(){return(0,t.jsx)(e.ss,{children:"Profile Progress"})}}]},[]),h=function(E){K(E?x:null)};return(0,t.jsxs)("div",{children:[(0,t.jsxs)("span",{className:"inline-flex items-center gap-2 pb-2",children:["\u662F\u5426\u5C55\u793APagination",(0,t.jsx)(O.Z,{defaultValue:!0,onChange:h})]}),(0,t.jsx)(u.ZP,{columns:g,dataSource:f,loading:!1,pagination:W})]})};M.default=j},13344:function(R,M,n){n.r(M);var A=n(50959),d=n(89594),p=n(33503),e=n(11527),O=function(){var r=A.useMemo(function(){return[{accessorKey:"firstName",cell:function(i){return(0,e.jsx)(d.pj,{children:i.getValue()})}},{accessorFn:function(i){return i.lastName},id:"lastName",cell:function(i){return(0,e.jsx)(d.pj,{children:i.getValue()})},header:function(){return(0,e.jsx)(d.ss,{children:(0,e.jsx)("span",{children:"Last Name"})})}},{accessorKey:"age",cell:function(i){return(0,e.jsx)(d.pj,{children:i.getValue()})},header:function(){return(0,e.jsx)(d.ss,{children:"age"})}},{accessorKey:"visits",cell:function(i){return(0,e.jsx)(d.pj,{children:i.getValue()})},header:function(){return(0,e.jsx)(d.ss,{children:"visits"})}},{accessorKey:"status",cell:function(i){return(0,e.jsx)(d.pj,{children:i.getValue()})},header:function(){return(0,e.jsx)(d.ss,{children:"status"})}},{accessorKey:"progress",cell:function(i){return(0,e.jsx)(d.pj,{children:i.getValue()})},header:function(){return(0,e.jsx)(d.ss,{children:"Profile Progress"})}}]},[]);return(0,e.jsx)(p.ZP,{columns:r,dataSource:[],loading:!1,pagination:{pageSize:5,total:0,hideOnSinglePage:!0},minHeight:200})};M.default=O},91091:function(R,M,n){n.r(M);var A=n(67855),d=n.n(A),p=n(28152),e=n.n(p),O=n(50959),u=n(89594),r=n(33503),t=n(29030),i=n(90194),L=n(79658),_=n(11527),C=function(f){for(var m=[],s=0;s<f;s++)m.push(s);return m},x=function(){return{firstName:i.We.person.firstName(),lastName:i.We.person.lastName(),age:i.We.number.int(40),visits:i.We.number.int(1e3),progress:i.We.number.int(100),status:i.We.helpers.shuffle(["relationship","complicated","single"])[0]}};function j(){for(var a=arguments.length,f=new Array(a),m=0;m<a;m++)f[m]=arguments[m];var s=function(){var W=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0,K=f[W];return C(K).map(function(g){return x()})};return s()}var o=function(){return new Promise(function(f){setTimeout(function(){f(j(6))},1e3)})},l=function(){var f=O.useState([]),m=e()(f,2),s=m[0],c=m[1],W=O.useState(!1),K=e()(W,2),g=K[0],h=K[1],P=(0,O.useRef)(null),E=(0,L.Z)(function(){if(!g){var v=P.current;v.scrollHeight-v.scrollTop-v.clientHeight<10&&(h(!0),o().then(function(D){c([].concat(d()(s),d()(D))),h(!1)}))}});(0,O.useEffect)(function(){h(!0),o().then(function(v){c(v),h(!1)})},[]),(0,O.useEffect)(function(){var v=P.current;return v.addEventListener("scroll",E),function(){v.removeEventListener("scroll",E)}},[]);var T=O.useMemo(function(){return[{accessorKey:"firstName",cell:function(D){return(0,_.jsx)(u.pj,{children:D.getValue()})}},{accessorFn:function(D){return D.lastName},id:"lastName",cell:function(D){return(0,_.jsx)(u.pj,{children:D.getValue()})},header:function(){return(0,_.jsx)(u.ss,{children:(0,_.jsx)("span",{children:"Last Name"})})}},{accessorKey:"age",cell:function(D){return(0,_.jsx)(u.pj,{children:D.getValue()})},header:function(){return(0,_.jsx)(u.ss,{children:"age"})}},{accessorKey:"visits",cell:function(D){return(0,_.jsx)(u.pj,{children:D.getValue()})},header:function(){return(0,_.jsx)(u.ss,{children:"visits"})}},{accessorKey:"status",cell:function(D){return(0,_.jsx)(u.pj,{children:D.getValue()})},header:function(){return(0,_.jsx)(u.ss,{children:"status"})}},{accessorKey:"progress",cell:function(D){return(0,_.jsx)(u.pj,{children:D.getValue()})},header:function(){return(0,_.jsx)(u.ss,{children:"Profile Progress"})}}]},[]);return(0,_.jsx)("div",{className:"p-8",children:(0,_.jsx)(r.ZP,{columns:T,dataSource:s,sticky:!0,pagination:null,minHeight:200,maxHeight:300,scrollRef:P,loading:g,loadingIcon:(0,_.jsx)(t.Z,{className:"w-20 h-20",src:"https://pic.rmb.bdstatic.com/ea4a3fb21fbe609806bd6d0a1e5de0ce.png"})})})};M.default=l},59151:function(R,M,n){n.r(M);var A=n(28152),d=n.n(A),p=n(50959),e=n(89594),O=n(33503),u=n(90194),r=n(11527),t=function(j){for(var o=[],l=0;l<j;l++)o.push(l);return o},i=function(){return{firstName:u.We.person.firstName(),lastName:u.We.person.lastName(),age:u.We.number.int(40),visits:u.We.number.int(1e3),progress:u.We.number.int(100),status:u.We.helpers.shuffle(["relationship","complicated","single"])[0]}};function L(){for(var x=arguments.length,j=new Array(x),o=0;o<x;o++)j[o]=arguments[o];var l=function(){var f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0,m=j[f];return t(m).map(function(s){return i()})};return l()}var _=function(){return new Promise(function(j){setTimeout(function(){j(L(10))},2e3)})},C=function(){var j=p.useState([]),o=d()(j,2),l=o[0],a=o[1],f=p.useState(!1),m=d()(f,2),s=m[0],c=m[1],W=p.useMemo(function(){return[{accessorKey:"firstName",cell:function(h){return(0,r.jsx)(e.pj,{children:h.getValue()})},header:function(){return(0,r.jsx)(e.ss,{children:"firstName"})}},{accessorFn:function(h){return h.lastName},id:"lastName",cell:function(h){return(0,r.jsx)(e.pj,{children:h.getValue()})},header:function(){return(0,r.jsx)(e.ss,{children:(0,r.jsx)("span",{children:"Last Name"})})}},{accessorKey:"age",cell:function(h){return(0,r.jsx)(e.pj,{children:h.getValue()})},header:function(){return(0,r.jsx)(e.ss,{children:"Age"})}},{accessorKey:"visits",cell:function(h){return(0,r.jsx)(e.pj,{children:h.getValue()})},header:function(){return(0,r.jsx)("span",{children:"Visits"})}},{accessorKey:"status",cell:function(h){return(0,r.jsx)(e.pj,{children:h.getValue()})},header:function(){return(0,r.jsx)(e.ss,{children:"Age"})}},{accessorKey:"progress",cell:function(h){return(0,r.jsx)(e.pj,{children:h.getValue()})},header:function(){return(0,r.jsx)(e.ss,{children:"Profile Progress"})}}]},[]),K=function(){c(!0),_().then(function(h){a(h),c(!1)})};return(0,p.useEffect)(function(){_().then(function(g){a(g)})},[]),(0,r.jsx)(O.ZP,{columns:W,dataSource:l,loading:s,pagination:{defaultCurrent:1,pageSize:10,total:100,onChange:K},minHeight:400})};M.default=C},78617:function(R,M,n){n.r(M);var A=n(28152),d=n.n(A),p=n(50959),e=n(89594),O=n(33503),u=n(90194),r=n(11527),t=function(o){for(var l=[],a=0;a<o;a++)l.push(a);return l},i=function(){return{firstName:u.We.person.firstName(),lastName:u.We.person.lastName(),age:u.We.number.int(40),visits:u.We.number.int(1e3),progress:u.We.number.int(100),status:u.We.helpers.shuffle(["relationship","complicated","single"])[0]}};function L(){for(var j=arguments.length,o=new Array(j),l=0;l<j;l++)o[l]=arguments[l];var a=function(){var m=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0,s=o[m];return t(s).map(function(c){return i()})};return a()}var _=30,C={defaultCurrent:1,pageSize:5,hideOnSinglePage:!0,total:_},x=function(){var o=p.useState(function(){return L(_)}),l=d()(o,2),a=l[0],f=l[1],m=p.useMemo(function(){return[{accessorKey:"firstName",cell:function(c){return(0,r.jsx)(e.pj,{children:c.getValue()})}},{accessorFn:function(c){return c.lastName},id:"lastName",cell:function(c){return(0,r.jsx)(e.pj,{children:c.getValue()})},header:function(){return(0,r.jsx)(e.ss,{children:(0,r.jsx)("span",{children:"Last Name"})})}},{accessorKey:"age",cell:function(c){return(0,r.jsx)(e.pj,{children:c.getValue()})},header:function(){return(0,r.jsx)(e.ss,{children:"age"})}},{accessorKey:"visits",cell:function(c){return(0,r.jsx)(e.pj,{children:c.getValue()})},header:function(){return(0,r.jsx)(e.ss,{children:"visits"})}},{accessorKey:"status",cell:function(c){return(0,r.jsx)(e.pj,{children:c.getValue()})},header:function(){return(0,r.jsx)(e.ss,{children:"status"})}},{accessorKey:"progress",cell:function(c){return(0,r.jsx)(e.pj,{children:c.getValue()})},header:function(){return(0,r.jsx)(e.ss,{children:"Profile Progress"})}}]},[]);return(0,r.jsx)(O.ZP,{columns:m,dataSource:a,pagination:null,maxHeight:400,sticky:!0})};M.default=x}}]);
