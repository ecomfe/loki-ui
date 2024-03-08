"use strict";(self.webpackChunkloki_ui=self.webpackChunkloki_ui||[]).push([[4094],{4207:function(Ie,ce,o){var ve=o(84875),v=o.n(ve),pe=o(50959),F=o(11527),me=(0,pe.forwardRef)(function(N,U){var W=N.className,B=N.style;return(0,F.jsx)("span",{className:v()("animate-spin",W),style:B,ref:U,children:(0,F.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,F.jsx)("g",{id:"\xE5\x8A\xA0\xE8\xBD\xBD",children:(0,F.jsx)("path",{id:"Vector",d:"M3.4854 5.39349C2.04589 7.88681 2.90018 11.0751 5.39348 12.5146C7.88679 13.9541 11.075 13.0998 12.5145 10.6065C12.7216 10.2477 13.1803 10.1248 13.5391 10.3319C13.8978 10.539 14.0207 10.9977 13.8136 11.3565C11.9598 14.5673 7.85422 15.6673 4.64348 13.8136C1.43274 11.9599 0.33264 7.85425 2.18637 4.64349C4.0401 1.43274 8.14568 0.332638 11.3565 2.18638C12.8327 3.03868 13.8636 4.36865 14.3652 5.86713C14.4967 6.25992 14.2848 6.68492 13.892 6.8164C13.4992 6.94787 13.0742 6.73603 12.9427 6.34323C12.5529 5.17855 11.7536 4.14773 10.6064 3.48542C8.11312 2.04589 4.92492 2.90018 3.4854 5.39349Z",fill:"currentColor"})})})})}),L=function(U){var W=U.prefixCls,B=W===void 0?"loki":W,G=U.loading,$=U.className,fe=U.style,H=!!G;return H?(0,F.jsx)(me,{prefixCls:B,className:$,style:fe}):null};ce.Z=L},10866:function(Ie,ce,o){var ve=o(77117),v=o.n(ve),pe=o(28152),F=o.n(pe),me=o(95530),L=o.n(me),N=o(27566),U=o.n(N),W=o(2808),B=o(84875),G=o.n(B),$=o(50959),fe=o(4207),H=o(11527),D=["loading","prefixCls","type","size","iconStyle","disabled","className","children","icon","ghost","block","htmlType","width","onClick"],Se=(0,W.j)(G()("inline-flex items-center justify-center whitespace-nowrap rounded-[--border-radius-lg] text-[14px] leading-[22px]","transform transition-all gap-1 not-italic px-4 py-[5px] duration-200","disabled:cursor-not-allowed disabled:text-[--color-text-quaternary]"),{variants:{type:{primary:"bg-[--color-fill-button-temp] hover:bg-[--color-primary-hover] text-white active:bg-[--color-primary-active] disabled:bg-[--color-fill-tertiary]",outline:"border border-solid border-[--color-border-button-temp] text-[--color-primary-text] hover:border-[--color-primary-border-hover] hover:text-[--color-primary-text-hover] bg-[--color-bg-container] active:border-[--color-primary-active] active:text-[--color-primary-active] disabled:border-[--color-border] disabled:bg-[--color-fill-tertiary]",default:"border border-[--color-border] text-[--color-text] hover:text-[--color-primary-text-hover] hover:border-[--color-primary-border-hover] active:border-[--color-primary-active] active:text-[--color-primary-active] bg-[--color-bg-container] disabled:bg-[--color-fill-tertiary]",link:"text-[--color-primary-text] hover:text-[--color-primary-text-hover] active:text-[--color-primary-active]",text:"text-[--color-text-secondary] hover:text-[--color-text-tertiary] active:text-[--color-text]"},size:{xl:"h-10 text-[14px] leading-[22px] font-medium",l:"h-9 text-[14px] leading-[22px] font-medium",m:"h-8 text-[14px] leading-[22px]",s:"h-7 text-[14px] leading-[22px]",xs:"h-6 text-xs"}},defaultVariants:{type:"primary",size:"m"}});function j(w){if(U()(w)==="object"&&w){var R=w==null?void 0:w.delay;return R=!Number.isNaN(R)&&typeof R=="number"?R:0,{loading:R<=0,delay:R}}return{loading:!!w,delay:0}}var je=$.forwardRef(function(w,R){var $e=w.loading,ye=$e===void 0?!1:$e,Ce=w.prefixCls,Ae=Ce===void 0?"loki":Ce,ke=w.type,xe=ke===void 0?"primary":ke,J=w.size,we=J===void 0?"m":J,Me=w.iconStyle,Ee=w.disabled,Y=Ee===void 0?!1:Ee,Fe=w.className,Re=w.children,V=w.icon,he=w.ghost,ge=he===void 0?!1:he,Pe=w.block,be=Pe===void 0?!1:Pe,De=w.htmlType,Le=De===void 0?"button":De,Q=w.width,q=w.onClick,ee=L()(w,D),X=(0,$.useMemo)(function(){return j(ye)},[ye]),Te=(0,$.useState)(X.loading),r=F()(Te,2),e=r[0],u=r[1];$.useEffect(function(){var a=null;X.delay>0?a=setTimeout(function(){a=null,u(!0)},X.delay):u(X.loading);function d(){a&&(clearTimeout(a),a=null)}return d},[X]);var g=V&&!e?(0,H.jsx)("span",{className:"text-[16px]",style:Me,children:V}):(0,H.jsx)(fe.Z,{existIcon:!!V,prefixCls:Ae,loading:!!e}),p=(0,$.useMemo)(function(){var a=ee.style?ee.style:{};return Q&&(a.width=Q),a},[ee.style,Q]),n=(0,$.useCallback)(function(a){!Y&&(q==null||q(a))},[Y,q]);return(0,H.jsxs)("button",v()(v()({className:G()("loki-button",Se({type:xe,size:we}),Fe,{"bg-transparent":ge},{"w-full":be}),ref:R,type:Le,disabled:Y,onClick:n},ee),{},{style:v()({},p),children:[g,Re]}))});ce.Z=je},95661:function(Ie,ce,o){o.d(ce,{Z:function(){return Te}});var ve=o(13448),v=o.n(ve),pe=o(38887),F=o.n(pe),me=o(74815),L=o.n(me),N=o(67855),U=o.n(N),W=o(28152),B=o.n(W),G=o(77117),$=o.n(G),fe=o(84875),H=o.n(fe),D=o(50959),Se="AIGC_PC_EDITOR_LOCAL_MEDIAS",j=function(r){return r.error="error",r.success="success",r.uploading="uploading",r.removed="removed",r.waiting="waiting",r}({}),je=function(r){return r.uploadFailed="uploadFailed",r.overSize="overSize",r.sizeError="sizeError",r}({}),w=function(r){return r.video="video",r.image="image",r}({}),R=15,$e={overSize:"\u56FE\u7247\u8D85\u8FC7".concat(R,"M"),uploadFailed:"\u4E0A\u4F20\u5931\u8D25",sizeError:"\u77ED\u8FB9\u9700\u2265100px"};function ye(r,e){var u="cannot ".concat(r.method," ").concat(r.action," ").concat(e.status,"'"),g=new Error(u);return g.status=e.status,g.method=r.method,g.url=r.action,g}function Ce(r){var e=r.responseText||r.response;if(!e)return e;try{return JSON.parse(e)}catch(u){return e}}function Ae(r,e){return e=$()($()({},e),{},{action:r,method:"post"}),new Promise(function(u,g){var p=new XMLHttpRequest;e.onProgress&&p.upload&&(p.upload.onprogress=function(y){var E,f;y.total>0&&(y.percent=y.loaded/y.total*100),(E=(f=e).onProgress)===null||E===void 0||E.call(f,y)});var n=new FormData;e.data&&Object.keys(e.data).forEach(function(d){var y,E=(y=e.data)===null||y===void 0?void 0:y[d];if(Array.isArray(E)){E.forEach(function(f){n.append("".concat(d,"[]"),f)});return}n.append(d,E)}),e.file instanceof Blob?n.append(e.filename,e.file,e.file.name):n.append(e.filename,e.file),p.onerror=function(y){g(y)},p.onload=function(){if(p.status<200||p.status>=300){var y=ye(e,p);g(y)}else u(Ce(p))},p.open(e.method,e.action,!0),e.withCredentials&&"withCredentials"in p&&(p.withCredentials=!0);var a=e.headers||{};a["X-Requested-With"]!==null&&p.setRequestHeader("X-Requested-With","XMLHttpRequest"),Object.keys(a).forEach(function(d){a[d]!==null&&p.setRequestHeader(d,a[d])}),p.send(n)})}function ke(r){var e=r.file,u=r.url;return new Promise(function(g,p){var n=document.createElement("video"),a=e?URL.createObjectURL(e):u;n.onloadeddata=function(){g(n)},n.onerror=function(){p("video\u52A0\u8F7D\u5931\u8D25")},n.setAttribute("preload","auto"),n.src=a||""})}function xe(r){var e=r.file,u=r.url;return new Promise(function(g,p){var n=document.createElement("img"),a=e?URL.createObjectURL(e):u;n.src=a||"",n.onload=function(){g(n)},n.onerror=function(){p("image\u52A0\u8F7D\u5931\u8D25")}})}var J=function(e){return e.split("/")[0]},we=function(e){var u;return(u=e.split(".").pop())===null||u===void 0?void 0:u.toLowerCase()};function Me(r){return r==null?void 0:r.replace(/^http:\/\//,"https://")}function Ee(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:5242880,u=[],g=Math.ceil(r.size/e),p=File.prototype.slice,n=new FileReader,a=0,d=function(E){var f=a*E,C=f+E>=r.size?r.size:f+E,T=p.call(r,f,C);u.push({key:a,file:T}),n.readAsArrayBuffer(T)};return new Promise(function(y,E){try{d(e)}catch(f){E(f)}n.onload=function(){try{a+=1,a<g?d(e):y(u)}catch(f){E(f)}}})}function Y(r,e){return r>e}function Fe(r){var e,u,g=document.createElement("canvas"),p=(e=r.videoWidth)!==null&&e!==void 0?e:r.width,n=(u=r.videoHeight)!==null&&u!==void 0?u:r.height,a=p,d=n;Y(a,d)&&a>1280?(d=1280*d/a,a=1280):!Y(a,d)&&d>1280&&(a=1280*a/d,d=1280),g.width=a,g.height=d,g.getContext("2d").drawImage(r,0,0,a,d);var y=g.toDataURL("image/webp",.1);return{dataUrl:y,width:a,height:d}}function Re(r){return V.apply(this,arguments)}function V(){return V=L()(v()().mark(function r(e){return v()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.abrupt("return",new Promise(function(){var p=L()(v()().mark(function n(a){var d,y,E;return v()().wrap(function(C){for(;;)switch(C.prev=C.next){case 0:if(d=J(e.type),C.prev=1,d!==w.video){C.next=8;break}return C.next=5,ke({file:e});case 5:C.t0=C.sent,C.next=11;break;case 8:return C.next=10,xe({file:e});case 10:C.t0=C.sent;case 11:y=C.t0,E=Fe(y),a(E),C.next=19;break;case 16:C.prev=16,C.t1=C.catch(1),a({});case 19:case"end":return C.stop()}},n,null,[[1,16]])}));return function(n){return p.apply(this,arguments)}}()).catch(function(p){return{}}));case 1:case"end":return g.stop()}},r)})),V.apply(this,arguments)}function he(r){return ge.apply(this,arguments)}function ge(){return ge=L()(v()().mark(function r(e){var u,g,p,n,a,d,y,E,f,C,T,x,I,K,A,re,ae,te,_e,ne,ie,le,se=arguments;return v()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:if(g=se.length>1&&se[1]!==void 0?se[1]:!1,p=e.status,n=e.response,a=e.type,d=a===void 0?"":a,y=e.mid,E=e.timestamp,f=e.materialId,C=e.error||"",T=J(d),x=e.coverImage,I=e.width,K=e.height,!(!x&&g)){S.next=18;break}return S.next=8,Re(e);case 8:A=S.sent,re=A.dataUrl,x=re===void 0?"":re,ae=A.width,I=ae===void 0?0:ae,te=A.height,K=te===void 0?0:te,e.coverImage=x,e.width=I,e.height=K;case 18:return _e=p||"error",ne=Me(n==null?void 0:n.url),ie=f?{materialId:f}:{},le=$()({mid:y,timestamp:E,status:_e,type:T,duration:(u=n==null?void 0:n.duration)!==null&&u!==void 0?u:0,url:ne,thumbnail:x||ne,error:C,width:I,height:K,name:e.name},ie),S.abrupt("return",le);case 23:case"end":return S.stop()}},r)})),ge.apply(this,arguments)}function Pe(r,e,u){return be.apply(this,arguments)}function be(){return be=L()(v()().mark(function r(e,u,g){var p,n,a,d,y;return v()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:p=[],n=[],a=F()(u),f.prev=3,y=v()().mark(function C(){var T,x,I;return v()().wrap(function(A){for(;;)switch(A.prev=A.next){case 0:if(T=d.value,x=Promise.resolve().then(function(){return g(T)}),p.push(x),!(e<=u.length)){A.next=9;break}if(I=x.then(function(){return n.splice(n.indexOf(I),1)}),n.push(I),!(n.length>=e)){A.next=9;break}return A.next=9,Promise.race(n);case 9:case"end":return A.stop()}},C)}),a.s();case 6:if((d=a.n()).done){f.next=10;break}return f.delegateYield(y(),"t0",8);case 8:f.next=6;break;case 10:f.next=15;break;case 12:f.prev=12,f.t1=f.catch(3),a.e(f.t1);case 15:return f.prev=15,a.f(),f.finish(15);case 18:return f.abrupt("return",Promise.allSettled(p));case 19:case"end":return f.stop()}},r,null,[[3,12,15,18]])})),be.apply(this,arguments)}var De=0;function Le(){var r=+new Date;return"".concat(r).concat(++De)}var Q=o(11527),q=10,ee={upload:"/aigc/saas/pc/upload/v1/upload",preUpload:"/aigc/saas/pc/upload/v1/preBlockUpload",blockUpload:"/aigc/saas/pc/upload/v1/blockUpload",compositionUpload:"/aigc/saas/pc/upload/v1/compBlockUpload"},X=function(e){var u=e.action,g=e.accept,p=g===void 0?"image/jpg,image/png,video/mp4":g,n=e.drawCover,a=n===void 0?!1:n,d=e.children,y=e.className,E=e.customPost,f=e.disabled,C=e.data,T=C===void 0?{}:C,x=e.multiple,I=x===void 0?!1:x,K=e.maxCount,A=K===void 0?1:K,re=e.imageSize,ae=re===void 0?20:re,te=e.videoSize,_e=te===void 0?200:te,ne=e.minWithAndHeight,ie=ne===void 0?100:ne,le=e.onChange,se=e.maxUploadCount,Oe=se===void 0?1:se,S=ae*1024*1024,ze=_e*1024*1024,We="".concat(ae,"M"),Be="".concat(_e,"M");u=$()($()({},ee),u);var rr=(0,D.useState)([]),Ke=B()(rr,2),sr=Ke[0],ar=Ke[1],tr=(0,D.useState)([]),Ne=B()(tr,2),ue=Ne[0],He=Ne[1],Z=(0,D.useRef)([]),Ue=(0,D.useRef)(null),oe=E||Ae,Ve=(0,D.useCallback)(function(b,m){var t=new FormData;return Object.keys(m).forEach(function(l){t.append(l,m[l])}),new Promise(function(l,h){oe(b,t).then(function(i){+i.errno==0?l(i):h(i.errmsg)}).catch(function(i){h(i)})})},[oe]),Xe=(0,D.useCallback)(function(b){Z.current=Z.current.filter(function(m){return m.mid!==b.mid}),ar(U()(Z.current))},[]),M=(0,D.useCallback)(function(){var b=L()(v()().mark(function m(t){var l,h,i,s,P,c,O,de,k;return v()().wrap(function(_){for(;;)switch(_.prev=_.next){case 0:l=t.file,h=t.fileList,i=t.first,s=h!=null&&h.length?h:[l],P=F()(s),_.prev=3,P.s();case 5:if((c=P.n()).done){_.next=19;break}if(O=c.value,!i){_.next=12;break}return _.next=10,he(O,!1);case 10:de=_.sent,le(de);case 12:return _.next=14,he(O,a);case 14:k=_.sent,(k.status===j.success||k.status===j.error)&&Xe(O),le(k);case 17:_.next=5;break;case 19:_.next=24;break;case 21:_.prev=21,_.t0=_.catch(3),P.e(_.t0);case 24:return _.prev=24,P.f(),_.finish(24);case 27:case"end":return _.stop()}},m,null,[[3,21,24,27]])}));return function(m){return b.apply(this,arguments)}}(),[a,Xe,le]),z=(0,D.useCallback)(function(b){var m=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"\u4E0A\u4F20\u5931\u8D25";b.status=j.error,b.error=m,M({file:b})},[M]),Ze=(0,D.useCallback)(function(){var b=L()(v()().mark(function m(t){var l;return v()().wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.prev=0,i.next=3,oe(u.preUpload,{fileExt:we(t.name)});case 3:if(l=i.sent,l.errno!==0){i.next=9;break}return t.uploadKey=l.data.uploadKey,i.abrupt("return",t);case 9:throw new Error(l.errmsg||"\u4E0A\u4F20\u5931\u8D25");case 10:i.next=16;break;case 12:throw i.prev=12,i.t0=i.catch(0),console.error(i.t0),i.t0;case 16:case"end":return i.stop()}},m,null,[[0,12]])}));return function(m){return b.apply(this,arguments)}}(),[oe]),Ge=(0,D.useCallback)(function(){var b=L()(v()().mark(function m(t,l){return v()().wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.abrupt("return",Pe(q,t,function(s){var P=s.key,c=s.file,O={uploadKey:l,chunk:P+1,file:c};return Ve(u.blockUpload,O)}));case 1:case"end":return i.stop()}},m)}));return function(m,t){return b.apply(this,arguments)}}(),[]),Je=(0,D.useCallback)(function(){var b=L()(v()().mark(function m(t){var l,h;return v()().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return l=4,h=function(){var P=L()(v()().mark(function c(){var O;return v()().wrap(function(k){for(;;)switch(k.prev=k.next){case 0:return k.prev=0,k.next=3,oe(u.compositionUpload,{uploadKey:t.uploadKey,chunks:t.chunks});case 3:if(O=k.sent,+O.errno!=0){k.next=10;break}t.response=O.data,t.status=j.success,M({file:t}),k.next=17;break;case 10:if(!(l>0)){k.next=16;break}return l--,k.next=14,h();case 14:k.next=17;break;case 16:z(t);case 17:k.next=28;break;case 19:if(k.prev=19,k.t0=k.catch(0),!(l>0)){k.next=27;break}return l--,k.next=25,h();case 25:k.next=28;break;case 27:z(t);case 28:case"end":return k.stop()}},c,null,[[0,19]])}));return function(){return P.apply(this,arguments)}}(),s.next=4,h();case 4:case"end":return s.stop()}},m)}));return function(m){return b.apply(this,arguments)}}(),[oe,M,z]),Ye=(0,D.useCallback)(function(){var b=L()(v()().mark(function m(t){var l,h;return v()().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,Ze(t);case 3:return s.next=5,Ee(t);case 5:return l=s.sent,h=l.length,t.chunks=h,s.next=10,Ge(l,t.uploadKey);case 10:return s.next=12,Je(t);case 12:s.next=17;break;case 14:s.prev=14,s.t0=s.catch(0),z(t);case 17:case"end":return s.stop()}},m,null,[[0,14]])}));return function(m){return b.apply(this,arguments)}}(),[Ze,Ge,Je,z]),Qe=(0,D.useCallback)(function(){var b=L()(v()().mark(function m(t){var l,h,i,s;return v()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return l=$()({file:t,fileExt:we(t.name)},T),c.prev=1,c.next=4,Ve(u.upload,l);case 4:i=c.sent,t.response=i.data,t.status=j.success,(h=i.data)!==null&&h!==void 0&&h.mid&&(t.materialId=(s=i.data)===null||s===void 0?void 0:s.mid),M==null||M({file:t}),c.next=14;break;case 11:c.prev=11,c.t0=c.catch(1),z(t);case 14:case"end":return c.stop()}},m,null,[[1,11]])}));return function(m){return b.apply(this,arguments)}}(),[M,z]),qe=(0,D.useCallback)(function(){var b=L()(v()().mark(function m(t){var l,h,i,s,P,c,O,de,k;return v()().wrap(function(_){for(;;)switch(_.prev=_.next){case 0:if(l=t.type,h=l===void 0?"":l,i=t.size,s=t.width,P=t.height,c=J(h),O=c===w.video,de=O?ze:S,k=O?Be:We,!(i>de)){_.next=8;break}return z(t,"\u56FE\u7247\u4E0D\u80FD\u8D85\u8FC7".concat(k)),_.abrupt("return");case 8:if(!(Math.min(s,P)<ie)){_.next=11;break}return z(t,"\u56FE\u7247\u5C3A\u5BF8\u8FC7\u5C0F\uFF0C\u5BBD\u548C\u9AD8\u9700".concat(ie,"px\u6216\u4EE5\u4E0A")),_.abrupt("return");case 11:if(!O){_.next=16;break}return _.next=14,Ye(t);case 14:_.next=18;break;case 16:return _.next=18,Qe(t);case 18:case"end":return _.stop()}},m)}));return function(m){return b.apply(this,arguments)}}(),[S,We,ze,Be,ie,Ye,Qe]),er=(0,D.useCallback)(function(){var b=L()(v()().mark(function m(t){var l,h,i,s;return v()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return l=t.map(function(O){return O.status=j.uploading,O}),c.next=3,M({fileList:l});case 3:h=F()(l),c.prev=4,h.s();case 6:if((i=h.n()).done){c.next=12;break}return s=i.value,c.next=10,qe(s);case 10:c.next=6;break;case 12:c.next=17;break;case 14:c.prev=14,c.t0=c.catch(4),h.e(c.t0);case 17:return c.prev=17,h.f(),c.finish(17);case 20:case"end":return c.stop()}},m,null,[[4,14,17,20]])}));return function(m){return b.apply(this,arguments)}}(),[M,qe]),nr=(0,D.useCallback)(function(){var b=L()(v()().mark(function m(t){var l,h;return v()().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return l=t.target.files,l.length>Oe&&(l=Array.from(l).slice(0,Oe)),h=[].concat(U()(ue),U()(Array.from(l))).map(function(P){return P.mid=P.mid||Le(),P.timestamp=P.timestamp||Le(),P.status=P.status||j.waiting,P}),s.next=5,M({fileList:h,first:!0});case 5:He(h);case 6:case"end":return s.stop()}},m)}));return function(m){return b.apply(this,arguments)}}(),[Oe,ue,M]);(0,D.useEffect)(function(){var b;if(ue.length&&((b=Z.current)===null||b===void 0?void 0:b.length)<A){var m=ue.splice(0,A-Z.current.length);Z.current=[].concat(U()(Z.current),U()(m)),er(U()(m)),He(ue)}},[A,ue,er]);var ir=(0,D.useCallback)(function(){if(Ue.current){var b;Ue.current.value="",(b=Ue.current)===null||b===void 0||b.click()}},[]);return(0,Q.jsxs)("div",{onClick:ir,className:H()(y),children:[(0,Q.jsx)("input",{disabled:f,type:"file",ref:Ue,multiple:I,accept:p,onChange:nr,style:{display:"none"}}),d]})},Te=X}}]);