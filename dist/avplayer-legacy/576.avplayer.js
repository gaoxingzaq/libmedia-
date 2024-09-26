"use strict";(self.webpackChunkAVPlayer=self.webpackChunkAVPlayer||[]).push([[576],{41576:(e,t,i)=>{i.r(t),i.d(t,{default:()=>O});var n=i(88435),a=i.n(n),r=i(25182),s=i(78716),u=i(81570),o=i(77193),d=i(25767),c=i(43070),l=i(31060),m=i(134),h=i(36443),f=i.n(h),g=i(80662),p=i.n(g),v=i(54001),x=i.n(v),b=i(13724),y=i(82800),L=i(95335),S=i(4624),R=i(78417),P=i(77580),k=i(86932),A=i(9705);function w(e,t,i){return t=(0,d.A)(t),(0,o.A)(e,I()?a()(t,i||[],(0,d.A)(e).constructor):t.apply(e,i))}function I(){try{var e=!Boolean.prototype.valueOf.call(a()(Boolean,[],(function(){})))}catch(e){}return(I=function(){return!!e})()}var T="src/avnetwork/ioLoader/DashIOLoader.ts",O=function(e){function t(){var e;(0,s.A)(this,t);for(var i=arguments.length,n=new Array(i),a=0;a<i;a++)n[a]=arguments[a];return e=w(this,t,[].concat(n)),(0,m.A)((0,c.A)(e),"info",void 0),(0,m.A)((0,c.A)(e),"range",void 0),(0,m.A)((0,c.A)(e),"mediaPlayList",void 0),(0,m.A)((0,c.A)(e),"fetchMediaPlayListPromise",void 0),(0,m.A)((0,c.A)(e),"minBuffer",void 0),(0,m.A)((0,c.A)(e),"audioResource",void 0),(0,m.A)((0,c.A)(e),"videoResource",void 0),(0,m.A)((0,c.A)(e),"subtitleResource",void 0),e}var i,n,a,o,d,h,g,v,y;return(0,l.A)(t,e),(0,u.A)(t,[{key:"createResource",value:function(e){return{type:e,fetchedMap:new(p()),fetchedHistoryList:[],loader:null,segmentIndex:0,currentUri:"",selectedIndex:0,segments:[],initSegmentPadding:"",initedSegment:""}}},{key:"fetchMediaPlayList",value:(y=(0,r.A)(f().mark((function e(t){var i,n,a,r,s,u,o,d,c,l;return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=4;break}if(!this.fetchMediaPlayListPromise){e.next=3;break}return e.abrupt("return");case 3:this.fetchMediaPlayListPromise=new(x())((function(e){t=e}));case 4:return i={method:"GET",headers:{},mode:"cors",cache:"default",referrerPolicy:"no-referrer-when-downgrade"},this.info.headers&&L.each(this.info.headers,(function(e,t){i.headers[t]=e})),this.info.withCredentials&&(i.credentials="include"),this.info.referrerPolicy&&(i.referrerPolicy=this.info.referrerPolicy),e.prev=8,e.next=11,fetch(this.info.url,i);case 11:return n=e.sent,e.next=14,n.text();case 14:if(a=e.sent,this.mediaPlayList=(0,R.A)(a,this.info.url),this.minBuffer=this.mediaPlayList.minBufferTime,!this.options.isLive){e.next=25;break}if(u=this.mediaPlayList.minBufferTime/this.mediaPlayList.maxSegmentDuration,!((o=Math.max(this.mediaPlayList.mediaList.audio&&(null===(r=this.mediaPlayList.mediaList.audio[0])||void 0===r?void 0:r.mediaSegments.length)||0,this.mediaPlayList.mediaList.video&&(null===(s=this.mediaPlayList.mediaList.video[0])||void 0===s?void 0:s.mediaSegments.length)||0))<u)){e.next=25;break}return e.next=23,new b.A((u-o)*this.mediaPlayList.maxSegmentDuration);case 23:return S.R8("wait for min buffer time, buffer: ".concat(o*this.mediaPlayList.maxSegmentDuration,", need: ").concat(u*this.mediaPlayList.maxSegmentDuration),T,142),e.abrupt("return",this.fetchMediaPlayList(t));case 25:return"vod"===this.mediaPlayList.type?this.options.isLive=!1:this.options.isLive=!0,this.mediaPlayList.mediaList.audio.length&&((d=this.mediaPlayList.mediaList.audio[this.audioResource.selectedIndex]).file?this.audioResource.segments=[d.file]:this.options.isLive&&this.audioResource.initedSegment===d.initSegment?this.audioResource.segments=d.mediaSegments.map((function(e){return e.url})):(this.audioResource.segments=[d.initSegment].concat(d.mediaSegments.map((function(e){return e.url}))),this.audioResource.initedSegment=d.initSegment)),this.mediaPlayList.mediaList.video.length&&((c=this.mediaPlayList.mediaList.video[this.videoResource.selectedIndex]).file?this.videoResource.segments=[c.file]:this.options.isLive&&this.videoResource.initedSegment===c.initSegment?this.videoResource.segments=c.mediaSegments.map((function(e){return e.url})):(this.videoResource.segments=[c.initSegment].concat(c.mediaSegments.map((function(e){return e.url}))),this.videoResource.initedSegment=c.initSegment)),this.mediaPlayList.mediaList.subtitle.length&&((l=this.mediaPlayList.mediaList.subtitle[this.subtitleResource.selectedIndex]).file?this.subtitleResource.segments=[l.file]:this.options.isLive&&this.subtitleResource.initedSegment===l.initSegment?this.subtitleResource.segments=l.mediaSegments.map((function(e){return e.url})):(this.subtitleResource.segments=[l.initSegment].concat(l.mediaSegments.map((function(e){return e.url}))),this.subtitleResource.initedSegment=l.initSegment)),t(),this.fetchMediaPlayListPromise=null,this.status=2,this.retryCount=0,e.abrupt("return",this.mediaPlayList);case 36:if(e.prev=36,e.t0=e.catch(8),!(this.retryCount<this.options.retryCount)){e.next=46;break}return this.retryCount++,S.z3("failed fetch mpd file, retry(".concat(this.retryCount,"/3)"),T,214),e.next=43,new b.A(2===this.status?this.options.retryInterval:5);case 43:return e.abrupt("return",this.fetchMediaPlayList(t));case 46:this.status=3,t(),S.h2("DashLoader: exception, fetch slice error, error: ".concat(e.t0.message),T,222);case 49:case"end":return e.stop()}}),e,this,[[8,36]])}))),function(e){return y.apply(this,arguments)})},{key:"open",value:(v=(0,r.A)(f().mark((function e(t,i){return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0===this.status){e.next=2;break}return e.abrupt("return");case 2:return this.info=t,this.range=i,this.range.to||(this.range.to=-1),this.range.from=Math.max(this.range.from,0),this.videoResource=this.createResource("video"),this.audioResource=this.createResource("audio"),this.subtitleResource=this.createResource("subtitle"),this.status=1,this.retryCount=0,e.next=13,this.fetchMediaPlayList();case 13:case"end":return e.stop()}}),e,this)}))),function(e,t){return v.apply(this,arguments)})},{key:"readResource",value:(g=(0,r.A)(f().mark((function e(t,i){var n,a,r;return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=0,!i.loader){e.next=19;break}return e.next=4,i.loader.read(t);case 4:if(-1048576===(n=e.sent)){e.next=9;break}return e.abrupt("return",n);case 9:if(!this.options.isLive){e.next=15;break}i.fetchedMap.set(i.currentUri,!0),10===i.fetchedHistoryList.length&&i.fetchedMap.delete(i.fetchedHistoryList.shift()),i.fetchedHistoryList.push(i.currentUri),e.next=18;break;case 15:if(i.segmentIndex++,!(i.segmentIndex>=i.segments.length)){e.next=18;break}return e.abrupt("return",-1048576);case 18:i.loader=null;case 19:if(!this.options.isLive){e.next=45;break}if((a=i.segments.filter((function(e){return!i.fetchedMap.get(e)}))).length){e.next=38;break}if(!this.mediaPlayList.isEnd){e.next=24;break}return e.abrupt("return",-1048576);case 24:if(!((r=(this.mediaPlayList.duration||this.mediaPlayList.minimumUpdatePeriod)-((0,k.A)()-this.mediaPlayList.timestamp)/1e3)>0)){e.next=28;break}return e.next=28,new b.A(Math.max(r,2));case 28:if(!this.fetchMediaPlayListPromise){e.next=35;break}return e.next=31,this.fetchMediaPlayListPromise;case 31:if(3!==this.status){e.next=33;break}return e.abrupt("return",-1048576);case 33:e.next=37;break;case 35:return e.next=37,this.fetchMediaPlayList();case 37:return e.abrupt("return",this.readResource(t,i));case 38:return i.currentUri=a[0],i.loader=new P.A(L.extend({},this.options,{disableSegment:!0,loop:!1})),e.next=42,i.loader.open({url:i.currentUri},{from:0,to:-1});case 42:return e.abrupt("return",i.loader.read(t));case 45:if(i.loader=new P.A(L.extend({},this.options,{disableSegment:!0,loop:!1})),!i.initSegmentPadding){e.next=53;break}return e.next=49,i.loader.open({url:i.initSegmentPadding},{from:0,to:-1});case 49:i.initSegmentPadding=null,i.segmentIndex--,e.next=55;break;case 53:return e.next=55,i.loader.open({url:i.segments[i.segmentIndex]},{from:0,to:-1});case 55:return e.abrupt("return",i.loader.read(t));case 56:case"end":return e.stop()}}),e,this)}))),function(e,t){return g.apply(this,arguments)})},{key:"read",value:(h=(0,r.A)(f().mark((function e(t,i){return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("audio"!==i.mediaType){e.next=4;break}return e.abrupt("return",this.readResource(t,this.audioResource));case 4:if("video"!==i.mediaType){e.next=8;break}return e.abrupt("return",this.readResource(t,this.videoResource));case 8:if("subtitle"!==i.mediaType){e.next=10;break}return e.abrupt("return",this.readResource(t,this.subtitleResource));case 10:return e.abrupt("return",A.UY);case 11:case"end":return e.stop()}}),e,this)}))),function(e,t){return h.apply(this,arguments)})},{key:"seekResource",value:(d=(0,r.A)(f().mark((function e(t,i){var n,a,r,s,u;return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!i.loader){e.next=4;break}return e.next=3,i.loader.abort();case 3:i.loader=null;case 4:if(n=Number(BigInt.asIntN(32,t)),!i.segments){e.next=19;break}if(a=0,r="audio"===i.type?this.mediaPlayList.mediaList.audio:"video"===i.type?this.mediaPlayList.mediaList.video:this.mediaPlayList.mediaList.subtitle,null==(s=r[i.selectedIndex].mediaSegments)||!s.length){e.next=18;break}u=0;case 11:if(!(u<s.length)){e.next=18;break}if(!(n>=1e3*s[u].start&&n<1e3*s[u].end)){e.next=15;break}return a=u,e.abrupt("break",18);case 15:u++,e.next=11;break;case 18:i.segmentIndex=a+(r[i.selectedIndex].initSegment?1:0);case 19:case"end":return e.stop()}}),e,this)}))),function(e,t){return d.apply(this,arguments)})},{key:"seek",value:(o=(0,r.A)(f().mark((function e(t,i){return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("audio"!==i.mediaType||!this.audioResource.loader){e.next=3;break}return e.next=3,this.seekResource(t,this.audioResource);case 3:if("video"!==i.mediaType||!this.videoResource.loader){e.next=6;break}return e.next=6,this.seekResource(t,this.videoResource);case 6:if("subtitle"!==i.mediaType||!this.subtitleResource.loader){e.next=9;break}return e.next=9,this.seekResource(t,this.subtitleResource);case 9:4===this.status&&(this.status=2);case 10:case"end":return e.stop()}}),e,this)}))),function(e,t){return o.apply(this,arguments)})},{key:"size",value:(a=(0,r.A)(f().mark((function e(){return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",BigInt(0));case 1:case"end":return e.stop()}}),e)}))),function(){return a.apply(this,arguments)})},{key:"abort",value:(n=(0,r.A)(f().mark((function e(){return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.videoResource.loader){e.next=4;break}return e.next=3,this.videoResource.loader.abort();case 3:this.videoResource.loader=null;case 4:if(!this.audioResource.loader){e.next=8;break}return e.next=7,this.audioResource.loader.abort();case 7:this.audioResource.loader=null;case 8:if(!this.subtitleResource.loader){e.next=12;break}return e.next=11,this.subtitleResource.loader.abort();case 11:this.subtitleResource.loader=null;case 12:case"end":return e.stop()}}),e,this)}))),function(){return n.apply(this,arguments)})},{key:"stop",value:(i=(0,r.A)(f().mark((function e(){return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.abort();case 2:this.status=0;case 3:case"end":return e.stop()}}),e,this)}))),function(){return i.apply(this,arguments)})},{key:"getDuration",value:function(){return this.mediaPlayList.duration}},{key:"hasVideo",value:function(){var e;return(null===(e=this.mediaPlayList)||void 0===e?void 0:e.mediaList.video.length)>0}},{key:"hasAudio",value:function(){var e;return(null===(e=this.mediaPlayList)||void 0===e?void 0:e.mediaList.audio.length)>0}},{key:"hasSubtitle",value:function(){var e;return(null===(e=this.mediaPlayList)||void 0===e?void 0:e.mediaList.subtitle.length)>0}},{key:"getVideoList",value:function(){return this.hasVideo()?{list:this.mediaPlayList.mediaList.video.map((function(e){return{width:e.width,height:e.height,frameRate:e.frameRate,codecs:e.codecs}})),selectedIndex:this.videoResource.selectedIndex}:{list:[],selectedIndex:0}}},{key:"getAudioList",value:function(){return this.hasAudio()?{list:this.mediaPlayList.mediaList.audio.map((function(e){return{lang:e.lang,codecs:e.codecs}})),selectedIndex:this.audioResource.selectedIndex}:{list:[],selectedIndex:0}}},{key:"getSubtitleList",value:function(){return this.hasSubtitle()?{list:this.mediaPlayList.mediaList.subtitle.map((function(e){return{lang:e.lang,codecs:e.codecs}})),selectedIndex:this.subtitleResource.selectedIndex}:{list:[],selectedIndex:0}}},{key:"selectVideo",value:function(e){if(e!==this.videoResource.selectedIndex&&this.hasVideo()&&e>=0&&e<this.mediaPlayList.mediaList.video.length){this.videoResource.selectedIndex=e;var t=this.mediaPlayList.mediaList.video[this.videoResource.selectedIndex];t.file?this.videoResource.segments=[t.file]:(this.videoResource.segments=[t.initSegment].concat(t.mediaSegments.map((function(e){return e.url}))),this.videoResource.initSegmentPadding=t.initSegment)}}},{key:"selectAudio",value:function(e){if(e!==this.audioResource.selectedIndex&&this.hasAudio()&&e>=0&&e<this.mediaPlayList.mediaList.audio.length){this.audioResource.selectedIndex=e;var t=this.mediaPlayList.mediaList.audio[this.audioResource.selectedIndex];t.file?this.audioResource.segments=[t.file]:(this.audioResource.segments=[t.initSegment].concat(t.mediaSegments.map((function(e){return e.url}))),this.audioResource.initSegmentPadding=t.initSegment)}}},{key:"selectSubtitle",value:function(e){if(e!==this.subtitleResource.selectedIndex&&this.hasSubtitle()&&e>=0&&e<this.mediaPlayList.mediaList.subtitle.length){this.subtitleResource.selectedIndex=e;var t=this.mediaPlayList.mediaList.subtitle[this.subtitleResource.selectedIndex];t.file?this.subtitleResource.segments=[t.file]:(this.subtitleResource.segments=[t.initSegment].concat(t.mediaSegments.map((function(e){return e.url}))),this.subtitleResource.initSegmentPadding=t.initSegment)}}},{key:"getMinBuffer",value:function(){return this.minBuffer}}]),t}(y.A)},78417:(e,t,i)=>{i.d(t,{A:()=>f});var n=i(88032),a=i.n(n),r=i(29967),s=i.n(r),u=i(79331),o=i(67672),d=i(62100),c=i(86932);function l(e){var t=0,i=0,n=0;return(e=e.slice(e.indexOf("PT")+2)).indexOf("H")>-1&&e.indexOf("M")>-1&&e.indexOf("S")>-1?(t=a()(e.slice(0,e.indexOf("H"))),i=a()(e.slice(e.indexOf("H")+1,e.indexOf("M"))),n=a()(e.slice(e.indexOf("M")+1,e.indexOf("S")))):e.indexOf("H")<0&&e.indexOf("M")>0&&e.indexOf("S")>-1?(i=a()(e.slice(0,e.indexOf("M"))),n=a()(e.slice(e.indexOf("M")+1,e.indexOf("S")))):e.indexOf("H")<0&&e.indexOf("M")<0&&e.indexOf("S")>-1&&(n=a()(e.slice(0,e.indexOf("S")))),3600*t+60*i+n}function m(e,t){return(Array(t).join("0")+e).slice(-t)}function h(e){if(!e)return 0;if(e.indexOf("/")>-1){var t=e.split("/");return a()(t[0])/a()(t[1])}return a()(e)}function f(e,t){var i,n={source:e,mediaList:{audio:[],video:[],subtitle:[]},type:"live",isEnd:!1,duration:0,minBufferTime:0,maxSegmentDuration:0,minimumUpdatePeriod:0,timestamp:(0,c.A)()},r=[],f=(i=e,i?(0,u.A)(i):null).MPD;"static"===f.type&&(n.type="vod",n.isEnd=!0),f.minBufferTime&&(n.minBufferTime=l(f.minBufferTime)),f.maxSegmentDuration&&(n.maxSegmentDuration=l(f.maxSegmentDuration)),f.minimumUpdatePeriod&&(n.minimumUpdatePeriod=l(f.minimumUpdatePeriod)),f.mediaPresentationDuration&&(n.duration=l(f.mediaPresentationDuration));var g="";f.BaseURL&&(g=f.BaseURL);var p=o.YO(f.Period)?f.Period[0]:f.Period;return!n.duration&&p&&p.duration&&(n.duration=l(p.duration)),(o.YO(p.AdaptationSet)?p.AdaptationSet:[p.AdaptationSet]).forEach((function(e,i){var u="video/mp4",c="avc1.64001E",l=640,f=360,p=640,v=360,x=25,b="1:1",y="1",L=588633,S=g,R="und";e.BaseURL&&(S+=e.BaseURL),e.lang&&(R=e.lang),e.mimeType?"video/mp4"===(u=e.mimeType)?(c=e.codecs,l=a()(e.width),f=a()(e.height),e.maxWidth&&(p=a()(e.maxWidth)),e.maxHeight&&(v=a()(e.maxHeight)),e.frameRate&&(x=h(e.frameRate)),b=e.sar,y=e.startWithSAP,L=a()(e.bandwidth)):"audio/mp4"===u&&(c=e.codecs,y=e.startWithSAP,L=a()(e.bandwidth)):(e.maxWidth&&(p=a()(e.maxWidth)),e.maxHeight&&(v=a()(e.maxHeight)),e.frameRate&&(x=h(e.frameRate))),(o.YO(e.Representation)?e.Representation:[e.Representation]).forEach((function(i,h){r.indexOf(i.id)>-1&&(i.id=(s()(r[r.length-1])+1).toString()),r.push(i.id);var g="",P=[],k=0,A=0,w=t.slice(0,t.lastIndexOf("/")+1)+S;i.mimeType&&(u=i.mimeType),"video/mp4"===u?(i.codecs&&(c=i.codecs),i.width&&(l=a()(i.width)),i.height&&(f=a()(i.height)),i.maxWidth&&(p=a()(i.maxWidth)),i.maxHeight&&(v=a()(i.maxHeight)),i.frameRate&&(x=a()(i.frameRate)),i.sar&&(b=i.sar),i.startWithSAP&&(y=i.startWithSAP),i.bandwidth&&(L=a()(i.bandwidth))):(i.codecs&&(c=i.codecs),i.startWithSAP&&(y=i.startWithSAP),i.bandwidth&&(L=a()(i.bandwidth))),i.BaseURL&&(w+=i.BaseURL);var I=!1;if((e.ContentProtection||i.ContentProtection)&&(I=!0),i.SegmentBase)"video/mp4"===u?n.mediaList.video.push({id:i.id,file:w,mimeType:u,codecs:c,width:l,height:f,maxWidth:p,maxHeight:v,frameRate:x,sar:b,startWithSAP:"1"===y,bandwidth:L,timescale:k,duration:A,encrypted:I}):"audio/mp4"===u?n.mediaList.audio.push({id:i.id,file:w,mimeType:u,codecs:c,startWithSAP:"1"===y,bandwidth:L,timescale:k,duration:A,encrypted:I,lang:R}):"application/mp4"===u&&n.mediaList.subtitle.push({id:i.id,file:w,mimeType:u,codecs:c,startWithSAP:"1"===y,bandwidth:L,timescale:k,duration:A,encrypted:I,lang:R});else{var T;if(e.SegmentTemplate&&(T=o.YO(e.SegmentTemplate)?e.SegmentTemplate[0]:e.SegmentTemplate),i.SegmentTemplate&&(T=o.YO(i.SegmentTemplate)?i.SegmentTemplate[0]:i.SegmentTemplate),T){var O=s()(T.startNumber);if(g=T.initialization,k=a()(T.timescale||"1"),T.duration&&!T.SegmentTimeline)for(var M=(A=a()(T.duration))/k,B=O+Math.ceil((n.duration||M)/M)-1,U=function(e){var t=M*(e-O),a=M*(e-O+1);e===B&&(M=n.duration-M*(B-O),a=n.duration),P.push({idx:e,start:t,end:a,url:w+T.media.replace(/\$RepresentationID\$/g,i.id).replace(/\$Number(%(\d+)d)?\$/g,(function(t,i,n){return n?m(e,+n):(0,d.A)(e)})),segmentDuration:M})},D=O;D<=B;D++)U(D);else if(T.SegmentTimeline&&T.SegmentTimeline.S)for(var $=o.YO(T.SegmentTimeline.S)?T.SegmentTimeline.S:[T.SegmentTimeline.S],W=0,H=O,j=0;j<$.length;j++){var V=a()($[j].d);$[j].t&&(W=a()($[0].t));var N=1;$[j].r&&(N=s()($[j].r)+1);for(var C=0;C<N;C++)P.push({idx:H,start:W/k,end:(W+V)/k,url:w+T.media.replace(/\$RepresentationID\$/g,i.id).replace(/\$Number(%(\d+)d)?\$/g,(function(e,t,i){return i?m(H,+i):(0,d.A)(H)})).replace(/\$Time\$/g,(0,d.A)(W)),segmentDuration:V/k}),H++,W+=V}}else if(i.SegmentList)for(var E=o.YO(i.SegmentList.SegmentURL)?i.SegmentList.SegmentURL:[i.SegmentList.SegmentURL],Y=0,z=a()(i.SegmentList.duration),G=0;G<E.length;G++)P.push({idx:G,start:Y/k,end:(Y+z)/k,url:w+E[G].media,segmentDuration:z/k}),Y+=z;"video/mp4"===u?n.mediaList.video.push({id:i.id,baseURL:w,initSegment:w+g.replace(/\$RepresentationID\$/g,i.id).replace(/\$Bandwidth\$/g,(0,d.A)(L)),mediaSegments:P,mimeType:u,codecs:c,width:l,height:f,maxWidth:p,maxHeight:v,frameRate:x,sar:b,startWithSAP:"1"===y,bandwidth:L,timescale:k,duration:A,encrypted:I}):"audio/mp4"===u?n.mediaList.audio.push({id:i.id,baseURL:w,initSegment:w+g.replace(/\$RepresentationID\$/g,i.id).replace(/\$Bandwidth\$/g,(0,d.A)(L)),mediaSegments:P,mimeType:u,codecs:c,startWithSAP:"1"===y,bandwidth:L,timescale:k,duration:A,encrypted:I,lang:R}):"application/mp4"===u&&n.mediaList.subtitle.push({id:i.id,baseURL:w,initSegment:w+g.replace(/\$RepresentationID\$/g,i.id).replace(/\$Bandwidth\$/g,(0,d.A)(L)),mediaSegments:P,mimeType:u,codecs:c,startWithSAP:"1"===y,bandwidth:L,timescale:k,duration:A,encrypted:I,lang:R})}}))})),["video","audio"].forEach((function(e){n.mediaList[e].sort((function(e,t){return e.bandwidth-t.bandwidth}))})),n}},79331:(e,t,i)=>{i.d(t,{A:()=>R});var n=i(69736),a=i.n(n),r=i(44301),s=i.n(r),u=i(82731),o=i.n(u),d=i(59614),c=i.n(d),l=i(969),m=i.n(l),h=i(66681),f=i.n(h),g=i(134),p=i(68632),v=i.n(p),x=i(72739);function b(e,t){var i=a()(e);if(s()){var n=s()(e);t&&(n=n.filter((function(t){return o()(e,t).enumerable}))),i.push.apply(i,n)}return i}function y(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?b(Object(i),!0).forEach((function(t){(0,g.A)(e,t,i[t])})):c()?m()(e,c()(i)):b(Object(i)).forEach((function(t){f()(e,t,o()(i,t))}))}return e}var L={aloneValueName:"_@attribute"},S=[" ","/",'"',"'","<",">"];function R(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:L;e=(e=(e=(e=e.replace(/<!--[\s\S]*?-->/g,"")).replace(/[\n\t\r]/g,"")).replace(/>[ \t]+</g,"><")).replace(/<\?[^>]*\?>/g,"");var i=[],n=0;function a(e,n){var a=i[i.length-1];a&&(e===t.aloneValueName||null==a.obj[t.aloneValueName]?null==a.obj[e]?a.obj[e]=n:v()(a.obj[e])?a.obj[e].push(n):a.obj[e]=[a.obj[e],n]:a.obj[t.aloneValueName]=[a.obj[t.aloneValueName],y({tagName:e},n)])}function r(t){for(;n<e.length;){if(e[n]===t)return!0;n++}return!1}function s(){u();for(var t="";n<e.length&&!x.zy(S,e[n]);)t+=e[n],n++;return t}function u(){for(;n<e.length&&/\s|\r|\n/.test(e[n]);)n++}var o=/\s/,d=/'/,c=/"/;function l(){if(n>=e.length)return!0;u();var t=o;'"'!==e[n]&&"'"!=e[n]||(t='"'===e[n]?c:d,n++);for(var i="";n<e.length;){if(t.test(e[n])){n++;break}i+=e[n],n++}return i}function m(){u();for(var t="";n<e.length&&"<"!==e[n];)t+=e[n],n++;return t}function h(){for(;"<"===e[n];){var t=n;if(n++,u(),"/"!==e[n]){n=t;break}if(n++,s()===i[i.length-1].tag){if(i.length>1){var o=i.pop();a(o.tag,o.obj)}r(">"),n++,u()}else i.pop(),r(">"),n++,u()}}return function o(){if(!(n>=e.length)){var d=n;if(u(),"<"!==e[n])return n=d,a(t.aloneValueName,m()),h(),o();var c=r("<");if(c){d=n,n++;var f=s();if(i.push({obj:{},tag:f,start:d}),function(){for(;u(),">"!==e[n]&&"/"!==e[n];){var t=s();if(!t)break;"="===t[t.length-1]?t=t.substring(0,t.length-1):(r("="),n++),a(t,l())}}(),u(),"/"===e[n]){if(n++,i.length>1){var g=i.pop();a(g.tag,g.obj)}return r(">"),n++,h(),o()}(c=r(">"))&&(n++,u(),"<"!==e[n]&&(a(t.aloneValueName,m()),u()),h(),o())}}}(),(0,g.A)({},i[0].tag,i[0].obj)}}}]);