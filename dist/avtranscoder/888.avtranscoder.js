"use strict";(self.webpackChunkAVTranscoder=self.webpackChunkAVTranscoder||[]).push([[888],{38743:(t,i,e)=>{e.d(i,{B:()=>a,h:()=>o});var s=e(134),n=e(77231),r=e(50011);class h{constructor(){(0,s.A)(this,"list",void 0),this.list=[]}read(t,i){for(let e=0;e<i;e++){const i=t.readUint32();this.list.push(t.readString(i))}}write(t){for(let i=0;i<this.list.length;i++){const e=r.encode(this.list[i]);t.writeUint32(e.length),t.writeBuffer(e)}}addComment(t){this.list.push(t)}}class a{constructor(){(0,s.A)(this,"capturePattern",void 0),(0,s.A)(this,"streamStructureVersion",void 0),(0,s.A)(this,"headerTypeFlag",void 0),(0,s.A)(this,"granulePosition",void 0),(0,s.A)(this,"serialNumber",void 0),(0,s.A)(this,"pageSequenceNumber",void 0),(0,s.A)(this,"crcCheckSum",void 0),(0,s.A)(this,"numberPageSegments",void 0),(0,s.A)(this,"segmentTable",void 0),(0,s.A)(this,"payload",void 0),(0,s.A)(this,"pos",void 0),this.reset()}reset(){this.capturePattern="OggS",this.streamStructureVersion=0,this.headerTypeFlag=0,this.granulePosition=n.Dh,this.serialNumber=0,this.pageSequenceNumber=0,this.crcCheckSum=0,this.numberPageSegments=0,this.segmentTable=[],this.pos=BigInt(0)}async read(t){this.pos=t.getPos(),await this.readPageHeader(t);const i=this.segmentTable.reduce(((t,i)=>t+i),0);i&&(this.payload=await t.readBuffer(i))}async readPageHeader(t){if(this.capturePattern=await t.readString(4),this.streamStructureVersion=await t.readUint8(),this.headerTypeFlag=await t.readUint8(),this.granulePosition=await t.readUint64(),this.serialNumber=await t.readUint32(),this.pageSequenceNumber=await t.readUint32(),this.crcCheckSum=await t.readUint32(),this.numberPageSegments=await t.readUint8(),this.numberPageSegments)for(let i=0;i<this.numberPageSegments;i++){const i=await t.readUint8();this.segmentTable.push(i)}}write(t){if(this.pos=t.getPos(),t.writeString(this.capturePattern),t.writeUint8(this.streamStructureVersion),t.writeUint8(this.headerTypeFlag),t.writeUint64(this.granulePosition),t.writeUint32(this.serialNumber),t.writeUint32(this.pageSequenceNumber),t.writeUint32(this.crcCheckSum),this.payload){this.numberPageSegments=Math.floor(this.payload.length/255)+1;const i=this.payload.length%255;t.writeUint8(this.numberPageSegments);for(let i=0;i<this.numberPageSegments-1;i++)t.writeUint8(255);t.writeUint8(i),t.writeBuffer(this.payload)}else t.writeUint8(0)}}class o{constructor(){(0,s.A)(this,"streamIndex",void 0),(0,s.A)(this,"signature",void 0),(0,s.A)(this,"vendorStringLength",void 0),(0,s.A)(this,"vendorString",void 0),(0,s.A)(this,"userCommentListLength",void 0),(0,s.A)(this,"comments",void 0),this.vendorString="v0.0.1-15-g9129aa4",this.vendorStringLength=this.vendorString.length,this.userCommentListLength=0,this.comments=new h}read(t){this.vendorStringLength=t.readUint32(),this.vendorString=t.readString(this.vendorStringLength),this.userCommentListLength=t.readUint32(),this.userCommentListLength&&this.comments.read(t,this.userCommentListLength)}write(t){const i=r.encode(this.vendorString);t.writeUint32(i.length),t.writeBuffer(i),t.writeUint32(this.comments.list.length),this.comments.write(t)}addComment(t){this.comments.addComment(t)}setCodec(t){}}},54712:(t,i,e)=>{e.d(i,{o:()=>a,q:()=>h});var s=e(134),n=e(38743);class r{constructor(){(0,s.A)(this,"streamCount",void 0),(0,s.A)(this,"coupledStreamCount",void 0),(0,s.A)(this,"mapping",void 0),this.streamCount=1,this.coupledStreamCount=0,this.mapping=new Uint8Array(1)}read(t){this.streamCount=t.readUint8(),this.coupledStreamCount=t.readUint8(),this.mapping=t.readBuffer(this.streamCount+this.coupledStreamCount)}write(t){t.writeUint8(this.streamCount),t.writeUint8(this.coupledStreamCount),t.writeBuffer(this.mapping)}}class h{constructor(){(0,s.A)(this,"streamIndex",void 0),(0,s.A)(this,"signature",void 0),(0,s.A)(this,"version",void 0),(0,s.A)(this,"channels",void 0),(0,s.A)(this,"preSkip",void 0),(0,s.A)(this,"sampleRate",void 0),(0,s.A)(this,"outputGain",void 0),(0,s.A)(this,"channelMappingFamily",void 0),(0,s.A)(this,"channelMappingTable",void 0),this.signature="OpusHead",this.version=1,this.channels=1,this.preSkip=0,this.sampleRate=48e3,this.outputGain=0,this.channelMappingFamily=0,this.channelMappingTable=new r}read(t){this.signature=t.readString(8),this.version=t.readUint8(),this.channels=t.readUint8(),this.preSkip=t.readUint16(),this.sampleRate=t.readUint32(),this.outputGain=t.readInt16(),this.channelMappingFamily=t.readUint8(),0!==this.channelMappingFamily&&this.channelMappingTable.read(t)}write(t){t.writeString(this.signature),t.writeUint8(this.version),t.writeUint8(this.channels),t.writeUint16(this.preSkip),t.writeUint32(this.sampleRate),t.writeInt16(this.outputGain),t.writeUint8(this.channelMappingFamily),0!==this.channelMappingFamily&&this.channelMappingTable.write(t)}setCodec(t){this.sampleRate=t.sampleRate,this.channels=t.chLayout.nbChannels,this.channelMappingFamily=t.format}}class a extends n.h{constructor(){super(),this.signature="OpusTags"}read(t){this.signature=t.readString(8),super.read(t)}write(t){t.writeString(this.signature),super.write(t)}addComment(t){this.comments.addComment(t)}setCodec(t){}}},87400:(t,i,e)=>{e.d(i,{G:()=>h,m:()=>r});var s=e(134),n=e(38743);class r{constructor(t="vorbis"){(0,s.A)(this,"streamIndex",void 0),(0,s.A)(this,"packetType",void 0),(0,s.A)(this,"signature",void 0),(0,s.A)(this,"version",void 0),(0,s.A)(this,"channels",void 0),(0,s.A)(this,"sampleRate",void 0),(0,s.A)(this,"bitrateMaximum",void 0),(0,s.A)(this,"bitrateNominal",void 0),(0,s.A)(this,"bitrateMinimum",void 0),(0,s.A)(this,"blocksize0",void 0),(0,s.A)(this,"blocksize1",void 0),(0,s.A)(this,"framingFlag",void 0),this.signature=t,this.version=0,this.channels=1,this.sampleRate=48e3,this.bitrateMaximum=0,this.bitrateNominal=0,this.bitrateMinimum=0,this.blocksize0=2048,this.blocksize1=256}read(t){this.packetType=t.readUint8(),this.signature=t.readString(6),this.version=t.readUint32(),this.channels=t.readUint8(),this.sampleRate=t.readInt32(),this.bitrateMaximum=t.readInt32(),this.bitrateNominal=t.readInt32(),this.bitrateMinimum=t.readInt32();const i=255&t.readUint8();this.blocksize0=Math.pow(2,i>>>4),this.blocksize1=Math.pow(2,15&i),this.framingFlag=t.readUint8()}write(t){t.writeUint8(1),t.writeString(this.signature),t.writeUint32(this.version),t.writeUint8(this.channels),t.writeInt32(this.sampleRate),t.writeInt32(this.bitrateMaximum),t.writeInt32(this.bitrateNominal),t.writeInt32(this.bitrateMinimum),t.writeUint8(Math.log2(this.blocksize0)<<4|Math.log2(this.blocksize1)),t.writeUint8(1)}setCodec(t){this.sampleRate=t.sampleRate,this.channels=t.chLayout.nbChannels}}class h extends n.h{constructor(t="vorbis"){super(),(0,s.A)(this,"packetType",void 0),(0,s.A)(this,"framingFlag",void 0),this.signature=t,this.packetType=1,this.framingFlag=1}read(t){this.packetType=t.readUint8(),this.signature=t.readString(6),super.read(t),"vorbis"===this.signature&&(this.framingFlag=t.readUint8())}write(t){t.writeUint8(this.packetType),t.writeString(this.signature),super.write(t),"vorbis"===this.signature&&t.writeUint8(this.framingFlag)}addComment(t){this.comments.addComment(t)}setCodec(t){}}},82348:(t,i,e)=>{e.d(i,{A:()=>a});var s=e(134),n=e(4624),r=e(50011),h="src/common/io/IOReaderSync.ts";class a{constructor(t=1048576,i=!0,e){if((0,s.A)(this,"data",void 0),(0,s.A)(this,"buffer",void 0),(0,s.A)(this,"pointer",void 0),(0,s.A)(this,"endPointer",void 0),(0,s.A)(this,"pos",void 0),(0,s.A)(this,"size",void 0),(0,s.A)(this,"littleEndian",void 0),(0,s.A)(this,"fileSize_",void 0),(0,s.A)(this,"error",void 0),(0,s.A)(this,"onFlush",void 0),(0,s.A)(this,"onSeek",void 0),(0,s.A)(this,"onSize",void 0),(0,s.A)(this,"flags",void 0),this.pos=BigInt(0),this.pointer=0,this.error=0,this.endPointer=0,this.littleEndian=!i,this.flags=0,e&&e.view)this.size=e.length,this.buffer=e,this.data=e.view;else if(e&&!e.byteOffset)this.size=e.length,this.buffer=e,this.data=new DataView(this.buffer.buffer);else{if(e)throw new Error("not support subarray of ArrayBuffer");this.size=Math.max(t,102400),this.buffer=new Uint8Array(this.size),this.data=new DataView(this.buffer.buffer)}}readUint8(){this.remainingLength()<1&&this.flush(1);const t=this.data.getUint8(this.pointer);return this.pointer++,this.pos++,t}peekUint8(){return this.remainingLength()<1&&this.flush(1),this.data.getUint8(this.pointer)}readUint16(){this.remainingLength()<2&&this.flush(2);const t=this.data.getUint16(this.pointer,this.littleEndian);return this.pointer+=2,this.pos+=BigInt(2),t}peekUint16(){return this.remainingLength()<2&&this.flush(2),this.data.getUint16(this.pointer,this.littleEndian)}readUint24(){this.remainingLength()<3&&this.flush(3);const t=this.readUint16(),i=this.readUint8();return this.littleEndian?i<<16|t:t<<8|i}peekUint24(){this.remainingLength()<3&&this.flush(3);const t=this.pointer,i=this.pos,e=this.readUint16(),s=this.readUint8(),n=this.littleEndian?s<<16|e:e<<8|s;return this.pointer=t,this.pos=i,n}readUint32(){this.remainingLength()<4&&this.flush(4);const t=this.data.getUint32(this.pointer,this.littleEndian);return this.pointer+=4,this.pos+=BigInt(4),t}peekUint32(){return this.remainingLength()<4&&this.flush(4),this.data.getUint32(this.pointer,this.littleEndian)}readUint64(){this.remainingLength()<8&&this.flush(8);const t=this.data.getBigUint64(this.pointer,this.littleEndian);return this.pointer+=8,this.pos+=BigInt(8),t}peekUint64(){return this.remainingLength()<8&&this.flush(8),this.data.getBigUint64(this.pointer,this.littleEndian)}readInt8(){this.remainingLength()<1&&this.flush(1);const t=this.data.getInt8(this.pointer);return this.pointer++,this.pos++,t}peekInt8(){return this.remainingLength()<1&&this.flush(1),this.data.getInt8(this.pointer)}readInt16(){this.remainingLength()<2&&this.flush(2);const t=this.data.getInt16(this.pointer,this.littleEndian);return this.pointer+=2,this.pos+=BigInt(2),t}peekInt16(){return this.remainingLength()<2&&this.flush(2),this.data.getInt16(this.pointer,this.littleEndian)}readInt24(){const t=this.readUint24();return 8388608&t?t-16777216:t}peekInt24(){const t=this.peekUint24();return 8388608&t?t-16777216:t}readInt32(){this.remainingLength()<4&&this.flush(4);const t=this.data.getInt32(this.pointer,this.littleEndian);return this.pointer+=4,this.pos+=BigInt(4),t}peekInt32(){return this.remainingLength()<4&&this.flush(4),this.data.getInt32(this.pointer,this.littleEndian)}readInt64(){this.remainingLength()<8&&this.flush(8);const t=this.data.getBigInt64(this.pointer,this.littleEndian);return this.pointer+=8,this.pos+=BigInt(8),t}peekInt64(){return this.remainingLength()<8&&this.flush(8),this.data.getBigInt64(this.pointer,this.littleEndian)}readFloat(){this.remainingLength()<4&&this.flush(4);const t=this.data.getFloat32(this.pointer,this.littleEndian);return this.pointer+=4,this.pos+=BigInt(4),t}peekFloat(){return this.remainingLength()<4&&this.flush(4),this.data.getFloat32(this.pointer,this.littleEndian)}readDouble(){this.remainingLength()<8&&this.flush(8);const t=this.data.getFloat64(this.pointer,this.littleEndian);return this.pointer+=8,this.pos+=BigInt(8),t}peekDouble(){return this.remainingLength()<8&&this.flush(8),this.data.getFloat64(this.pointer,this.littleEndian)}readHex(t=1){let i="";for(let e=0;e<t;e++){const t=this.readUint8().toString(16);i+=1===t.length?"0"+t:t}return i}peekHex(t=1){t>this.size&&(this.error=-1048574,n.h2("peekHex, length too large",h,412)),this.remainingLength()<t&&this.flush(t);const i=this.pointer,e=this.pos;let s="";for(let i=0;i<t;i++){const t=this.readUint8().toString(16);s+=1===t.length?"0"+t:t}return this.pointer=i,this.pos=e,s}readBuffer(t,i){if(!t)return new Uint8Array(0);if(i||(i=new Uint8Array(t)),this.remainingLength()<t){let e=0;if(this.remainingLength()>0){const s=this.remainingLength();i.set(this.buffer.subarray(this.pointer,this.pointer+s),e),e+=s,this.pointer+=s,this.pos+=BigInt(s),t-=s}for(;t>0;){this.flush();const s=Math.min(this.endPointer-this.pointer,t);i.set(this.buffer.subarray(this.pointer,this.pointer+s),e),e+=s,this.pointer+=s,this.pos+=BigInt(s),t-=s}}else i.set(this.buffer.subarray(this.pointer,this.pointer+t),0),this.pointer+=t,this.pos+=BigInt(t);return i}peekBuffer(t,i){return t?(t>this.size&&(this.error=-1048574,n.h2("peekBuffer, length too large",h,505)),this.remainingLength()<t&&this.flush(t),i||(i=new Uint8Array(t)),i.set(this.buffer.subarray(this.pointer,this.pointer+t),0),i):new Uint8Array(0)}readToBuffer(t,i){if(this.remainingLength()<t){let e=0;if(this.remainingLength()>0){const s=this.remainingLength();i.set(this.buffer.subarray(this.pointer,this.pointer+s),e),e+=s,this.pointer+=s,this.pos+=BigInt(s),t-=s}for(;t>0;){try{this.flush()}catch(t){if(-1048576===this.error&&e)return e;throw t}const s=Math.min(this.endPointer-this.pointer,t);i.set(this.buffer.subarray(this.pointer,this.pointer+s),e),e+=s,this.pointer+=s,this.pos+=BigInt(s),t-=s}return e}return i.set(this.buffer.subarray(this.pointer,this.pointer+t),0),this.pointer+=t,this.pos+=BigInt(t),t}readString(t=1){const i=this.readBuffer(t);return r.decode(i)}peekString(t=1){const i=this.peekBuffer(t);return r.decode(i)}readLine(){let t="";for(;;){let i=!1;for(let e=this.pointer;e<this.endPointer;e++)if(10===this.buffer[e]||13===this.buffer[e]){e!==this.pointer&&(t+=this.readString(e-this.pointer)),i=!0;break}if(i)break;t+=this.readString(this.remainingLength()),this.flush()}let i=this.peekUint8();return 10!==i&&13!==i||(this.pointer++,13===i&&(i=this.peekUint8(),10===i&&this.pointer++)),t}peekLine(){this.remainingLength()<this.size&&this.flush();let t="",i=!1;for(let e=this.pointer;e<this.endPointer;e++)if(10===this.buffer[e]||13===this.buffer[e]){t+=this.peekString(e-this.pointer),i=!0;break}return i||(this.error=-1048574,n.h2("peekLine, out of buffer",h,656)),t}getPointer(){return this.pointer}getPos(){return this.pos}skip(t){const i=t;for(;this.remainingLength()<t;)t-=this.remainingLength(),this.pointer=this.endPointer,this.flush();this.remainingLength()>=t&&(this.pointer+=t),this.pos+=BigInt(i)}remainingLength(){return this.endPointer-this.pointer}flush(t=0){if(this.onFlush||(this.error=-1048574,n.h2("IOReader error, flush failed because of no flush callback",h,720)),!(this.size-this.remainingLength()<=0)){if(t=Math.min(t,this.size),this.pointer<this.endPointer?(this.buffer.set(this.buffer.subarray(this.pointer,this.endPointer),0),this.endPointer=this.endPointer-this.pointer):this.endPointer=0,this.pointer=0,t)for(;this.remainingLength()<t;){const t=this.onFlush(this.buffer.subarray(this.endPointer));if(t<0)throw this.error=t,new Error(`IOReader error, flush ${-1048576===t?"ended":"failed"}, ret: ${t}`);this.endPointer+=t}else{const t=this.onFlush(this.buffer.subarray(this.endPointer));if(t<0)throw this.error=t,new Error(`IOReader error, flush ${-1048576===t?"ended":"failed"}, ret: ${t}`);this.endPointer+=t}this.error=0}}seek(t,i=!1,e=!0){if(!i){const i=Number(t-this.pos);if(i<0&&Math.abs(i)<this.pointer)return this.pointer+=i,void(this.pos=t);if(i>0&&this.pointer+i<this.endPointer)return this.pointer+=i,void(this.pos=t);if(0===i)return}this.onSeek||(this.error=-1048574,n.h2("IOReader error, seek failed because of no seek callback",h,790)),this.pointer=this.endPointer=0,this.pos=t;const s=this.onSeek(t);0!==s&&(this.error=s,n.h2("IOReader error, seek failed",h,799)),e&&this.flush()}getBuffer(){return this.buffer}appendBuffer(t){if(this.size-this.endPointer>=t.length)this.buffer.set(t,this.endPointer),this.endPointer+=t.length;else if(this.buffer.set(this.buffer.subarray(this.pointer,this.endPointer),0),this.endPointer=this.endPointer-this.pointer,this.pointer=0,this.size-this.endPointer>=t.length)this.buffer.set(t,this.endPointer),this.endPointer+=t.length;else{const i=Math.min(this.size-this.endPointer,t.length);this.buffer.set(t.subarray(0,i),this.endPointer),this.endPointer+=i,n.R8("IOReader, call appendBuffer but the buffer's size is lagger then the remaining size",h,838)}}reset(){this.pointer=this.endPointer=0,this.pos=BigInt(0),this.error=0}setEndian(t){this.littleEndian=!t}fileSize(){if(this.fileSize_)return this.fileSize_;if(!this.onSize)return n.R8("IOReader error, fileSize failed because of no onSize callback",h,871),BigInt(0);try{this.fileSize_=this.onSize()}catch(t){n.R8(`IOReader error, call fileSize failed: ${t}`,h,878),this.fileSize_=BigInt(0)}return this.fileSize_}getBufferSize(){return this.size}pipe(t,i){if(i)if(this.remainingLength()<i){if(this.remainingLength()>0){const e=this.remainingLength();t.writeBuffer(this.buffer.subarray(this.pointer,this.pointer+e)),this.pointer+=e,this.pos+=BigInt(e),i-=e}for(;i>0;){this.flush();const e=Math.min(this.endPointer-this.pointer,i);t.writeBuffer(this.buffer.subarray(this.pointer,this.pointer+e)),this.pointer+=e,this.pos+=BigInt(e),i-=e}}else t.writeBuffer(this.buffer.subarray(this.pointer,this.pointer+i)),this.pointer+=i,this.pos+=BigInt(i);else{if(this.remainingLength()>0){const i=this.remainingLength();t.writeBuffer(this.buffer.subarray(this.pointer,this.pointer+i)),this.pointer+=i,this.pos+=BigInt(i)}for(;this.onFlush(this.buffer.subarray(0))>0;){const i=this.remainingLength();t.writeBuffer(this.buffer.subarray(this.pointer,this.pointer+i)),this.pointer+=i,this.pos+=BigInt(i)}}}}}}]);