(self.webpackChunkAVPlayer=self.webpackChunkAVPlayer||[]).push([[543],{58121:(t,i,e)=>{"use strict";e.d(i,{A:()=>r});var s=e(134);class r{constructor(){(0,s.A)(this,"signature",void 0),(0,s.A)(this,"version",void 0),(0,s.A)(this,"flags",void 0),(0,s.A)(this,"dataOffset",void 0),(0,s.A)(this,"hasVideo",void 0),(0,s.A)(this,"hasAudio",void 0),this.signature="FLV",this.version=1,this.flags=0,this.dataOffset=9,this.hasAudio=!1,this.hasVideo=!1}async read(t){this.signature=await t.readString(3),this.version=await t.readUint8(),this.flags=await t.readUint8(),this.dataOffset=await t.readUint32(),this.hasAudio=!!(4&this.flags),this.hasVideo=!!(1&this.flags)}write(t){this.flags=0,this.hasAudio&&(this.flags|=4),this.hasVideo&&(this.flags|=1),t.writeString(this.signature),t.writeUint8(this.version),t.writeUint8(this.flags),t.writeUint32(this.dataOffset)}}},89179:(t,i,e)=>{"use strict";async function s(t,i){return{key:await t.readString(await t.readUint16()),value:await r(t,i)}}async function r(t,i){let e;switch(await t.readUint8()){case 0:e=await t.readDouble();break;case 1:e=!!await t.readUint8();break;case 2:e=await t.readString(await t.readUint16());break;case 3:for(e={};t.getPos()<i;){const{key:r,value:n}=await s(t,i);if(e[r]=n,9==(16777215&await t.peekUint24())){await t.skip(3);break}}break;case 8:for(e={},await t.skip(4);t.getPos()<i;){const{key:r,value:n}=await s(t,i);if(e[r]=n,9==(16777215&await t.peekUint24())){await t.skip(3);break}}break;case 9:case 5:e=null;break;case 10:e=[];const n=await t.readUint32();for(let s=0;s<n;s++)e.push(await r(t,i));break;case 11:const a=await t.readDouble(),h=await t.readInt16();e=new Date(a+60*h*1e3);break;case 12:e=await t.readString(await t.readUint32())}return e}e.d(i,{$:()=>r})},12049:(t,i,e)=>{"use strict";e.d(i,{b:()=>a});var s=e(67672),r=e(72739),n=e(95335);function a(t,i){s.ai(i)?(t.writeUint8(0),t.writeDouble(i)):s.o(i)?(t.writeUint8(0),t.writeDouble(Number(i))):s.zM(i)?(t.writeUint8(1),t.writeUint8(i?1:0)):s.Yj(i)?i.length>=65536?(t.writeUint8(12),t.writeUint32(i.length),t.writeString(i)):(t.writeUint8(2),t.writeUint16(i.length),t.writeString(i)):s.YO(i)?(t.writeUint8(10),t.writeUint32(i.length),r.__(i,(i=>{a(t,i)}))):s.Ik(i)?(t.writeUint8(3),n.__(i,((i,e)=>{t.writeUint16(e.length),t.writeString(e),a(t,i)})),t.writeUint24(9)):i instanceof Date?(t.writeUint8(11),t.writeDouble(i.getTime()),t.writeInt16(0)):null==i&&t.writeUint8(5)}},67543:(t,i,e)=>{"use strict";e.r(i),e.d(i,{default:()=>d});var s=e(134),r=e(36773),n=e(14619),a=e(42383),h=e(82058),o=e(24175),f=e(34531),l=e(8507),u=e(35336),p=e(58121);class d extends r.A{constructor(...t){super(...t),(0,s.A)(this,"info",void 0),(0,s.A)(this,"socket",void 0),(0,s.A)(this,"session",void 0),(0,s.A)(this,"ioReader",void 0),(0,s.A)(this,"ioWriter",void 0),(0,s.A)(this,"flvWriter",void 0),(0,s.A)(this,"streamId",void 0),(0,s.A)(this,"flvHeader",void 0),(0,s.A)(this,"packetQueue",void 0),(0,s.A)(this,"flvHeaderWrote",void 0)}writeFlvData(t){this.flvWriter.writeUint8(t.type),this.flvWriter.writeUint24(t.payload.length),this.flvWriter.writeUint24(t.timestamp),this.flvWriter.writeUint8(t.timestamp>>24),this.flvWriter.writeUint24(0),this.flvWriter.writeBuffer(t.payload),this.flvWriter.writeUint32(t.payload.length+11),this.flvWriter.flush()}handleRtmpPacket(t){this.flvHeaderWrote?this.writeFlvData(t):(this.packetQueue.push(t),8===t.type?this.flvHeader.hasAudio=!0:9===t.type&&(this.flvHeader.hasVideo=!0),this.packetQueue.length>10&&(this.flvHeader.write(this.flvWriter),this.flvWriter.writeUint32(0),this.packetQueue.forEach((t=>{this.writeFlvData(t)})),this.packetQueue.length=0,this.flvHeaderWrote=!0))}async send(t){return this.socket?(await this.socket.send(t),0):-1048574}async open(t){this.info=t,this.status=1,3===t.subProtocol?(this.socket=new a.A(this.options),await this.socket.open({url:t.url,webtransportOptions:t.webtransportOptions})):(this.socket=new n.A(this.options),await this.socket.open({url:t.url})),this.ioReader=new o.A,this.ioReader.onFlush=async t=>this.socket.read(t),this.ioReader.onSeek=async t=>this.socket.seek(t),this.ioReader.onSize=async()=>this.socket.size(),this.ioWriter=new f.A,this.ioWriter.onFlush=async t=>this.socket.write(t),this.ioWriter.onSeek=async t=>this.socket.seek(t),this.flvWriter=new u.A,this.flvWriter.onFlush=t=>(this.readQueue.push(t.slice()),this.consume&&this.consume(),0),this.flvHeader=new p.A,this.packetQueue=[],this.flvHeaderWrote=!1,this.session=new h.A(this.ioReader,this.ioWriter),this.session.onMediaPacket=this.handleRtmpPacket.bind(this),this.session.onError=()=>{this.status=3,this.consume&&this.consume()},await this.session.handshake();const i=l.qg(this.info.url).pathname.split("/");return await this.session.connect(i[1],this.info.uri),this.streamId=await this.session.createStream(),this.session.play(i[2]||""),0}seek(t,i){throw new Error("Method not implemented.")}size(){throw new Error("Method not implemented.")}async stop(){this.socket&&(await this.socket.stop(),this.socket=null),this.status=4}}},46084:(t,i,e)=>{"use strict";e.d(i,{u:()=>r});var s=e(134);class r{constructor(t,i,e,r){(0,s.A)(this,"channelId",void 0),(0,s.A)(this,"type",void 0),(0,s.A)(this,"timestamp",void 0),(0,s.A)(this,"tsField",0),(0,s.A)(this,"extra",0),(0,s.A)(this,"payload",void 0),this.channelId=t,this.type=i,this.timestamp=e,this.payload=r instanceof Uint8Array?r:new Uint8Array(r)}}},82058:(t,i,e)=>{"use strict";e.d(i,{A:()=>U});var s=e(134),r=e(80662),n=e.n(r),a=e(54001),h=e.n(a),o=e(46084),f=e(90519),l=e(86932),u=e(729),p=e(68680),d=e(89179),w=e(12049),c=e(98951),g=e(31865),b=e(4624),y=e(72739),m="src/avprotocol/rtmp/RtmpSession.ts";class U{constructor(t,i){(0,s.A)(this,"ioReader",void 0),(0,s.A)(this,"ioWriter",void 0),(0,s.A)(this,"prevReadPacket",void 0),(0,s.A)(this,"prevWritePacket",void 0),(0,s.A)(this,"inChunkSize",void 0),(0,s.A)(this,"outChunkSize",void 0),(0,s.A)(this,"seq",void 0),(0,s.A)(this,"bufferWriter",void 0),(0,s.A)(this,"bufferReader",void 0),(0,s.A)(this,"requestMap",void 0),(0,s.A)(this,"state",void 0),(0,s.A)(this,"onMediaPacket",void 0),(0,s.A)(this,"onError",void 0),this.ioReader=t,this.ioWriter=i,this.prevReadPacket=new(n()),this.prevWritePacket=new(n()),this.requestMap=new(n()),this.inChunkSize=128,this.outChunkSize=128,this.seq=0,this.bufferWriter=new u.A(new Uint8Array(1)),this.bufferReader=new g.A(new Uint8Array(1)),this.state=0}async handshake(){const t=(0,l.A)();await this.ioWriter.writeUint8(3),await this.ioWriter.writeUint32(0),await this.ioWriter.writeUint32(0);const i=new Uint8Array(1528);f.y(i),await this.ioWriter.writeBuffer(i),await this.ioWriter.flush(),await this.ioReader.readUint8();const e=await this.ioReader.readUint32();await this.ioReader.skip(4);const s=await this.ioReader.readBuffer(1528);await this.ioWriter.writeUint32(e),await this.ioWriter.writeUint32((0,l.A)()-t),await this.ioWriter.writeBuffer(s),await this.ioWriter.flush(),await this.ioReader.skip(1536),this.readRtmpPacket()}async sendPacket(t){await(0,c.U)(this.ioWriter,this.outChunkSize,t,this.prevWritePacket.get(t.channelId)),this.prevWritePacket.set(t.channelId,t)}async readPacket(){const t=await(0,c.w)(this.ioReader,this.inChunkSize,this.prevReadPacket);return this.prevReadPacket.set(t.channelId,t),t}handleChunkSize(t){t.payload.length>=4&&(this.bufferReader.resetBuffer(t.payload),this.inChunkSize=this.bufferReader.readUint32())}handleUserControl(t){t.payload.length>=2&&(this.bufferReader.resetBuffer(t.payload),6===this.bufferReader.readUint16()&&this.sendPong(t,this.bufferReader.readUint32()))}handleSetPeerBW(t){}handleWindowSizeACK(t){}async handleInvoke(t){this.bufferReader.resetBuffer(t.payload);const i=BigInt(t.payload.length),e=await d.$(this.bufferReader,i),s=await d.$(this.bufferReader,i);if("_result"===e||"_error"===e){if(this.requestMap.has(s)){const t=await d.$(this.bufferReader,i),r=await d.$(this.bufferReader,i);"_result"===e?this.requestMap.get(s).resolve({options:t,info:r}):this.requestMap.get(s).reject({options:t,info:r}),this.requestMap.delete(s)}}else if("onStatus"===e){await d.$(this.bufferReader,i);let t=await d.$(this.bufferReader,i);if("error"===t.level)b.z3(`Server error: ${t.description}`,m,215),this.onError&&this.onError();else switch(t.code){case"NetStream.Play.Start":case"NetStream.Seek.Notify":this.state=3;break;case"NetStream.Play.Stop":case"NetStream.Play.UnpublishNotify":this.state=8;break;case"NetStream.Publish.Start":this.state=5}}}handleNotify(t){}async readRtmpPacket(){for(;;)try{const t=await this.readPacket();switch(t.type){case 3:default:break;case 1:this.handleChunkSize(t);break;case 4:this.handleUserControl(t);break;case 6:this.handleSetPeerBW(t);break;case 5:this.handleWindowSizeACK(t);break;case 20:await this.handleInvoke(t);break;case 18:this.handleNotify(t);break;case 22:case 8:case 9:this.onMediaPacket(t)}}catch(t){break}}async sendPong(t,i){if(t.payload.length<6)return void b.R8(`Too short ping packet (${t.payload.length})`,m,290);const e=new o.u(2,4,t.timestamp+1,6);this.bufferWriter.resetBuffer(e.payload),this.bufferWriter.writeUint16(7),this.bufferWriter.writeUint32(i),this.sendPacket(e)}request(t,i){const e=new o.u(3,20,0,4096+p.iD);return this.bufferWriter.resetBuffer(e.payload),w.b(this.bufferWriter,t),w.b(this.bufferWriter,++this.seq),y.__(i,(t=>{w.b(this.bufferWriter,t)})),e.payload=e.payload.subarray(0,this.bufferWriter.getPos()),new(h())(((t,i)=>{this.requestMap.set(this.seq,{resolve:t,reject:i}),this.sendPacket(e)}))}async connect(t,i){await this.request("connect",[{app:t,fourCcList:["hvc1","av01","vp09"],flashVer:"LNX 9,0,124,2",tcUrl:"rtmp://pulltc3-live.baijiayun.com/zgx/test001",fpad:0,capabilities:15,audioCodecs:4071,videoCodecs:252,videoFunction:1}])}async createStream(){return(await this.request("createStream",[null])).info}async play(t){await this.request("play",[null,t,-1,-1,!0])}async publish(t){await this.request("publish",[null,"streamName","live"])}}},68680:(t,i,e)=>{"use strict";e.d(i,{iD:()=>s});const s=1024},98951:(t,i,e)=>{"use strict";e.d(i,{U:()=>a,w:()=>h});var s=e(46084),r=e(92647);async function n(t,i,e){if(i<64)await t.writeUint8(i|e<<6);else if(i<320)await t.writeUint8(e<<6),await t.writeUint8(i-64);else{await t.writeUint8(1|e<<6);const s=i-64;await t.writeUint8(255&s),await t.writeUint8(s>>>8)}}async function a(t,i,e,s){const r=s&&s.extra===e.extra&&e.timestamp>=s.timestamp;let a=e.timestamp;r&&(a-=s.timestamp),e.tsField=a>16777215?16777215:a;let h=0;r&&(e.type===s.type&&e.payload.length===s.payload.length?(h=2,e.tsField===s.tsField&&(h=3)):h=1),await n(t,e.channelId,h),3!==h&&(await t.writeUint24(e.tsField),2!==h&&(await t.writeUint24(e.payload.length),await t.writeUint8(e.type),0===h&&(await t.writeUint8(e.extra),await t.writeUint8(e.extra>>8),await t.writeUint8(e.extra>>16),await t.writeUint8(e.extra>>24)))),16777215===e.tsField&&await t.writeUint32(a);let o=0;for(;o<e.payload.length;){const s=Math.min(i,e.payload.length-o);await t.writeBuffer(e.payload.subarray(o,o+s)),o+=s,o<e.payload.length&&(await n(t,e.channelId,3),16777215===e.tsField&&await t.writeUint32(a))}await t.flush()}async function h(t,i,e){const n=[],a=await t.readUint8();let h=63&a;h<2&&(h=0===await t.readUint8()?await t.readUint8()+64:64+(await t.readUint8()|await t.readUint8()<<8));const o=a>>>6,f=e.get(h);let l=f?f.payload.length:0,u=f?f.type:0,p=f?f.extra:0,d=0,w=0;if(3===o?d=f.tsField:(d=await t.readUint24(),2!==o&&(l=await t.readUint24(),u=await t.readUint8(),0===o&&(p=await t.readUint8(),p|=await t.readUint8()<<8,p|=await t.readUint8()<<16,p|=await t.readUint8()<<24))),w=16777215===d?await t.readUint32():d,0!==o&&(w+=f.timestamp),l<i)n.push(await t.readBuffer(l));else{let e=l;for(;e;){const s=Math.min(i,e);if(n.push(await t.readBuffer(s)),e-=s,e){const i=63&await t.readUint8();i<2&&await t.skip(i+1),16777215===d&&await t.skip(4)}}}const c=new s.u(h,u,w,(0,r.A)(Uint8Array,n));return c.tsField=d,c.extra=p,c}},90519:(t,i,e)=>{"use strict";function s(t){crypto.getRandomValues(t)}e.d(i,{y:()=>s})},6498:(t,i,e)=>{"use strict";e.d(i,{A:()=>n});var s=e(67672),r=e(72739);function n(t,i){const e=[];return s.ai(t)&&(t+=""),t&&s.Yj(t)&&r.__(t.split(i),((t,i)=>{(t=t.trim())&&e.push(t)})),e}},729:(t,i,e)=>{"use strict";e.d(i,{A:()=>a});var s=e(134),r=e(4624),n=e(50011);class a{constructor(t,i=!0){(0,s.A)(this,"data",void 0),(0,s.A)(this,"buffer",void 0),(0,s.A)(this,"byteStart",void 0),(0,s.A)(this,"pos",void 0),(0,s.A)(this,"size",void 0),(0,s.A)(this,"littleEndian",void 0),this.buffer=t,this.data=t instanceof Uint8Array?new DataView(t.buffer):t.view,this.byteStart=t instanceof Uint8Array?t.byteOffset:0,this.pos=0,this.size=t.byteLength,this.littleEndian=!i}writeUint8(t){this.data.setUint8(this.pos+++this.byteStart,t)}writeUint16(t){this.data.setUint16(this.pos+this.byteStart,t,this.littleEndian),this.pos+=2}writeUint24(t){const i=3840&t,e=240&t,s=15&t;this.littleEndian?(this.writeUint8(s),this.writeUint8(e),this.writeUint8(i)):(this.writeUint8(i),this.writeUint8(e),this.writeUint8(s))}writeUint32(t){this.data.setUint32(this.pos+this.byteStart,t,this.littleEndian),this.pos+=4}writeUint64(t){const i=t&BigInt(4294967295),e=(t&BigInt(4294967295)<<BigInt(32))>>BigInt(32);this.littleEndian?(this.writeUint32(Number(i)),this.writeUint32(Number(e))):(this.writeUint32(Number(e)),this.writeUint32(Number(i)))}writeInt8(t){this.data.setInt8(this.pos+++this.byteStart,t)}writeInt16(t){this.data.setInt16(this.pos+this.byteStart,t,this.littleEndian),this.pos+=2}writeInt24(t){this.writeUint24(t<0?t+16777216:t)}writeInt32(t){this.data.setInt32(this.pos+this.byteStart,t,this.littleEndian),this.pos+=4}writeInt64(t){const i=t&BigInt(4294967295),e=(t&BigInt(4294967295)<<BigInt(32))>>BigInt(32);this.littleEndian?(this.writeInt32(Number(i)),this.writeInt32(Number(e))):(this.writeInt32(Number(e)),this.writeInt32(Number(i)))}writeFloat(t){this.data.setFloat32(this.pos+this.byteStart,t,this.littleEndian),this.pos+=4}writeDouble(t){this.data.setFloat64(this.pos+this.byteStart,t,this.littleEndian),this.pos+=8}getPos(){return this.pos}seek(t){t>this.size&&(t=this.size),this.pos=Math.max(0,t)}skip(t){this.seek(this.pos+t)}back(t){this.seek(this.pos-t)}remainingSize(){return this.size-this.pos}writeBuffer(t){let i=t.length;this.remainingSize()<i&&(i=this.remainingSize(),r.R8(`the remaining buffer size is smaller then the wrote buffer, hope set ${t.length}, but set ${i}`,"src/common/io/BufferWriter.ts",218)),this.buffer.set(t,this.pos),this.pos+=t.length}writeString(t){const i=n.encode(t);return this.writeBuffer(i),i.length}getWroteBuffer(){return this.buffer.subarray(0,this.pos)}resetBuffer(t,i=!0){this.buffer=t,this.data=t instanceof Uint8Array?new DataView(t.buffer):t.view,this.byteStart=t instanceof Uint8Array?t.byteOffset:0,this.pos=0,this.size=t.byteLength,this.littleEndian=!i}}},24175:(t,i,e)=>{"use strict";e.d(i,{A:()=>o});var s=e(134),r=e(4624),n=e(50011),a=e(13724),h="src/common/io/IOReader.ts";class o{constructor(t=1048576,i=!0,e){if((0,s.A)(this,"data",void 0),(0,s.A)(this,"buffer",void 0),(0,s.A)(this,"pointer",void 0),(0,s.A)(this,"endPointer",void 0),(0,s.A)(this,"pos",void 0),(0,s.A)(this,"size",void 0),(0,s.A)(this,"littleEndian",void 0),(0,s.A)(this,"fileSize_",void 0),(0,s.A)(this,"error",void 0),(0,s.A)(this,"onFlush",void 0),(0,s.A)(this,"onSeek",void 0),(0,s.A)(this,"onSize",void 0),(0,s.A)(this,"flags",void 0),this.pos=BigInt(0),this.pointer=0,this.error=0,this.endPointer=0,this.littleEndian=!i,this.flags=0,e&&e.view)this.size=e.length,this.buffer=e,this.data=e.view;else if(e&&!e.byteOffset)this.size=e.length,this.buffer=e,this.data=new DataView(this.buffer.buffer);else{if(e)throw new Error("not support subarray of ArrayBuffer");this.size=Math.max(t,102400),this.buffer=new Uint8Array(this.size),this.data=new DataView(this.buffer.buffer)}}async readUint8(){this.remainingLength()<1&&await this.flush(1);const t=this.data.getUint8(this.pointer);return this.pointer++,this.pos++,t}async peekUint8(){return this.remainingLength()<1&&await this.flush(1),this.data.getUint8(this.pointer)}async readUint16(){this.remainingLength()<2&&await this.flush(2);const t=this.data.getUint16(this.pointer,this.littleEndian);return this.pointer+=2,this.pos+=BigInt(2),t}async peekUint16(){return this.remainingLength()<2&&await this.flush(2),this.data.getUint16(this.pointer,this.littleEndian)}async readUint24(){this.remainingLength()<3&&await this.flush(3);const t=await this.readUint16(),i=await this.readUint8();return this.littleEndian?i<<16|t:t<<8|i}async peekUint24(){this.remainingLength()<3&&await this.flush(3);const t=this.pointer,i=this.pos,e=await this.readUint16(),s=await this.readUint8(),r=this.littleEndian?s<<16|e:e<<8|s;return this.pointer=t,this.pos=i,r}async readUint32(){this.remainingLength()<4&&await this.flush(4);const t=this.data.getUint32(this.pointer,this.littleEndian);return this.pointer+=4,this.pos+=BigInt(4),t}async peekUint32(){return this.remainingLength()<4&&await this.flush(4),this.data.getUint32(this.pointer,this.littleEndian)}async readUint64(){this.remainingLength()<8&&await this.flush(8);const t=this.data.getBigUint64(this.pointer,this.littleEndian);return this.pointer+=8,this.pos+=BigInt(8),t}async peekUint64(){return this.remainingLength()<8&&await this.flush(8),this.data.getBigUint64(this.pointer,this.littleEndian)}async readInt8(){this.remainingLength()<1&&await this.flush(1);const t=this.data.getInt8(this.pointer);return this.pointer++,this.pos++,t}async peekInt8(){return this.remainingLength()<1&&await this.flush(1),this.data.getInt8(this.pointer)}async readInt16(){this.remainingLength()<2&&await this.flush(2);const t=this.data.getInt16(this.pointer,this.littleEndian);return this.pointer+=2,this.pos+=BigInt(2),t}async peekInt16(){return this.remainingLength()<2&&await this.flush(2),this.data.getInt16(this.pointer,this.littleEndian)}async readInt24(){const t=await this.readUint24();return 8388608&t?t-16777216:t}async peekInt24(){const t=await this.peekUint24();return 8388608&t?t-16777216:t}async readInt32(){this.remainingLength()<4&&await this.flush(4);const t=this.data.getInt32(this.pointer,this.littleEndian);return this.pointer+=4,this.pos+=BigInt(4),t}async peekInt32(){return this.remainingLength()<4&&await this.flush(4),this.data.getInt32(this.pointer,this.littleEndian)}async readInt64(){this.remainingLength()<8&&await this.flush(8);const t=this.data.getBigInt64(this.pointer,this.littleEndian);return this.pointer+=8,this.pos+=BigInt(8),t}async peekInt64(){return this.remainingLength()<8&&await this.flush(8),this.data.getBigInt64(this.pointer,this.littleEndian)}async readFloat(){this.remainingLength()<4&&await this.flush(4);const t=this.data.getFloat32(this.pointer,this.littleEndian);return this.pointer+=4,this.pos+=BigInt(4),t}async peekFloat(){return this.remainingLength()<4&&await this.flush(4),this.data.getFloat32(this.pointer,this.littleEndian)}async readDouble(){this.remainingLength()<8&&await this.flush(8);const t=this.data.getFloat64(this.pointer,this.littleEndian);return this.pointer+=8,this.pos+=BigInt(8),t}async peekDouble(){return this.remainingLength()<8&&await this.flush(8),this.data.getFloat64(this.pointer,this.littleEndian)}async readHex(t=1){let i="";for(let e=0;e<t;e++){const t=(await this.readUint8()).toString(16);i+=1===t.length?"0"+t:t}return i}async peekHex(t=1){t>this.size&&(this.error=-1048574,r.h2("peekHex, length too large",h,414)),this.remainingLength()<t&&await this.flush(t);const i=this.pointer,e=this.pos;let s="";for(let i=0;i<t;i++){const t=(await this.readUint8()).toString(16);s+=1===t.length?"0"+t:t}return this.pointer=i,this.pos=e,s}async readBuffer(t,i){if(i||(i=new Uint8Array(t)),this.remainingLength()<t){let e=0;if(this.remainingLength()>0){const s=this.remainingLength();i.set(this.buffer.subarray(this.pointer,this.pointer+s),e),e+=s,this.pointer+=s,this.pos+=BigInt(s),t-=s}for(;t>0;){await this.flush();const s=Math.min(this.endPointer-this.pointer,t);i.set(this.buffer.subarray(this.pointer,this.pointer+s),e),e+=s,this.pointer+=s,this.pos+=BigInt(s),t-=s}}else i.set(this.buffer.subarray(this.pointer,this.pointer+t),0),this.pointer+=t,this.pos+=BigInt(t);return i}async peekBuffer(t,i){return t>this.size&&(this.error=-1048574,r.h2("peekBuffer, length too large",h,499)),this.remainingLength()<t&&await this.flush(t),i||(i=new Uint8Array(t)),i.set(this.buffer.subarray(this.pointer,this.pointer+t),0),i}async readToBuffer(t,i){if(this.remainingLength()<t){let e=0;if(this.remainingLength()>0){const s=this.remainingLength();i.set(this.buffer.subarray(this.pointer,this.pointer+s),e),e+=s,this.pointer+=s,this.pos+=BigInt(s),t-=s}for(;t>0;){try{await this.flush()}catch(t){if(-1048576===this.error&&e)return e;throw t}const s=Math.min(this.endPointer-this.pointer,t);i.set(this.buffer.subarray(this.pointer,this.pointer+s),e),e+=s,this.pointer+=s,this.pos+=BigInt(s),t-=s}return e}return i.set(this.buffer.subarray(this.pointer,this.pointer+t),0),this.pointer+=t,this.pos+=BigInt(t),t}async readString(t=1){const i=await this.readBuffer(t);return n.decode(i)}async peekString(t=1){const i=await this.peekBuffer(t);return n.decode(i)}async readLine(){let t="";for(;;){let i=!1;for(let e=this.pointer;e<this.endPointer;e++)if(10===this.buffer[e]||13===this.buffer[e]){e!==this.pointer&&(t+=await this.readString(e-this.pointer)),i=!0;break}if(i)break;t+=await this.readString(this.remainingLength()),await this.flush()}let i=await this.peekUint8();return 10!==i&&13!==i||(this.pointer++,13===i&&(i=await this.peekUint8(),10===i&&this.pointer++)),t}async peekLine(){if(this.remainingLength()<this.size)try{await this.flush()}catch(t){if(-1048576!==this.error)throw t}let t="",i=!1;for(let e=this.pointer;e<this.endPointer;e++)if(10===this.buffer[e]||13===this.buffer[e]){t+=await this.peekString(e-this.pointer),i=!0;break}return i||(this.error=-1048574,r.h2("peekLine, out of buffer",h,657)),t}getPointer(){return this.pointer}getPos(){return this.pos}async skip(t){const i=t;for(;this.remainingLength()<t;)t-=this.remainingLength(),this.pointer=this.endPointer,await this.flush();this.remainingLength()>=t&&(this.pointer+=t),this.pos+=BigInt(i)}remainingLength(){return this.endPointer-this.pointer}async flush_(t){for(;;){const i=await this.onFlush(t);if(-1048575!==i)return i;await new a.A(0)}}async flush(t=0){if(this.onFlush||(this.error=-1048574,r.h2("IOReader error, flush failed because of no flush callback",h,731)),!(this.size-this.remainingLength()<=0)){if(t=Math.min(t,this.size),this.pointer<this.endPointer?(this.buffer.set(this.buffer.subarray(this.pointer,this.endPointer),0),this.endPointer=this.endPointer-this.pointer):this.endPointer=0,this.pointer=0,t)for(;this.remainingLength()<t;){const t=await this.flush_(this.buffer.subarray(this.endPointer));if(t<0)throw this.error=t,new Error(`IOReader error, flush ${-1048576===t?"ended":"failed"}, ret: ${t}`);this.endPointer+=t}else{const t=await this.flush_(this.buffer.subarray(this.endPointer));if(t<0)throw this.error=t,new Error(`IOReader error, flush ${-1048576===t?"ended":"failed"}, ret: ${t}`);this.endPointer+=t}this.error=0}}async seek(t,i=!1,e=!0){if(!i){const i=Number(t-this.pos);if(i<0&&Math.abs(i)<this.pointer)return this.pointer+=i,void(this.pos=t);if(i>0&&this.pointer+i<this.endPointer)return this.pointer+=i,void(this.pos=t);if(0===i)return}this.onSeek||(this.error=-1048574,r.h2("IOReader error, seek failed because of no seek callback",h,802)),this.pointer=this.endPointer=0,this.pos=t;const s=await this.onSeek(t);0!==s&&(this.error=s,r.h2("IOReader error, seek failed",h,811)),e&&await this.flush()}getBuffer(){return this.buffer}appendBuffer(t){if(this.size-this.endPointer>=t.length)this.buffer.set(t,this.endPointer),this.endPointer+=t.length;else if(this.buffer.set(this.buffer.subarray(this.pointer,this.endPointer),0),this.endPointer=this.endPointer-this.pointer,this.pointer=0,this.size-this.endPointer>=t.length)this.buffer.set(t,this.endPointer),this.endPointer+=t.length;else{const i=Math.min(this.size-this.endPointer,t.length);this.buffer.set(t.subarray(0,i),this.endPointer),this.endPointer+=i,r.R8("IOReader, call appendBuffer but the buffer's size is lagger then the remaining size",h,849)}}reset(){this.pointer=this.endPointer=0,this.pos=BigInt(0),this.error=0}setEndian(t){this.littleEndian=!t}async fileSize(){if(this.fileSize_)return this.fileSize_;if(!this.onSize)return r.R8("IOReader error, fileSize failed because of no onSize callback",h,882),BigInt(0);try{this.fileSize_=await this.onSize()}catch(t){r.R8(`IOReader error, call fileSize failed: ${t}`,h,889),this.fileSize_=BigInt(0)}return this.fileSize_}getBufferSize(){return this.size}async pipe(t,i){if(i)if(this.remainingLength()<i){if(this.remainingLength()>0){const e=this.remainingLength();await t.writeBuffer(this.buffer.subarray(this.pointer,this.pointer+e)),this.pointer+=e,this.pos+=BigInt(e),i-=e}for(;i>0;){await this.flush();const e=Math.min(this.remainingLength(),i);await t.writeBuffer(this.buffer.subarray(this.pointer,this.pointer+e)),this.pointer+=e,this.pos+=BigInt(e),i-=e}}else await t.writeBuffer(this.buffer.subarray(this.pointer,this.pointer+i)),this.pointer+=i,this.pos+=BigInt(i);else{if(this.remainingLength()>0){const i=this.remainingLength();await t.writeBuffer(this.buffer.subarray(this.pointer,this.pointer+i)),this.pointer+=i,this.pos+=BigInt(i)}for(;await this.flush_(this.buffer.subarray(0))>0;){const i=this.remainingLength();await t.writeBuffer(this.buffer.subarray(this.pointer,this.pointer+i)),this.pointer+=i,this.pos+=BigInt(i)}}}}},34531:(t,i,e)=>{"use strict";e.d(i,{A:()=>n});var s=e(134),r=e(50011);class n{constructor(t=1048576,i=!0,e){if((0,s.A)(this,"data",void 0),(0,s.A)(this,"buffer",void 0),(0,s.A)(this,"pointer",void 0),(0,s.A)(this,"pos",void 0),(0,s.A)(this,"size",void 0),(0,s.A)(this,"littleEndian",void 0),(0,s.A)(this,"error",void 0),(0,s.A)(this,"onFlush",void 0),(0,s.A)(this,"onSeek",void 0),this.pointer=0,this.pos=BigInt(0),this.size=t,this.littleEndian=!i,this.error=0,e&&e.view)this.size=e.length,this.buffer=e,this.data=e.view;else if(e&&!e.byteOffset)this.size=e.length,this.buffer=e,this.data=new DataView(this.buffer.buffer);else{if(e)throw new Error("not support subarray of ArrayBuffer");this.buffer=new Uint8Array(this.size),this.data=new DataView(this.buffer.buffer)}}async writeUint8(t){this.remainingLength()<1&&await this.flush(),this.data.setUint8(this.pointer,t),this.pointer++,this.pos++}async writeUint16(t){this.remainingLength()<2&&await this.flush(),this.data.setUint16(this.pointer,t,this.littleEndian),this.pointer+=2,this.pos+=BigInt(2)}async writeUint24(t){this.remainingLength()<3&&await this.flush();const i=(16711680&t)>>16,e=(65280&t)>>8,s=255&t;this.littleEndian?(await this.writeUint8(s),await this.writeUint8(e),await this.writeUint8(i)):(await this.writeUint8(i),await this.writeUint8(e),await this.writeUint8(s))}async writeUint32(t){this.remainingLength()<4&&await this.flush(),this.data.setUint32(this.pointer,t,this.littleEndian),this.pointer+=4,this.pos+=BigInt(4)}async writeUint64(t){this.remainingLength()<8&&await this.flush(),this.data.setBigUint64(this.pointer,t,this.littleEndian),this.pointer+=8,this.pos+=BigInt(8)}async writeInt8(t){this.remainingLength()<1&&await this.flush(),this.data.setInt8(this.pointer,t),this.pointer++,this.pos++}async writeInt16(t){this.remainingLength()<2&&await this.flush(),this.data.setInt16(this.pointer,t,this.littleEndian),this.pointer+=2,this.pos+=BigInt(2)}async writeInt24(t){await this.writeUint24(t<0?t+16777216:t)}async writeInt32(t){this.remainingLength()<4&&await this.flush(),this.data.setInt32(this.pointer,t,this.littleEndian),this.pointer+=4,this.pos+=BigInt(4)}async writeInt64(t){this.remainingLength()<8&&await this.flush(),this.data.setBigInt64(this.pointer,t,this.littleEndian),this.pointer+=8,this.pos+=BigInt(8)}async writeFloat(t){this.remainingLength()<4&&await this.flush(),this.data.setFloat32(this.pointer,t,this.littleEndian),this.pointer+=4,this.pos+=BigInt(4)}async writeDouble(t){this.remainingLength()<8&&await this.flush(),this.data.setFloat64(this.pointer,t,this.littleEndian),this.pointer+=8,this.pos+=BigInt(8)}getPointer(){return this.pointer}getPos(){return this.pos}remainingLength(){return this.size-this.pointer}async writeBuffer(t){if(!t.length)return;let i=t.length;if(this.remainingLength()<i){let e=0;for(;i>0;){await this.flush();const s=Math.min(this.size,i);this.buffer.set(t.subarray(e,e+s),this.pointer),this.pointer+=s,this.pos+=BigInt(s),e+=s,i-=s}}else this.buffer.set(t,this.pointer),this.pointer+=i,this.pos+=BigInt(i)}async writeString(t){const i=r.encode(t);return await this.writeBuffer(i),i.length}async flush(){if(!this.onFlush)throw this.error=-1048574,Error("IOWriter error, flush failed because of no flush callback");if(this.pointer){const t=await this.onFlush(this.buffer.subarray(0,this.pointer));if(0!==t)throw this.error=t,Error("IOWriter error, flush failed")}this.pointer=0}async flushToPos(t){if(!this.onFlush)throw this.error=-1048574,Error("IOWriter error, flush failed because of no flush callback");if(this.pointer){const i=await this.onFlush(this.buffer.subarray(0,this.pointer),t);if(0!==i)throw this.error=i,Error("IOWriter error, flush failed")}this.pointer=0}async seek(t){if(!this.onSeek)throw this.error=-1048574,Error("IOWriter error, seek failed because of no seek callback");await this.flush();const i=await this.onSeek(t);if(0!==i)throw this.error=i,Error("IOWriter error, seek failed");this.pos=t}seekInline(t){const i=this.pointer;this.pointer=Math.max(0,Math.min(this.size,t)),this.pos+=BigInt(this.pointer-i)}skip(t){const i=this.pointer;this.pointer=Math.min(this.size,this.pointer+t),this.pos+=BigInt(this.pointer-i)}back(t){const i=this.pointer;this.pointer=Math.max(0,this.pointer-t),this.pos+=BigInt(this.pointer-i)}getBuffer(){return this.buffer.subarray(0,this.pointer)}setEndian(t){this.littleEndian=!t}reset(){this.pointer=0,this.pos=BigInt(0),this.error=0}getBufferSize(){return this.size}}},35336:(t,i,e)=>{"use strict";e.d(i,{A:()=>n});var s=e(134),r=e(50011);class n{constructor(t=1048576,i=!0,e){if((0,s.A)(this,"data",void 0),(0,s.A)(this,"buffer",void 0),(0,s.A)(this,"pointer",void 0),(0,s.A)(this,"pos",void 0),(0,s.A)(this,"size",void 0),(0,s.A)(this,"littleEndian",void 0),(0,s.A)(this,"error",void 0),(0,s.A)(this,"onFlush",void 0),(0,s.A)(this,"onSeek",void 0),this.pointer=0,this.pos=BigInt(0),this.size=t,this.littleEndian=!i,this.error=0,e&&e.view)this.size=e.length,this.buffer=e,this.data=e.view;else if(e&&!e.byteOffset)this.size=e.length,this.buffer=e,this.data=new DataView(this.buffer.buffer);else{if(e)throw new Error("not support subarray of ArrayBuffer");this.buffer=new Uint8Array(this.size),this.data=new DataView(this.buffer.buffer)}}writeUint8(t){this.remainingLength()<1&&this.flush(),this.data.setUint8(this.pointer,t),this.pointer++,this.pos++}writeUint16(t){this.remainingLength()<2&&this.flush(),this.data.setUint16(this.pointer,t,this.littleEndian),this.pointer+=2,this.pos+=BigInt(2)}writeUint24(t){this.remainingLength()<3&&this.flush();const i=(16711680&t)>>16,e=(65280&t)>>8,s=255&t;this.littleEndian?(this.writeUint8(s),this.writeUint8(e),this.writeUint8(i)):(this.writeUint8(i),this.writeUint8(e),this.writeUint8(s))}writeUint32(t){this.remainingLength()<4&&this.flush(),this.data.setUint32(this.pointer,t,this.littleEndian),this.pointer+=4,this.pos+=BigInt(4)}writeUint64(t){this.remainingLength()<8&&this.flush(),this.data.setBigUint64(this.pointer,t,this.littleEndian),this.pointer+=8,this.pos+=BigInt(8)}writeInt8(t){this.remainingLength()<1&&this.flush(),this.data.setInt8(this.pointer,t),this.pointer++,this.pos++}writeInt16(t){this.remainingLength()<2&&this.flush(),this.data.setInt16(this.pointer,t,this.littleEndian),this.pointer+=2,this.pos+=BigInt(2)}writeInt24(t){this.writeUint24(t<0?t+16777216:t)}writeInt32(t){this.remainingLength()<4&&this.flush(),this.data.setInt32(this.pointer,t,this.littleEndian),this.pointer+=4,this.pos+=BigInt(4)}writeInt64(t){this.remainingLength()<8&&this.flush(),this.data.setBigInt64(this.pointer,t,this.littleEndian),this.pointer+=8,this.pos+=BigInt(8)}writeFloat(t){this.remainingLength()<4&&this.flush(),this.data.setFloat32(this.pointer,t,this.littleEndian),this.pointer+=4,this.pos+=BigInt(4)}writeDouble(t){this.remainingLength()<8&&this.flush(),this.data.setFloat64(this.pointer,t,this.littleEndian),this.pointer+=8,this.pos+=BigInt(8)}getPointer(){return this.pointer}getPos(){return this.pos}remainingLength(){return this.size-this.pointer}writeBuffer(t){if(!t.length)return;let i=t.length;if(this.remainingLength()<i){let e=0;for(;i>0;){this.flush();const s=Math.min(this.size,i);this.buffer.set(t.subarray(e,e+s),this.pointer),this.pointer+=s,this.pos+=BigInt(s),e+=s,i-=s}}else this.buffer.set(t,this.pointer),this.pointer+=i,this.pos+=BigInt(i)}writeString(t){const i=r.encode(t);return this.writeBuffer(i),i.length}flush(){if(!this.onFlush)throw this.error=-1048574,Error("IOWriter error, flush failed because of no flush callback");if(this.pointer){const t=this.onFlush(this.buffer.subarray(0,this.pointer));if(0!==t)throw this.error=t,Error("IOWriter error, flush failed")}this.pointer=0}flushToPos(t){if(!this.onFlush)throw this.error=-1048574,Error("IOWriter error, flush failed because of no flush callback");if(this.pointer){const i=this.onFlush(this.buffer.subarray(0,this.pointer),t);if(0!==i)throw this.error=i,Error("IOWriter error, flush failed")}this.pointer=0}seek(t){if(!this.onSeek)throw this.error=-1048574,Error("IOWriter error, seek failed because of no seek callback");this.flush();const i=this.onSeek(t);if(0!==i)throw this.error=i,Error("IOWriter error, seek failed");this.pos=t}seekInline(t){const i=this.pointer;this.pointer=Math.max(0,Math.min(this.size,t)),this.pos+=BigInt(this.pointer-i)}skip(t){const i=this.pointer;this.pointer=Math.min(this.size,this.pointer+t),this.pos+=BigInt(this.pointer-i)}back(t){const i=this.pointer;this.pointer=Math.max(0,this.pointer-t),this.pos+=BigInt(this.pointer-i)}getBuffer(){return this.buffer.subarray(0,this.pointer)}setEndian(t){this.littleEndian=!t}reset(){this.pointer=0,this.pos=BigInt(0),this.error=0}getBufferSize(){return this.size}}},8507:(t,i,e)=>{"use strict";e.d(i,{ll:()=>c,mA:()=>a,qg:()=>h}),e(73146);var s=e(67672),r=e(6498),n=e(72739);function a(t,i="&"){const e={};if(s.Yj(t)&&t.indexOf("=")>=0){let s=t.charAt(0),a="?"===s||"#"===s?1:0;a>0&&(t=t.substr(a)),n.__((0,r.A)(t,i),(t=>{let i=t.split("=");if(2===i.length){var s;let t=null===(s=i[0])||void 0===s?void 0:s.trim();t&&(e[t]=decodeURIComponent(i[1]))}}))}return e}function h(t){const i=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],e={},s=/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/.exec(t);let r=14;for(;r--;){var n;e[i[r]]=null!==(n=s[r])&&void 0!==n?n:""}return{protocol:e.protocol,file:e.file,host:e.host,port:e.port,user:e.user,password:e.password,origin:`${e.protocol}://${e.authority}`,pathname:e.path,search:`?${e.query}`,hash:e.anchor?`#${e.anchor}`:""}}const o=/(?:\/|^)\.(?=\/)/g,f=/(?:\/|^)\.\.\/(?!\.\.\/)[^\/]*(?=\/)/g,l=/^(?=([^\/?#]*))\1([^]*)$/,u=/^(?=((?:[a-zA-Z0-9+\-.]+:)?))\1(?=((?:\/\/[^\/?#]*)?))\2(?=((?:(?:[^?#\/]*\/)*[^;?#\/]*)?))\3((?:;[^?#]*)?)(\?[^#]*)?(#[^]*)?$/;function p(t){return t.scheme+t.netLoc+t.path+t.params+t.query+t.fragment}function d(t){const i=u.exec(t);return i?{scheme:i[1]||"",netLoc:i[2]||"",path:i[3]||"",params:i[4]||"",query:i[5]||"",fragment:i[6]||""}:null}function w(t){for(t=t.split("").reverse().join("").replace(o,"");t.length!==(t=t.replace(f,"")).length;);return t.split("").reverse().join("")}function c(t,i,e){if(e=e||{},t=t.trim(),!(i=i.trim())){if(!e.alwaysNormalize)return t;let i=d(t);if(!i)throw new Error("Error trying to parse base URL.");return i.path=w(i.path),p(i)}let s=d(i);if(!s)throw new Error("Error trying to parse relative URL.");if(s.scheme)return e.alwaysNormalize?(s.path=w(s.path),p(s)):i;let r=d(t);if(!r)throw new Error("Error trying to parse base URL.");if(!r.netLoc&&r.path&&"/"!==r.path[0]){let t=l.exec(r.path);r.netLoc=t[1],r.path=t[2]}r.netLoc&&!r.path&&(r.path="/");const n={scheme:r.scheme,netLoc:s.netLoc,path:null,params:s.params,query:s.query,fragment:s.fragment};if(!s.netLoc&&(n.netLoc=r.netLoc,"/"!==s.path[0]))if(s.path){let t=r.path,i=t.substring(0,t.lastIndexOf("/")+1)+s.path;n.path=w(i)}else n.path=r.path,s.params||(n.params=r.params,s.query||(n.query=r.query));return null===n.path&&(n.path=e.alwaysNormalize?w(s.path):s.path),p(n)}},85079:(t,i,e)=>{var s=e(46438),r=s.JSON||(s.JSON={stringify:JSON.stringify});t.exports=function(t){return r.stringify.apply(r,arguments)}},73146:(t,i,e)=>{t.exports=e(85079)}}]);