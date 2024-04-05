"use strict";(self.webpackChunkAVPlayer=self.webpackChunkAVPlayer||[]).push([[634],{85947:(e,r,t)=>{t.d(r,{A:()=>s});var n=t(78716),a=t(81570),i=t(134),s=function(){function e(){(0,n.A)(this,e),(0,i.A)(this,"type",-1),(0,i.A)(this,"onStreamAdd",void 0)}return(0,a.A)(e,[{key:"destroy",value:function(e){}}]),e}()},16634:(e,r,t)=>{t.r(r),t.d(r,{IVFHeader:()=>U,default:()=>C});var n=t(88435),a=t.n(n),i=t(25182),s=t(77193),o=t(25767),d=t(43070),u=t(31060),h=t(81570),c=t(78716),f=t(134),p=t(36443),v=t.n(p),A=t(63939),m=t(50932),l=t(4624),y=t(9705),R=t(85947),k=t(14686),x=t(37837),g=t(71517),w=t(77231);function b(e,r,t){return r=(0,o.A)(r),(0,s.A)(e,B()?a()(r,t||[],(0,o.A)(e).constructor):r.apply(e,t))}function B(){try{var e=!Boolean.prototype.valueOf.call(a()(Boolean,[],(function(){})))}catch(e){}return(B=function(){return!!e})()}var M="src/avformat/formats/IIvfFormat.ts",S=(0,f.A)((0,f.A)({},"VP80",139),"VP90",167),U=(0,h.A)((function e(){(0,c.A)(this,e),(0,f.A)(this,"version",void 0),(0,f.A)(this,"length",void 0),(0,f.A)(this,"codec",void 0),(0,f.A)(this,"width",void 0),(0,f.A)(this,"height",void 0),(0,f.A)(this,"denominator",void 0),(0,f.A)(this,"numerator",void 0),(0,f.A)(this,"framesCount",void 0),this.version=0,this.length=32,this.codec="VP80",this.width=0,this.height=0,this.framesCount=0,this.denominator=1,this.numerator=0})),C=function(e){function r(){var e;return(0,c.A)(this,r),e=b(this,r),(0,f.A)((0,d.A)(e),"type",4),(0,f.A)((0,d.A)(e),"header",void 0),e.header=new U,e}var t,n,a;return(0,u.A)(r,e),(0,h.A)(r,[{key:"init",value:function(e){e.ioReader&&e.ioReader.setEndian(!1)}},{key:"readHeader",value:(a=(0,i.A)(v().mark((function e(r){var t;return v().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.ioReader.readString(4);case 3:if("DKIF"===e.sent){e.next=7;break}return l.z3("the file format is not ivf",M,104),e.abrupt("return",y.LR);case 7:return e.next=9,r.ioReader.readUint16();case 9:return this.header.version=e.sent,e.next=12,r.ioReader.skip(2);case 12:return e.next=14,r.ioReader.readString(4);case 14:return this.header.codec=e.sent,e.next=17,r.ioReader.readUint16();case 17:return this.header.width=e.sent,e.next=20,r.ioReader.readUint16();case 20:return this.header.height=e.sent,e.next=23,r.ioReader.readUint32();case 23:return this.header.denominator=e.sent,e.next=26,r.ioReader.readUint32();case 26:return this.header.numerator=e.sent,e.next=29,r.ioReader.readUint32();case 29:return this.header.framesCount=e.sent,e.next=32,r.ioReader.skip(4);case 32:return(t=r.createStream()).codecpar.codecType=0,t.codecpar.codecId=S[this.header.codec],t.timeBase.den=this.header.denominator,t.timeBase.num=this.header.numerator,t.codecpar.width=this.header.width,t.codecpar.height=this.header.height,t.nbFrames=BigInt(Math.floor(this.header.framesCount)),this.onStreamAdd&&this.onStreamAdd(t),e.abrupt("return",0);case 44:return e.prev=44,e.t0=e.catch(0),l.z3(e.t0.message,M,136),e.abrupt("return",r.ioReader.error);case 48:case"end":return e.stop()}}),e,this,[[0,44]])}))),function(e){return a.apply(this,arguments)})},{key:"readAVPacket",value:(n=(0,i.A)(v().mark((function e(r,t){var n,a,i,s,o;return v().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!(n=r.getStreamByMediaType(0))){e.next=22;break}return a=r.ioReader.getPos(),e.next=6,r.ioReader.readUint32();case 6:return i=e.sent,e.next=9,r.ioReader.readUint64();case 9:return s=e.sent,o=(0,x.sY)(i),(0,g.NX)(t,o,i),e.next=14,r.ioReader.readBuffer(i,(0,k.JW)(o,i));case 14:m.M[17](t+56,a),m.M[17](t+8,s),m.M[17](t+16,s),m.M[15](t+76,this.header.denominator),m.M[15](t+72,this.header.numerator),m.M[15](t+32,n.index),n.startTime===w.Dh&&(n.startTime=A.f[17](t+8)||A.f[17](t+16)),e.next=23;break;case 22:return e.abrupt("return",y.LR);case 23:return e.abrupt("return",0);case 26:return e.prev=26,e.t0=e.catch(0),-1048576!==r.ioReader.error&&l.z3(e.t0.message,M,173),e.abrupt("return",r.ioReader.error);case 30:case"end":return e.stop()}}),e,this,[[0,26]])}))),function(e,r){return n.apply(this,arguments)})},{key:"seek",value:(t=(0,i.A)(v().mark((function e(r,t,n,a){return v().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",BigInt(y.E$));case 1:case"end":return e.stop()}}),e)}))),function(e,r,n,a){return t.apply(this,arguments)})},{key:"getAnalyzeStreamsCount",value:function(){return 1}}]),r}(R.A)}}]);