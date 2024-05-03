"use strict";(self.webpackChunkAVPlayer=self.webpackChunkAVPlayer||[]).push([[540],{9088:(e,t,a)=>{a.d(t,{Au:()=>R,XC:()=>b,Y2:()=>g,hG:()=>m,oz:()=>w});var i=a(7231);const r=[44100,48e3,32e3,0],s=[22050,24e3,16e3,0],n=[11025,12e3,8e3,0],o=[0,1152,1152,384],d=[0,576,1152,384],c=[0,576,1152,384],f=[0,32,64,96,128,160,192,224,256,288,320,352,384,416,448,-1],h=[0,32,48,56,64,80,96,112,128,160,192,224,256,320,384,-1],l=[0,32,40,48,56,64,80,96,112,128,160,192,224,256,320,-1],p=[0,32,48,56,64,80,96,112,128,144,160,176,192,224,256,-1],u=[0,8,16,24,32,40,48,56,64,80,96,112,128,144,160,-1];function g(e,t){switch(e){case 0:return n[t];case 2:return s[t];case 3:return r[t]}return i.N_}function m(e,t){switch(e){case 0:return c[t];case 2:return d[t];case 3:return o[t]}return i.N_}function w(e,t,a){switch(t){case 1:switch(e){case 0:case 2:return u[a];case 3:return l[a]}break;case 2:switch(e){case 0:case 2:return u[a];case 3:return h[a]}case 3:switch(e){case 0:case 2:return p[a];case 3:return f[a]}}return i.N_}function R(e){switch(e){case 1:return 34;case 2:return 33;case 3:return 32}return i.N_}function b(e,t){if(t&&t.length>=4){const a=t[1]>>>3&3,i=(6&t[1])>>1,r=(12&t[2])>>>2,s=3&~(t[3]>>>6)?2:1,n=R(i),o=g(a,r);e.codecpar.profile=n,e.codecpar.sampleRate=o,e.codecpar.chLayout.nbChannels=s,e.codecpar.channels=s}}},5947:(e,t,a)=>{a.d(t,{A:()=>r});var i=a(1026);class r{constructor(){(0,i.A)(this,"type",-1),(0,i.A)(this,"onStreamAdd",void 0)}destroy(e){}}},7940:(e,t,a)=>{a.r(t),a.d(t,{default:()=>v});var i=a(1026),r=a(4686),s=a(1499),n=a(3939),o=a(932),d=a(4624),c=a(5947),f=a(7837),h=a(1517),l=a(7231),p=a(11),u=a(9088),g=a(4328);const m=100,w=128;var R=a(3607),b=a(2739),I="src/avformat/formats/mp3/id3v2.ts";function k(e,t){let a="utf-8";return 0===e?a="iso-8859-1":1===e?a="utf-16":2===e&&(a="utf-16be"),new TextDecoder(a).decode(t)}class x{constructor(){(0,i.A)(this,"version",void 0),(0,i.A)(this,"layer",void 0),(0,i.A)(this,"protection",void 0),(0,i.A)(this,"bitrateIndex",void 0),(0,i.A)(this,"samplingFrequency",void 0),(0,i.A)(this,"padding",void 0),(0,i.A)(this,"private",void 0),(0,i.A)(this,"mode",void 0),(0,i.A)(this,"modeExtension",void 0),(0,i.A)(this,"copyright",void 0),(0,i.A)(this,"original",void 0),(0,i.A)(this,"emphasis",void 0)}}function B(e,t){e.version=t>>19&3,e.layer=t>>17&3,e.protection=t>>16&1,e.bitrateIndex=t>>12&15,e.samplingFrequency=t>>10&3,e.padding=t>>9&1,e.mode=t>>6&3,e.modeExtension=t>>4&3,e.copyright=t>>3&1,e.original=t>>2&1,e.emphasis=3&t}function S(e,t){let a=u.oz(e.version,e.layer,e.bitrateIndex);switch(e.layer){case 1:default:a=144e3*a/(t<<(3===e.version?0:1))>>>0,a+=e.padding;break;case 2:a=144e3*a/t>>>0,a+=e.padding;break;case 3:a=12e3*a/t>>>0,a=4*(a+e.padding)}return a}var y="src/avformat/formats/IMp3Format.ts";class v extends c.A{constructor(){super(),(0,i.A)(this,"type",7),(0,i.A)(this,"context",void 0)}init(e){e.ioReader&&e.ioReader.setEndian(!0),this.context={firstFramePos:l.Dh,isVBR:!1,hasID3v1:!1,id3v2:{version:l.N_,revision:l.N_,flags:l.N_},fileSize:BigInt(0)}}async readHeader(e){const t=e.createStream();t.codecpar.codecId=86017,t.codecpar.codecType=1,t.startTime=BigInt(0),t.firstDTS=BigInt(0);const a={frameHeader:new x,nbFrame:BigInt(0),tocIndexes:[],nextDTS:BigInt(0),frameLength:0};t.privData=a;const i=t.metadata={},s=await e.ioReader.fileSize();if(1&e.ioReader.flags&&s>w&&(await e.ioReader.seek(s-BigInt(w)),"TAG"===await e.ioReader.readString(3))){let t=await e.ioReader.readBuffer(30);i.title=p.D(t).replace(/\s/g,""),t=await e.ioReader.readBuffer(30),i.artist=p.D(t).replace(/\s/g,""),t=await e.ioReader.readBuffer(30),i.album=p.D(t).replace(/\s/g,""),t=await e.ioReader.readBuffer(4),i.date=p.D(t).replace(/\s/g,""),t=await e.ioReader.readBuffer(30),i.comment=p.D(t).replace(/\s/g,""),0===t[28]&&0!==t[29]&&(i.track=t[29]+""),i.genre=await e.ioReader.readUint8(),this.context.hasID3v1=!0}if(await e.ioReader.seek(BigInt(0)),"ID3"===await e.ioReader.peekString(3)){await e.ioReader.skip(3),this.context.id3v2.version=await e.ioReader.readUint8(),this.context.id3v2.revision=await e.ioReader.readUint8(),this.context.id3v2.flags=await e.ioReader.readUint8();const t=(127&await e.ioReader.readUint8())<<21|(127&await e.ioReader.readUint8())<<14|(127&await e.ioReader.readUint8())<<7|127&await e.ioReader.readUint8();await async function(e,t,a,i){const r=2!==a.version,s=r?10:6;let n=e.getPos()+BigInt(t>>>0);async function o(){await e.seek(n)}if(r&&64&a.flags){let i=await async function(e,t){let a=0;for(;t--;)a=(a<<7)+(127&await e.readUint8());return a}(e,4);if(4===a.version&&(i-=4),i<0)return d.z3("invalid extended header length",I,92),await o();if(await e.skip(i),(t-=i+4)<0)return d.z3("extended header too long",I,98),await e.seek(n),await o()}for(;t>s;){let a,n;if(r){if(a=await e.readString(4),n=await e.readUint32(),!n){d.z3("invalid frame size",I,112);break}await e.readUint16()}else a=await e.readString(3),n=await e.readUint24();if("APIC"===a)i.poster=await e.readBuffer(n);else if("USLT"===a){const t=await e.readUint8(),a=await e.readString(3),r=await e.readBuffer(n-4);i.lyrics=`${a} ${k(t,r)}`}else if("COMM"===a||"COM"===a){const t=await e.readUint8(),a=await e.readString(3),r=await e.readBuffer(n-4);i.comment=`${a} ${k(t,r)}`}else{let t;switch(t="T"===a[0]?k(await e.readUint8(),await e.readBuffer(n-1)):await e.readBuffer(n),a){case"TIT2":case"TT2":i.title=t;break;case"TPE1":case"TP1":i.artist=t;break;case"TPE2":case"TP2":i.albumArtist=t;break;case"TPOS":i.disc=t;break;case"TCOP":i.copyright=t;break;case"TALB":case"TAL":i.album=t;break;case"TRCK":case"TRK":i.track=t;break;case"TYER":case"TDRL":case"TDRC":i.date=t;break;case"COMM":case"COM":i.comment=t;break;case"TCON":case"TCO":i.genre=t;break;case"TSSE":case"TEN":i.encoder=t;break;case"TCOM":i.composer=t;break;case"TENC":i.encodedBy=t;break;case"TLAN":i.language=t;break;case"TPE3":case"TP3":i.performer=t;break;case"TPUB":i.publisher=t;break;case"TCMP":case"TCP":i.compilation=t;break;case"TDEN":i.creationTime=t;break;case"TSOA":i.albumSort=t;break;case"TSOP":i.artistSort=t;break;case"TSOT":i.titleSort=t;break;case"TIT1":i.grouping=t;break;default:i[a]=t}}t-=n+s}4==a.version&&16&a.flags&&(n+=BigInt(10)),await e.seek(n)}(e.ioReader,t,this.context.id3v2,i)}for(this.context.firstFramePos=e.ioReader.getPos();65504&~await e.ioReader.peekUint16();)await e.ioReader.skip(1);this.context.firstFramePos!==e.ioReader.getPos()&&(d.R8(`skipping ${e.ioReader.getPos()-this.context.firstFramePos} bytes of junk at ${this.context.firstFramePos}`,y,170),this.context.firstFramePos=e.ioReader.getPos()),t.codecpar.extradataSize=4,t.codecpar.extradata=(0,f.sY)(t.codecpar.extradataSize),await e.ioReader.peekBuffer(t.codecpar.extradataSize,(0,r.JW)(t.codecpar.extradata,t.codecpar.extradataSize)),B(a.frameHeader,await e.ioReader.readUint32()),t.codecpar.profile=u.Au(a.frameHeader.layer),t.codecpar.frameSize=u.hG(a.frameHeader.version,a.frameHeader.layer),t.codecpar.sampleRate=u.Y2(a.frameHeader.version,a.frameHeader.samplingFrequency),t.timeBase.num=1,t.timeBase.den=t.codecpar.sampleRate;const n=3===a.frameHeader.mode?1:2;t.codecpar.chLayout.nbChannels=n,t.codecpar.channels=n;const o=BigInt(Math.floor(u.oz(a.frameHeader.version,a.frameHeader.layer,a.frameHeader.bitrateIndex))),c=S(a.frameHeader,t.codecpar.sampleRate),h=e.ioReader.getPos();await e.ioReader.skip([[0,9,17],[0,0,0],[0,9,17],[0,17,32]][a.frameHeader.version][t.codecpar.chLayout.nbChannels]);const l=await e.ioReader.readString(4);if("Xing"===l||"Info"===l){this.context.isVBR=!0;const r=await e.ioReader.readUint32();1&r&&(a.nbFrame=BigInt(Math.floor(await e.ioReader.readUint32()))),2&r&&(this.context.fileSize=BigInt(Math.floor(await e.ioReader.readUint32())));const n=s>=h?s-h:BigInt(0);if(n&&this.context.fileSize){const e=R.jk(n,this.context.fileSize),t=R.T9(n,this.context.fileSize)-e;n>this.context.fileSize&&t>e>>BigInt(4)?(a.nbFrame=BigInt(0),d.R8("invalid concatenated file detected - using bitrate for duration",y,227)):t>e>>BigInt(4)&&d.R8("filesize and duration do not match (growing file?)",y,230)}if(t.duration=a.nbFrame*BigInt(t.codecpar.frameSize>>>0),4&r)for(let i=0;i<m;i++){const r=await e.ioReader.readUint8(),s=this.context.fileSize*BigInt(Math.floor(r))/BigInt(256),n={dts:t.duration/BigInt(m)*BigInt(Math.floor(i)),pos:s};a.tocIndexes.push(n)}8&r&&await e.ioReader.skip(4),i.encoder=await e.ioReader.readString(9),this.context.firstFramePos+=BigInt(Math.floor(c))}else await e.ioReader.seek(h),"VBRI"===await e.ioReader.readString(4)?(1===await e.ioReader.readUint16()&&(await e.ioReader.skip(4),this.context.fileSize=BigInt(Math.floor(await e.ioReader.readUint32())),a.nbFrame=BigInt(Math.floor(await e.ioReader.readUint32())),t.duration=a.nbFrame*BigInt(t.codecpar.frameSize>>>0)),this.context.firstFramePos+=BigInt(Math.floor(c))):(this.context.isVBR=!1,t.codecpar.bitRate=o*BigInt(1e3),a.nbFrame=(s-this.context.firstFramePos-BigInt(w))/BigInt(Math.floor(c)),t.duration=a.nbFrame*BigInt(t.codecpar.frameSize>>>0),a.frameLength=c,this.context.fileSize=s);for(await e.ioReader.seek(this.context.firstFramePos);65504&~await e.ioReader.peekUint16();)await e.ioReader.skip(1);if(this.context.firstFramePos!==e.ioReader.getPos()&&(d.R8(`skipping ${e.ioReader.getPos()-this.context.firstFramePos} bytes of junk at ${this.context.firstFramePos}`,y,290),this.context.firstFramePos=e.ioReader.getPos()),a.tocIndexes.length)for(let e=0;e<m;e++)a.tocIndexes[e].pos+=this.context.firstFramePos;return 0}async readAVPacket(e,t){const a=e.getStreamByMediaType(1),i=a.privData,c=e.ioReader.getPos();if(this.context.hasID3v1&&c>=this.context.fileSize-BigInt(w))return-1048576;try{B(i.frameHeader,await e.ioReader.peekUint32());let d=this.context.isVBR?S(i.frameHeader,a.codecpar.sampleRate):i.frameLength;o.M[15](t+28,d),o.M[17](t+56,c),o.M[15](t+32,a.index),(0,r.Mr)(t+72,a.timeBase[s.o9],8),o.M[17](t+48,BigInt(a.codecpar.frameSize>>>0)),o.M[17](t+16,i.nextDTS),o.M[17](t+8,i.nextDTS),o.M[15](t+36,1|n.f[15](t+36)),i.nextDTS+=BigInt(a.codecpar.frameSize>>>0);const l=(0,f.sY)(d);return(0,h.NX)(t,l,d),await e.ioReader.readBuffer(d,(0,r.JW)(l,d)),0}catch(t){return-1048576!==e.ioReader.error&&d.z3(t.message,y,337),e.ioReader.error}}async syncToFrame(e){let t=l.Dh;const a=e.getStreamByMediaType(1),i=a.privData;for(;;)try{if(!(65504&~await e.ioReader.peekUint16())){t=e.ioReader.getPos(),B(i.frameHeader,await e.ioReader.peekUint32());let r=this.context.isVBR?S(i.frameHeader,a.codecpar.sampleRate):i.frameLength;if(r>512e3){await e.ioReader.skip(1);continue}await e.ioReader.skip(r);let s=0;for(;s<=3&&!(65504&~await e.ioReader.peekUint16());){B(i.frameHeader,await e.ioReader.peekUint32());let t=this.context.isVBR?S(i.frameHeader,a.codecpar.sampleRate):i.frameLength;await e.ioReader.skip(t),s++}if(!(s<3))break;await e.ioReader.seek(t+BigInt(1)),t=l.Dh}await e.ioReader.skip(1)}catch(e){break}t!==l.Dh&&await e.ioReader.seek(t)}async seek(e,t,a,i){const r=e.ioReader.getPos(),s=t.privData;if(t.sampleIndexes.length){let i=b.El(t.sampleIndexes,(e=>e.pts>a?-1:1));if(i>0&&(0,g.k)(a-t.sampleIndexes[i-1].pts,t.timeBase,l.i0)<BigInt(1e4))return d.Yz(`seek in sampleIndexes, found index: ${i}, pts: ${t.sampleIndexes[i-1].pts}, pos: ${t.sampleIndexes[i-1].pos}`,y,420),await e.ioReader.seek(t.sampleIndexes[i-1].pos),s.nextDTS=t.sampleIndexes[i-1].dts,r}if(a===BigInt(0))return await e.ioReader.seek(this.context.firstFramePos),r;if(this.context.isVBR)if(s.tocIndexes.length){const i=s.tocIndexes[0|Number(a/(t.duration/BigInt(m))&0xffffffffn)];if(i)d.Yz(`seek in xing toc indexes, pts: ${i.dts}, pos: ${i.pos}`,y,436),await e.ioReader.seek(i.pos),s.nextDTS=i.dts;else{d.Yz("not found any keyframe index, try to seek in bytes",y,441);const i=S(s.frameHeader,t.codecpar.sampleRate),r=a/BigInt(t.codecpar.frameSize>>>0),n=r*BigInt(Math.floor(i))+this.context.firstFramePos;s.nextDTS=r*BigInt(t.codecpar.frameSize>>>0),await e.ioReader.seek(n)}}else{d.Yz("not found any keyframe index, try to seek in bytes",y,450);const i=S(s.frameHeader,t.codecpar.sampleRate),r=a/BigInt(t.codecpar.frameSize>>>0),n=r*BigInt(Math.floor(i))+this.context.firstFramePos;s.nextDTS=r*BigInt(t.codecpar.frameSize>>>0),await e.ioReader.seek(n)}else{const i=a/BigInt(t.codecpar.frameSize>>>0),r=i*BigInt(s.frameLength>>>0)+this.context.firstFramePos;s.nextDTS=i*BigInt(t.codecpar.frameSize>>>0),await e.ioReader.seek(r)}return await this.syncToFrame(e),r}getAnalyzeStreamsCount(){return 1}}},2647:(e,t,a)=>{function i(e,t){if(!t.length)return null;if(1===t.length)return t[0];let a,i=0;for(a of t)i+=a.length;let r=new e(i),s=0;for(a of t)r.set(a,s),s+=a.length;return r}a.d(t,{A:()=>i})},6795:(e,t,a)=>{a.d(t,{A:()=>n});var i=a(1026),r=a(2647),s=a(11);class n{constructor(e,t=!0){(0,i.A)(this,"data",void 0),(0,i.A)(this,"buffer",void 0),(0,i.A)(this,"byteStart",void 0),(0,i.A)(this,"pos",void 0),(0,i.A)(this,"size",void 0),(0,i.A)(this,"littleEndian",void 0),this.buffer=e,this.data=e instanceof Uint8Array?new DataView(e.buffer):e.view,this.byteStart=e instanceof Uint8Array?e.byteOffset:0,this.pos=0,this.size=e.byteLength,this.littleEndian=!t}readUint8(){return this.data.getUint8(this.pos+++this.byteStart)}readUint16(){const e=this.data.getUint16(this.pos+this.byteStart,this.littleEndian);return this.pos+=2,e}readUint24(){return this.readUint16()<<8|this.readUint8()}readUint32(){const e=this.data.getUint32(this.pos+this.byteStart,this.littleEndian);return this.pos+=4,e}readUint64(){const e=BigInt(this.readUint32()),t=BigInt(this.readUint32());return this.littleEndian?t<<BigInt(32)|e:e<<BigInt(32)|t}readInt8(){return this.data.getInt8(this.pos+++this.byteStart)}readInt16(){const e=this.data.getInt16(this.pos+this.byteStart,this.littleEndian);return this.pos+=2,e}readInt32(){const e=this.data.getInt32(this.pos+this.byteStart,this.littleEndian);return this.pos+=4,e}readInt64(){const e=BigInt(this.readInt32()),t=BigInt(this.readInt32());return this.littleEndian?t<<BigInt(32)|e:e<<BigInt(32)|t}readFloat(){const e=this.data.getFloat32(this.pos+this.byteStart,this.littleEndian);return this.pos+=4,e}readDouble(){const e=this.data.getFloat64(this.pos+this.byteStart,this.littleEndian);return this.pos+=8,e}readHex(e=1){let t="";for(let a=0;a<e;a++){const e=this.readUint8().toString(16);t+=1===e.length?"0"+e:e}return t}readString(e=1){let t="";if(e){let a=this.pos;for(let t=0;t<e&&0===this.buffer[this.pos+t];t++)a++;t=s.D(this.buffer.subarray(a,a+e))}return this.pos+=e,t}readLine(){let e="";for(let t=this.pos;t<this.size;t++)if(10===this.buffer[t]||13===this.buffer[t]){e+=this.readString(t-this.pos);break}for(let e=this.pos;e<this.size&&(10===this.buffer[e]||13===this.buffer[e]);e++)this.readUint8();return e}getPos(){return BigInt(this.pos)}seek(e){e>this.size&&(e=this.size),this.pos=Math.max(0,e)}skip(e){this.seek(this.pos+e)}back(e){this.seek(this.pos-e)}remainingSize(){return this.size-this.pos}readBuffer(e){e=Math.min(e,this.remainingSize());const t=this.buffer.slice(this.pos,this.pos+e);return this.pos+=e,t}appendBuffer(e){this.buffer=(0,r.A)(Uint8Array,[this.buffer.slice(),e.slice()]),this.data=new DataView(this.buffer.buffer),this.size+=e.byteLength,this.byteStart=0}resetBuffer(e,t=!0){this.buffer=e,this.data=e instanceof Uint8Array?new DataView(e.buffer):e.view,this.byteStart=e instanceof Uint8Array?e.byteOffset:0,this.pos=0,this.size=e.byteLength,this.littleEndian=!t}}},3607:(e,t,a)=>{function i(e){return e>0?e:-e}function r(e,t){return e>t?e:t}function s(e,t){return e>t?t:e}a.d(t,{T9:()=>r,jk:()=>s,tn:()=>i})}}]);