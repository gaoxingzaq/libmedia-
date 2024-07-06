"use strict";(self.webpackChunkAVTranscoder=self.webpackChunkAVTranscoder||[]).push([[453],{18453:(e,t,i)=>{i.r(t),i.d(t,{default:()=>b});var a=i(134),r=i(50932),s=i(4624),n=i(9705),o=i(85947),c=i(14686),f=i(37837),h=i(71517),d=i(91375),u=i(37246),l=i(92647),m=i(77231),p=i(52071),x=i(72739),R=i(44328),g="src/avformat/formats/IFlacFormat.ts";const B=1024;class b extends o.A{constructor(){super(),(0,a.A)(this,"type",10),(0,a.A)(this,"context",void 0)}init(e){e.ioReader.setEndian(!0),this.context={streamInfo:{minimumBlockSize:0,maximumBlockSize:0,minimumFrameSize:0,maximumFrameSize:0,sampleRate:0,channels:0,bitPerSample:0,samples:BigInt(0),md5:""},frameInfo:{sampleRate:0,channels:0,bps:0,blocksize:0,chMode:0,frameOrSampleNum:BigInt(0),isVarSize:0},seekPoints:[],cueSheet:{catalogNumber:"",leadInSamples:BigInt(0),compactDisc:!1,tracks:[]},picture:{type:0,mimeType:"",description:"",width:0,height:0,colorDepth:0,indexedColor:0,data:null},cacheBuffer:null,cachePos:BigInt(0),bitReader:new u.A(16),fileSize:BigInt(0),firstFramePos:BigInt(0)}}async readHeader(e){if("fLaC"!==await e.ioReader.readString(4))return s.z3("the file format is not flac",g,115),n.LR;this.context.fileSize=await e.ioReader.fileSize();const t=e.createStream();for(t.codecpar.codecType=1,t.codecpar.codecId=86028;;){const i=await e.ioReader.readUint8(),a=await e.ioReader.readUint24(),r=-129&i;if(0===r){t.codecpar.extradata=(0,f.sY)(a),t.codecpar.extradataSize=a,(0,c.lW)(t.codecpar.extradata,a,await e.ioReader.peekBuffer(a)),this.context.streamInfo.minimumBlockSize=await e.ioReader.readUint16(),this.context.streamInfo.maximumBlockSize=await e.ioReader.readUint16(),this.context.streamInfo.minimumFrameSize=await e.ioReader.readUint24(),this.context.streamInfo.maximumFrameSize=await e.ioReader.readUint24();const i=await e.ioReader.readUint24();t.codecpar.sampleRate=i>>4,t.codecpar.chLayout.nbChannels=1+((15&i)>>>1),this.context.streamInfo.sampleRate=t.codecpar.sampleRate,this.context.streamInfo.channels=t.codecpar.chLayout.nbChannels;const r=await e.ioReader.readUint8();t.codecpar.bitsPerRawSample=1+((1&i)<<4|(240&r)>>>4),this.context.streamInfo.bitPerSample=t.codecpar.bitsPerRawSample;const s=await e.ioReader.readUint32(),n=BigInt(Math.floor(15&r))<<BigInt(32)|BigInt(Math.floor(s));this.context.streamInfo.samples=n,t.timeBase.den=t.codecpar.sampleRate,t.timeBase.num=1,t.duration=n,t.startTime=BigInt(0),this.context.streamInfo.md5=await e.ioReader.readString(16)}else if(2===r){const t=e.createStream();t.codecpar.codecType=2,t.codecpar.codecTag=await e.ioReader.readUint32(),t.codecpar.extradata=(0,f.sY)(a-4),t.codecpar.extradataSize=a-4,await e.ioReader.readBuffer(a-4,(0,c.JW)(t.codecpar.extradata,t.codecpar.extradataSize))}else if(3===r)for(let t=0;t<a/18;t++){const t=await e.ioReader.readUint64(),i=await e.ioReader.readUint64(),a=await e.ioReader.readUint16();this.context.seekPoints.push({pts:t,pos:i,samples:a})}else if(4===r){e.ioReader.setEndian(!1);const i=await e.ioReader.readUint32(),a=await e.ioReader.readString(i),r=await e.ioReader.readUint32(),s=[];for(let t=0;t<r;t++){const t=await e.ioReader.readUint32();s.push(await e.ioReader.readString(t))}t.metadata.vendor=a,t.metadata.comments=s,e.ioReader.setEndian(!0)}else if(5===r){this.context.cueSheet.catalogNumber=await e.ioReader.readString(128),this.context.cueSheet.leadInSamples=await e.ioReader.readUint64(),this.context.cueSheet.compactDisc=!!(await e.ioReader.readUint8()>>>7),await e.ioReader.skip(258);const t=await e.ioReader.readUint8();for(let i=0;i<t;i++){const t=await e.ioReader.readUint64(),i=await e.ioReader.readUint8(),a=await e.ioReader.readBuffer(12),r=await e.ioReader.readUint8();await e.ioReader.skip(13);const s=await e.ioReader.readUint8(),n=[];for(let t=0;t<s;t++)n.push({offset:await e.ioReader.readUint64(),point:await e.ioReader.readUint8()}),await e.ioReader.skip(3);this.context.cueSheet.tracks.push({offset:t,number:i,isrc:a,type:r>>>7,preEmphasisFlag:r>>>6&1,points:n})}}else if(6===r){this.context.picture.type=await e.ioReader.readUint32();let t=await e.ioReader.readUint32();this.context.picture.mimeType=await e.ioReader.readString(t),t=await e.ioReader.readUint32(),this.context.picture.description=await e.ioReader.readString(t),this.context.picture.width=await e.ioReader.readUint32(),this.context.picture.height=await e.ioReader.readUint32(),this.context.picture.colorDepth=await e.ioReader.readUint32(),this.context.picture.indexedColor=await e.ioReader.readUint32(),t=await e.ioReader.readUint32(),this.context.picture.data=await e.ioReader.readBuffer(t)}else await e.ioReader.skip(a);if(128&i)break}return this.context.firstFramePos=e.ioReader.getPos(),t.privData=this.context,0}async getNextFrame(e){const t=[];for(;;){if(e.ioReader.getPos()===this.context.fileSize){this.context.cacheBuffer&&(t.push(this.context.cacheBuffer),this.context.cacheBuffer=null);break}this.context.cacheBuffer?this.context.cacheBuffer.length<17&&(this.context.cacheBuffer=(0,l.A)(Uint8Array,[this.context.cacheBuffer,await e.ioReader.readBuffer(Math.min(B,0|Number(this.context.fileSize-e.ioReader.getPos()&0xffffffffn)))])):(this.context.cachePos=e.ioReader.getPos(),this.context.cacheBuffer=await e.ioReader.readBuffer(Math.min(B,0|Number(this.context.fileSize-e.ioReader.getPos()&0xffffffffn))));let i=t.length?0:2;for(;i<this.context.cacheBuffer.length-2;i++)if(255===this.context.cacheBuffer[i]&&(249===this.context.cacheBuffer[i+1]||248===this.context.cacheBuffer[i+1])){i&&(t.push(this.context.cacheBuffer.subarray(0,i)),this.context.cacheBuffer=this.context.cacheBuffer.subarray(i),this.context.cachePos+=BigInt(Math.floor(i)));break}if(i!==this.context.cacheBuffer.length-2){if(this.context.cacheBuffer.length<16&&(this.context.cacheBuffer=(0,l.A)(Uint8Array,[this.context.cacheBuffer,await e.ioReader.readBuffer(Math.min(B,0|Number(this.context.fileSize-e.ioReader.getPos()&0xffffffffn)))])),this.context.bitReader.clear(),this.context.bitReader.appendBuffer(this.context.cacheBuffer.subarray(0,16)),!((0,d.x)(this.context.bitReader,{},!0)<0))break;t.push(this.context.cacheBuffer.subarray(0,2)),this.context.cachePos+=BigInt(2),this.context.cacheBuffer=this.context.cacheBuffer.subarray(2)}else e.ioReader.getPos()===this.context.fileSize?(t.push(this.context.cacheBuffer),this.context.cachePos+=BigInt(Math.floor(this.context.cacheBuffer.length)),this.context.cacheBuffer=null):(t.push(this.context.cacheBuffer.subarray(0,i)),this.context.cachePos+=BigInt(Math.floor(i)),this.context.cacheBuffer=this.context.cacheBuffer.subarray(i))}return 1===t.length?t[0]:(0,l.A)(Uint8Array,t)}async readAVPacket(e,t){const i=e.streams.find((e=>e.codecpar.codecType=1));try{let a=e.ioReader.getPos();if(a===this.context.fileSize)return-1048576;if(this.context.bitReader.clear(),this.context.cacheBuffer?(a=this.context.cachePos,this.context.cacheBuffer.length<16&&(this.context.cacheBuffer=(0,l.A)(Uint8Array,[this.context.cacheBuffer,await e.ioReader.readBuffer(Math.min(B,0|Number(this.context.fileSize-e.ioReader.getPos()&0xffffffffn)))])),this.context.bitReader.appendBuffer(this.context.cacheBuffer.subarray(0,16))):this.context.bitReader.appendBuffer(await e.ioReader.peekBuffer(16)),(0,d.x)(this.context.bitReader,this.context.frameInfo)<0)return n.LR;const s=await this.getNextFrame(e),o=(0,f.sY)(s.length);return(0,c.lW)(o,s.length,s),(0,h.NX)(t,o,s.length),r.M[17](t+56,a),r.M[15](t+32,i.index),r.M[15](t+76,i.timeBase.den),r.M[15](t+72,i.timeBase.num),r.M[17](t+16,this.context.frameInfo.isVarSize?this.context.frameInfo.frameOrSampleNum:this.context.frameInfo.frameOrSampleNum*BigInt(this.context.frameInfo.blocksize>>>0)),r.M[17](t+8,this.context.frameInfo.isVarSize?this.context.frameInfo.frameOrSampleNum:this.context.frameInfo.frameOrSampleNum*BigInt(this.context.frameInfo.blocksize>>>0)),0}catch(t){return-1048576!==e.ioReader.error&&s.z3(t.message,g,397),e.ioReader.error}}async syncFrame(e){let t=m.Dh;for(;;)try{const i=await e.ioReader.peekUint16();if((65529===i||65528===i)&&(t=e.ioReader.getPos(),this.context.bitReader.clear(),this.context.bitReader.appendBuffer(await e.ioReader.peekBuffer(16)),!(0,d.x)(this.context.bitReader,{},!0)))break;await e.ioReader.skip(1)}catch(e){break}t!==m.Dh&&await e.ioReader.seek(t)}async seek(e,t,i,a){const r=e.ioReader.getPos(),o=t.privData;if(2&a){const t=await e.ioReader.fileSize();return t<=BigInt(0)?BigInt(n.E$):(i<BigInt(0)?i=BigInt(0):i>t&&(i=t),await e.ioReader.seek(i),4&a||await this.syncFrame(e),r)}if(t&&t.sampleIndexes.length){let a=x.El(t.sampleIndexes,(e=>e.pts>i?-1:1));if(a>0&&(0,R.k)(i-t.sampleIndexes[a-1].pts,t.timeBase,m.i0)<BigInt(5e3))return s.Yz(`seek in sampleIndexes, found index: ${a}, pts: ${t.sampleIndexes[a-1].pts}, pos: ${t.sampleIndexes[a-1].pos}`,g,464),await e.ioReader.seek(t.sampleIndexes[a-1].pos),o.cacheBuffer=null,r}if(o.seekPoints.length)for(let t=0;t<o.seekPoints.length;t++){const a=o.seekPoints[t];if(a.pts>=i)return s.Yz(`seek in seekPoints, found index: ${t}, pts: ${a.pts}, pos: ${a.pos+o.firstFramePos}`,g,475),await e.ioReader.seek(a.pos+o.firstFramePos),o.cacheBuffer=null,r}s.Yz("not found any keyframe index, try to seek in bytes",g,483);const c=await(0,p.A)(e,t,i,o.firstFramePos,this.readAVPacket.bind(this),this.syncFrame.bind(this));return c>0&&(o.cacheBuffer=null),c}getAnalyzeStreamsCount(){return 1}}},85947:(e,t,i)=>{i.d(t,{A:()=>r});var a=i(134);class r{constructor(){(0,a.A)(this,"type",-1),(0,a.A)(this,"onStreamAdd",void 0)}destroy(e){}}},42774:(e,t,i)=>{i.d(t,{Xr:()=>s,jA:()=>a,oe:()=>r});const a=8,r=[0,8,12,0,16,20,24,32],s=[0,192,576,1152,2304,4608,0,0,256,512,1024,2048,4096,8192,16384,32768]},91375:(e,t,i)=>{i.d(t,{x:()=>c});var a=i(9705),r=i(4624),s=i(42774),n=i(72224),o="src/avformat/formats/flac/iflac.ts";function c(e,t,i=!1){const c=e.getPos();if(32764!=(32767&e.readU(15)))return!i&&r.z3("invalid sync code",o,32),a.LR;t.isVarSize=e.readU1();const f=e.readU(4),h=e.readU(4);if(t.chMode=e.readU(4),t.chMode<s.jA)t.channels=t.chMode+1,t.chMode=0;else{if(!(t.chMode<s.jA+3))return!i&&r.z3(`invalid channel mode: ${t.chMode}`,o,51),a.LR;t.channels=2,t.chMode-=s.jA-1}const d=e.readU(3);if(3===d)return!i&&r.z3(`invalid sample size code: ${d}`,o,57),a.LR;if(t.bps=s.oe[d],e.readU1())return!i&&r.z3("broken stream, invalid padding",o,63),a.LR;if(t.frameOrSampleNum=function(e){let t=BigInt(Math.floor(e.readU(8))),i=(t&BigInt(128))>>BigInt(1);if((t&BigInt(192))===BigInt(128)||t>=BigInt(254))return-BigInt(1);for(;t&i;){const a=BigInt(Math.floor(e.readU(8)))-BigInt(128);if(a>>BigInt(6))return-BigInt(1);t=(t<<BigInt(6))+a,i<<=BigInt(5)}return t&=(i<<BigInt(1))-BigInt(1),t}(e),t.frameOrSampleNum<0)return!i&&r.z3("sample/frame number invalid",o,70),a.LR;if(0===f)return!i&&r.z3("reserved blocksize code: 0",o,75),a.LR;if(t.blocksize=6===f?e.readU(8)+1:7===f?e.readU(16)+1:s.Xr[f],h<12)t.sampleRate=s.oe[h];else if(12===h)t.sampleRate=1e3*e.readU(8);else if(13===h)t.sampleRate=e.readU(16);else{if(14!==h)return!i&&r.z3(`illegal sample rate code ${h}`,o,101),a.LR;t.sampleRate=10*e.readU(16)}return(0,n.A)(e.getBuffer().subarray(c,e.getPos()))!==e.readU(8)?(!i&&r.z3("header crc mismatch",o,108),a.LR):0}},2187:(e,t,i)=>{i.d(t,{d:()=>n});var a=i(72739),r=i(44328),s=i(77231);function n(e,t,i){let n=BigInt(0);return a.__(e,(e=>{n+=e.codecpar.bitRate*(0,r.k)(t,i,s.i0)/BigInt(8e3)})),n}},52071:(e,t,i)=>{i.d(t,{A:()=>l});var a=i(63939),r=i(9599),s=i(29170),n=i(77231),o=i(44328),c=i(2187),f=i(71517),h=i(9705),d=i(4624),u="src/avformat/function/seekInBytes.ts";async function l(e,t,i,l,m,p){const x=e.ioReader.getPos(),R=await e.ioReader.fileSize();let g=n.Dh,B=i;t.startTime!==n.Dh?B-=t.startTime:B-=t.firstDTS;const b=(0,o.k)(i,t.timeBase,n.i0);if(b<BigInt(1e4))return d.Yz(`seek pts is earlier then 10s, seek to first packet pos(${l}) directly`,u,63),await e.ioReader.seek(l),x;let w=(0,c.d)(e.streams,B,t.timeBase);const I=R-(0,c.d)(e.streams,BigInt(5e3),n.i0),k=(0,c.d)(e.streams,BigInt(1e4),n.i0);if(w>I&&(w=I),w<l)return await e.ioReader.seek(l),x;const P=(0,f._5)();let z=R,S=BigInt(0);for(;;){if(z-S<k){g=S;break}await e.ioReader.seek(w),await p(e);const t=e.ioReader.getPos();if(!(await m(e,P)>=0))break;{const e=(0,o.k)(a.f[17](P+8),(0,s.A)(P+72,r.P),n.i0),i=e-b;if(d.Yz(`try to seek to pos: ${w}, got packet pts: ${a.f[17](P+8)}(${e}ms), diff: ${i}ms`,u,98),i<=BigInt(0)&&-i<BigInt(1e4)){g=t;break}i>BigInt(0)?(z=w,w=S+z>>BigInt(1)):(S=w,w=S+z>>BigInt(1))}}return(0,f.Qe)(P),g!==n.Dh?(d.Yz(`finally seek to pos ${g}`,u,124),await e.ioReader.seek(g),await p(e),x):(await e.ioReader.seek(x),BigInt(h.E$))}},72224:(e,t,i)=>{function a(e,t=0){for(let i=0;i<e.length;i++){t^=e[i];for(let e=0;e<8;e++)128&t?t=t<<1^7:t<<=1}return 255&t}i.d(t,{A:()=>a})},37246:(e,t,i)=>{i.d(t,{A:()=>s});var a=i(134),r=i(4624);class s{constructor(e=1048576){(0,a.A)(this,"buffer",void 0),(0,a.A)(this,"pointer",void 0),(0,a.A)(this,"bitsLeft",void 0),(0,a.A)(this,"size",void 0),(0,a.A)(this,"endPointer",void 0),(0,a.A)(this,"error",void 0),(0,a.A)(this,"onFlush",void 0),this.pointer=0,this.bitsLeft=8,this.size=e,this.endPointer=0,this.error=0,this.buffer=new Uint8Array(this.size)}peekU1(){let e=0;(this.remainingLength()<1||1===this.remainingLength()&&0===this.bitsLeft)&&this.flush();let t=this.pointer,i=this.bitsLeft;return 0===i&&(t++,i=8),e=this.buffer[t]>>i-1&1,e}readU1(){let e=0;return(this.remainingLength()<1||1===this.remainingLength()&&0===this.bitsLeft)&&this.flush(),this.bitsLeft--,e=this.buffer[this.pointer]>>this.bitsLeft&1,0===this.bitsLeft&&(this.pointer++,this.bitsLeft=8),e}readU(e){let t=0;for(let i=0;i<e;i++)t|=this.readU1()<<e-i-1;return t}remainingLength(){return this.endPointer-this.pointer}getPos(){return this.pointer}flush(){if(!this.onFlush)throw this.error=-1048574,Error("IOReader error, flush failed because of no flush callback");if(0===this.bitsLeft&&this.pointer++,!(this.size-this.remainingLength()<=0))if(this.pointer<this.endPointer){this.buffer.set(this.buffer.subarray(this.pointer,this.endPointer),0);const e=this.onFlush(this.buffer.subarray(this.endPointer-this.pointer,this.size));if(e<0)throw this.error=e,Error("IOReader error, flush failed");this.endPointer=this.endPointer-this.pointer+e,this.pointer=0}else{const e=this.onFlush(this.buffer);if(this.endPointer=e,this.pointer=0,this.bitsLeft=8,e<0)throw this.error=e,Error("IOReader error, flush failed")}}getBuffer(){return this.buffer}appendBuffer(e){if(this.size-this.endPointer>=e.length)this.buffer.set(e,this.endPointer),this.endPointer+=e.length;else if(this.buffer.set(this.buffer.subarray(this.pointer,this.endPointer),0),this.endPointer=this.endPointer-this.pointer,this.pointer=0,this.size-this.endPointer>=e.length)this.buffer.set(e,this.endPointer),this.endPointer+=e.length;else{const t=Math.min(this.size-this.endPointer,e.length);this.buffer.set(e.subarray(0,t),this.endPointer),this.endPointer+=t,r.R8("BSReader, call appendBuffer but the buffer's size is lagger then the remaining size","src/common/io/BitReader.ts",174)}}clear(){this.pointer=this.endPointer=0,this.bitsLeft=8,this.error=0}skipPadding(){this.bitsLeft<8&&(this.bitsLeft=8,this.pointer++)}}}}]);