"use strict";(self.webpackChunkAVTranscoder=self.webpackChunkAVTranscoder||[]).push([[94],{58469:(e,a,t)=>{t.d(a,{En:()=>o,Hm:()=>s,Ij:()=>f,XC:()=>d,_5:()=>c,hY:()=>n,uF:()=>i});var r=t(77231);const i={1:"Main",2:"LC",3:"LC",4:"LC",5:"HE",6:"HE"},s={96e3:0,88200:1,64e3:2,48e3:3,44100:4,32e3:5,24e3:6,22050:7,16e3:8,12e3:9,11025:10,8e3:11,7350:12},n=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350,r.N_,r.N_,r.N_],o=[r.N_,1,2,3,4,5,6,7];function c(e){let a=r.N_,t=r.N_,i=r.N_;var s,c;return e.length>=2&&(a=e[0]>>3&31,t=null!==(s=n[(7&e[0])<<1|e[1]>>7])&&void 0!==s?s:48e3,i=null!==(c=o[e[1]>>3&15])&&void 0!==c?c:2),{profile:a,sampleRate:t,channels:i}}function d(e,a){if(!a&&e.sideData[1]&&(a=e.sideData[1]),a){const{profile:t,sampleRate:r,channels:i}=c(a);e.codecpar.profile=t,e.codecpar.sampleRate=r,e.codecpar.chLayout.nbChannels=i}}function f(e){const a=s[e.sampleRate],t=e.chLayout.nbChannels,r=new Uint8Array(2);return r[0]=(31&e.profile)<<3|(14&a)>>1,r[1]=(1&a)<<7|(15&t)<<3,r}},47094:(e,a,t)=>{t.r(a),t.d(a,{default:()=>k});var r=t(134),i=t(63939),s=t(50932),n=t(4624),o=t(9705),c=t(85947),d=t(14686),f=t(37837),p=t(71517),l=t(44328),u=t(77231),h=t(72739),m=t(58469),R="src/avformat/formats/IAacFormat.ts";class k extends c.A{constructor(){super(),(0,r.A)(this,"type",9),(0,r.A)(this,"frameType",void 0),(0,r.A)(this,"fileSize",void 0),(0,r.A)(this,"currentPts",void 0)}init(e){this.currentPts=BigInt(0)}async estimateTotalBlock(e){let a=0;const t=e.ioReader.getPos();for(;;)try{const t=await e.ioReader.peekBuffer(7),r=(3&t[3])<<11|t[4]<<3|(224&t[5])>>>5;a+=1+(3&t[6]),await e.ioReader.skip(r)}catch(e){break}return await e.ioReader.seek(t),a}async readHeader(e){const a=await e.ioReader.peekBuffer(4);if(this.fileSize=await e.ioReader.fileSize(),65===a[0]&&68===a[1]&&73===a[2]&&70===a[3]){const a=e.createStream();a.codecpar.codecId=86018,a.codecpar.codecType=1,this.frameType=0}else{if(255!==a[0]||240&~a[1])return o.LR;{this.frameType=1;const a=e.createStream();a.codecpar.codecId=86018,a.codecpar.codecType=1;const t=await e.ioReader.peekBuffer(7),r=(192&t[2])>>>6,i=(60&t[2])>>>2,s=(1&t[2])<<2|(192&t[3])>>>6;a.codecpar.profile=r+1,a.codecpar.sampleRate=m.hY[i],a.codecpar.chLayout.nbChannels=m.En[s];const n=(0,m.Ij)(a.codecpar);a.codecpar.extradata=(0,f.sY)(n.length),(0,d.lW)(a.codecpar.extradata,n.length,n),a.codecpar.extradataSize=n.length,a.timeBase.den=a.codecpar.sampleRate,a.timeBase.num=1,a.duration=(0,l.k)(BigInt(Math.floor(1024*await this.estimateTotalBlock(e)/a.codecpar.sampleRate*u.SF)),u.KR,a.timeBase)}}return 0}async readAVPacket(e,a){const t=e.streams.find((e=>e.codecpar.codecType=1));try{const r=e.ioReader.getPos();let n;if(0===this.frameType)n=await e.ioReader.readBuffer(Math.min(1024,0|Number(this.fileSize-r&0xffffffffn)));else if(1===this.frameType){const r=await e.ioReader.readBuffer(7),i=1&r[1],o=(3&r[3])<<11|r[4]<<3|(224&r[5])>>>5,c=3&r[6];let d=1===i?7:9,f=o-d;9===d&&await e.ioReader.skip(2);const p=(0,l.k)(BigInt(Math.floor(1024*(c+1)/t.codecpar.sampleRate*u.SF)),u.KR,t.timeBase);s.M[17](a+48,p),n=await e.ioReader.readBuffer(f)}const o=(0,f.sY)(n.length);return(0,d.lW)(o,n.length,n),(0,p.NX)(a,o,n.length),s.M[17](a+16,this.currentPts),s.M[17](a+8,this.currentPts),s.M[17](a+56,r),s.M[15](a+32,t.index),s.M[15](a+76,t.timeBase.den),s.M[15](a+72,t.timeBase.num),this.currentPts+=i.f[17](a+48),0}catch(a){return-1048576!==e.ioReader.error&&n.z3(a.message,R,193),e.ioReader.error}}async syncFrame(e){let a=u.Dh;for(;;)try{if(4095==await e.ioReader.peekUint16()>>>4){a=e.ioReader.getPos();const t=await e.ioReader.peekBuffer(7),r=(3&t[3])<<11|t[4]<<3|(224&t[5])>>>5;if(r>512e3){await e.ioReader.skip(1);continue}await e.ioReader.skip(r);let i=0;for(;3!==i&&4095==await e.ioReader.peekUint16()>>>4;){i++;const a=await e.ioReader.peekBuffer(7),t=(3&a[3])<<11|a[4]<<3|(224&a[5])>>>5;if(t>512e3)break;await e.ioReader.skip(t)}if(3===i)break}await e.ioReader.skip(1)}catch(e){break}a!==u.Dh&&await e.ioReader.seek(a)}async seek(e,a,t,r){if(1===this.frameType){const i=e.ioReader.getPos();if(2&r){const s=await e.ioReader.fileSize();return s<=BigInt(0)?BigInt(o.E$):(t<BigInt(0)?t=BigInt(0):t>s&&(t=s),await e.ioReader.seek(t),4&r||(await this.syncFrame(e),a.duration&&this.fileSize&&(this.currentPts=t/this.fileSize*a.duration)),i)}if(a&&a.sampleIndexes.length){let r=h.El(a.sampleIndexes,(e=>e.pts>t?-1:1));if(r>0&&(0,l.k)(t-a.sampleIndexes[r-1].pts,a.timeBase,u.i0)<BigInt(5e3))return n.Yz(`seek in sampleIndexes, found index: ${r}, pts: ${a.sampleIndexes[r-1].pts}, pos: ${a.sampleIndexes[r-1].pos}`,R,296),await e.ioReader.seek(a.sampleIndexes[r-1].pos),this.currentPts=t,i}if(n.Yz("not found any keyframe index, try to seek in bytes",R,303),!a.duration)return BigInt(o.E$);{await e.ioReader.seek(BigInt(0));let r=BigInt(0);for(;;)try{if(r>=t)return this.currentPts=r,i;const s=await e.ioReader.peekBuffer(7),n=(3&s[3])<<11|s[4]<<3|(224&s[5])>>>5,o=3&s[6];r+=(0,l.k)(BigInt(Math.floor(1024*(o+1)/a.codecpar.sampleRate*u.SF)),u.KR,a.timeBase),await e.ioReader.skip(n)}catch(e){return BigInt(o.E$)}}}return BigInt(o.E$)}getAnalyzeStreamsCount(){return 1}}},85947:(e,a,t)=>{t.d(a,{A:()=>i});var r=t(134);class i{constructor(){(0,r.A)(this,"type",-1),(0,r.A)(this,"onStreamAdd",void 0)}destroy(e){}}}}]);