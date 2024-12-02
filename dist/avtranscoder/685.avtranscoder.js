"use strict";(self.webpackChunkAVTranscoder=self.webpackChunkAVTranscoder||[]).push([[685],{50848:(e,t,a)=>{a.d(t,{A:()=>I});var r=a(134),s=a(63939),i=a(50932),n=a(77162),o=a(29170),d=a(64436),c=a(14686),l=a(4624),h=a(9705),f=a(77231),u=a(95832),p=a(44328),m=a(37837),g=a(71517),A=a(67672);class I extends d.A{constructor(...e){super(...e),(0,r.A)(this,"streamMuxConfig",void 0),(0,r.A)(this,"caches",void 0)}init(e,t){return super.init(e,t),this.caches=[],this.streamMuxConfig={profile:f.N_,sampleRate:f.N_,channels:f.N_},0}sendAVPacket(e){let t=0,a=s.f[17](e+16)||s.f[17](e+8);const r=(0,c.s3)(s.f[20](e+24),s.f[15](e+28)).slice();for(;t<r.length;){const e=u.Bq(r.subarray(t));if(A.ai(e))return l.z3("AACADTSParser parse failed","src/avformat/bsf/aac/ADTS2RawFilter.ts",81),h.LR;const d={dts:a,buffer:null,extradata:null,duration:f.N_};d.buffer=r.subarray(t+e.headerLength,t+e.headerLength+e.framePayloadLength),this.streamMuxConfig.profile=e.profile,this.streamMuxConfig.sampleRate=e.sampleRate,this.streamMuxConfig.channels=e.channels;const g=s.f[15](this.inCodecpar+48)!==this.streamMuxConfig.profile||s.f[15](this.inCodecpar+136)!==this.streamMuxConfig.sampleRate||s.f[15](this.inCodecpar+116)!==this.streamMuxConfig.channels,I=(0,p.k)(BigInt(Math.floor(1024*(e.numberOfRawDataBlocksInFrame+1)/this.streamMuxConfig.sampleRate*f.SF)),f.KR,this.inTimeBase);if(d.duration=Number(I),g){i.M[15](this.inCodecpar+48,this.streamMuxConfig.profile),i.M[15](this.inCodecpar+136,this.streamMuxConfig.sampleRate),i.M[15](this.inCodecpar+116,this.streamMuxConfig.channels);const e=(0,u.Ij)((0,o.A)(this.inCodecpar,n.A));s.f[20](this.inCodecpar+12)&&(0,m.Eb)(s.f[20](this.inCodecpar+12)),i.M[20](this.inCodecpar+12,(0,m.sY)(e.length)),(0,c.lW)(s.f[20](this.inCodecpar+12),e.length,e),i.M[15](this.inCodecpar+16,e.length),d.extradata=e}this.caches.push(d),t+=e.aacFrameLength,a+=I}return 0}receiveAVPacket(e){if(this.caches.length){(0,g.Up)(e);const t=this.caches.shift(),a=(0,m.sY)(t.buffer.length);if((0,c.lW)(a,t.buffer.length,t.buffer),(0,g.NX)(e,a,t.buffer.length),i.M[17](e+16,t.dts),i.M[17](e+8,t.dts),i.M[17](e+48,BigInt(Math.floor(t.duration))),i.M[15](e+36,1|s.f[15](e+36)),t.extradata){const a=(0,m.sY)(t.extradata.length);(0,c.lW)(a,t.extradata.length,t.extradata),(0,g.Ow)(e,1,a,t.extradata.length)}return 0}return h.LT}reset(){return 0}}},85947:(e,t,a)=>{a.d(t,{A:()=>s});var r=a(134);class s{constructor(){(0,r.A)(this,"type",-1),(0,r.A)(this,"onStreamAdd",void 0)}async destroy(e){}}},51660:(e,t,a)=>{a.d(t,{A:()=>o});var r=a(77231),s=a(4624),i=a(9705);const n="src/avformat/formats/mpegts/function/parsePES.ts";function o(e){const t=e.data,a=t[3],o=t[4]<<8|t[5];let d=0,c=0,l=0;if(188!==a&&190!==a&&191!==a&&240!==a&&241!==a&&255!==a&&242!==a&&248!==a){let a=r.Dh,h=r.Dh;for(;;){if(6+c>=t.length)return;if(l=t[6+c],255!==l)break;c++}if(64==(192&l)&&(c+=2,l=t[6+c]),32==(224&l))d+=5,a=a=BigInt(Math.floor(536870912*(14&t[6+c])+4194304*(255&t[7+c])+16384*(254&t[8+c])+128*(255&t[9+c])+(254&t[10+c])/2)),16&l?(h=BigInt(Math.floor(536870912*(14&t[11+c])+4194304*(255&t[12+c])+16384*(254&t[13+c])+128*(255&t[14+c])+(254&t[15+c])/2)),d+=5):h=a;else if(128==(192&l)){const e=(192&t[7+c])>>>6;d=3+t[8+c],2!==e&&3!==e||(a=BigInt(Math.floor(536870912*(14&t[9+c])+4194304*(255&t[10+c])+16384*(254&t[11+c])+128*(255&t[12+c])+(254&t[13+c])/2)),h=3===e?BigInt(Math.floor(536870912*(14&t[14+c])+4194304*(255&t[15+c])+16384*(254&t[16+c])+128*(255&t[17+c])+(254&t[18+c])/2)):a)}else{if(15!==l)return s.z3("invalid data",n,121),i.LR;d=1}e.dts=h,e.pts=a;const f=6+c+d;let u=0;if(0!==o){if(o<c+d)return void s.z3("Malformed PES: PES_packet_length < 3 + PES_header_data_length",n,133);u=o-(c+d)}else u=t.byteLength-f;e.payload=t.subarray(f,f+u)}else if((188===a||191===a||240===a||241===a||255===a||242===a||248===a)&&6===e.streamId){const a=6;let r=0;r=0!==o?o:t.byteLength-a,e.payload=t.subarray(a,a+r)}return 0}},6403:(e,t,a)=>{a.d(t,{Cd:()=>l,I4:()=>u,am:()=>d,kJ:()=>f,pi:()=>c,xf:()=>p,yU:()=>h});var r=a(134),s=a(80662),i=a.n(s),n=a(77231);class o{constructor(){(0,r.A)(this,"discontinuityIndicator",0),(0,r.A)(this,"randomAccessIndicator",0),(0,r.A)(this,"elementaryStreamPriorityIndicator",0),(0,r.A)(this,"pcrFlag",0),(0,r.A)(this,"opcrFlag",0),(0,r.A)(this,"splicingPointFlag",0),(0,r.A)(this,"transportPrivateDataFlag",0),(0,r.A)(this,"adaptationFieldExtensionFlag",0),(0,r.A)(this,"pcr",BigInt(0)),(0,r.A)(this,"opcr",BigInt(0)),(0,r.A)(this,"spliceCountDown",0),(0,r.A)(this,"transportPrivateData",null),(0,r.A)(this,"extension",null)}}class d{constructor(){(0,r.A)(this,"pos",n.Dh),(0,r.A)(this,"payloadUnitStartIndicator",0),(0,r.A)(this,"transportPriority",0),(0,r.A)(this,"pid",n.N_),(0,r.A)(this,"adaptationFieldControl",0),(0,r.A)(this,"continuityCounter",0),(0,r.A)(this,"transportScramblingControl",0),(0,r.A)(this,"adaptationFieldInfo",new o),(0,r.A)(this,"payload",null)}}class c{constructor(){(0,r.A)(this,"slices",[]),(0,r.A)(this,"totalLength",0),(0,r.A)(this,"expectedLength",n.N_),(0,r.A)(this,"randomAccessIndicator",0),(0,r.A)(this,"pid",n.N_),(0,r.A)(this,"streamType",0),(0,r.A)(this,"pos",n.Dh)}}class l{constructor(){(0,r.A)(this,"versionNumber",0),(0,r.A)(this,"networkPid",n.N_),(0,r.A)(this,"program2PmtPid",new(i()))}}class h extends d{}class f{constructor(){(0,r.A)(this,"tag",void 0),(0,r.A)(this,"buffer",void 0)}}class u{constructor(){(0,r.A)(this,"versionNumber",0),(0,r.A)(this,"programNumber",0),(0,r.A)(this,"pcrPid",0),(0,r.A)(this,"pid2StreamType",new(i())),(0,r.A)(this,"pid2ESDescriptor",new(i()))}}class p{constructor(){(0,r.A)(this,"pid",n.N_),(0,r.A)(this,"streamType",0),(0,r.A)(this,"streamId",n.N_),(0,r.A)(this,"dts",n.Dh),(0,r.A)(this,"pts",n.Dh),(0,r.A)(this,"pos",n.Dh),(0,r.A)(this,"payload",null),(0,r.A)(this,"data",null),(0,r.A)(this,"randomAccessIndicator",0)}}},2187:(e,t,a)=>{a.d(t,{d:()=>n});var r=a(72739),s=a(44328),i=a(77231);function n(e,t,a){let n=BigInt(0);return r.__(e,(e=>{n+=e.codecpar.bitrate*(0,s.k)(t,a,i.i0)/BigInt(8e3)})),n}},52071:(e,t,a)=>{a.d(t,{A:()=>u});var r=a(63939),s=a(9599),i=a(29170),n=a(77231),o=a(44328),d=a(2187),c=a(71517),l=a(9705),h=a(4624);const f="src/avformat/function/seekInBytes.ts";async function u(e,t,a,u,p,m){const g=e.ioReader.getPos(),A=await e.ioReader.fileSize();let I=n.Dh,b=a;t.startTime!==n.Dh?b-=t.startTime:b-=t.firstDTS;const M=(0,o.k)(a,t.timeBase,n.i0);if(M<BigInt(1e4))return h.Yz(`seek pts is earlier then 10s, seek to first packet pos(${u}) directly`,f,64),await e.ioReader.seek(u),g;let y=(0,d.d)(e.streams,b,t.timeBase);const C=A-(0,d.d)(e.streams,BigInt(1e4),n.i0),B=(0,d.d)(e.streams,BigInt(1e4),n.i0);if(y>C&&(y=C),y<u)return await e.ioReader.seek(u),g;const x=(0,c._5)();let k=A,R=BigInt(0);for(;;){if(k-R<B){I=R;break}if(await e.ioReader.seek(y),await m(e),8&e.ioReader.flags)break;const t=e.ioReader.getPos();if(!(await p(e,x)>=0)){I=n.Dh;break}{const e=(0,o.k)(r.f[17](x+8),(0,i.A)(x+72,s.P),n.i0),a=e-M;if(h.Yz(`try to seek to pos: ${y}, got packet pts: ${r.f[17](x+8)}(${e}ms), diff: ${a}ms`,f,102),a<=BigInt(0)&&-a<BigInt(1e4)){I=t;break}a>BigInt(0)?(k=y,y=R+k>>BigInt(1)):(R=y,y=R+k>>BigInt(1))}if(8&e.ioReader.flags)break}return(0,c.Qe)(x),I!==n.Dh?(h.Yz(`finally seek to pos ${I}`,f,133),await e.ioReader.seek(I),await m(e),g):(await e.ioReader.seek(g),8&e.ioReader.flags?BigInt(l.LT):BigInt(l.E$))}},87518:(e,t,a)=>{a.d(t,{R:()=>u,j:()=>s});var r=a(37246);const s=[3,4,3,7,259,263,1539,1543],i=[[64,69,96],[64,70,96],[80,87,120],[80,88,120],[96,104,144],[96,105,144],[112,121,168],[112,122,168],[128,139,192],[128,140,192],[160,174,240],[160,175,240],[192,208,288],[192,209,288],[224,243,336],[224,244,336],[256,278,384],[256,279,384],[320,348,480],[320,349,480],[384,417,576],[384,418,576],[448,487,672],[448,488,672],[512,557,768],[512,558,768],[640,696,960],[640,697,960],[768,835,1152],[768,836,1152],[896,975,1344],[896,976,1344],[1024,1114,1536],[1024,1115,1536],[1152,1253,1728],[1152,1254,1728],[1280,1393,1920],[1280,1394,1920]],n=[4,5,6,5],o=[4,6,7,6],d=[48e3,44100,32e3,0],c=[32,40,48,56,64,80,96,112,128,160,192,224,256,320,384,448,512,576,640],l=[2,1,2,3,3,4,4,5],h=[1,2,3,6],f=7;function u(e){const t=new r.A(e.length);t.appendBuffer(e);const a={syncWord:0,crc1:0,srCode:0,bitstreamId:0,bitstreamMode:0,channelMode:0,lfeOn:0,frameType:0,substreamId:0,centerMixLevel:0,surroundMixLevel:0,channelMap:0,numBlocks:0,dolbySurroundMode:0,srShift:0,sampleRate:0,bitrate:0,channels:0,frameSize:0,channelLayout:BigInt(0),ac3BitrateCode:0};if(a.syncWord=t.readU(16),2935!==a.syncWord)return-1;if(a.bitstreamId=31&t.peekU(29),a.bitstreamId>16)return-2;if(a.numBlocks=6,a.ac3BitrateCode=-1,a.centerMixLevel=5,a.surroundMixLevel=6,a.dolbySurroundMode=0,a.bitstreamId<=10){if(a.crc1=t.readU(16),a.srCode=t.readU(2),3===a.srCode)return-3;const e=t.readU(6);if(e>37)return-4;a.ac3BitrateCode=e>>1,t.readU(5),a.bitstreamMode=t.readU(3),a.channelMode=t.readU(3),2==a.channelMode?a.dolbySurroundMode=t.readU(2):(1&a.channelMode&&1!=a.channelMode&&(a.centerMixLevel=n[t.readU(2)]),4&a.channelMode&&(a.surroundMixLevel=o[t.readU(2)])),a.lfeOn=t.readU(1),a.srShift=Math.max(a.bitstreamId,8)-8,a.sampleRate=d[a.srCode]>>a.srShift,a.bitrate=1e3*c[a.ac3BitrateCode]>>a.srShift,a.channels=l[a.channelMode]+a.lfeOn,a.frameSize=2*i[e][a.srCode],a.frameType=2,a.substreamId=0}else{if(a.crc1=0,a.frameType=t.readU(2),3==a.frameType)return-5;if(a.substreamId=t.readU(3),a.frameSize=t.readU(11)+1<<1,a.frameSize<f)return-6;if(a.srCode=t.readU(2),3==a.srCode){const e=t.readU(2);if(3==e)return-7;a.sampleRate=d[e]/2,a.srShift=1}else a.numBlocks=h[t.readU(2)],a.sampleRate=d[a.srCode],a.srShift=0;a.channelMode=t.readU(3),a.lfeOn=t.readU(1),a.bitrate=8*a.frameSize*a.sampleRate/(256*a.numBlocks),a.channels=l[a.channelMode]+a.lfeOn}return a.channelLayout=BigInt(s[a.channelMode]),a.lfeOn&&(a.channelLayout|=BigInt(8)),a}},43290:(e,t,a)=>{a.d(t,{R:()=>c,u:()=>d});var r=a(37246),s=a(95073);const i=[1,2,2,2,2,3,3,4,4,5,6,6,6,7,8,8],n=[0,8e3,16e3,32e3,0,0,11025,22050,44100,0,0,12e3,24e3,48e3,96e3,192e3],o=[32e3,56e3,64e3,96e3,112e3,128e3,192e3,224e3,256e3,32e4,384e3,448e3,512e3,576e3,64e4,768e3,96e4,1024e3,1152e3,128e4,1344e3,1408e3,1411200,1472e3,1536e3,192e4,2048e3,3072e3,384e4,0,0,0],d=32;function c(e){const t=new r.A(e.length);t.appendBuffer(e);const a={syncWord:0,frameType:0,deficitSamples:0,crcFlag:0,sampleBlock:0,frameSize:0,channelIndex:0,sampleRateIndex:0,bitrateIndex:0,channels:0,sampleRate:0,bitrate:0};return a.syncWord=t.readU(32),2147385345!==a.syncWord&&4269736320!==a.syncWord?-1:(a.frameType=t.readU1(),a.deficitSamples=t.readU(5)+1,a.crcFlag=t.readU1(),a.sampleBlock=t.readU(7)+1,a.frameSize=(0,s.A)(t.readU(14)+1,4),a.channelIndex=t.readU(6),a.sampleRateIndex=t.readU(4),a.bitrateIndex=t.readU(5),a.channels=i[a.channelIndex],a.sampleRate=n[a.sampleRateIndex],a.bitrate=o[a.bitrateIndex],a)}}}]);