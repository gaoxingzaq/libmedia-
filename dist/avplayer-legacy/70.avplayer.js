"use strict";(self.webpackChunkAVPlayer=self.webpackChunkAVPlayer||[]).push([[70],{85947:(t,e,r)=>{r.d(e,{A:()=>u});var n=r(78716),i=r(81570),a=r(134),u=function(){function t(){(0,n.A)(this,t),(0,a.A)(this,"type",-1),(0,a.A)(this,"onStreamAdd",void 0)}return(0,i.A)(t,[{key:"destroy",value:function(t){}}]),t}()},78070:(t,e,r)=>{r.r(e),r.d(e,{default:()=>q});var n=r(88435),i=r.n(n),a=r(25182),u=r(78716),s=r(81570),c=r(77193),o=r(25767),f=r(43070),h=r(31060),p=r(134),d=r(36443),l=r.n(d),k=r(50932),x=r(4624),b=r(9705),g=r(85947),m=r(14686),v=r(37837),B=r(71517),A=r(72739),I=r(50011),y=r(54825);function T(t,e,r){return e=(0,o.A)(e),(0,c.A)(t,w()?i()(e,r||[],(0,o.A)(t).constructor):e.apply(t,r))}function w(){try{var t=!Boolean.prototype.valueOf.call(i()(Boolean,[],(function(){})))}catch(t){}return(w=function(){return!!t})()}var q=function(t){function e(){var t;return(0,u.A)(this,e),t=T(this,e),(0,p.A)((0,f.A)(t),"type",16),(0,p.A)((0,f.A)(t),"queue",void 0),(0,p.A)((0,f.A)(t),"index",void 0),t}var r,n,i,c;return(0,h.A)(e,t),(0,s.A)(e,[{key:"init",value:function(t){this.queue=[]}},{key:"readChunk",value:(c=(0,a.A)(l().mark((function t(e){var r,n,i;return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r="",n=e.ioReader.getPos();case 2:return t.next=5,e.ioReader.readLine();case 5:if(""!==(i=t.sent)){t.next=8;break}return t.abrupt("break",11);case 8:r+=i+"\n",t.next=2;break;case 11:return t.abrupt("return",{chunk:r.trim(),pos:n});case 12:case"end":return t.stop()}}),t)}))),function(t){return c.apply(this,arguments)})},{key:"readHeader",value:(i=(0,a.A)(l().mark((function t(e){var r,n,i,a=this;return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:(r=e.createStream()).codecpar.codecId=94225,r.codecpar.codecType=3,r.timeBase.den=1e3,r.timeBase.num=1,this.index=0,n=BigInt(0),t.prev=7,i=l().mark((function t(){var i,u,s,c,o,f,h,p,d,k;return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,a.readChunk(e);case 2:if(i=t.sent,u=i.chunk,s=i.pos,""!==u){t.next=7;break}return t.abrupt("return",0);case 7:if(c=u.split("\n"),o=c.shift().trim(),f=c.shift().split(/--?>/),h=(0,y.t)(f[0]),!((p=(0,y.t)(f[1]))<=h)){t.next=14;break}return t.abrupt("return",0);case 14:if(d=c.join("\n").trim()){t.next=17;break}return t.abrupt("return",0);case 17:r.nbFrames++,r.duration=p,k={identifier:o,context:d,startTs:h,endTs:p,pos:s},h>=n?(a.queue.push(k),n=h):A._(a.queue,k,(function(t){return t.startTs<k.startTs?1:-1}));case 21:case"end":return t.stop()}}),t)}));case 9:return t.delegateYield(i(),"t0",11);case 11:if(0!==t.t0){t.next=14;break}return t.abrupt("continue",9);case 14:t.next=9;break;case 16:t.next=21;break;case 18:return t.prev=18,t.t1=t.catch(7),t.abrupt("return",0);case 21:case"end":return t.stop()}}),t,this,[[7,18]])}))),function(t){return i.apply(this,arguments)})},{key:"readAVPacket",value:(n=(0,a.A)(l().mark((function t(e,r){var n,i,a,u,s,c;return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.queue.length){t.next=2;break}return t.abrupt("return",b.LR);case 2:if(!(this.index>=this.queue.length)){t.next=4;break}return t.abrupt("return",-1048576);case 4:return n=e.streams.find((function(t){return 3===t.codecpar.codecType})),i=this.queue[this.index++],k.M[15](r+32,n.index),k.M[15](r+76,n.timeBase.den),k.M[15](r+72,n.timeBase.num),k.M[17](r+16,i.startTs),k.M[17](r+8,i.startTs),k.M[17](r+48,i.endTs-i.startTs),i.identifier&&(a=I.encode(i.identifier),u=(0,v.sY)(a.length),(0,m.lW)(u,a.length,a),(0,B.Ow)(r,16,u,a.length)),s=I.encode(i.context),c=(0,v.sY)(s.length),(0,m.lW)(c,s.length,s),(0,B.NX)(r,c,s.length),t.abrupt("return",0);case 17:case"end":return t.stop()}}),t,this)}))),function(t,e){return n.apply(this,arguments)})},{key:"seek",value:(r=(0,a.A)(l().mark((function t(e,r,n,i){var a;return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(2&i)){t.next=2;break}return t.abrupt("return",BigInt(b.E$));case 2:if(!(n<=BigInt(0))){t.next=5;break}return this.index=0,t.abrupt("return",BigInt(0));case 5:if(!((a=A.El(this.queue,(function(t){return t.startTs>n?-1:1})))>=0)){t.next=18;break}x.Yz("seek in cues, found index: ".concat(a,", pts: ").concat(this.queue[a].startTs,", pos: ").concat(this.queue[a].pos),"src/avformat/formats/ISubRipFormat.ts",201),this.index=Math.max(a-1,0);case 9:if(!(this.index>0)){t.next=17;break}if(this.queue[this.index-1].startTs!==this.queue[this.index].startTs){t.next=14;break}this.index--,t.next=15;break;case 14:return t.abrupt("break",17);case 15:t.next=9;break;case 17:return t.abrupt("return",BigInt(0));case 18:return t.abrupt("return",BigInt(b.LR));case 19:case"end":return t.stop()}}),t,this)}))),function(t,e,n,i){return r.apply(this,arguments)})},{key:"getAnalyzeStreamsCount",value:function(){return 1}}]),e}(g.A)},54825:(t,e,r)=>{function n(t){if(!(t=t.trim()))return-BigInt(1);var e=t.split(":"),r=BigInt(0);return 3===e.length&&(r+=BigInt(+e.shift().trim())*BigInt(36e5)),r+=BigInt(+e.shift().trim())*BigInt(6e4),e=e.shift().trim().split("."),(r+=BigInt(+e.shift().trim())*BigInt(1e3))+BigInt(+e.shift().trim())}function i(t){if(!(t=t.trim()))return-BigInt(1);var e=t.split(":"),r=BigInt(0);return 3===e.length&&(r+=BigInt(+e.shift().trim())*BigInt(36e5)),r+=BigInt(+e.shift().trim())*BigInt(6e4),e=e.shift().trim().split(","),(r+=BigInt(+e.shift().trim())*BigInt(1e3))+BigInt(+e.shift().trim())}r.d(e,{j:()=>n,t:()=>i})}}]);