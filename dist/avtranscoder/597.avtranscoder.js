"use strict";(self.webpackChunkAVTranscoder=self.webpackChunkAVTranscoder||[]).push([[597],{64436:(t,e,i)=>{i.d(e,{A:()=>o});var r=i(134),n=i(63939),a=i(37837),s=i(71766);class o{constructor(){(0,r.A)(this,"inCodecpar",void 0),(0,r.A)(this,"inTimeBase",void 0),(0,r.A)(this,"outCodecpar",void 0)}init(t,e){return this.inCodecpar=(0,a.Gy)(168),(0,s.Yi)(this.inCodecpar,t),this.inTimeBase={den:n.f[15](e+4),num:n.f[15](e)},0}destroy(){this.inCodecpar&&((0,s.dn)(this.inCodecpar),this.inCodecpar=0)}}},9848:(t,e,i)=>{i.d(e,{A:()=>h});var r=i(134),n=i(63939),a=i(64436),s=i(58469),o=i(14686),c=i(71517),d=i(37837),l=i(9705);class h extends a.A{constructor(...t){super(...t),(0,r.A)(this,"cache",void 0),(0,r.A)(this,"cached",void 0)}init(t,e){return super.init(t,e),this.cache=(0,c._5)(),0}destroy(){super.destroy(),(0,c.Qe)(this.cache),this.cache=0,this.cached=!1}sendAVPacket(t){if(!n.f[20](t+24)||!n.f[15](t+28))return;const e=7+n.f[15](t+28),i=(0,d.sY)(e),r=(0,o.s3)(i,e);r[0]=255,r[1]=240,r[1]|=8,r[1]|=1,r[2]=(n.f[15](this.inCodecpar+48)-1&3)<<6,r[2]|=(15&s.Hm[n.f[15](this.inCodecpar+136)])<<2,r[2]|=(4&n.f[15](this.inCodecpar+116))>>2,r[3]=(3&n.f[15](this.inCodecpar+116))<<6,r[3]|=r.length>>11&3,r[4]=r.length>>3&255,r[5]=(7&r.length)<<5,r[5]|=31,r[6]=252,r.set((0,o.s3)(n.f[20](t+24),n.f[15](t+28)),7),(0,c.zu)(this.cache,t),(0,c.NX)(this.cache,i,e),this.cached=!0}receiveAVPacket(t){return this.cached?((0,c.Up)(t),(0,c.rN)(t,this.cache),this.cached=!1,0):l.LT}}},60480:(t,e,i)=>{i.d(e,{A:()=>U});var r=i(134),n=i(63939),a=i(50932),s=i(64436),o=i(58469),c=i(14686),d=i(71517),l=i(37837),h=i(9705),p=i(95335),f=i(83314);const u={mod:20},g=new Uint8Array([86,224,0]);class U extends s.A{constructor(t={}){super(),(0,r.A)(this,"cache",void 0),(0,r.A)(this,"cached",void 0),(0,r.A)(this,"bitWriter",void 0),(0,r.A)(this,"counter",void 0),(0,r.A)(this,"options",void 0),this.options=p.X$({},u,t)}init(t,e){return super.init(t,e),this.cache=(0,d._5)(),this.cached=!1,this.counter=0,this.bitWriter=new f.A,0}destroy(){super.destroy(),(0,d.Qe)(this.cache),this.cache=0}writeHeader(){this.bitWriter.writeU1(0===this.counter?0:1),0===this.counter&&(this.bitWriter.writeU1(0),this.bitWriter.writeU1(1),this.bitWriter.writeU(6,0),this.bitWriter.writeU(4,0),this.bitWriter.writeU(3,0),this.bitWriter.writeU(5,n.f[15](this.inCodecpar+48)-1&31),this.bitWriter.writeU(4,15&o.Hm[n.f[15](this.inCodecpar+136)]),this.bitWriter.writeU(4,15&n.f[15](this.inCodecpar+116)),this.bitWriter.writeU(3,0),this.bitWriter.writeU(3,0),this.bitWriter.writeU(8,255),this.bitWriter.writeU1(0),this.bitWriter.writeU1(0)),this.counter++,this.counter%=this.options.mod}copyBytes(t){for(let e=0;e<t.length;e++)this.bitWriter.writeU(8,t[e])}sendAVPacket(t){if(!n.f[20](t+24)||!n.f[15](t+28))return;this.bitWriter.clear();const e=(0,d.rU)(t,1);if(e){const{profile:t,sampleRate:i,channels:r}=(0,o._5)((0,c.s3)(n.f[20](e),n.f[15](e+4)));a.M[15](this.inCodecpar+48,t),a.M[15](this.inCodecpar+136,i),a.M[15](this.inCodecpar+116,r),this.counter=0}this.writeHeader();let i=0;for(;i<=n.f[15](t+28)-255;i+=255)this.bitWriter.writeU(8,255);this.bitWriter.writeU(8,n.f[15](t+28)-i);const r=(0,c.s3)(n.f[20](t+24),n.f[15](t+28));129==(225&r[0])?(this.bitWriter.writeU(8,254&r[0]),this.copyBytes(r.subarray(1))):this.copyBytes(r),this.bitWriter.padding();const s=this.bitWriter.getPointer(),h=3+s,p=(0,l.sY)(h),f=(0,c.s3)(p,h);f.set(g,0),f[1]|=s>>8&31,f[2]|=255&s,f.set(this.bitWriter.getBuffer().subarray(0,s),3),(0,d.zu)(this.cache,t),(0,d.NX)(this.cache,p,h),this.cached=!0}receiveAVPacket(t){return this.cached?((0,d.Up)(t),(0,d.rN)(t,this.cache),this.cached=!1,0):h.LT}}},52251:(t,e,i)=>{i.d(e,{A:()=>g});var r=i(134),n=i(63939),a=i(50932),s=i(64436),o=i(71517),c=i(20620),d=i(53e3),l=i(55611),h=i(9705),p=i(60264),f=i(4624),u=i(14686);class g extends s.A{constructor(...t){super(...t),(0,r.A)(this,"cache",void 0),(0,r.A)(this,"cached",void 0)}init(t,e){return super.init(t,e),this.cache=(0,o._5)(),this.cached=!1,0}destroy(){super.destroy(),(0,o.Qe)(this.cache),this.cache=0}sendAVPacket(t){const e=(0,u.JW)(n.f[20](t+24),n.f[15](t+28));if(2===n.f[15](t+80)||(0,p.Bs)(e))(0,o.rN)(this.cache,t);else{let i;(0,o.zu)(this.cache,t);const r=(0,o.rU)(t,1);let s=null;r&&(s=(0,u.JW)(n.f[20](r),n.f[15](r+4))),27===n.f[15](this.inCodecpar+4)||12===n.f[15](this.inCodecpar+4)?i=c.OD(e,s):173===n.f[15](this.inCodecpar+4)?i=d.OD(e,s):196===n.f[15](this.inCodecpar+4)?i=l.OD(e,s):f.h2(`not support for codecId: ${n.f[15](this.inCodecpar+4)}`,"src/avformat/bsf/h2645/Avcc2AnnexbFilter.ts",94),a.M[15](this.cache+80,2),(0,o.NX)(this.cache,i.bufferPointer,i.length),i.key&&a.M[15](this.cache+36,1|n.f[15](this.cache+36))}return this.cached=!0,0}receiveAVPacket(t){return this.cached?((0,o.Up)(t),(0,o.rN)(t,this.cache),this.cached=!1,0):h.LR}}},77662:(t,e,i)=>{i.d(e,{A:()=>h});var r=i(134),n=i(63939),a=i(64436),s=i(14686),o=i(71517),c=i(37837),d=i(9705),l=i(65451);class h extends a.A{constructor(...t){super(...t),(0,r.A)(this,"cache",void 0),(0,r.A)(this,"cached",void 0),(0,r.A)(this,"opusPendingTrimStart",void 0)}init(t,e){return super.init(t,e),this.cache=(0,o._5)(),this.cached=!1,this.opusPendingTrimStart=48e3*(n.f[15](this.inCodecpar+148)>0?n.f[15](this.inCodecpar+148):0)/n.f[15](this.inCodecpar+136),0}destroy(){super.destroy(),(0,o.Qe)(this.cache),this.cache=0}sendAVPacket(t){if(!n.f[20](t+24)||!n.f[15](t+28))return;const e=(0,s.s3)(n.f[20](t+24),n.f[15](t+28)),i=l.kt(e);let r=null;const a=(0,o.rU)(t,11);a&&(r=(0,s.s3)(n.f[20](a),n.f[15](a+4)));let d=0;r&&r.length>=10&&(d=48e3*(r[4]<<24|r[5]<<16|r[6]<<8|r[9])/n.f[15](this.inCodecpar+136));let h=e.length+2+e.length/255+1;this.opusPendingTrimStart&&(h+=2),d&&(h+=2);const p=(0,c.sY)(h),f=(0,s.s3)(p,h);f[0]=127,f[1]=224,this.opusPendingTrimStart&&(f[1]|=16),d&&(f[1]|=8);let u=e.length,g=2;do{f[g]=Math.min(u,255),u-=255,g++}while(u>=0);let U=0;return this.opusPendingTrimStart&&(U=Math.min(this.opusPendingTrimStart,i),f[g]=(65280&U)>>8,f[g+1]=255&U,g+=2,this.opusPendingTrimStart-=U),d&&(d=Math.min(d,i-U),f[g]=(65280&d)>>8,f[g+1]=255&d,g+=2),f.set(e,g),(0,o.zu)(this.cache,t),(0,o.NX)(this.cache,p,h),this.cached=!0,0}receiveAVPacket(t){return this.cached?((0,o.Up)(t),(0,o.rN)(t,this.cache),this.cached=!1,0):d.LR}}},65451:(t,e,i)=>{i.d(e,{Ij:()=>d,XC:()=>c,kt:()=>o});var r=i(31865),n=i(729),a=i(44328);const s=[480,960,1920,2880,480,960,1920,2880,480,960,1920,2880,480,960,480,960,120,240,480,960,120,240,480,960,120,240,480,960,120,240,480,960];function o(t){let e=0,i=0,r=0;if(t.length<1)return 0;switch(e=t[0],i=s[e>>3],3&e){case 0:r=1;break;case 1:case 2:r=2;break;case 3:if(t.length<2)return 0;r=63&t[1]}return r*i}function c(t,e){if(!e&&t.sideData[1]&&(e=t.sideData[1]),e&&e.length>=19){const i=new r.A(e,!1);i.skip(9),t.codecpar.chLayout.nbChannels=i.readUint8(),t.codecpar.initialPadding=i.readUint16(),t.codecpar.sampleRate=i.readUint32(),t.codecpar.seekPreroll=Number((0,a.k)(BigInt(80),{den:1e3,num:1},{den:48e3,num:1}))}}function d(t){const e=new Uint8Array(19),i=new n.A(e,!1);return i.writeString("OpusHead"),i.writeUint8(1),i.writeUint8(t.chLayout.nbChannels),i.writeUint16(t.initialPadding),i.writeUint32(t.sampleRate),e}},55611:(t,e,i)=>{i.d(e,{Jk:()=>P,OD:()=>y,Ui:()=>C,XC:()=>F,ci:()=>I,oT:()=>m});var r=i(63939),n=i(50932),a=i(72739),s=i(729),o=i(31865),c=i(37246),d=i(14686),l=i(60264),h=i(71517),p=i(37837),f=i(23991),u=i(83314);const g=3;function U(t){const e=t.readU(9),i=t.readU(3),r=t.readU(2),n=t.readU(2),a=t.readU(3);t.readU(5),t.readU(2);const s=t.readU(6),o=t.readU(7),c=t.readU(1),d=t.readU(8),l=t.readU(1),h=t.readU(1),p=[],f=[];if(s){for(let e=0;e<s-1;e++)p[e]=t.readU(8);p[s-1]=t.readU(6)}else t.readU(6);if(i>1){let e=0;for(let r=i-2;r>=0;--r)e|=t.readU(1)<<r;for(let e=i;e<=8&&i>1;++e)t.readU(1);for(let r=i-2;r>=0;--r)e&1<<r&&(f[r]=t.readU(8))}const u=t.readU(8),g=[];if(u)for(let e=0;e<u;e++)g.push(t.readU(8));return{olsIdx:e,numSublayers:i,bitDepthMinus8:a,chromaFormatIdc:n,constantFrameRate:r,generalProfileIdc:o,generalTierFlag:c,generalLevelIdc:d,ptlFrameOnlyConstraintFlag:l,ptlMultilayerEnabledFlag:h,generalConstraintInfo:p,sublayerLevelIdc:f,generalSubProfileIdc:g,maxPictureWidth:t.readU(16),maxPictureHeight:t.readU(16),avgFramerate:t.readU(16)}}function w(t){const e=new o.A(t,!0);if(1&e.readUint8()){const i=new c.A;i.appendBuffer(t.subarray(1)),U(i),e.skip(i.getPos())}let i=[],r=[],n=[];const a=e.readUint8();for(let t=0;t<a;t++){const t=31&e.readUint8();let a=1;13!==t&&12!==t&&(a=e.readUint16());const s=[];for(let t=0;t<a;t++){const t=e.readUint16();s.push(e.readBuffer(t))}14===t?i=s:15===t?r=s:16===t&&(n=s)}return{vpss:i,spss:r,ppss:n}}function A(t,e,i){const r=e[0];let n;if(r){const t=b(r),e=new u.A;if(e.writeU(9,0),e.writeU(3,t.spsMaxSublayersMinus1+1),e.writeU(2,1),e.writeU(2,t.chromaFormatIdc),e.writeU(3,t.bitDepthMinus8),e.writeU(5,31),e.writeU(2,3),e.writeU(6,t.generalConstraintInfo.length),e.writeU(7,t.profile),e.writeU1(t.tierFlag),e.writeU(8,t.level),e.writeU1(t.ptlFrameOnlyConstraintFlag),e.writeU1(t.ptlMultilayerEnabledFlag),t.generalConstraintInfo.length){for(let i=0;i<t.generalConstraintInfo.length-1;i++)e.writeU(8,t.generalConstraintInfo[i]);e.writeU(6,t.generalConstraintInfo[t.generalConstraintInfo.length-1])}else e.writeU(6,63);if(t.spsMaxSublayersMinus1+1>1){let i=0;for(let e=t.spsMaxSublayersMinus1-1;e>=0;e--)i=i<<1|t.ptlSublayerLevelPresentFlag[e];e.writeU(8,i)}for(let i=t.spsMaxSublayersMinus1-1;i>=0;i--)t.ptlSublayerLevelPresentFlag[i]&&e.writeU(8,t.sublayerLevelIdc[i]);e.writeU(8,t.generalSubProfileIdc.length);for(let i=0;i<t.generalSubProfileIdc.length;i++)e.writeU(32,t.sublayerLevelIdc[i]);e.writeU(16,t.width),e.writeU(16,t.height),e.writeU(16,0),e.padding(),n=e.getBuffer().subarray(0,e.getPointer())}let o=1+(n?n.length:0);t.length&&(o+=3,o=t.reduce(((t,e)=>t+2+e.length),o)),e.length&&(o+=3,o=e.reduce(((t,e)=>t+2+e.length),o)),i.length&&(o+=3,o=i.reduce(((t,e)=>t+2+e.length),o));const c=new Uint8Array(o),d=new s.A(c,!0);d.writeUint8(g<<1|(n?1:0)|248),n&&d.writeBuffer(n);let l=0;return t.length&&l++,e.length&&l++,i.length&&l++,d.writeUint8(l),t.length&&(d.writeUint8(142),d.writeUint16(t.length),a.__(t,(t=>{d.writeUint16(t.length),d.writeBuffer(t)}))),e.length&&(d.writeUint8(143),d.writeUint16(e.length),a.__(e,(t=>{d.writeUint16(t.length),d.writeBuffer(t)}))),i.length&&(d.writeUint8(144),d.writeUint16(i.length),a.__(i,(t=>{d.writeUint16(t.length),d.writeBuffer(t)}))),c}function m(t){let e,i=!1,r=(0,l.py)(t);if(r.length>2){const t=[],i=[],n=[];r.forEach((e=>{const r=e[0]>>>1&63;14===r?t.push(e):15===r?i.push(e):16===r&&n.push(e)})),t.length&&i.length&&n.length&&(e=A(t,i,n),r=r.filter((t=>{const e=t[0]>>>1&63;return 14!==e&&15!==e&&16!==e&&20!==e})))}const n=r.reduce(((t,e)=>t+g+1+e.length),0),o=(0,p.sY)(n),c=(0,d.s3)(o,n),h=new s.A(c);return a.__(r,(t=>{3===g?h.writeUint32(t.length):2===g?h.writeUint24(t.length):1===g?h.writeUint16(t.length):h.writeUint8(t.length),h.writeBuffer(t.subarray(0));const e=t[0]>>>1&63;8!==e&&7!==e&&9!==e&&10!==e||(i=!0)})),{bufferPointer:o,length:n,extradata:e,key:i}}function y(t,e){const i=e?e[0]>>>1&3:g;let r=[],n=[],c=[],l=!1;if(e){const t=w(e);r=t.vpss,n=t.spss,c=t.ppss,l=!0}const h=[],f=new o.A(t);for(;f.remainingSize()>0;){let t=0;t=3===i?f.readUint32():2===i?f.readUint24():1===i?f.readUint16():f.readUint8(),h.push(f.readBuffer(t))}let u=r.reduce(((t,e)=>t+4+e.length),0);u=n.reduce(((t,e)=>t+4+e.length),u),u=c.reduce(((t,e)=>t+4+e.length),u),u=h.reduce(((t,e,i)=>t+(i?3:4)+e.length),u);const U=(0,p.sY)(u+7),A=(0,d.s3)(U,u+7),m=new s.A(A);return m.writeUint8(0),m.writeUint8(0),m.writeUint8(0),m.writeUint8(1),m.writeUint8(0),m.writeUint8(160),m.writeUint8(240),a.__(r,(t=>{m.writeUint8(0),m.writeUint8(0),m.writeUint8(0),m.writeUint8(1),m.writeBuffer(t)})),a.__(n,(t=>{m.writeUint8(0),m.writeUint8(0),m.writeUint8(0),m.writeUint8(1),m.writeBuffer(t)})),a.__(c,(t=>{m.writeUint8(0),m.writeUint8(0),m.writeUint8(0),m.writeUint8(1),m.writeBuffer(t)})),a.__(h,((t,e)=>{m.writeUint8(0),m.writeUint8(0),e||m.writeUint8(0),m.writeUint8(1),m.writeBuffer(t);const i=t[0]>>>1&63;8!==i&&7!==i&&9!==i&&10!==i||(l=!0)})),{bufferPointer:U,length:u+7,key:l}}function P(t,e){var i;if(!(1&r.f[15](t+36)))return;const n=(0,h.iI)(t);if((0,l.Bs)(n))return;const a=null!==(i=e.metadata.naluLengthSizeMinusOne)&&void 0!==i?i:g;let s=[],c=[],f=[];const u=new o.A(n);for(;u.remainingSize()>0;){let t=0;t=3===a?u.readUint32():2===a?u.readUint24():1===a?u.readUint16():u.readUint8();const e=n.subarray(0|Number(0xffffffffn&u.getPos()),(0|Number(0xffffffffn&u.getPos()))+t);u.skip(t);const i=e[0]>>>1&63;15===i?c.push(e):16===i?f.push(e):14===i&&s.push(e)}if(c.length||f.length||s.length){const e=A(s,c,f),i=(0,p.sY)(e.length);(0,d.lW)(i,e.length,e),(0,h.Ow)(t,1,i,e.length)}}function I(t,e=!1){if(!(1&r.f[15](t+36)||e))return;const i=(0,h.iI)(t);if(!(0,l.Bs)(i))return;let a=(0,l.py)(i);if(a.length>2){const e=[],i=[],s=[];if(a.forEach((t=>{const r=t[0]>>>1&63;14===r?e.push(t):15===r?i.push(t):16===r&&s.push(t)})),e.length&&i.length&&s.length){const a=A(e,i,s),o=(0,p.sY)(a.length);(0,d.lW)(o,a.length,a),(0,h.Ow)(t,1,o,a.length),n.M[15](t+36,1|r.f[15](t+36))}}}function F(t,e){if(!e&&t.sideData[1]&&(e=t.sideData[1]),e&&e.length>=6){t.metadata.naluLengthSizeMinusOne=e[0]>>>1&3;const{spss:i}=w(e);if(i.length){const{profile:e,level:r,width:n,height:a}=b(i[0]);t.codecpar.profile=e,t.codecpar.level=r,t.codecpar.width=n,t.codecpar.height=a}}}function b(t){if(!t||t.length<3)return;let e=0;0===t[0]&&0===t[1]&&0===t[2]&&1===t[3]&&(e=4);let i=0,r=0,n=0,a=0,s=0,o=1,d=0,h=0,p=0;const u=[],g=[],U=[],w=[],A=(0,l.BN)(t.subarray(e)),m=new c.A(A.length);m.appendBuffer(A),m.readU1(),m.readU1(),m.readU(6),m.readU(5),m.readU(3),m.readU(8);const y=m.readU(3);o=m.readU(2);const P=m.readU(2);if(m.readU(1)){if(i=m.readU(7),d=m.readU(1),r=m.readU(8),h=m.readU(1),p=m.readU(1),m.readU(1)){for(let t=0;t<8;t++)u[t]=m.readU(8);u[8]=m.readU(7);const t=m.readU(8);m.readU(t)}m.skipPadding();for(let t=y-1;t>=0;t--)g[t]=m.readU(1);m.skipPadding();for(let t=y-1;t>=0;t--)g[t]&&(U[t]=m.readU(8));const t=m.readU(8);if(t)for(let e=0;e<t;e++)w[e]=m.readU(32)}m.readU1(),m.readU1()&&m.readU1();const I=n=f.xb(m),F=a=f.xb(m);if(m.readU1()&&(f.xb(m),f.xb(m),f.xb(m),f.xb(m)),m.readU1()){const t=f.xb(m),e=P+5,i=1<<e,r=I/(1<<e),n=F/(1<<e),a=Math.ceil(Math.log2(r)),s=Math.ceil(Math.log2(n));let o=0,c=0,d=0;t>0&&(d=m.readU1(),c=m.readU1());for(let e=0;t>0&&e<=t;e++)c&&0!=e||(e>0&&I>i&&m.readU(a),e>0&&F>i&&m.readU(s),e<t&&I>i&&m.readU(a),e<t&&F>i&&m.readU(s)),d||m.readU(2);if(o=f.xb(m)+1,m.readU(1)&&m.readU(1))for(let e=0;e<=t;e++)m.readU(o)}return s=f.xb(m),{profile:i,level:r,width:n,height:a,chromaFormatIdc:o,bitDepthMinus8:s,generalProfileSpace:0,tierFlag:d,generalConstraintInfo:u,generalSubProfileIdc:w,ptlFrameOnlyConstraintFlag:h,ptlMultilayerEnabledFlag:p,spsMaxSublayersMinus1:y,ptlSublayerLevelPresentFlag:g,sublayerLevelIdc:U}}function C(t){const e=new c.A;return e.appendBuffer(t),1&e.readU(8)?U(e):{}}},15597:(t,e,i)=>{i.r(e),i.d(e,{default:()=>k});var r=i(134),n=i(61499),a=i(63939),s=i(9599),o=i(29170),c=i(19770),d=i(6403),l=i(51597),h=i(30469),p=i(72739),f=i(95335),u=i(76538),g=i(9848),U=i(60480),w=i(77662),A=i(52251),m=i(77231),y=i(14686),P=i(44328),I=i(71517),F=i(37837),b=i(4624),C="src/avformat/formats/OMpegtsFormat.ts";const v={pesMaxSize:2930,delay:1.4,latm:!1,patPeriod:.1};class k extends l.A{constructor(t={}){super(),(0,r.A)(this,"type",2),(0,r.A)(this,"context",void 0),(0,r.A)(this,"sdtPacket",void 0),(0,r.A)(this,"patPacket",void 0),(0,r.A)(this,"pmtPacket",void 0),(0,r.A)(this,"options",void 0),(0,r.A)(this,"firstDtsCheck",void 0),(0,r.A)(this,"firstVideoCheck",void 0),(0,r.A)(this,"lastPatDst",void 0),(0,r.A)(this,"patPeriod",void 0),this.context=(0,c.A)(),this.options=f.X$({},v,t),this.options.pesMaxSize=this.options.pesMaxSize?(this.options.pesMaxSize+14+183)/184*184-14:0,this.firstDtsCheck=!1,this.firstVideoCheck=!1,this.patPeriod=BigInt(Math.floor(this.options.patPeriod*m.SF))}init(t){return t.ioWriter.setEndian(!0),0}destroy(t){super.destroy(t),p.__(t.streams,(t=>{const e=t.privData;e.filter&&(e.filter.destroy(),e.filter=null)}))}writeHeader(t){return this.context.pat=new d.Cd,this.context.pat.program2PmtPid.set(1,4096),this.context.pmt=new d.I4,this.context.pmt.programNumber=1,p.__(t.streams,(t=>{t.timeBase.den=9e4,t.timeBase.num=1;const e=this.context.startPid++;this.context.pmt.pcrPid<=0&&(this.context.pmt.pcrPid=e);let i=h.Zp(t);const r=(0,u.A)();t.privData=r;const a=new d.am;a.pid=e,a.adaptationFieldControl=1,r.tsPacket=a,r.pid=e;let s=null;switch(i){case 15:this.options.latm?(r.latm=!0,i=17,s=new U.A):s=new g.A;break;case 27:case 36:s=new A.A;break;case 6:86076===t.codecpar.codecId&&(s=new w.A)}s&&s.init(t.codecpar[n.o9],t.timeBase[n.o9]),r.filter=s,this.context.pmt.pid2StreamType.set(e,i);const o=new d.xf;o.pid=e,o.streamType=i,o.streamId=h.kw(t),r.pes=o})),this.patPacket=new d.yU,this.pmtPacket=new d.yU,this.sdtPacket=new d.yU,this.sdtPacket.pid=17,this.sdtPacket.adaptationFieldControl=1,this.patPacket.pid=0,this.patPacket.adaptationFieldControl=1,this.pmtPacket.pid=4096,this.pmtPacket.adaptationFieldControl=1,this.sdtPacket.payload=h.Gj(),this.patPacket.payload=h.sG(this.context.pat),this.pmtPacket.payload=h.in(this.context.pmt,t.streams),h.Zn(t.ioWriter,this.sdtPacket,this.context),h.Zn(t.ioWriter,this.patPacket,this.context),h.Zn(t.ioWriter,this.pmtPacket,this.context),0}writeAVPacket(t,e){if(!a.f[15](e+28))return void b.R8(`packet's size is 0: ${a.f[15](e+32)}, ignore it`,C,211);const i=t.getStreamByIndex(a.f[15](e+32));if(!i)return void b.R8(`can not found the stream width the packet's streamIndex: ${a.f[15](e+32)}, ignore it`,C,218);this.firstDtsCheck||((0,P.k)(a.f[17](e+16),(0,o.A)(e+72,s.P),i.timeBase)<BigInt(Math.floor(9e4*this.options.delay))&&(this.context.delay=BigInt(Math.floor(9e4*this.options.delay))-(0,P.k)(a.f[17](e+16),(0,o.A)(e+72,s.P),i.timeBase)),this.firstDtsCheck=!0,this.lastPatDst=(0,P.k)(a.f[17](e+16),(0,o.A)(e+72,s.P),m.KR)),this.patPeriod>BigInt(0)&&(0,P.k)(a.f[17](e+16),(0,o.A)(e+72,s.P),m.KR)-this.lastPatDst>this.patPeriod&&(h.Zn(t.ioWriter,this.sdtPacket,this.context),h.Zn(t.ioWriter,this.patPacket,this.context),h.Zn(t.ioWriter,this.pmtPacket,this.context),this.lastPatDst=(0,P.k)(a.f[17](e+16),(0,o.A)(e+72,s.P),m.KR));const r=i.privData;let n=(0,I.iI)(e);if(r.filter){if(!this.firstVideoCheck&&!(0,I.fQ)(e,1)&&i.codecpar.extradata&&(27===i.codecpar.codecId||173===i.codecpar.codecId||196===i.codecpar.codecId||12===i.codecpar.codecId)){this.firstVideoCheck=!0;const t=(0,F.sY)(i.codecpar.extradataSize);(0,y.Mr)(t,i.codecpar.extradata,i.codecpar.extradataSize),(0,I.Ow)(e,1,t,i.codecpar.extradataSize)}r.filter.sendAVPacket(e),r.filter.receiveAVPacket(e),n=(0,I.iI)(e)}if(!n.length)return 0;n=n.slice();let c=!1;return(r.pesSlices.total+n.length>this.options.pesMaxSize||0===i.codecpar.codecType)&&(0===r.pesSlices.total&&(r.pesSlices.total=n.length,r.pesSlices.buffers.push(n),a.f[17](e+16)!==m.Dh&&(r.pes.dts=(0,P.k)(a.f[17](e+16),(0,o.A)(e+72,s.P),i.timeBase)+this.context.delay),a.f[17](e+8)!==m.Dh&&(r.pes.pts=(0,P.k)(a.f[17](e+8),(0,o.A)(e+72,s.P),i.timeBase)+this.context.delay),c=!0),1&a.f[15](e+36)&&(r.pes.randomAccessIndicator=1),h.CE(t.ioWriter,r.pes,r.pesSlices,i,this.context),r.pesSlices.total=0,r.pesSlices.buffers=[]),c||(0===r.pesSlices.total&&(a.f[17](e+16)!==m.Dh&&(r.pes.dts=(0,P.k)(a.f[17](e+16),(0,o.A)(e+72,s.P),i.timeBase)+this.context.delay),a.f[17](e+8)!==m.Dh&&(r.pes.pts=(0,P.k)(a.f[17](e+8),(0,o.A)(e+72,s.P),i.timeBase)+this.context.delay),1&a.f[15](e+36)&&(r.pes.randomAccessIndicator=1)),r.pesSlices.total+=n.length,r.pesSlices.buffers.push(n)),0}writeTrailer(t){return p.__(t.streams,(e=>{const i=e.privData;i.pesSlices.total&&h.CE(t.ioWriter,i.pes,i.pesSlices,e,this.context),i.pesSlices.total=0,i.pesSlices.buffers=[]})),t.ioWriter.flush(),0}flush(t){return t.ioWriter.flush(),0}}},50762:(t,e,i)=>{function r(t){let e=4294967295;for(let i=0;i<t.length;i++){e^=t[i]<<24;for(let t=0;t<8;t++)2147483648&e?e=e<<1^79764919:e<<=1}return e>>>0}i.d(e,{E:()=>r})},19770:(t,e,i)=>{i.d(e,{A:()=>o});var r=i(80662),n=i.n(r),a=i(77231),s=i(6403);function o(){return{currentProgram:a.N_,currentPmtPid:a.N_,tsPacketSize:a.N_,hasPAT:!1,hasPMT:!1,tsSliceQueueMap:new(n()),pat:new s.Cd,pmt:new s.I4,program2Pmt:new(n()),ioEnd:!1,startPid:256,delay:BigInt(0)}}},76538:(t,e,i)=>{i.d(e,{A:()=>n});var r=i(77231);function n(){return{pid:r.N_,filter:null,tsPacket:null,pes:null,continuityCounter:0,pesSlices:{total:0,buffers:[]},latm:!1}}},27274:(t,e,i)=>{i.d(e,{$x:()=>h,GV:()=>s,OS:()=>d,VG:()=>n,ZT:()=>a,eR:()=>r,hY:()=>c,pm:()=>o,qJ:()=>l});const r=204,n=192,a=188,s=204,o=8192,c=5,d=5,l=10,h={15:[1,86018],17:[1,86018],3:[1,86017],4:[1,86017],27:[0,27],36:[0,173],51:[0,196],129:[1,86019],135:[1,86056]}},30469:(t,e,i)=>{i.d(e,{CE:()=>m,Gj:()=>U,Zn:()=>y,Zp:()=>p,in:()=>g,kw:()=>f,sG:()=>u});var r=i(63939),n=i(27274),a=i(4624),s=i(65977),o=i(92647),c=i(77231),d=i(50762),l="src/avformat/formats/mpegts/ompegts.ts";function h(t){if(2!==t.adaptationFieldControl&&3!==t.adaptationFieldControl)return 0;if(2===t.adaptationFieldControl)return n.ZT-4;let e=2;return t.adaptationFieldInfo.pcrFlag&&(e+=6),t.adaptationFieldInfo.opcrFlag&&(e+=6),t.adaptationFieldInfo.splicingPointFlag&&(e+=1),t.adaptationFieldInfo.transportPrivateDataFlag&&(e+=t.adaptationFieldInfo.transportPrivateData?t.adaptationFieldInfo.transportPrivateData.length:0),t.adaptationFieldInfo.adaptationFieldExtensionFlag&&(e+=t.adaptationFieldInfo.extension?t.adaptationFieldInfo.extension.length:0),e>256&&a.R8("adaptationField size is too large",l,68),e}function p(t){const e=t.privData||{};switch(t.codecpar.codecId){case 1:case 2:return 2;case 12:return 16;case 27:return 27;case 87:return 66;case 173:return 36;case 196:return 51;case 116:return 209;case 70:return 234;case 86016:case 86017:return t.codecpar.sampleRate<32e3?4:3;case 86018:return e.latm?17:15;case 86065:return 17;case 86019:return 129;case 86076:case 225:case 94209:case 98311:default:return 6;case 86060:return 131;case 86056:return 135;case 86020:return 130}}function f(t){return 0===t.codecpar.codecType?116===t.codecpar.codecId?253:224:1!==t.codecpar.codecType||86016!==t.codecpar.codecId&&86017!==t.codecpar.codecId&&86018!==t.codecpar.codecId?1===t.codecpar.codecType&&86019===t.codecpar.codecId?253:2===t.codecpar.codecType?252:189:192}function u(t){const e=new Uint8Array(1024);e[1]=0,e[2]=176,e[5]=1,e[6]=193;let i=9;t.networkPid>-1&&(i+=2,e[i++]=224|t.networkPid>>8&31,e[i++]=255&t.networkPid),t.program2PmtPid.forEach(((t,r)=>{e[i++]=r>>8&255,e[i++]=255&r,e[i++]=224|t>>8&31,e[i++]=255&t}));const r=i;i+=4;for(let t=i;t<n.ZT-4;t++)e[t]=255;const a=i-1-3;e[2]|=a>>8&15,e[3]=255&a;const s=(0,d.E)(e.subarray(1,r));return e[r]=s>>24&255,e[r+1]=s>>16&255,e[r+2]=s>>8&255,e[r+3]=255&s,e.slice(0,n.ZT-4)}function g(t,e){const i=new Uint8Array(1024);i[1]=2,i[2]=176,i[4]=t.programNumber>>8&15,i[5]=255&t.programNumber,i[6]=193;let a=9;i[a++]=224|t.pcrPid>>8&31,i[a++]=255&t.pcrPid;const o=a;function c(t){i[a++]=n.OS,i[a++]=4,i[a++]=t>>24,i[a++]=t>>16,i[a++]=t>>8,i[a++]=t}a+=2;let l=61440|a-o-2;i[o]=l>>8,i[o+1]=l;for(let t=0;t<e.length;t++){const o=p(e[t]);i[a++]=o;const d=e[t].privData;i[a++]=224|d.pid>>8&31,i[a++]=255&d.pid;const l=a;a+=2;const h=e[t].codecpar.codecId;switch(e[t].codecpar.codecType){case 1:86019===h&&c((0,s.A)("AC-3")),86056===h&&c((0,s.A)("EAC3")),65562===h&&c((0,s.A)("BSSD")),86076===h&&(c((0,s.A)("Opus")),i[a++]=127,i[a++]=2,i[a++]=128,i[a++]=e[t].codecpar.chLayout.nbChannels),i[a++]=n.qJ,i[a++]=4,i[a++]=117,i[a++]=110,i[a++]=100,i[a++]=0;break;case 0:if(225===h&&(c((0,s.A)("AV01")),e[t].codecpar.extradata)){i[a++]=128,i[a++]=e[t].codecpar.extradataSize;for(let n=0;n<e[t].codecpar.extradataSize;n++)i[a++]=r.f[2](e[t].codecpar.extradata+n)}}let f=61440|a-l-2;i[l]=f>>8,i[l+1]=f}const h=a;a+=4;for(let t=a;t<n.ZT-4;t++)i[t]=255;l=a-1-3,i[2]|=l>>8&15,i[3]=255&l;const f=(0,d.E)(i.subarray(1,h));return i[h]=f>>24&255,i[h+1]=f>>16&255,i[h+2]=f>>8&255,i[h+3]=255&f,i.slice(0,n.ZT-4)}function U(){const t=new Uint8Array(1024);t[1]=66,t[2]=240,t[5]=1,t[6]=193;let e=9;t[e++]=255,t[e++]=1,t[e++]=255,t[e++]=0,t[e++]=1,t[e++]=252;const i=e;e+=2,t[e++]=72;const r=e++;t[e++]=1;t[e++]=9;for(let i=0;i<9;i++)t[e]="format-js".charCodeAt(i),e++;t[e++]=9;for(let i=0;i<9;i++)t[e]="Service01".charCodeAt(i),e++;t[r]=e-r-1;let a=32768|e-i-2;t[i]=a>>8&255,t[i+1]=255&a;const s=e;e+=4;for(let i=e;i<n.ZT-4;i++)t[i]=255;const o=e-1-3;t[2]|=o>>8&15,t[3]=255&o;const c=(0,d.E)(t.subarray(1,s));return t[s]=c>>24&255,t[s+1]=c>>16&255,t[s+2]=c>>8&255,t[s+3]=255&c,t.slice(0,n.ZT-4)}function w(t,e,i){var r;i.tsPacketSize===n.VG&&t.skip(4),e.payload&&0!==e.payload.length||(e.adaptationFieldControl=2),1===e.adaptationFieldControl&&e.payload.length+4<n.ZT&&(e.adaptationFieldControl=3);const s=t.getPos();t.writeUint8(71);let o=0;e.payloadUnitStartIndicator&&(o|=64),o|=e.transportPriority<<5,o|=e.pid>>8,t.writeUint8(o),t.writeUint8(255&e.pid),o=(3&e.transportScramblingControl)<<6,o|=(3&e.adaptationFieldControl)<<4,o|=15&e.continuityCounter,t.writeUint8(o);let c=h(e),d=n.ZT-4-c;if(null!==(r=e.payload)&&void 0!==r&&r.length&&(d-=e.payload.length),2===e.adaptationFieldControl||3===e.adaptationFieldControl){const i=t.getPos();if(t.writeUint8(c-1+d),o=(1&e.adaptationFieldInfo.discontinuityIndicator)<<7,o|=(1&e.adaptationFieldInfo.randomAccessIndicator)<<6,o|=(1&e.adaptationFieldInfo.elementaryStreamPriorityIndicator)<<5,o|=(1&e.adaptationFieldInfo.pcrFlag)<<4,o|=(1&e.adaptationFieldInfo.opcrFlag)<<3,o|=(1&e.adaptationFieldInfo.splicingPointFlag)<<2,o|=(1&e.adaptationFieldInfo.transportPrivateDataFlag)<<1,o|=1&e.adaptationFieldInfo.adaptationFieldExtensionFlag,t.writeUint8(o),e.adaptationFieldInfo.pcrFlag){const i=Number(e.adaptationFieldInfo.pcr%BigInt(300)),r=Number((e.adaptationFieldInfo.pcr-BigInt(Math.floor(i)))/BigInt(300));t.writeUint8(r>>25&255),t.writeUint8(r>>17&255),t.writeUint8(r>>9&255),t.writeUint8(r>>1&255),t.writeUint8(r<<7|i>>8|126),t.writeUint8(i)}if(e.adaptationFieldInfo.opcrFlag){const i=Number(e.adaptationFieldInfo.pcr%BigInt(300)),r=Number((e.adaptationFieldInfo.pcr-BigInt(Math.floor(i)))/BigInt(300));t.writeUint8(r>>25&255),t.writeUint8(r>>17&255),t.writeUint8(r>>9&255),t.writeUint8(r>>1&255),t.writeUint8(r<<7|i>>8|126),t.writeUint8(i)}e.adaptationFieldInfo.splicingPointFlag&&t.writeUint8(e.adaptationFieldInfo.spliceCountDown),e.adaptationFieldInfo.transportPrivateDataFlag&&(e.adaptationFieldInfo.transportPrivateData&&e.adaptationFieldInfo.transportPrivateData.length?(t.writeUint8(e.adaptationFieldInfo.transportPrivateData.length),t.writeBuffer(e.adaptationFieldInfo.transportPrivateData)):t.writeUint8(0)),e.adaptationFieldInfo.adaptationFieldExtensionFlag&&(e.adaptationFieldInfo.extension&&e.adaptationFieldInfo.extension.length?(t.writeUint8(e.adaptationFieldInfo.extension.length),t.writeBuffer(e.adaptationFieldInfo.extension)):t.writeUint8(0));const r=Number(t.getPos()-i);for(r<c&&t.skip(c-r);d>0;)t.writeUint8(255),d--}var p;1!==e.adaptationFieldControl&&3!==e.adaptationFieldControl||null!==(p=e.payload)&&void 0!==p&&p.length&&t.writeBuffer(e.payload),Number(t.getPos()-s)!==n.ZT&&a.z3(`write error data size to ts packet, need ${n.ZT}, wrote: ${Number(t.getPos()-s)}`,l,641),i.tsPacketSize===n.eR&&t.skip(16)}function A(t,e,i,r){let n=i<<4|(7&Number(r>>BigInt(30)))<<1|1;t[e++]=n,n=(32767&Number(r>>BigInt(15)))<<1|1,t[e++]=n>>8&255,t[e++]=255&n,n=Number(r&BigInt(32767))<<1|1,t[e++]=n>>8&255,t[e++]=255&n}function m(t,e,i,r,a){const s=e.streamId,d=new Uint8Array(function(t){let e=6;const i=t.streamId;return 188!==i&&190!==i&&191!==i&&240!==i&&241!==i&&255!==i&&242!==i&&248!==i&&(e+=3,t.pts!==c.Dh&&(e+=5),t.dts!==c.Dh&&t.pts!==c.Dh&&t.dts!==t.pts&&(e+=5)),e}(e));d[2]=1,d[3]=s;let l=i.total;if(188!==s&&190!==s&&191!==s&&240!==s&&241!==s&&255!==s&&242!==s&&248!==s){let t=0,i=0;e.pts!==c.Dh&&(i+=5,t|=128),e.dts!==c.Dh&&e.pts!==c.Dh&&e.dts!==e.pts&&(i+=5,t|=64);let n=128;3!==r.codecpar.codecType&&2!==r.codecpar.codecType||(n|=4),d[6]=n,d[7]=t,d[8]=i,l+=i+3,e.pts!==c.Dh&&A(d,9,t>>6,e.pts),e.dts!==c.Dh&&e.pts!==c.Dh&&e.dts!==e.pts&&A(d,14,1,e.dts)}l<=c.zg&&0!==r.codecpar.codecType&&(d[4]=l>>8&255,d[5]=255&l),function(t,e,i,r,a){const s=r.privData,o=s.tsPacket;e.pid===a.pmt.pcrPid&&(o.adaptationFieldControl=3,o.adaptationFieldInfo.pcrFlag=1,o.adaptationFieldInfo.pcr=e.dts*BigInt(300)),o.adaptationFieldInfo.randomAccessIndicator=e.randomAccessIndicator,e.randomAccessIndicator&&(o.adaptationFieldControl=3);let c=h(o),d=s.continuityCounter;if(4+c+i.length<=n.ZT)return o.payloadUnitStartIndicator=1,o.payload=i,o.continuityCounter=d++%16,w(t,o,a),void(s.continuityCounter=d%16);let l=n.ZT-(4+c),p=0;for(;p<i.length;){let e=Math.min(p+l,i.length);o.payloadUnitStartIndicator=0===p?1:0,1===o.adaptationFieldControl&&e-p+4==n.ZT-1&&e--,o.payload=i.subarray(p,e),o.continuityCounter=d++%16,w(t,o,a),0===p&&(o.adaptationFieldInfo.randomAccessIndicator=0,o.adaptationFieldControl=1,o.adaptationFieldInfo.pcrFlag=0,c=h(o),l=n.ZT-(4+c)),p=e}s.continuityCounter=d%16}(t,e,(0,o.A)(Uint8Array,[d,...i.buffers]),r,a)}function y(t,e,i){const r=h(e);let a=e.continuityCounter;if(4+r+e.payload.length<=n.ZT)return e.payloadUnitStartIndicator=1,e.continuityCounter=a++%16,w(t,e,i),void(e.continuityCounter=a%16);const s=n.ZT-(4+r);let o=0;const c=e.payload;for(;o<c.length;){let d=Math.min(o+s,c.length);e.payloadUnitStartIndicator=0===o?1:0;const l=d-o;l+4===n.ZT?e.adaptationFieldControl=1:0===r&&l+4+1===n.ZT&&d--,e.payload=c.subarray(o,d),e.continuityCounter=a++%16,w(t,e,i),o=d}e.continuityCounter=a%16}},6403:(t,e,i)=>{i.d(e,{Cd:()=>l,I4:()=>f,am:()=>c,kJ:()=>p,pi:()=>d,xf:()=>u,yU:()=>h});var r=i(134),n=i(80662),a=i.n(n),s=i(77231);class o{constructor(){(0,r.A)(this,"discontinuityIndicator",0),(0,r.A)(this,"randomAccessIndicator",0),(0,r.A)(this,"elementaryStreamPriorityIndicator",0),(0,r.A)(this,"pcrFlag",0),(0,r.A)(this,"opcrFlag",0),(0,r.A)(this,"splicingPointFlag",0),(0,r.A)(this,"transportPrivateDataFlag",0),(0,r.A)(this,"adaptationFieldExtensionFlag",0),(0,r.A)(this,"pcr",BigInt(0)),(0,r.A)(this,"opcr",BigInt(0)),(0,r.A)(this,"spliceCountDown",0),(0,r.A)(this,"transportPrivateData",null),(0,r.A)(this,"extension",null)}}class c{constructor(){(0,r.A)(this,"pos",s.Dh),(0,r.A)(this,"payloadUnitStartIndicator",0),(0,r.A)(this,"transportPriority",0),(0,r.A)(this,"pid",s.N_),(0,r.A)(this,"adaptationFieldControl",0),(0,r.A)(this,"continuityCounter",0),(0,r.A)(this,"transportScramblingControl",0),(0,r.A)(this,"adaptationFieldInfo",new o),(0,r.A)(this,"payload",null)}}class d{constructor(){(0,r.A)(this,"slices",[]),(0,r.A)(this,"totalLength",0),(0,r.A)(this,"expectedLength",s.N_),(0,r.A)(this,"randomAccessIndicator",0),(0,r.A)(this,"pid",s.N_),(0,r.A)(this,"streamType",0),(0,r.A)(this,"pos",s.Dh)}}class l{constructor(){(0,r.A)(this,"versionNumber",0),(0,r.A)(this,"networkPid",s.N_),(0,r.A)(this,"program2PmtPid",new(a()))}}class h extends c{}class p{constructor(){(0,r.A)(this,"tag",void 0),(0,r.A)(this,"buffer",void 0)}}class f{constructor(){(0,r.A)(this,"versionNumber",0),(0,r.A)(this,"programNumber",0),(0,r.A)(this,"pcrPid",0),(0,r.A)(this,"pid2StreamType",new(a())),(0,r.A)(this,"pid2ESDescriptor",new(a()))}}class u{constructor(){(0,r.A)(this,"pid",s.N_),(0,r.A)(this,"streamType",0),(0,r.A)(this,"streamId",s.N_),(0,r.A)(this,"dts",s.Dh),(0,r.A)(this,"pts",s.Dh),(0,r.A)(this,"pos",s.Dh),(0,r.A)(this,"payload",null),(0,r.A)(this,"data",null),(0,r.A)(this,"randomAccessIndicator",0)}}},65977:(t,e,i)=>{i.d(e,{A:()=>a});var r=i(4624),n="src/avformat/function/mktag.ts";function a(t){4!==t.length&&r.R8(`tag length is not 4, tag: ${t}`,n,30);let e=0;for(let i=0;i<4;i++)e=e<<8|t.charCodeAt(i);return e}}}]);