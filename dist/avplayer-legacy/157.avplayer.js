(self.webpackChunkAVPlayer=self.webpackChunkAVPlayer||[]).push([[157],{89088:(e,t,r)=>{"use strict";r.d(t,{Au:()=>g,He:()=>R,XC:()=>v,Y2:()=>m,hG:()=>h,oz:()=>l});var a=r(134),n=r(77231),s=[44100,48e3,32e3,0],i=[22050,24e3,16e3,0],c=[11025,12e3,8e3,0],o=[0,1152,1152,384],u=[0,576,1152,384],d=[0,576,1152,384],f=[0,32,64,96,128,160,192,224,256,288,320,352,384,416,448,-1],x=[0,32,48,56,64,80,96,112,128,160,192,224,256,320,384,-1],p=[0,32,40,48,56,64,80,96,112,128,160,192,224,256,320,-1],b=[0,32,48,56,64,80,96,112,128,144,160,176,192,224,256,-1],k=[0,8,16,24,32,40,48,56,64,80,96,112,128,144,160,-1];function m(e,t){switch(e){case 0:return c[t];case 2:return i[t];case 3:return s[t]}return n.N_}function h(e,t){switch(e){case 0:return d[t];case 2:return u[t];case 3:return o[t]}return n.N_}function l(e,t,r){switch(t){case 1:switch(e){case 0:case 2:return k[r];case 3:return p[r]}break;case 2:switch(e){case 0:case 2:return k[r];case 3:return x[r]}case 3:switch(e){case 0:case 2:return b[r];case 3:return f[r]}}return n.N_}function g(e){switch(e){case 1:return 34;case 2:return 33;case 3:return 32}return n.N_}var R=(0,a.A)((0,a.A)((0,a.A)({},32,"Layer1"),33,"Layer2"),34,"Layer3");function v(e,t){if(t&&t.length>=4){var r=t[1]>>>3&3,a=(6&t[1])>>1,n=(12&t[2])>>>2,s=3&~(t[3]>>>6)?2:1,i=g(a),c=m(r,n);e.codecpar.profile=i,e.codecpar.sampleRate=c,e.codecpar.chLayout.nbChannels=s}}},85947:(e,t,r)=>{"use strict";r.d(t,{A:()=>i});var a=r(78716),n=r(81570),s=r(134),i=function(){function e(){(0,a.A)(this,e),(0,s.A)(this,"type",-1),(0,s.A)(this,"onStreamAdd",void 0)}return(0,n.A)(e,[{key:"destroy",value:function(e){}}]),e}()},6839:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>L});var a=r(88435),n=r.n(a),s=r(25182),i=r(78716),c=r(81570),o=r(77193),u=r(25767),d=r(43070),f=r(31060),x=r(134),p=r(36443),b=r.n(p),k=r(14686),m=r(61499),h=r(63939),l=r(50932),g=r(4624),R=r(85947),v=r(37837),B=r(71517),I=r(77231),y=r(50011),S=r(89088),T=r(44328),A=r(31608),P=r(43607),F=r(72739),z=r(19028),M=r(75294),U=r(9705);function w(e,t,r){return t=(0,u.A)(t),(0,o.A)(e,D()?n()(t,r||[],(0,u.A)(e).constructor):t.apply(e,r))}function D(){try{var e=!Boolean.prototype.valueOf.call(n()(Boolean,[],(function(){})))}catch(e){}return(D=function(){return!!e})()}var H="src/avformat/formats/IMp3Format.ts",L=function(e){function t(){var e;return(0,i.A)(this,t),e=w(this,t),(0,x.A)((0,d.A)(e),"type",12),(0,x.A)((0,d.A)(e),"context",void 0),e}var r,a,n,o;return(0,f.A)(t,e),(0,c.A)(t,[{key:"init",value:function(e){e.ioReader&&e.ioReader.setEndian(!0),this.context={firstFramePos:I.Dh,isVBR:!1,hasID3v1:!1,id3v2:{version:I.N_,revision:I.N_,flags:I.N_},fileSize:BigInt(0)}}},{key:"readHeader",value:(o=(0,s.A)(b().mark((function e(t){var r,a,n,s,i,c,o,u,d,f,x,p,m,h,l,R,B,I,T,F,U,w;return b().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(r=t.createStream()).codecpar.codecId=86017,r.codecpar.codecType=1,r.startTime=BigInt(0),r.firstDTS=BigInt(0),a={frameHeader:new M.FrameHeader,nbFrame:BigInt(0),tocIndexes:[],nextDTS:BigInt(0),frameLength:0},r.privData=a,n=r.metadata={},e.next=10,t.ioReader.fileSize();case 10:if(s=e.sent,!(1&t.ioReader.flags)){e.next=45;break}if(!(s>A.c1)){e.next=45;break}return e.next=15,t.ioReader.seek(s-BigInt(A.c1));case 15:return e.next=17,t.ioReader.readString(3);case 17:if(e.t0=e.sent,"TAG"!==e.t0){e.next=45;break}return e.next=22,t.ioReader.readBuffer(30);case 22:return i=e.sent,n.title=y.decode(i).replace(/\s/g,""),e.next=26,t.ioReader.readBuffer(30);case 26:return i=e.sent,n.artist=y.decode(i).replace(/\s/g,""),e.next=30,t.ioReader.readBuffer(30);case 30:return i=e.sent,n.album=y.decode(i).replace(/\s/g,""),e.next=34,t.ioReader.readBuffer(4);case 34:return i=e.sent,n.date=y.decode(i).replace(/\s/g,""),e.next=38,t.ioReader.readBuffer(30);case 38:return i=e.sent,n.comment=y.decode(i).replace(/\s/g,""),0===i[28]&&0!==i[29]&&(n.track=i[29]+""),e.next=43,t.ioReader.readUint8();case 43:n.genre=e.sent,this.context.hasID3v1=!0;case 45:return e.next=47,t.ioReader.seek(BigInt(0));case 47:return e.next=49,t.ioReader.peekString(3);case 49:if(e.t1=e.sent,"ID3"!==e.t1){e.next=87;break}return e.next=54,t.ioReader.skip(3);case 54:return e.next=56,t.ioReader.readUint8();case 56:return this.context.id3v2.version=e.sent,e.next=59,t.ioReader.readUint8();case 59:return this.context.id3v2.revision=e.sent,e.next=62,t.ioReader.readUint8();case 62:return this.context.id3v2.flags=e.sent,e.next=65,t.ioReader.readUint8();case 65:return e.t2=e.sent,e.t3=127&e.t2,e.t4=e.t3<<21,e.next=70,t.ioReader.readUint8();case 70:return e.t5=e.sent,e.t6=127&e.t5,e.t7=e.t6<<14,e.t8=e.t4|e.t7,e.next=76,t.ioReader.readUint8();case 76:return e.t9=e.sent,e.t10=127&e.t9,e.t11=e.t10<<7,e.t12=e.t8|e.t11,e.next=82,t.ioReader.readUint8();case 82:return e.t13=e.sent,e.t14=127&e.t13,c=e.t12|e.t14,e.next=87,z.q(t.ioReader,c,this.context.id3v2,n);case 87:this.context.firstFramePos=t.ioReader.getPos();case 88:return e.next=91,t.ioReader.peekUint16();case 91:if(65504&~e.sent){e.next=94;break}return e.abrupt("break",98);case 94:return e.next=96,t.ioReader.skip(1);case 96:e.next=88;break;case 98:return this.context.firstFramePos!==t.ioReader.getPos()&&(g.R8("skipping ".concat(t.ioReader.getPos()-this.context.firstFramePos," bytes of junk at ").concat(this.context.firstFramePos),H,171),this.context.firstFramePos=t.ioReader.getPos()),r.codecpar.extradataSize=4,r.codecpar.extradata=(0,v.sY)(r.codecpar.extradataSize),e.next=103,t.ioReader.peekBuffer(r.codecpar.extradataSize,(0,k.JW)(r.codecpar.extradata,r.codecpar.extradataSize));case 103:return e.t15=M,e.t16=a.frameHeader,e.next=107,t.ioReader.readUint32();case 107:return e.t17=e.sent,e.t15.parse.call(e.t15,e.t16,e.t17),r.codecpar.profile=S.Au(a.frameHeader.layer),r.codecpar.frameSize=S.hG(a.frameHeader.version,a.frameHeader.layer),r.codecpar.sampleRate=S.Y2(a.frameHeader.version,a.frameHeader.samplingFrequency),r.timeBase.num=1,r.timeBase.den=r.codecpar.sampleRate,o=3===a.frameHeader.mode?1:2,r.codecpar.chLayout.nbChannels=o,u=BigInt(Math.floor(S.oz(a.frameHeader.version,a.frameHeader.layer,a.frameHeader.bitrateIndex))),d=M.getFrameLength(a.frameHeader,r.codecpar.sampleRate),f=t.ioReader.getPos(),x=[[0,9,17],[0,0,0],[0,9,17],[0,17,32]],e.next=122,t.ioReader.skip(x[a.frameHeader.version][r.codecpar.chLayout.nbChannels]);case 122:return e.next=124,t.ioReader.readString(4);case 124:if("Xing"!==(p=e.sent)&&"Info"!==p){e.next=171;break}return this.context.isVBR=!0,e.next=129,t.ioReader.readUint32();case 129:if(!(1&(m=e.sent))){e.next=138;break}return e.t18=BigInt,e.t19=Math,e.next=135,t.ioReader.readUint32();case 135:e.t20=e.sent,e.t21=e.t19.floor.call(e.t19,e.t20),a.nbFrame=(0,e.t18)(e.t21);case 138:if(!(2&m)){e.next=146;break}return e.t22=BigInt,e.t23=Math,e.next=143,t.ioReader.readUint32();case 143:e.t24=e.sent,e.t25=e.t23.floor.call(e.t23,e.t24),this.context.fileSize=(0,e.t22)(e.t25);case 146:if((h=s>=f?s-f:BigInt(0))&&this.context.fileSize&&(l=P.jk(h,this.context.fileSize),R=P.T9(h,this.context.fileSize)-l,h>this.context.fileSize&&R>l>>BigInt(4)?(a.nbFrame=BigInt(0),g.R8("invalid concatenated file detected - using bitrate for duration",H,224)):R>l>>BigInt(4)&&g.R8("filesize and duration do not match (growing file?)",H,227)),r.duration=a.nbFrame*BigInt(0|r.codecpar.frameSize),!(4&m)){e.next=162;break}B=0;case 151:if(!(B<A.W8)){e.next=162;break}return e.next=154,t.ioReader.readUint8();case 154:I=e.sent,T=this.context.fileSize*BigInt(Math.floor(I))/BigInt(256),F=r.duration/BigInt(A.W8)*BigInt(Math.floor(B)),U={dts:F,pos:T},a.tocIndexes.push(U);case 159:B++,e.next=151;break;case 162:if(!(8&m)){e.next=165;break}return e.next=165,t.ioReader.skip(4);case 165:return e.next=167,t.ioReader.readString(9);case 167:n.encoder=e.sent,this.context.firstFramePos+=BigInt(Math.floor(d)),e.next=207;break;case 171:return e.next=173,t.ioReader.seek(f);case 173:return e.next=175,t.ioReader.readString(4);case 175:if("VBRI"!==e.sent){e.next=201;break}return e.next=179,t.ioReader.readUint16();case 179:if(e.t26=e.sent,1!==e.t26){e.next=198;break}return e.next=183,t.ioReader.skip(4);case 183:return e.t27=BigInt,e.t28=Math,e.next=187,t.ioReader.readUint32();case 187:return e.t29=e.sent,e.t30=e.t28.floor.call(e.t28,e.t29),this.context.fileSize=(0,e.t27)(e.t30),e.t31=BigInt,e.t32=Math,e.next=194,t.ioReader.readUint32();case 194:e.t33=e.sent,e.t34=e.t32.floor.call(e.t32,e.t33),a.nbFrame=(0,e.t31)(e.t34),r.duration=a.nbFrame*BigInt(0|r.codecpar.frameSize);case 198:this.context.firstFramePos+=BigInt(Math.floor(d)),e.next=207;break;case 201:this.context.isVBR=!1,r.codecpar.bitrate=u*BigInt(1e3),a.nbFrame=(s-this.context.firstFramePos-BigInt(A.c1))/BigInt(Math.floor(d)),r.duration=a.nbFrame*BigInt(0|r.codecpar.frameSize),a.frameLength=d,this.context.fileSize=s;case 207:return e.next=209,t.ioReader.seek(this.context.firstFramePos);case 209:return e.next=212,t.ioReader.peekUint16();case 212:if(65504&~e.sent){e.next=215;break}return e.abrupt("break",219);case 215:return e.next=217,t.ioReader.skip(1);case 217:e.next=209;break;case 219:if(this.context.firstFramePos!==t.ioReader.getPos()&&(g.R8("skipping ".concat(t.ioReader.getPos()-this.context.firstFramePos," bytes of junk at ").concat(this.context.firstFramePos),H,287),this.context.firstFramePos=t.ioReader.getPos()),a.tocIndexes.length)for(w=0;w<A.W8;w++)a.tocIndexes[w].pos+=this.context.firstFramePos;return e.abrupt("return",0);case 222:case"end":return e.stop()}}),e,this)}))),function(e){return o.apply(this,arguments)})},{key:"readAVPacket",value:(n=(0,s.A)(b().mark((function e(t,r){var a,n,s,i,c;return b().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=t.getStreamByMediaType(1),n=a.privData,s=t.ioReader.getPos(),!(this.context.hasID3v1&&s>=this.context.fileSize-BigInt(A.c1))){e.next=5;break}return e.abrupt("return",-1048576);case 5:return e.prev=5,e.t0=M,e.t1=n.frameHeader,e.next=10,t.ioReader.peekUint32();case 10:return e.t2=e.sent,e.t0.parse.call(e.t0,e.t1,e.t2),i=this.context.isVBR?M.getFrameLength(n.frameHeader,a.codecpar.sampleRate):n.frameLength,l.M[15](r+28,i),l.M[17](r+56,s),l.M[15](r+32,a.index),(0,k.Mr)(r+72,a.timeBase[m.o9],8),l.M[17](r+48,BigInt(0|a.codecpar.frameSize)),l.M[17](r+16,n.nextDTS),l.M[17](r+8,n.nextDTS),l.M[15](r+36,1|h.f[15](r+36)),n.nextDTS+=BigInt(0|a.codecpar.frameSize),c=(0,v.sY)(i),(0,B.NX)(r,c,i),e.next=25,t.ioReader.readBuffer(i,(0,k.JW)(c,i));case 25:return e.abrupt("return",0);case 28:return e.prev=28,e.t3=e.catch(5),-1048576!==t.ioReader.error&&g.z3(e.t3.message,H,334),e.abrupt("return",t.ioReader.error);case 32:case"end":return e.stop()}}),e,this,[[5,28]])}))),function(e,t){return n.apply(this,arguments)})},{key:"syncToFrame",value:(a=(0,s.A)(b().mark((function e(t){var r,a,n,s,i,c,o;return b().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=I.Dh,a=3,n=t.getStreamByMediaType(1),s=n.privData;case 4:return e.prev=5,e.next=8,t.ioReader.peekUint16();case 8:if(65504&~e.sent){e.next=52;break}return r=t.ioReader.getPos(),e.t0=M,e.t1=s.frameHeader,e.next=15,t.ioReader.peekUint32();case 15:if(e.t2=e.sent,e.t0.parse.call(e.t0,e.t1,e.t2),!((i=this.context.isVBR?M.getFrameLength(s.frameHeader,n.codecpar.sampleRate):s.frameLength)>512e3)){e.next=22;break}return e.next=21,t.ioReader.skip(1);case 21:return e.abrupt("continue",4);case 22:return e.next=24,t.ioReader.skip(i);case 24:c=0;case 25:if(!(c<=a)){e.next=45;break}return e.next=28,t.ioReader.peekUint16();case 28:if(65504&~e.sent){e.next=42;break}return e.t3=M,e.t4=s.frameHeader,e.next=34,t.ioReader.peekUint32();case 34:return e.t5=e.sent,e.t3.parse.call(e.t3,e.t4,e.t5),o=this.context.isVBR?M.getFrameLength(s.frameHeader,n.codecpar.sampleRate):s.frameLength,e.next=39,t.ioReader.skip(o);case 39:c++,e.next=43;break;case 42:return e.abrupt("break",45);case 43:e.next=25;break;case 45:if(!(c<a)){e.next=51;break}return e.next=48,t.ioReader.seek(r+BigInt(1));case 48:r=I.Dh,e.next=52;break;case 51:return e.abrupt("break",61);case 52:return e.next=54,t.ioReader.skip(1);case 54:e.next=59;break;case 56:return e.prev=56,e.t6=e.catch(5),e.abrupt("break",61);case 59:e.next=4;break;case 61:if(r===I.Dh){e.next=64;break}return e.next=64,t.ioReader.seek(r);case 64:case"end":return e.stop()}}),e,this,[[5,56]])}))),function(e){return a.apply(this,arguments)})},{key:"seek",value:(r=(0,s.A)(b().mark((function e(t,r,a,n){var s,i,c,o,u,d,f,x,p,k,m,h,l;return b().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s=t.ioReader.getPos(),i=r.privData,!(2&n)){e.next=18;break}return e.next=5,t.ioReader.fileSize();case 5:if(!((c=e.sent)<=BigInt(0))){e.next=8;break}return e.abrupt("return",BigInt(U.E$));case 8:return a<BigInt(0)?a=BigInt(0):a>c&&(a=c),e.next=11,t.ioReader.seek(a);case 11:if(4&n){e.next=15;break}return e.next=14,this.syncToFrame(t);case 14:r.duration&&c&&(i.nextDTS=a/c*r.duration);case 15:return e.abrupt("return",s);case 18:if(!r.sampleIndexes.length){e.next=26;break}if(!((o=F.El(r.sampleIndexes,(function(e){return e.pts>a?-1:1})))>0&&(0,T.k)(a-r.sampleIndexes[o-1].pts,r.timeBase,I.i0)<BigInt(1e4))){e.next=26;break}return g.Yz("seek in sampleIndexes, found index: ".concat(o,", pts: ").concat(r.sampleIndexes[o-1].pts,", pos: ").concat(r.sampleIndexes[o-1].pos),H,443),e.next=24,t.ioReader.seek(r.sampleIndexes[o-1].pos);case 24:return i.nextDTS=r.sampleIndexes[o-1].dts,e.abrupt("return",s);case 26:if(a!==BigInt(0)){e.next=30;break}return e.next=29,t.ioReader.seek(this.context.firstFramePos);case 29:return e.abrupt("return",s);case 30:if(!this.context.isVBR){e.next=58;break}if(!i.tocIndexes.length){e.next=49;break}if(!(u=i.tocIndexes[Number(BigInt.asIntN(32,a/(r.duration/BigInt(A.W8))))])){e.next=40;break}return g.Yz("seek in xing toc indexes, pts: ".concat(u.dts,", pos: ").concat(u.pos),H,459),e.next=37,t.ioReader.seek(u.pos);case 37:i.nextDTS=u.dts,e.next=47;break;case 40:return g.Yz("not found any keyframe index, try to seek in bytes",H,464),d=M.getFrameLength(i.frameHeader,r.codecpar.sampleRate),f=a/BigInt(0|r.codecpar.frameSize),x=f*BigInt(Math.floor(d))+this.context.firstFramePos,i.nextDTS=f*BigInt(0|r.codecpar.frameSize),e.next=47,t.ioReader.seek(x);case 47:e.next=56;break;case 49:return g.Yz("not found any keyframe index, try to seek in bytes",H,473),p=M.getFrameLength(i.frameHeader,r.codecpar.sampleRate),k=a/BigInt(0|r.codecpar.frameSize),m=k*BigInt(Math.floor(p))+this.context.firstFramePos,i.nextDTS=k*BigInt(0|r.codecpar.frameSize),e.next=56,t.ioReader.seek(m);case 56:e.next=63;break;case 58:return h=a/BigInt(0|r.codecpar.frameSize),l=h*BigInt(0|i.frameLength)+this.context.firstFramePos,i.nextDTS=h*BigInt(0|r.codecpar.frameSize),e.next=63,t.ioReader.seek(l);case 63:return e.next=65,this.syncToFrame(t);case 65:return e.abrupt("return",s);case 66:case"end":return e.stop()}}),e,this)}))),function(e,t,a,n){return r.apply(this,arguments)})},{key:"getAnalyzeStreamsCount",value:function(){return 1}}]),t}(R.A)},75294:(e,t,r)=>{"use strict";r.r(t),r.d(t,{FrameHeader:()=>c,getFrameLength:()=>u,parse:()=>o});var a=r(81570),n=r(78716),s=r(134),i=r(89088),c=(0,a.A)((function e(){(0,n.A)(this,e),(0,s.A)(this,"version",void 0),(0,s.A)(this,"layer",void 0),(0,s.A)(this,"protection",void 0),(0,s.A)(this,"bitrateIndex",void 0),(0,s.A)(this,"samplingFrequency",void 0),(0,s.A)(this,"padding",void 0),(0,s.A)(this,"private",void 0),(0,s.A)(this,"mode",void 0),(0,s.A)(this,"modeExtension",void 0),(0,s.A)(this,"copyright",void 0),(0,s.A)(this,"original",void 0),(0,s.A)(this,"emphasis",void 0)}));function o(e,t){e.version=t>>19&3,e.layer=t>>17&3,e.protection=t>>16&1,e.bitrateIndex=t>>12&15,e.samplingFrequency=t>>10&3,e.padding=t>>9&1,e.mode=t>>6&3,e.modeExtension=t>>4&3,e.copyright=t>>3&1,e.original=t>>2&1,e.emphasis=3&t}function u(e,t){var r=i.oz(e.version,e.layer,e.bitrateIndex);switch(e.layer){case 1:default:r=144e3*r/(t<<(3===e.version?0:1))>>>0,r+=e.padding;break;case 2:r=144e3*r/t>>>0,r+=e.padding;break;case 3:r=4*((r=12e3*r/t>>>0)+e.padding)}return r}},19028:(e,t,r)=>{"use strict";r.d(t,{q:()=>f});var a=r(25182),n=r(36443),s=r.n(n),i=r(4624),c="src/avformat/formats/mp3/id3v2.ts";function o(e,t){return u.apply(this,arguments)}function u(){return(u=(0,a.A)(s().mark((function e(t,r){var a;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=0;case 1:if(!r--){e.next=10;break}return e.t0=a<<7,e.next=5,t.readUint8();case 5:e.t1=e.sent,e.t2=127&e.t1,a=e.t0+e.t2,e.next=1;break;case 10:return e.abrupt("return",a);case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function d(e,t){var r="utf-8";return 0===e?r="iso-8859-1":1===e?r="utf-16":2===e&&(r="utf-16be"),new TextDecoder(r).decode(t)}function f(e,t,r,a){return x.apply(this,arguments)}function x(){return x=(0,a.A)(s().mark((function e(t,r,n,u){var f,x,p,b,k,m,h,l,g,R,v,B,I,y,S,T,A;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(k=function(){return(k=(0,a.A)(s().mark((function e(){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.seek(p);case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)},b=function(){return k.apply(this,arguments)},f=2!==n.version,x=f?10:6,p=t.getPos()+BigInt(0|r),!(f&&64&n.flags)){e.next=25;break}return e.next=8,o(t,4);case 8:if(m=e.sent,4===n.version&&(m-=4),!(m<0)){e.next=15;break}return i.z3("invalid extended header length",c,92),e.next=14,b();case 14:return e.abrupt("return",e.sent);case 15:return e.next=17,t.skip(m);case 17:if(!((r-=m+4)<0)){e.next=25;break}return i.z3("extended header too long",c,98),e.next=22,t.seek(p);case 22:return e.next=24,b();case 24:return e.abrupt("return",e.sent);case 25:if(!(r>x)){e.next=146;break}if(h=void 0,l=void 0,!f){e.next=42;break}return e.next=31,t.readString(4);case 31:return h=e.sent,e.next=34,t.readUint32();case 34:if(l=e.sent){e.next=38;break}return i.z3("invalid frame size",c,112),e.abrupt("break",146);case 38:return e.next=40,t.readUint16();case 40:e.next=48;break;case 42:return e.next=44,t.readString(3);case 44:return h=e.sent,e.next=47,t.readUint24();case 47:l=e.sent;case 48:if("APIC"!==h){e.next=54;break}return e.next=51,t.readBuffer(l);case 51:u.poster=e.sent,e.next=143;break;case 54:if("USLT"!==h){e.next=67;break}return e.next=57,t.readUint8();case 57:return g=e.sent,e.next=60,t.readString(3);case 60:return R=e.sent,e.next=63,t.readBuffer(l-4);case 63:v=e.sent,u.lyrics="".concat(R," ").concat(d(g,v)),e.next=143;break;case 67:if("COMM"!==h&&"COM"!==h){e.next=80;break}return e.next=70,t.readUint8();case 70:return B=e.sent,e.next=73,t.readString(3);case 73:return I=e.sent,e.next=76,t.readBuffer(l-4);case 76:y=e.sent,u.comment="".concat(I," ").concat(d(B,y)),e.next=143;break;case 80:if(S=void 0,"T"!==h[0]){e.next=91;break}return e.next=84,t.readUint8();case 84:return T=e.sent,e.next=87,t.readBuffer(l-1);case 87:A=e.sent,S=d(T,A),e.next=94;break;case 91:return e.next=93,t.readBuffer(l);case 93:S=e.sent;case 94:e.t0=h,e.next="TIT2"===e.t0||"TT2"===e.t0?97:"TPE1"===e.t0||"TP1"===e.t0?99:"TPE2"===e.t0||"TP2"===e.t0?101:"TPOS"===e.t0?103:"TCOP"===e.t0?105:"TALB"===e.t0||"TAL"===e.t0?107:"TRCK"===e.t0||"TRK"===e.t0?109:"TYER"===e.t0||"TDRL"===e.t0||"TDRC"===e.t0?111:"COMM"===e.t0||"COM"===e.t0?113:"TCON"===e.t0||"TCO"===e.t0?115:"TSSE"===e.t0||"TEN"===e.t0?117:"TCOM"===e.t0?119:"TENC"===e.t0?121:"TLAN"===e.t0?123:"TPE3"===e.t0||"TP3"===e.t0?125:"TPUB"===e.t0?127:"TCMP"===e.t0||"TCP"===e.t0?129:"TDEN"===e.t0?131:"TSOA"===e.t0?133:"TSOP"===e.t0?135:"TSOT"===e.t0?137:"TIT1"===e.t0?139:141;break;case 97:return u.title=S,e.abrupt("break",143);case 99:return u.artist=S,e.abrupt("break",143);case 101:return u.albumArtist=S,e.abrupt("break",143);case 103:return u.disc=S,e.abrupt("break",143);case 105:return u.copyright=S,e.abrupt("break",143);case 107:return u.album=S,e.abrupt("break",143);case 109:return u.track=S,e.abrupt("break",143);case 111:return u.date=S,e.abrupt("break",143);case 113:return u.comment=S,e.abrupt("break",143);case 115:return u.genre=S,e.abrupt("break",143);case 117:return u.encoder=S,e.abrupt("break",143);case 119:return u.composer=S,e.abrupt("break",143);case 121:return u.encodedBy=S,e.abrupt("break",143);case 123:return u.language=S,e.abrupt("break",143);case 125:return u.performer=S,e.abrupt("break",143);case 127:return u.publisher=S,e.abrupt("break",143);case 129:return u.compilation=S,e.abrupt("break",143);case 131:return u.creationTime=S,e.abrupt("break",143);case 133:return u.albumSort=S,e.abrupt("break",143);case 135:return u.artistSort=S,e.abrupt("break",143);case 137:return u.titleSort=S,e.abrupt("break",143);case 139:return u.grouping=S,e.abrupt("break",143);case 141:return u[h]=S,e.abrupt("break",143);case 143:r-=l+x,e.next=25;break;case 146:return 4==n.version&&16&n.flags&&(p+=BigInt(10)),e.next=149,t.seek(p);case 149:case"end":return e.stop()}}),e)}))),x.apply(this,arguments)}},31608:(e,t,r)=>{"use strict";r.d(t,{W8:()=>a,c1:()=>n});var a=100,n=128},803:(e,t,r)=>{var a=r(16560),n=r(54220);function s(t){return e.exports=s="function"==typeof a&&"symbol"==typeof n?function(e){return typeof e}:function(e){return e&&"function"==typeof a&&e.constructor===a&&e!==a.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,s(t)}e.exports=s,e.exports.__esModule=!0,e.exports.default=e.exports}}]);