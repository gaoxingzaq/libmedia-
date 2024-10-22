"use strict";(self.webpackChunkAVTranscoder=self.webpackChunkAVTranscoder||[]).push([[411],{68675:(t,e,i)=>{i.r(e),i.d(e,{default:()=>T});var n=i(134),o=i(63939),r=i(9599),s=i(29170),c=i(51597),a=i(4624),h=i(44328),d=i(71517),u=i(95335),l=i(35336),f=i(69081),g=i(31866),p=i(90519),m=i(14686),x=i(38156),I=i(77231),A=i(20525),S=i(92647),P="src/avformat/formats/OMatroskaFormat.ts";const V={isLive:!1,docType:"matroska"};function _(t){const e=t/BigInt(36e5),i=t%BigInt(36e5),n=i/BigInt(6e4),o=i%BigInt(6e4),r=o/BigInt(1e3),s=o%BigInt(1e3);return A.GP("%02d:%02d:%02d.%03d000000\0\0",Number(BigInt.asIntN(32,e)),Number(BigInt.asIntN(32,n)),Number(BigInt.asIntN(32,r)),Number(BigInt.asIntN(32,s)))}class T extends c.A{constructor(t={}){super(),(0,n.A)(this,"type",6),(0,n.A)(this,"options",void 0),(0,n.A)(this,"context",void 0),(0,n.A)(this,"random",void 0),(0,n.A)(this,"randomView",void 0),this.options=u.X$({},V,t),this.random=new Uint8Array(8),this.randomView=new DataView(this.random.buffer)}init(t){t.ioWriter.setEndian(!1);const e={isLive:this.options.isLive,segmentStart:-BigInt(1),seekHeadEnd:-BigInt(1),header:{version:1,readVersion:1,maxIdLength:4,maxSizeLength:8,docType:this.options.docType,docTypeVersion:4,docTypeReadVersion:2},seekHead:{entry:[]},info:{muxingApp:"v0.0.1-15-g9129aa4",writingApp:"v0.0.1-15-g9129aa4",timestampScale:1e6,duration:0,segmentUUID:-BigInt(1)},tracks:{entry:[]},attachments:{entry:[]},chapters:{entry:[]},cues:{entry:[]},tags:{entry:[{tag:{name:"ENCODER",string:"v0.0.1-15-g9129aa4"}}]},elePositionInfos:[],eleCaches:[],eleWriter:new l.A,currentCluster:{timeCode:-BigInt(1),pos:-BigInt(1)},hasVideo:!1};"webm"===e.header.docType&&(e.header.docTypeVersion=2,e.header.docTypeReadVersion=2),e.eleWriter.onFlush=t=>(e.eleCaches.push(t.slice()),0),p.y(this.random),e.info.segmentUUID=this.randomView.getBigUint64(0),t.privateData=this.context=e;const i="webm"===this.context.header.docType?g.N:g.e;return t.streams.forEach((t=>{if(4===t.codecpar.codecType)p.y(this.random),e.attachments.entry.push({uid:this.randomView.getBigUint64(0),name:t.metadata.name||"unknown",mime:t.metadata.mime||"unknown",data:{data:(0,m.s3)(t.codecpar.extradata,t.codecpar.extradataSize),size:BigInt(0|t.codecpar.extradataSize),pos:-BigInt(1)},description:t.metadata.description||"unknown"});else{const n={};switch(p.y(this.random),n.uid=this.randomView.getBigUint64(0),n.codecId=function(t){let e="";return u.__(i,((i,n)=>{i===t.codecId&&(e=n)})),65559!==t.codecId&&65557!==t.codecId||(e="A_PCM/FLOAT/IEEE"),65537!==t.codecId&&65549!==t.codecId&&65545!==t.codecId||(e="A_PCM/INT/BIG"),65541!==t.codecId&&65536!==t.codecId&&65548!==t.codecId&&65544!==t.codecId||(e="A_PCM/INT/LIT"),e}(t.codecpar),n.number=t.index+1,t.codecpar.extradata&&(n.codecPrivate={data:(0,m.s3)(t.codecpar.extradata,t.codecpar.extradataSize).slice(),pos:-BigInt(1),size:BigInt(0|t.codecpar.extradataSize)}),n.language=t.metadata.language||"und",t.codecpar.codecType){case 1:n.type=2,n.audio={channels:t.codecpar.chLayout.nbChannels,sampleRate:t.codecpar.sampleRate,bitDepth:t.codecpar.bitsPerRawSample};break;case 0:{e.hasVideo=!0,n.type=1,n.video={pixelWidth:t.codecpar.width,pixelHeight:t.codecpar.height,color:{matrixCoefficients:t.codecpar.colorSpace,primaries:t.codecpar.colorPrimaries,transferCharacteristics:t.codecpar.colorTrc,range:t.codecpar.colorRange}};const i=(0,x.uC)(t.codecpar.chromaLocation);i&&(n.video.color.chromaSitingVert=1+(i.x>>>7),n.video.color.chromaSitingHorz=1+(i.y>>>7));break}case 3:n.type=17}t.privData=n,e.tracks.entry.push(n)}})),0}writeHeader(t){f.bx(t.ioWriter,this.context,this.context.header),f.h1(t.ioWriter,408125543);const e=t.ioWriter.getPos();return f.SW(t.ioWriter,8),this.context.elePositionInfos.push({pos:e,length:0,bytes:8}),this.context.segmentStart=t.ioWriter.getPos(),t.ioWriter.skip(96),this.context.seekHeadEnd=t.ioWriter.getPos(),0}writeBlock(t,e){const i=t.privData;f.h1(this.context.eleWriter,163),f.cK(this.context.eleWriter,f.qh(i.number)+2+1+o.f[15](e+28)),f.qz(this.context.eleWriter,i.number,f.qh(i.number));const n=(0,h.k)(o.f[17](e+8),(0,s.A)(e+72,r.P),I.i0);this.context.eleWriter.writeInt16(Number(BigInt.asIntN(32,n-this.context.currentCluster.timeCode))),1&o.f[15](e+36)||0!==t.codecpar.codecType?this.context.eleWriter.writeUint8(128):this.context.eleWriter.writeUint8(0),this.context.eleWriter.writeBuffer((0,d.iI)(e))}writeCluster(t){if(this.context.currentCluster.pos===-BigInt(1))return;t.ioWriter.flush(),this.context.eleWriter.flush();let e=(0,S.A)(Uint8Array,this.context.eleCaches);e.length&&(this.context.eleCaches.length=0,f.Wd(this.context.eleWriter,231,this.context.currentCluster.timeCode),this.context.eleWriter.flush(),e=(0,S.A)(Uint8Array,[...this.context.eleCaches,e]),f.h1(t.ioWriter,524531317),f.cK(t.ioWriter,e.length),t.ioWriter.writeBuffer(e),t.ioWriter.flush(),this.context.eleCaches.length=0)}writeAVPacket(t,e){if(!o.f[15](e+28))return a.R8(`packet's size is 0: ${o.f[15](e+32)}, ignore it`,P,346),0;const i=t.getStreamByIndex(o.f[15](e+32));if(!i)return void a.R8(`can not found the stream width the avpacket's streamIndex: ${o.f[15](e+32)}, ignore it`,P,353);const n=i.privData,c=(0,h.k)(o.f[17](e+8),(0,s.A)(e+72,r.P),I.i0);return(!n.maxPts||n.maxPts<c)&&(n.maxPts=c),(this.options.isLive||1&o.f[15](e+36)&&(0===i.codecpar.codecType||!this.context.hasVideo&&c-this.context.currentCluster.timeCode>BigInt(5e3)))&&(this.writeCluster(t),this.context.currentCluster.timeCode=c,this.context.currentCluster.pos=t.ioWriter.getPos()-this.context.segmentStart,this.context.cues.entry.push({time:this.context.currentCluster.timeCode,pos:[{pos:this.context.currentCluster.pos,track:n.number}]})),this.writeBlock(i,e),0}writeTrailer(t){this.writeCluster(t),t.streams.forEach((t=>{const e=t.privData;if(!this.options.isLive){const t=e.maxPts;t>this.context.info.duration&&(this.context.info.duration=Number(BigInt.asIntN(32,t))),this.context.tags.entry.push({tag:{name:"DURATION",string:_(t)},target:{trackUid:e.uid}})}})),t.ioWriter.flush(),this.context.eleWriter.flush(),this.context.eleCaches.length=0,this.context.eleWriter.reset();const e=t.ioWriter.getPos();let i=e-this.context.segmentStart;this.context.seekHead.entry.push({id:357149030,pos:this.context.eleWriter.getPos()+this.context.seekHeadEnd-this.context.segmentStart}),f.ec(this.context.eleWriter,this.context,this.context.info),this.context.seekHead.entry.push({id:374648427,pos:this.context.eleWriter.getPos()+this.context.seekHeadEnd-this.context.segmentStart}),f.mM(this.context.eleWriter,this.context,this.context.tracks),this.context.seekHead.entry.push({id:307544935,pos:this.context.eleWriter.getPos()+this.context.seekHeadEnd-this.context.segmentStart}),f.p(this.context.eleWriter,this.context,this.context.tags),this.context.eleWriter.flush();const n=(0,S.A)(Uint8Array,this.context.eleCaches);t.ioWriter.onFlush(n,this.context.seekHeadEnd),i+=BigInt(Math.floor(n.length)),this.context.cues.entry.forEach((t=>{t.pos.forEach((t=>{t.pos+=BigInt(Math.floor(n.length))}))})),this.context.cues.entry.length&&(this.context.seekHead.entry.push({id:475249515,pos:t.ioWriter.getPos()-this.context.segmentStart+BigInt(Math.floor(n.length))}),f.Uz(t.ioWriter,this.context,this.context.cues)),this.context.attachments.entry.length&&(this.context.seekHead.entry.push({id:423732329,pos:t.ioWriter.getPos()-this.context.segmentStart+BigInt(Math.floor(n.length))}),f.s0(t.ioWriter,this.context,this.context.attachments)),t.ioWriter.flush(),i+=t.ioWriter.getPos()-e,t.ioWriter.seek(this.context.segmentStart),f.jp(t.ioWriter,this.context,this.context.seekHead);const o=t.ioWriter.getPos()-this.context.segmentStart;return f.h1(t.ioWriter,236),f.cK(t.ioWriter,this.context.seekHeadEnd-this.context.segmentStart-o-BigInt(2),1),t.ioWriter.flush(),this.context.elePositionInfos[0].length=i,f.ST(t.ioWriter,this.context),this.context.eleCaches.length=0,0}flush(t){return t.ioWriter.flush(),this.context.currentCluster.timeCode=-BigInt(1),this.context.currentCluster.pos=-BigInt(1),0}}},31866:(t,e,i)=>{i.d(e,{N:()=>o,e:()=>n});const n={A_AAC:86018,A_AC3:86019,A_ALAC:86032,A_DTS:86020,A_EAC3:86056,A_FLAC:86028,A_MLP:86045,"A_MPEG/L2":86016,"A_MPEG/L1":86058,"A_MPEG/L3":86017,A_OPUS:86076,"A_OPUS/EXPERIMENTAL":86076,"A_PCM/FLOAT/IEEE":65557,"A_PCM/INT/BIG":65537,"A_PCM/INT/LIT":65536,"A_QUICKTIME/QDMC":86066,"A_QUICKTIME/QDM2":86035,"A_REAL/14_4":77824,"A_REAL/28_8":77825,"A_REAL/ATRC":86047,"A_REAL/COOK":86036,"A_REAL/SIPR":86057,A_TRUEHD:86060,A_TTA1:86038,A_VORBIS:86021,A_WAVPACK4:86041,"D_WEBVTT/SUBTITLES":94226,"D_WEBVTT/CAPTIONS":94226,"D_WEBVTT/DESCRIPTIONS":94226,"D_WEBVTT/METADATA":94226,"S_TEXT/UTF8":94225,"S_TEXT/ASCII":94210,"S_TEXT/ASS":94230,"S_TEXT/SSA":94230,S_ASS:94230,S_SSA:94230,S_VOBSUB:94208,S_DVBSUB:94209,"S_HDMV/PGS":94214,"S_HDMV/TEXTST":94231,V_AV1:225,V_DIRAC:116,V_FFV1:33,V_MJPEG:7,V_MPEG1:1,V_MPEG2:2,"V_MPEG4/ISO/ASP":12,"V_MPEG4/ISO/AP":12,"V_MPEG4/ISO/SP":12,"V_MPEG4/ISO/AVC":27,"V_MPEGH/ISO/HEVC":173,"V_MPEGH/ISO/VVC":196,"V_MPEG4/MS/V3":16,V_PRORES:147,"V_REAL/RV10":5,"V_REAL/RV20":6,"V_REAL/RV30":68,"V_REAL/RV40":69,V_SNOW:208,V_THEORA:30,V_UNCOMPRESSED:13,V_VP8:139,V_VP9:167},o={V_VP8:139,V_VP9:167,V_AV1:225,A_VORBIS:86021,A_OPUS:86076,"D_WEBVTT/SUBTITLES":94226,"D_WEBVTT/CAPTIONS":94226,"D_WEBVTT/DESCRIPTIONS":94226,"D_WEBVTT/METADATA":94226}},69081:(t,e,i)=>{i.d(e,{ST:()=>A,SW:()=>f,Uz:()=>B,Wd:()=>p,bx:()=>P,cK:()=>l,ec:()=>_,h1:()=>u,jp:()=>V,mM:()=>E,p:()=>W,qh:()=>h,qz:()=>d,s0:()=>U});var n=i(67672),o=i(50011),r=i(92647),s=i(72739),c=i(95335);function a(t){let e=0;do{e++}while(t>>=n.o(t)?BigInt(7):7);return e}function h(t){return n.o(t)?a(t+BigInt(1)):a(t+1)}function d(t,e,i){if(n.o(e)){e|=BigInt(1)<<BigInt(7*i);for(let n=i-1;n>=0;n--)t.writeUint8(Number(e>>BigInt(8*n)&BigInt(255)))}else{e|=1<<7*i;for(let n=i-1;n>=0;n--)t.writeUint8(e>>8*n&255)}}function u(t,e){let i=function(t){return Math.floor((Math.log2(t)+7)/8)}(e);for(;i--;)t.writeUint8(e>>8*i)}function l(t,e,i=0){let n=h(e);0===i&&(i=n),d(t,e,i)}function f(t,e){t.writeUint8(511>>e);for(let i=0;i<e-1;i++)t.writeUint8(255)}function g(t,e,i){u(t,e),l(t,8),t.writeUint64(i)}function p(t,e,i){let o=1,r=i;if(n.o(r))for(;r>>=BigInt(8);)o++;else for(;r>>=8;)o++;u(t,e),l(t,o);for(let e=o-1;e>=0;e--)t.writeUint8(n.o(i)?Number(i>>BigInt(8*e)):i>>8*e)}function m(t,e,i){u(t,e),l(t,8),t.writeDouble(i)}function x(t,e,i){u(t,e),l(t,i.length),t.writeBuffer(i)}function I(t,e,i){x(t,e,o.encode(i))}function A(t,e){const i=t.getPos(),n=t.getPointer(),o=i-BigInt(Math.floor(n)),r=[];s.__(e.elePositionInfos,(e=>{e.pos<i&&e.pos>=o?(t.seekInline(n+Number(e.pos-i)),l(t,e.length,e.bytes)):r.push(e)})),s.__(r,(e=>{t.seek(e.pos),l(t,e.length,e.bytes)})),r.length?t.seek(i):t.seekInline(n),t.flush(),e.elePositionInfos=[]}function S(t,e,i,n){e.eleWriter.flush();const o=e.eleCaches;e.eleCaches=[],n(e.eleWriter),e.eleWriter.flush();const s=(0,r.A)(Uint8Array,e.eleCaches);e.eleCaches=o,x(t,i,s)}function P(t,e,i){S(t,e,440786851,(t=>{p(t,17030,i.version),p(t,17143,i.readVersion),p(t,17138,i.maxIdLength),p(t,17139,i.maxSizeLength),I(t,17026,i.docType),p(t,17031,i.docTypeVersion),p(t,17029,i.docTypeReadVersion)}))}function V(t,e,i){S(t,e,290298740,(t=>{i.entry.forEach((i=>{!function(t,e,i){S(t,e,19899,(t=>{p(t,21419,i.id),p(t,21420,i.pos)}))}(t,e,i)}))}))}function _(t,e,i){S(t,e,357149030,(t=>{g(t,29604,i.segmentUUID),p(t,2807729,i.timestampScale),m(t,17545,i.duration),I(t,19840,i.muxingApp),I(t,22337,i.writingApp)}))}function T(t,e,i){S(t,e,174,(t=>{p(t,215,i.number),g(t,29637,i.uid),p(t,131,i.type),I(t,2274716,i.language),I(t,134,i.codecId),i.codecPrivate&&x(t,25506,i.codecPrivate.data),i.audio?function(t,e,i){S(t,e,225,(t=>{m(t,181,i.sampleRate),i.outSampleRate&&m(t,181,i.outSampleRate),p(t,25188,i.bitDepth),p(t,159,i.channels)}))}(t,e,i.audio):i.video&&function(t,e,i){S(t,e,224,(t=>{p(t,176,i.pixelWidth),p(t,186,i.pixelHeight),i.color&&function(t,e,i){S(t,e,21936,(t=>{c.zy(i,"matrixCoefficients")&&p(t,21937,i.matrixCoefficients),c.zy(i,"primaries")&&p(t,21947,i.primaries),c.zy(i,"transferCharacteristics")&&p(t,21946,i.transferCharacteristics),c.zy(i,"range")&&p(t,21945,i.range),c.zy(i,"chromaSitingVert")&&p(t,21944,i.chromaSitingVert),c.zy(i,"chromaSitingHorz")&&p(t,21943,i.chromaSitingHorz)}))}(t,e,i.color)}))}(t,e,i.video)}))}function E(t,e,i){S(t,e,374648427,(t=>{i.entry.forEach((i=>{T(t,e,i)}))}))}function y(t,e,i){S(t,e,26568,(t=>{i.name&&I(t,17827,i.name),i.string&&I(t,17543,i.string),i.language&&I(t,17530,i.language),c.zy(i,"default")&&p(t,17540,i.default),i.sub&&y(t,e,i.sub)}))}function C(t,e,i){S(t,e,29555,(t=>{i.tag&&y(t,e,i.tag),i.target&&function(t,e,i){S(t,e,25536,(t=>{i.type&&I(t,25546,i.type),c.zy(i,"typeValue")&&p(t,26826,i.typeValue),c.zy(i,"trackUid")&&g(t,25541,i.trackUid),c.zy(i,"chapterUid")&&g(t,25540,i.chapterUid),c.zy(i,"attachUid")&&g(t,25540,i.attachUid)}))}(t,e,i.target)}))}function W(t,e,i){S(t,e,307544935,(t=>{i.entry.forEach((i=>{C(t,e,i)}))}))}function B(t,e,i){S(t,e,475249515,(t=>{i.entry.forEach((i=>{!function(t,e,i){S(t,e,187,(t=>{p(t,179,i.time),i.pos.forEach((i=>{!function(t,e,i){S(t,e,183,(t=>{p(t,247,i.track),p(t,241,i.pos)}))}(t,e,i)}))}))}(t,e,i)}))}))}function U(t,e,i){const n=e.elePositionInfos;e.elePositionInfos=[],u(t,423732329);const o={pos:t.getPos(),length:0,bytes:8};l(t,0,8);const r=t.getPos();i.entry.forEach((i=>{!function(t,e,i){u(t,24999);const n={pos:t.getPos(),length:0,bytes:8};l(t,0,8);const o=t.getPos();g(t,18094,i.uid),I(t,18030,i.name),I(t,18016,i.mime),i.description&&I(t,18046,i.description),i.data&&x(t,18012,i.data.data),n.length=t.getPos()-o,e.elePositionInfos.push(n)}(t,e,i)})),o.length=t.getPos()-r,e.elePositionInfos.push(o),A(t,e),e.elePositionInfos=n}},90519:(t,e,i)=>{function n(t){crypto.getRandomValues(t)}i.d(e,{y:()=>n})},38156:(t,e,i)=>{i.d(e,{O5:()=>l,S5:()=>f,Xo:()=>g,uC:()=>d});var n=i(63939),o=i(50932),r=i(97317),s=i(9705),c=i(77231),a=i(14686),h=i(52699);function d(t){if(!(t<=0||t>=7))return{x:128*(1&t),y:128*(t>>>1^(t<4?1:0))}}function u(t,e,i,n,o){if(!o)return s.UY;if(t<0)return s.UY;const r=1===n||2===n?o.log2ChromaW:0,a=t+(1<<r)-1>>>r;if(a&&i>c.go/a)return s.UY;let h=i*a;return 4&o.flags&&(h=h+7>>>3),h}function l(t,e,i){const n=r.g[e];if(!n)return s.UY;const{maxPixSteps:c,maxPixStepsComps:h}=function(t){const e=[0,0,0,0],i=[0,0,0,0];for(let n=0;n<4;n++)t.comp[n]&&t.comp[n].step>e[t.comp[n].plane]&&(e[t.comp[n].plane]=t.comp[n].step,i[t.comp[n].plane]=n);return{maxPixSteps:e,maxPixStepsComps:i}}(n);(0,a.sO)(t,0,16);let d=0;for(let e=0;e<4;e++){if((d=u(i,0,c[e],h[e],n))<0)return d;o.M[15](t+4*e,d)}}function f(t,e,i,h){const d=[0,0,0,0],u=r.g[e];if(!u)return s.UY;if((0,a.sO)(t,0,16),n.f[15](h)>c.go/i)return s.UY;if(o.M[15](t,n.f[15](h)*i),2&u.flags)return o.M[15](t+4,1024),0;for(let t=0;t<4;t++)u.comp[t]&&(d[u.comp[t].plane]=1);for(let e=0;e<4&&d[e];e++){let r=1===e||2===e?u.log2ChromaH:0,a=i+(1<<r)-1>>r;if(n.f[15](h+4*e)>c.go/a)return s.UY;o.M[15](t+4*e,a*n.f[15](h+4*e))}return 0}function g(t,e,i,r,d){const u=h.z(16),l=h.z(16);(0,a.sO)(t,0,16);for(let t=0;t<4;t++)o.M[15](u+4*t,n.f[15](d+4*t));let g=f(l,e,i,u);if(g<0)return p(),g;g=0;for(let t=0;t<4;t++){if(n.f[15](l+4*t)>c.go-g)return p(),s.UY;g+=n.f[15](l+4*t)}if(!r)return p(),g;o.M[20](t,r);for(let e=1;e<4&&n.f[15](l+4*e);e++)o.M[20](t+4*e,n.f[20](t+(e-1))+n.f[15](l+(e-1)));return p(),g;function p(){h.t(16),h.t(16)}}},95073:(t,e,i)=>{function n(t,e){return t+(e-1)&~(e-1)}i.d(e,{A:()=>n})}}]);