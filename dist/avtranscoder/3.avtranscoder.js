"use strict";(self.webpackChunkAVTranscoder=self.webpackChunkAVTranscoder||[]).push([[3],{64436:(e,t,i)=>{i.d(t,{A:()=>c});var a=i(134),r=i(63939),s=i(37837),o=i(71766);class c{constructor(){(0,a.A)(this,"inCodecpar",void 0),(0,a.A)(this,"inTimeBase",void 0),(0,a.A)(this,"outCodecpar",void 0)}init(e,t){return this.inCodecpar=(0,s.Gy)(168),(0,o.Yi)(this.inCodecpar,e),this.inTimeBase={den:r.f[15](t+4),num:r.f[15](t)},0}destroy(){this.inCodecpar&&((0,o.dn)(this.inCodecpar),this.inCodecpar=0)}}},26173:(e,t,i)=>{i.d(t,{A:()=>U});var a=i(134),r=i(63939),s=i(50932),o=i(64436),c=i(71517),n=i(20620),d=i(53e3),h=i(55611),l=i(14686),f=i(9705),p=i(60264),u=i(37837),w=i(4624);class U extends o.A{constructor(...e){super(...e),(0,a.A)(this,"cache",void 0),(0,a.A)(this,"cached",void 0)}init(e,t){return super.init(e,t),this.cache=(0,c._5)(),this.cached=!1,0}destroy(){super.destroy(),(0,c.Qe)(this.cache),this.cache=0}sendAVPacket(e){const t=(0,l.JW)(r.f[20](e+24),r.f[15](e+28));if(1!==r.f[15](e+80)&&(0,p.Bs)(t)){let i;if((0,c.zu)(this.cache,e),27===r.f[15](this.inCodecpar+4)||12===r.f[15](this.inCodecpar+4)?i=n.oT(t):173===r.f[15](this.inCodecpar+4)?i=d.oT(t):196===r.f[15](this.inCodecpar+4)?i=h.oT(t):w.h2(`not support for codecId: ${r.f[15](this.inCodecpar+4)}`,"src/avformat/bsf/h2645/Annexb2AvccFilter.ts",93),s.M[15](this.cache+80,1),(0,c.NX)(this.cache,i.bufferPointer,i.length),i.key&&s.M[15](this.cache+36,1|r.f[15](this.cache+36)),i.extradata){const e=(0,u.sY)(i.extradata.length);(0,l.lW)(e,i.extradata.length,i.extradata),(0,c.Ow)(this.cache,1,e,i.extradata.length)}}else(0,c.rN)(this.cache,e);return this.cached=!0,0}receiveAVPacket(e){return this.cached?((0,c.Up)(e),(0,c.rN)(e,this.cache),this.cached=!1,0):f.LR}}},55611:(e,t,i)=>{i.d(t,{Jk:()=>y,OD:()=>I,Ui:()=>M,XC:()=>k,ci:()=>b,oT:()=>x});var a=i(63939),r=i(50932),s=i(72739),o=i(729),c=i(31865),n=i(37246),d=i(14686),h=i(60264),l=i(71517),f=i(37837),p=i(23991),u=i(83314);const w=3;function U(e){const t=e.readU(9),i=e.readU(3),a=e.readU(2),r=e.readU(2),s=e.readU(3);e.readU(5),e.readU(2);const o=e.readU(6),c=e.readU(7),n=e.readU(1),d=e.readU(8),h=e.readU(1),l=e.readU(1),f=[],p=[];if(o){for(let t=0;t<o-1;t++)f[t]=e.readU(8);f[o-1]=e.readU(6)}else e.readU(6);if(i>1){let t=0;for(let a=i-2;a>=0;--a)t|=e.readU(1)<<a;for(let t=i;t<=8&&i>1;++t)e.readU(1);for(let a=i-2;a>=0;--a)t&1<<a&&(p[a]=e.readU(8))}const u=e.readU(8),w=[];if(u)for(let t=0;t<u;t++)w.push(e.readU(8));return{olsIdx:t,numSublayers:i,bitDepthMinus8:s,chromaFormatIdc:r,constantFrameRate:a,generalProfileIdc:c,generalTierFlag:n,generalLevelIdc:d,ptlFrameOnlyConstraintFlag:h,ptlMultilayerEnabledFlag:l,generalConstraintInfo:f,sublayerLevelIdc:p,generalSubProfileIdc:w,maxPictureWidth:e.readU(16),maxPictureHeight:e.readU(16),avgFramerate:e.readU(16)}}function g(e){const t=new c.A(e,!0);if(1&t.readUint8()){const i=new n.A;i.appendBuffer(e.subarray(1)),U(i),t.skip(i.getPos())}let i=[],a=[],r=[];const s=t.readUint8();for(let e=0;e<s;e++){const e=31&t.readUint8();let s=1;13!==e&&12!==e&&(s=t.readUint16());const o=[];for(let e=0;e<s;e++){const e=t.readUint16();o.push(t.readBuffer(e))}14===e?i=o:15===e?a=o:16===e&&(r=o)}return{vpss:i,spss:a,ppss:r}}function m(e,t,i){const a=t[0];let r;if(a){const e=v(a),t=new u.A;if(t.writeU(9,0),t.writeU(3,e.spsMaxSublayersMinus1+1),t.writeU(2,1),t.writeU(2,e.chromaFormatIdc),t.writeU(3,e.bitDepthMinus8),t.writeU(5,31),t.writeU(2,3),t.writeU(6,e.generalConstraintInfo.length),t.writeU(7,e.profile),t.writeU1(e.tierFlag),t.writeU(8,e.level),t.writeU1(e.ptlFrameOnlyConstraintFlag),t.writeU1(e.ptlMultilayerEnabledFlag),e.generalConstraintInfo.length){for(let i=0;i<e.generalConstraintInfo.length-1;i++)t.writeU(8,e.generalConstraintInfo[i]);t.writeU(6,e.generalConstraintInfo[e.generalConstraintInfo.length-1])}else t.writeU(6,63);if(e.spsMaxSublayersMinus1+1>1){let i=0;for(let t=e.spsMaxSublayersMinus1-1;t>=0;t--)i=i<<1|e.ptlSublayerLevelPresentFlag[t];t.writeU(8,i)}for(let i=e.spsMaxSublayersMinus1-1;i>=0;i--)e.ptlSublayerLevelPresentFlag[i]&&t.writeU(8,e.sublayerLevelIdc[i]);t.writeU(8,e.generalSubProfileIdc.length);for(let i=0;i<e.generalSubProfileIdc.length;i++)t.writeU(32,e.sublayerLevelIdc[i]);t.writeU(16,e.width),t.writeU(16,e.height),t.writeU(16,0),t.padding(),r=t.getBuffer().subarray(0,t.getPointer())}let c=1+(r?r.length:0);e.length&&(c+=3,c=e.reduce(((e,t)=>e+2+t.length),c)),t.length&&(c+=3,c=t.reduce(((e,t)=>e+2+t.length),c)),i.length&&(c+=3,c=i.reduce(((e,t)=>e+2+t.length),c));const n=new Uint8Array(c),d=new o.A(n,!0);d.writeUint8(w<<1|(r?1:0)|248),r&&d.writeBuffer(r);let h=0;return e.length&&h++,t.length&&h++,i.length&&h++,d.writeUint8(h),e.length&&(d.writeUint8(142),d.writeUint16(e.length),s.__(e,(e=>{d.writeUint16(e.length),d.writeBuffer(e)}))),t.length&&(d.writeUint8(143),d.writeUint16(t.length),s.__(t,(e=>{d.writeUint16(e.length),d.writeBuffer(e)}))),i.length&&(d.writeUint8(144),d.writeUint16(i.length),s.__(i,(e=>{d.writeUint16(e.length),d.writeBuffer(e)}))),n}function x(e){let t,i=!1,a=(0,h.py)(e);if(a.length>2){const e=[],i=[],r=[];a.forEach((t=>{const a=t[0]>>>1&63;14===a?e.push(t):15===a?i.push(t):16===a&&r.push(t)})),e.length&&i.length&&r.length&&(t=m(e,i,r),a=a.filter((e=>{const t=e[0]>>>1&63;return 14!==t&&15!==t&&16!==t&&20!==t})))}const r=a.reduce(((e,t)=>e+w+1+t.length),0),c=(0,f.sY)(r),n=(0,d.s3)(c,r),l=new o.A(n);return s.__(a,(e=>{3===w?l.writeUint32(e.length):2===w?l.writeUint24(e.length):1===w?l.writeUint16(e.length):l.writeUint8(e.length),l.writeBuffer(e.subarray(0));const t=e[0]>>>1&63;8!==t&&7!==t&&9!==t&&10!==t||(i=!0)})),{bufferPointer:c,length:r,extradata:t,key:i}}function I(e,t){const i=t?t[0]>>>1&3:w;let a=[],r=[],n=[],h=!1;if(t){const e=g(t);a=e.vpss,r=e.spss,n=e.ppss,h=!0}const l=[],p=new c.A(e);for(;p.remainingSize()>0;){let e=0;e=3===i?p.readUint32():2===i?p.readUint24():1===i?p.readUint16():p.readUint8(),l.push(p.readBuffer(e))}let u=a.reduce(((e,t)=>e+4+t.length),0);u=r.reduce(((e,t)=>e+4+t.length),u),u=n.reduce(((e,t)=>e+4+t.length),u),u=l.reduce(((e,t,i)=>e+(i?3:4)+t.length),u);const U=(0,f.sY)(u+7),m=(0,d.s3)(U,u+7),x=new o.A(m);return x.writeUint8(0),x.writeUint8(0),x.writeUint8(0),x.writeUint8(1),x.writeUint8(0),x.writeUint8(160),x.writeUint8(240),s.__(a,(e=>{x.writeUint8(0),x.writeUint8(0),x.writeUint8(0),x.writeUint8(1),x.writeBuffer(e)})),s.__(r,(e=>{x.writeUint8(0),x.writeUint8(0),x.writeUint8(0),x.writeUint8(1),x.writeBuffer(e)})),s.__(n,(e=>{x.writeUint8(0),x.writeUint8(0),x.writeUint8(0),x.writeUint8(1),x.writeBuffer(e)})),s.__(l,((e,t)=>{x.writeUint8(0),x.writeUint8(0),t||x.writeUint8(0),x.writeUint8(1),x.writeBuffer(e);const i=e[0]>>>1&63;8!==i&&7!==i&&9!==i&&10!==i||(h=!0)})),{bufferPointer:U,length:u+7,key:h}}function y(e,t){var i;if(!(1&a.f[15](e+36)))return;const r=(0,l.iI)(e);if((0,h.Bs)(r))return;const s=null!==(i=t.metadata.naluLengthSizeMinusOne)&&void 0!==i?i:w;let o=[],n=[],p=[];const u=new c.A(r);for(;u.remainingSize()>0;){let e=0;e=3===s?u.readUint32():2===s?u.readUint24():1===s?u.readUint16():u.readUint8();const t=r.subarray(0|Number(0xffffffffn&u.getPos()),(0|Number(0xffffffffn&u.getPos()))+e);u.skip(e);const i=t[0]>>>1&63;15===i?n.push(t):16===i?p.push(t):14===i&&o.push(t)}if(n.length||p.length||o.length){const t=m(o,n,p),i=(0,f.sY)(t.length);(0,d.lW)(i,t.length,t),(0,l.Ow)(e,1,i,t.length)}}function b(e,t=!1){if(!(1&a.f[15](e+36)||t))return;const i=(0,l.iI)(e);if(!(0,h.Bs)(i))return;let s=(0,h.py)(i);if(s.length>2){const t=[],i=[],o=[];if(s.forEach((e=>{const a=e[0]>>>1&63;14===a?t.push(e):15===a?i.push(e):16===a&&o.push(e)})),t.length&&i.length&&o.length){const s=m(t,i,o),c=(0,f.sY)(s.length);(0,d.lW)(c,s.length,s),(0,l.Ow)(e,1,c,s.length),r.M[15](e+36,1|a.f[15](e+36))}}}function k(e,t){if(!t&&e.sideData[1]&&(t=e.sideData[1]),t&&t.length>=6){e.metadata.naluLengthSizeMinusOne=t[0]>>>1&3;const{spss:i}=g(t);if(i.length){const{profile:t,level:a,width:r,height:s}=v(i[0]);e.codecpar.profile=t,e.codecpar.level=a,e.codecpar.width=r,e.codecpar.height=s}}}function v(e){if(!e||e.length<3)return;let t=0;0===e[0]&&0===e[1]&&0===e[2]&&1===e[3]&&(t=4);let i=0,a=0,r=0,s=0,o=0,c=1,d=0,l=0,f=0;const u=[],w=[],U=[],g=[],m=(0,h.BN)(e.subarray(t)),x=new n.A(m.length);x.appendBuffer(m),x.readU1(),x.readU1(),x.readU(6),x.readU(5),x.readU(3),x.readU(8);const I=x.readU(3);c=x.readU(2);const y=x.readU(2);if(x.readU(1)){if(i=x.readU(7),d=x.readU(1),a=x.readU(8),l=x.readU(1),f=x.readU(1),x.readU(1)){for(let e=0;e<8;e++)u[e]=x.readU(8);u[8]=x.readU(7);const e=x.readU(8);x.readU(e)}x.skipPadding();for(let e=I-1;e>=0;e--)w[e]=x.readU(1);x.skipPadding();for(let e=I-1;e>=0;e--)w[e]&&(U[e]=x.readU(8));const e=x.readU(8);if(e)for(let t=0;t<e;t++)g[t]=x.readU(32)}x.readU1(),x.readU1()&&x.readU1();const b=r=p.xb(x),k=s=p.xb(x);if(x.readU1()&&(p.xb(x),p.xb(x),p.xb(x),p.xb(x)),x.readU1()){const e=p.xb(x),t=y+5,i=1<<t,a=b/(1<<t),r=k/(1<<t),s=Math.ceil(Math.log2(a)),o=Math.ceil(Math.log2(r));let c=0,n=0,d=0;e>0&&(d=x.readU1(),n=x.readU1());for(let t=0;e>0&&t<=e;t++)n&&0!=t||(t>0&&b>i&&x.readU(s),t>0&&k>i&&x.readU(o),t<e&&b>i&&x.readU(s),t<e&&k>i&&x.readU(o)),d||x.readU(2);if(c=p.xb(x)+1,x.readU(1)&&x.readU(1))for(let t=0;t<=e;t++)x.readU(c)}return o=p.xb(x),{profile:i,level:a,width:r,height:s,chromaFormatIdc:c,bitDepthMinus8:o,generalProfileSpace:0,tierFlag:d,generalConstraintInfo:u,generalSubProfileIdc:g,ptlFrameOnlyConstraintFlag:l,ptlMultilayerEnabledFlag:f,spsMaxSublayersMinus1:I,ptlSublayerLevelPresentFlag:w,sublayerLevelIdc:U}}function M(e){const t=new n.A;return t.appendBuffer(e),1&t.readU(8)?U(t):{}}},4003:(e,t,i)=>{i.r(t),i.d(t,{default:()=>A});var a=i(134),r=i(61499),s=i(63939),o=i(9599),c=i(29170),n=i(51597),d=i(58121),h=i(68243),l=i(72739),f=i(95335),p=i(35028),u=i(94889),w=i(96157),U=i(95268),g=i(33854),m=i(92647),x=i(14686),I=i(4624),y=i(71517),b=i(44328),k=i(26173),v=i(77231),M="src/avformat/formats/OFlvFormat.ts";class A extends n.A{constructor(e={}){super(),(0,a.A)(this,"type",0),(0,a.A)(this,"context",void 0),(0,a.A)(this,"header",void 0),(0,a.A)(this,"script",void 0),(0,a.A)(this,"options",void 0),(0,a.A)(this,"annexb2AvccFilter",void 0),this.header=new d.A,this.script=new h.A,this.options=e,this.context={keyframeFilePositions:[],keyFrameTimes:[],lastkeyframelocation:0,lastkeyframetimestamp:BigInt(0),lasttimestamp:BigInt(0),framerate:0,filesize:0,audioSize:0,videosize:0,datasize:0,duration:0,scriptWrote:!1,frameCount:0,firstKeyframePositionWrote:!1,videoMetadataWrote:!1}}init(e){e.ioWriter&&e.ioWriter.setEndian(!0);const t=e.getStreamByMediaType(1),i=e.getStreamByMediaType(0);return t&&(this.header.hasAudio=!0,this.script.onMetaData.hasAudio=!0,86051===t.codecpar.codecId&&(16e3!==t.codecpar.sampleRate&&I.h2("flv speex only support 16000 sample rate",M,114),1!==t.codecpar.chLayout.nbChannels&&I.h2("flv speex only support 1 channel",M,117)),f.zy(p.FV,t.codecpar.codecId)&&(this.script.onMetaData.audiocodecid=p.FV[t.codecpar.codecId],this.script.onMetaData.stereo=t.codecpar.chLayout.nbChannels>1,this.script.onMetaData.audiosamplerate=t.codecpar.sampleRate||0,this.script.onMetaData.audiosamplesize=t.codecpar.frameSize||0),t.timeBase.den=1e3,t.timeBase.num=1),i&&(this.header.hasVideo=!0,this.script.onMetaData.hasVideo=!0,f.zy(p.FV,i.codecpar.codecId)&&(this.script.onMetaData.videocodecid=p.FV[i.codecpar.codecId],this.script.onMetaData.width=i.codecpar.width||0,this.script.onMetaData.height=i.codecpar.height||0,this.script.onMetaData.framerate=(0,b.lb)(i.codecpar.framerate)),i.timeBase.den=1e3,i.timeBase.num=1,this.annexb2AvccFilter=new k.A,this.annexb2AvccFilter.init(i.codecpar[r.o9],i.timeBase[r.o9])),0}destroy(e){super.destroy(e),this.annexb2AvccFilter&&(this.annexb2AvccFilter.destroy(),this.annexb2AvccFilter=null)}writeHeader(e){this.header.write(e.ioWriter),e.ioWriter.writeUint32(0),this.options.live&&(this.script.write(e.ioWriter),this.context.scriptWrote=!0);const t=e.getStreamByMediaType(1),i=e.getStreamByMediaType(0);if(t&&t.codecpar.extradata){if(86018===t.codecpar.codecId){const i=w.e(e.ioWriter,t,(0,x.s3)(t.codecpar.extradata,t.codecpar.extradataSize));this.context.filesize+=i+4,this.context.audioSize+=t.codecpar.extradataSize,this.context.datasize+=t.codecpar.extradataSize}this.script.onMetaData.hasMetadata=!0}if(i&&i.codecpar.extradata){if(27===i.codecpar.codecId||173===i.codecpar.codecId||196===i.codecpar.codecId||167===i.codecpar.codecId||225===i.codecpar.codecId||12===i.codecpar.codecId){const t=e.ioWriter.getPos(),a=173===i.codecpar.codecId||196===i.codecpar.codecId||167===i.codecpar.codecId||225===i.codecpar.codecId?g.e(e.ioWriter,i,(0,x.s3)(i.codecpar.extradata,i.codecpar.extradataSize),1):U.e(e.ioWriter,i,(0,x.s3)(i.codecpar.extradata,i.codecpar.extradataSize),1);this.context.filesize+=a+4,this.context.videosize+=i.codecpar.extradataSize,this.context.datasize+=i.codecpar.extradataSize,this.context.keyFrameTimes.push(0),this.context.keyframeFilePositions.push(Number(t)),this.context.videoMetadataWrote=!0}this.script.onMetaData.hasMetadata=!0}return 0}writeAVPacket(e,t){const i=e.getStreamByIndex(s.f[15](t+32));if(i){if(1===i.codecpar.codecType){const a=(0,y.rU)(t,1);if(a){const t=(0,x.s3)(s.f[20](a),s.f[15](a+4));86018===i.codecpar.codecId&&w.e(e.ioWriter,i,t)}if(s.f[15](t+28)){const a=e.ioWriter.getPos();u.xk(e.ioWriter,8,s.f[15](t+28)+1+p.IO[i.codecpar.codecId],(0,b.k)(s.f[17](t+16),(0,c.A)(t+72,o.P),i.timeBase)),u.BV(e.ioWriter,i),86018===i.codecpar.codecId&&w.x(e.ioWriter,1),e.ioWriter.writeBuffer((0,x.s3)(s.f[20](t+24),s.f[15](t+28)));const r=Number(e.ioWriter.getPos()-a);e.ioWriter.writeUint32(r),this.context.audioSize+=r,this.context.filesize+=r+4,this.context.lasttimestamp=(0,b.k)(s.f[17](t+8),(0,c.A)(t+72,o.P),i.timeBase),this.context.datasize+=s.f[15](t+28)||0}}else if(0===i.codecpar.codecType){27!==i.codecpar.codecId&&12!==i.codecpar.codecId&&173!==i.codecpar.codecId&&196!==i.codecpar.codecId||1===s.f[15](t+80)||(this.annexb2AvccFilter.sendAVPacket(t),this.annexb2AvccFilter.receiveAVPacket(t));const a=e.ioWriter.getPos(),r=(0,y.rU)(t,1);if(r){const t=(0,x.s3)(s.f[20](r),s.f[15](r+4));27===i.codecpar.codecId||12===i.codecpar.codecId?U.e(e.ioWriter,i,t,1):173!==i.codecpar.codecId&&196!==i.codecpar.codecId&&167!==i.codecpar.codecId&&225!==i.codecpar.codecId||g.e(e.ioWriter,i,(0,x.s3)(i.codecpar.extradata,i.codecpar.extradataSize),1)}if(s.f[15](t+28)){const r=e.ioWriter.getPos();if(27===i.codecpar.codecId||12===i.codecpar.codecId){u.xk(e.ioWriter,9,s.f[15](t+28)+1+p.IO[i.codecpar.codecId],(0,b.k)(s.f[17](t+16),(0,c.A)(t+72,o.P),i.timeBase)),u.ii(e.ioWriter,i,s.f[15](t+36));let a=0;s.f[17](t+8)!==v.Dh&&(a=0|Number(0xffffffffn&(0,b.k)(s.f[17](t+8)-s.f[17](t+16),(0,c.A)(t+72,o.P),i.timeBase))),U.x(e.ioWriter,1,a)}else if(173===i.codecpar.codecId||196===i.codecpar.codecId||167===i.codecpar.codecId||225===i.codecpar.codecId){const a=s.f[17](t+16)===s.f[17](t+8)||173!==i.codecpar.codecId&&196!==i.codecpar.codecId?3:1;if(u.xk(e.ioWriter,9,s.f[15](t+28)+1+p.IO[i.codecpar.codecId]+(1===a?3:0),(0,b.k)(s.f[17](t+16),(0,c.A)(t+72,o.P),i.timeBase)),u.VU(e.ioWriter,i,a,s.f[15](t+36)),g.d(e.ioWriter,i.codecpar.codecId),1===a){let a=0;s.f[17](t+8)!==v.Dh&&(a=0|Number(0xffffffffn&(0,b.k)(s.f[17](t+8)-s.f[17](t+16),(0,c.A)(t+72,o.P),i.timeBase))),e.ioWriter.writeUint24(a)}}e.ioWriter.writeBuffer((0,x.s3)(s.f[20](t+24),s.f[15](t+28)));const n=Number(e.ioWriter.getPos()-r);e.ioWriter.writeUint32(n),this.context.videosize+=n,this.context.filesize+=n+4,this.context.lasttimestamp=(0,b.k)(s.f[17](t+8),(0,c.A)(t+72,o.P),i.timeBase),this.context.datasize+=s.f[15](t+28)||0,this.context.frameCount++,1&s.f[15](t+36)&&(this.context.firstKeyframePositionWrote||!this.context.videoMetadataWrote?(this.context.lastkeyframetimestamp=(0,b.k)(s.f[17](t+8),(0,c.A)(t+72,o.P),i.timeBase),this.context.lastkeyframelocation=Number(a),this.context.keyFrameTimes.push(Number((Number(this.context.lastkeyframetimestamp)*(0,b.lb)(i.timeBase)).toFixed(2))),this.context.keyframeFilePositions.push(this.context.lastkeyframelocation)):this.context.firstKeyframePositionWrote=!0)}}return 0}I.R8(`can not found the stream width the packet's streamIndex: ${s.f[15](t+32)}, ignore it`,M,235)}writeTrailer(e){const t=e.getStreamByMediaType(0);if(t&&(27===t.codecpar.codecId||173===t.codecpar.codecId||196===t.codecpar.codecId||167===t.codecpar.codecId||225===t.codecpar.codecId||12===t.codecpar.codecId)){const i=173===t.codecpar.codecId||196===t.codecpar.codecId||167===t.codecpar.codecId||225===t.codecpar.codecId;u.xk(e.ioWriter,9,1+p.IO[t.codecpar.codecId],BigInt(0)),i?(u.VU(e.ioWriter,t,2,1),g.d(e.ioWriter,t.codecpar.codecId)):(u.ii(e.ioWriter,t,1),U.x(e.ioWriter,2,0)),e.ioWriter.writeUint32(12+p.IO[t.codecpar.codecId]),this.context.videosize+=12+p.IO[t.codecpar.codecId],this.context.filesize+=12+p.IO[t.codecpar.codecId]+4,this.script.onMetaData.canSeekToEnd=!0}if(this.context.scriptWrote)e.ioWriter.flush();else{e.ioWriter.flush(),this.script.onMetaData.filesize=this.context.filesize,this.script.onMetaData.audiosize=this.context.audioSize,this.script.onMetaData.videosize=this.context.videosize,this.script.onMetaData.datasize=this.context.datasize,this.script.onMetaData.lasttimestamp=this.context.lasttimestamp,this.options.hasKeyframes?(this.script.onMetaData.lastkeyframetimestamp=this.context.lastkeyframetimestamp,this.script.onMetaData.lastkeyframelocation=this.context.lastkeyframelocation,this.context.keyFrameTimes.length>1?(this.script.onMetaData.hasKeyframes=!0,this.script.onMetaData.keyframes={filepositions:this.context.keyframeFilePositions,times:this.context.keyFrameTimes}):this.script.onMetaData.hasKeyframes=!1):this.script.onMetaData.hasKeyframes=!1,this.script.onMetaData.duration=Number((Number(this.context.lasttimestamp)/1e3).toFixed(2)),this.script.onMetaData.audiodatarate=Number((this.context.audioSize/this.script.onMetaData.duration/1e3).toFixed(2)),this.script.onMetaData.videodatarate=Number((this.context.videosize/this.script.onMetaData.duration/1e3).toFixed(2)),this.script.onMetaData.framerate=Math.floor(this.context.frameCount/this.script.onMetaData.duration);const t=this.script.computeSize();l.__(this.context.keyframeFilePositions,((e,i)=>{this.context.keyframeFilePositions[i]=e+11+t+4})),this.script.onMetaData.keyframes&&(this.script.onMetaData.keyframes.filepositions=this.context.keyframeFilePositions),this.context.filesize+=11+t+4,this.script.onMetaData.filesize=this.context.filesize;const i=[],a=e.ioWriter.onFlush;e.ioWriter.onFlush=e=>(i.push(e.slice()),0),this.script.write(e.ioWriter),e.ioWriter.flush(),e.ioWriter.onFlush=a;const r=(0,m.A)(Uint8Array,i);a&&a(r,BigInt(13))}return 0}flush(e){return e.ioWriter.flush(),0}}},58121:(e,t,i)=>{i.d(t,{A:()=>r});var a=i(134);class r{constructor(){(0,a.A)(this,"signature",void 0),(0,a.A)(this,"version",void 0),(0,a.A)(this,"flags",void 0),(0,a.A)(this,"dataOffset",void 0),(0,a.A)(this,"hasVideo",void 0),(0,a.A)(this,"hasAudio",void 0),this.signature="FLV",this.version=1,this.flags=0,this.dataOffset=9,this.hasAudio=!1,this.hasVideo=!1}async read(e){this.signature=await e.readString(3),this.version=await e.readUint8(),this.flags=await e.readUint8(),this.dataOffset=await e.readUint32(),this.hasAudio=!!(4&this.flags),this.hasVideo=!!(1&this.flags)}write(e){this.flags=0,this.hasAudio&&(this.flags|=4),this.hasVideo&&(this.flags|=1),e.writeString(this.signature),e.writeUint8(this.version),e.writeUint8(this.flags),e.writeUint32(this.dataOffset)}}},68243:(e,t,i)=>{i.d(t,{A:()=>f});var a=i(134),r=i(35336),s=i(67672),o=i(72739),c=i(95335),n=i(92647),d=i(4624),h=i(94889),l=i(9705);class f{constructor(){(0,a.A)(this,"onMetaData",void 0),this.onMetaData={audiocodecid:10,canSeekToEnd:!1,width:0,height:0,stereo:!0,videocodecid:7}}async parseObject(e,t){return{key:await e.readString(await e.readUint16()),value:await this.parseValue(e,t)}}async parseValue(e,t){let i;switch(await e.readUint8()){case 0:i=await e.readDouble();break;case 1:i=!!await e.readUint8();break;case 2:i=await e.readString(await e.readUint16());break;case 3:for(i={};e.getPos()<t;){const{key:a,value:r}=await this.parseObject(e,t);if(i[a]=r,9==(16777215&await e.peekUint24())){await e.skip(3);break}}break;case 8:for(i={},await e.skip(4);e.getPos()<t;){const{key:a,value:r}=await this.parseObject(e,t);if(i[a]=r,9==(16777215&await e.peekUint24())){await e.skip(3);break}}break;case 9:i=null;break;case 10:i=[];const a=await e.readUint32();for(let r=0;r<a;r++)i.push(await this.parseValue(e,t));break;case 11:const r=await e.readDouble(),s=await e.readInt16();i=new Date(r+60*s*1e3);break;case 12:i=await e.readString(await e.readUint32())}return i}async read(e,t){const i=e.getPos(),a=i+BigInt(Math.floor(t)),r=await this.parseValue(e,a),s=await this.parseValue(e,a);this[r]=s;const o=Number(e.getPos()-i),c=await e.readUint32();return o+11!==c?(d.R8(`script size not match, size: ${o+11}, previousTagSize: ${c}`,"src/avformat/formats/flv/FlvScriptTag.ts",150),l.LR):0}writeValue(e,t){s.ai(t)?(e.writeUint8(0),e.writeDouble(t)):s.o(t)?(e.writeUint8(0),e.writeDouble(Number(t))):s.zM(t)?(e.writeUint8(1),e.writeUint8(t?1:0)):s.Yj(t)?t.length>=65536?(e.writeUint8(12),e.writeUint32(t.length),e.writeString(t)):(e.writeUint8(2),e.writeUint16(t.length),e.writeString(t)):s.YO(t)?(e.writeUint8(10),e.writeUint32(t.length),o.__(t,(t=>{this.writeValue(e,t)}))):s.Ik(t)?(e.writeUint8(3),c.__(t,((t,i)=>{e.writeUint16(i.length),e.writeString(i),this.writeValue(e,t)})),e.writeUint24(9)):t instanceof Date&&(e.writeUint8(11),e.writeDouble(t.getTime()),e.writeInt16(0))}computeSize(){const e=[],t=new r.A;return t.onFlush=t=>(e.push(t.slice()),0),this.writeValue(t,"onMetaData"),this.writeValue(t,this.onMetaData),t.flush(),(0,n.A)(Uint8Array,e).length}write(e){if(this.onMetaData){const t=[],i=new r.A;i.onFlush=e=>(t.push(e.slice()),0),this.writeValue(i,"onMetaData"),this.writeValue(i,this.onMetaData),i.flush();const a=(0,n.A)(Uint8Array,t),s=e.getPos();h.xk(e,18,a.length,BigInt(0)),e.writeBuffer(a),e.writeUint32(Number(e.getPos()-s))}}dts2Position(e){if(this.canSeek()){let t=-1;const i=this.onMetaData.keyframes.times,a=this.onMetaData.keyframes.filepositions;let r;for(r=0;r<i.length;r++){if(i[r]===e){t=r;break}if(i[r]>e){t=Math.max(r-1,0);break}}return r&&r===i.length&&(t=i.length-1),{pos:a[t],dts:i[t]}}return{pos:-1,dts:-1}}position2DTS(e){if(this.canSeek()){let i=-1;const a=this.onMetaData.keyframes.times,r=this.onMetaData.keyframes.filepositions;let s=0;for(s=0;s<r.length;s++)if(r[s]>e){i=s;break}var t;return s===r.length?null!==(t=this.onMetaData.duration)&&void 0!==t?t:a[a.length-1]:a[i]}return-1}canSeek(){return!!(this.onMetaData.keyframes&&this.onMetaData.keyframes.filepositions&&this.onMetaData.keyframes.filepositions.length)}}},96157:(e,t,i)=>{i.d(t,{e:()=>o,x:()=>s});var a=i(94889),r=i(35028);function s(e,t){e.writeUint8(t)}function o(e,t,i){const o=e.getPos();a.xk(e,8,i.length+1+r.IO[86018],BigInt(0)),a.BV(e,t),s(e,0),e.writeBuffer(i);const c=Number(e.getPos()-o);return e.writeUint32(c),c}},33854:(e,t,i)=>{i.d(t,{d:()=>s,e:()=>o});var a=i(94889),r=i(35028);function s(e,t){switch(t){case 173:e.writeString("hvc1");break;case 196:e.writeString("vvc1");break;case 167:e.writeString("vp09");break;case 225:e.writeString("av01")}}function o(e,t,i,o){const c=e.getPos();a.xk(e,9,i.length+1+r.IO[t.codecpar.codecId],BigInt(0)),(0,a.VU)(e,t,0,o),s(e,t.codecpar.codecId),e.writeBuffer(i);const n=Number(e.getPos()-c);return e.writeUint32(n),n}},95268:(e,t,i)=>{i.d(t,{e:()=>o,x:()=>s});var a=i(94889),r=i(35028);function s(e,t,i){e.writeUint8(t),e.writeUint24(i)}function o(e,t,i,o){const c=e.getPos();a.xk(e,9,i.length+1+r.IO[27],BigInt(0)),a.ii(e,t,o),s(e,0,0),e.writeBuffer(i);const n=Number(e.getPos()-c);return e.writeUint32(n),n}},35028:(e,t,i)=>{i.d(t,{FJ:()=>r,FV:()=>a,IO:()=>o,U5:()=>s});const a={86018:10,86017:2,86051:11,69645:1,86049:6,65543:7,65542:8,27:7,173:12,196:13,12:9},r={10:86018,2:86017,11:86051,1:69645,4:86049,5:86049,6:86049,7:65543,8:65542},s={7:27,12:173,13:196,9:12,2:4,3:86,4:92,5:106,6:131},o={86018:1,86017:1,86051:1,27:4,12:4,173:4,196:4,167:4,225:4}},94889:(e,t,i)=>{i.d(t,{BV:()=>s,VU:()=>c,ii:()=>o,xk:()=>r});var a=i(35028);function r(e,t,i,a){e.writeUint8(t),e.writeUint24(i),e.writeUint24(Number(a&BigInt(16777215))),e.writeUint8(Number(a>>BigInt(24)&BigInt(255))),e.writeUint24(0)}function s(e,t){let i=2;(86018===t.codecpar.codecId||t.codecpar.chLayout.nbChannels>1)&&(i|=1),86018===t.codecpar.codecId||t.codecpar.sampleRate>=44e3?i|=12:t.codecpar.sampleRate>=22e3?i|=8:t.codecpar.sampleRate>=11e3&&(i|=4),i|=a.FV[t.codecpar.codecId]<<4,e.writeUint8(i)}function o(e,t,i){let r=15&a.FV[t.codecpar.codecId];27!==t.codecpar.codecId&&173!==t.codecpar.codecId&&196!==t.codecpar.codecId||(r|=1&i?16:32),e.writeUint8(r)}function c(e,t,i,a){let r=15&i|128;27!==t.codecpar.codecId&&173!==t.codecpar.codecId&&196!==t.codecpar.codecId&&167!==t.codecpar.codecId&&225!==t.codecpar.codecId||(r|=1&a?16:32),e.writeUint8(r)}}}]);