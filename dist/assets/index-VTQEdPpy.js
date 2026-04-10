(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const zl="165",ms={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},gs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Jp=0,Ch=1,jp=2,vx=3,bx=0,Lu=1,Qp=2,kn=3,vi=0,jt=1,Pn=2,gi=0,Is=1,El=2,Ph=3,Ih=4,em=5,zi=100,tm=101,nm=102,im=103,sm=104,rm=200,om=201,am=202,lm=203,wl=204,Tl=205,cm=206,hm=207,um=208,dm=209,fm=210,pm=211,mm=212,gm=213,xm=214,_m=0,ym=1,vm=2,Mo=3,bm=4,Mm=5,Sm=6,Em=7,Jo=0,wm=1,Tm=2,xi=0,Am=1,Rm=2,Cm=3,Du=4,Pm=5,Im=6,Lm=7,Lh="attached",Dm="detached",kl=300,bi=301,Gi=302,So=303,Eo=304,kr=306,wo=1e3,Mn=1001,To=1002,Ot=1003,Nu=1004,Mx=1004,Er=1005,Sx=1005,Rt=1006,po=1007,Ex=1007,Vn=1008,wx=1008,Mi=1009,Nm=1010,Um=1011,Ao=1012,Uu=1013,Os=1014,mn=1015,jo=1016,Ou=1017,Fu=1018,Fs=1020,Om=35902,Fm=1021,Bm=1022,sn=1023,zm=1024,km=1025,Ls=1026,Bs=1027,Bu=1028,zu=1029,Hm=1030,ku=1031,Hu=1033,dl=33776,fl=33777,pl=33778,ml=33779,Dh=35840,Nh=35841,Uh=35842,Oh=35843,Fh=36196,Bh=37492,zh=37496,kh=37808,Hh=37809,Vh=37810,Gh=37811,Wh=37812,Xh=37813,qh=37814,Yh=37815,$h=37816,Zh=37817,Kh=37818,Jh=37819,jh=37820,Qh=37821,gl=36492,eu=36494,tu=36495,Vm=36283,nu=36284,iu=36285,su=36286,Gm=2200,Wm=2201,Xm=2202,Ro=2300,Al=2301,xl=2302,Ts=2400,As=2401,Co=2402,Hl=2500,Vu=2501,Tx=0,Ax=1,Rx=2,qm=3200,Ym=3201,$i=0,$m=1,ci="",un="srgb",Ai="srgb-linear",Vl="display-p3",Qo="display-p3-linear",Po="linear",lt="srgb",Io="rec709",Lo="p3",Cx=0,xs=7680,Px=7681,Ix=7682,Lx=7683,Dx=34055,Nx=34056,Ux=5386,Ox=512,Fx=513,Bx=514,zx=515,kx=516,Hx=517,Vx=518,ru=519,Zm=512,Km=513,Jm=514,Gu=515,jm=516,Qm=517,eg=518,tg=519,Do=35044,Gx=35048,Wx=35040,Xx=35045,qx=35049,Yx=35041,$x=35046,Zx=35050,Kx=35042,Jx="100",ou="300 es",Gn=2e3,No=2001;class Yn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}}const kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Xd=1234567;const Ds=Math.PI/180,Lr=180/Math.PI;function xn(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(kt[s&255]+kt[s>>8&255]+kt[s>>16&255]+kt[s>>24&255]+"-"+kt[e&255]+kt[e>>8&255]+"-"+kt[e>>16&15|64]+kt[e>>24&255]+"-"+kt[t&63|128]+kt[t>>8&255]+"-"+kt[t>>16&255]+kt[t>>24&255]+kt[n&255]+kt[n>>8&255]+kt[n>>16&255]+kt[n>>24&255]).toLowerCase()}function _t(s,e,t){return Math.max(e,Math.min(t,s))}function Wu(s,e){return(s%e+e)%e}function jx(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Qx(s,e,t){return s!==e?(t-s)/(e-s):0}function mo(s,e,t){return(1-t)*s+t*e}function e_(s,e,t,n){return mo(s,e,1-Math.exp(-t*n))}function t_(s,e=1){return e-Math.abs(Wu(s,e*2)-e)}function n_(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function i_(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function s_(s,e){return s+Math.floor(Math.random()*(e-s+1))}function r_(s,e){return s+Math.random()*(e-s)}function o_(s){return s*(.5-Math.random())}function a_(s){s!==void 0&&(Xd=s);let e=Xd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function l_(s){return s*Ds}function c_(s){return s*Lr}function h_(s){return(s&s-1)===0&&s!==0}function u_(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function d_(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function f_(s,e,t,n,i){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),m=o((n-e)/2);switch(i){case"XYX":s.set(a*h,l*u,l*d,a*c);break;case"YZY":s.set(l*d,a*h,l*u,a*c);break;case"ZXZ":s.set(l*u,l*d,a*h,a*c);break;case"XZX":s.set(a*h,l*m,l*f,a*c);break;case"YXY":s.set(l*f,a*h,l*m,a*c);break;case"ZYZ":s.set(l*m,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Jt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Xe(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Gl={DEG2RAD:Ds,RAD2DEG:Lr,generateUUID:xn,clamp:_t,euclideanModulo:Wu,mapLinear:jx,inverseLerp:Qx,lerp:mo,damp:e_,pingpong:t_,smoothstep:n_,smootherstep:i_,randInt:s_,randFloat:r_,randFloatSpread:o_,seededRandom:a_,degToRad:l_,radToDeg:c_,isPowerOfTwo:h_,ceilPowerOfTwo:u_,floorPowerOfTwo:d_,setQuaternionFromProperEuler:f_,normalize:Xe,denormalize:Jt};class K{constructor(e=0,t=0){K.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(_t(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class We{constructor(e,t,n,i,r,o,a,l,c){We.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c)}set(e,t,n,i,r,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],x=i[0],g=i[3],p=i[6],y=i[1],_=i[4],b=i[7],L=i[2],A=i[5],T=i[8];return r[0]=o*x+a*y+l*L,r[3]=o*g+a*_+l*A,r[6]=o*p+a*b+l*T,r[1]=c*x+h*y+u*L,r[4]=c*g+h*_+u*A,r[7]=c*p+h*b+u*T,r[2]=d*x+f*y+m*L,r[5]=d*g+f*_+m*A,r[8]=d*p+f*b+m*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,m=t*u+n*d+i*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/m;return e[0]=u*x,e[1]=(i*c-h*n)*x,e[2]=(a*n-i*o)*x,e[3]=d*x,e[4]=(h*t-i*l)*x,e[5]=(i*r-a*t)*x,e[6]=f*x,e[7]=(n*l-c*t)*x,e[8]=(o*t-n*r)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Tc.makeScale(e,t)),this}rotate(e){return this.premultiply(Tc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Tc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Tc=new We;function ng(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}const p_={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function wr(s,e){return new p_[s](e)}function Uo(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function ig(){const s=Uo("canvas");return s.style.display="block",s}const qd={};function Xu(s){s in qd||(qd[s]=!0,console.warn(s))}function m_(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Yd=new We().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),$d=new We().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ma={[Ai]:{transfer:Po,primaries:Io,toReference:s=>s,fromReference:s=>s},[un]:{transfer:lt,primaries:Io,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[Qo]:{transfer:Po,primaries:Lo,toReference:s=>s.applyMatrix3($d),fromReference:s=>s.applyMatrix3(Yd)},[Vl]:{transfer:lt,primaries:Lo,toReference:s=>s.convertSRGBToLinear().applyMatrix3($d),fromReference:s=>s.applyMatrix3(Yd).convertLinearToSRGB()}},g_=new Set([Ai,Qo]),nt={enabled:!0,_workingColorSpace:Ai,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!g_.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;const n=ma[e].toReference,i=ma[t].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return ma[s].primaries},getTransfer:function(s){return s===ci?Po:ma[s].transfer}};function Rr(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Ac(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Ks;class sg{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ks===void 0&&(Ks=Uo("canvas")),Ks.width=e.width,Ks.height=e.height;const n=Ks.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Ks}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Uo("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Rr(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Rr(t[n]/255)*255):t[n]=Rr(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let x_=0;class Rs{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:x_++}),this.uuid=xn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Rc(i[o].image)):r.push(Rc(i[o]))}else r=Rc(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function Rc(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?sg.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let __=0;class yt extends Yn{constructor(e=yt.DEFAULT_IMAGE,t=yt.DEFAULT_MAPPING,n=Mn,i=Mn,r=Rt,o=Vn,a=sn,l=Mi,c=yt.DEFAULT_ANISOTROPY,h=ci){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:__++}),this.uuid=xn(),this.name="",this.source=new Rs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new K(0,0),this.repeat=new K(1,1),this.center=new K(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==kl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case wo:e.x=e.x-Math.floor(e.x);break;case Mn:e.x=e.x<0?0:1;break;case To:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case wo:e.y=e.y-Math.floor(e.y);break;case Mn:e.y=e.y<0?0:1;break;case To:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}yt.DEFAULT_IMAGE=null;yt.DEFAULT_MAPPING=kl;yt.DEFAULT_ANISOTROPY=1;class ot{constructor(e=0,t=0,n=0,i=1){ot.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],m=l[9],x=l[2],g=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const _=(c+1)/2,b=(f+1)/2,L=(p+1)/2,A=(h+d)/4,T=(u+x)/4,P=(m+g)/4;return _>b&&_>L?_<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(_),i=A/n,r=T/n):b>L?b<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(b),n=A/i,r=P/i):L<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(L),n=T/r,i=P/r),this.set(n,i,r,t),this}let y=Math.sqrt((g-m)*(g-m)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(g-m)/y,this.y=(u-x)/y,this.z=(d-h)/y,this.w=Math.acos((c+f+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class rg extends Yn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ot(0,0,e,t),this.scissorTest=!1,this.viewport=new ot(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new yt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Rs(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Nn extends rg{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Wl extends yt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=Mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class y_ extends Nn{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new Wl(null,e,t,n),this.texture.isRenderTargetTexture=!0}}class qu extends yt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=Mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class v_ extends Nn{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new qu(null,e,t,n),this.texture.isRenderTargetTexture=!0}}class Wt{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=r[o+0],f=r[o+1],m=r[o+2],x=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=m,e[t+3]=x;return}if(u!==x||l!==d||c!==f||h!==m){let g=1-a;const p=l*d+c*f+h*m+u*x,y=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){const L=Math.sqrt(_),A=Math.atan2(L,p*y);g=Math.sin(g*A)/L,a=Math.sin(a*A)/L}const b=a*y;if(l=l*g+d*b,c=c*g+f*b,h=h*g+m*b,u=u*g+x*b,g===1-a){const L=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=L,c*=L,h*=L,u*=L}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[o],d=r[o+1],f=r[o+2],m=r[o+3];return e[t]=a*m+h*u+l*f-c*d,e[t+1]=l*m+h*d+c*u-a*f,e[t+2]=c*m+h*f+a*d-l*u,e[t+3]=h*m-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(r/2),d=l(n/2),f=l(i/2),m=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"YZX":this._x=d*h*u+c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u-d*f*m;break;case"XZY":this._x=d*h*u-c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-i)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(_t(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(e=0,t=0,n=0){R.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Zd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Zd.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),h=2*(a*t-r*i),u=2*(r*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=i+l*u+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Cc.copy(this).projectOnVector(e),this.sub(Cc)}reflect(e){return this.sub(Cc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(_t(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Cc=new R,Zd=new Wt;class Qt{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Tn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Tn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Tn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Tn):Tn.fromBufferAttribute(r,o),Tn.applyMatrix4(e.matrixWorld),this.expandByPoint(Tn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ga.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ga.copy(n.boundingBox)),ga.applyMatrix4(e.matrixWorld),this.union(ga)}const i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Tn),Tn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Yr),xa.subVectors(this.max,Yr),Js.subVectors(e.a,Yr),js.subVectors(e.b,Yr),Qs.subVectors(e.c,Yr),Pi.subVectors(js,Js),Ii.subVectors(Qs,js),ns.subVectors(Js,Qs);let t=[0,-Pi.z,Pi.y,0,-Ii.z,Ii.y,0,-ns.z,ns.y,Pi.z,0,-Pi.x,Ii.z,0,-Ii.x,ns.z,0,-ns.x,-Pi.y,Pi.x,0,-Ii.y,Ii.x,0,-ns.y,ns.x,0];return!Pc(t,Js,js,Qs,xa)||(t=[1,0,0,0,1,0,0,0,1],!Pc(t,Js,js,Qs,xa))?!1:(_a.crossVectors(Pi,Ii),t=[_a.x,_a.y,_a.z],Pc(t,Js,js,Qs,xa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Tn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Tn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Jn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Jn=[new R,new R,new R,new R,new R,new R,new R,new R],Tn=new R,ga=new Qt,Js=new R,js=new R,Qs=new R,Pi=new R,Ii=new R,ns=new R,Yr=new R,xa=new R,_a=new R,is=new R;function Pc(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){is.fromArray(s,r);const a=i.x*Math.abs(is.x)+i.y*Math.abs(is.y)+i.z*Math.abs(is.z),l=e.dot(is),c=t.dot(is),h=n.dot(is);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const b_=new Qt,$r=new R,Ic=new R;class Xt{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):b_.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;$r.subVectors(e,this.center);const t=$r.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector($r,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ic.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint($r.copy(e.center).add(Ic)),this.expandByPoint($r.copy(e.center).sub(Ic))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const jn=new R,Lc=new R,ya=new R,Li=new R,Dc=new R,va=new R,Nc=new R;class Vs{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,jn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=jn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(jn.copy(this.origin).addScaledVector(this.direction,t),jn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Lc.copy(e).add(t).multiplyScalar(.5),ya.copy(t).sub(e).normalize(),Li.copy(this.origin).sub(Lc);const r=e.distanceTo(t)*.5,o=-this.direction.dot(ya),a=Li.dot(this.direction),l=-Li.dot(ya),c=Li.lengthSq(),h=Math.abs(1-o*o);let u,d,f,m;if(h>0)if(u=o*l-a,d=o*a-l,m=r*h,u>=0)if(d>=-m)if(d<=m){const x=1/h;u*=x,d*=x,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-m?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=m?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Lc).addScaledVector(ya,d),f}intersectSphere(e,t){jn.subVectors(e.center,this.origin);const n=jn.dot(this.direction),i=jn.dot(jn)-n*n,r=e.radius*e.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,jn)!==null}intersectTriangle(e,t,n,i,r){Dc.subVectors(t,e),va.subVectors(n,e),Nc.crossVectors(Dc,va);let o=this.direction.dot(Nc),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Li.subVectors(this.origin,e);const l=a*this.direction.dot(va.crossVectors(Li,va));if(l<0)return null;const c=a*this.direction.dot(Dc.cross(Li));if(c<0||l+c>o)return null;const h=-a*Li.dot(Nc);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Pe{constructor(e,t,n,i,r,o,a,l,c,h,u,d,f,m,x,g){Pe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c,h,u,d,f,m,x,g)}set(e,t,n,i,r,o,a,l,c,h,u,d,f,m,x,g){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=m,p[11]=x,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Pe().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/er.setFromMatrixColumn(e,0).length(),r=1/er.setFromMatrixColumn(e,1).length(),o=1/er.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=o*h,f=o*u,m=a*h,x=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+m*c,t[5]=d-x*c,t[9]=-a*l,t[2]=x-d*c,t[6]=m+f*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,m=c*h,x=c*u;t[0]=d+x*a,t[4]=m*a-f,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-m,t[6]=x+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,m=c*h,x=c*u;t[0]=d-x*a,t[4]=-o*u,t[8]=m+f*a,t[1]=f+m*a,t[5]=o*h,t[9]=x-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*h,f=o*u,m=a*h,x=a*u;t[0]=l*h,t[4]=m*c-f,t[8]=d*c+x,t[1]=l*u,t[5]=x*c+d,t[9]=f*c-m,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,f=o*c,m=a*l,x=a*c;t[0]=l*h,t[4]=x-d*u,t[8]=m*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+m,t[10]=d-x*u}else if(e.order==="XZY"){const d=o*l,f=o*c,m=a*l,x=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+x,t[5]=o*h,t[9]=f*u-m,t[2]=m*u-f,t[6]=a*h,t[10]=x*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(M_,e,S_)}lookAt(e,t,n){const i=this.elements;return cn.subVectors(e,t),cn.lengthSq()===0&&(cn.z=1),cn.normalize(),Di.crossVectors(n,cn),Di.lengthSq()===0&&(Math.abs(n.z)===1?cn.x+=1e-4:cn.z+=1e-4,cn.normalize(),Di.crossVectors(n,cn)),Di.normalize(),ba.crossVectors(cn,Di),i[0]=Di.x,i[4]=ba.x,i[8]=cn.x,i[1]=Di.y,i[5]=ba.y,i[9]=cn.y,i[2]=Di.z,i[6]=ba.z,i[10]=cn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],x=n[6],g=n[10],p=n[14],y=n[3],_=n[7],b=n[11],L=n[15],A=i[0],T=i[4],P=i[8],E=i[12],M=i[1],C=i[5],O=i[9],N=i[13],q=i[2],Z=i[6],B=i[10],W=i[14],H=i[3],de=i[7],pe=i[11],me=i[15];return r[0]=o*A+a*M+l*q+c*H,r[4]=o*T+a*C+l*Z+c*de,r[8]=o*P+a*O+l*B+c*pe,r[12]=o*E+a*N+l*W+c*me,r[1]=h*A+u*M+d*q+f*H,r[5]=h*T+u*C+d*Z+f*de,r[9]=h*P+u*O+d*B+f*pe,r[13]=h*E+u*N+d*W+f*me,r[2]=m*A+x*M+g*q+p*H,r[6]=m*T+x*C+g*Z+p*de,r[10]=m*P+x*O+g*B+p*pe,r[14]=m*E+x*N+g*W+p*me,r[3]=y*A+_*M+b*q+L*H,r[7]=y*T+_*C+b*Z+L*de,r[11]=y*P+_*O+b*B+L*pe,r[15]=y*E+_*N+b*W+L*me,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],m=e[3],x=e[7],g=e[11],p=e[15];return m*(+r*l*u-i*c*u-r*a*d+n*c*d+i*a*f-n*l*f)+x*(+t*l*f-t*c*d+r*o*d-i*o*f+i*c*h-r*l*h)+g*(+t*c*u-t*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+p*(-i*a*h-t*l*u+t*a*d+i*o*u-n*o*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],m=e[12],x=e[13],g=e[14],p=e[15],y=u*g*c-x*d*c+x*l*f-a*g*f-u*l*p+a*d*p,_=m*d*c-h*g*c-m*l*f+o*g*f+h*l*p-o*d*p,b=h*x*c-m*u*c+m*a*f-o*x*f-h*a*p+o*u*p,L=m*u*l-h*x*l-m*a*d+o*x*d+h*a*g-o*u*g,A=t*y+n*_+i*b+r*L;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/A;return e[0]=y*T,e[1]=(x*d*r-u*g*r-x*i*f+n*g*f+u*i*p-n*d*p)*T,e[2]=(a*g*r-x*l*r+x*i*c-n*g*c-a*i*p+n*l*p)*T,e[3]=(u*l*r-a*d*r-u*i*c+n*d*c+a*i*f-n*l*f)*T,e[4]=_*T,e[5]=(h*g*r-m*d*r+m*i*f-t*g*f-h*i*p+t*d*p)*T,e[6]=(m*l*r-o*g*r-m*i*c+t*g*c+o*i*p-t*l*p)*T,e[7]=(o*d*r-h*l*r+h*i*c-t*d*c-o*i*f+t*l*f)*T,e[8]=b*T,e[9]=(m*u*r-h*x*r-m*n*f+t*x*f+h*n*p-t*u*p)*T,e[10]=(o*x*r-m*a*r+m*n*c-t*x*c-o*n*p+t*a*p)*T,e[11]=(h*a*r-o*u*r-h*n*c+t*u*c+o*n*f-t*a*f)*T,e[12]=L*T,e[13]=(h*x*i-m*u*i+m*n*d-t*x*d-h*n*g+t*u*g)*T,e[14]=(m*a*i-o*x*i-m*n*l+t*x*l+o*n*g-t*a*g)*T,e[15]=(o*u*i-h*a*i+h*n*l-t*u*l-o*n*d+t*a*d)*T,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,m=r*u,x=o*h,g=o*u,p=a*u,y=l*c,_=l*h,b=l*u,L=n.x,A=n.y,T=n.z;return i[0]=(1-(x+p))*L,i[1]=(f+b)*L,i[2]=(m-_)*L,i[3]=0,i[4]=(f-b)*A,i[5]=(1-(d+p))*A,i[6]=(g+y)*A,i[7]=0,i[8]=(m+_)*T,i[9]=(g-y)*T,i[10]=(1-(d+x))*T,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=er.set(i[0],i[1],i[2]).length();const o=er.set(i[4],i[5],i[6]).length(),a=er.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],An.copy(this);const c=1/r,h=1/o,u=1/a;return An.elements[0]*=c,An.elements[1]*=c,An.elements[2]*=c,An.elements[4]*=h,An.elements[5]*=h,An.elements[6]*=h,An.elements[8]*=u,An.elements[9]*=u,An.elements[10]*=u,t.setFromRotationMatrix(An),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=Gn){const l=this.elements,c=2*r/(t-e),h=2*r/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i);let f,m;if(a===Gn)f=-(o+r)/(o-r),m=-2*o*r/(o-r);else if(a===No)f=-o/(o-r),m=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=Gn){const l=this.elements,c=1/(t-e),h=1/(n-i),u=1/(o-r),d=(t+e)*c,f=(n+i)*h;let m,x;if(a===Gn)m=(o+r)*u,x=-2*u;else if(a===No)m=r*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=x,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const er=new R,An=new Pe,M_=new R(0,0,0),S_=new R(1,1,1),Di=new R,ba=new R,cn=new R,Kd=new Pe,Jd=new Wt;class _n{constructor(e=0,t=0,n=0,i=_n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(_t(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-_t(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(_t(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-_t(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(_t(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-_t(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Kd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Kd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Jd.setFromEuler(this),this.setFromQuaternion(Jd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}_n.DEFAULT_ORDER="XYZ";class Xl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let E_=0;const jd=new R,tr=new Wt,Qn=new Pe,Ma=new R,Zr=new R,w_=new R,T_=new Wt,Qd=new R(1,0,0),ef=new R(0,1,0),tf=new R(0,0,1),nf={type:"added"},A_={type:"removed"},nr={type:"childadded",child:null},Uc={type:"childremoved",child:null};class et extends Yn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:E_++}),this.uuid=xn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=et.DEFAULT_UP.clone();const e=new R,t=new _n,n=new Wt,i=new R(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Pe},normalMatrix:{value:new We}}),this.matrix=new Pe,this.matrixWorld=new Pe,this.matrixAutoUpdate=et.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Xl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return tr.setFromAxisAngle(e,t),this.quaternion.multiply(tr),this}rotateOnWorldAxis(e,t){return tr.setFromAxisAngle(e,t),this.quaternion.premultiply(tr),this}rotateX(e){return this.rotateOnAxis(Qd,e)}rotateY(e){return this.rotateOnAxis(ef,e)}rotateZ(e){return this.rotateOnAxis(tf,e)}translateOnAxis(e,t){return jd.copy(e).applyQuaternion(this.quaternion),this.position.add(jd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Qd,e)}translateY(e){return this.translateOnAxis(ef,e)}translateZ(e){return this.translateOnAxis(tf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Qn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ma.copy(e):Ma.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Zr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Qn.lookAt(Zr,Ma,this.up):Qn.lookAt(Ma,Zr,this.up),this.quaternion.setFromRotationMatrix(Qn),i&&(Qn.extractRotation(i.matrixWorld),tr.setFromRotationMatrix(Qn),this.quaternion.premultiply(tr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(nf),nr.child=e,this.dispatchEvent(nr),nr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(A_),Uc.child=e,this.dispatchEvent(Uc),Uc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Qn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Qn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Qn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(nf),nr.child=e,this.dispatchEvent(nr),nr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zr,e,w_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zr,T_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++){const a=i[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),m=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}et.DEFAULT_UP=new R(0,1,0);et.DEFAULT_MATRIX_AUTO_UPDATE=!0;et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Rn=new R,ei=new R,Oc=new R,ti=new R,ir=new R,sr=new R,sf=new R,Fc=new R,Bc=new R,zc=new R;class dn{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Rn.subVectors(e,t),i.cross(Rn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Rn.subVectors(i,t),ei.subVectors(n,t),Oc.subVectors(e,t);const o=Rn.dot(Rn),a=Rn.dot(ei),l=Rn.dot(Oc),c=ei.dot(ei),h=ei.dot(Oc),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,m=(o*h-a*l)*d;return r.set(1-f-m,m,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,ti)===null?!1:ti.x>=0&&ti.y>=0&&ti.x+ti.y<=1}static getInterpolation(e,t,n,i,r,o,a,l){return this.getBarycoord(e,t,n,i,ti)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ti.x),l.addScaledVector(o,ti.y),l.addScaledVector(a,ti.z),l)}static isFrontFacing(e,t,n,i){return Rn.subVectors(n,t),ei.subVectors(e,t),Rn.cross(ei).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Rn.subVectors(this.c,this.b),ei.subVectors(this.a,this.b),Rn.cross(ei).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return dn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return dn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return dn.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return dn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return dn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let o,a;ir.subVectors(i,n),sr.subVectors(r,n),Fc.subVectors(e,n);const l=ir.dot(Fc),c=sr.dot(Fc);if(l<=0&&c<=0)return t.copy(n);Bc.subVectors(e,i);const h=ir.dot(Bc),u=sr.dot(Bc);if(h>=0&&u<=h)return t.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(ir,o);zc.subVectors(e,r);const f=ir.dot(zc),m=sr.dot(zc);if(m>=0&&f<=m)return t.copy(r);const x=f*c-l*m;if(x<=0&&c>=0&&m<=0)return a=c/(c-m),t.copy(n).addScaledVector(sr,a);const g=h*m-f*u;if(g<=0&&u-h>=0&&f-m>=0)return sf.subVectors(r,i),a=(u-h)/(u-h+(f-m)),t.copy(i).addScaledVector(sf,a);const p=1/(g+x+d);return o=x*p,a=d*p,t.copy(n).addScaledVector(ir,o).addScaledVector(sr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const og={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ni={h:0,s:0,l:0},Sa={h:0,s:0,l:0};function kc(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class ge{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=un){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,nt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=nt.workingColorSpace){return this.r=e,this.g=t,this.b=n,nt.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=nt.workingColorSpace){if(e=Wu(e,1),t=_t(t,0,1),n=_t(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=kc(o,r,e+1/3),this.g=kc(o,r,e),this.b=kc(o,r,e-1/3)}return nt.toWorkingColorSpace(this,i),this}setStyle(e,t=un){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=un){const n=og[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Rr(e.r),this.g=Rr(e.g),this.b=Rr(e.b),this}copyLinearToSRGB(e){return this.r=Ac(e.r),this.g=Ac(e.g),this.b=Ac(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=un){return nt.fromWorkingColorSpace(Ht.copy(this),e),Math.round(_t(Ht.r*255,0,255))*65536+Math.round(_t(Ht.g*255,0,255))*256+Math.round(_t(Ht.b*255,0,255))}getHexString(e=un){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=nt.workingColorSpace){nt.fromWorkingColorSpace(Ht.copy(this),t);const n=Ht.r,i=Ht.g,r=Ht.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=nt.workingColorSpace){return nt.fromWorkingColorSpace(Ht.copy(this),t),e.r=Ht.r,e.g=Ht.g,e.b=Ht.b,e}getStyle(e=un){nt.fromWorkingColorSpace(Ht.copy(this),e);const t=Ht.r,n=Ht.g,i=Ht.b;return e!==un?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Ni),this.setHSL(Ni.h+e,Ni.s+t,Ni.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ni),e.getHSL(Sa);const n=mo(Ni.h,Sa.h,t),i=mo(Ni.s,Sa.s,t),r=mo(Ni.l,Sa.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ht=new ge;ge.NAMES=og;let R_=0;class Yt extends Yn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:R_++}),this.uuid=xn(),this.name="",this.type="Material",this.blending=Is,this.side=vi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=wl,this.blendDst=Tl,this.blendEquation=zi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ge(0,0,0),this.blendAlpha=0,this.depthFunc=Mo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ru,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xs,this.stencilZFail=xs,this.stencilZPass=xs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Is&&(n.blending=this.blending),this.side!==vi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==wl&&(n.blendSrc=this.blendSrc),this.blendDst!==Tl&&(n.blendDst=this.blendDst),this.blendEquation!==zi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Mo&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ru&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==xs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==xs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==xs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class $n extends Yt{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.combine=Jo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const hi=C_();function C_(){const s=new ArrayBuffer(4),e=new Float32Array(s),t=new Uint32Array(s),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}const r=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;!(c&8388608);)c<<=1,h-=8388608;c&=-8388609,h+=947912704,r[l]=c|h}for(let l=1024;l<2048;++l)r[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)o[l]=l<<23;o[31]=1199570944,o[32]=2147483648;for(let l=33;l<63;++l)o[l]=2147483648+(l-32<<23);o[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(a[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:r,exponentTable:o,offsetTable:a}}function tn(s){Math.abs(s)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),s=_t(s,-65504,65504),hi.floatView[0]=s;const e=hi.uint32View[0],t=e>>23&511;return hi.baseTable[t]+((e&8388607)>>hi.shiftTable[t])}function co(s){const e=s>>10;return hi.uint32View[0]=hi.mantissaTable[hi.offsetTable[e]+(s&1023)]+hi.exponentTable[e],hi.floatView[0]}const P_={toHalfFloat:tn,fromHalfFloat:co},At=new R,Ea=new K;class Qe{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Do,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=mn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return Xu("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ea.fromBufferAttribute(this,t),Ea.applyMatrix3(e),this.setXY(t,Ea.x,Ea.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Jt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Xe(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Jt(t,this.array)),t}setX(e,t){return this.normalized&&(t=Xe(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Jt(t,this.array)),t}setY(e,t){return this.normalized&&(t=Xe(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Jt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Xe(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Jt(t,this.array)),t}setW(e,t){return this.normalized&&(t=Xe(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Xe(t,this.array),n=Xe(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Xe(t,this.array),n=Xe(n,this.array),i=Xe(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=Xe(t,this.array),n=Xe(n,this.array),i=Xe(i,this.array),r=Xe(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Do&&(e.usage=this.usage),e}}class I_ extends Qe{constructor(e,t,n){super(new Int8Array(e),t,n)}}class L_ extends Qe{constructor(e,t,n){super(new Uint8Array(e),t,n)}}class D_ extends Qe{constructor(e,t,n){super(new Uint8ClampedArray(e),t,n)}}class N_ extends Qe{constructor(e,t,n){super(new Int16Array(e),t,n)}}class Yu extends Qe{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class U_ extends Qe{constructor(e,t,n){super(new Int32Array(e),t,n)}}class $u extends Qe{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class O_ extends Qe{constructor(e,t,n){super(new Uint16Array(e),t,n),this.isFloat16BufferAttribute=!0}getX(e){let t=co(this.array[e*this.itemSize]);return this.normalized&&(t=Jt(t,this.array)),t}setX(e,t){return this.normalized&&(t=Xe(t,this.array)),this.array[e*this.itemSize]=tn(t),this}getY(e){let t=co(this.array[e*this.itemSize+1]);return this.normalized&&(t=Jt(t,this.array)),t}setY(e,t){return this.normalized&&(t=Xe(t,this.array)),this.array[e*this.itemSize+1]=tn(t),this}getZ(e){let t=co(this.array[e*this.itemSize+2]);return this.normalized&&(t=Jt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Xe(t,this.array)),this.array[e*this.itemSize+2]=tn(t),this}getW(e){let t=co(this.array[e*this.itemSize+3]);return this.normalized&&(t=Jt(t,this.array)),t}setW(e,t){return this.normalized&&(t=Xe(t,this.array)),this.array[e*this.itemSize+3]=tn(t),this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Xe(t,this.array),n=Xe(n,this.array)),this.array[e+0]=tn(t),this.array[e+1]=tn(n),this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Xe(t,this.array),n=Xe(n,this.array),i=Xe(i,this.array)),this.array[e+0]=tn(t),this.array[e+1]=tn(n),this.array[e+2]=tn(i),this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=Xe(t,this.array),n=Xe(n,this.array),i=Xe(i,this.array),r=Xe(r,this.array)),this.array[e+0]=tn(t),this.array[e+1]=tn(n),this.array[e+2]=tn(i),this.array[e+3]=tn(r),this}}class Me extends Qe{constructor(e,t,n){super(new Float32Array(e),t,n)}}let F_=0;const vn=new Pe,Hc=new et,rr=new R,hn=new Qt,Kr=new Qt,Nt=new R;class He extends Yn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:F_++}),this.uuid=xn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ng(e)?$u:Yu)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new We().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return vn.makeRotationFromQuaternion(e),this.applyMatrix4(vn),this}rotateX(e){return vn.makeRotationX(e),this.applyMatrix4(vn),this}rotateY(e){return vn.makeRotationY(e),this.applyMatrix4(vn),this}rotateZ(e){return vn.makeRotationZ(e),this.applyMatrix4(vn),this}translate(e,t,n){return vn.makeTranslation(e,t,n),this.applyMatrix4(vn),this}scale(e,t,n){return vn.makeScale(e,t,n),this.applyMatrix4(vn),this}lookAt(e){return Hc.lookAt(e),Hc.updateMatrix(),this.applyMatrix4(Hc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(rr).negate(),this.translate(rr.x,rr.y,rr.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Me(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];hn.setFromBufferAttribute(r),this.morphTargetsRelative?(Nt.addVectors(this.boundingBox.min,hn.min),this.boundingBox.expandByPoint(Nt),Nt.addVectors(this.boundingBox.max,hn.max),this.boundingBox.expandByPoint(Nt)):(this.boundingBox.expandByPoint(hn.min),this.boundingBox.expandByPoint(hn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Xt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){const n=this.boundingSphere.center;if(hn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Kr.setFromBufferAttribute(a),this.morphTargetsRelative?(Nt.addVectors(hn.min,Kr.min),hn.expandByPoint(Nt),Nt.addVectors(hn.max,Kr.max),hn.expandByPoint(Nt)):(hn.expandByPoint(Kr.min),hn.expandByPoint(Kr.max))}hn.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)Nt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Nt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Nt.fromBufferAttribute(a,c),l&&(rr.fromBufferAttribute(e,c),Nt.add(rr)),i=Math.max(i,n.distanceToSquared(Nt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Qe(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let P=0;P<n.count;P++)a[P]=new R,l[P]=new R;const c=new R,h=new R,u=new R,d=new K,f=new K,m=new K,x=new R,g=new R;function p(P,E,M){c.fromBufferAttribute(n,P),h.fromBufferAttribute(n,E),u.fromBufferAttribute(n,M),d.fromBufferAttribute(r,P),f.fromBufferAttribute(r,E),m.fromBufferAttribute(r,M),h.sub(c),u.sub(c),f.sub(d),m.sub(d);const C=1/(f.x*m.y-m.x*f.y);isFinite(C)&&(x.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(C),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(C),a[P].add(x),a[E].add(x),a[M].add(x),l[P].add(g),l[E].add(g),l[M].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let P=0,E=y.length;P<E;++P){const M=y[P],C=M.start,O=M.count;for(let N=C,q=C+O;N<q;N+=3)p(e.getX(N+0),e.getX(N+1),e.getX(N+2))}const _=new R,b=new R,L=new R,A=new R;function T(P){L.fromBufferAttribute(i,P),A.copy(L);const E=a[P];_.copy(E),_.sub(L.multiplyScalar(L.dot(E))).normalize(),b.crossVectors(A,E);const C=b.dot(l[P])<0?-1:1;o.setXYZW(P,_.x,_.y,_.z,C)}for(let P=0,E=y.length;P<E;++P){const M=y[P],C=M.start,O=M.count;for(let N=C,q=C+O;N<q;N+=3)T(e.getX(N+0)),T(e.getX(N+1)),T(e.getX(N+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Qe(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new R,r=new R,o=new R,a=new R,l=new R,c=new R,h=new R,u=new R;if(e)for(let d=0,f=e.count;d<f;d+=3){const m=e.getX(d+0),x=e.getX(d+1),g=e.getX(d+2);i.fromBufferAttribute(t,m),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,g),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Nt.fromBufferAttribute(e,t),Nt.normalize(),e.setXYZ(t,Nt.x,Nt.y,Nt.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,m=0;for(let x=0,g=l.length;x<g;x++){a.isInterleavedBufferAttribute?f=l[x]*a.data.stride+a.offset:f=l[x]*h;for(let p=0;p<h;p++)d[m++]=c[f++]}return new Qe(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new He,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const rf=new Pe,ss=new Vs,wa=new Xt,of=new R,or=new R,ar=new R,lr=new R,Vc=new R,Ta=new R,Aa=new K,Ra=new K,Ca=new K,af=new R,lf=new R,cf=new R,Pa=new R,Ia=new R;class ct extends et{constructor(e=new He,t=new $n){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(r&&a){Ta.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(Vc.fromBufferAttribute(u,e),o?Ta.addScaledVector(Vc,h):Ta.addScaledVector(Vc.sub(t),h))}t.add(Ta)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),wa.copy(n.boundingSphere),wa.applyMatrix4(r),ss.copy(e.ray).recast(e.near),!(wa.containsPoint(ss.origin)===!1&&(ss.intersectSphere(wa,of)===null||ss.origin.distanceToSquared(of)>(e.far-e.near)**2))&&(rf.copy(r).invert(),ss.copy(e.ray).applyMatrix4(rf),!(n.boundingBox!==null&&ss.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ss)))}_computeIntersections(e,t,n){let i;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,x=d.length;m<x;m++){const g=d[m],p=o[g.materialIndex],y=Math.max(g.start,f.start),_=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let b=y,L=_;b<L;b+=3){const A=a.getX(b),T=a.getX(b+1),P=a.getX(b+2);i=La(this,p,e,n,c,h,u,A,T,P),i&&(i.faceIndex=Math.floor(b/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const m=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let g=m,p=x;g<p;g+=3){const y=a.getX(g),_=a.getX(g+1),b=a.getX(g+2);i=La(this,o,e,n,c,h,u,y,_,b),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,x=d.length;m<x;m++){const g=d[m],p=o[g.materialIndex],y=Math.max(g.start,f.start),_=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let b=y,L=_;b<L;b+=3){const A=b,T=b+1,P=b+2;i=La(this,p,e,n,c,h,u,A,T,P),i&&(i.faceIndex=Math.floor(b/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const m=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let g=m,p=x;g<p;g+=3){const y=g,_=g+1,b=g+2;i=La(this,o,e,n,c,h,u,y,_,b),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}}function B_(s,e,t,n,i,r,o,a){let l;if(e.side===jt?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,e.side===vi,a),l===null)return null;Ia.copy(a),Ia.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(Ia);return c<t.near||c>t.far?null:{distance:c,point:Ia.clone(),object:s}}function La(s,e,t,n,i,r,o,a,l,c){s.getVertexPosition(a,or),s.getVertexPosition(l,ar),s.getVertexPosition(c,lr);const h=B_(s,e,t,n,or,ar,lr,Pa);if(h){i&&(Aa.fromBufferAttribute(i,a),Ra.fromBufferAttribute(i,l),Ca.fromBufferAttribute(i,c),h.uv=dn.getInterpolation(Pa,or,ar,lr,Aa,Ra,Ca,new K)),r&&(Aa.fromBufferAttribute(r,a),Ra.fromBufferAttribute(r,l),Ca.fromBufferAttribute(r,c),h.uv1=dn.getInterpolation(Pa,or,ar,lr,Aa,Ra,Ca,new K)),o&&(af.fromBufferAttribute(o,a),lf.fromBufferAttribute(o,l),cf.fromBufferAttribute(o,c),h.normal=dn.getInterpolation(Pa,or,ar,lr,af,lf,cf,new R),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new R,materialIndex:0};dn.getNormal(or,ar,lr,u.normal),h.face=u}return h}class Gs extends He{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,f=0;m("z","y","x",-1,-1,n,t,e,o,r,0),m("z","y","x",1,-1,n,t,-e,o,r,1),m("x","z","y",1,1,e,n,t,i,o,2),m("x","z","y",1,-1,e,n,-t,i,o,3),m("x","y","z",1,-1,e,t,n,i,r,4),m("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Me(c,3)),this.setAttribute("normal",new Me(h,3)),this.setAttribute("uv",new Me(u,2));function m(x,g,p,y,_,b,L,A,T,P,E){const M=b/T,C=L/P,O=b/2,N=L/2,q=A/2,Z=T+1,B=P+1;let W=0,H=0;const de=new R;for(let pe=0;pe<B;pe++){const me=pe*C-N;for(let ke=0;ke<Z;ke++){const Ze=ke*M-O;de[x]=Ze*y,de[g]=me*_,de[p]=q,c.push(de.x,de.y,de.z),de[x]=0,de[g]=0,de[p]=A>0?1:-1,h.push(de.x,de.y,de.z),u.push(ke/T),u.push(1-pe/P),W+=1}}for(let pe=0;pe<P;pe++)for(let me=0;me<T;me++){const ke=d+me+Z*pe,Ze=d+me+Z*(pe+1),$=d+(me+1)+Z*(pe+1),re=d+(me+1)+Z*pe;l.push(ke,Ze,re),l.push(Ze,$,re),H+=6}a.addGroup(f,H,E),f+=H,d+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gs(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Dr(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Kt(s){const e={};for(let t=0;t<s.length;t++){const n=Dr(s[t]);for(const i in n)e[i]=n[i]}return e}function z_(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function ag(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:nt.workingColorSpace}const lg={clone:Dr,merge:Kt};var k_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,H_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Un extends Yt{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=k_,this.fragmentShader=H_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Dr(e.uniforms),this.uniformsGroups=z_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class ql extends et{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Pe,this.projectionMatrix=new Pe,this.projectionMatrixInverse=new Pe,this.coordinateSystem=Gn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ui=new R,hf=new K,uf=new K;class Ut extends ql{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Lr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ds*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Lr*2*Math.atan(Math.tan(Ds*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ui.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ui.x,Ui.y).multiplyScalar(-e/Ui.z),Ui.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ui.x,Ui.y).multiplyScalar(-e/Ui.z)}getViewSize(e,t){return this.getViewBounds(e,hf,uf),t.subVectors(uf,hf)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ds*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const cr=-90,hr=1;class cg extends et{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Ut(cr,hr,e,t);i.layers=this.layers,this.add(i);const r=new Ut(cr,hr,e,t);r.layers=this.layers,this.add(r);const o=new Ut(cr,hr,e,t);o.layers=this.layers,this.add(o);const a=new Ut(cr,hr,e,t);a.layers=this.layers,this.add(a);const l=new Ut(cr,hr,e,t);l.layers=this.layers,this.add(l);const c=new Ut(cr,hr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===Gn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===No)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class ea extends yt{constructor(e,t,n,i,r,o,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:bi,super(e,t,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class hg extends Nn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new ea(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Rt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Gs(5,5,5),r=new Un({name:"CubemapFromEquirect",uniforms:Dr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:jt,blending:gi});r.uniforms.tEquirect.value=t;const o=new ct(i,r),a=t.minFilter;return t.minFilter===Vn&&(t.minFilter=Rt),new cg(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}}const Gc=new R,V_=new R,G_=new We;class oi{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Gc.subVectors(n,t).cross(V_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Gc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||G_.getNormalMatrix(e),i=this.coplanarPoint(Gc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const rs=new Xt,Da=new R;class ta{constructor(e=new oi,t=new oi,n=new oi,i=new oi,r=new oi,o=new oi){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Gn){const n=this.planes,i=e.elements,r=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],m=i[9],x=i[10],g=i[11],p=i[12],y=i[13],_=i[14],b=i[15];if(n[0].setComponents(l-r,d-c,g-f,b-p).normalize(),n[1].setComponents(l+r,d+c,g+f,b+p).normalize(),n[2].setComponents(l+o,d+h,g+m,b+y).normalize(),n[3].setComponents(l-o,d-h,g-m,b-y).normalize(),n[4].setComponents(l-a,d-u,g-x,b-_).normalize(),t===Gn)n[5].setComponents(l+a,d+u,g+x,b+_).normalize();else if(t===No)n[5].setComponents(a,u,x,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),rs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),rs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(rs)}intersectsSprite(e){return rs.center.set(0,0,0),rs.radius=.7071067811865476,rs.applyMatrix4(e.matrixWorld),this.intersectsSphere(rs)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Da.x=i.normal.x>0?e.max.x:e.min.x,Da.y=i.normal.y>0?e.max.y:e.min.y,Da.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Da)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function ug(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function W_(s){const e=new WeakMap;function t(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l._updateRange,d=l.updateRanges;if(s.bindBuffer(c,a),u.count===-1&&d.length===0&&s.bufferSubData(c,0,h),d.length!==0){for(let f=0,m=d.length;f<m;f++){const x=d[f];s.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}u.count!==-1&&(s.bufferSubData(c,u.offset*h.BYTES_PER_ELEMENT,h,u.offset,u.count),u.count=-1),l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(s.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}class Hr extends He{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=e/a,d=t/l,f=[],m=[],x=[],g=[];for(let p=0;p<h;p++){const y=p*d-o;for(let _=0;_<c;_++){const b=_*u-r;m.push(b,-y,0),x.push(0,0,1),g.push(_/a),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<a;y++){const _=y+c*p,b=y+c*(p+1),L=y+1+c*(p+1),A=y+1+c*p;f.push(_,b,A),f.push(b,L,A)}this.setIndex(f),this.setAttribute("position",new Me(m,3)),this.setAttribute("normal",new Me(x,3)),this.setAttribute("uv",new Me(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hr(e.width,e.height,e.widthSegments,e.heightSegments)}}var X_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,q_=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Y_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,$_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Z_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,K_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,J_=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,j_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Q_=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,ey=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,ty=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ny=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,iy=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,sy=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,ry=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,oy=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,ay=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ly=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cy=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,hy=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,uy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,dy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,fy=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( batchId );
	vColor.xyz *= batchingColor.xyz;
#endif`,py=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,my=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,gy=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,xy=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,_y=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,yy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,vy=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,by="gl_FragColor = linearToOutputTexel( gl_FragColor );",My=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Sy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Ey=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,wy=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Ty=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ay=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Ry=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Cy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Py=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Iy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ly=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Dy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ny=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Uy=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Oy=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Fy=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,By=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,zy=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ky=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Hy=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Vy=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Gy=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Wy=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Xy=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,qy=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Yy=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,$y=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zy=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ky=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Jy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,jy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Qy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ev=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,tv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,nv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,iv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,sv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,rv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ov=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,av=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,cv=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,hv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,uv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,fv=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,pv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,mv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,gv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,xv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,_v=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,yv=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,vv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,bv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Mv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Sv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ev=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,wv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Tv=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return shadow;
	}
#endif`,Av=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Rv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Cv=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Pv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Iv=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Lv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Dv=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Nv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Uv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ov=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Fv=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Bv=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,zv=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,kv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Hv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Vv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Gv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Wv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Xv=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yv=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$v=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Jv=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,jv=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Qv=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,eb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,tb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nb=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ib=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sb=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,rb=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ob=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ab=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lb=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,cb=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hb=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ub=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,db=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fb=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pb=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,mb=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gb=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xb=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_b=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,yb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vb=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bb=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Mb=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Sb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ye={alphahash_fragment:X_,alphahash_pars_fragment:q_,alphamap_fragment:Y_,alphamap_pars_fragment:$_,alphatest_fragment:Z_,alphatest_pars_fragment:K_,aomap_fragment:J_,aomap_pars_fragment:j_,batching_pars_vertex:Q_,batching_vertex:ey,begin_vertex:ty,beginnormal_vertex:ny,bsdfs:iy,iridescence_fragment:sy,bumpmap_pars_fragment:ry,clipping_planes_fragment:oy,clipping_planes_pars_fragment:ay,clipping_planes_pars_vertex:ly,clipping_planes_vertex:cy,color_fragment:hy,color_pars_fragment:uy,color_pars_vertex:dy,color_vertex:fy,common:py,cube_uv_reflection_fragment:my,defaultnormal_vertex:gy,displacementmap_pars_vertex:xy,displacementmap_vertex:_y,emissivemap_fragment:yy,emissivemap_pars_fragment:vy,colorspace_fragment:by,colorspace_pars_fragment:My,envmap_fragment:Sy,envmap_common_pars_fragment:Ey,envmap_pars_fragment:wy,envmap_pars_vertex:Ty,envmap_physical_pars_fragment:Fy,envmap_vertex:Ay,fog_vertex:Ry,fog_pars_vertex:Cy,fog_fragment:Py,fog_pars_fragment:Iy,gradientmap_pars_fragment:Ly,lightmap_pars_fragment:Dy,lights_lambert_fragment:Ny,lights_lambert_pars_fragment:Uy,lights_pars_begin:Oy,lights_toon_fragment:By,lights_toon_pars_fragment:zy,lights_phong_fragment:ky,lights_phong_pars_fragment:Hy,lights_physical_fragment:Vy,lights_physical_pars_fragment:Gy,lights_fragment_begin:Wy,lights_fragment_maps:Xy,lights_fragment_end:qy,logdepthbuf_fragment:Yy,logdepthbuf_pars_fragment:$y,logdepthbuf_pars_vertex:Zy,logdepthbuf_vertex:Ky,map_fragment:Jy,map_pars_fragment:jy,map_particle_fragment:Qy,map_particle_pars_fragment:ev,metalnessmap_fragment:tv,metalnessmap_pars_fragment:nv,morphinstance_vertex:iv,morphcolor_vertex:sv,morphnormal_vertex:rv,morphtarget_pars_vertex:ov,morphtarget_vertex:av,normal_fragment_begin:lv,normal_fragment_maps:cv,normal_pars_fragment:hv,normal_pars_vertex:uv,normal_vertex:dv,normalmap_pars_fragment:fv,clearcoat_normal_fragment_begin:pv,clearcoat_normal_fragment_maps:mv,clearcoat_pars_fragment:gv,iridescence_pars_fragment:xv,opaque_fragment:_v,packing:yv,premultiplied_alpha_fragment:vv,project_vertex:bv,dithering_fragment:Mv,dithering_pars_fragment:Sv,roughnessmap_fragment:Ev,roughnessmap_pars_fragment:wv,shadowmap_pars_fragment:Tv,shadowmap_pars_vertex:Av,shadowmap_vertex:Rv,shadowmask_pars_fragment:Cv,skinbase_vertex:Pv,skinning_pars_vertex:Iv,skinning_vertex:Lv,skinnormal_vertex:Dv,specularmap_fragment:Nv,specularmap_pars_fragment:Uv,tonemapping_fragment:Ov,tonemapping_pars_fragment:Fv,transmission_fragment:Bv,transmission_pars_fragment:zv,uv_pars_fragment:kv,uv_pars_vertex:Hv,uv_vertex:Vv,worldpos_vertex:Gv,background_vert:Wv,background_frag:Xv,backgroundCube_vert:qv,backgroundCube_frag:Yv,cube_vert:$v,cube_frag:Zv,depth_vert:Kv,depth_frag:Jv,distanceRGBA_vert:jv,distanceRGBA_frag:Qv,equirect_vert:eb,equirect_frag:tb,linedashed_vert:nb,linedashed_frag:ib,meshbasic_vert:sb,meshbasic_frag:rb,meshlambert_vert:ob,meshlambert_frag:ab,meshmatcap_vert:lb,meshmatcap_frag:cb,meshnormal_vert:hb,meshnormal_frag:ub,meshphong_vert:db,meshphong_frag:fb,meshphysical_vert:pb,meshphysical_frag:mb,meshtoon_vert:gb,meshtoon_frag:xb,points_vert:_b,points_frag:yb,shadow_vert:vb,shadow_frag:bb,sprite_vert:Mb,sprite_frag:Sb},fe={common:{diffuse:{value:new ge(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},envMapRotation:{value:new We},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new K(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ge(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ge(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new ge(16777215)},opacity:{value:1},center:{value:new K(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},Cn={basic:{uniforms:Kt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:Ye.meshbasic_vert,fragmentShader:Ye.meshbasic_frag},lambert:{uniforms:Kt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new ge(0)}}]),vertexShader:Ye.meshlambert_vert,fragmentShader:Ye.meshlambert_frag},phong:{uniforms:Kt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new ge(0)},specular:{value:new ge(1118481)},shininess:{value:30}}]),vertexShader:Ye.meshphong_vert,fragmentShader:Ye.meshphong_frag},standard:{uniforms:Kt([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new ge(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag},toon:{uniforms:Kt([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new ge(0)}}]),vertexShader:Ye.meshtoon_vert,fragmentShader:Ye.meshtoon_frag},matcap:{uniforms:Kt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:Ye.meshmatcap_vert,fragmentShader:Ye.meshmatcap_frag},points:{uniforms:Kt([fe.points,fe.fog]),vertexShader:Ye.points_vert,fragmentShader:Ye.points_frag},dashed:{uniforms:Kt([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ye.linedashed_vert,fragmentShader:Ye.linedashed_frag},depth:{uniforms:Kt([fe.common,fe.displacementmap]),vertexShader:Ye.depth_vert,fragmentShader:Ye.depth_frag},normal:{uniforms:Kt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:Ye.meshnormal_vert,fragmentShader:Ye.meshnormal_frag},sprite:{uniforms:Kt([fe.sprite,fe.fog]),vertexShader:Ye.sprite_vert,fragmentShader:Ye.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ye.background_vert,fragmentShader:Ye.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new We}},vertexShader:Ye.backgroundCube_vert,fragmentShader:Ye.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ye.cube_vert,fragmentShader:Ye.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ye.equirect_vert,fragmentShader:Ye.equirect_frag},distanceRGBA:{uniforms:Kt([fe.common,fe.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ye.distanceRGBA_vert,fragmentShader:Ye.distanceRGBA_frag},shadow:{uniforms:Kt([fe.lights,fe.fog,{color:{value:new ge(0)},opacity:{value:1}}]),vertexShader:Ye.shadow_vert,fragmentShader:Ye.shadow_frag}};Cn.physical={uniforms:Kt([Cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new K(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new ge(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new K},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new ge(0)},specularColor:{value:new ge(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new K},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag};const Na={r:0,b:0,g:0},os=new _n,Eb=new Pe;function wb(s,e,t,n,i,r,o){const a=new ge(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function m(y){let _=y.isScene===!0?y.background:null;return _&&_.isTexture&&(_=(y.backgroundBlurriness>0?t:e).get(_)),_}function x(y){let _=!1;const b=m(y);b===null?p(a,l):b&&b.isColor&&(p(b,1),_=!0);const L=s.xr.getEnvironmentBlendMode();L==="additive"?n.buffers.color.setClear(0,0,0,1,o):L==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function g(y,_){const b=m(_);b&&(b.isCubeTexture||b.mapping===kr)?(h===void 0&&(h=new ct(new Gs(1,1,1),new Un({name:"BackgroundCubeMaterial",uniforms:Dr(Cn.backgroundCube.uniforms),vertexShader:Cn.backgroundCube.vertexShader,fragmentShader:Cn.backgroundCube.fragmentShader,side:jt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,A,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),os.copy(_.backgroundRotation),os.x*=-1,os.y*=-1,os.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(os.y*=-1,os.z*=-1),h.material.uniforms.envMap.value=b,h.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Eb.makeRotationFromEuler(os)),h.material.toneMapped=nt.getTransfer(b.colorSpace)!==lt,(u!==b||d!==b.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=b,d=b.version,f=s.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new ct(new Hr(2,2),new Un({name:"BackgroundMaterial",uniforms:Dr(Cn.background.uniforms),vertexShader:Cn.background.vertexShader,fragmentShader:Cn.background.fragmentShader,side:vi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=nt.getTransfer(b.colorSpace)!==lt,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(u!==b||d!==b.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,u=b,d=b.version,f=s.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,_){y.getRGB(Na,ag(s)),n.buffers.color.setClear(Na.r,Na.g,Na.b,_,o)}return{getClearColor:function(){return a},setClearColor:function(y,_=1){a.set(y),l=_,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(a,l)},render:x,addToRenderList:g}}function Tb(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,o=!1;function a(M,C,O,N,q){let Z=!1;const B=u(N,O,C);r!==B&&(r=B,c(r.object)),Z=f(M,N,O,q),Z&&m(M,N,O,q),q!==null&&e.update(q,s.ELEMENT_ARRAY_BUFFER),(Z||o)&&(o=!1,b(M,C,O,N),q!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function l(){return s.createVertexArray()}function c(M){return s.bindVertexArray(M)}function h(M){return s.deleteVertexArray(M)}function u(M,C,O){const N=O.wireframe===!0;let q=n[M.id];q===void 0&&(q={},n[M.id]=q);let Z=q[C.id];Z===void 0&&(Z={},q[C.id]=Z);let B=Z[N];return B===void 0&&(B=d(l()),Z[N]=B),B}function d(M){const C=[],O=[],N=[];for(let q=0;q<t;q++)C[q]=0,O[q]=0,N[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:O,attributeDivisors:N,object:M,attributes:{},index:null}}function f(M,C,O,N){const q=r.attributes,Z=C.attributes;let B=0;const W=O.getAttributes();for(const H in W)if(W[H].location>=0){const pe=q[H];let me=Z[H];if(me===void 0&&(H==="instanceMatrix"&&M.instanceMatrix&&(me=M.instanceMatrix),H==="instanceColor"&&M.instanceColor&&(me=M.instanceColor)),pe===void 0||pe.attribute!==me||me&&pe.data!==me.data)return!0;B++}return r.attributesNum!==B||r.index!==N}function m(M,C,O,N){const q={},Z=C.attributes;let B=0;const W=O.getAttributes();for(const H in W)if(W[H].location>=0){let pe=Z[H];pe===void 0&&(H==="instanceMatrix"&&M.instanceMatrix&&(pe=M.instanceMatrix),H==="instanceColor"&&M.instanceColor&&(pe=M.instanceColor));const me={};me.attribute=pe,pe&&pe.data&&(me.data=pe.data),q[H]=me,B++}r.attributes=q,r.attributesNum=B,r.index=N}function x(){const M=r.newAttributes;for(let C=0,O=M.length;C<O;C++)M[C]=0}function g(M){p(M,0)}function p(M,C){const O=r.newAttributes,N=r.enabledAttributes,q=r.attributeDivisors;O[M]=1,N[M]===0&&(s.enableVertexAttribArray(M),N[M]=1),q[M]!==C&&(s.vertexAttribDivisor(M,C),q[M]=C)}function y(){const M=r.newAttributes,C=r.enabledAttributes;for(let O=0,N=C.length;O<N;O++)C[O]!==M[O]&&(s.disableVertexAttribArray(O),C[O]=0)}function _(M,C,O,N,q,Z,B){B===!0?s.vertexAttribIPointer(M,C,O,q,Z):s.vertexAttribPointer(M,C,O,N,q,Z)}function b(M,C,O,N){x();const q=N.attributes,Z=O.getAttributes(),B=C.defaultAttributeValues;for(const W in Z){const H=Z[W];if(H.location>=0){let de=q[W];if(de===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(de=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(de=M.instanceColor)),de!==void 0){const pe=de.normalized,me=de.itemSize,ke=e.get(de);if(ke===void 0)continue;const Ze=ke.buffer,$=ke.type,re=ke.bytesPerElement,be=$===s.INT||$===s.UNSIGNED_INT||de.gpuType===Uu;if(de.isInterleavedBufferAttribute){const le=de.data,Oe=le.stride,Fe=de.offset;if(le.isInstancedInterleavedBuffer){for(let De=0;De<H.locationSize;De++)p(H.location+De,le.meshPerAttribute);M.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let De=0;De<H.locationSize;De++)g(H.location+De);s.bindBuffer(s.ARRAY_BUFFER,Ze);for(let De=0;De<H.locationSize;De++)_(H.location+De,me/H.locationSize,$,pe,Oe*re,(Fe+me/H.locationSize*De)*re,be)}else{if(de.isInstancedBufferAttribute){for(let le=0;le<H.locationSize;le++)p(H.location+le,de.meshPerAttribute);M.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let le=0;le<H.locationSize;le++)g(H.location+le);s.bindBuffer(s.ARRAY_BUFFER,Ze);for(let le=0;le<H.locationSize;le++)_(H.location+le,me/H.locationSize,$,pe,me*re,me/H.locationSize*le*re,be)}}else if(B!==void 0){const pe=B[W];if(pe!==void 0)switch(pe.length){case 2:s.vertexAttrib2fv(H.location,pe);break;case 3:s.vertexAttrib3fv(H.location,pe);break;case 4:s.vertexAttrib4fv(H.location,pe);break;default:s.vertexAttrib1fv(H.location,pe)}}}}y()}function L(){P();for(const M in n){const C=n[M];for(const O in C){const N=C[O];for(const q in N)h(N[q].object),delete N[q];delete C[O]}delete n[M]}}function A(M){if(n[M.id]===void 0)return;const C=n[M.id];for(const O in C){const N=C[O];for(const q in N)h(N[q].object),delete N[q];delete C[O]}delete n[M.id]}function T(M){for(const C in n){const O=n[C];if(O[M.id]===void 0)continue;const N=O[M.id];for(const q in N)h(N[q].object),delete N[q];delete O[M.id]}}function P(){E(),o=!0,r!==i&&(r=i,c(r.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:P,resetDefaultState:E,dispose:L,releaseStatesOfGeometry:A,releaseStatesOfProgram:T,initAttributes:x,enableAttribute:g,disableUnusedAttributes:y}}function Ab(s,e,t){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),t.update(h,n,1)}function o(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function a(c,h,u){if(u===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let f=0;f<u;f++)this.render(c[f],h[f]);else{d.multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let m=0;m<u;m++)f+=h[m];t.update(f,n,1)}}function l(c,h,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)o(c[m],h[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let m=0;for(let x=0;x<u;x++)m+=h[x];for(let x=0;x<d.length;x++)t.update(m,n,d[x])}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Rb(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(A){return!(A!==sn&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const T=A===jo&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Mi&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==mn&&!T)}function l(A){if(A==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_TEXTURE_SIZE),x=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),g=s.getParameter(s.MAX_VERTEX_ATTRIBS),p=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),y=s.getParameter(s.MAX_VARYING_VECTORS),_=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),b=f>0,L=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:f,maxTextureSize:m,maxCubemapSize:x,maxAttributes:g,maxVertexUniforms:p,maxVaryings:y,maxFragmentUniforms:_,vertexTextures:b,maxSamples:L}}function Cb(s){const e=this;let t=null,n=0,i=!1,r=!1;const o=new oi,a=new We,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const m=u.clippingPlanes,x=u.clipIntersection,g=u.clipShadows,p=s.get(u);if(!i||m===null||m.length===0||r&&!g)r?h(null):c();else{const y=r?0:n,_=y*4;let b=p.clippingState||null;l.value=b,b=h(m,d,_,f);for(let L=0;L!==_;++L)b[L]=t[L];p.clippingState=b,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,m){const x=u!==null?u.length:0;let g=null;if(x!==0){if(g=l.value,m!==!0||g===null){const p=f+x*4,y=d.matrixWorldInverse;a.getNormalMatrix(y),(g===null||g.length<p)&&(g=new Float32Array(p));for(let _=0,b=f;_!==x;++_,b+=4)o.copy(u[_]).applyMatrix4(y,a),o.normal.toArray(g,b),g[b+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}function Pb(s){let e=new WeakMap;function t(o,a){return a===So?o.mapping=bi:a===Eo&&(o.mapping=Gi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===So||a===Eo)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new hg(l.height);return c.fromEquirectangularTexture(s,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Yl extends ql{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Tr=4,df=[.125,.215,.35,.446,.526,.582],bs=20,Wc=new Yl,ff=new ge;let Xc=null,qc=0,Yc=0,$c=!1;const _s=(1+Math.sqrt(5))/2,ur=1/_s,pf=[new R(-_s,ur,0),new R(_s,ur,0),new R(-ur,0,_s),new R(ur,0,_s),new R(0,_s,-ur),new R(0,_s,ur),new R(-1,1,-1),new R(1,1,-1),new R(-1,1,1),new R(1,1,1)];class au{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Xc=this._renderer.getRenderTarget(),qc=this._renderer.getActiveCubeFace(),Yc=this._renderer.getActiveMipmapLevel(),$c=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=xf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=gf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Xc,qc,Yc),this._renderer.xr.enabled=$c,e.scissorTest=!1,Ua(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===bi||e.mapping===Gi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Xc=this._renderer.getRenderTarget(),qc=this._renderer.getActiveCubeFace(),Yc=this._renderer.getActiveMipmapLevel(),$c=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Rt,minFilter:Rt,generateMipmaps:!1,type:jo,format:sn,colorSpace:Ai,depthBuffer:!1},i=mf(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=mf(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ib(r)),this._blurMaterial=Lb(r,e,t)}return i}_compileMaterial(e){const t=new ct(this._lodPlanes[0],e);this._renderer.compile(t,Wc)}_sceneToCubeUV(e,t,n,i){const a=new Ut(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(ff),h.toneMapping=xi,h.autoClear=!1;const f=new $n({name:"PMREM.Background",side:jt,depthWrite:!1,depthTest:!1}),m=new ct(new Gs,f);let x=!1;const g=e.background;g?g.isColor&&(f.color.copy(g),e.background=null,x=!0):(f.color.copy(ff),x=!0);for(let p=0;p<6;p++){const y=p%3;y===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):y===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const _=this._cubeSize;Ua(i,y*_,p>2?_:0,_,_),h.setRenderTarget(i),x&&h.render(m,a),h.render(e,a)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=g}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===bi||e.mapping===Gi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=xf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=gf());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new ct(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;Ua(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Wc)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=pf[(i-r-1)%pf.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new ct(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*bs-1),x=r/m,g=isFinite(r)?1+Math.floor(h*x):bs;g>bs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${bs}`);const p=[];let y=0;for(let T=0;T<bs;++T){const P=T/x,E=Math.exp(-P*P/2);p.push(E),T===0?y+=E:T<g&&(y+=2*E)}for(let T=0;T<p.length;T++)p[T]=p[T]/y;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:_}=this;d.dTheta.value=m,d.mipInt.value=_-n;const b=this._sizeLods[i],L=3*b*(i>_-Tr?i-_+Tr:0),A=4*(this._cubeSize-b);Ua(t,L,A,3*b,2*b),l.setRenderTarget(t),l.render(u,Wc)}}function Ib(s){const e=[],t=[],n=[];let i=s;const r=s-Tr+1+df.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>s-Tr?l=df[o-s+Tr-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,x=3,g=2,p=1,y=new Float32Array(x*m*f),_=new Float32Array(g*m*f),b=new Float32Array(p*m*f);for(let A=0;A<f;A++){const T=A%3*2/3-1,P=A>2?0:-1,E=[T,P,0,T+2/3,P,0,T+2/3,P+1,0,T,P,0,T+2/3,P+1,0,T,P+1,0];y.set(E,x*m*A),_.set(d,g*m*A);const M=[A,A,A,A,A,A];b.set(M,p*m*A)}const L=new He;L.setAttribute("position",new Qe(y,x)),L.setAttribute("uv",new Qe(_,g)),L.setAttribute("faceIndex",new Qe(b,p)),e.push(L),i>Tr&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function mf(s,e,t){const n=new Nn(s,e,t);return n.texture.mapping=kr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ua(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function Lb(s,e,t){const n=new Float32Array(bs),i=new R(0,1,0);return new Un({name:"SphericalGaussianBlur",defines:{n:bs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Zu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function gf(){return new Un({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Zu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function xf(){return new Un({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Zu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Zu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Db(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===So||l===Eo,h=l===bi||l===Gi;if(c||h){let u=e.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new au(s)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new au(s)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Nb(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Xu("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Ub(s,e,t,n){const i={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const m in d.attributes)e.remove(d.attributes[m]);for(const m in d.morphAttributes){const x=d.morphAttributes[m];for(let g=0,p=x.length;g<p;g++)e.remove(x[g])}d.removeEventListener("dispose",o),delete i[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const m in d)e.update(d[m],s.ARRAY_BUFFER);const f=u.morphAttributes;for(const m in f){const x=f[m];for(let g=0,p=x.length;g<p;g++)e.update(x[g],s.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,m=u.attributes.position;let x=0;if(f!==null){const y=f.array;x=f.version;for(let _=0,b=y.length;_<b;_+=3){const L=y[_+0],A=y[_+1],T=y[_+2];d.push(L,A,A,T,T,L)}}else if(m!==void 0){const y=m.array;x=m.version;for(let _=0,b=y.length/3-1;_<b;_+=3){const L=_+0,A=_+1,T=_+2;d.push(L,A,A,T,T,L)}}else return;const g=new(ng(d)?$u:Yu)(d,1);g.version=x;const p=r.get(u);p&&e.remove(p),r.set(u,g)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Ob(s,e,t){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){s.drawElements(n,f,r,d*o),t.update(f,n,1)}function c(d,f,m){m!==0&&(s.drawElementsInstanced(n,f,r,d*o,m),t.update(f,n,m))}function h(d,f,m){if(m===0)return;const x=e.get("WEBGL_multi_draw");if(x===null)for(let g=0;g<m;g++)this.render(d[g]/o,f[g]);else{x.multiDrawElementsWEBGL(n,f,0,r,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];t.update(g,n,1)}}function u(d,f,m,x){if(m===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],x[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,x,0,m);let p=0;for(let y=0;y<m;y++)p+=f[y];for(let y=0;y<x.length;y++)t.update(p,n,x[y])}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Fb(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Bb(s,e,t){const n=new WeakMap,i=new ot;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let M=function(){P.dispose(),n.delete(a),a.removeEventListener("dispose",M)};var f=M;d!==void 0&&d.texture.dispose();const m=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],y=a.morphAttributes.normal||[],_=a.morphAttributes.color||[];let b=0;m===!0&&(b=1),x===!0&&(b=2),g===!0&&(b=3);let L=a.attributes.position.count*b,A=1;L>e.maxTextureSize&&(A=Math.ceil(L/e.maxTextureSize),L=e.maxTextureSize);const T=new Float32Array(L*A*4*u),P=new Wl(T,L,A,u);P.type=mn,P.needsUpdate=!0;const E=b*4;for(let C=0;C<u;C++){const O=p[C],N=y[C],q=_[C],Z=L*A*4*C;for(let B=0;B<O.count;B++){const W=B*E;m===!0&&(i.fromBufferAttribute(O,B),T[Z+W+0]=i.x,T[Z+W+1]=i.y,T[Z+W+2]=i.z,T[Z+W+3]=0),x===!0&&(i.fromBufferAttribute(N,B),T[Z+W+4]=i.x,T[Z+W+5]=i.y,T[Z+W+6]=i.z,T[Z+W+7]=0),g===!0&&(i.fromBufferAttribute(q,B),T[Z+W+8]=i.x,T[Z+W+9]=i.y,T[Z+W+10]=i.z,T[Z+W+11]=q.itemSize===4?i.w:1)}}d={count:u,texture:P,size:new K(L,A)},n.set(a,d),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,t);else{let m=0;for(let g=0;g<c.length;g++)m+=c[g];const x=a.morphTargetsRelative?1:1-m;l.getUniforms().setValue(s,"morphTargetBaseInfluence",x),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function zb(s,e,t,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}class Ku extends yt{constructor(e,t,n,i,r,o,a,l,c,h=Ls){if(h!==Ls&&h!==Bs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ls&&(n=Os),n===void 0&&h===Bs&&(n=Fs),super(null,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Ot,this.minFilter=l!==void 0?l:Ot,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const dg=new yt,fg=new Ku(1,1);fg.compareFunction=Gu;const pg=new Wl,mg=new qu,gg=new ea,_f=[],yf=[],vf=new Float32Array(16),bf=new Float32Array(9),Mf=new Float32Array(4);function Vr(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=_f[i];if(r===void 0&&(r=new Float32Array(i),_f[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function It(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Lt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function $l(s,e){let t=yf[e];t===void 0&&(t=new Int32Array(e),yf[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function kb(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Hb(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;s.uniform2fv(this.addr,e),Lt(t,e)}}function Vb(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(It(t,e))return;s.uniform3fv(this.addr,e),Lt(t,e)}}function Gb(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;s.uniform4fv(this.addr,e),Lt(t,e)}}function Wb(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Lt(t,e)}else{if(It(t,n))return;Mf.set(n),s.uniformMatrix2fv(this.addr,!1,Mf),Lt(t,n)}}function Xb(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Lt(t,e)}else{if(It(t,n))return;bf.set(n),s.uniformMatrix3fv(this.addr,!1,bf),Lt(t,n)}}function qb(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Lt(t,e)}else{if(It(t,n))return;vf.set(n),s.uniformMatrix4fv(this.addr,!1,vf),Lt(t,n)}}function Yb(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function $b(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;s.uniform2iv(this.addr,e),Lt(t,e)}}function Zb(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;s.uniform3iv(this.addr,e),Lt(t,e)}}function Kb(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;s.uniform4iv(this.addr,e),Lt(t,e)}}function Jb(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function jb(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;s.uniform2uiv(this.addr,e),Lt(t,e)}}function Qb(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;s.uniform3uiv(this.addr,e),Lt(t,e)}}function eM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;s.uniform4uiv(this.addr,e),Lt(t,e)}}function tM(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);const r=this.type===s.SAMPLER_2D_SHADOW?fg:dg;t.setTexture2D(e||r,i)}function nM(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||mg,i)}function iM(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||gg,i)}function sM(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||pg,i)}function rM(s){switch(s){case 5126:return kb;case 35664:return Hb;case 35665:return Vb;case 35666:return Gb;case 35674:return Wb;case 35675:return Xb;case 35676:return qb;case 5124:case 35670:return Yb;case 35667:case 35671:return $b;case 35668:case 35672:return Zb;case 35669:case 35673:return Kb;case 5125:return Jb;case 36294:return jb;case 36295:return Qb;case 36296:return eM;case 35678:case 36198:case 36298:case 36306:case 35682:return tM;case 35679:case 36299:case 36307:return nM;case 35680:case 36300:case 36308:case 36293:return iM;case 36289:case 36303:case 36311:case 36292:return sM}}function oM(s,e){s.uniform1fv(this.addr,e)}function aM(s,e){const t=Vr(e,this.size,2);s.uniform2fv(this.addr,t)}function lM(s,e){const t=Vr(e,this.size,3);s.uniform3fv(this.addr,t)}function cM(s,e){const t=Vr(e,this.size,4);s.uniform4fv(this.addr,t)}function hM(s,e){const t=Vr(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function uM(s,e){const t=Vr(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function dM(s,e){const t=Vr(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function fM(s,e){s.uniform1iv(this.addr,e)}function pM(s,e){s.uniform2iv(this.addr,e)}function mM(s,e){s.uniform3iv(this.addr,e)}function gM(s,e){s.uniform4iv(this.addr,e)}function xM(s,e){s.uniform1uiv(this.addr,e)}function _M(s,e){s.uniform2uiv(this.addr,e)}function yM(s,e){s.uniform3uiv(this.addr,e)}function vM(s,e){s.uniform4uiv(this.addr,e)}function bM(s,e,t){const n=this.cache,i=e.length,r=$l(t,i);It(n,r)||(s.uniform1iv(this.addr,r),Lt(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||dg,r[o])}function MM(s,e,t){const n=this.cache,i=e.length,r=$l(t,i);It(n,r)||(s.uniform1iv(this.addr,r),Lt(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||mg,r[o])}function SM(s,e,t){const n=this.cache,i=e.length,r=$l(t,i);It(n,r)||(s.uniform1iv(this.addr,r),Lt(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||gg,r[o])}function EM(s,e,t){const n=this.cache,i=e.length,r=$l(t,i);It(n,r)||(s.uniform1iv(this.addr,r),Lt(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||pg,r[o])}function wM(s){switch(s){case 5126:return oM;case 35664:return aM;case 35665:return lM;case 35666:return cM;case 35674:return hM;case 35675:return uM;case 35676:return dM;case 5124:case 35670:return fM;case 35667:case 35671:return pM;case 35668:case 35672:return mM;case 35669:case 35673:return gM;case 5125:return xM;case 36294:return _M;case 36295:return yM;case 36296:return vM;case 35678:case 36198:case 36298:case 36306:case 35682:return bM;case 35679:case 36299:case 36307:return MM;case 35680:case 36300:case 36308:case 36293:return SM;case 36289:case 36303:case 36311:case 36292:return EM}}class TM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=rM(t.type)}}class AM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=wM(t.type)}}class RM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(e,t[a.id],n)}}}const Zc=/(\w+)(\])?(\[|\.)?/g;function Sf(s,e){s.seq.push(e),s.map[e.id]=e}function CM(s,e,t){const n=s.name,i=n.length;for(Zc.lastIndex=0;;){const r=Zc.exec(n),o=Zc.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Sf(t,c===void 0?new TM(a,s,e):new AM(a,s,e));break}else{let u=t.map[a];u===void 0&&(u=new RM(a),Sf(t,u)),t=u}}}class _l{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);CM(r,o,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Ef(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const PM=37297;let IM=0;function LM(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function DM(s){const e=nt.getPrimaries(nt.workingColorSpace),t=nt.getPrimaries(s);let n;switch(e===t?n="":e===Lo&&t===Io?n="LinearDisplayP3ToLinearSRGB":e===Io&&t===Lo&&(n="LinearSRGBToLinearDisplayP3"),s){case Ai:case Qo:return[n,"LinearTransferOETF"];case un:case Vl:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function wf(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+LM(s.getShaderSource(e),o)}else return i}function NM(s,e){const t=DM(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function UM(s,e){let t;switch(e){case Am:t="Linear";break;case Rm:t="Reinhard";break;case Cm:t="OptimizedCineon";break;case Du:t="ACESFilmic";break;case Im:t="AgX";break;case Lm:t="Neutral";break;case Pm:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function OM(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ho).join(`
`)}function FM(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function BM(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function ho(s){return s!==""}function Tf(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Af(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const zM=/^[ \t]*#include +<([\w\d./]+)>/gm;function lu(s){return s.replace(zM,HM)}const kM=new Map;function HM(s,e){let t=Ye[e];if(t===void 0){const n=kM.get(e);if(n!==void 0)t=Ye[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return lu(t)}const VM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Rf(s){return s.replace(VM,GM)}function GM(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Cf(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function WM(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Lu?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Qp?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===kn&&(e="SHADOWMAP_TYPE_VSM"),e}function XM(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case bi:case Gi:e="ENVMAP_TYPE_CUBE";break;case kr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function qM(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Gi:e="ENVMAP_MODE_REFRACTION";break}return e}function YM(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Jo:e="ENVMAP_BLENDING_MULTIPLY";break;case wm:e="ENVMAP_BLENDING_MIX";break;case Tm:e="ENVMAP_BLENDING_ADD";break}return e}function $M(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function ZM(s,e,t,n){const i=s.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=WM(t),c=XM(t),h=qM(t),u=YM(t),d=$M(t),f=OM(t),m=FM(r),x=i.createProgram();let g,p,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ho).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ho).join(`
`),p.length>0&&(p+=`
`)):(g=[Cf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ho).join(`
`),p=[Cf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==xi?"#define TONE_MAPPING":"",t.toneMapping!==xi?Ye.tonemapping_pars_fragment:"",t.toneMapping!==xi?UM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ye.colorspace_pars_fragment,NM("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ho).join(`
`)),o=lu(o),o=Tf(o,t),o=Af(o,t),a=lu(a),a=Tf(a,t),a=Af(a,t),o=Rf(o),a=Rf(a),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===ou?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ou?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const _=y+g+o,b=y+p+a,L=Ef(i,i.VERTEX_SHADER,_),A=Ef(i,i.FRAGMENT_SHADER,b);i.attachShader(x,L),i.attachShader(x,A),t.index0AttributeName!==void 0?i.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x);function T(C){if(s.debug.checkShaderErrors){const O=i.getProgramInfoLog(x).trim(),N=i.getShaderInfoLog(L).trim(),q=i.getShaderInfoLog(A).trim();let Z=!0,B=!0;if(i.getProgramParameter(x,i.LINK_STATUS)===!1)if(Z=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,x,L,A);else{const W=wf(i,L,"vertex"),H=wf(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(x,i.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+O+`
`+W+`
`+H)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(N===""||q==="")&&(B=!1);B&&(C.diagnostics={runnable:Z,programLog:O,vertexShader:{log:N,prefix:g},fragmentShader:{log:q,prefix:p}})}i.deleteShader(L),i.deleteShader(A),P=new _l(i,x),E=BM(i,x)}let P;this.getUniforms=function(){return P===void 0&&T(this),P};let E;this.getAttributes=function(){return E===void 0&&T(this),E};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(x,PM)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=IM++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=L,this.fragmentShader=A,this}let KM=0;class JM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new jM(e),t.set(e,n)),n}}class jM{constructor(e){this.id=KM++,this.code=e,this.usedTimes=0}}function QM(s,e,t,n,i,r,o){const a=new Xl,l=new JM,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(E){return c.add(E),E===0?"uv":`uv${E}`}function g(E,M,C,O,N){const q=O.fog,Z=N.geometry,B=E.isMeshStandardMaterial?O.environment:null,W=(E.isMeshStandardMaterial?t:e).get(E.envMap||B),H=W&&W.mapping===kr?W.image.height:null,de=m[E.type];E.precision!==null&&(f=i.getMaxPrecision(E.precision),f!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));const pe=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,me=pe!==void 0?pe.length:0;let ke=0;Z.morphAttributes.position!==void 0&&(ke=1),Z.morphAttributes.normal!==void 0&&(ke=2),Z.morphAttributes.color!==void 0&&(ke=3);let Ze,$,re,be;if(de){const tt=Cn[de];Ze=tt.vertexShader,$=tt.fragmentShader}else Ze=E.vertexShader,$=E.fragmentShader,l.update(E),re=l.getVertexShaderID(E),be=l.getFragmentShaderID(E);const le=s.getRenderTarget(),Oe=N.isInstancedMesh===!0,Fe=N.isBatchedMesh===!0,De=!!E.map,D=!!E.matcap,J=!!W,ee=!!E.aoMap,oe=!!E.lightMap,ie=!!E.bumpMap,se=!!E.normalMap,ye=!!E.displacementMap,xe=!!E.emissiveMap,Ne=!!E.metalnessMap,I=!!E.roughnessMap,S=E.anisotropy>0,V=E.clearcoat>0,Q=E.dispersion>0,j=E.iridescence>0,te=E.sheen>0,Te=E.transmission>0,he=S&&!!E.anisotropyMap,ue=V&&!!E.clearcoatMap,Be=V&&!!E.clearcoatNormalMap,ae=V&&!!E.clearcoatRoughnessMap,Se=j&&!!E.iridescenceMap,Ke=j&&!!E.iridescenceThicknessMap,Ie=te&&!!E.sheenColorMap,_e=te&&!!E.sheenRoughnessMap,Ve=!!E.specularMap,Ge=!!E.specularColorMap,dt=!!E.specularIntensityMap,v=Te&&!!E.transmissionMap,X=Te&&!!E.thicknessMap,z=!!E.gradientMap,Y=!!E.alphaMap,ne=E.alphaTest>0,Ae=!!E.alphaHash,ze=!!E.extensions;let ft=xi;E.toneMapped&&(le===null||le.isXRRenderTarget===!0)&&(ft=s.toneMapping);const Et={shaderID:de,shaderType:E.type,shaderName:E.name,vertexShader:Ze,fragmentShader:$,defines:E.defines,customVertexShaderID:re,customFragmentShaderID:be,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:Fe,batchingColor:Fe&&N._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&N.instanceColor!==null,instancingMorph:Oe&&N.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:le===null?s.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:Ai,alphaToCoverage:!!E.alphaToCoverage,map:De,matcap:D,envMap:J,envMapMode:J&&W.mapping,envMapCubeUVHeight:H,aoMap:ee,lightMap:oe,bumpMap:ie,normalMap:se,displacementMap:d&&ye,emissiveMap:xe,normalMapObjectSpace:se&&E.normalMapType===$m,normalMapTangentSpace:se&&E.normalMapType===$i,metalnessMap:Ne,roughnessMap:I,anisotropy:S,anisotropyMap:he,clearcoat:V,clearcoatMap:ue,clearcoatNormalMap:Be,clearcoatRoughnessMap:ae,dispersion:Q,iridescence:j,iridescenceMap:Se,iridescenceThicknessMap:Ke,sheen:te,sheenColorMap:Ie,sheenRoughnessMap:_e,specularMap:Ve,specularColorMap:Ge,specularIntensityMap:dt,transmission:Te,transmissionMap:v,thicknessMap:X,gradientMap:z,opaque:E.transparent===!1&&E.blending===Is&&E.alphaToCoverage===!1,alphaMap:Y,alphaTest:ne,alphaHash:Ae,combine:E.combine,mapUv:De&&x(E.map.channel),aoMapUv:ee&&x(E.aoMap.channel),lightMapUv:oe&&x(E.lightMap.channel),bumpMapUv:ie&&x(E.bumpMap.channel),normalMapUv:se&&x(E.normalMap.channel),displacementMapUv:ye&&x(E.displacementMap.channel),emissiveMapUv:xe&&x(E.emissiveMap.channel),metalnessMapUv:Ne&&x(E.metalnessMap.channel),roughnessMapUv:I&&x(E.roughnessMap.channel),anisotropyMapUv:he&&x(E.anisotropyMap.channel),clearcoatMapUv:ue&&x(E.clearcoatMap.channel),clearcoatNormalMapUv:Be&&x(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ae&&x(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Se&&x(E.iridescenceMap.channel),iridescenceThicknessMapUv:Ke&&x(E.iridescenceThicknessMap.channel),sheenColorMapUv:Ie&&x(E.sheenColorMap.channel),sheenRoughnessMapUv:_e&&x(E.sheenRoughnessMap.channel),specularMapUv:Ve&&x(E.specularMap.channel),specularColorMapUv:Ge&&x(E.specularColorMap.channel),specularIntensityMapUv:dt&&x(E.specularIntensityMap.channel),transmissionMapUv:v&&x(E.transmissionMap.channel),thicknessMapUv:X&&x(E.thicknessMap.channel),alphaMapUv:Y&&x(E.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(se||S),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!Z.attributes.uv&&(De||Y),fog:!!q,useFog:E.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:N.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:me,morphTextureStride:ke,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:s.shadowMap.enabled&&C.length>0,shadowMapType:s.shadowMap.type,toneMapping:ft,decodeVideoTexture:De&&E.map.isVideoTexture===!0&&nt.getTransfer(E.map.colorSpace)===lt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Pn,flipSided:E.side===jt,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:ze&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:ze&&E.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Et.vertexUv1s=c.has(1),Et.vertexUv2s=c.has(2),Et.vertexUv3s=c.has(3),c.clear(),Et}function p(E){const M=[];if(E.shaderID?M.push(E.shaderID):(M.push(E.customVertexShaderID),M.push(E.customFragmentShaderID)),E.defines!==void 0)for(const C in E.defines)M.push(C),M.push(E.defines[C]);return E.isRawShaderMaterial===!1&&(y(M,E),_(M,E),M.push(s.outputColorSpace)),M.push(E.customProgramCacheKey),M.join()}function y(E,M){E.push(M.precision),E.push(M.outputColorSpace),E.push(M.envMapMode),E.push(M.envMapCubeUVHeight),E.push(M.mapUv),E.push(M.alphaMapUv),E.push(M.lightMapUv),E.push(M.aoMapUv),E.push(M.bumpMapUv),E.push(M.normalMapUv),E.push(M.displacementMapUv),E.push(M.emissiveMapUv),E.push(M.metalnessMapUv),E.push(M.roughnessMapUv),E.push(M.anisotropyMapUv),E.push(M.clearcoatMapUv),E.push(M.clearcoatNormalMapUv),E.push(M.clearcoatRoughnessMapUv),E.push(M.iridescenceMapUv),E.push(M.iridescenceThicknessMapUv),E.push(M.sheenColorMapUv),E.push(M.sheenRoughnessMapUv),E.push(M.specularMapUv),E.push(M.specularColorMapUv),E.push(M.specularIntensityMapUv),E.push(M.transmissionMapUv),E.push(M.thicknessMapUv),E.push(M.combine),E.push(M.fogExp2),E.push(M.sizeAttenuation),E.push(M.morphTargetsCount),E.push(M.morphAttributeCount),E.push(M.numDirLights),E.push(M.numPointLights),E.push(M.numSpotLights),E.push(M.numSpotLightMaps),E.push(M.numHemiLights),E.push(M.numRectAreaLights),E.push(M.numDirLightShadows),E.push(M.numPointLightShadows),E.push(M.numSpotLightShadows),E.push(M.numSpotLightShadowsWithMaps),E.push(M.numLightProbes),E.push(M.shadowMapType),E.push(M.toneMapping),E.push(M.numClippingPlanes),E.push(M.numClipIntersection),E.push(M.depthPacking)}function _(E,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),E.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.skinning&&a.enable(4),M.morphTargets&&a.enable(5),M.morphNormals&&a.enable(6),M.morphColors&&a.enable(7),M.premultipliedAlpha&&a.enable(8),M.shadowMapEnabled&&a.enable(9),M.doubleSided&&a.enable(10),M.flipSided&&a.enable(11),M.useDepthPacking&&a.enable(12),M.dithering&&a.enable(13),M.transmission&&a.enable(14),M.sheen&&a.enable(15),M.opaque&&a.enable(16),M.pointsUvs&&a.enable(17),M.decodeVideoTexture&&a.enable(18),M.alphaToCoverage&&a.enable(19),E.push(a.mask)}function b(E){const M=m[E.type];let C;if(M){const O=Cn[M];C=lg.clone(O.uniforms)}else C=E.uniforms;return C}function L(E,M){let C;for(let O=0,N=h.length;O<N;O++){const q=h[O];if(q.cacheKey===M){C=q,++C.usedTimes;break}}return C===void 0&&(C=new ZM(s,M,E,r),h.push(C)),C}function A(E){if(--E.usedTimes===0){const M=h.indexOf(E);h[M]=h[h.length-1],h.pop(),E.destroy()}}function T(E){l.remove(E)}function P(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:b,acquireProgram:L,releaseProgram:A,releaseShaderCache:T,programs:h,dispose:P}}function eS(){let s=new WeakMap;function e(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function t(r){s.delete(r)}function n(r,o,a){s.get(r)[o]=a}function i(){s=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function tS(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Pf(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function If(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(u,d,f,m,x,g){let p=s[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:m,renderOrder:u.renderOrder,z:x,group:g},s[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=x,p.group=g),e++,p}function a(u,d,f,m,x,g){const p=o(u,d,f,m,x,g);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function l(u,d,f,m,x,g){const p=o(u,d,f,m,x,g);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||tS),n.length>1&&n.sort(d||Pf),i.length>1&&i.sort(d||Pf)}function h(){for(let u=e,d=s.length;u<d;u++){const f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:h,sort:c}}function nS(){let s=new WeakMap;function e(n,i){const r=s.get(n);let o;return r===void 0?(o=new If,s.set(n,[o])):i>=r.length?(o=new If,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function iS(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new ge};break;case"SpotLight":t={position:new R,direction:new R,color:new ge,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new ge,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new ge,groundColor:new ge};break;case"RectAreaLight":t={color:new ge,position:new R,halfWidth:new R,halfHeight:new R};break}return s[e.id]=t,t}}}function sS(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let rS=0;function oS(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function aS(s){const e=new iS,t=sS(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new R);const i=new R,r=new Pe,o=new Pe;function a(c){let h=0,u=0,d=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let f=0,m=0,x=0,g=0,p=0,y=0,_=0,b=0,L=0,A=0,T=0;c.sort(oS);for(let E=0,M=c.length;E<M;E++){const C=c[E],O=C.color,N=C.intensity,q=C.distance,Z=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=O.r*N,u+=O.g*N,d+=O.b*N;else if(C.isLightProbe){for(let B=0;B<9;B++)n.probe[B].addScaledVector(C.sh.coefficients[B],N);T++}else if(C.isDirectionalLight){const B=e.get(C);if(B.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const W=C.shadow,H=t.get(C);H.shadowBias=W.bias,H.shadowNormalBias=W.normalBias,H.shadowRadius=W.radius,H.shadowMapSize=W.mapSize,n.directionalShadow[f]=H,n.directionalShadowMap[f]=Z,n.directionalShadowMatrix[f]=C.shadow.matrix,y++}n.directional[f]=B,f++}else if(C.isSpotLight){const B=e.get(C);B.position.setFromMatrixPosition(C.matrixWorld),B.color.copy(O).multiplyScalar(N),B.distance=q,B.coneCos=Math.cos(C.angle),B.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),B.decay=C.decay,n.spot[x]=B;const W=C.shadow;if(C.map&&(n.spotLightMap[L]=C.map,L++,W.updateMatrices(C),C.castShadow&&A++),n.spotLightMatrix[x]=W.matrix,C.castShadow){const H=t.get(C);H.shadowBias=W.bias,H.shadowNormalBias=W.normalBias,H.shadowRadius=W.radius,H.shadowMapSize=W.mapSize,n.spotShadow[x]=H,n.spotShadowMap[x]=Z,b++}x++}else if(C.isRectAreaLight){const B=e.get(C);B.color.copy(O).multiplyScalar(N),B.halfWidth.set(C.width*.5,0,0),B.halfHeight.set(0,C.height*.5,0),n.rectArea[g]=B,g++}else if(C.isPointLight){const B=e.get(C);if(B.color.copy(C.color).multiplyScalar(C.intensity),B.distance=C.distance,B.decay=C.decay,C.castShadow){const W=C.shadow,H=t.get(C);H.shadowBias=W.bias,H.shadowNormalBias=W.normalBias,H.shadowRadius=W.radius,H.shadowMapSize=W.mapSize,H.shadowCameraNear=W.camera.near,H.shadowCameraFar=W.camera.far,n.pointShadow[m]=H,n.pointShadowMap[m]=Z,n.pointShadowMatrix[m]=C.shadow.matrix,_++}n.point[m]=B,m++}else if(C.isHemisphereLight){const B=e.get(C);B.skyColor.copy(C.color).multiplyScalar(N),B.groundColor.copy(C.groundColor).multiplyScalar(N),n.hemi[p]=B,p++}}g>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=fe.LTC_FLOAT_1,n.rectAreaLTC2=fe.LTC_FLOAT_2):(n.rectAreaLTC1=fe.LTC_HALF_1,n.rectAreaLTC2=fe.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const P=n.hash;(P.directionalLength!==f||P.pointLength!==m||P.spotLength!==x||P.rectAreaLength!==g||P.hemiLength!==p||P.numDirectionalShadows!==y||P.numPointShadows!==_||P.numSpotShadows!==b||P.numSpotMaps!==L||P.numLightProbes!==T)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=_,n.pointShadowMap.length=_,n.spotShadow.length=b,n.spotShadowMap.length=b,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=_,n.spotLightMatrix.length=b+L-A,n.spotLightMap.length=L,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=T,P.directionalLength=f,P.pointLength=m,P.spotLength=x,P.rectAreaLength=g,P.hemiLength=p,P.numDirectionalShadows=y,P.numPointShadows=_,P.numSpotShadows=b,P.numSpotMaps=L,P.numLightProbes=T,n.version=rS++)}function l(c,h){let u=0,d=0,f=0,m=0,x=0;const g=h.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){const _=c[p];if(_.isDirectionalLight){const b=n.directional[u];b.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(g),u++}else if(_.isSpotLight){const b=n.spot[f];b.position.setFromMatrixPosition(_.matrixWorld),b.position.applyMatrix4(g),b.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(g),f++}else if(_.isRectAreaLight){const b=n.rectArea[m];b.position.setFromMatrixPosition(_.matrixWorld),b.position.applyMatrix4(g),o.identity(),r.copy(_.matrixWorld),r.premultiply(g),o.extractRotation(r),b.halfWidth.set(_.width*.5,0,0),b.halfHeight.set(0,_.height*.5,0),b.halfWidth.applyMatrix4(o),b.halfHeight.applyMatrix4(o),m++}else if(_.isPointLight){const b=n.point[d];b.position.setFromMatrixPosition(_.matrixWorld),b.position.applyMatrix4(g),d++}else if(_.isHemisphereLight){const b=n.hemi[x];b.direction.setFromMatrixPosition(_.matrixWorld),b.direction.transformDirection(g),x++}}}return{setup:a,setupView:l,state:n}}function Lf(s){const e=new aS(s),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function lS(s){let e=new WeakMap;function t(i,r=0){const o=e.get(i);let a;return o===void 0?(a=new Lf(s),e.set(i,[a])):r>=o.length?(a=new Lf(s),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class Ju extends Yt{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=qm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class ju extends Yt{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const cS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,hS=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function uS(s,e,t){let n=new ta;const i=new K,r=new K,o=new ot,a=new Ju({depthPacking:Ym}),l=new ju,c={},h=t.maxTextureSize,u={[vi]:jt,[jt]:vi,[Pn]:Pn},d=new Un({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new K},radius:{value:4}},vertexShader:cS,fragmentShader:hS}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new He;m.setAttribute("position",new Qe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new ct(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Lu;let p=this.type;this.render=function(A,T,P){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;const E=s.getRenderTarget(),M=s.getActiveCubeFace(),C=s.getActiveMipmapLevel(),O=s.state;O.setBlending(gi),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const N=p!==kn&&this.type===kn,q=p===kn&&this.type!==kn;for(let Z=0,B=A.length;Z<B;Z++){const W=A[Z],H=W.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",W,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;i.copy(H.mapSize);const de=H.getFrameExtents();if(i.multiply(de),r.copy(H.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/de.x),i.x=r.x*de.x,H.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/de.y),i.y=r.y*de.y,H.mapSize.y=r.y)),H.map===null||N===!0||q===!0){const me=this.type!==kn?{minFilter:Ot,magFilter:Ot}:{};H.map!==null&&H.map.dispose(),H.map=new Nn(i.x,i.y,me),H.map.texture.name=W.name+".shadowMap",H.camera.updateProjectionMatrix()}s.setRenderTarget(H.map),s.clear();const pe=H.getViewportCount();for(let me=0;me<pe;me++){const ke=H.getViewport(me);o.set(r.x*ke.x,r.y*ke.y,r.x*ke.z,r.y*ke.w),O.viewport(o),H.updateMatrices(W,me),n=H.getFrustum(),b(T,P,H.camera,W,this.type)}H.isPointLightShadow!==!0&&this.type===kn&&y(H,P),H.needsUpdate=!1}p=this.type,g.needsUpdate=!1,s.setRenderTarget(E,M,C)};function y(A,T){const P=e.update(x);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Nn(i.x,i.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,s.setRenderTarget(A.mapPass),s.clear(),s.renderBufferDirect(T,null,P,d,x,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,s.setRenderTarget(A.map),s.clear(),s.renderBufferDirect(T,null,P,f,x,null)}function _(A,T,P,E){let M=null;const C=P.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(C!==void 0)M=C;else if(M=P.isPointLight===!0?l:a,s.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const O=M.uuid,N=T.uuid;let q=c[O];q===void 0&&(q={},c[O]=q);let Z=q[N];Z===void 0&&(Z=M.clone(),q[N]=Z,T.addEventListener("dispose",L)),M=Z}if(M.visible=T.visible,M.wireframe=T.wireframe,E===kn?M.side=T.shadowSide!==null?T.shadowSide:T.side:M.side=T.shadowSide!==null?T.shadowSide:u[T.side],M.alphaMap=T.alphaMap,M.alphaTest=T.alphaTest,M.map=T.map,M.clipShadows=T.clipShadows,M.clippingPlanes=T.clippingPlanes,M.clipIntersection=T.clipIntersection,M.displacementMap=T.displacementMap,M.displacementScale=T.displacementScale,M.displacementBias=T.displacementBias,M.wireframeLinewidth=T.wireframeLinewidth,M.linewidth=T.linewidth,P.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const O=s.properties.get(M);O.light=P}return M}function b(A,T,P,E,M){if(A.visible===!1)return;if(A.layers.test(T.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&M===kn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,A.matrixWorld);const N=e.update(A),q=A.material;if(Array.isArray(q)){const Z=N.groups;for(let B=0,W=Z.length;B<W;B++){const H=Z[B],de=q[H.materialIndex];if(de&&de.visible){const pe=_(A,de,E,M);A.onBeforeShadow(s,A,T,P,N,pe,H),s.renderBufferDirect(P,null,N,pe,A,H),A.onAfterShadow(s,A,T,P,N,pe,H)}}}else if(q.visible){const Z=_(A,q,E,M);A.onBeforeShadow(s,A,T,P,N,Z,null),s.renderBufferDirect(P,null,N,Z,A,null),A.onAfterShadow(s,A,T,P,N,Z,null)}}const O=A.children;for(let N=0,q=O.length;N<q;N++)b(O[N],T,P,E,M)}function L(A){A.target.removeEventListener("dispose",L);for(const P in c){const E=c[P],M=A.target.uuid;M in E&&(E[M].dispose(),delete E[M])}}}function dS(s){function e(){let v=!1;const X=new ot;let z=null;const Y=new ot(0,0,0,0);return{setMask:function(ne){z!==ne&&!v&&(s.colorMask(ne,ne,ne,ne),z=ne)},setLocked:function(ne){v=ne},setClear:function(ne,Ae,ze,ft,Et){Et===!0&&(ne*=ft,Ae*=ft,ze*=ft),X.set(ne,Ae,ze,ft),Y.equals(X)===!1&&(s.clearColor(ne,Ae,ze,ft),Y.copy(X))},reset:function(){v=!1,z=null,Y.set(-1,0,0,0)}}}function t(){let v=!1,X=null,z=null,Y=null;return{setTest:function(ne){ne?be(s.DEPTH_TEST):le(s.DEPTH_TEST)},setMask:function(ne){X!==ne&&!v&&(s.depthMask(ne),X=ne)},setFunc:function(ne){if(z!==ne){switch(ne){case _m:s.depthFunc(s.NEVER);break;case ym:s.depthFunc(s.ALWAYS);break;case vm:s.depthFunc(s.LESS);break;case Mo:s.depthFunc(s.LEQUAL);break;case bm:s.depthFunc(s.EQUAL);break;case Mm:s.depthFunc(s.GEQUAL);break;case Sm:s.depthFunc(s.GREATER);break;case Em:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}z=ne}},setLocked:function(ne){v=ne},setClear:function(ne){Y!==ne&&(s.clearDepth(ne),Y=ne)},reset:function(){v=!1,X=null,z=null,Y=null}}}function n(){let v=!1,X=null,z=null,Y=null,ne=null,Ae=null,ze=null,ft=null,Et=null;return{setTest:function(tt){v||(tt?be(s.STENCIL_TEST):le(s.STENCIL_TEST))},setMask:function(tt){X!==tt&&!v&&(s.stencilMask(tt),X=tt)},setFunc:function(tt,wt,Tt){(z!==tt||Y!==wt||ne!==Tt)&&(s.stencilFunc(tt,wt,Tt),z=tt,Y=wt,ne=Tt)},setOp:function(tt,wt,Tt){(Ae!==tt||ze!==wt||ft!==Tt)&&(s.stencilOp(tt,wt,Tt),Ae=tt,ze=wt,ft=Tt)},setLocked:function(tt){v=tt},setClear:function(tt){Et!==tt&&(s.clearStencil(tt),Et=tt)},reset:function(){v=!1,X=null,z=null,Y=null,ne=null,Ae=null,ze=null,ft=null,Et=null}}}const i=new e,r=new t,o=new n,a=new WeakMap,l=new WeakMap;let c={},h={},u=new WeakMap,d=[],f=null,m=!1,x=null,g=null,p=null,y=null,_=null,b=null,L=null,A=new ge(0,0,0),T=0,P=!1,E=null,M=null,C=null,O=null,N=null;const q=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,B=0;const W=s.getParameter(s.VERSION);W.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(W)[1]),Z=B>=1):W.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),Z=B>=2);let H=null,de={};const pe=s.getParameter(s.SCISSOR_BOX),me=s.getParameter(s.VIEWPORT),ke=new ot().fromArray(pe),Ze=new ot().fromArray(me);function $(v,X,z,Y){const ne=new Uint8Array(4),Ae=s.createTexture();s.bindTexture(v,Ae),s.texParameteri(v,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(v,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ze=0;ze<z;ze++)v===s.TEXTURE_3D||v===s.TEXTURE_2D_ARRAY?s.texImage3D(X,0,s.RGBA,1,1,Y,0,s.RGBA,s.UNSIGNED_BYTE,ne):s.texImage2D(X+ze,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ne);return Ae}const re={};re[s.TEXTURE_2D]=$(s.TEXTURE_2D,s.TEXTURE_2D,1),re[s.TEXTURE_CUBE_MAP]=$(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),re[s.TEXTURE_2D_ARRAY]=$(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),re[s.TEXTURE_3D]=$(s.TEXTURE_3D,s.TEXTURE_3D,1,1),i.setClear(0,0,0,1),r.setClear(1),o.setClear(0),be(s.DEPTH_TEST),r.setFunc(Mo),ie(!1),se(Ch),be(s.CULL_FACE),ee(gi);function be(v){c[v]!==!0&&(s.enable(v),c[v]=!0)}function le(v){c[v]!==!1&&(s.disable(v),c[v]=!1)}function Oe(v,X){return h[v]!==X?(s.bindFramebuffer(v,X),h[v]=X,v===s.DRAW_FRAMEBUFFER&&(h[s.FRAMEBUFFER]=X),v===s.FRAMEBUFFER&&(h[s.DRAW_FRAMEBUFFER]=X),!0):!1}function Fe(v,X){let z=d,Y=!1;if(v){z=u.get(X),z===void 0&&(z=[],u.set(X,z));const ne=v.textures;if(z.length!==ne.length||z[0]!==s.COLOR_ATTACHMENT0){for(let Ae=0,ze=ne.length;Ae<ze;Ae++)z[Ae]=s.COLOR_ATTACHMENT0+Ae;z.length=ne.length,Y=!0}}else z[0]!==s.BACK&&(z[0]=s.BACK,Y=!0);Y&&s.drawBuffers(z)}function De(v){return f!==v?(s.useProgram(v),f=v,!0):!1}const D={[zi]:s.FUNC_ADD,[tm]:s.FUNC_SUBTRACT,[nm]:s.FUNC_REVERSE_SUBTRACT};D[im]=s.MIN,D[sm]=s.MAX;const J={[rm]:s.ZERO,[om]:s.ONE,[am]:s.SRC_COLOR,[wl]:s.SRC_ALPHA,[fm]:s.SRC_ALPHA_SATURATE,[um]:s.DST_COLOR,[cm]:s.DST_ALPHA,[lm]:s.ONE_MINUS_SRC_COLOR,[Tl]:s.ONE_MINUS_SRC_ALPHA,[dm]:s.ONE_MINUS_DST_COLOR,[hm]:s.ONE_MINUS_DST_ALPHA,[pm]:s.CONSTANT_COLOR,[mm]:s.ONE_MINUS_CONSTANT_COLOR,[gm]:s.CONSTANT_ALPHA,[xm]:s.ONE_MINUS_CONSTANT_ALPHA};function ee(v,X,z,Y,ne,Ae,ze,ft,Et,tt){if(v===gi){m===!0&&(le(s.BLEND),m=!1);return}if(m===!1&&(be(s.BLEND),m=!0),v!==em){if(v!==x||tt!==P){if((g!==zi||_!==zi)&&(s.blendEquation(s.FUNC_ADD),g=zi,_=zi),tt)switch(v){case Is:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case El:s.blendFunc(s.ONE,s.ONE);break;case Ph:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ih:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",v);break}else switch(v){case Is:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case El:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Ph:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ih:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",v);break}p=null,y=null,b=null,L=null,A.set(0,0,0),T=0,x=v,P=tt}return}ne=ne||X,Ae=Ae||z,ze=ze||Y,(X!==g||ne!==_)&&(s.blendEquationSeparate(D[X],D[ne]),g=X,_=ne),(z!==p||Y!==y||Ae!==b||ze!==L)&&(s.blendFuncSeparate(J[z],J[Y],J[Ae],J[ze]),p=z,y=Y,b=Ae,L=ze),(ft.equals(A)===!1||Et!==T)&&(s.blendColor(ft.r,ft.g,ft.b,Et),A.copy(ft),T=Et),x=v,P=!1}function oe(v,X){v.side===Pn?le(s.CULL_FACE):be(s.CULL_FACE);let z=v.side===jt;X&&(z=!z),ie(z),v.blending===Is&&v.transparent===!1?ee(gi):ee(v.blending,v.blendEquation,v.blendSrc,v.blendDst,v.blendEquationAlpha,v.blendSrcAlpha,v.blendDstAlpha,v.blendColor,v.blendAlpha,v.premultipliedAlpha),r.setFunc(v.depthFunc),r.setTest(v.depthTest),r.setMask(v.depthWrite),i.setMask(v.colorWrite);const Y=v.stencilWrite;o.setTest(Y),Y&&(o.setMask(v.stencilWriteMask),o.setFunc(v.stencilFunc,v.stencilRef,v.stencilFuncMask),o.setOp(v.stencilFail,v.stencilZFail,v.stencilZPass)),xe(v.polygonOffset,v.polygonOffsetFactor,v.polygonOffsetUnits),v.alphaToCoverage===!0?be(s.SAMPLE_ALPHA_TO_COVERAGE):le(s.SAMPLE_ALPHA_TO_COVERAGE)}function ie(v){E!==v&&(v?s.frontFace(s.CW):s.frontFace(s.CCW),E=v)}function se(v){v!==Jp?(be(s.CULL_FACE),v!==M&&(v===Ch?s.cullFace(s.BACK):v===jp?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):le(s.CULL_FACE),M=v}function ye(v){v!==C&&(Z&&s.lineWidth(v),C=v)}function xe(v,X,z){v?(be(s.POLYGON_OFFSET_FILL),(O!==X||N!==z)&&(s.polygonOffset(X,z),O=X,N=z)):le(s.POLYGON_OFFSET_FILL)}function Ne(v){v?be(s.SCISSOR_TEST):le(s.SCISSOR_TEST)}function I(v){v===void 0&&(v=s.TEXTURE0+q-1),H!==v&&(s.activeTexture(v),H=v)}function S(v,X,z){z===void 0&&(H===null?z=s.TEXTURE0+q-1:z=H);let Y=de[z];Y===void 0&&(Y={type:void 0,texture:void 0},de[z]=Y),(Y.type!==v||Y.texture!==X)&&(H!==z&&(s.activeTexture(z),H=z),s.bindTexture(v,X||re[v]),Y.type=v,Y.texture=X)}function V(){const v=de[H];v!==void 0&&v.type!==void 0&&(s.bindTexture(v.type,null),v.type=void 0,v.texture=void 0)}function Q(){try{s.compressedTexImage2D.apply(s,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function j(){try{s.compressedTexImage3D.apply(s,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function te(){try{s.texSubImage2D.apply(s,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function Te(){try{s.texSubImage3D.apply(s,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function he(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function ue(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function Be(){try{s.texStorage2D.apply(s,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function ae(){try{s.texStorage3D.apply(s,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function Se(){try{s.texImage2D.apply(s,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function Ke(){try{s.texImage3D.apply(s,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function Ie(v){ke.equals(v)===!1&&(s.scissor(v.x,v.y,v.z,v.w),ke.copy(v))}function _e(v){Ze.equals(v)===!1&&(s.viewport(v.x,v.y,v.z,v.w),Ze.copy(v))}function Ve(v,X){let z=l.get(X);z===void 0&&(z=new WeakMap,l.set(X,z));let Y=z.get(v);Y===void 0&&(Y=s.getUniformBlockIndex(X,v.name),z.set(v,Y))}function Ge(v,X){const Y=l.get(X).get(v);a.get(X)!==Y&&(s.uniformBlockBinding(X,Y,v.__bindingPointIndex),a.set(X,Y))}function dt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),c={},H=null,de={},h={},u=new WeakMap,d=[],f=null,m=!1,x=null,g=null,p=null,y=null,_=null,b=null,L=null,A=new ge(0,0,0),T=0,P=!1,E=null,M=null,C=null,O=null,N=null,ke.set(0,0,s.canvas.width,s.canvas.height),Ze.set(0,0,s.canvas.width,s.canvas.height),i.reset(),r.reset(),o.reset()}return{buffers:{color:i,depth:r,stencil:o},enable:be,disable:le,bindFramebuffer:Oe,drawBuffers:Fe,useProgram:De,setBlending:ee,setMaterial:oe,setFlipSided:ie,setCullFace:se,setLineWidth:ye,setPolygonOffset:xe,setScissorTest:Ne,activeTexture:I,bindTexture:S,unbindTexture:V,compressedTexImage2D:Q,compressedTexImage3D:j,texImage2D:Se,texImage3D:Ke,updateUBOMapping:Ve,uniformBlockBinding:Ge,texStorage2D:Be,texStorage3D:ae,texSubImage2D:te,texSubImage3D:Te,compressedTexSubImage2D:he,compressedTexSubImage3D:ue,scissor:Ie,viewport:_e,reset:dt}}function fS(s,e,t,n,i,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new K,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(I,S){return f?new OffscreenCanvas(I,S):Uo("canvas")}function x(I,S,V){let Q=1;const j=Ne(I);if((j.width>V||j.height>V)&&(Q=V/Math.max(j.width,j.height)),Q<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const te=Math.floor(Q*j.width),Te=Math.floor(Q*j.height);u===void 0&&(u=m(te,Te));const he=S?m(te,Te):u;return he.width=te,he.height=Te,he.getContext("2d").drawImage(I,0,0,te,Te),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+te+"x"+Te+")."),he}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),I;return I}function g(I){return I.generateMipmaps&&I.minFilter!==Ot&&I.minFilter!==Rt}function p(I){s.generateMipmap(I)}function y(I,S,V,Q,j=!1){if(I!==null){if(s[I]!==void 0)return s[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let te=S;if(S===s.RED&&(V===s.FLOAT&&(te=s.R32F),V===s.HALF_FLOAT&&(te=s.R16F),V===s.UNSIGNED_BYTE&&(te=s.R8)),S===s.RED_INTEGER&&(V===s.UNSIGNED_BYTE&&(te=s.R8UI),V===s.UNSIGNED_SHORT&&(te=s.R16UI),V===s.UNSIGNED_INT&&(te=s.R32UI),V===s.BYTE&&(te=s.R8I),V===s.SHORT&&(te=s.R16I),V===s.INT&&(te=s.R32I)),S===s.RG&&(V===s.FLOAT&&(te=s.RG32F),V===s.HALF_FLOAT&&(te=s.RG16F),V===s.UNSIGNED_BYTE&&(te=s.RG8)),S===s.RG_INTEGER&&(V===s.UNSIGNED_BYTE&&(te=s.RG8UI),V===s.UNSIGNED_SHORT&&(te=s.RG16UI),V===s.UNSIGNED_INT&&(te=s.RG32UI),V===s.BYTE&&(te=s.RG8I),V===s.SHORT&&(te=s.RG16I),V===s.INT&&(te=s.RG32I)),S===s.RGB&&V===s.UNSIGNED_INT_5_9_9_9_REV&&(te=s.RGB9_E5),S===s.RGBA){const Te=j?Po:nt.getTransfer(Q);V===s.FLOAT&&(te=s.RGBA32F),V===s.HALF_FLOAT&&(te=s.RGBA16F),V===s.UNSIGNED_BYTE&&(te=Te===lt?s.SRGB8_ALPHA8:s.RGBA8),V===s.UNSIGNED_SHORT_4_4_4_4&&(te=s.RGBA4),V===s.UNSIGNED_SHORT_5_5_5_1&&(te=s.RGB5_A1)}return(te===s.R16F||te===s.R32F||te===s.RG16F||te===s.RG32F||te===s.RGBA16F||te===s.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function _(I,S){let V;return I?S===null||S===Os||S===Fs?V=s.DEPTH24_STENCIL8:S===mn?V=s.DEPTH32F_STENCIL8:S===Ao&&(V=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Os||S===Fs?V=s.DEPTH_COMPONENT24:S===mn?V=s.DEPTH_COMPONENT32F:S===Ao&&(V=s.DEPTH_COMPONENT16),V}function b(I,S){return g(I)===!0||I.isFramebufferTexture&&I.minFilter!==Ot&&I.minFilter!==Rt?Math.log2(Math.max(S.width,S.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?S.mipmaps.length:1}function L(I){const S=I.target;S.removeEventListener("dispose",L),T(S),S.isVideoTexture&&h.delete(S)}function A(I){const S=I.target;S.removeEventListener("dispose",A),E(S)}function T(I){const S=n.get(I);if(S.__webglInit===void 0)return;const V=I.source,Q=d.get(V);if(Q){const j=Q[S.__cacheKey];j.usedTimes--,j.usedTimes===0&&P(I),Object.keys(Q).length===0&&d.delete(V)}n.remove(I)}function P(I){const S=n.get(I);s.deleteTexture(S.__webglTexture);const V=I.source,Q=d.get(V);delete Q[S.__cacheKey],o.memory.textures--}function E(I){const S=n.get(I);if(I.depthTexture&&I.depthTexture.dispose(),I.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(S.__webglFramebuffer[Q]))for(let j=0;j<S.__webglFramebuffer[Q].length;j++)s.deleteFramebuffer(S.__webglFramebuffer[Q][j]);else s.deleteFramebuffer(S.__webglFramebuffer[Q]);S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer[Q])}else{if(Array.isArray(S.__webglFramebuffer))for(let Q=0;Q<S.__webglFramebuffer.length;Q++)s.deleteFramebuffer(S.__webglFramebuffer[Q]);else s.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&s.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let Q=0;Q<S.__webglColorRenderbuffer.length;Q++)S.__webglColorRenderbuffer[Q]&&s.deleteRenderbuffer(S.__webglColorRenderbuffer[Q]);S.__webglDepthRenderbuffer&&s.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const V=I.textures;for(let Q=0,j=V.length;Q<j;Q++){const te=n.get(V[Q]);te.__webglTexture&&(s.deleteTexture(te.__webglTexture),o.memory.textures--),n.remove(V[Q])}n.remove(I)}let M=0;function C(){M=0}function O(){const I=M;return I>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+i.maxTextures),M+=1,I}function N(I){const S=[];return S.push(I.wrapS),S.push(I.wrapT),S.push(I.wrapR||0),S.push(I.magFilter),S.push(I.minFilter),S.push(I.anisotropy),S.push(I.internalFormat),S.push(I.format),S.push(I.type),S.push(I.generateMipmaps),S.push(I.premultiplyAlpha),S.push(I.flipY),S.push(I.unpackAlignment),S.push(I.colorSpace),S.join()}function q(I,S){const V=n.get(I);if(I.isVideoTexture&&ye(I),I.isRenderTargetTexture===!1&&I.version>0&&V.__version!==I.version){const Q=I.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ze(V,I,S);return}}t.bindTexture(s.TEXTURE_2D,V.__webglTexture,s.TEXTURE0+S)}function Z(I,S){const V=n.get(I);if(I.version>0&&V.__version!==I.version){Ze(V,I,S);return}t.bindTexture(s.TEXTURE_2D_ARRAY,V.__webglTexture,s.TEXTURE0+S)}function B(I,S){const V=n.get(I);if(I.version>0&&V.__version!==I.version){Ze(V,I,S);return}t.bindTexture(s.TEXTURE_3D,V.__webglTexture,s.TEXTURE0+S)}function W(I,S){const V=n.get(I);if(I.version>0&&V.__version!==I.version){$(V,I,S);return}t.bindTexture(s.TEXTURE_CUBE_MAP,V.__webglTexture,s.TEXTURE0+S)}const H={[wo]:s.REPEAT,[Mn]:s.CLAMP_TO_EDGE,[To]:s.MIRRORED_REPEAT},de={[Ot]:s.NEAREST,[Nu]:s.NEAREST_MIPMAP_NEAREST,[Er]:s.NEAREST_MIPMAP_LINEAR,[Rt]:s.LINEAR,[po]:s.LINEAR_MIPMAP_NEAREST,[Vn]:s.LINEAR_MIPMAP_LINEAR},pe={[Zm]:s.NEVER,[tg]:s.ALWAYS,[Km]:s.LESS,[Gu]:s.LEQUAL,[Jm]:s.EQUAL,[eg]:s.GEQUAL,[jm]:s.GREATER,[Qm]:s.NOTEQUAL};function me(I,S){if(S.type===mn&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===Rt||S.magFilter===po||S.magFilter===Er||S.magFilter===Vn||S.minFilter===Rt||S.minFilter===po||S.minFilter===Er||S.minFilter===Vn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(I,s.TEXTURE_WRAP_S,H[S.wrapS]),s.texParameteri(I,s.TEXTURE_WRAP_T,H[S.wrapT]),(I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY)&&s.texParameteri(I,s.TEXTURE_WRAP_R,H[S.wrapR]),s.texParameteri(I,s.TEXTURE_MAG_FILTER,de[S.magFilter]),s.texParameteri(I,s.TEXTURE_MIN_FILTER,de[S.minFilter]),S.compareFunction&&(s.texParameteri(I,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(I,s.TEXTURE_COMPARE_FUNC,pe[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Ot||S.minFilter!==Er&&S.minFilter!==Vn||S.type===mn&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");s.texParameterf(I,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function ke(I,S){let V=!1;I.__webglInit===void 0&&(I.__webglInit=!0,S.addEventListener("dispose",L));const Q=S.source;let j=d.get(Q);j===void 0&&(j={},d.set(Q,j));const te=N(S);if(te!==I.__cacheKey){j[te]===void 0&&(j[te]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,V=!0),j[te].usedTimes++;const Te=j[I.__cacheKey];Te!==void 0&&(j[I.__cacheKey].usedTimes--,Te.usedTimes===0&&P(S)),I.__cacheKey=te,I.__webglTexture=j[te].texture}return V}function Ze(I,S,V){let Q=s.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(Q=s.TEXTURE_2D_ARRAY),S.isData3DTexture&&(Q=s.TEXTURE_3D);const j=ke(I,S),te=S.source;t.bindTexture(Q,I.__webglTexture,s.TEXTURE0+V);const Te=n.get(te);if(te.version!==Te.__version||j===!0){t.activeTexture(s.TEXTURE0+V);const he=nt.getPrimaries(nt.workingColorSpace),ue=S.colorSpace===ci?null:nt.getPrimaries(S.colorSpace),Be=S.colorSpace===ci||he===ue?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Be);let ae=x(S.image,!1,i.maxTextureSize);ae=xe(S,ae);const Se=r.convert(S.format,S.colorSpace),Ke=r.convert(S.type);let Ie=y(S.internalFormat,Se,Ke,S.colorSpace,S.isVideoTexture);me(Q,S);let _e;const Ve=S.mipmaps,Ge=S.isVideoTexture!==!0,dt=Te.__version===void 0||j===!0,v=te.dataReady,X=b(S,ae);if(S.isDepthTexture)Ie=_(S.format===Bs,S.type),dt&&(Ge?t.texStorage2D(s.TEXTURE_2D,1,Ie,ae.width,ae.height):t.texImage2D(s.TEXTURE_2D,0,Ie,ae.width,ae.height,0,Se,Ke,null));else if(S.isDataTexture)if(Ve.length>0){Ge&&dt&&t.texStorage2D(s.TEXTURE_2D,X,Ie,Ve[0].width,Ve[0].height);for(let z=0,Y=Ve.length;z<Y;z++)_e=Ve[z],Ge?v&&t.texSubImage2D(s.TEXTURE_2D,z,0,0,_e.width,_e.height,Se,Ke,_e.data):t.texImage2D(s.TEXTURE_2D,z,Ie,_e.width,_e.height,0,Se,Ke,_e.data);S.generateMipmaps=!1}else Ge?(dt&&t.texStorage2D(s.TEXTURE_2D,X,Ie,ae.width,ae.height),v&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,ae.width,ae.height,Se,Ke,ae.data)):t.texImage2D(s.TEXTURE_2D,0,Ie,ae.width,ae.height,0,Se,Ke,ae.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Ge&&dt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,X,Ie,Ve[0].width,Ve[0].height,ae.depth);for(let z=0,Y=Ve.length;z<Y;z++)if(_e=Ve[z],S.format!==sn)if(Se!==null)if(Ge){if(v)if(S.layerUpdates.size>0){for(const ne of S.layerUpdates){const Ae=_e.width*_e.height;t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,z,0,0,ne,_e.width,_e.height,1,Se,_e.data.slice(Ae*ne,Ae*(ne+1)),0,0)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,z,0,0,0,_e.width,_e.height,ae.depth,Se,_e.data,0,0)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,z,Ie,_e.width,_e.height,ae.depth,0,_e.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ge?v&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,z,0,0,0,_e.width,_e.height,ae.depth,Se,Ke,_e.data):t.texImage3D(s.TEXTURE_2D_ARRAY,z,Ie,_e.width,_e.height,ae.depth,0,Se,Ke,_e.data)}else{Ge&&dt&&t.texStorage2D(s.TEXTURE_2D,X,Ie,Ve[0].width,Ve[0].height);for(let z=0,Y=Ve.length;z<Y;z++)_e=Ve[z],S.format!==sn?Se!==null?Ge?v&&t.compressedTexSubImage2D(s.TEXTURE_2D,z,0,0,_e.width,_e.height,Se,_e.data):t.compressedTexImage2D(s.TEXTURE_2D,z,Ie,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ge?v&&t.texSubImage2D(s.TEXTURE_2D,z,0,0,_e.width,_e.height,Se,Ke,_e.data):t.texImage2D(s.TEXTURE_2D,z,Ie,_e.width,_e.height,0,Se,Ke,_e.data)}else if(S.isDataArrayTexture)if(Ge){if(dt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,X,Ie,ae.width,ae.height,ae.depth),v)if(S.layerUpdates.size>0){let z;switch(Ke){case s.UNSIGNED_BYTE:switch(Se){case s.ALPHA:z=1;break;case s.LUMINANCE:z=1;break;case s.LUMINANCE_ALPHA:z=2;break;case s.RGB:z=3;break;case s.RGBA:z=4;break;default:throw new Error(`Unknown texel size for format ${Se}.`)}break;case s.UNSIGNED_SHORT_4_4_4_4:case s.UNSIGNED_SHORT_5_5_5_1:case s.UNSIGNED_SHORT_5_6_5:z=1;break;default:throw new Error(`Unknown texel size for type ${Ke}.`)}const Y=ae.width*ae.height*z;for(const ne of S.layerUpdates)t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ne,ae.width,ae.height,1,Se,Ke,ae.data.slice(Y*ne,Y*(ne+1)));S.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ae.width,ae.height,ae.depth,Se,Ke,ae.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Ie,ae.width,ae.height,ae.depth,0,Se,Ke,ae.data);else if(S.isData3DTexture)Ge?(dt&&t.texStorage3D(s.TEXTURE_3D,X,Ie,ae.width,ae.height,ae.depth),v&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ae.width,ae.height,ae.depth,Se,Ke,ae.data)):t.texImage3D(s.TEXTURE_3D,0,Ie,ae.width,ae.height,ae.depth,0,Se,Ke,ae.data);else if(S.isFramebufferTexture){if(dt)if(Ge)t.texStorage2D(s.TEXTURE_2D,X,Ie,ae.width,ae.height);else{let z=ae.width,Y=ae.height;for(let ne=0;ne<X;ne++)t.texImage2D(s.TEXTURE_2D,ne,Ie,z,Y,0,Se,Ke,null),z>>=1,Y>>=1}}else if(Ve.length>0){if(Ge&&dt){const z=Ne(Ve[0]);t.texStorage2D(s.TEXTURE_2D,X,Ie,z.width,z.height)}for(let z=0,Y=Ve.length;z<Y;z++)_e=Ve[z],Ge?v&&t.texSubImage2D(s.TEXTURE_2D,z,0,0,Se,Ke,_e):t.texImage2D(s.TEXTURE_2D,z,Ie,Se,Ke,_e);S.generateMipmaps=!1}else if(Ge){if(dt){const z=Ne(ae);t.texStorage2D(s.TEXTURE_2D,X,Ie,z.width,z.height)}v&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Se,Ke,ae)}else t.texImage2D(s.TEXTURE_2D,0,Ie,Se,Ke,ae);g(S)&&p(Q),Te.__version=te.version,S.onUpdate&&S.onUpdate(S)}I.__version=S.version}function $(I,S,V){if(S.image.length!==6)return;const Q=ke(I,S),j=S.source;t.bindTexture(s.TEXTURE_CUBE_MAP,I.__webglTexture,s.TEXTURE0+V);const te=n.get(j);if(j.version!==te.__version||Q===!0){t.activeTexture(s.TEXTURE0+V);const Te=nt.getPrimaries(nt.workingColorSpace),he=S.colorSpace===ci?null:nt.getPrimaries(S.colorSpace),ue=S.colorSpace===ci||Te===he?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);const Be=S.isCompressedTexture||S.image[0].isCompressedTexture,ae=S.image[0]&&S.image[0].isDataTexture,Se=[];for(let Y=0;Y<6;Y++)!Be&&!ae?Se[Y]=x(S.image[Y],!0,i.maxCubemapSize):Se[Y]=ae?S.image[Y].image:S.image[Y],Se[Y]=xe(S,Se[Y]);const Ke=Se[0],Ie=r.convert(S.format,S.colorSpace),_e=r.convert(S.type),Ve=y(S.internalFormat,Ie,_e,S.colorSpace),Ge=S.isVideoTexture!==!0,dt=te.__version===void 0||Q===!0,v=j.dataReady;let X=b(S,Ke);me(s.TEXTURE_CUBE_MAP,S);let z;if(Be){Ge&&dt&&t.texStorage2D(s.TEXTURE_CUBE_MAP,X,Ve,Ke.width,Ke.height);for(let Y=0;Y<6;Y++){z=Se[Y].mipmaps;for(let ne=0;ne<z.length;ne++){const Ae=z[ne];S.format!==sn?Ie!==null?Ge?v&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ne,0,0,Ae.width,Ae.height,Ie,Ae.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ne,Ve,Ae.width,Ae.height,0,Ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ge?v&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ne,0,0,Ae.width,Ae.height,Ie,_e,Ae.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ne,Ve,Ae.width,Ae.height,0,Ie,_e,Ae.data)}}}else{if(z=S.mipmaps,Ge&&dt){z.length>0&&X++;const Y=Ne(Se[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,X,Ve,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(ae){Ge?v&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Se[Y].width,Se[Y].height,Ie,_e,Se[Y].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Ve,Se[Y].width,Se[Y].height,0,Ie,_e,Se[Y].data);for(let ne=0;ne<z.length;ne++){const ze=z[ne].image[Y].image;Ge?v&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ne+1,0,0,ze.width,ze.height,Ie,_e,ze.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ne+1,Ve,ze.width,ze.height,0,Ie,_e,ze.data)}}else{Ge?v&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Ie,_e,Se[Y]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Ve,Ie,_e,Se[Y]);for(let ne=0;ne<z.length;ne++){const Ae=z[ne];Ge?v&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ne+1,0,0,Ie,_e,Ae.image[Y]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ne+1,Ve,Ie,_e,Ae.image[Y])}}}g(S)&&p(s.TEXTURE_CUBE_MAP),te.__version=j.version,S.onUpdate&&S.onUpdate(S)}I.__version=S.version}function re(I,S,V,Q,j,te){const Te=r.convert(V.format,V.colorSpace),he=r.convert(V.type),ue=y(V.internalFormat,Te,he,V.colorSpace);if(!n.get(S).__hasExternalTextures){const ae=Math.max(1,S.width>>te),Se=Math.max(1,S.height>>te);j===s.TEXTURE_3D||j===s.TEXTURE_2D_ARRAY?t.texImage3D(j,te,ue,ae,Se,S.depth,0,Te,he,null):t.texImage2D(j,te,ue,ae,Se,0,Te,he,null)}t.bindFramebuffer(s.FRAMEBUFFER,I),se(S)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Q,j,n.get(V).__webglTexture,0,ie(S)):(j===s.TEXTURE_2D||j>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,Q,j,n.get(V).__webglTexture,te),t.bindFramebuffer(s.FRAMEBUFFER,null)}function be(I,S,V){if(s.bindRenderbuffer(s.RENDERBUFFER,I),S.depthBuffer){const Q=S.depthTexture,j=Q&&Q.isDepthTexture?Q.type:null,te=_(S.stencilBuffer,j),Te=S.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,he=ie(S);se(S)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,he,te,S.width,S.height):V?s.renderbufferStorageMultisample(s.RENDERBUFFER,he,te,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,te,S.width,S.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Te,s.RENDERBUFFER,I)}else{const Q=S.textures;for(let j=0;j<Q.length;j++){const te=Q[j],Te=r.convert(te.format,te.colorSpace),he=r.convert(te.type),ue=y(te.internalFormat,Te,he,te.colorSpace),Be=ie(S);V&&se(S)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Be,ue,S.width,S.height):se(S)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Be,ue,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,ue,S.width,S.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function le(I,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,I),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),q(S.depthTexture,0);const Q=n.get(S.depthTexture).__webglTexture,j=ie(S);if(S.depthTexture.format===Ls)se(S)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Q,0,j):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Q,0);else if(S.depthTexture.format===Bs)se(S)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Q,0,j):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Oe(I){const S=n.get(I),V=I.isWebGLCubeRenderTarget===!0;if(I.depthTexture&&!S.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");le(S.__webglFramebuffer,I)}else if(V){S.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer[Q]),S.__webglDepthbuffer[Q]=s.createRenderbuffer(),be(S.__webglDepthbuffer[Q],I,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer=s.createRenderbuffer(),be(S.__webglDepthbuffer,I,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function Fe(I,S,V){const Q=n.get(I);S!==void 0&&re(Q.__webglFramebuffer,I,I.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),V!==void 0&&Oe(I)}function De(I){const S=I.texture,V=n.get(I),Q=n.get(S);I.addEventListener("dispose",A);const j=I.textures,te=I.isWebGLCubeRenderTarget===!0,Te=j.length>1;if(Te||(Q.__webglTexture===void 0&&(Q.__webglTexture=s.createTexture()),Q.__version=S.version,o.memory.textures++),te){V.__webglFramebuffer=[];for(let he=0;he<6;he++)if(S.mipmaps&&S.mipmaps.length>0){V.__webglFramebuffer[he]=[];for(let ue=0;ue<S.mipmaps.length;ue++)V.__webglFramebuffer[he][ue]=s.createFramebuffer()}else V.__webglFramebuffer[he]=s.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){V.__webglFramebuffer=[];for(let he=0;he<S.mipmaps.length;he++)V.__webglFramebuffer[he]=s.createFramebuffer()}else V.__webglFramebuffer=s.createFramebuffer();if(Te)for(let he=0,ue=j.length;he<ue;he++){const Be=n.get(j[he]);Be.__webglTexture===void 0&&(Be.__webglTexture=s.createTexture(),o.memory.textures++)}if(I.samples>0&&se(I)===!1){V.__webglMultisampledFramebuffer=s.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let he=0;he<j.length;he++){const ue=j[he];V.__webglColorRenderbuffer[he]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,V.__webglColorRenderbuffer[he]);const Be=r.convert(ue.format,ue.colorSpace),ae=r.convert(ue.type),Se=y(ue.internalFormat,Be,ae,ue.colorSpace,I.isXRRenderTarget===!0),Ke=ie(I);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ke,Se,I.width,I.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+he,s.RENDERBUFFER,V.__webglColorRenderbuffer[he])}s.bindRenderbuffer(s.RENDERBUFFER,null),I.depthBuffer&&(V.__webglDepthRenderbuffer=s.createRenderbuffer(),be(V.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(te){t.bindTexture(s.TEXTURE_CUBE_MAP,Q.__webglTexture),me(s.TEXTURE_CUBE_MAP,S);for(let he=0;he<6;he++)if(S.mipmaps&&S.mipmaps.length>0)for(let ue=0;ue<S.mipmaps.length;ue++)re(V.__webglFramebuffer[he][ue],I,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+he,ue);else re(V.__webglFramebuffer[he],I,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+he,0);g(S)&&p(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Te){for(let he=0,ue=j.length;he<ue;he++){const Be=j[he],ae=n.get(Be);t.bindTexture(s.TEXTURE_2D,ae.__webglTexture),me(s.TEXTURE_2D,Be),re(V.__webglFramebuffer,I,Be,s.COLOR_ATTACHMENT0+he,s.TEXTURE_2D,0),g(Be)&&p(s.TEXTURE_2D)}t.unbindTexture()}else{let he=s.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(he=I.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(he,Q.__webglTexture),me(he,S),S.mipmaps&&S.mipmaps.length>0)for(let ue=0;ue<S.mipmaps.length;ue++)re(V.__webglFramebuffer[ue],I,S,s.COLOR_ATTACHMENT0,he,ue);else re(V.__webglFramebuffer,I,S,s.COLOR_ATTACHMENT0,he,0);g(S)&&p(he),t.unbindTexture()}I.depthBuffer&&Oe(I)}function D(I){const S=I.textures;for(let V=0,Q=S.length;V<Q;V++){const j=S[V];if(g(j)){const te=I.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,Te=n.get(j).__webglTexture;t.bindTexture(te,Te),p(te),t.unbindTexture()}}}const J=[],ee=[];function oe(I){if(I.samples>0){if(se(I)===!1){const S=I.textures,V=I.width,Q=I.height;let j=s.COLOR_BUFFER_BIT;const te=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Te=n.get(I),he=S.length>1;if(he)for(let ue=0;ue<S.length;ue++)t.bindFramebuffer(s.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ue,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Te.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ue,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let ue=0;ue<S.length;ue++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(j|=s.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(j|=s.STENCIL_BUFFER_BIT)),he){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Te.__webglColorRenderbuffer[ue]);const Be=n.get(S[ue]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Be,0)}s.blitFramebuffer(0,0,V,Q,0,0,V,Q,j,s.NEAREST),l===!0&&(J.length=0,ee.length=0,J.push(s.COLOR_ATTACHMENT0+ue),I.depthBuffer&&I.resolveDepthBuffer===!1&&(J.push(te),ee.push(te),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,ee)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,J))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),he)for(let ue=0;ue<S.length;ue++){t.bindFramebuffer(s.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ue,s.RENDERBUFFER,Te.__webglColorRenderbuffer[ue]);const Be=n.get(S[ue]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Te.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ue,s.TEXTURE_2D,Be,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){const S=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[S])}}}function ie(I){return Math.min(i.maxSamples,I.samples)}function se(I){const S=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function ye(I){const S=o.render.frame;h.get(I)!==S&&(h.set(I,S),I.update())}function xe(I,S){const V=I.colorSpace,Q=I.format,j=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||V!==Ai&&V!==ci&&(nt.getTransfer(V)===lt?(Q!==sn||j!==Mi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),S}function Ne(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=C,this.setTexture2D=q,this.setTexture2DArray=Z,this.setTexture3D=B,this.setTextureCube=W,this.rebindTextures=Fe,this.setupRenderTarget=De,this.updateRenderTargetMipmap=D,this.updateMultisampleRenderTarget=oe,this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=re,this.useMultisampledRTT=se}function xg(s,e){function t(n,i=ci){let r;const o=nt.getTransfer(i);if(n===Mi)return s.UNSIGNED_BYTE;if(n===Ou)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Fu)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Om)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Nm)return s.BYTE;if(n===Um)return s.SHORT;if(n===Ao)return s.UNSIGNED_SHORT;if(n===Uu)return s.INT;if(n===Os)return s.UNSIGNED_INT;if(n===mn)return s.FLOAT;if(n===jo)return s.HALF_FLOAT;if(n===Fm)return s.ALPHA;if(n===Bm)return s.RGB;if(n===sn)return s.RGBA;if(n===zm)return s.LUMINANCE;if(n===km)return s.LUMINANCE_ALPHA;if(n===Ls)return s.DEPTH_COMPONENT;if(n===Bs)return s.DEPTH_STENCIL;if(n===Bu)return s.RED;if(n===zu)return s.RED_INTEGER;if(n===Hm)return s.RG;if(n===ku)return s.RG_INTEGER;if(n===Hu)return s.RGBA_INTEGER;if(n===dl||n===fl||n===pl||n===ml)if(o===lt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===dl)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===fl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===pl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ml)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===dl)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===fl)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===pl)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ml)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Dh||n===Nh||n===Uh||n===Oh)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Dh)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Nh)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Uh)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Oh)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Fh||n===Bh||n===zh)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Fh||n===Bh)return o===lt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===zh)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===kh||n===Hh||n===Vh||n===Gh||n===Wh||n===Xh||n===qh||n===Yh||n===$h||n===Zh||n===Kh||n===Jh||n===jh||n===Qh)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===kh)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Hh)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Vh)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Gh)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Wh)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Xh)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===qh)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Yh)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===$h)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Zh)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Kh)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Jh)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===jh)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Qh)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===gl||n===eu||n===tu)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===gl)return o===lt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===eu)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===tu)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Vm||n===nu||n===iu||n===su)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===gl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===nu)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===iu)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===su)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Fs?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}class _g extends Ut{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class ki extends et{constructor(){super(),this.isGroup=!0,this.type="Group"}}const pS={type:"move"};class Kc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ki,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ki,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ki,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const x of e.hand.values()){const g=t.getJointPose(x,n),p=this._getHandJoint(c,x);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(pS)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new ki;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const mS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,gS=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class xS{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new yt,r=e.properties.get(i);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Un({vertexShader:mS,fragmentShader:gS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ct(new Hr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}}class _S extends Yn{constructor(e,t){super();const n=this;let i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,m=null;const x=new xS,g=t.getContextAttributes();let p=null,y=null;const _=[],b=[],L=new K;let A=null;const T=new Ut;T.layers.enable(1),T.viewport=new ot;const P=new Ut;P.layers.enable(2),P.viewport=new ot;const E=[T,P],M=new _g;M.layers.enable(1),M.layers.enable(2);let C=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let re=_[$];return re===void 0&&(re=new Kc,_[$]=re),re.getTargetRaySpace()},this.getControllerGrip=function($){let re=_[$];return re===void 0&&(re=new Kc,_[$]=re),re.getGripSpace()},this.getHand=function($){let re=_[$];return re===void 0&&(re=new Kc,_[$]=re),re.getHandSpace()};function N($){const re=b.indexOf($.inputSource);if(re===-1)return;const be=_[re];be!==void 0&&(be.update($.inputSource,$.frame,c||o),be.dispatchEvent({type:$.type,data:$.inputSource}))}function q(){i.removeEventListener("select",N),i.removeEventListener("selectstart",N),i.removeEventListener("selectend",N),i.removeEventListener("squeeze",N),i.removeEventListener("squeezestart",N),i.removeEventListener("squeezeend",N),i.removeEventListener("end",q),i.removeEventListener("inputsourceschange",Z);for(let $=0;$<_.length;$++){const re=b[$];re!==null&&(b[$]=null,_[$].disconnect(re))}C=null,O=null,x.reset(),e.setRenderTarget(p),f=null,d=null,u=null,i=null,y=null,Ze.stop(),n.isPresenting=!1,e.setPixelRatio(A),e.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",N),i.addEventListener("selectstart",N),i.addEventListener("selectend",N),i.addEventListener("squeeze",N),i.addEventListener("squeezestart",N),i.addEventListener("squeezeend",N),i.addEventListener("end",q),i.addEventListener("inputsourceschange",Z),g.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(L),i.renderState.layers===void 0){const re={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,re),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Nn(f.framebufferWidth,f.framebufferHeight,{format:sn,type:Mi,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let re=null,be=null,le=null;g.depth&&(le=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,re=g.stencil?Bs:Ls,be=g.stencil?Fs:Os);const Oe={colorFormat:t.RGBA8,depthFormat:le,scaleFactor:r};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(Oe),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Nn(d.textureWidth,d.textureHeight,{format:sn,type:Mi,depthTexture:new Ku(d.textureWidth,d.textureHeight,be,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Ze.setContext(i),Ze.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function Z($){for(let re=0;re<$.removed.length;re++){const be=$.removed[re],le=b.indexOf(be);le>=0&&(b[le]=null,_[le].disconnect(be))}for(let re=0;re<$.added.length;re++){const be=$.added[re];let le=b.indexOf(be);if(le===-1){for(let Fe=0;Fe<_.length;Fe++)if(Fe>=b.length){b.push(be),le=Fe;break}else if(b[Fe]===null){b[Fe]=be,le=Fe;break}if(le===-1)break}const Oe=_[le];Oe&&Oe.connect(be)}}const B=new R,W=new R;function H($,re,be){B.setFromMatrixPosition(re.matrixWorld),W.setFromMatrixPosition(be.matrixWorld);const le=B.distanceTo(W),Oe=re.projectionMatrix.elements,Fe=be.projectionMatrix.elements,De=Oe[14]/(Oe[10]-1),D=Oe[14]/(Oe[10]+1),J=(Oe[9]+1)/Oe[5],ee=(Oe[9]-1)/Oe[5],oe=(Oe[8]-1)/Oe[0],ie=(Fe[8]+1)/Fe[0],se=De*oe,ye=De*ie,xe=le/(-oe+ie),Ne=xe*-oe;re.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Ne),$.translateZ(xe),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert();const I=De+xe,S=D+xe,V=se-Ne,Q=ye+(le-Ne),j=J*D/S*I,te=ee*D/S*I;$.projectionMatrix.makePerspective(V,Q,j,te,I,S),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}function de($,re){re===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(re.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;x.texture!==null&&($.near=x.depthNear,$.far=x.depthFar),M.near=P.near=T.near=$.near,M.far=P.far=T.far=$.far,(C!==M.near||O!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),C=M.near,O=M.far,T.near=C,T.far=O,P.near=C,P.far=O,T.updateProjectionMatrix(),P.updateProjectionMatrix(),$.updateProjectionMatrix());const re=$.parent,be=M.cameras;de(M,re);for(let le=0;le<be.length;le++)de(be[le],re);be.length===2?H(M,T,P):M.projectionMatrix.copy(T.projectionMatrix),pe($,M,re)};function pe($,re,be){be===null?$.matrix.copy(re.matrixWorld):($.matrix.copy(be.matrixWorld),$.matrix.invert(),$.matrix.multiply(re.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(re.projectionMatrix),$.projectionMatrixInverse.copy(re.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Lr*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function($){l=$,d!==null&&(d.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(M)};let me=null;function ke($,re){if(h=re.getViewerPose(c||o),m=re,h!==null){const be=h.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let le=!1;be.length!==M.cameras.length&&(M.cameras.length=0,le=!0);for(let Fe=0;Fe<be.length;Fe++){const De=be[Fe];let D=null;if(f!==null)D=f.getViewport(De);else{const ee=u.getViewSubImage(d,De);D=ee.viewport,Fe===0&&(e.setRenderTargetTextures(y,ee.colorTexture,d.ignoreDepthValues?void 0:ee.depthStencilTexture),e.setRenderTarget(y))}let J=E[Fe];J===void 0&&(J=new Ut,J.layers.enable(Fe),J.viewport=new ot,E[Fe]=J),J.matrix.fromArray(De.transform.matrix),J.matrix.decompose(J.position,J.quaternion,J.scale),J.projectionMatrix.fromArray(De.projectionMatrix),J.projectionMatrixInverse.copy(J.projectionMatrix).invert(),J.viewport.set(D.x,D.y,D.width,D.height),Fe===0&&(M.matrix.copy(J.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),le===!0&&M.cameras.push(J)}const Oe=i.enabledFeatures;if(Oe&&Oe.includes("depth-sensing")){const Fe=u.getDepthInformation(be[0]);Fe&&Fe.isValid&&Fe.texture&&x.init(e,Fe,i.renderState)}}for(let be=0;be<_.length;be++){const le=b[be],Oe=_[be];le!==null&&Oe!==void 0&&Oe.update(le,re,c||o)}me&&me($,re),re.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:re}),m=null}const Ze=new ug;Ze.setAnimationLoop(ke),this.setAnimationLoop=function($){me=$},this.dispose=function(){}}}const as=new _n,yS=new Pe;function vS(s,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,ag(s)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,y,_,b){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,b)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),x(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?l(g,p,y,_):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===jt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===jt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const y=e.get(p),_=y.envMap,b=y.envMapRotation;_&&(g.envMap.value=_,as.copy(b),as.x*=-1,as.y*=-1,as.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(as.y*=-1,as.z*=-1),g.envMapRotation.value.setFromMatrix4(yS.makeRotationFromEuler(as)),g.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,y,_){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*y,g.scale.value=_*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,y){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===jt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function x(g,p){const y=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function bS(s,e,t,n){let i={},r={},o=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,_){const b=_.program;n.uniformBlockBinding(y,b)}function c(y,_){let b=i[y.id];b===void 0&&(m(y),b=h(y),i[y.id]=b,y.addEventListener("dispose",g));const L=_.program;n.updateUBOMapping(y,L);const A=e.render.frame;r[y.id]!==A&&(d(y),r[y.id]=A)}function h(y){const _=u();y.__bindingPointIndex=_;const b=s.createBuffer(),L=y.__size,A=y.usage;return s.bindBuffer(s.UNIFORM_BUFFER,b),s.bufferData(s.UNIFORM_BUFFER,L,A),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,_,b),b}function u(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const _=i[y.id],b=y.uniforms,L=y.__cache;s.bindBuffer(s.UNIFORM_BUFFER,_);for(let A=0,T=b.length;A<T;A++){const P=Array.isArray(b[A])?b[A]:[b[A]];for(let E=0,M=P.length;E<M;E++){const C=P[E];if(f(C,A,E,L)===!0){const O=C.__offset,N=Array.isArray(C.value)?C.value:[C.value];let q=0;for(let Z=0;Z<N.length;Z++){const B=N[Z],W=x(B);typeof B=="number"||typeof B=="boolean"?(C.__data[0]=B,s.bufferSubData(s.UNIFORM_BUFFER,O+q,C.__data)):B.isMatrix3?(C.__data[0]=B.elements[0],C.__data[1]=B.elements[1],C.__data[2]=B.elements[2],C.__data[3]=0,C.__data[4]=B.elements[3],C.__data[5]=B.elements[4],C.__data[6]=B.elements[5],C.__data[7]=0,C.__data[8]=B.elements[6],C.__data[9]=B.elements[7],C.__data[10]=B.elements[8],C.__data[11]=0):(B.toArray(C.__data,q),q+=W.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,O,C.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(y,_,b,L){const A=y.value,T=_+"_"+b;if(L[T]===void 0)return typeof A=="number"||typeof A=="boolean"?L[T]=A:L[T]=A.clone(),!0;{const P=L[T];if(typeof A=="number"||typeof A=="boolean"){if(P!==A)return L[T]=A,!0}else if(P.equals(A)===!1)return P.copy(A),!0}return!1}function m(y){const _=y.uniforms;let b=0;const L=16;for(let T=0,P=_.length;T<P;T++){const E=Array.isArray(_[T])?_[T]:[_[T]];for(let M=0,C=E.length;M<C;M++){const O=E[M],N=Array.isArray(O.value)?O.value:[O.value];for(let q=0,Z=N.length;q<Z;q++){const B=N[q],W=x(B),H=b%L;H!==0&&L-H<W.boundary&&(b+=L-H),O.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=b,b+=W.storage}}}const A=b%L;return A>0&&(b+=L-A),y.__size=b,y.__cache={},this}function x(y){const _={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(_.boundary=4,_.storage=4):y.isVector2?(_.boundary=8,_.storage=8):y.isVector3||y.isColor?(_.boundary=16,_.storage=12):y.isVector4?(_.boundary=16,_.storage=16):y.isMatrix3?(_.boundary=48,_.storage=48):y.isMatrix4?(_.boundary=64,_.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),_}function g(y){const _=y.target;_.removeEventListener("dispose",g);const b=o.indexOf(_.__bindingPointIndex);o.splice(b,1),s.deleteBuffer(i[_.id]),delete i[_.id],delete r[_.id]}function p(){for(const y in i)s.deleteBuffer(i[y]);o=[],i={},r={}}return{bind:l,update:c,dispose:p}}class yg{constructor(e={}){const{canvas:t=ig(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const f=new Uint32Array(4),m=new Int32Array(4);let x=null,g=null;const p=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=un,this.toneMapping=xi,this.toneMappingExposure=1;const _=this;let b=!1,L=0,A=0,T=null,P=-1,E=null;const M=new ot,C=new ot;let O=null;const N=new ge(0);let q=0,Z=t.width,B=t.height,W=1,H=null,de=null;const pe=new ot(0,0,Z,B),me=new ot(0,0,Z,B);let ke=!1;const Ze=new ta;let $=!1,re=!1;const be=new Pe,le=new R,Oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Fe=!1;function De(){return T===null?W:1}let D=n;function J(w,U){return t.getContext(w,U)}try{const w={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${zl}`),t.addEventListener("webglcontextlost",X,!1),t.addEventListener("webglcontextrestored",z,!1),t.addEventListener("webglcontextcreationerror",Y,!1),D===null){const U="webgl2";if(D=J(U,w),D===null)throw J(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let ee,oe,ie,se,ye,xe,Ne,I,S,V,Q,j,te,Te,he,ue,Be,ae,Se,Ke,Ie,_e,Ve,Ge;function dt(){ee=new Nb(D),ee.init(),_e=new xg(D,ee),oe=new Rb(D,ee,e,_e),ie=new dS(D),se=new Fb(D),ye=new eS,xe=new fS(D,ee,ie,ye,oe,_e,se),Ne=new Pb(_),I=new Db(_),S=new W_(D),Ve=new Tb(D,S),V=new Ub(D,S,se,Ve),Q=new zb(D,V,S,se),Se=new Bb(D,oe,xe),ue=new Cb(ye),j=new QM(_,Ne,I,ee,oe,Ve,ue),te=new vS(_,ye),Te=new nS,he=new lS(ee),ae=new wb(_,Ne,I,ie,Q,d,l),Be=new uS(_,Q,oe),Ge=new bS(D,se,oe,ie),Ke=new Ab(D,ee,se),Ie=new Ob(D,ee,se),se.programs=j.programs,_.capabilities=oe,_.extensions=ee,_.properties=ye,_.renderLists=Te,_.shadowMap=Be,_.state=ie,_.info=se}dt();const v=new _S(_,D);this.xr=v,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const w=ee.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=ee.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(w){w!==void 0&&(W=w,this.setSize(Z,B,!1))},this.getSize=function(w){return w.set(Z,B)},this.setSize=function(w,U,k=!0){if(v.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Z=w,B=U,t.width=Math.floor(w*W),t.height=Math.floor(U*W),k===!0&&(t.style.width=w+"px",t.style.height=U+"px"),this.setViewport(0,0,w,U)},this.getDrawingBufferSize=function(w){return w.set(Z*W,B*W).floor()},this.setDrawingBufferSize=function(w,U,k){Z=w,B=U,W=k,t.width=Math.floor(w*k),t.height=Math.floor(U*k),this.setViewport(0,0,w,U)},this.getCurrentViewport=function(w){return w.copy(M)},this.getViewport=function(w){return w.copy(pe)},this.setViewport=function(w,U,k,G){w.isVector4?pe.set(w.x,w.y,w.z,w.w):pe.set(w,U,k,G),ie.viewport(M.copy(pe).multiplyScalar(W).round())},this.getScissor=function(w){return w.copy(me)},this.setScissor=function(w,U,k,G){w.isVector4?me.set(w.x,w.y,w.z,w.w):me.set(w,U,k,G),ie.scissor(C.copy(me).multiplyScalar(W).round())},this.getScissorTest=function(){return ke},this.setScissorTest=function(w){ie.setScissorTest(ke=w)},this.setOpaqueSort=function(w){H=w},this.setTransparentSort=function(w){de=w},this.getClearColor=function(w){return w.copy(ae.getClearColor())},this.setClearColor=function(){ae.setClearColor.apply(ae,arguments)},this.getClearAlpha=function(){return ae.getClearAlpha()},this.setClearAlpha=function(){ae.setClearAlpha.apply(ae,arguments)},this.clear=function(w=!0,U=!0,k=!0){let G=0;if(w){let F=!1;if(T!==null){const ce=T.texture.format;F=ce===Hu||ce===ku||ce===zu}if(F){const ce=T.texture.type,ve=ce===Mi||ce===Os||ce===Ao||ce===Fs||ce===Ou||ce===Fu,Ee=ae.getClearColor(),we=ae.getClearAlpha(),Le=Ee.r,Ue=Ee.g,Ce=Ee.b;ve?(f[0]=Le,f[1]=Ue,f[2]=Ce,f[3]=we,D.clearBufferuiv(D.COLOR,0,f)):(m[0]=Le,m[1]=Ue,m[2]=Ce,m[3]=we,D.clearBufferiv(D.COLOR,0,m))}else G|=D.COLOR_BUFFER_BIT}U&&(G|=D.DEPTH_BUFFER_BIT),k&&(G|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",X,!1),t.removeEventListener("webglcontextrestored",z,!1),t.removeEventListener("webglcontextcreationerror",Y,!1),Te.dispose(),he.dispose(),ye.dispose(),Ne.dispose(),I.dispose(),Q.dispose(),Ve.dispose(),Ge.dispose(),j.dispose(),v.dispose(),v.removeEventListener("sessionstart",wt),v.removeEventListener("sessionend",Tt),on.stop()};function X(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function z(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const w=se.autoReset,U=Be.enabled,k=Be.autoUpdate,G=Be.needsUpdate,F=Be.type;dt(),se.autoReset=w,Be.enabled=U,Be.autoUpdate=k,Be.needsUpdate=G,Be.type=F}function Y(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function ne(w){const U=w.target;U.removeEventListener("dispose",ne),Ae(U)}function Ae(w){ze(w),ye.remove(w)}function ze(w){const U=ye.get(w).programs;U!==void 0&&(U.forEach(function(k){j.releaseProgram(k)}),w.isShaderMaterial&&j.releaseShaderCache(w))}this.renderBufferDirect=function(w,U,k,G,F,ce){U===null&&(U=Oe);const ve=F.isMesh&&F.matrixWorld.determinant()<0,Ee=gx(w,U,k,G,F);ie.setMaterial(G,ve);let we=k.index,Le=1;if(G.wireframe===!0){if(we=V.getWireframeAttribute(k),we===void 0)return;Le=2}const Ue=k.drawRange,Ce=k.attributes.position;let it=Ue.start*Le,pt=(Ue.start+Ue.count)*Le;ce!==null&&(it=Math.max(it,ce.start*Le),pt=Math.min(pt,(ce.start+ce.count)*Le)),we!==null?(it=Math.max(it,0),pt=Math.min(pt,we.count)):Ce!=null&&(it=Math.max(it,0),pt=Math.min(pt,Ce.count));const mt=pt-it;if(mt<0||mt===1/0)return;Ve.setup(F,G,Ee,k,we);let ln,rt=Ke;if(we!==null&&(ln=S.get(we),rt=Ie,rt.setIndex(ln)),F.isMesh)G.wireframe===!0?(ie.setLineWidth(G.wireframeLinewidth*De()),rt.setMode(D.LINES)):rt.setMode(D.TRIANGLES);else if(F.isLine){let Re=G.linewidth;Re===void 0&&(Re=1),ie.setLineWidth(Re*De()),F.isLineSegments?rt.setMode(D.LINES):F.isLineLoop?rt.setMode(D.LINE_LOOP):rt.setMode(D.LINE_STRIP)}else F.isPoints?rt.setMode(D.POINTS):F.isSprite&&rt.setMode(D.TRIANGLES);if(F.isBatchedMesh)F._multiDrawInstances!==null?rt.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances):rt.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else if(F.isInstancedMesh)rt.renderInstances(it,mt,F.count);else if(k.isInstancedBufferGeometry){const Re=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,$t=Math.min(k.instanceCount,Re);rt.renderInstances(it,mt,$t)}else rt.render(it,mt)};function ft(w,U,k){w.transparent===!0&&w.side===Pn&&w.forceSinglePass===!1?(w.side=jt,w.needsUpdate=!0,fa(w,U,k),w.side=vi,w.needsUpdate=!0,fa(w,U,k),w.side=Pn):fa(w,U,k)}this.compile=function(w,U,k=null){k===null&&(k=w),g=he.get(k),g.init(U),y.push(g),k.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(g.pushLight(F),F.castShadow&&g.pushShadow(F))}),w!==k&&w.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(g.pushLight(F),F.castShadow&&g.pushShadow(F))}),g.setupLights();const G=new Set;return w.traverse(function(F){const ce=F.material;if(ce)if(Array.isArray(ce))for(let ve=0;ve<ce.length;ve++){const Ee=ce[ve];ft(Ee,k,F),G.add(Ee)}else ft(ce,k,F),G.add(ce)}),y.pop(),g=null,G},this.compileAsync=function(w,U,k=null){const G=this.compile(w,U,k);return new Promise(F=>{function ce(){if(G.forEach(function(ve){ye.get(ve).currentProgram.isReady()&&G.delete(ve)}),G.size===0){F(w);return}setTimeout(ce,10)}ee.get("KHR_parallel_shader_compile")!==null?ce():setTimeout(ce,10)})};let Et=null;function tt(w){Et&&Et(w)}function wt(){on.stop()}function Tt(){on.start()}const on=new ug;on.setAnimationLoop(tt),typeof self<"u"&&on.setContext(self),this.setAnimationLoop=function(w){Et=w,v.setAnimationLoop(w),w===null?on.stop():on.start()},v.addEventListener("sessionstart",wt),v.addEventListener("sessionend",Tt),this.render=function(w,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),v.enabled===!0&&v.isPresenting===!0&&(v.cameraAutoUpdate===!0&&v.updateCamera(U),U=v.getCamera()),w.isScene===!0&&w.onBeforeRender(_,w,U,T),g=he.get(w,y.length),g.init(U),y.push(g),be.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Ze.setFromProjectionMatrix(be),re=this.localClippingEnabled,$=ue.init(this.clippingPlanes,re),x=Te.get(w,p.length),x.init(),p.push(x),v.enabled===!0&&v.isPresenting===!0){const ce=_.xr.getDepthSensingMesh();ce!==null&&an(ce,U,-1/0,_.sortObjects)}an(w,U,0,_.sortObjects),x.finish(),_.sortObjects===!0&&x.sort(H,de),Fe=v.enabled===!1||v.isPresenting===!1||v.hasDepthSensing()===!1,Fe&&ae.addToRenderList(x,w),this.info.render.frame++,$===!0&&ue.beginShadows();const k=g.state.shadowsArray;Be.render(k,w,U),$===!0&&ue.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=x.opaque,F=x.transmissive;if(g.setupLights(),U.isArrayCamera){const ce=U.cameras;if(F.length>0)for(let ve=0,Ee=ce.length;ve<Ee;ve++){const we=ce[ve];Qi(G,F,w,we)}Fe&&ae.render(w);for(let ve=0,Ee=ce.length;ve<Ee;ve++){const we=ce[ve];Ri(x,w,we,we.viewport)}}else F.length>0&&Qi(G,F,w,U),Fe&&ae.render(w),Ri(x,w,U);T!==null&&(xe.updateMultisampleRenderTarget(T),xe.updateRenderTargetMipmap(T)),w.isScene===!0&&w.onAfterRender(_,w,U),Ve.resetDefaultState(),P=-1,E=null,y.pop(),y.length>0?(g=y[y.length-1],$===!0&&ue.setGlobalState(_.clippingPlanes,g.state.camera)):g=null,p.pop(),p.length>0?x=p[p.length-1]:x=null};function an(w,U,k,G){if(w.visible===!1)return;if(w.layers.test(U.layers)){if(w.isGroup)k=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(U);else if(w.isLight)g.pushLight(w),w.castShadow&&g.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||Ze.intersectsSprite(w)){G&&le.setFromMatrixPosition(w.matrixWorld).applyMatrix4(be);const ve=Q.update(w),Ee=w.material;Ee.visible&&x.push(w,ve,Ee,k,le.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||Ze.intersectsObject(w))){const ve=Q.update(w),Ee=w.material;if(G&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),le.copy(w.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),le.copy(ve.boundingSphere.center)),le.applyMatrix4(w.matrixWorld).applyMatrix4(be)),Array.isArray(Ee)){const we=ve.groups;for(let Le=0,Ue=we.length;Le<Ue;Le++){const Ce=we[Le],it=Ee[Ce.materialIndex];it&&it.visible&&x.push(w,ve,it,k,le.z,Ce)}}else Ee.visible&&x.push(w,ve,Ee,k,le.z,null)}}const ce=w.children;for(let ve=0,Ee=ce.length;ve<Ee;ve++)an(ce[ve],U,k,G)}function Ri(w,U,k,G){const F=w.opaque,ce=w.transmissive,ve=w.transparent;g.setupLightsView(k),$===!0&&ue.setGlobalState(_.clippingPlanes,k),G&&ie.viewport(M.copy(G)),F.length>0&&es(F,U,k),ce.length>0&&es(ce,U,k),ve.length>0&&es(ve,U,k),ie.buffers.depth.setTest(!0),ie.buffers.depth.setMask(!0),ie.buffers.color.setMask(!0),ie.setPolygonOffset(!1)}function Qi(w,U,k,G){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[G.id]===void 0&&(g.state.transmissionRenderTarget[G.id]=new Nn(1,1,{generateMipmaps:!0,type:ee.has("EXT_color_buffer_half_float")||ee.has("EXT_color_buffer_float")?jo:Mi,minFilter:Vn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:nt.workingColorSpace}));const ce=g.state.transmissionRenderTarget[G.id],ve=G.viewport||M;ce.setSize(ve.z,ve.w);const Ee=_.getRenderTarget();_.setRenderTarget(ce),_.getClearColor(N),q=_.getClearAlpha(),q<1&&_.setClearColor(16777215,.5),Fe?ae.render(k):_.clear();const we=_.toneMapping;_.toneMapping=xi;const Le=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),g.setupLightsView(G),$===!0&&ue.setGlobalState(_.clippingPlanes,G),es(w,k,G),xe.updateMultisampleRenderTarget(ce),xe.updateRenderTargetMipmap(ce),ee.has("WEBGL_multisampled_render_to_texture")===!1){let Ue=!1;for(let Ce=0,it=U.length;Ce<it;Ce++){const pt=U[Ce],mt=pt.object,ln=pt.geometry,rt=pt.material,Re=pt.group;if(rt.side===Pn&&mt.layers.test(G.layers)){const $t=rt.side;rt.side=jt,rt.needsUpdate=!0,Hd(mt,k,G,ln,rt,Re),rt.side=$t,rt.needsUpdate=!0,Ue=!0}}Ue===!0&&(xe.updateMultisampleRenderTarget(ce),xe.updateRenderTargetMipmap(ce))}_.setRenderTarget(Ee),_.setClearColor(N,q),Le!==void 0&&(G.viewport=Le),_.toneMapping=we}function es(w,U,k){const G=U.isScene===!0?U.overrideMaterial:null;for(let F=0,ce=w.length;F<ce;F++){const ve=w[F],Ee=ve.object,we=ve.geometry,Le=G===null?ve.material:G,Ue=ve.group;Ee.layers.test(k.layers)&&Hd(Ee,U,k,we,Le,Ue)}}function Hd(w,U,k,G,F,ce){w.onBeforeRender(_,U,k,G,F,ce),w.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),F.onBeforeRender(_,U,k,G,w,ce),F.transparent===!0&&F.side===Pn&&F.forceSinglePass===!1?(F.side=jt,F.needsUpdate=!0,_.renderBufferDirect(k,U,G,F,w,ce),F.side=vi,F.needsUpdate=!0,_.renderBufferDirect(k,U,G,F,w,ce),F.side=Pn):_.renderBufferDirect(k,U,G,F,w,ce),w.onAfterRender(_,U,k,G,F,ce)}function fa(w,U,k){U.isScene!==!0&&(U=Oe);const G=ye.get(w),F=g.state.lights,ce=g.state.shadowsArray,ve=F.state.version,Ee=j.getParameters(w,F.state,ce,U,k),we=j.getProgramCacheKey(Ee);let Le=G.programs;G.environment=w.isMeshStandardMaterial?U.environment:null,G.fog=U.fog,G.envMap=(w.isMeshStandardMaterial?I:Ne).get(w.envMap||G.environment),G.envMapRotation=G.environment!==null&&w.envMap===null?U.environmentRotation:w.envMapRotation,Le===void 0&&(w.addEventListener("dispose",ne),Le=new Map,G.programs=Le);let Ue=Le.get(we);if(Ue!==void 0){if(G.currentProgram===Ue&&G.lightsStateVersion===ve)return Gd(w,Ee),Ue}else Ee.uniforms=j.getUniforms(w),w.onBuild(k,Ee,_),w.onBeforeCompile(Ee,_),Ue=j.acquireProgram(Ee,we),Le.set(we,Ue),G.uniforms=Ee.uniforms;const Ce=G.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Ce.clippingPlanes=ue.uniform),Gd(w,Ee),G.needsLights=_x(w),G.lightsStateVersion=ve,G.needsLights&&(Ce.ambientLightColor.value=F.state.ambient,Ce.lightProbe.value=F.state.probe,Ce.directionalLights.value=F.state.directional,Ce.directionalLightShadows.value=F.state.directionalShadow,Ce.spotLights.value=F.state.spot,Ce.spotLightShadows.value=F.state.spotShadow,Ce.rectAreaLights.value=F.state.rectArea,Ce.ltc_1.value=F.state.rectAreaLTC1,Ce.ltc_2.value=F.state.rectAreaLTC2,Ce.pointLights.value=F.state.point,Ce.pointLightShadows.value=F.state.pointShadow,Ce.hemisphereLights.value=F.state.hemi,Ce.directionalShadowMap.value=F.state.directionalShadowMap,Ce.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Ce.spotShadowMap.value=F.state.spotShadowMap,Ce.spotLightMatrix.value=F.state.spotLightMatrix,Ce.spotLightMap.value=F.state.spotLightMap,Ce.pointShadowMap.value=F.state.pointShadowMap,Ce.pointShadowMatrix.value=F.state.pointShadowMatrix),G.currentProgram=Ue,G.uniformsList=null,Ue}function Vd(w){if(w.uniformsList===null){const U=w.currentProgram.getUniforms();w.uniformsList=_l.seqWithValue(U.seq,w.uniforms)}return w.uniformsList}function Gd(w,U){const k=ye.get(w);k.outputColorSpace=U.outputColorSpace,k.batching=U.batching,k.batchingColor=U.batchingColor,k.instancing=U.instancing,k.instancingColor=U.instancingColor,k.instancingMorph=U.instancingMorph,k.skinning=U.skinning,k.morphTargets=U.morphTargets,k.morphNormals=U.morphNormals,k.morphColors=U.morphColors,k.morphTargetsCount=U.morphTargetsCount,k.numClippingPlanes=U.numClippingPlanes,k.numIntersection=U.numClipIntersection,k.vertexAlphas=U.vertexAlphas,k.vertexTangents=U.vertexTangents,k.toneMapping=U.toneMapping}function gx(w,U,k,G,F){U.isScene!==!0&&(U=Oe),xe.resetTextureUnits();const ce=U.fog,ve=G.isMeshStandardMaterial?U.environment:null,Ee=T===null?_.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:Ai,we=(G.isMeshStandardMaterial?I:Ne).get(G.envMap||ve),Le=G.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Ue=!!k.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Ce=!!k.morphAttributes.position,it=!!k.morphAttributes.normal,pt=!!k.morphAttributes.color;let mt=xi;G.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(mt=_.toneMapping);const ln=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,rt=ln!==void 0?ln.length:0,Re=ye.get(G),$t=g.state.lights;if($===!0&&(re===!0||w!==E)){const yn=w===E&&G.id===P;ue.setState(G,w,yn)}let at=!1;G.version===Re.__version?(Re.needsLights&&Re.lightsStateVersion!==$t.state.version||Re.outputColorSpace!==Ee||F.isBatchedMesh&&Re.batching===!1||!F.isBatchedMesh&&Re.batching===!0||F.isBatchedMesh&&Re.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Re.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Re.instancing===!1||!F.isInstancedMesh&&Re.instancing===!0||F.isSkinnedMesh&&Re.skinning===!1||!F.isSkinnedMesh&&Re.skinning===!0||F.isInstancedMesh&&Re.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Re.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Re.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Re.instancingMorph===!1&&F.morphTexture!==null||Re.envMap!==we||G.fog===!0&&Re.fog!==ce||Re.numClippingPlanes!==void 0&&(Re.numClippingPlanes!==ue.numPlanes||Re.numIntersection!==ue.numIntersection)||Re.vertexAlphas!==Le||Re.vertexTangents!==Ue||Re.morphTargets!==Ce||Re.morphNormals!==it||Re.morphColors!==pt||Re.toneMapping!==mt||Re.morphTargetsCount!==rt)&&(at=!0):(at=!0,Re.__version=G.version);let Kn=Re.currentProgram;at===!0&&(Kn=fa(G,U,F));let pa=!1,ts=!1,Sc=!1;const Dt=Kn.getUniforms(),Ci=Re.uniforms;if(ie.useProgram(Kn.program)&&(pa=!0,ts=!0,Sc=!0),G.id!==P&&(P=G.id,ts=!0),pa||E!==w){Dt.setValue(D,"projectionMatrix",w.projectionMatrix),Dt.setValue(D,"viewMatrix",w.matrixWorldInverse);const yn=Dt.map.cameraPosition;yn!==void 0&&yn.setValue(D,le.setFromMatrixPosition(w.matrixWorld)),oe.logarithmicDepthBuffer&&Dt.setValue(D,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&Dt.setValue(D,"isOrthographic",w.isOrthographicCamera===!0),E!==w&&(E=w,ts=!0,Sc=!0)}if(F.isSkinnedMesh){Dt.setOptional(D,F,"bindMatrix"),Dt.setOptional(D,F,"bindMatrixInverse");const yn=F.skeleton;yn&&(yn.boneTexture===null&&yn.computeBoneTexture(),Dt.setValue(D,"boneTexture",yn.boneTexture,xe))}F.isBatchedMesh&&(Dt.setOptional(D,F,"batchingTexture"),Dt.setValue(D,"batchingTexture",F._matricesTexture,xe),Dt.setOptional(D,F,"batchingColorTexture"),F._colorsTexture!==null&&Dt.setValue(D,"batchingColorTexture",F._colorsTexture,xe));const Ec=k.morphAttributes;if((Ec.position!==void 0||Ec.normal!==void 0||Ec.color!==void 0)&&Se.update(F,k,Kn),(ts||Re.receiveShadow!==F.receiveShadow)&&(Re.receiveShadow=F.receiveShadow,Dt.setValue(D,"receiveShadow",F.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Ci.envMap.value=we,Ci.flipEnvMap.value=we.isCubeTexture&&we.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&U.environment!==null&&(Ci.envMapIntensity.value=U.environmentIntensity),ts&&(Dt.setValue(D,"toneMappingExposure",_.toneMappingExposure),Re.needsLights&&xx(Ci,Sc),ce&&G.fog===!0&&te.refreshFogUniforms(Ci,ce),te.refreshMaterialUniforms(Ci,G,W,B,g.state.transmissionRenderTarget[w.id]),_l.upload(D,Vd(Re),Ci,xe)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(_l.upload(D,Vd(Re),Ci,xe),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&Dt.setValue(D,"center",F.center),Dt.setValue(D,"modelViewMatrix",F.modelViewMatrix),Dt.setValue(D,"normalMatrix",F.normalMatrix),Dt.setValue(D,"modelMatrix",F.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const yn=G.uniformsGroups;for(let wc=0,yx=yn.length;wc<yx;wc++){const Wd=yn[wc];Ge.update(Wd,Kn),Ge.bind(Wd,Kn)}}return Kn}function xx(w,U){w.ambientLightColor.needsUpdate=U,w.lightProbe.needsUpdate=U,w.directionalLights.needsUpdate=U,w.directionalLightShadows.needsUpdate=U,w.pointLights.needsUpdate=U,w.pointLightShadows.needsUpdate=U,w.spotLights.needsUpdate=U,w.spotLightShadows.needsUpdate=U,w.rectAreaLights.needsUpdate=U,w.hemisphereLights.needsUpdate=U}function _x(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(w,U,k){ye.get(w.texture).__webglTexture=U,ye.get(w.depthTexture).__webglTexture=k;const G=ye.get(w);G.__hasExternalTextures=!0,G.__autoAllocateDepthBuffer=k===void 0,G.__autoAllocateDepthBuffer||ee.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,U){const k=ye.get(w);k.__webglFramebuffer=U,k.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(w,U=0,k=0){T=w,L=U,A=k;let G=!0,F=null,ce=!1,ve=!1;if(w){const we=ye.get(w);we.__useDefaultFramebuffer!==void 0?(ie.bindFramebuffer(D.FRAMEBUFFER,null),G=!1):we.__webglFramebuffer===void 0?xe.setupRenderTarget(w):we.__hasExternalTextures&&xe.rebindTextures(w,ye.get(w.texture).__webglTexture,ye.get(w.depthTexture).__webglTexture);const Le=w.texture;(Le.isData3DTexture||Le.isDataArrayTexture||Le.isCompressedArrayTexture)&&(ve=!0);const Ue=ye.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ue[U])?F=Ue[U][k]:F=Ue[U],ce=!0):w.samples>0&&xe.useMultisampledRTT(w)===!1?F=ye.get(w).__webglMultisampledFramebuffer:Array.isArray(Ue)?F=Ue[k]:F=Ue,M.copy(w.viewport),C.copy(w.scissor),O=w.scissorTest}else M.copy(pe).multiplyScalar(W).floor(),C.copy(me).multiplyScalar(W).floor(),O=ke;if(ie.bindFramebuffer(D.FRAMEBUFFER,F)&&G&&ie.drawBuffers(w,F),ie.viewport(M),ie.scissor(C),ie.setScissorTest(O),ce){const we=ye.get(w.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+U,we.__webglTexture,k)}else if(ve){const we=ye.get(w.texture),Le=U||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,we.__webglTexture,k||0,Le)}P=-1},this.readRenderTargetPixels=function(w,U,k,G,F,ce,ve){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ee=ye.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ve!==void 0&&(Ee=Ee[ve]),Ee){ie.bindFramebuffer(D.FRAMEBUFFER,Ee);try{const we=w.texture,Le=we.format,Ue=we.type;if(!oe.textureFormatReadable(Le)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!oe.textureTypeReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=w.width-G&&k>=0&&k<=w.height-F&&D.readPixels(U,k,G,F,_e.convert(Le),_e.convert(Ue),ce)}finally{const we=T!==null?ye.get(T).__webglFramebuffer:null;ie.bindFramebuffer(D.FRAMEBUFFER,we)}}},this.readRenderTargetPixelsAsync=async function(w,U,k,G,F,ce,ve){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ee=ye.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ve!==void 0&&(Ee=Ee[ve]),Ee){ie.bindFramebuffer(D.FRAMEBUFFER,Ee);try{const we=w.texture,Le=we.format,Ue=we.type;if(!oe.textureFormatReadable(Le))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!oe.textureTypeReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=w.width-G&&k>=0&&k<=w.height-F){const Ce=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Ce),D.bufferData(D.PIXEL_PACK_BUFFER,ce.byteLength,D.STREAM_READ),D.readPixels(U,k,G,F,_e.convert(Le),_e.convert(Ue),0),D.flush();const it=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);await m_(D,it,4);try{D.bindBuffer(D.PIXEL_PACK_BUFFER,Ce),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,ce)}finally{D.deleteBuffer(Ce),D.deleteSync(it)}return ce}}finally{const we=T!==null?ye.get(T).__webglFramebuffer:null;ie.bindFramebuffer(D.FRAMEBUFFER,we)}}},this.copyFramebufferToTexture=function(w,U=null,k=0){w.isTexture!==!0&&(console.warn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,w=arguments[1]);const G=Math.pow(2,-k),F=Math.floor(w.image.width*G),ce=Math.floor(w.image.height*G),ve=U!==null?U.x:0,Ee=U!==null?U.y:0;xe.setTexture2D(w,0),D.copyTexSubImage2D(D.TEXTURE_2D,k,0,0,ve,Ee,F,ce),ie.unbindTexture()},this.copyTextureToTexture=function(w,U,k=null,G=null,F=0){w.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture function signature has changed."),G=arguments[0]||null,w=arguments[1],U=arguments[2],F=arguments[3]||0,k=null);let ce,ve,Ee,we,Le,Ue;k!==null?(ce=k.max.x-k.min.x,ve=k.max.y-k.min.y,Ee=k.min.x,we=k.min.y):(ce=w.image.width,ve=w.image.height,Ee=0,we=0),G!==null?(Le=G.x,Ue=G.y):(Le=0,Ue=0);const Ce=_e.convert(U.format),it=_e.convert(U.type);xe.setTexture2D(U,0),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,U.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,U.unpackAlignment);const pt=D.getParameter(D.UNPACK_ROW_LENGTH),mt=D.getParameter(D.UNPACK_IMAGE_HEIGHT),ln=D.getParameter(D.UNPACK_SKIP_PIXELS),rt=D.getParameter(D.UNPACK_SKIP_ROWS),Re=D.getParameter(D.UNPACK_SKIP_IMAGES),$t=w.isCompressedTexture?w.mipmaps[F]:w.image;D.pixelStorei(D.UNPACK_ROW_LENGTH,$t.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,$t.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Ee),D.pixelStorei(D.UNPACK_SKIP_ROWS,we),w.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,F,Le,Ue,ce,ve,Ce,it,$t.data):w.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,F,Le,Ue,$t.width,$t.height,Ce,$t.data):D.texSubImage2D(D.TEXTURE_2D,F,Le,Ue,Ce,it,$t),D.pixelStorei(D.UNPACK_ROW_LENGTH,pt),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,mt),D.pixelStorei(D.UNPACK_SKIP_PIXELS,ln),D.pixelStorei(D.UNPACK_SKIP_ROWS,rt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Re),F===0&&U.generateMipmaps&&D.generateMipmap(D.TEXTURE_2D),ie.unbindTexture()},this.copyTextureToTexture3D=function(w,U,k=null,G=null,F=0){w.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),k=arguments[0]||null,G=arguments[1]||null,w=arguments[2],U=arguments[3],F=arguments[4]||0);let ce,ve,Ee,we,Le,Ue,Ce,it,pt;const mt=w.isCompressedTexture?w.mipmaps[F]:w.image;k!==null?(ce=k.max.x-k.min.x,ve=k.max.y-k.min.y,Ee=k.max.z-k.min.z,we=k.min.x,Le=k.min.y,Ue=k.min.z):(ce=mt.width,ve=mt.height,Ee=mt.depth,we=0,Le=0,Ue=0),G!==null?(Ce=G.x,it=G.y,pt=G.z):(Ce=0,it=0,pt=0);const ln=_e.convert(U.format),rt=_e.convert(U.type);let Re;if(U.isData3DTexture)xe.setTexture3D(U,0),Re=D.TEXTURE_3D;else if(U.isDataArrayTexture||U.isCompressedArrayTexture)xe.setTexture2DArray(U,0),Re=D.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,U.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,U.unpackAlignment);const $t=D.getParameter(D.UNPACK_ROW_LENGTH),at=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Kn=D.getParameter(D.UNPACK_SKIP_PIXELS),pa=D.getParameter(D.UNPACK_SKIP_ROWS),ts=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,mt.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,mt.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,we),D.pixelStorei(D.UNPACK_SKIP_ROWS,Le),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ue),w.isDataTexture||w.isData3DTexture?D.texSubImage3D(Re,F,Ce,it,pt,ce,ve,Ee,ln,rt,mt.data):U.isCompressedArrayTexture?D.compressedTexSubImage3D(Re,F,Ce,it,pt,ce,ve,Ee,ln,mt.data):D.texSubImage3D(Re,F,Ce,it,pt,ce,ve,Ee,ln,rt,mt),D.pixelStorei(D.UNPACK_ROW_LENGTH,$t),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,at),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Kn),D.pixelStorei(D.UNPACK_SKIP_ROWS,pa),D.pixelStorei(D.UNPACK_SKIP_IMAGES,ts),F===0&&U.generateMipmaps&&D.generateMipmap(Re),ie.unbindTexture()},this.initRenderTarget=function(w){ye.get(w).__webglFramebuffer===void 0&&xe.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?xe.setTextureCube(w,0):w.isData3DTexture?xe.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?xe.setTexture2DArray(w,0):xe.setTexture2D(w,0),ie.unbindTexture()},this.resetState=function(){L=0,A=0,T=null,ie.reset(),Ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Vl?"display-p3":"srgb",t.unpackColorSpace=nt.workingColorSpace===Qo?"display-p3":"srgb"}}class na{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new ge(e),this.density=t}clone(){return new na(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Zl{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new ge(e),this.near=t,this.far=n}clone(){return new Zl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Qu extends et{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _n,this.environmentIntensity=1,this.environmentRotation=new _n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Kl{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Do,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=xn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return Xu("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=xn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=xn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Zt=new R;class zs{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.applyMatrix4(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.applyNormalMatrix(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.transformDirection(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Jt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Xe(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Xe(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Xe(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Xe(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Xe(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Jt(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Jt(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Jt(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Jt(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Xe(t,this.array),n=Xe(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Xe(t,this.array),n=Xe(n,this.array),i=Xe(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Xe(t,this.array),n=Xe(n,this.array),i=Xe(i,this.array),r=Xe(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Qe(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new zs(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class ed extends Yt{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ge(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let dr;const Jr=new R,fr=new R,pr=new R,mr=new K,jr=new K,vg=new Pe,Oa=new R,Qr=new R,Fa=new R,Df=new K,Jc=new K,Nf=new K;class bg extends et{constructor(e=new ed){if(super(),this.isSprite=!0,this.type="Sprite",dr===void 0){dr=new He;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Kl(t,5);dr.setIndex([0,1,2,0,2,3]),dr.setAttribute("position",new zs(n,3,0,!1)),dr.setAttribute("uv",new zs(n,2,3,!1))}this.geometry=dr,this.material=e,this.center=new K(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),fr.setFromMatrixScale(this.matrixWorld),vg.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),pr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&fr.multiplyScalar(-pr.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const o=this.center;Ba(Oa.set(-.5,-.5,0),pr,o,fr,i,r),Ba(Qr.set(.5,-.5,0),pr,o,fr,i,r),Ba(Fa.set(.5,.5,0),pr,o,fr,i,r),Df.set(0,0),Jc.set(1,0),Nf.set(1,1);let a=e.ray.intersectTriangle(Oa,Qr,Fa,!1,Jr);if(a===null&&(Ba(Qr.set(-.5,.5,0),pr,o,fr,i,r),Jc.set(0,1),a=e.ray.intersectTriangle(Oa,Fa,Qr,!1,Jr),a===null))return;const l=e.ray.origin.distanceTo(Jr);l<e.near||l>e.far||t.push({distance:l,point:Jr.clone(),uv:dn.getInterpolation(Jr,Oa,Qr,Fa,Df,Jc,Nf,new K),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Ba(s,e,t,n,i,r){mr.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(jr.x=r*mr.x-i*mr.y,jr.y=i*mr.x+r*mr.y):jr.copy(mr),s.copy(e),s.x+=jr.x,s.y+=jr.y,s.applyMatrix4(vg)}const za=new R,Uf=new R;class Mg extends et{constructor(){super(),this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]},isLOD:{value:!0}}),this.autoUpdate=!0}copy(e){super.copy(e,!1);const t=e.levels;for(let n=0,i=t.length;n<i;n++){const r=t[n];this.addLevel(r.object.clone(),r.distance,r.hysteresis)}return this.autoUpdate=e.autoUpdate,this}addLevel(e,t=0,n=0){t=Math.abs(t);const i=this.levels;let r;for(r=0;r<i.length&&!(t<i[r].distance);r++);return i.splice(r,0,{distance:t,hysteresis:n,object:e}),this.add(e),this}getCurrentLevel(){return this._currentLevel}getObjectForDistance(e){const t=this.levels;if(t.length>0){let n,i;for(n=1,i=t.length;n<i;n++){let r=t[n].distance;if(t[n].object.visible&&(r-=r*t[n].hysteresis),e<r)break}return t[n-1].object}return null}raycast(e,t){if(this.levels.length>0){za.setFromMatrixPosition(this.matrixWorld);const i=e.ray.origin.distanceTo(za);this.getObjectForDistance(i).raycast(e,t)}}update(e){const t=this.levels;if(t.length>1){za.setFromMatrixPosition(e.matrixWorld),Uf.setFromMatrixPosition(this.matrixWorld);const n=za.distanceTo(Uf)/e.zoom;t[0].object.visible=!0;let i,r;for(i=1,r=t.length;i<r;i++){let o=t[i].distance;if(t[i].object.visible&&(o-=o*t[i].hysteresis),n>=o)t[i-1].object.visible=!1,t[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<r;i++)t[i].object.visible=!1}}toJSON(e){const t=super.toJSON(e);this.autoUpdate===!1&&(t.object.autoUpdate=!1),t.object.levels=[];const n=this.levels;for(let i=0,r=n.length;i<r;i++){const o=n[i];t.object.levels.push({object:o.object.uuid,distance:o.distance,hysteresis:o.hysteresis})}return t}}const Of=new R,Ff=new ot,Bf=new ot,MS=new R,zf=new Pe,ka=new R,jc=new Xt,kf=new Pe,Qc=new Vs;class Sg extends ct{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Lh,this.bindMatrix=new Pe,this.bindMatrixInverse=new Pe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Qt),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ka),this.boundingBox.expandByPoint(ka)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Xt),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ka),this.boundingSphere.expandByPoint(ka)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),jc.copy(this.boundingSphere),jc.applyMatrix4(i),e.ray.intersectsSphere(jc)!==!1&&(kf.copy(i).invert(),Qc.copy(e.ray).applyMatrix4(kf),!(this.boundingBox!==null&&Qc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Qc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new ot,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Lh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Dm?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Ff.fromBufferAttribute(i.attributes.skinIndex,e),Bf.fromBufferAttribute(i.attributes.skinWeight,e),Of.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=Bf.getComponent(r);if(o!==0){const a=Ff.getComponent(r);zf.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(MS.copy(Of).applyMatrix4(zf),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class td extends et{constructor(){super(),this.isBone=!0,this.type="Bone"}}class _i extends yt{constructor(e=null,t=1,n=1,i,r,o,a,l,c=Ot,h=Ot,u,d){super(null,o,a,l,c,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Hf=new Pe,SS=new Pe;class Jl{constructor(e=[],t=[]){this.uuid=xn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Pe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Pe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:SS;Hf.multiplyMatrices(a,t[r]),Hf.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Jl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new _i(t,e,e,sn,mn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new td),this.bones.push(o),this.boneInverses.push(new Pe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class Nr extends Qe{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const gr=new Pe,Vf=new Pe,Ha=[],Gf=new Qt,ES=new Pe,eo=new ct,to=new Xt;class Eg extends ct{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Nr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,ES)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Qt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,gr),Gf.copy(e.boundingBox).applyMatrix4(gr),this.boundingBox.union(Gf)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Xt),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,gr),to.copy(e.boundingSphere).applyMatrix4(gr),this.boundingSphere.union(to)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(eo.geometry=this.geometry,eo.material=this.material,eo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),to.copy(this.boundingSphere),to.applyMatrix4(n),e.ray.intersectsSphere(to)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,gr),Vf.multiplyMatrices(n,gr),eo.matrixWorld=Vf,eo.raycast(e,Ha);for(let o=0,a=Ha.length;o<a;o++){const l=Ha[o];l.instanceId=r,l.object=this,t.push(l)}Ha.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Nr(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new _i(new Float32Array(i*this.count),i,this.count,Bu,mn));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}function wS(s,e){return s.z-e.z}function TS(s,e){return e.z-s.z}class AS{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t){const n=this.pool,i=this.list;this.index>=n.length&&n.push({start:-1,count:-1,z:-1});const r=n[this.index];i.push(r),this.index++,r.start=e.start,r.count=e.count,r.z=t}reset(){this.list.length=0,this.index=0}}const xr="batchId",Oi=new Pe,eh=new Pe,RS=new Pe,CS=new ge(1,1,1),Wf=new Pe,th=new ta,Va=new Qt,ls=new Xt,no=new R,Xf=new R,PS=new R,nh=new AS,Vt=new ct,Ga=[];function IS(s,e,t=0){const n=e.itemSize;if(s.isInterleavedBufferAttribute||s.array.constructor!==e.array.constructor){const i=s.count;for(let r=0;r<i;r++)for(let o=0;o<n;o++)e.setComponent(r+t,o,s.getComponent(r,o))}else e.array.set(s.array,t*n);e.needsUpdate=!0}class wg extends ct{get maxGeometryCount(){return this._maxGeometryCount}constructor(e,t,n=t*2,i){super(new He,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._drawRanges=[],this._reservedRanges=[],this._visibility=[],this._active=[],this._bounds=[],this._maxGeometryCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._geometryInitialized=!1,this._geometryCount=0,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._multiDrawInstances=null,this._visibilityChanged=!0,this._matricesTexture=null,this._initMatricesTexture(),this._colorsTexture=null}_initMatricesTexture(){let e=Math.sqrt(this._maxGeometryCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4),n=new _i(t,e,e,sn,mn);this._matricesTexture=n}_initColorsTexture(){let e=Math.sqrt(this._maxGeometryCount);e=Math.ceil(e);const t=new Float32Array(e*e*4).fill(1),n=new _i(t,e,e,sn,mn);n.colorSpace=nt.workingColorSpace,this._colorsTexture=n}_initializeGeometry(e){const t=this.geometry,n=this._maxVertexCount,i=this._maxGeometryCount,r=this._maxIndexCount;if(this._geometryInitialized===!1){for(const a in e.attributes){const l=e.getAttribute(a),{array:c,itemSize:h,normalized:u}=l,d=new c.constructor(n*h),f=new Qe(d,h,u);t.setAttribute(a,f)}if(e.getIndex()!==null){const a=n>65536?new Uint32Array(r):new Uint16Array(r);t.setIndex(new Qe(a,1))}const o=i>65536?new Uint32Array(n):new Uint16Array(n);t.setAttribute(xr,new Qe(o,1)),this._geometryInitialized=!0}}_validateGeometry(e){if(e.getAttribute(xr))throw new Error(`BatchedMesh: Geometry cannot use attribute "${xr}"`);const t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('BatchedMesh: All geometries must consistently have "index".');for(const n in t.attributes){if(n===xr)continue;if(!e.hasAttribute(n))throw new Error(`BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);const i=e.getAttribute(n),r=t.getAttribute(n);if(i.itemSize!==r.itemSize||i.normalized!==r.normalized)throw new Error("BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qt);const e=this._geometryCount,t=this.boundingBox,n=this._active;t.makeEmpty();for(let i=0;i<e;i++)n[i]!==!1&&(this.getMatrixAt(i,Oi),this.getBoundingBoxAt(i,Va).applyMatrix4(Oi),t.union(Va))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Xt);const e=this._geometryCount,t=this.boundingSphere,n=this._active;t.makeEmpty();for(let i=0;i<e;i++)n[i]!==!1&&(this.getMatrixAt(i,Oi),this.getBoundingSphereAt(i,ls).applyMatrix4(Oi),t.union(ls))}addGeometry(e,t=-1,n=-1){if(this._initializeGeometry(e),this._validateGeometry(e),this._geometryCount>=this._maxGeometryCount)throw new Error("BatchedMesh: Maximum geometry count reached.");const i={vertexStart:-1,vertexCount:-1,indexStart:-1,indexCount:-1};let r=null;const o=this._reservedRanges,a=this._drawRanges,l=this._bounds;this._geometryCount!==0&&(r=o[o.length-1]),t===-1?i.vertexCount=e.getAttribute("position").count:i.vertexCount=t,r===null?i.vertexStart=0:i.vertexStart=r.vertexStart+r.vertexCount;const c=e.getIndex(),h=c!==null;if(h&&(n===-1?i.indexCount=c.count:i.indexCount=n,r===null?i.indexStart=0:i.indexStart=r.indexStart+r.indexCount),i.indexStart!==-1&&i.indexStart+i.indexCount>this._maxIndexCount||i.vertexStart+i.vertexCount>this._maxVertexCount)throw new Error("BatchedMesh: Reserved space request exceeds the maximum buffer size.");const u=this._visibility,d=this._active,f=this._matricesTexture,m=this._matricesTexture.image.data,x=this._colorsTexture;u.push(!0),d.push(!0);const g=this._geometryCount;this._geometryCount++,RS.toArray(m,g*16),f.needsUpdate=!0,x!==null&&(CS.toArray(x.image.data,g*4),x.needsUpdate=!0),o.push(i),a.push({start:h?i.indexStart:i.vertexStart,count:-1}),l.push({boxInitialized:!1,box:new Qt,sphereInitialized:!1,sphere:new Xt});const p=this.geometry.getAttribute(xr);for(let y=0;y<i.vertexCount;y++)p.setX(i.vertexStart+y,g);return p.needsUpdate=!0,this.setGeometryAt(g,e),g}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);const n=this.geometry,i=n.getIndex()!==null,r=n.getIndex(),o=t.getIndex(),a=this._reservedRanges[e];if(i&&o.count>a.indexCount||t.attributes.position.count>a.vertexCount)throw new Error("BatchedMesh: Reserved space not large enough for provided geometry.");const l=a.vertexStart,c=a.vertexCount;for(const f in n.attributes){if(f===xr)continue;const m=t.getAttribute(f),x=n.getAttribute(f);IS(m,x,l);const g=m.itemSize;for(let p=m.count,y=c;p<y;p++){const _=l+p;for(let b=0;b<g;b++)x.setComponent(_,b,0)}x.needsUpdate=!0,x.addUpdateRange(l*g,c*g)}if(i){const f=a.indexStart;for(let m=0;m<o.count;m++)r.setX(f+m,l+o.getX(m));for(let m=o.count,x=a.indexCount;m<x;m++)r.setX(f+m,l);r.needsUpdate=!0,r.addUpdateRange(f,a.indexCount)}const h=this._bounds[e];t.boundingBox!==null?(h.box.copy(t.boundingBox),h.boxInitialized=!0):h.boxInitialized=!1,t.boundingSphere!==null?(h.sphere.copy(t.boundingSphere),h.sphereInitialized=!0):h.sphereInitialized=!1;const u=this._drawRanges[e],d=t.getAttribute("position");return u.count=i?o.count:d.count,this._visibilityChanged=!0,e}deleteGeometry(e){const t=this._active;return e>=t.length||t[e]===!1?this:(t[e]=!1,this._visibilityChanged=!0,this)}getInstanceCountAt(e){return this._multiDrawInstances===null?null:this._multiDrawInstances[e]}setInstanceCountAt(e,t){return this._multiDrawInstances===null&&(this._multiDrawInstances=new Int32Array(this._maxGeometryCount).fill(1)),this._multiDrawInstances[e]=t,e}getBoundingBoxAt(e,t){if(this._active[e]===!1)return null;const i=this._bounds[e],r=i.box,o=this.geometry;if(i.boxInitialized===!1){r.makeEmpty();const a=o.index,l=o.attributes.position,c=this._drawRanges[e];for(let h=c.start,u=c.start+c.count;h<u;h++){let d=h;a&&(d=a.getX(d)),r.expandByPoint(no.fromBufferAttribute(l,d))}i.boxInitialized=!0}return t.copy(r),t}getBoundingSphereAt(e,t){if(this._active[e]===!1)return null;const i=this._bounds[e],r=i.sphere,o=this.geometry;if(i.sphereInitialized===!1){r.makeEmpty(),this.getBoundingBoxAt(e,Va),Va.getCenter(r.center);const a=o.index,l=o.attributes.position,c=this._drawRanges[e];let h=0;for(let u=c.start,d=c.start+c.count;u<d;u++){let f=u;a&&(f=a.getX(f)),no.fromBufferAttribute(l,f),h=Math.max(h,r.center.distanceToSquared(no))}r.radius=Math.sqrt(h),i.sphereInitialized=!0}return t.copy(r),t}setMatrixAt(e,t){const n=this._active,i=this._matricesTexture,r=this._matricesTexture.image.data,o=this._geometryCount;return e>=o||n[e]===!1?this:(t.toArray(r,e*16),i.needsUpdate=!0,this)}getMatrixAt(e,t){const n=this._active,i=this._matricesTexture.image.data,r=this._geometryCount;return e>=r||n[e]===!1?null:t.fromArray(i,e*16)}setColorAt(e,t){this._colorsTexture===null&&this._initColorsTexture();const n=this._active,i=this._colorsTexture,r=this._colorsTexture.image.data,o=this._geometryCount;return e>=o||n[e]===!1?this:(t.toArray(r,e*4),i.needsUpdate=!0,this)}getColorAt(e,t){const n=this._active,i=this._colorsTexture.image.data,r=this._geometryCount;return e>=r||n[e]===!1?null:t.fromArray(i,e*4)}setVisibleAt(e,t){const n=this._visibility,i=this._active,r=this._geometryCount;return e>=r||i[e]===!1||n[e]===t?this:(n[e]=t,this._visibilityChanged=!0,this)}getVisibleAt(e){const t=this._visibility,n=this._active,i=this._geometryCount;return e>=i||n[e]===!1?!1:t[e]}raycast(e,t){const n=this._visibility,i=this._active,r=this._drawRanges,o=this._geometryCount,a=this.matrixWorld,l=this.geometry;Vt.material=this.material,Vt.geometry.index=l.index,Vt.geometry.attributes=l.attributes,Vt.geometry.boundingBox===null&&(Vt.geometry.boundingBox=new Qt),Vt.geometry.boundingSphere===null&&(Vt.geometry.boundingSphere=new Xt);for(let c=0;c<o;c++){if(!n[c]||!i[c])continue;const h=r[c];Vt.geometry.setDrawRange(h.start,h.count),this.getMatrixAt(c,Vt.matrixWorld).premultiply(a),this.getBoundingBoxAt(c,Vt.geometry.boundingBox),this.getBoundingSphereAt(c,Vt.geometry.boundingSphere),Vt.raycast(e,Ga);for(let u=0,d=Ga.length;u<d;u++){const f=Ga[u];f.object=this,f.batchId=c,t.push(f)}Ga.length=0}Vt.material=null,Vt.geometry.index=null,Vt.geometry.attributes={},Vt.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._drawRanges=e._drawRanges.map(t=>({...t})),this._reservedRanges=e._reservedRanges.map(t=>({...t})),this._visibility=e._visibility.slice(),this._active=e._active.slice(),this._bounds=e._bounds.map(t=>({boxInitialized:t.boxInitialized,box:t.box.clone(),sphereInitialized:t.sphereInitialized,sphere:t.sphere.clone()})),this._maxGeometryCount=e._maxGeometryCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._geometryCount=e._geometryCount,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.slice(),this._colorsTexture!==null&&(this._colorsTexture=e._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.slice()),this}dispose(){return this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null),this}onBeforeRender(e,t,n,i,r){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;const o=i.getIndex(),a=o===null?1:o.array.BYTES_PER_ELEMENT,l=this._active,c=this._visibility,h=this._multiDrawStarts,u=this._multiDrawCounts,d=this._drawRanges,f=this.perObjectFrustumCulled;f&&(Wf.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),th.setFromProjectionMatrix(Wf,e.coordinateSystem));let m=0;if(this.sortObjects){eh.copy(this.matrixWorld).invert(),no.setFromMatrixPosition(n.matrixWorld).applyMatrix4(eh),Xf.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(eh);for(let p=0,y=c.length;p<y;p++)if(c[p]&&l[p]){this.getMatrixAt(p,Oi),this.getBoundingSphereAt(p,ls).applyMatrix4(Oi);let _=!1;if(f&&(_=!th.intersectsSphere(ls)),!_){const b=PS.subVectors(ls.center,no).dot(Xf);nh.push(d[p],b)}}const x=nh.list,g=this.customSort;g===null?x.sort(r.transparent?TS:wS):g.call(this,x,n);for(let p=0,y=x.length;p<y;p++){const _=x[p];h[m]=_.start*a,u[m]=_.count,m++}nh.reset()}else for(let x=0,g=c.length;x<g;x++)if(c[x]&&l[x]){let p=!1;if(f&&(this.getMatrixAt(x,Oi),this.getBoundingSphereAt(x,ls).applyMatrix4(Oi),p=!th.intersectsSphere(ls)),!p){const y=d[x];h[m]=y.start*a,u[m]=y.count,m++}}this._multiDrawCount=m,this._visibilityChanged=!1}onBeforeShadow(e,t,n,i,r,o){this.onBeforeRender(e,null,i,r,o)}}class en extends Yt{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ge(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Rl=new R,Cl=new R,qf=new Pe,io=new Vs,Wa=new Xt,ih=new R,Yf=new R;class Wi extends et{constructor(e=new He,t=new en){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Rl.fromBufferAttribute(t,i-1),Cl.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Rl.distanceTo(Cl);e.setAttribute("lineDistance",new Me(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Wa.copy(n.boundingSphere),Wa.applyMatrix4(i),Wa.radius+=r,e.ray.intersectsSphere(Wa)===!1)return;qf.copy(i).invert(),io.copy(e.ray).applyMatrix4(qf);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let x=f,g=m-1;x<g;x+=c){const p=h.getX(x),y=h.getX(x+1),_=Xa(this,e,io,l,p,y);_&&t.push(_)}if(this.isLineLoop){const x=h.getX(m-1),g=h.getX(f),p=Xa(this,e,io,l,x,g);p&&t.push(p)}}else{const f=Math.max(0,o.start),m=Math.min(d.count,o.start+o.count);for(let x=f,g=m-1;x<g;x+=c){const p=Xa(this,e,io,l,x,x+1);p&&t.push(p)}if(this.isLineLoop){const x=Xa(this,e,io,l,m-1,f);x&&t.push(x)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Xa(s,e,t,n,i,r){const o=s.geometry.attributes.position;if(Rl.fromBufferAttribute(o,i),Cl.fromBufferAttribute(o,r),t.distanceSqToSegment(Rl,Cl,ih,Yf)>n)return;ih.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(ih);if(!(l<e.near||l>e.far))return{distance:l,point:Yf.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,object:s}}const $f=new R,Zf=new R;class Zn extends Wi{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)$f.fromBufferAttribute(t,i),Zf.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+$f.distanceTo(Zf);e.setAttribute("lineDistance",new Me(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Tg extends Wi{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class ia extends Yt{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ge(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Kf=new Pe,cu=new Vs,qa=new Xt,Ya=new R;class jl extends et{constructor(e=new He,t=new ia){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),qa.copy(n.boundingSphere),qa.applyMatrix4(i),qa.radius+=r,e.ray.intersectsSphere(qa)===!1)return;Kf.copy(i).invert(),cu.copy(e.ray).applyMatrix4(Kf);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let m=d,x=f;m<x;m++){const g=c.getX(m);Ya.fromBufferAttribute(u,g),Jf(Ya,g,l,i,e,t,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let m=d,x=f;m<x;m++)Ya.fromBufferAttribute(u,m),Jf(Ya,m,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Jf(s,e,t,n,i,r,o){const a=cu.distanceSqToPoint(s);if(a<t){const l=new R;cu.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}class LS extends yt{constructor(e,t,n,i,r,o,a,l,c){super(e,t,n,i,r,o,a,l,c),this.isVideoTexture=!0,this.minFilter=o!==void 0?o:Rt,this.magFilter=r!==void 0?r:Rt,this.generateMipmaps=!1;const h=this;function u(){h.needsUpdate=!0,e.requestVideoFrameCallback(u)}"requestVideoFrameCallback"in e&&e.requestVideoFrameCallback(u)}clone(){return new this.constructor(this.image).copy(this)}update(){const e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}}class DS extends yt{constructor(e,t){super({width:e,height:t}),this.isFramebufferTexture=!0,this.magFilter=Ot,this.minFilter=Ot,this.generateMipmaps=!1,this.needsUpdate=!0}}class Ql extends yt{constructor(e,t,n,i,r,o,a,l,c,h,u,d){super(null,o,a,l,c,h,i,r,u,d),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}}class NS extends Ql{constructor(e,t,n,i,r,o){super(e,t,n,r,o),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=Mn,this.layerUpdates=new Set}addLayerUpdates(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class US extends Ql{constructor(e,t,n){super(void 0,e[0].width,e[0].height,t,n,bi),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=e}}class nd extends yt{constructor(e,t,n,i,r,o,a,l,c){super(e,t,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class On{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);const h=n[i],d=n[i+1]-h,f=(o-h)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);const o=this.getPoint(i),a=this.getPoint(r),l=t||(o.isVector2?new K:new R);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new R,i=[],r=[],o=[],a=new R,l=new Pe;for(let f=0;f<=e;f++){const m=f/e;i[f]=this.getTangentAt(m,new R)}r[0]=new R,o[0]=new R;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(_t(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,m))}o[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(_t(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let m=1;m<=e;m++)r[m].applyMatrix4(l.makeRotationAxis(i[m],f*m)),o[m].crossVectors(i[m],r[m])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class ec extends On{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new K){const n=t,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Ag extends ec{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function id(){let s=0,e=0,t=0,n=0;function i(r,o,a,l){s=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,i(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return s+e*r+t*o+n*a}}}const $a=new R,sh=new id,rh=new id,oh=new id;class sd extends On{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new R){const n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%r]:($a.subVectors(i[0],i[1]).add(i[0]),c=$a);const u=i[a%r],d=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:($a.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=$a),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(u),f),x=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);x<1e-4&&(x=1),m<1e-4&&(m=x),g<1e-4&&(g=x),sh.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,m,x,g),rh.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,m,x,g),oh.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,m,x,g)}else this.curveType==="catmullrom"&&(sh.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),rh.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),oh.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(sh.calc(l),rh.calc(l),oh.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new R().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function jf(s,e,t,n,i){const r=(n-e)*.5,o=(i-t)*.5,a=s*s,l=s*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*s+t}function OS(s,e){const t=1-s;return t*t*e}function FS(s,e){return 2*(1-s)*s*e}function BS(s,e){return s*s*e}function go(s,e,t,n){return OS(s,e)+FS(s,t)+BS(s,n)}function zS(s,e){const t=1-s;return t*t*t*e}function kS(s,e){const t=1-s;return 3*t*t*s*e}function HS(s,e){return 3*(1-s)*s*s*e}function VS(s,e){return s*s*s*e}function xo(s,e,t,n,i){return zS(s,e)+kS(s,t)+HS(s,n)+VS(s,i)}class rd extends On{constructor(e=new K,t=new K,n=new K,i=new K){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new K){const n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(xo(e,i.x,r.x,o.x,a.x),xo(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Rg extends On{constructor(e=new R,t=new R,n=new R,i=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new R){const n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(xo(e,i.x,r.x,o.x,a.x),xo(e,i.y,r.y,o.y,a.y),xo(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class od extends On{constructor(e=new K,t=new K){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new K){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new K){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Cg extends On{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ad extends On{constructor(e=new K,t=new K,n=new K){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new K){const n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(go(e,i.x,r.x,o.x),go(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ld extends On{constructor(e=new R,t=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new R){const n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(go(e,i.x,r.x,o.x),go(e,i.y,r.y,o.y),go(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class cd extends On{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new K){const n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(jf(a,l.x,c.x,h.x,u.x),jf(a,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new K().fromArray(i))}return this}}var Pl=Object.freeze({__proto__:null,ArcCurve:Ag,CatmullRomCurve3:sd,CubicBezierCurve:rd,CubicBezierCurve3:Rg,EllipseCurve:ec,LineCurve:od,LineCurve3:Cg,QuadraticBezierCurve:ad,QuadraticBezierCurve3:ld,SplineCurve:cd});class Pg extends On{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Pl[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const o=r[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new Pl[i.type]().fromJSON(i))}return this}}class Oo extends Pg{constructor(e){super(),this.type="Path",this.currentPoint=new K,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new od(this.currentPoint.clone(),new K(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const r=new ad(this.currentPoint.clone(),new K(e,t),new K(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,o){const a=new rd(this.currentPoint.clone(),new K(e,t),new K(n,i),new K(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new cd(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,i,r,o),this}absarc(e,t,n,i,r,o){return this.absellipse(e,t,n,n,i,r,o),this}ellipse(e,t,n,i,r,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,r,o,a,l),this}absellipse(e,t,n,i,r,o,a,l){const c=new ec(e,t,n,i,r,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class sa extends He{constructor(e=[new K(0,-.5),new K(.5,0),new K(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=_t(i,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],h=1/t,u=new R,d=new K,f=new R,m=new R,x=new R;let g=0,p=0;for(let y=0;y<=e.length-1;y++)switch(y){case 0:g=e[y+1].x-e[y].x,p=e[y+1].y-e[y].y,f.x=p*1,f.y=-g,f.z=p*0,x.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(x.x,x.y,x.z);break;default:g=e[y+1].x-e[y].x,p=e[y+1].y-e[y].y,f.x=p*1,f.y=-g,f.z=p*0,m.copy(f),f.x+=x.x,f.y+=x.y,f.z+=x.z,f.normalize(),l.push(f.x,f.y,f.z),x.copy(m)}for(let y=0;y<=t;y++){const _=n+y*h*i,b=Math.sin(_),L=Math.cos(_);for(let A=0;A<=e.length-1;A++){u.x=e[A].x*b,u.y=e[A].y,u.z=e[A].x*L,o.push(u.x,u.y,u.z),d.x=y/t,d.y=A/(e.length-1),a.push(d.x,d.y);const T=l[3*A+0]*b,P=l[3*A+1],E=l[3*A+0]*L;c.push(T,P,E)}}for(let y=0;y<t;y++)for(let _=0;_<e.length-1;_++){const b=_+y*e.length,L=b,A=b+e.length,T=b+e.length+1,P=b+1;r.push(L,A,P),r.push(T,P,A)}this.setIndex(r),this.setAttribute("position",new Me(o,3)),this.setAttribute("uv",new Me(a,2)),this.setAttribute("normal",new Me(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new sa(e.points,e.segments,e.phiStart,e.phiLength)}}class tc extends sa{constructor(e=1,t=1,n=4,i=8){const r=new Oo;r.absarc(0,-t/2,e,Math.PI*1.5,0),r.absarc(0,t/2,e,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:i}}static fromJSON(e){return new tc(e.radius,e.length,e.capSegments,e.radialSegments)}}class Gr extends He{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const r=[],o=[],a=[],l=[],c=new R,h=new K;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){const f=n+u/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Me(o,3)),this.setAttribute("normal",new Me(a,3)),this.setAttribute("uv",new Me(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gr(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Wr extends He{constructor(e=1,t=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],d=[],f=[];let m=0;const x=[],g=n/2;let p=0;y(),o===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new Me(u,3)),this.setAttribute("normal",new Me(d,3)),this.setAttribute("uv",new Me(f,2));function y(){const b=new R,L=new R;let A=0;const T=(t-e)/n;for(let P=0;P<=r;P++){const E=[],M=P/r,C=M*(t-e)+e;for(let O=0;O<=i;O++){const N=O/i,q=N*l+a,Z=Math.sin(q),B=Math.cos(q);L.x=C*Z,L.y=-M*n+g,L.z=C*B,u.push(L.x,L.y,L.z),b.set(Z,T,B).normalize(),d.push(b.x,b.y,b.z),f.push(N,1-M),E.push(m++)}x.push(E)}for(let P=0;P<i;P++)for(let E=0;E<r;E++){const M=x[E][P],C=x[E+1][P],O=x[E+1][P+1],N=x[E][P+1];h.push(M,C,N),h.push(C,O,N),A+=6}c.addGroup(p,A,0),p+=A}function _(b){const L=m,A=new K,T=new R;let P=0;const E=b===!0?e:t,M=b===!0?1:-1;for(let O=1;O<=i;O++)u.push(0,g*M,0),d.push(0,M,0),f.push(.5,.5),m++;const C=m;for(let O=0;O<=i;O++){const q=O/i*l+a,Z=Math.cos(q),B=Math.sin(q);T.x=E*B,T.y=g*M,T.z=E*Z,u.push(T.x,T.y,T.z),d.push(0,M,0),A.x=Z*.5+.5,A.y=B*.5*M+.5,f.push(A.x,A.y),m++}for(let O=0;O<i;O++){const N=L+O,q=C+O;b===!0?h.push(q,q+1,N):h.push(q+1,q,N),P+=3}c.addGroup(p,P,b===!0?1:2),p+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wr(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class nc extends Wr{constructor(e=1,t=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new nc(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Zi extends He{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const r=[],o=[];a(i),c(n),h(),this.setAttribute("position",new Me(r,3)),this.setAttribute("normal",new Me(r.slice(),3)),this.setAttribute("uv",new Me(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(y){const _=new R,b=new R,L=new R;for(let A=0;A<t.length;A+=3)f(t[A+0],_),f(t[A+1],b),f(t[A+2],L),l(_,b,L,y)}function l(y,_,b,L){const A=L+1,T=[];for(let P=0;P<=A;P++){T[P]=[];const E=y.clone().lerp(b,P/A),M=_.clone().lerp(b,P/A),C=A-P;for(let O=0;O<=C;O++)O===0&&P===A?T[P][O]=E:T[P][O]=E.clone().lerp(M,O/C)}for(let P=0;P<A;P++)for(let E=0;E<2*(A-P)-1;E++){const M=Math.floor(E/2);E%2===0?(d(T[P][M+1]),d(T[P+1][M]),d(T[P][M])):(d(T[P][M+1]),d(T[P+1][M+1]),d(T[P+1][M]))}}function c(y){const _=new R;for(let b=0;b<r.length;b+=3)_.x=r[b+0],_.y=r[b+1],_.z=r[b+2],_.normalize().multiplyScalar(y),r[b+0]=_.x,r[b+1]=_.y,r[b+2]=_.z}function h(){const y=new R;for(let _=0;_<r.length;_+=3){y.x=r[_+0],y.y=r[_+1],y.z=r[_+2];const b=g(y)/2/Math.PI+.5,L=p(y)/Math.PI+.5;o.push(b,1-L)}m(),u()}function u(){for(let y=0;y<o.length;y+=6){const _=o[y+0],b=o[y+2],L=o[y+4],A=Math.max(_,b,L),T=Math.min(_,b,L);A>.9&&T<.1&&(_<.2&&(o[y+0]+=1),b<.2&&(o[y+2]+=1),L<.2&&(o[y+4]+=1))}}function d(y){r.push(y.x,y.y,y.z)}function f(y,_){const b=y*3;_.x=e[b+0],_.y=e[b+1],_.z=e[b+2]}function m(){const y=new R,_=new R,b=new R,L=new R,A=new K,T=new K,P=new K;for(let E=0,M=0;E<r.length;E+=9,M+=6){y.set(r[E+0],r[E+1],r[E+2]),_.set(r[E+3],r[E+4],r[E+5]),b.set(r[E+6],r[E+7],r[E+8]),A.set(o[M+0],o[M+1]),T.set(o[M+2],o[M+3]),P.set(o[M+4],o[M+5]),L.copy(y).add(_).add(b).divideScalar(3);const C=g(L);x(A,M+0,y,C),x(T,M+2,_,C),x(P,M+4,b,C)}}function x(y,_,b,L){L<0&&y.x===1&&(o[_]=y.x-1),b.x===0&&b.z===0&&(o[_]=L/2/Math.PI+.5)}function g(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zi(e.vertices,e.indices,e.radius,e.details)}}class ic extends Zi{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ic(e.radius,e.detail)}}const Za=new R,Ka=new R,ah=new R,Ja=new dn;class Ig extends He{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const i=Math.pow(10,4),r=Math.cos(Ds*t),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let m=0;m<l;m+=3){o?(c[0]=o.getX(m),c[1]=o.getX(m+1),c[2]=o.getX(m+2)):(c[0]=m,c[1]=m+1,c[2]=m+2);const{a:x,b:g,c:p}=Ja;if(x.fromBufferAttribute(a,c[0]),g.fromBufferAttribute(a,c[1]),p.fromBufferAttribute(a,c[2]),Ja.getNormal(ah),u[0]=`${Math.round(x.x*i)},${Math.round(x.y*i)},${Math.round(x.z*i)}`,u[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,u[2]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let y=0;y<3;y++){const _=(y+1)%3,b=u[y],L=u[_],A=Ja[h[y]],T=Ja[h[_]],P=`${b}_${L}`,E=`${L}_${b}`;E in d&&d[E]?(ah.dot(d[E].normal)<=r&&(f.push(A.x,A.y,A.z),f.push(T.x,T.y,T.z)),d[E]=null):P in d||(d[P]={index0:c[y],index1:c[_],normal:ah.clone()})}}for(const m in d)if(d[m]){const{index0:x,index1:g}=d[m];Za.fromBufferAttribute(a,x),Ka.fromBufferAttribute(a,g),f.push(Za.x,Za.y,Za.z),f.push(Ka.x,Ka.y,Ka.z)}this.setAttribute("position",new Me(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Ns extends Oo{constructor(e){super(e),this.uuid=xn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new Oo().fromJSON(i))}return this}}const GS={triangulate:function(s,e,t=2){const n=e&&e.length,i=n?e[0]*t:s.length;let r=Lg(s,0,i,t,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c,h,u,d,f;if(n&&(r=$S(s,e,r,t)),s.length>80*t){a=c=s[0],l=h=s[1];for(let m=t;m<i;m+=t)u=s[m],d=s[m+1],u<a&&(a=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);f=Math.max(c-a,h-l),f=f!==0?32767/f:0}return Fo(r,o,t,a,l,f,0),o}};function Lg(s,e,t,n,i){let r,o;if(i===rE(s,e,t,n)>0)for(r=e;r<t;r+=n)o=Qf(r,s[r],s[r+1],o);else for(r=t-n;r>=e;r-=n)o=Qf(r,s[r],s[r+1],o);return o&&sc(o,o.next)&&(zo(o),o=o.next),o}function ks(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(sc(t,t.next)||ut(t.prev,t,t.next)===0)){if(zo(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Fo(s,e,t,n,i,r,o){if(!s)return;!o&&r&&QS(s,n,i,r);let a=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,r?XS(s,n,i,r):WS(s)){e.push(l.i/t|0),e.push(s.i/t|0),e.push(c.i/t|0),zo(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=qS(ks(s),e,t),Fo(s,e,t,n,i,r,2)):o===2&&YS(s,e,t,n,i,r):Fo(ks(s),e,t,n,i,r,1);break}}}function WS(s){const e=s.prev,t=s,n=s.next;if(ut(e,t,n)>=0)return!1;const i=e.x,r=t.x,o=n.x,a=e.y,l=t.y,c=n.y,h=i<r?i<o?i:o:r<o?r:o,u=a<l?a<c?a:c:l<c?l:c,d=i>r?i>o?i:o:r>o?r:o,f=a>l?a>c?a:c:l>c?l:c;let m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=d&&m.y>=u&&m.y<=f&&Ar(i,a,r,l,o,c,m.x,m.y)&&ut(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function XS(s,e,t,n){const i=s.prev,r=s,o=s.next;if(ut(i,r,o)>=0)return!1;const a=i.x,l=r.x,c=o.x,h=i.y,u=r.y,d=o.y,f=a<l?a<c?a:c:l<c?l:c,m=h<u?h<d?h:d:u<d?u:d,x=a>l?a>c?a:c:l>c?l:c,g=h>u?h>d?h:d:u>d?u:d,p=hu(f,m,e,t,n),y=hu(x,g,e,t,n);let _=s.prevZ,b=s.nextZ;for(;_&&_.z>=p&&b&&b.z<=y;){if(_.x>=f&&_.x<=x&&_.y>=m&&_.y<=g&&_!==i&&_!==o&&Ar(a,h,l,u,c,d,_.x,_.y)&&ut(_.prev,_,_.next)>=0||(_=_.prevZ,b.x>=f&&b.x<=x&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Ar(a,h,l,u,c,d,b.x,b.y)&&ut(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;_&&_.z>=p;){if(_.x>=f&&_.x<=x&&_.y>=m&&_.y<=g&&_!==i&&_!==o&&Ar(a,h,l,u,c,d,_.x,_.y)&&ut(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;b&&b.z<=y;){if(b.x>=f&&b.x<=x&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Ar(a,h,l,u,c,d,b.x,b.y)&&ut(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function qS(s,e,t){let n=s;do{const i=n.prev,r=n.next.next;!sc(i,r)&&Dg(i,n,n.next,r)&&Bo(i,r)&&Bo(r,i)&&(e.push(i.i/t|0),e.push(n.i/t|0),e.push(r.i/t|0),zo(n),zo(n.next),n=s=r),n=n.next}while(n!==s);return ks(n)}function YS(s,e,t,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&nE(o,a)){let l=Ng(o,a);o=ks(o,o.next),l=ks(l,l.next),Fo(o,e,t,n,i,r,0),Fo(l,e,t,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function $S(s,e,t,n){const i=[];let r,o,a,l,c;for(r=0,o=e.length;r<o;r++)a=e[r]*n,l=r<o-1?e[r+1]*n:s.length,c=Lg(s,a,l,n,!1),c===c.next&&(c.steiner=!0),i.push(tE(c));for(i.sort(ZS),r=0;r<i.length;r++)t=KS(i[r],t);return t}function ZS(s,e){return s.x-e.x}function KS(s,e){const t=JS(s,e);if(!t)return e;const n=Ng(t,s);return ks(n,n.next),ks(t,t.next)}function JS(s,e){let t=e,n=-1/0,i;const r=s.x,o=s.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){const d=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=r&&d>n&&(n=d,i=t.x<t.next.x?t:t.next,d===r))return i}t=t.next}while(t!==e);if(!i)return null;const a=i,l=i.x,c=i.y;let h=1/0,u;t=i;do r>=t.x&&t.x>=l&&r!==t.x&&Ar(o<c?r:n,o,l,c,o<c?n:r,o,t.x,t.y)&&(u=Math.abs(o-t.y)/(r-t.x),Bo(t,s)&&(u<h||u===h&&(t.x>i.x||t.x===i.x&&jS(i,t)))&&(i=t,h=u)),t=t.next;while(t!==a);return i}function jS(s,e){return ut(s.prev,s,e.prev)<0&&ut(e.next,s,s.next)<0}function QS(s,e,t,n){let i=s;do i.z===0&&(i.z=hu(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,eE(i)}function eE(s){let e,t,n,i,r,o,a,l,c=1;do{for(t=s,s=null,r=null,o=0;t;){for(o++,n=t,a=0,e=0;e<c&&(a++,n=n.nextZ,!!n);e++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,a--):(i=n,n=n.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;t=n}r.nextZ=null,c*=2}while(o>1);return s}function hu(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function tE(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function Ar(s,e,t,n,i,r,o,a){return(i-o)*(e-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(i-o)*(n-a)}function nE(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!iE(s,e)&&(Bo(s,e)&&Bo(e,s)&&sE(s,e)&&(ut(s.prev,s,e.prev)||ut(s,e.prev,e))||sc(s,e)&&ut(s.prev,s,s.next)>0&&ut(e.prev,e,e.next)>0)}function ut(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function sc(s,e){return s.x===e.x&&s.y===e.y}function Dg(s,e,t,n){const i=Qa(ut(s,e,t)),r=Qa(ut(s,e,n)),o=Qa(ut(t,n,s)),a=Qa(ut(t,n,e));return!!(i!==r&&o!==a||i===0&&ja(s,t,e)||r===0&&ja(s,n,e)||o===0&&ja(t,s,n)||a===0&&ja(t,e,n))}function ja(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function Qa(s){return s>0?1:s<0?-1:0}function iE(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&Dg(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function Bo(s,e){return ut(s.prev,s,s.next)<0?ut(s,e,s.next)>=0&&ut(s,s.prev,e)>=0:ut(s,e,s.prev)<0||ut(s,s.next,e)<0}function sE(s,e){let t=s,n=!1;const i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function Ng(s,e){const t=new uu(s.i,s.x,s.y),n=new uu(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Qf(s,e,t,n){const i=new uu(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function zo(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function uu(s,e,t){this.i=s,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function rE(s,e,t,n){let i=0;for(let r=e,o=t-n;r<t;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}class Xn{static area(e){const t=e.length;let n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return Xn.area(e)<0}static triangulateShape(e,t){const n=[],i=[],r=[];ep(e),tp(n,e);let o=e.length;t.forEach(ep);for(let l=0;l<t.length;l++)i.push(o),o+=t[l].length,tp(n,t[l]);const a=GS.triangulate(n,i);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function ep(s){const e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function tp(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}class rc extends He{constructor(e=new Ns([new K(.5,.5),new K(-.5,.5),new K(-.5,-.5),new K(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],r=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];o(c)}this.setAttribute("position",new Me(i,3)),this.setAttribute("uv",new Me(r,2)),this.computeVertexNormals();function o(a){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:f-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,y=t.UVGenerator!==void 0?t.UVGenerator:oE;let _,b=!1,L,A,T,P;p&&(_=p.getSpacedPoints(h),b=!0,d=!1,L=p.computeFrenetFrames(h,!1),A=new R,T=new R,P=new R),d||(g=0,f=0,m=0,x=0);const E=a.extractPoints(c);let M=E.shape;const C=E.holes;if(!Xn.isClockWise(M)){M=M.reverse();for(let J=0,ee=C.length;J<ee;J++){const oe=C[J];Xn.isClockWise(oe)&&(C[J]=oe.reverse())}}const N=Xn.triangulateShape(M,C),q=M;for(let J=0,ee=C.length;J<ee;J++){const oe=C[J];M=M.concat(oe)}function Z(J,ee,oe){return ee||console.error("THREE.ExtrudeGeometry: vec does not exist"),J.clone().addScaledVector(ee,oe)}const B=M.length,W=N.length;function H(J,ee,oe){let ie,se,ye;const xe=J.x-ee.x,Ne=J.y-ee.y,I=oe.x-J.x,S=oe.y-J.y,V=xe*xe+Ne*Ne,Q=xe*S-Ne*I;if(Math.abs(Q)>Number.EPSILON){const j=Math.sqrt(V),te=Math.sqrt(I*I+S*S),Te=ee.x-Ne/j,he=ee.y+xe/j,ue=oe.x-S/te,Be=oe.y+I/te,ae=((ue-Te)*S-(Be-he)*I)/(xe*S-Ne*I);ie=Te+xe*ae-J.x,se=he+Ne*ae-J.y;const Se=ie*ie+se*se;if(Se<=2)return new K(ie,se);ye=Math.sqrt(Se/2)}else{let j=!1;xe>Number.EPSILON?I>Number.EPSILON&&(j=!0):xe<-Number.EPSILON?I<-Number.EPSILON&&(j=!0):Math.sign(Ne)===Math.sign(S)&&(j=!0),j?(ie=-Ne,se=xe,ye=Math.sqrt(V)):(ie=xe,se=Ne,ye=Math.sqrt(V/2))}return new K(ie/ye,se/ye)}const de=[];for(let J=0,ee=q.length,oe=ee-1,ie=J+1;J<ee;J++,oe++,ie++)oe===ee&&(oe=0),ie===ee&&(ie=0),de[J]=H(q[J],q[oe],q[ie]);const pe=[];let me,ke=de.concat();for(let J=0,ee=C.length;J<ee;J++){const oe=C[J];me=[];for(let ie=0,se=oe.length,ye=se-1,xe=ie+1;ie<se;ie++,ye++,xe++)ye===se&&(ye=0),xe===se&&(xe=0),me[ie]=H(oe[ie],oe[ye],oe[xe]);pe.push(me),ke=ke.concat(me)}for(let J=0;J<g;J++){const ee=J/g,oe=f*Math.cos(ee*Math.PI/2),ie=m*Math.sin(ee*Math.PI/2)+x;for(let se=0,ye=q.length;se<ye;se++){const xe=Z(q[se],de[se],ie);le(xe.x,xe.y,-oe)}for(let se=0,ye=C.length;se<ye;se++){const xe=C[se];me=pe[se];for(let Ne=0,I=xe.length;Ne<I;Ne++){const S=Z(xe[Ne],me[Ne],ie);le(S.x,S.y,-oe)}}}const Ze=m+x;for(let J=0;J<B;J++){const ee=d?Z(M[J],ke[J],Ze):M[J];b?(T.copy(L.normals[0]).multiplyScalar(ee.x),A.copy(L.binormals[0]).multiplyScalar(ee.y),P.copy(_[0]).add(T).add(A),le(P.x,P.y,P.z)):le(ee.x,ee.y,0)}for(let J=1;J<=h;J++)for(let ee=0;ee<B;ee++){const oe=d?Z(M[ee],ke[ee],Ze):M[ee];b?(T.copy(L.normals[J]).multiplyScalar(oe.x),A.copy(L.binormals[J]).multiplyScalar(oe.y),P.copy(_[J]).add(T).add(A),le(P.x,P.y,P.z)):le(oe.x,oe.y,u/h*J)}for(let J=g-1;J>=0;J--){const ee=J/g,oe=f*Math.cos(ee*Math.PI/2),ie=m*Math.sin(ee*Math.PI/2)+x;for(let se=0,ye=q.length;se<ye;se++){const xe=Z(q[se],de[se],ie);le(xe.x,xe.y,u+oe)}for(let se=0,ye=C.length;se<ye;se++){const xe=C[se];me=pe[se];for(let Ne=0,I=xe.length;Ne<I;Ne++){const S=Z(xe[Ne],me[Ne],ie);b?le(S.x,S.y+_[h-1].y,_[h-1].x+oe):le(S.x,S.y,u+oe)}}}$(),re();function $(){const J=i.length/3;if(d){let ee=0,oe=B*ee;for(let ie=0;ie<W;ie++){const se=N[ie];Oe(se[2]+oe,se[1]+oe,se[0]+oe)}ee=h+g*2,oe=B*ee;for(let ie=0;ie<W;ie++){const se=N[ie];Oe(se[0]+oe,se[1]+oe,se[2]+oe)}}else{for(let ee=0;ee<W;ee++){const oe=N[ee];Oe(oe[2],oe[1],oe[0])}for(let ee=0;ee<W;ee++){const oe=N[ee];Oe(oe[0]+B*h,oe[1]+B*h,oe[2]+B*h)}}n.addGroup(J,i.length/3-J,0)}function re(){const J=i.length/3;let ee=0;be(q,ee),ee+=q.length;for(let oe=0,ie=C.length;oe<ie;oe++){const se=C[oe];be(se,ee),ee+=se.length}n.addGroup(J,i.length/3-J,1)}function be(J,ee){let oe=J.length;for(;--oe>=0;){const ie=oe;let se=oe-1;se<0&&(se=J.length-1);for(let ye=0,xe=h+g*2;ye<xe;ye++){const Ne=B*ye,I=B*(ye+1),S=ee+ie+Ne,V=ee+se+Ne,Q=ee+se+I,j=ee+ie+I;Fe(S,V,Q,j)}}}function le(J,ee,oe){l.push(J),l.push(ee),l.push(oe)}function Oe(J,ee,oe){De(J),De(ee),De(oe);const ie=i.length/3,se=y.generateTopUV(n,i,ie-3,ie-2,ie-1);D(se[0]),D(se[1]),D(se[2])}function Fe(J,ee,oe,ie){De(J),De(ee),De(ie),De(ee),De(oe),De(ie);const se=i.length/3,ye=y.generateSideWallUV(n,i,se-6,se-3,se-2,se-1);D(ye[0]),D(ye[1]),D(ye[3]),D(ye[1]),D(ye[2]),D(ye[3])}function De(J){i.push(l[J*3+0]),i.push(l[J*3+1]),i.push(l[J*3+2])}function D(J){r.push(J.x),r.push(J.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return aE(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,o=e.shapes.length;r<o;r++){const a=t[e.shapes[r]];n.push(a)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new Pl[i.type]().fromJSON(i)),new rc(n,e.options)}}const oE={generateTopUV:function(s,e,t,n,i){const r=e[t*3],o=e[t*3+1],a=e[n*3],l=e[n*3+1],c=e[i*3],h=e[i*3+1];return[new K(r,o),new K(a,l),new K(c,h)]},generateSideWallUV:function(s,e,t,n,i,r){const o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],u=e[n*3+2],d=e[i*3],f=e[i*3+1],m=e[i*3+2],x=e[r*3],g=e[r*3+1],p=e[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new K(o,1-l),new K(c,1-u),new K(d,1-m),new K(x,1-p)]:[new K(a,1-l),new K(h,1-u),new K(f,1-m),new K(g,1-p)]}};function aE(s,e,t){if(t.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class oc extends Zi{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new oc(e.radius,e.detail)}}class ra extends Zi{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ra(e.radius,e.detail)}}class ac extends He{constructor(e=.5,t=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],l=[],c=[],h=[];let u=e;const d=(t-e)/i,f=new R,m=new K;for(let x=0;x<=i;x++){for(let g=0;g<=n;g++){const p=r+g/n*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/t+1)/2,m.y=(f.y/t+1)/2,h.push(m.x,m.y)}u+=d}for(let x=0;x<i;x++){const g=x*(n+1);for(let p=0;p<n;p++){const y=p+g,_=y,b=y+n+1,L=y+n+2,A=y+1;a.push(_,b,A),a.push(b,L,A)}}this.setIndex(a),this.setAttribute("position",new Me(l,3)),this.setAttribute("normal",new Me(c,3)),this.setAttribute("uv",new Me(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ac(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class lc extends He{constructor(e=new Ns([new K(0,.5),new K(-.5,-.5),new K(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],i=[],r=[],o=[];let a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new Me(i,3)),this.setAttribute("normal",new Me(r,3)),this.setAttribute("uv",new Me(o,2));function c(h){const u=i.length/3,d=h.extractPoints(t);let f=d.shape;const m=d.holes;Xn.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,p=m.length;g<p;g++){const y=m[g];Xn.isClockWise(y)===!0&&(m[g]=y.reverse())}const x=Xn.triangulateShape(f,m);for(let g=0,p=m.length;g<p;g++){const y=m[g];f=f.concat(y)}for(let g=0,p=f.length;g<p;g++){const y=f[g];i.push(y.x,y.y,0),r.push(0,0,1),o.push(y.x,y.y)}for(let g=0,p=x.length;g<p;g++){const y=x[g],_=y[0]+u,b=y[1]+u,L=y[2]+u;n.push(_,b,L),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return lE(t,e)}static fromJSON(e,t){const n=[];for(let i=0,r=e.shapes.length;i<r;i++){const o=t[e.shapes[i]];n.push(o)}return new lc(n,e.curveSegments)}}function lE(s,e){if(e.shapes=[],Array.isArray(s))for(let t=0,n=s.length;t<n;t++){const i=s[t];e.shapes.push(i.uuid)}else e.shapes.push(s.uuid);return e}class Ws extends He{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new R,d=new R,f=[],m=[],x=[],g=[];for(let p=0;p<=n;p++){const y=[],_=p/n;let b=0;p===0&&o===0?b=.5/t:p===n&&l===Math.PI&&(b=-.5/t);for(let L=0;L<=t;L++){const A=L/t;u.x=-e*Math.cos(i+A*r)*Math.sin(o+_*a),u.y=e*Math.cos(o+_*a),u.z=e*Math.sin(i+A*r)*Math.sin(o+_*a),m.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),g.push(A+b,1-_),y.push(c++)}h.push(y)}for(let p=0;p<n;p++)for(let y=0;y<t;y++){const _=h[p][y+1],b=h[p][y],L=h[p+1][y],A=h[p+1][y+1];(p!==0||o>0)&&f.push(_,b,A),(p!==n-1||l<Math.PI)&&f.push(b,L,A)}this.setIndex(f),this.setAttribute("position",new Me(m,3)),this.setAttribute("normal",new Me(x,3)),this.setAttribute("uv",new Me(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ws(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class cc extends Zi{constructor(e=1,t=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new cc(e.radius,e.detail)}}class hc extends He{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],l=[],c=[],h=new R,u=new R,d=new R;for(let f=0;f<=n;f++)for(let m=0;m<=i;m++){const x=m/i*r,g=f/n*Math.PI*2;u.x=(e+t*Math.cos(g))*Math.cos(x),u.y=(e+t*Math.cos(g))*Math.sin(x),u.z=t*Math.sin(g),a.push(u.x,u.y,u.z),h.x=e*Math.cos(x),h.y=e*Math.sin(x),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(m/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=i;m++){const x=(i+1)*f+m-1,g=(i+1)*(f-1)+m-1,p=(i+1)*(f-1)+m,y=(i+1)*f+m;o.push(x,g,y),o.push(g,p,y)}this.setIndex(o),this.setAttribute("position",new Me(a,3)),this.setAttribute("normal",new Me(l,3)),this.setAttribute("uv",new Me(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hc(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class uc extends He{constructor(e=1,t=.4,n=64,i=8,r=2,o=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:r,q:o},n=Math.floor(n),i=Math.floor(i);const a=[],l=[],c=[],h=[],u=new R,d=new R,f=new R,m=new R,x=new R,g=new R,p=new R;for(let _=0;_<=n;++_){const b=_/n*r*Math.PI*2;y(b,r,o,e,f),y(b+.01,r,o,e,m),g.subVectors(m,f),p.addVectors(m,f),x.crossVectors(g,p),p.crossVectors(x,g),x.normalize(),p.normalize();for(let L=0;L<=i;++L){const A=L/i*Math.PI*2,T=-t*Math.cos(A),P=t*Math.sin(A);u.x=f.x+(T*p.x+P*x.x),u.y=f.y+(T*p.y+P*x.y),u.z=f.z+(T*p.z+P*x.z),l.push(u.x,u.y,u.z),d.subVectors(u,f).normalize(),c.push(d.x,d.y,d.z),h.push(_/n),h.push(L/i)}}for(let _=1;_<=n;_++)for(let b=1;b<=i;b++){const L=(i+1)*(_-1)+(b-1),A=(i+1)*_+(b-1),T=(i+1)*_+b,P=(i+1)*(_-1)+b;a.push(L,A,P),a.push(A,T,P)}this.setIndex(a),this.setAttribute("position",new Me(l,3)),this.setAttribute("normal",new Me(c,3)),this.setAttribute("uv",new Me(h,2));function y(_,b,L,A,T){const P=Math.cos(_),E=Math.sin(_),M=L/b*_,C=Math.cos(M);T.x=A*(2+C)*.5*P,T.y=A*(2+C)*E*.5,T.z=A*Math.sin(M)*.5}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new uc(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}}class oa extends He{constructor(e=new ld(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};const o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new R,l=new R,c=new K;let h=new R;const u=[],d=[],f=[],m=[];x(),this.setIndex(m),this.setAttribute("position",new Me(u,3)),this.setAttribute("normal",new Me(d,3)),this.setAttribute("uv",new Me(f,2));function x(){for(let _=0;_<t;_++)g(_);g(r===!1?t:0),y(),p()}function g(_){h=e.getPointAt(_/t,h);const b=o.normals[_],L=o.binormals[_];for(let A=0;A<=i;A++){const T=A/i*Math.PI*2,P=Math.sin(T),E=-Math.cos(T);l.x=E*b.x+P*L.x,l.y=E*b.y+P*L.y,l.z=E*b.z+P*L.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function p(){for(let _=1;_<=t;_++)for(let b=1;b<=i;b++){const L=(i+1)*(_-1)+(b-1),A=(i+1)*_+(b-1),T=(i+1)*_+b,P=(i+1)*(_-1)+b;m.push(L,A,P),m.push(A,T,P)}}function y(){for(let _=0;_<=t;_++)for(let b=0;b<=i;b++)c.x=_/t,c.y=b/i,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new oa(new Pl[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class Ug extends He{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const t=[],n=new Set,i=new R,r=new R;if(e.index!==null){const o=e.attributes.position,a=e.index;let l=e.groups;l.length===0&&(l=[{start:0,count:a.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){const u=l[c],d=u.start,f=u.count;for(let m=d,x=d+f;m<x;m+=3)for(let g=0;g<3;g++){const p=a.getX(m+g),y=a.getX(m+(g+1)%3);i.fromBufferAttribute(o,p),r.fromBufferAttribute(o,y),np(i,r,n)===!0&&(t.push(i.x,i.y,i.z),t.push(r.x,r.y,r.z))}}}else{const o=e.attributes.position;for(let a=0,l=o.count/3;a<l;a++)for(let c=0;c<3;c++){const h=3*a+c,u=3*a+(c+1)%3;i.fromBufferAttribute(o,h),r.fromBufferAttribute(o,u),np(i,r,n)===!0&&(t.push(i.x,i.y,i.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new Me(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function np(s,e,t){const n=`${s.x},${s.y},${s.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${s.x},${s.y},${s.z}`;return t.has(n)===!0||t.has(i)===!0?!1:(t.add(n),t.add(i),!0)}var ip=Object.freeze({__proto__:null,BoxGeometry:Gs,CapsuleGeometry:tc,CircleGeometry:Gr,ConeGeometry:nc,CylinderGeometry:Wr,DodecahedronGeometry:ic,EdgesGeometry:Ig,ExtrudeGeometry:rc,IcosahedronGeometry:oc,LatheGeometry:sa,OctahedronGeometry:ra,PlaneGeometry:Hr,PolyhedronGeometry:Zi,RingGeometry:ac,ShapeGeometry:lc,SphereGeometry:Ws,TetrahedronGeometry:cc,TorusGeometry:hc,TorusKnotGeometry:uc,TubeGeometry:oa,WireframeGeometry:Ug});class Og extends Yt{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new ge(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}class Fg extends Un{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Xr extends Yt{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ge(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$i,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Bg extends Xr{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new K(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return _t(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ge(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ge(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ge(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class zg extends Yt{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new ge(16777215),this.specular=new ge(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$i,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.combine=Jo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class kg extends Yt{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new ge(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$i,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}class Hg extends Yt{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$i,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class Vg extends Yt{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$i,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.combine=Jo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Gg extends Yt{constructor(e){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new ge(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$i,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Wg extends en{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}function Cs(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function Xg(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function qg(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function du(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let l=0;l!==e;++l)i[o++]=s[a+l]}return i}function hd(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)}function cE(s,e,t,n,i=30){const r=s.clone();r.name=e;const o=[];for(let l=0;l<r.tracks.length;++l){const c=r.tracks[l],h=c.getValueSize(),u=[],d=[];for(let f=0;f<c.times.length;++f){const m=c.times[f]*i;if(!(m<t||m>=n)){u.push(c.times[f]);for(let x=0;x<h;++x)d.push(c.values[f*h+x])}}u.length!==0&&(c.times=Cs(u,c.times.constructor),c.values=Cs(d,c.values.constructor),o.push(c))}r.tracks=o;let a=1/0;for(let l=0;l<r.tracks.length;++l)a>r.tracks[l].times[0]&&(a=r.tracks[l].times[0]);for(let l=0;l<r.tracks.length;++l)r.tracks[l].shift(-1*a);return r.resetDuration(),r}function hE(s,e=0,t=s,n=30){n<=0&&(n=30);const i=t.tracks.length,r=e/n;for(let o=0;o<i;++o){const a=t.tracks[o],l=a.ValueTypeName;if(l==="bool"||l==="string")continue;const c=s.tracks.find(function(p){return p.name===a.name&&p.ValueTypeName===l});if(c===void 0)continue;let h=0;const u=a.getValueSize();a.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(h=u/3);let d=0;const f=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(d=f/3);const m=a.times.length-1;let x;if(r<=a.times[0]){const p=h,y=u-h;x=a.values.slice(p,y)}else if(r>=a.times[m]){const p=m*u+h,y=p+u-h;x=a.values.slice(p,y)}else{const p=a.createInterpolant(),y=h,_=u-h;p.evaluate(r),x=p.resultBuffer.slice(y,_)}l==="quaternion"&&new Wt().fromArray(x).normalize().conjugate().toArray(x);const g=c.times.length;for(let p=0;p<g;++p){const y=p*f+d;if(l==="quaternion")Wt.multiplyQuaternionsFlat(c.values,y,x,0,c.values,y);else{const _=f-d*2;for(let b=0;b<_;++b)c.values[y+b]-=x[b]}}}return s.blendMode=Vu,s}const uE={convertArray:Cs,isTypedArray:Xg,getKeyframeOrder:qg,sortedArray:du,flattenJSON:hd,subclip:cE,makeClipAdditive:hE};class aa{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Yg extends aa{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ts,endingEnd:Ts}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,o=e+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case As:r=e,a=2*t-n;break;case Co:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case As:o=e,l=2*n-t;break;case Co:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-t)/(i-t),x=m*m,g=x*m,p=-d*g+2*d*x-d*m,y=(1+d)*g+(-1.5-2*d)*x+(-.5+d)*m+1,_=(-1-f)*g+(1.5+f)*x+.5*m,b=f*g-f*x;for(let L=0;L!==a;++L)r[L]=p*o[h+L]+y*o[c+L]+_*o[l+L]+b*o[u+L];return r}}class ud extends aa{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}}class $g extends aa{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Fn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Cs(t,this.TimeBufferType),this.values=Cs(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Cs(e.times,Array),values:Cs(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new $g(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ud(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Yg(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Ro:t=this.InterpolantFactoryMethodDiscrete;break;case Al:t=this.InterpolantFactoryMethodLinear;break;case xl:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ro;case this.InterpolantFactoryMethodLinear:return Al;case this.InterpolantFactoryMethodSmooth:return xl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&Xg(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===xl,r=e.length-1;let o=1;for(let a=1;a<r;++a){let l=!1;const c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{const u=a*n,d=u-n,f=u+n;for(let m=0;m!==n;++m){const x=t[u+m];if(x!==t[d+m]||x!==t[f+m]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Fn.prototype.TimeBufferType=Float32Array;Fn.prototype.ValueBufferType=Float32Array;Fn.prototype.DefaultInterpolation=Al;class Xs extends Fn{constructor(e,t,n){super(e,t,n)}}Xs.prototype.ValueTypeName="bool";Xs.prototype.ValueBufferType=Array;Xs.prototype.DefaultInterpolation=Ro;Xs.prototype.InterpolantFactoryMethodLinear=void 0;Xs.prototype.InterpolantFactoryMethodSmooth=void 0;class dd extends Fn{}dd.prototype.ValueTypeName="color";class ko extends Fn{}ko.prototype.ValueTypeName="number";class Zg extends aa{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let h=c+a;c!==h;c+=4)Wt.slerpFlat(r,0,o,c-a,o,c,l);return r}}class la extends Fn{InterpolantFactoryMethodLinear(e){return new Zg(this.times,this.values,this.getValueSize(),e)}}la.prototype.ValueTypeName="quaternion";la.prototype.InterpolantFactoryMethodSmooth=void 0;class qs extends Fn{constructor(e,t,n){super(e,t,n)}}qs.prototype.ValueTypeName="string";qs.prototype.ValueBufferType=Array;qs.prototype.DefaultInterpolation=Ro;qs.prototype.InterpolantFactoryMethodLinear=void 0;qs.prototype.InterpolantFactoryMethodSmooth=void 0;class Ho extends Fn{}Ho.prototype.ValueTypeName="vector";class Vo{constructor(e="",t=-1,n=[],i=Hl){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=xn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(fE(n[o]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(Fn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);const h=qg(l);l=du(l,1,h),c=du(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new ko(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],h=c.name.match(r);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,m,x){if(f.length!==0){const g=[],p=[];hd(f,g,p,m),g.length!==0&&x.push(new u(d,g,p))}},i=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let x=0;x<d[m].morphTargets.length;x++)f[d[m].morphTargets[x]]=-1;for(const x in f){const g=[],p=[];for(let y=0;y!==d[m].morphTargets.length;++y){const _=d[m];g.push(_.time),p.push(_.morphTarget===x?1:0)}i.push(new ko(".morphTargetInfluence["+x+"]",g,p))}l=f.length*o}else{const f=".bones["+t[u].name+"]";n(Ho,f+".position",d,"pos",i),n(la,f+".quaternion",d,"rot",i),n(Ho,f+".scale",d,"scl",i)}}return i.length===0?null:new this(r,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function dE(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ko;case"vector":case"vector2":case"vector3":case"vector4":return Ho;case"color":return dd;case"quaternion":return la;case"bool":case"boolean":return Xs;case"string":return qs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function fE(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=dE(s.type);if(s.times===void 0){const t=[],n=[];hd(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const fi={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class fd{constructor(e,t,n){const i=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],m=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null}}}const Kg=new fd;class rn{constructor(e){this.manager=e!==void 0?e:Kg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}rn.DEFAULT_MATERIAL_NAME="__DEFAULT";const ni={};class pE extends Error{constructor(e,t){super(e),this.response=t}}class Si extends rn{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=fi.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(ni[e]!==void 0){ni[e].push({onLoad:t,onProgress:n,onError:i});return}ni[e]=[],ni[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=ni[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,m=f!==0;let x=0;const g=new ReadableStream({start(p){y();function y(){u.read().then(({done:_,value:b})=>{if(_)p.close();else{x+=b.byteLength;const L=new ProgressEvent("progress",{lengthComputable:m,loaded:x,total:f});for(let A=0,T=h.length;A<T;A++){const P=h[A];P.onProgress&&P.onProgress(L)}p.enqueue(b),y()}},_=>{p.error(_)})}}});return new Response(g)}else throw new pE(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(m=>f.decode(m))}}}).then(c=>{fi.add(e,c);const h=ni[e];delete ni[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=ni[e];if(h===void 0)throw this.manager.itemError(e),c;delete ni[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class mE extends rn{constructor(e){super(e)}load(e,t,n,i){const r=this,o=new Si(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(a){try{t(r.parse(JSON.parse(a)))}catch(l){i?i(l):console.error(l),r.manager.itemError(e)}},n,i)}parse(e){const t=[];for(let n=0;n<e.length;n++){const i=Vo.parse(e[n]);t.push(i)}return t}}class gE extends rn{constructor(e){super(e)}load(e,t,n,i){const r=this,o=[],a=new Ql,l=new Si(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(r.withCredentials);let c=0;function h(u){l.load(e[u],function(d){const f=r.parse(d,!0);o[u]={width:f.width,height:f.height,format:f.format,mipmaps:f.mipmaps},c+=1,c===6&&(f.mipmapCount===1&&(a.minFilter=Rt),a.image=o,a.format=f.format,a.needsUpdate=!0,t&&t(a))},n,i)}if(Array.isArray(e))for(let u=0,d=e.length;u<d;++u)h(u);else l.load(e,function(u){const d=r.parse(u,!0);if(d.isCubemap){const f=d.mipmaps.length/d.mipmapCount;for(let m=0;m<f;m++){o[m]={mipmaps:[]};for(let x=0;x<d.mipmapCount;x++)o[m].mipmaps.push(d.mipmaps[m*d.mipmapCount+x]),o[m].format=d.format,o[m].width=d.width,o[m].height=d.height}a.image=o}else a.image.width=d.width,a.image.height=d.height,a.mipmaps=d.mipmaps;d.mipmapCount===1&&(a.minFilter=Rt),a.format=d.format,a.needsUpdate=!0,t&&t(a)},n,i);return a}}class Go extends rn{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=fi.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=Uo("img");function l(){h(),fi.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(u){h(),i&&i(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class xE extends rn{constructor(e){super(e)}load(e,t,n,i){const r=new ea;r.colorSpace=un;const o=new Go(this.manager);o.setCrossOrigin(this.crossOrigin),o.setPath(this.path);let a=0;function l(c){o.load(e[c],function(h){r.images[c]=h,a++,a===6&&(r.needsUpdate=!0,t&&t(r))},void 0,i)}for(let c=0;c<e.length;++c)l(c);return r}}class _E extends rn{constructor(e){super(e)}load(e,t,n,i){const r=this,o=new _i,a=new Si(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(r.withCredentials),a.load(e,function(l){let c;try{c=r.parse(l)}catch(h){if(i!==void 0)i(h);else{console.error(h);return}}c.image!==void 0?o.image=c.image:c.data!==void 0&&(o.image.width=c.width,o.image.height=c.height,o.image.data=c.data),o.wrapS=c.wrapS!==void 0?c.wrapS:Mn,o.wrapT=c.wrapT!==void 0?c.wrapT:Mn,o.magFilter=c.magFilter!==void 0?c.magFilter:Rt,o.minFilter=c.minFilter!==void 0?c.minFilter:Rt,o.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0&&(o.colorSpace=c.colorSpace),c.flipY!==void 0&&(o.flipY=c.flipY),c.format!==void 0&&(o.format=c.format),c.type!==void 0&&(o.type=c.type),c.mipmaps!==void 0&&(o.mipmaps=c.mipmaps,o.minFilter=Vn),c.mipmapCount===1&&(o.minFilter=Rt),c.generateMipmaps!==void 0&&(o.generateMipmaps=c.generateMipmaps),o.needsUpdate=!0,t&&t(o,c)},n,i),o}}class yE extends rn{constructor(e){super(e)}load(e,t,n,i){const r=new yt,o=new Go(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class Ki extends et{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ge(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class Jg extends Ki{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(et.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ge(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const lh=new Pe,sp=new R,rp=new R;class pd{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new K(512,512),this.map=null,this.mapPass=null,this.matrix=new Pe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ta,this._frameExtents=new K(1,1),this._viewportCount=1,this._viewports=[new ot(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;sp.setFromMatrixPosition(e.matrixWorld),t.position.copy(sp),rp.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(rp),t.updateMatrixWorld(),lh.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(lh),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(lh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class vE extends pd{constructor(){super(new Ut(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Lr*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class jg extends Ki{constructor(e,t,n=0,i=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(et.DEFAULT_UP),this.updateMatrix(),this.target=new et,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new vE}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const op=new Pe,so=new R,ch=new R;class bE extends pd{constructor(){super(new Ut(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new K(4,2),this._viewportCount=6,this._viewports=[new ot(2,1,1,1),new ot(0,1,1,1),new ot(3,1,1,1),new ot(1,1,1,1),new ot(3,0,1,1),new ot(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),so.setFromMatrixPosition(e.matrixWorld),n.position.copy(so),ch.copy(n.position),ch.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(ch),n.updateMatrixWorld(),i.makeTranslation(-so.x,-so.y,-so.z),op.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(op)}}class md extends Ki{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new bE}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class ME extends pd{constructor(){super(new Yl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Il extends Ki{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(et.DEFAULT_UP),this.updateMatrix(),this.target=new et,this.shadow=new ME}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class gd extends Ki{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Qg extends Ki{constructor(e,t,n=10,i=10){super(e,t),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(e){this.intensity=e/(this.width*this.height*Math.PI)}copy(e){return super.copy(e),this.width=e.width,this.height=e.height,this}toJSON(e){const t=super.toJSON(e);return t.object.width=this.width,t.object.height=this.height,t}}class e0{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new R)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){const n=e.x,i=e.y,r=e.z,o=this.coefficients;return t.copy(o[0]).multiplyScalar(.282095),t.addScaledVector(o[1],.488603*i),t.addScaledVector(o[2],.488603*r),t.addScaledVector(o[3],.488603*n),t.addScaledVector(o[4],1.092548*(n*i)),t.addScaledVector(o[5],1.092548*(i*r)),t.addScaledVector(o[6],.315392*(3*r*r-1)),t.addScaledVector(o[7],1.092548*(n*r)),t.addScaledVector(o[8],.546274*(n*n-i*i)),t}getIrradianceAt(e,t){const n=e.x,i=e.y,r=e.z,o=this.coefficients;return t.copy(o[0]).multiplyScalar(.886227),t.addScaledVector(o[1],2*.511664*i),t.addScaledVector(o[2],2*.511664*r),t.addScaledVector(o[3],2*.511664*n),t.addScaledVector(o[4],2*.429043*n*i),t.addScaledVector(o[5],2*.429043*i*r),t.addScaledVector(o[6],.743125*r*r-.247708),t.addScaledVector(o[7],2*.429043*n*r),t.addScaledVector(o[8],.429043*(n*n-i*i)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(e.coefficients[n],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let n=0;n<9;n++)this.coefficients[n].lerp(e.coefficients[n],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(e,t+i*3);return this}toArray(e=[],t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(e,t+i*3);return e}static getBasisAt(e,t){const n=e.x,i=e.y,r=e.z;t[0]=.282095,t[1]=.488603*i,t[2]=.488603*r,t[3]=.488603*n,t[4]=1.092548*n*i,t[5]=1.092548*i*r,t[6]=.315392*(3*r*r-1),t[7]=1.092548*n*r,t[8]=.546274*(n*n-i*i)}}class t0 extends Ki{constructor(e=new e0,t=1){super(void 0,t),this.isLightProbe=!0,this.sh=e}copy(e){return super.copy(e),this.sh.copy(e.sh),this}fromJSON(e){return this.intensity=e.intensity,this.sh.fromArray(e.sh),this}toJSON(e){const t=super.toJSON(e);return t.object.sh=this.sh.toArray(),t}}class dc extends rn{constructor(e){super(e),this.textures={}}load(e,t,n,i){const r=this,o=new Si(r.manager);o.setPath(r.path),o.setRequestHeader(r.requestHeader),o.setWithCredentials(r.withCredentials),o.load(e,function(a){try{t(r.parse(JSON.parse(a)))}catch(l){i?i(l):console.error(l),r.manager.itemError(e)}},n,i)}parse(e){const t=this.textures;function n(r){return t[r]===void 0&&console.warn("THREE.MaterialLoader: Undefined texture",r),t[r]}const i=dc.createMaterialFromType(e.type);if(e.uuid!==void 0&&(i.uuid=e.uuid),e.name!==void 0&&(i.name=e.name),e.color!==void 0&&i.color!==void 0&&i.color.setHex(e.color),e.roughness!==void 0&&(i.roughness=e.roughness),e.metalness!==void 0&&(i.metalness=e.metalness),e.sheen!==void 0&&(i.sheen=e.sheen),e.sheenColor!==void 0&&(i.sheenColor=new ge().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(i.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&i.emissive!==void 0&&i.emissive.setHex(e.emissive),e.specular!==void 0&&i.specular!==void 0&&i.specular.setHex(e.specular),e.specularIntensity!==void 0&&(i.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&i.specularColor!==void 0&&i.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(i.shininess=e.shininess),e.clearcoat!==void 0&&(i.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(i.dispersion=e.dispersion),e.iridescence!==void 0&&(i.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(i.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(i.transmission=e.transmission),e.thickness!==void 0&&(i.thickness=e.thickness),e.attenuationDistance!==void 0&&(i.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&i.attenuationColor!==void 0&&i.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(i.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(i.fog=e.fog),e.flatShading!==void 0&&(i.flatShading=e.flatShading),e.blending!==void 0&&(i.blending=e.blending),e.combine!==void 0&&(i.combine=e.combine),e.side!==void 0&&(i.side=e.side),e.shadowSide!==void 0&&(i.shadowSide=e.shadowSide),e.opacity!==void 0&&(i.opacity=e.opacity),e.transparent!==void 0&&(i.transparent=e.transparent),e.alphaTest!==void 0&&(i.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(i.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(i.depthFunc=e.depthFunc),e.depthTest!==void 0&&(i.depthTest=e.depthTest),e.depthWrite!==void 0&&(i.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(i.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(i.blendSrc=e.blendSrc),e.blendDst!==void 0&&(i.blendDst=e.blendDst),e.blendEquation!==void 0&&(i.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(i.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(i.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(i.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&i.blendColor!==void 0&&i.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(i.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(i.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(i.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(i.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(i.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(i.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(i.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(i.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(i.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(i.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(i.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(i.rotation=e.rotation),e.linewidth!==void 0&&(i.linewidth=e.linewidth),e.dashSize!==void 0&&(i.dashSize=e.dashSize),e.gapSize!==void 0&&(i.gapSize=e.gapSize),e.scale!==void 0&&(i.scale=e.scale),e.polygonOffset!==void 0&&(i.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(i.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(i.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(i.dithering=e.dithering),e.alphaToCoverage!==void 0&&(i.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(i.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(i.forceSinglePass=e.forceSinglePass),e.visible!==void 0&&(i.visible=e.visible),e.toneMapped!==void 0&&(i.toneMapped=e.toneMapped),e.userData!==void 0&&(i.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?i.vertexColors=e.vertexColors>0:i.vertexColors=e.vertexColors),e.uniforms!==void 0)for(const r in e.uniforms){const o=e.uniforms[r];switch(i.uniforms[r]={},o.type){case"t":i.uniforms[r].value=n(o.value);break;case"c":i.uniforms[r].value=new ge().setHex(o.value);break;case"v2":i.uniforms[r].value=new K().fromArray(o.value);break;case"v3":i.uniforms[r].value=new R().fromArray(o.value);break;case"v4":i.uniforms[r].value=new ot().fromArray(o.value);break;case"m3":i.uniforms[r].value=new We().fromArray(o.value);break;case"m4":i.uniforms[r].value=new Pe().fromArray(o.value);break;default:i.uniforms[r].value=o.value}}if(e.defines!==void 0&&(i.defines=e.defines),e.vertexShader!==void 0&&(i.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(i.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(i.glslVersion=e.glslVersion),e.extensions!==void 0)for(const r in e.extensions)i.extensions[r]=e.extensions[r];if(e.lights!==void 0&&(i.lights=e.lights),e.clipping!==void 0&&(i.clipping=e.clipping),e.size!==void 0&&(i.size=e.size),e.sizeAttenuation!==void 0&&(i.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(i.map=n(e.map)),e.matcap!==void 0&&(i.matcap=n(e.matcap)),e.alphaMap!==void 0&&(i.alphaMap=n(e.alphaMap)),e.bumpMap!==void 0&&(i.bumpMap=n(e.bumpMap)),e.bumpScale!==void 0&&(i.bumpScale=e.bumpScale),e.normalMap!==void 0&&(i.normalMap=n(e.normalMap)),e.normalMapType!==void 0&&(i.normalMapType=e.normalMapType),e.normalScale!==void 0){let r=e.normalScale;Array.isArray(r)===!1&&(r=[r,r]),i.normalScale=new K().fromArray(r)}return e.displacementMap!==void 0&&(i.displacementMap=n(e.displacementMap)),e.displacementScale!==void 0&&(i.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(i.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(i.roughnessMap=n(e.roughnessMap)),e.metalnessMap!==void 0&&(i.metalnessMap=n(e.metalnessMap)),e.emissiveMap!==void 0&&(i.emissiveMap=n(e.emissiveMap)),e.emissiveIntensity!==void 0&&(i.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(i.specularMap=n(e.specularMap)),e.specularIntensityMap!==void 0&&(i.specularIntensityMap=n(e.specularIntensityMap)),e.specularColorMap!==void 0&&(i.specularColorMap=n(e.specularColorMap)),e.envMap!==void 0&&(i.envMap=n(e.envMap)),e.envMapRotation!==void 0&&i.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(i.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(i.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(i.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(i.lightMap=n(e.lightMap)),e.lightMapIntensity!==void 0&&(i.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(i.aoMap=n(e.aoMap)),e.aoMapIntensity!==void 0&&(i.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(i.gradientMap=n(e.gradientMap)),e.clearcoatMap!==void 0&&(i.clearcoatMap=n(e.clearcoatMap)),e.clearcoatRoughnessMap!==void 0&&(i.clearcoatRoughnessMap=n(e.clearcoatRoughnessMap)),e.clearcoatNormalMap!==void 0&&(i.clearcoatNormalMap=n(e.clearcoatNormalMap)),e.clearcoatNormalScale!==void 0&&(i.clearcoatNormalScale=new K().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(i.iridescenceMap=n(e.iridescenceMap)),e.iridescenceThicknessMap!==void 0&&(i.iridescenceThicknessMap=n(e.iridescenceThicknessMap)),e.transmissionMap!==void 0&&(i.transmissionMap=n(e.transmissionMap)),e.thicknessMap!==void 0&&(i.thicknessMap=n(e.thicknessMap)),e.anisotropyMap!==void 0&&(i.anisotropyMap=n(e.anisotropyMap)),e.sheenColorMap!==void 0&&(i.sheenColorMap=n(e.sheenColorMap)),e.sheenRoughnessMap!==void 0&&(i.sheenRoughnessMap=n(e.sheenRoughnessMap)),i}setTextures(e){return this.textures=e,this}static createMaterialFromType(e){const t={ShadowMaterial:Og,SpriteMaterial:ed,RawShaderMaterial:Fg,ShaderMaterial:Un,PointsMaterial:ia,MeshPhysicalMaterial:Bg,MeshStandardMaterial:Xr,MeshPhongMaterial:zg,MeshToonMaterial:kg,MeshNormalMaterial:Hg,MeshLambertMaterial:Vg,MeshDepthMaterial:Ju,MeshDistanceMaterial:ju,MeshBasicMaterial:$n,MeshMatcapMaterial:Gg,LineDashedMaterial:Wg,LineBasicMaterial:en,Material:Yt};return new t[e]}}class fu{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class n0 extends He{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}class i0 extends rn{constructor(e){super(e)}load(e,t,n,i){const r=this,o=new Si(r.manager);o.setPath(r.path),o.setRequestHeader(r.requestHeader),o.setWithCredentials(r.withCredentials),o.load(e,function(a){try{t(r.parse(JSON.parse(a)))}catch(l){i?i(l):console.error(l),r.manager.itemError(e)}},n,i)}parse(e){const t={},n={};function i(f,m){if(t[m]!==void 0)return t[m];const g=f.interleavedBuffers[m],p=r(f,g.buffer),y=wr(g.type,p),_=new Kl(y,g.stride);return _.uuid=g.uuid,t[m]=_,_}function r(f,m){if(n[m]!==void 0)return n[m];const g=f.arrayBuffers[m],p=new Uint32Array(g).buffer;return n[m]=p,p}const o=e.isInstancedBufferGeometry?new n0:new He,a=e.data.index;if(a!==void 0){const f=wr(a.type,a.array);o.setIndex(new Qe(f,1))}const l=e.data.attributes;for(const f in l){const m=l[f];let x;if(m.isInterleavedBufferAttribute){const g=i(e.data,m.data);x=new zs(g,m.itemSize,m.offset,m.normalized)}else{const g=wr(m.type,m.array),p=m.isInstancedBufferAttribute?Nr:Qe;x=new p(g,m.itemSize,m.normalized)}m.name!==void 0&&(x.name=m.name),m.usage!==void 0&&x.setUsage(m.usage),o.setAttribute(f,x)}const c=e.data.morphAttributes;if(c)for(const f in c){const m=c[f],x=[];for(let g=0,p=m.length;g<p;g++){const y=m[g];let _;if(y.isInterleavedBufferAttribute){const b=i(e.data,y.data);_=new zs(b,y.itemSize,y.offset,y.normalized)}else{const b=wr(y.type,y.array);_=new Qe(b,y.itemSize,y.normalized)}y.name!==void 0&&(_.name=y.name),x.push(_)}o.morphAttributes[f]=x}e.data.morphTargetsRelative&&(o.morphTargetsRelative=!0);const u=e.data.groups||e.data.drawcalls||e.data.offsets;if(u!==void 0)for(let f=0,m=u.length;f!==m;++f){const x=u[f];o.addGroup(x.start,x.count,x.materialIndex)}const d=e.data.boundingSphere;if(d!==void 0){const f=new R;d.center!==void 0&&f.fromArray(d.center),o.boundingSphere=new Xt(f,d.radius)}return e.name&&(o.name=e.name),e.userData&&(o.userData=e.userData),o}}class SE extends rn{constructor(e){super(e)}load(e,t,n,i){const r=this,o=this.path===""?fu.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||o;const a=new Si(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(l){let c=null;try{c=JSON.parse(l)}catch(u){i!==void 0&&i(u),console.error("THREE:ObjectLoader: Can't parse "+e+".",u.message);return}const h=c.metadata;if(h===void 0||h.type===void 0||h.type.toLowerCase()==="geometry"){i!==void 0&&i(new Error("THREE.ObjectLoader: Can't load "+e)),console.error("THREE.ObjectLoader: Can't load "+e);return}r.parse(c,t)},n,i)}async loadAsync(e,t){const n=this,i=this.path===""?fu.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||i;const r=new Si(this.manager);r.setPath(this.path),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials);const o=await r.loadAsync(e,t),a=JSON.parse(o),l=a.metadata;if(l===void 0||l.type===void 0||l.type.toLowerCase()==="geometry")throw new Error("THREE.ObjectLoader: Can't load "+e);return await n.parseAsync(a)}parse(e,t){const n=this.parseAnimations(e.animations),i=this.parseShapes(e.shapes),r=this.parseGeometries(e.geometries,i),o=this.parseImages(e.images,function(){t!==void 0&&t(c)}),a=this.parseTextures(e.textures,o),l=this.parseMaterials(e.materials,a),c=this.parseObject(e.object,r,l,a,n),h=this.parseSkeletons(e.skeletons,c);if(this.bindSkeletons(c,h),t!==void 0){let u=!1;for(const d in o)if(o[d].data instanceof HTMLImageElement){u=!0;break}u===!1&&t(c)}return c}async parseAsync(e){const t=this.parseAnimations(e.animations),n=this.parseShapes(e.shapes),i=this.parseGeometries(e.geometries,n),r=await this.parseImagesAsync(e.images),o=this.parseTextures(e.textures,r),a=this.parseMaterials(e.materials,o),l=this.parseObject(e.object,i,a,o,t),c=this.parseSkeletons(e.skeletons,l);return this.bindSkeletons(l,c),l}parseShapes(e){const t={};if(e!==void 0)for(let n=0,i=e.length;n<i;n++){const r=new Ns().fromJSON(e[n]);t[r.uuid]=r}return t}parseSkeletons(e,t){const n={},i={};if(t.traverse(function(r){r.isBone&&(i[r.uuid]=r)}),e!==void 0)for(let r=0,o=e.length;r<o;r++){const a=new Jl().fromJSON(e[r],i);n[a.uuid]=a}return n}parseGeometries(e,t){const n={};if(e!==void 0){const i=new i0;for(let r=0,o=e.length;r<o;r++){let a;const l=e[r];switch(l.type){case"BufferGeometry":case"InstancedBufferGeometry":a=i.parse(l);break;default:l.type in ip?a=ip[l.type].fromJSON(l,t):console.warn(`THREE.ObjectLoader: Unsupported geometry type "${l.type}"`)}a.uuid=l.uuid,l.name!==void 0&&(a.name=l.name),l.userData!==void 0&&(a.userData=l.userData),n[l.uuid]=a}}return n}parseMaterials(e,t){const n={},i={};if(e!==void 0){const r=new dc;r.setTextures(t);for(let o=0,a=e.length;o<a;o++){const l=e[o];n[l.uuid]===void 0&&(n[l.uuid]=r.parse(l)),i[l.uuid]=n[l.uuid]}}return i}parseAnimations(e){const t={};if(e!==void 0)for(let n=0;n<e.length;n++){const i=e[n],r=Vo.parse(i);t[r.uuid]=r}return t}parseImages(e,t){const n=this,i={};let r;function o(l){return n.manager.itemStart(l),r.load(l,function(){n.manager.itemEnd(l)},void 0,function(){n.manager.itemError(l),n.manager.itemEnd(l)})}function a(l){if(typeof l=="string"){const c=l,h=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(c)?c:n.resourcePath+c;return o(h)}else return l.data?{data:wr(l.type,l.data),width:l.width,height:l.height}:null}if(e!==void 0&&e.length>0){const l=new fd(t);r=new Go(l),r.setCrossOrigin(this.crossOrigin);for(let c=0,h=e.length;c<h;c++){const u=e[c],d=u.url;if(Array.isArray(d)){const f=[];for(let m=0,x=d.length;m<x;m++){const g=d[m],p=a(g);p!==null&&(p instanceof HTMLImageElement?f.push(p):f.push(new _i(p.data,p.width,p.height)))}i[u.uuid]=new Rs(f)}else{const f=a(u.url);i[u.uuid]=new Rs(f)}}}return i}async parseImagesAsync(e){const t=this,n={};let i;async function r(o){if(typeof o=="string"){const a=o,l=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(a)?a:t.resourcePath+a;return await i.loadAsync(l)}else return o.data?{data:wr(o.type,o.data),width:o.width,height:o.height}:null}if(e!==void 0&&e.length>0){i=new Go(this.manager),i.setCrossOrigin(this.crossOrigin);for(let o=0,a=e.length;o<a;o++){const l=e[o],c=l.url;if(Array.isArray(c)){const h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u],m=await r(f);m!==null&&(m instanceof HTMLImageElement?h.push(m):h.push(new _i(m.data,m.width,m.height)))}n[l.uuid]=new Rs(h)}else{const h=await r(l.url);n[l.uuid]=new Rs(h)}}}return n}parseTextures(e,t){function n(r,o){return typeof r=="number"?r:(console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.",r),o[r])}const i={};if(e!==void 0)for(let r=0,o=e.length;r<o;r++){const a=e[r];a.image===void 0&&console.warn('THREE.ObjectLoader: No "image" specified for',a.uuid),t[a.image]===void 0&&console.warn("THREE.ObjectLoader: Undefined image",a.image);const l=t[a.image],c=l.data;let h;Array.isArray(c)?(h=new ea,c.length===6&&(h.needsUpdate=!0)):(c&&c.data?h=new _i:h=new yt,c&&(h.needsUpdate=!0)),h.source=l,h.uuid=a.uuid,a.name!==void 0&&(h.name=a.name),a.mapping!==void 0&&(h.mapping=n(a.mapping,EE)),a.channel!==void 0&&(h.channel=a.channel),a.offset!==void 0&&h.offset.fromArray(a.offset),a.repeat!==void 0&&h.repeat.fromArray(a.repeat),a.center!==void 0&&h.center.fromArray(a.center),a.rotation!==void 0&&(h.rotation=a.rotation),a.wrap!==void 0&&(h.wrapS=n(a.wrap[0],ap),h.wrapT=n(a.wrap[1],ap)),a.format!==void 0&&(h.format=a.format),a.internalFormat!==void 0&&(h.internalFormat=a.internalFormat),a.type!==void 0&&(h.type=a.type),a.colorSpace!==void 0&&(h.colorSpace=a.colorSpace),a.minFilter!==void 0&&(h.minFilter=n(a.minFilter,lp)),a.magFilter!==void 0&&(h.magFilter=n(a.magFilter,lp)),a.anisotropy!==void 0&&(h.anisotropy=a.anisotropy),a.flipY!==void 0&&(h.flipY=a.flipY),a.generateMipmaps!==void 0&&(h.generateMipmaps=a.generateMipmaps),a.premultiplyAlpha!==void 0&&(h.premultiplyAlpha=a.premultiplyAlpha),a.unpackAlignment!==void 0&&(h.unpackAlignment=a.unpackAlignment),a.compareFunction!==void 0&&(h.compareFunction=a.compareFunction),a.userData!==void 0&&(h.userData=a.userData),i[a.uuid]=h}return i}parseObject(e,t,n,i,r){let o;function a(d){return t[d]===void 0&&console.warn("THREE.ObjectLoader: Undefined geometry",d),t[d]}function l(d){if(d!==void 0){if(Array.isArray(d)){const f=[];for(let m=0,x=d.length;m<x;m++){const g=d[m];n[g]===void 0&&console.warn("THREE.ObjectLoader: Undefined material",g),f.push(n[g])}return f}return n[d]===void 0&&console.warn("THREE.ObjectLoader: Undefined material",d),n[d]}}function c(d){return i[d]===void 0&&console.warn("THREE.ObjectLoader: Undefined texture",d),i[d]}let h,u;switch(e.type){case"Scene":o=new Qu,e.background!==void 0&&(Number.isInteger(e.background)?o.background=new ge(e.background):o.background=c(e.background)),e.environment!==void 0&&(o.environment=c(e.environment)),e.fog!==void 0&&(e.fog.type==="Fog"?o.fog=new Zl(e.fog.color,e.fog.near,e.fog.far):e.fog.type==="FogExp2"&&(o.fog=new na(e.fog.color,e.fog.density)),e.fog.name!==""&&(o.fog.name=e.fog.name)),e.backgroundBlurriness!==void 0&&(o.backgroundBlurriness=e.backgroundBlurriness),e.backgroundIntensity!==void 0&&(o.backgroundIntensity=e.backgroundIntensity),e.backgroundRotation!==void 0&&o.backgroundRotation.fromArray(e.backgroundRotation),e.environmentIntensity!==void 0&&(o.environmentIntensity=e.environmentIntensity),e.environmentRotation!==void 0&&o.environmentRotation.fromArray(e.environmentRotation);break;case"PerspectiveCamera":o=new Ut(e.fov,e.aspect,e.near,e.far),e.focus!==void 0&&(o.focus=e.focus),e.zoom!==void 0&&(o.zoom=e.zoom),e.filmGauge!==void 0&&(o.filmGauge=e.filmGauge),e.filmOffset!==void 0&&(o.filmOffset=e.filmOffset),e.view!==void 0&&(o.view=Object.assign({},e.view));break;case"OrthographicCamera":o=new Yl(e.left,e.right,e.top,e.bottom,e.near,e.far),e.zoom!==void 0&&(o.zoom=e.zoom),e.view!==void 0&&(o.view=Object.assign({},e.view));break;case"AmbientLight":o=new gd(e.color,e.intensity);break;case"DirectionalLight":o=new Il(e.color,e.intensity);break;case"PointLight":o=new md(e.color,e.intensity,e.distance,e.decay);break;case"RectAreaLight":o=new Qg(e.color,e.intensity,e.width,e.height);break;case"SpotLight":o=new jg(e.color,e.intensity,e.distance,e.angle,e.penumbra,e.decay);break;case"HemisphereLight":o=new Jg(e.color,e.groundColor,e.intensity);break;case"LightProbe":o=new t0().fromJSON(e);break;case"SkinnedMesh":h=a(e.geometry),u=l(e.material),o=new Sg(h,u),e.bindMode!==void 0&&(o.bindMode=e.bindMode),e.bindMatrix!==void 0&&o.bindMatrix.fromArray(e.bindMatrix),e.skeleton!==void 0&&(o.skeleton=e.skeleton);break;case"Mesh":h=a(e.geometry),u=l(e.material),o=new ct(h,u);break;case"InstancedMesh":h=a(e.geometry),u=l(e.material);const d=e.count,f=e.instanceMatrix,m=e.instanceColor;o=new Eg(h,u,d),o.instanceMatrix=new Nr(new Float32Array(f.array),16),m!==void 0&&(o.instanceColor=new Nr(new Float32Array(m.array),m.itemSize));break;case"BatchedMesh":h=a(e.geometry),u=l(e.material),o=new wg(e.maxGeometryCount,e.maxVertexCount,e.maxIndexCount,u),o.geometry=h,o.perObjectFrustumCulled=e.perObjectFrustumCulled,o.sortObjects=e.sortObjects,o._drawRanges=e.drawRanges,o._reservedRanges=e.reservedRanges,o._visibility=e.visibility,o._active=e.active,o._bounds=e.bounds.map(x=>{const g=new Qt;g.min.fromArray(x.boxMin),g.max.fromArray(x.boxMax);const p=new Xt;return p.radius=x.sphereRadius,p.center.fromArray(x.sphereCenter),{boxInitialized:x.boxInitialized,box:g,sphereInitialized:x.sphereInitialized,sphere:p}}),o._maxGeometryCount=e.maxGeometryCount,o._maxVertexCount=e.maxVertexCount,o._maxIndexCount=e.maxIndexCount,o._geometryInitialized=e.geometryInitialized,o._geometryCount=e.geometryCount,o._matricesTexture=c(e.matricesTexture.uuid),e.colorsTexture!==void 0&&(o._colorsTexture=c(e.colorsTexture.uuid));break;case"LOD":o=new Mg;break;case"Line":o=new Wi(a(e.geometry),l(e.material));break;case"LineLoop":o=new Tg(a(e.geometry),l(e.material));break;case"LineSegments":o=new Zn(a(e.geometry),l(e.material));break;case"PointCloud":case"Points":o=new jl(a(e.geometry),l(e.material));break;case"Sprite":o=new bg(l(e.material));break;case"Group":o=new ki;break;case"Bone":o=new td;break;default:o=new et}if(o.uuid=e.uuid,e.name!==void 0&&(o.name=e.name),e.matrix!==void 0?(o.matrix.fromArray(e.matrix),e.matrixAutoUpdate!==void 0&&(o.matrixAutoUpdate=e.matrixAutoUpdate),o.matrixAutoUpdate&&o.matrix.decompose(o.position,o.quaternion,o.scale)):(e.position!==void 0&&o.position.fromArray(e.position),e.rotation!==void 0&&o.rotation.fromArray(e.rotation),e.quaternion!==void 0&&o.quaternion.fromArray(e.quaternion),e.scale!==void 0&&o.scale.fromArray(e.scale)),e.up!==void 0&&o.up.fromArray(e.up),e.castShadow!==void 0&&(o.castShadow=e.castShadow),e.receiveShadow!==void 0&&(o.receiveShadow=e.receiveShadow),e.shadow&&(e.shadow.bias!==void 0&&(o.shadow.bias=e.shadow.bias),e.shadow.normalBias!==void 0&&(o.shadow.normalBias=e.shadow.normalBias),e.shadow.radius!==void 0&&(o.shadow.radius=e.shadow.radius),e.shadow.mapSize!==void 0&&o.shadow.mapSize.fromArray(e.shadow.mapSize),e.shadow.camera!==void 0&&(o.shadow.camera=this.parseObject(e.shadow.camera))),e.visible!==void 0&&(o.visible=e.visible),e.frustumCulled!==void 0&&(o.frustumCulled=e.frustumCulled),e.renderOrder!==void 0&&(o.renderOrder=e.renderOrder),e.userData!==void 0&&(o.userData=e.userData),e.layers!==void 0&&(o.layers.mask=e.layers),e.children!==void 0){const d=e.children;for(let f=0;f<d.length;f++)o.add(this.parseObject(d[f],t,n,i,r))}if(e.animations!==void 0){const d=e.animations;for(let f=0;f<d.length;f++){const m=d[f];o.animations.push(r[m])}}if(e.type==="LOD"){e.autoUpdate!==void 0&&(o.autoUpdate=e.autoUpdate);const d=e.levels;for(let f=0;f<d.length;f++){const m=d[f],x=o.getObjectByProperty("uuid",m.object);x!==void 0&&o.addLevel(x,m.distance,m.hysteresis)}}return o}bindSkeletons(e,t){Object.keys(t).length!==0&&e.traverse(function(n){if(n.isSkinnedMesh===!0&&n.skeleton!==void 0){const i=t[n.skeleton];i===void 0?console.warn("THREE.ObjectLoader: No skeleton found with UUID:",n.skeleton):n.bind(i,n.bindMatrix)}})}}const EE={UVMapping:kl,CubeReflectionMapping:bi,CubeRefractionMapping:Gi,EquirectangularReflectionMapping:So,EquirectangularRefractionMapping:Eo,CubeUVReflectionMapping:kr},ap={RepeatWrapping:wo,ClampToEdgeWrapping:Mn,MirroredRepeatWrapping:To},lp={NearestFilter:Ot,NearestMipmapNearestFilter:Nu,NearestMipmapLinearFilter:Er,LinearFilter:Rt,LinearMipmapNearestFilter:po,LinearMipmapLinearFilter:Vn};class wE extends rn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=fi.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{t&&t(c),r.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return fi.add(e,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){i&&i(c),fi.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});fi.add(e,l),r.manager.itemStart(e)}}let el;class xd{static getContext(){return el===void 0&&(el=new(window.AudioContext||window.webkitAudioContext)),el}static setContext(e){el=e}}class TE extends rn{constructor(e){super(e)}load(e,t,n,i){const r=this,o=new Si(this.manager);o.setResponseType("arraybuffer"),o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(l){try{const c=l.slice(0);xd.getContext().decodeAudioData(c,function(u){t(u)}).catch(a)}catch(c){a(c)}},n,i);function a(l){i?i(l):console.error(l),r.manager.itemError(e)}}}const cp=new Pe,hp=new Pe,cs=new Pe;class AE{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new Ut,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new Ut,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(e){const t=this._cache;if(t.focus!==e.focus||t.fov!==e.fov||t.aspect!==e.aspect*this.aspect||t.near!==e.near||t.far!==e.far||t.zoom!==e.zoom||t.eyeSep!==this.eyeSep){t.focus=e.focus,t.fov=e.fov,t.aspect=e.aspect*this.aspect,t.near=e.near,t.far=e.far,t.zoom=e.zoom,t.eyeSep=this.eyeSep,cs.copy(e.projectionMatrix);const i=t.eyeSep/2,r=i*t.near/t.focus,o=t.near*Math.tan(Ds*t.fov*.5)/t.zoom;let a,l;hp.elements[12]=-i,cp.elements[12]=i,a=-o*t.aspect+r,l=o*t.aspect+r,cs.elements[0]=2*t.near/(l-a),cs.elements[8]=(l+a)/(l-a),this.cameraL.projectionMatrix.copy(cs),a=-o*t.aspect-r,l=o*t.aspect-r,cs.elements[0]=2*t.near/(l-a),cs.elements[8]=(l+a)/(l-a),this.cameraR.projectionMatrix.copy(cs)}this.cameraL.matrixWorld.copy(e.matrixWorld).multiply(hp),this.cameraR.matrixWorld.copy(e.matrixWorld).multiply(cp)}}class s0{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=up(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=up();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function up(){return(typeof performance>"u"?Date:performance).now()}const hs=new R,dp=new Wt,RE=new R,us=new R;class CE extends et{constructor(){super(),this.type="AudioListener",this.context=xd.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._clock=new s0}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(e){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=e,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}updateMatrixWorld(e){super.updateMatrixWorld(e);const t=this.context.listener,n=this.up;if(this.timeDelta=this._clock.getDelta(),this.matrixWorld.decompose(hs,dp,RE),us.set(0,0,-1).applyQuaternion(dp),t.positionX){const i=this.context.currentTime+this.timeDelta;t.positionX.linearRampToValueAtTime(hs.x,i),t.positionY.linearRampToValueAtTime(hs.y,i),t.positionZ.linearRampToValueAtTime(hs.z,i),t.forwardX.linearRampToValueAtTime(us.x,i),t.forwardY.linearRampToValueAtTime(us.y,i),t.forwardZ.linearRampToValueAtTime(us.z,i),t.upX.linearRampToValueAtTime(n.x,i),t.upY.linearRampToValueAtTime(n.y,i),t.upZ.linearRampToValueAtTime(n.z,i)}else t.setPosition(hs.x,hs.y,hs.z),t.setOrientation(us.x,us.y,us.z,n.x,n.y,n.z)}}let r0=class extends et{constructor(e){super(),this.type="Audio",this.listener=e,this.context=e.context,this.gain=this.context.createGain(),this.gain.connect(e.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(e){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=e,this.connect(),this}setMediaElementSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(e),this.connect(),this}setMediaStreamSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(e),this.connect(),this}setBuffer(e){return this.buffer=e,this.sourceType="buffer",this.autoplay&&this.play(),this}play(e=0){if(this.isPlaying===!0){console.warn("THREE.Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+e;const t=this.context.createBufferSource();return t.buffer=this.buffer,t.loop=this.loop,t.loopStart=this.loopStart,t.loopEnd=this.loopEnd,t.onended=this.onEnded.bind(this),t.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=t,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].connect(this.filters[e]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].disconnect(this.filters[e]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(e){return e||(e=[]),this._connected===!0?(this.disconnect(),this.filters=e.slice(),this.connect()):this.filters=e.slice(),this}setDetune(e){return this.detune=e,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(e){return this.setFilters(e?[e]:[])}setPlaybackRate(e){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.playbackRate=e,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1}getLoop(){return this.hasPlaybackControl===!1?(console.warn("THREE.Audio: this Audio has no playback control."),!1):this.loop}setLoop(e){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.loop=e,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(e){return this.loopStart=e,this}setLoopEnd(e){return this.loopEnd=e,this}getVolume(){return this.gain.gain.value}setVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}};const ds=new R,fp=new Wt,PE=new R,fs=new R;class IE extends r0{constructor(e){super(e),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){super.connect(),this.panner.connect(this.gain)}disconnect(){super.disconnect(),this.panner.disconnect(this.gain)}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(e){return this.panner.refDistance=e,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(e){return this.panner.rolloffFactor=e,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(e){return this.panner.distanceModel=e,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(e){return this.panner.maxDistance=e,this}setDirectionalCone(e,t,n){return this.panner.coneInnerAngle=e,this.panner.coneOuterAngle=t,this.panner.coneOuterGain=n,this}updateMatrixWorld(e){if(super.updateMatrixWorld(e),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(ds,fp,PE),fs.set(0,0,1).applyQuaternion(fp);const t=this.panner;if(t.positionX){const n=this.context.currentTime+this.listener.timeDelta;t.positionX.linearRampToValueAtTime(ds.x,n),t.positionY.linearRampToValueAtTime(ds.y,n),t.positionZ.linearRampToValueAtTime(ds.z,n),t.orientationX.linearRampToValueAtTime(fs.x,n),t.orientationY.linearRampToValueAtTime(fs.y,n),t.orientationZ.linearRampToValueAtTime(fs.z,n)}else t.setPosition(ds.x,ds.y,ds.z),t.setOrientation(fs.x,fs.y,fs.z)}}class LE{constructor(e,t=2048){this.analyser=e.context.createAnalyser(),this.analyser.fftSize=t,this.data=new Uint8Array(this.analyser.frequencyBinCount),e.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let e=0;const t=this.getFrequencyData();for(let n=0;n<t.length;n++)e+=t[n];return e/t.length}}class o0{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,r,o;switch(t){case"quaternion":i=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,r=e*i+i;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[r+a]=n[a];o=t}else{o+=t;const a=t/o;this._mixBufferRegion(n,r,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-r,t)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let r=n,o=i;r!==o;++r)t[r]=t[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,r){if(i>=.5)for(let o=0;o!==r;++o)e[t+o]=e[n+o]}_slerp(e,t,n,i){Wt.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,r){const o=this._workIndex*r;Wt.multiplyQuaternionsFlat(e,o,e,t,e,n),Wt.slerpFlat(e,t,e,t,e,o,i)}_lerp(e,t,n,i,r){const o=1-i;for(let a=0;a!==r;++a){const l=t+a;e[l]=e[l]*o+e[n+a]*i}}_lerpAdditive(e,t,n,i,r){for(let o=0;o!==r;++o){const a=t+o;e[a]=e[a]+e[n+o]*i}}}const _d="\\[\\]\\.:\\/",DE=new RegExp("["+_d+"]","g"),yd="[^"+_d+"]",NE="[^"+_d.replace("\\.","")+"]",UE=/((?:WC+[\/:])*)/.source.replace("WC",yd),OE=/(WCOD+)?/.source.replace("WCOD",NE),FE=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",yd),BE=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",yd),zE=new RegExp("^"+UE+OE+FE+BE+"$"),kE=["material","materials","bones","map"];class HE{constructor(e,t,n){const i=n||je.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class je{constructor(e,t,n){this.path=t,this.parsedPath=n||je.parseTrackName(t),this.node=je.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new je.Composite(e,t,n):new je(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(DE,"")}static parseTrackName(e){const t=zE.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);kE.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=je.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}je.Composite=HE;je.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};je.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};je.prototype.GetterByBindingType=[je.prototype._getValue_direct,je.prototype._getValue_array,je.prototype._getValue_arrayElement,je.prototype._getValue_toArray];je.prototype.SetterByBindingTypeAndVersioning=[[je.prototype._setValue_direct,je.prototype._setValue_direct_setNeedsUpdate,je.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[je.prototype._setValue_array,je.prototype._setValue_array_setNeedsUpdate,je.prototype._setValue_array_setMatrixWorldNeedsUpdate],[je.prototype._setValue_arrayElement,je.prototype._setValue_arrayElement_setNeedsUpdate,je.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[je.prototype._setValue_fromArray,je.prototype._setValue_fromArray_setNeedsUpdate,je.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class VE{constructor(){this.isAnimationObjectGroup=!0,this.uuid=xn(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;const e={};this._indicesByUUID=e;for(let n=0,i=arguments.length;n!==i;++n)e[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};const t=this;this.stats={objects:{get total(){return t._objects.length},get inUse(){return this.total-t.nCachedObjects_}},get bindingsPerObject(){return t._bindings.length}}}add(){const e=this._objects,t=this._indicesByUUID,n=this._paths,i=this._parsedPaths,r=this._bindings,o=r.length;let a,l=e.length,c=this.nCachedObjects_;for(let h=0,u=arguments.length;h!==u;++h){const d=arguments[h],f=d.uuid;let m=t[f];if(m===void 0){m=l++,t[f]=m,e.push(d);for(let x=0,g=o;x!==g;++x)r[x].push(new je(d,n[x],i[x]))}else if(m<c){a=e[m];const x=--c,g=e[x];t[g.uuid]=m,e[m]=g,t[f]=x,e[x]=d;for(let p=0,y=o;p!==y;++p){const _=r[p],b=_[x];let L=_[m];_[m]=b,L===void 0&&(L=new je(d,n[p],i[p])),_[x]=L}}else e[m]!==a&&console.error("THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=c}remove(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let r=this.nCachedObjects_;for(let o=0,a=arguments.length;o!==a;++o){const l=arguments[o],c=l.uuid,h=t[c];if(h!==void 0&&h>=r){const u=r++,d=e[u];t[d.uuid]=h,e[h]=d,t[c]=u,e[u]=l;for(let f=0,m=i;f!==m;++f){const x=n[f],g=x[u],p=x[h];x[h]=g,x[u]=p}}}this.nCachedObjects_=r}uncache(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let r=this.nCachedObjects_,o=e.length;for(let a=0,l=arguments.length;a!==l;++a){const c=arguments[a],h=c.uuid,u=t[h];if(u!==void 0)if(delete t[h],u<r){const d=--r,f=e[d],m=--o,x=e[m];t[f.uuid]=u,e[u]=f,t[x.uuid]=d,e[d]=x,e.pop();for(let g=0,p=i;g!==p;++g){const y=n[g],_=y[d],b=y[m];y[u]=_,y[d]=b,y.pop()}}else{const d=--o,f=e[d];d>0&&(t[f.uuid]=u),e[u]=f,e.pop();for(let m=0,x=i;m!==x;++m){const g=n[m];g[u]=g[d],g.pop()}}}this.nCachedObjects_=r}subscribe_(e,t){const n=this._bindingsIndicesByPath;let i=n[e];const r=this._bindings;if(i!==void 0)return r[i];const o=this._paths,a=this._parsedPaths,l=this._objects,c=l.length,h=this.nCachedObjects_,u=new Array(c);i=r.length,n[e]=i,o.push(e),a.push(t),r.push(u);for(let d=h,f=l.length;d!==f;++d){const m=l[d];u[d]=new je(m,e,t)}return u}unsubscribe_(e){const t=this._bindingsIndicesByPath,n=t[e];if(n!==void 0){const i=this._paths,r=this._parsedPaths,o=this._bindings,a=o.length-1,l=o[a],c=e[a];t[c]=n,o[n]=l,o.pop(),r[n]=r[a],r.pop(),i[n]=i[a],i.pop()}}}class a0{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const r=t.tracks,o=r.length,a=new Array(o),l={endingStart:Ts,endingEnd:Ts};for(let c=0;c!==o;++c){const h=r[c].createInterpolant(null);a[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Wm,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const i=this._clip.duration,r=e._clip.duration,o=r/i,a=i/r;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,r=i.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);const l=a.parameterPositions,c=a.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/o,c[1]=t/o,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const r=this._startTime;if(r!==null){const l=(e-r)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const o=this._updateTime(t),a=this._updateWeight(e);if(a>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Vu:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulateAdditive(a);break;case Hl:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulate(i,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,r=this._loopCount;const o=n===Xm;if(e===0)return r===-1?i:o&&(r&1)===1?t-i:i;if(n===Gm){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=t||i<0){const a=Math.floor(i/t);i-=t*a,r+=Math.abs(a);const l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(o&&(r&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=As,i.endingEnd=As):(e?i.endingStart=this.zeroSlopeAtStart?As:Ts:i.endingStart=Co,t?i.endingEnd=this.zeroSlopeAtEnd?As:Ts:i.endingEnd=Co)}_scheduleFading(e,t,n){const i=this._mixer,r=i.time;let o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,l=o.sampleValues;return a[0]=r,l[0]=t,a[1]=r+e,l[1]=n,this}}const GE=new Float32Array(1);class WE extends Yn{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,r=i.length,o=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==r;++u){const d=i[u],f=d.name;let m=h[f];if(m!==void 0)++m.referenceCount,o[u]=m;else{if(m=o[u],m!==void 0){m._cacheIndex===null&&(++m.referenceCount,this._addInactiveBinding(m,l,f));continue}const x=t&&t._propertyBindings[u].binding.parsedPath;m=new o0(je.create(n,f,x),d.ValueTypeName,d.getValueSize()),++m.referenceCount,this._addInactiveBinding(m,l,f),o[u]=m}a[u].resultBuffer=m.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,r=this._actionsByClip[i];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,r=this._actionsByClip;let o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{const a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=i.length,i.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const r=e._clip.uuid,o=this._actionsByClip,a=o[r],l=a.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;const u=a.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],l.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,r=this._bindings;let o=i[t];o===void 0&&(o={},i[t]=o),o[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new ud(new Float32Array(2),new Float32Array(2),1,GE),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,r=t[i];e.__cacheIndex=i,t[i]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){const i=t||this._root,r=i.uuid;let o=typeof e=="string"?Vo.findByName(i,e):e;const a=o!==null?o.uuid:e,l=this._actionsByClip[a];let c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Hl),l!==void 0){const u=l.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;const h=new a0(this,o,t,n);return this._bindAction(h,c),this._addInactiveAction(h,a,r),h}existingAction(e,t){const n=t||this._root,i=n.uuid,r=typeof e=="string"?Vo.findByName(n,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,r,o);const a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){const o=r.knownActions;for(let a=0,l=o.length;a!==l;++a){const c=o[a];this._deactivateAction(c);const h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,r=i[t];if(r!==void 0)for(const o in r){const a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class vd{constructor(e){this.value=e}clone(){return new vd(this.value.clone===void 0?this.value:this.value.clone())}}let XE=0;class qE extends Yn{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:XE++}),this.name="",this.usage=Do,this.uniforms=[]}add(e){return this.uniforms.push(e),this}remove(e){const t=this.uniforms.indexOf(e);return t!==-1&&this.uniforms.splice(t,1),this}setName(e){return this.name=e,this}setUsage(e){return this.usage=e,this}dispose(){return this.dispatchEvent({type:"dispose"}),this}copy(e){this.name=e.name,this.usage=e.usage;const t=e.uniforms;this.uniforms.length=0;for(let n=0,i=t.length;n<i;n++){const r=Array.isArray(t[n])?t[n]:[t[n]];for(let o=0;o<r.length;o++)this.uniforms.push(r[o].clone())}return this}clone(){return new this.constructor().copy(this)}}class YE extends Kl{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){const t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){const t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}}class $E{constructor(e,t,n,i,r){this.isGLBufferAttribute=!0,this.name="",this.buffer=e,this.type=t,this.itemSize=n,this.elementSize=i,this.count=r,this.version=0}set needsUpdate(e){e===!0&&this.version++}setBuffer(e){return this.buffer=e,this}setType(e,t){return this.type=e,this.elementSize=t,this}setItemSize(e){return this.itemSize=e,this}setCount(e){return this.count=e,this}}const pp=new Pe;class l0{constructor(e,t,n=0,i=1/0){this.ray=new Vs(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Xl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return pp.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(pp),this}intersectObject(e,t=!0,n=[]){return pu(e,this,n,t),n.sort(mp),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)pu(e[i],this,n,t);return n.sort(mp),n}}function mp(s,e){return s.distance-e.distance}function pu(s,e,t,n){let i=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let o=0,a=r.length;o<a;o++)pu(r[o],e,t,!0)}}class mu{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(_t(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class ZE{constructor(e=1,t=0,n=0){return this.radius=e,this.theta=t,this.y=n,this}set(e,t,n){return this.radius=e,this.theta=t,this.y=n,this}copy(e){return this.radius=e.radius,this.theta=e.theta,this.y=e.y,this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+n*n),this.theta=Math.atan2(e,n),this.y=t,this}clone(){return new this.constructor().copy(this)}}const gp=new K;class KE{constructor(e=new K(1/0,1/0),t=new K(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=gp.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y)}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,gp).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const xp=new R,tl=new R;class JE{constructor(e=new R,t=new R){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){xp.subVectors(e,this.start),tl.subVectors(this.end,this.start);const n=tl.dot(tl);let r=tl.dot(xp)/n;return t&&(r=_t(r,0,1)),r}closestPointToPoint(e,t,n){const i=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(i).add(this.start)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}const _p=new R;class jE extends et{constructor(e,t){super(),this.light=e,this.matrixAutoUpdate=!1,this.color=t,this.type="SpotLightHelper";const n=new He,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let o=0,a=1,l=32;o<l;o++,a++){const c=o/l*Math.PI*2,h=a/l*Math.PI*2;i.push(Math.cos(c),Math.sin(c),1,Math.cos(h),Math.sin(h),1)}n.setAttribute("position",new Me(i,3));const r=new en({fog:!1,toneMapped:!1});this.cone=new Zn(n,r),this.add(this.cone),this.update()}dispose(){this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent?(this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)):this.matrix.copy(this.light.matrixWorld),this.matrixWorld.copy(this.light.matrixWorld);const e=this.light.distance?this.light.distance:1e3,t=e*Math.tan(this.light.angle);this.cone.scale.set(t,t,e),_p.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(_p),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}}const Fi=new R,nl=new Pe,hh=new Pe;class QE extends Zn{constructor(e){const t=c0(e),n=new He,i=[],r=[],o=new ge(0,0,1),a=new ge(0,1,0);for(let c=0;c<t.length;c++){const h=t[c];h.parent&&h.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),r.push(o.r,o.g,o.b),r.push(a.r,a.g,a.b))}n.setAttribute("position",new Me(i,3)),n.setAttribute("color",new Me(r,3));const l=new en({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,l),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=e,this.bones=t,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1}updateMatrixWorld(e){const t=this.bones,n=this.geometry,i=n.getAttribute("position");hh.copy(this.root.matrixWorld).invert();for(let r=0,o=0;r<t.length;r++){const a=t[r];a.parent&&a.parent.isBone&&(nl.multiplyMatrices(hh,a.matrixWorld),Fi.setFromMatrixPosition(nl),i.setXYZ(o,Fi.x,Fi.y,Fi.z),nl.multiplyMatrices(hh,a.parent.matrixWorld),Fi.setFromMatrixPosition(nl),i.setXYZ(o+1,Fi.x,Fi.y,Fi.z),o+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(e)}dispose(){this.geometry.dispose(),this.material.dispose()}}function c0(s){const e=[];s.isBone===!0&&e.push(s);for(let t=0;t<s.children.length;t++)e.push.apply(e,c0(s.children[t]));return e}class ew extends ct{constructor(e,t,n){const i=new Ws(t,4,2),r=new $n({wireframe:!0,fog:!1,toneMapped:!1});super(i,r),this.light=e,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){this.geometry.dispose(),this.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.color!==void 0?this.material.color.set(this.color):this.material.color.copy(this.light.color)}}const tw=new R,yp=new ge,vp=new ge;class nw extends et{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="HemisphereLightHelper";const i=new ra(t);i.rotateY(Math.PI*.5),this.material=new $n({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0&&(this.material.vertexColors=!0);const r=i.getAttribute("position"),o=new Float32Array(r.count*3);i.setAttribute("color",new Qe(o,3)),this.add(new ct(i,this.material)),this.update()}dispose(){this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){const e=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{const t=e.geometry.getAttribute("color");yp.copy(this.light.color),vp.copy(this.light.groundColor);for(let n=0,i=t.count;n<i;n++){const r=n<i/2?yp:vp;t.setXYZ(n,r.r,r.g,r.b)}t.needsUpdate=!0}this.light.updateWorldMatrix(!0,!1),e.lookAt(tw.setFromMatrixPosition(this.light.matrixWorld).negate())}}class iw extends Zn{constructor(e=10,t=10,n=4473924,i=8947848){n=new ge(n),i=new ge(i);const r=t/2,o=e/t,a=e/2,l=[],c=[];for(let d=0,f=0,m=-a;d<=t;d++,m+=o){l.push(-a,0,m,a,0,m),l.push(m,0,-a,m,0,a);const x=d===r?n:i;x.toArray(c,f),f+=3,x.toArray(c,f),f+=3,x.toArray(c,f),f+=3,x.toArray(c,f),f+=3}const h=new He;h.setAttribute("position",new Me(l,3)),h.setAttribute("color",new Me(c,3));const u=new en({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class sw extends Zn{constructor(e=10,t=16,n=8,i=64,r=4473924,o=8947848){r=new ge(r),o=new ge(o);const a=[],l=[];if(t>1)for(let u=0;u<t;u++){const d=u/t*(Math.PI*2),f=Math.sin(d)*e,m=Math.cos(d)*e;a.push(0,0,0),a.push(f,0,m);const x=u&1?r:o;l.push(x.r,x.g,x.b),l.push(x.r,x.g,x.b)}for(let u=0;u<n;u++){const d=u&1?r:o,f=e-e/n*u;for(let m=0;m<i;m++){let x=m/i*(Math.PI*2),g=Math.sin(x)*f,p=Math.cos(x)*f;a.push(g,0,p),l.push(d.r,d.g,d.b),x=(m+1)/i*(Math.PI*2),g=Math.sin(x)*f,p=Math.cos(x)*f,a.push(g,0,p),l.push(d.r,d.g,d.b)}}const c=new He;c.setAttribute("position",new Me(a,3)),c.setAttribute("color",new Me(l,3));const h=new en({vertexColors:!0,toneMapped:!1});super(c,h),this.type="PolarGridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const bp=new R,il=new R,Mp=new R;class rw extends et{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",t===void 0&&(t=1);let i=new He;i.setAttribute("position",new Me([-t,t,0,t,t,0,t,-t,0,-t,-t,0,-t,t,0],3));const r=new en({fog:!1,toneMapped:!1});this.lightPlane=new Wi(i,r),this.add(this.lightPlane),i=new He,i.setAttribute("position",new Me([0,0,0,0,0,1],3)),this.targetLine=new Wi(i,r),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),bp.setFromMatrixPosition(this.light.matrixWorld),il.setFromMatrixPosition(this.light.target.matrixWorld),Mp.subVectors(il,bp),this.lightPlane.lookAt(il),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(il),this.targetLine.scale.z=Mp.length()}}const sl=new R,gt=new ql;class ow extends Zn{constructor(e){const t=new He,n=new en({color:16777215,vertexColors:!0,toneMapped:!1}),i=[],r=[],o={};a("n1","n2"),a("n2","n4"),a("n4","n3"),a("n3","n1"),a("f1","f2"),a("f2","f4"),a("f4","f3"),a("f3","f1"),a("n1","f1"),a("n2","f2"),a("n3","f3"),a("n4","f4"),a("p","n1"),a("p","n2"),a("p","n3"),a("p","n4"),a("u1","u2"),a("u2","u3"),a("u3","u1"),a("c","t"),a("p","c"),a("cn1","cn2"),a("cn3","cn4"),a("cf1","cf2"),a("cf3","cf4");function a(m,x){l(m),l(x)}function l(m){i.push(0,0,0),r.push(0,0,0),o[m]===void 0&&(o[m]=[]),o[m].push(i.length/3-1)}t.setAttribute("position",new Me(i,3)),t.setAttribute("color",new Me(r,3)),super(t,n),this.type="CameraHelper",this.camera=e,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=o,this.update();const c=new ge(16755200),h=new ge(16711680),u=new ge(43775),d=new ge(16777215),f=new ge(3355443);this.setColors(c,h,u,d,f)}setColors(e,t,n,i,r){const a=this.geometry.getAttribute("color");a.setXYZ(0,e.r,e.g,e.b),a.setXYZ(1,e.r,e.g,e.b),a.setXYZ(2,e.r,e.g,e.b),a.setXYZ(3,e.r,e.g,e.b),a.setXYZ(4,e.r,e.g,e.b),a.setXYZ(5,e.r,e.g,e.b),a.setXYZ(6,e.r,e.g,e.b),a.setXYZ(7,e.r,e.g,e.b),a.setXYZ(8,e.r,e.g,e.b),a.setXYZ(9,e.r,e.g,e.b),a.setXYZ(10,e.r,e.g,e.b),a.setXYZ(11,e.r,e.g,e.b),a.setXYZ(12,e.r,e.g,e.b),a.setXYZ(13,e.r,e.g,e.b),a.setXYZ(14,e.r,e.g,e.b),a.setXYZ(15,e.r,e.g,e.b),a.setXYZ(16,e.r,e.g,e.b),a.setXYZ(17,e.r,e.g,e.b),a.setXYZ(18,e.r,e.g,e.b),a.setXYZ(19,e.r,e.g,e.b),a.setXYZ(20,e.r,e.g,e.b),a.setXYZ(21,e.r,e.g,e.b),a.setXYZ(22,e.r,e.g,e.b),a.setXYZ(23,e.r,e.g,e.b),a.setXYZ(24,t.r,t.g,t.b),a.setXYZ(25,t.r,t.g,t.b),a.setXYZ(26,t.r,t.g,t.b),a.setXYZ(27,t.r,t.g,t.b),a.setXYZ(28,t.r,t.g,t.b),a.setXYZ(29,t.r,t.g,t.b),a.setXYZ(30,t.r,t.g,t.b),a.setXYZ(31,t.r,t.g,t.b),a.setXYZ(32,n.r,n.g,n.b),a.setXYZ(33,n.r,n.g,n.b),a.setXYZ(34,n.r,n.g,n.b),a.setXYZ(35,n.r,n.g,n.b),a.setXYZ(36,n.r,n.g,n.b),a.setXYZ(37,n.r,n.g,n.b),a.setXYZ(38,i.r,i.g,i.b),a.setXYZ(39,i.r,i.g,i.b),a.setXYZ(40,r.r,r.g,r.b),a.setXYZ(41,r.r,r.g,r.b),a.setXYZ(42,r.r,r.g,r.b),a.setXYZ(43,r.r,r.g,r.b),a.setXYZ(44,r.r,r.g,r.b),a.setXYZ(45,r.r,r.g,r.b),a.setXYZ(46,r.r,r.g,r.b),a.setXYZ(47,r.r,r.g,r.b),a.setXYZ(48,r.r,r.g,r.b),a.setXYZ(49,r.r,r.g,r.b),a.needsUpdate=!0}update(){const e=this.geometry,t=this.pointMap,n=1,i=1;gt.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),vt("c",t,e,gt,0,0,-1),vt("t",t,e,gt,0,0,1),vt("n1",t,e,gt,-n,-i,-1),vt("n2",t,e,gt,n,-i,-1),vt("n3",t,e,gt,-n,i,-1),vt("n4",t,e,gt,n,i,-1),vt("f1",t,e,gt,-n,-i,1),vt("f2",t,e,gt,n,-i,1),vt("f3",t,e,gt,-n,i,1),vt("f4",t,e,gt,n,i,1),vt("u1",t,e,gt,n*.7,i*1.1,-1),vt("u2",t,e,gt,-n*.7,i*1.1,-1),vt("u3",t,e,gt,0,i*2,-1),vt("cf1",t,e,gt,-n,0,1),vt("cf2",t,e,gt,n,0,1),vt("cf3",t,e,gt,0,-i,1),vt("cf4",t,e,gt,0,i,1),vt("cn1",t,e,gt,-n,0,-1),vt("cn2",t,e,gt,n,0,-1),vt("cn3",t,e,gt,0,-i,-1),vt("cn4",t,e,gt,0,i,-1),e.getAttribute("position").needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}}function vt(s,e,t,n,i,r,o){sl.set(i,r,o).unproject(n);const a=e[s];if(a!==void 0){const l=t.getAttribute("position");for(let c=0,h=a.length;c<h;c++)l.setXYZ(a[c],sl.x,sl.y,sl.z)}}const rl=new Qt;class aw extends Zn{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(8*3),r=new He;r.setIndex(new Qe(n,1)),r.setAttribute("position",new Qe(i,3)),super(r,new en({color:t,toneMapped:!1})),this.object=e,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(e){if(e!==void 0&&console.warn("THREE.BoxHelper: .update() has no longer arguments."),this.object!==void 0&&rl.setFromObject(this.object),rl.isEmpty())return;const t=rl.min,n=rl.max,i=this.geometry.attributes.position,r=i.array;r[0]=n.x,r[1]=n.y,r[2]=n.z,r[3]=t.x,r[4]=n.y,r[5]=n.z,r[6]=t.x,r[7]=t.y,r[8]=n.z,r[9]=n.x,r[10]=t.y,r[11]=n.z,r[12]=n.x,r[13]=n.y,r[14]=t.z,r[15]=t.x,r[16]=n.y,r[17]=t.z,r[18]=t.x,r[19]=t.y,r[20]=t.z,r[21]=n.x,r[22]=t.y,r[23]=t.z,i.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(e){return this.object=e,this.update(),this}copy(e,t){return super.copy(e,t),this.object=e.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class lw extends Zn{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],r=new He;r.setIndex(new Qe(n,1)),r.setAttribute("position",new Me(i,3)),super(r,new en({color:t,toneMapped:!1})),this.box=e,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(e){const t=this.box;t.isEmpty()||(t.getCenter(this.position),t.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(e))}dispose(){this.geometry.dispose(),this.material.dispose()}}class cw extends Wi{constructor(e,t=1,n=16776960){const i=n,r=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],o=new He;o.setAttribute("position",new Me(r,3)),o.computeBoundingSphere(),super(o,new en({color:i,toneMapped:!1})),this.type="PlaneHelper",this.plane=e,this.size=t;const a=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],l=new He;l.setAttribute("position",new Me(a,3)),l.computeBoundingSphere(),this.add(new ct(l,new $n({color:i,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(e){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(e)}dispose(){this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}}const Sp=new R;let ol,uh;class hw extends et{constructor(e=new R(0,0,1),t=new R(0,0,0),n=1,i=16776960,r=n*.2,o=r*.2){super(),this.type="ArrowHelper",ol===void 0&&(ol=new He,ol.setAttribute("position",new Me([0,0,0,0,1,0],3)),uh=new Wr(0,.5,1,5,1),uh.translate(0,-.5,0)),this.position.copy(t),this.line=new Wi(ol,new en({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new ct(uh,new $n({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,r,o)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Sp.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(Sp,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class uw extends Zn{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new He;i.setAttribute("position",new Me(t,3)),i.setAttribute("color",new Me(n,3));const r=new en({vertexColors:!0,toneMapped:!1});super(i,r),this.type="AxesHelper"}setColors(e,t,n){const i=new ge,r=this.geometry.attributes.color.array;return i.set(e),i.toArray(r,0),i.toArray(r,3),i.set(t),i.toArray(r,6),i.toArray(r,9),i.set(n),i.toArray(r,12),i.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class dw{constructor(){this.type="ShapePath",this.color=new ge,this.subPaths=[],this.currentPath=null}moveTo(e,t){return this.currentPath=new Oo,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,n,i){return this.currentPath.quadraticCurveTo(e,t,n,i),this}bezierCurveTo(e,t,n,i,r,o){return this.currentPath.bezierCurveTo(e,t,n,i,r,o),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(e){function t(p){const y=[];for(let _=0,b=p.length;_<b;_++){const L=p[_],A=new Ns;A.curves=L.curves,y.push(A)}return y}function n(p,y){const _=y.length;let b=!1;for(let L=_-1,A=0;A<_;L=A++){let T=y[L],P=y[A],E=P.x-T.x,M=P.y-T.y;if(Math.abs(M)>Number.EPSILON){if(M<0&&(T=y[A],E=-E,P=y[L],M=-M),p.y<T.y||p.y>P.y)continue;if(p.y===T.y){if(p.x===T.x)return!0}else{const C=M*(p.x-T.x)-E*(p.y-T.y);if(C===0)return!0;if(C<0)continue;b=!b}}else{if(p.y!==T.y)continue;if(P.x<=p.x&&p.x<=T.x||T.x<=p.x&&p.x<=P.x)return!0}}return b}const i=Xn.isClockWise,r=this.subPaths;if(r.length===0)return[];let o,a,l;const c=[];if(r.length===1)return a=r[0],l=new Ns,l.curves=a.curves,c.push(l),c;let h=!i(r[0].getPoints());h=e?!h:h;const u=[],d=[];let f=[],m=0,x;d[m]=void 0,f[m]=[];for(let p=0,y=r.length;p<y;p++)a=r[p],x=a.getPoints(),o=i(x),o=e?!o:o,o?(!h&&d[m]&&m++,d[m]={s:new Ns,p:x},d[m].s.curves=a.curves,h&&m++,f[m]=[]):f[m].push({h:a,p:x[0]});if(!d[0])return t(r);if(d.length>1){let p=!1,y=0;for(let _=0,b=d.length;_<b;_++)u[_]=[];for(let _=0,b=d.length;_<b;_++){const L=f[_];for(let A=0;A<L.length;A++){const T=L[A];let P=!0;for(let E=0;E<d.length;E++)n(T.p,d[E].p)&&(_!==E&&y++,P?(P=!1,u[E].push(T)):p=!0);P&&u[_].push(T)}}y>0&&p===!1&&(f=u)}let g;for(let p=0,y=d.length;p<y;p++){l=d[p].s,c.push(l),g=f[p];for(let _=0,b=g.length;_<b;_++)l.holes.push(g[_].h)}return c}}class fw extends Nn{constructor(e=1,t=1,n=1,i={}){console.warn('THREE.WebGLMultipleRenderTargets has been deprecated and will be removed in r172. Use THREE.WebGLRenderTarget and set the "count" parameter to enable MRT.'),super(e,t,{...i,count:n}),this.isWebGLMultipleRenderTargets=!0}get texture(){return this.textures}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:zl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=zl);const pw=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:Du,AddEquation:zi,AddOperation:Tm,AdditiveAnimationBlendMode:Vu,AdditiveBlending:El,AgXToneMapping:Im,AlphaFormat:Fm,AlwaysCompare:tg,AlwaysDepth:ym,AlwaysStencilFunc:ru,AmbientLight:gd,AnimationAction:a0,AnimationClip:Vo,AnimationLoader:mE,AnimationMixer:WE,AnimationObjectGroup:VE,AnimationUtils:uE,ArcCurve:Ag,ArrayCamera:_g,ArrowHelper:hw,AttachedBindMode:Lh,Audio:r0,AudioAnalyser:LE,AudioContext:xd,AudioListener:CE,AudioLoader:TE,AxesHelper:uw,BackSide:jt,BasicDepthPacking:qm,BasicShadowMap:bx,BatchedMesh:wg,Bone:td,BooleanKeyframeTrack:Xs,Box2:KE,Box3:Qt,Box3Helper:lw,BoxGeometry:Gs,BoxHelper:aw,BufferAttribute:Qe,BufferGeometry:He,BufferGeometryLoader:i0,ByteType:Nm,Cache:fi,Camera:ql,CameraHelper:ow,CanvasTexture:nd,CapsuleGeometry:tc,CatmullRomCurve3:sd,CineonToneMapping:Cm,CircleGeometry:Gr,ClampToEdgeWrapping:Mn,Clock:s0,Color:ge,ColorKeyframeTrack:dd,ColorManagement:nt,CompressedArrayTexture:NS,CompressedCubeTexture:US,CompressedTexture:Ql,CompressedTextureLoader:gE,ConeGeometry:nc,ConstantAlphaFactor:gm,ConstantColorFactor:pm,CubeCamera:cg,CubeReflectionMapping:bi,CubeRefractionMapping:Gi,CubeTexture:ea,CubeTextureLoader:xE,CubeUVReflectionMapping:kr,CubicBezierCurve:rd,CubicBezierCurve3:Rg,CubicInterpolant:Yg,CullFaceBack:Ch,CullFaceFront:jp,CullFaceFrontBack:vx,CullFaceNone:Jp,Curve:On,CurvePath:Pg,CustomBlending:em,CustomToneMapping:Pm,CylinderGeometry:Wr,Cylindrical:ZE,Data3DTexture:qu,DataArrayTexture:Wl,DataTexture:_i,DataTextureLoader:_E,DataUtils:P_,DecrementStencilOp:Lx,DecrementWrapStencilOp:Nx,DefaultLoadingManager:Kg,DepthFormat:Ls,DepthStencilFormat:Bs,DepthTexture:Ku,DetachedBindMode:Dm,DirectionalLight:Il,DirectionalLightHelper:rw,DiscreteInterpolant:$g,DisplayP3ColorSpace:Vl,DodecahedronGeometry:ic,DoubleSide:Pn,DstAlphaFactor:cm,DstColorFactor:um,DynamicCopyUsage:Zx,DynamicDrawUsage:Gx,DynamicReadUsage:qx,EdgesGeometry:Ig,EllipseCurve:ec,EqualCompare:Jm,EqualDepth:bm,EqualStencilFunc:Bx,EquirectangularReflectionMapping:So,EquirectangularRefractionMapping:Eo,Euler:_n,EventDispatcher:Yn,ExtrudeGeometry:rc,FileLoader:Si,Float16BufferAttribute:O_,Float32BufferAttribute:Me,FloatType:mn,Fog:Zl,FogExp2:na,FramebufferTexture:DS,FrontSide:vi,Frustum:ta,GLBufferAttribute:$E,GLSL1:Jx,GLSL3:ou,GreaterCompare:jm,GreaterDepth:Sm,GreaterEqualCompare:eg,GreaterEqualDepth:Mm,GreaterEqualStencilFunc:Vx,GreaterStencilFunc:kx,GridHelper:iw,Group:ki,HalfFloatType:jo,HemisphereLight:Jg,HemisphereLightHelper:nw,IcosahedronGeometry:oc,ImageBitmapLoader:wE,ImageLoader:Go,ImageUtils:sg,IncrementStencilOp:Ix,IncrementWrapStencilOp:Dx,InstancedBufferAttribute:Nr,InstancedBufferGeometry:n0,InstancedInterleavedBuffer:YE,InstancedMesh:Eg,Int16BufferAttribute:N_,Int32BufferAttribute:U_,Int8BufferAttribute:I_,IntType:Uu,InterleavedBuffer:Kl,InterleavedBufferAttribute:zs,Interpolant:aa,InterpolateDiscrete:Ro,InterpolateLinear:Al,InterpolateSmooth:xl,InvertStencilOp:Ux,KeepStencilOp:xs,KeyframeTrack:Fn,LOD:Mg,LatheGeometry:sa,Layers:Xl,LessCompare:Km,LessDepth:vm,LessEqualCompare:Gu,LessEqualDepth:Mo,LessEqualStencilFunc:zx,LessStencilFunc:Fx,Light:Ki,LightProbe:t0,Line:Wi,Line3:JE,LineBasicMaterial:en,LineCurve:od,LineCurve3:Cg,LineDashedMaterial:Wg,LineLoop:Tg,LineSegments:Zn,LinearDisplayP3ColorSpace:Qo,LinearFilter:Rt,LinearInterpolant:ud,LinearMipMapLinearFilter:wx,LinearMipMapNearestFilter:Ex,LinearMipmapLinearFilter:Vn,LinearMipmapNearestFilter:po,LinearSRGBColorSpace:Ai,LinearToneMapping:Am,LinearTransfer:Po,Loader:rn,LoaderUtils:fu,LoadingManager:fd,LoopOnce:Gm,LoopPingPong:Xm,LoopRepeat:Wm,LuminanceAlphaFormat:km,LuminanceFormat:zm,MOUSE:ms,Material:Yt,MaterialLoader:dc,MathUtils:Gl,Matrix3:We,Matrix4:Pe,MaxEquation:sm,Mesh:ct,MeshBasicMaterial:$n,MeshDepthMaterial:Ju,MeshDistanceMaterial:ju,MeshLambertMaterial:Vg,MeshMatcapMaterial:Gg,MeshNormalMaterial:Hg,MeshPhongMaterial:zg,MeshPhysicalMaterial:Bg,MeshStandardMaterial:Xr,MeshToonMaterial:kg,MinEquation:im,MirroredRepeatWrapping:To,MixOperation:wm,MultiplyBlending:Ih,MultiplyOperation:Jo,NearestFilter:Ot,NearestMipMapLinearFilter:Sx,NearestMipMapNearestFilter:Mx,NearestMipmapLinearFilter:Er,NearestMipmapNearestFilter:Nu,NeutralToneMapping:Lm,NeverCompare:Zm,NeverDepth:_m,NeverStencilFunc:Ox,NoBlending:gi,NoColorSpace:ci,NoToneMapping:xi,NormalAnimationBlendMode:Hl,NormalBlending:Is,NotEqualCompare:Qm,NotEqualDepth:Em,NotEqualStencilFunc:Hx,NumberKeyframeTrack:ko,Object3D:et,ObjectLoader:SE,ObjectSpaceNormalMap:$m,OctahedronGeometry:ra,OneFactor:om,OneMinusConstantAlphaFactor:xm,OneMinusConstantColorFactor:mm,OneMinusDstAlphaFactor:hm,OneMinusDstColorFactor:dm,OneMinusSrcAlphaFactor:Tl,OneMinusSrcColorFactor:lm,OrthographicCamera:Yl,P3Primaries:Lo,PCFShadowMap:Lu,PCFSoftShadowMap:Qp,PMREMGenerator:au,Path:Oo,PerspectiveCamera:Ut,Plane:oi,PlaneGeometry:Hr,PlaneHelper:cw,PointLight:md,PointLightHelper:ew,Points:jl,PointsMaterial:ia,PolarGridHelper:sw,PolyhedronGeometry:Zi,PositionalAudio:IE,PropertyBinding:je,PropertyMixer:o0,QuadraticBezierCurve:ad,QuadraticBezierCurve3:ld,Quaternion:Wt,QuaternionKeyframeTrack:la,QuaternionLinearInterpolant:Zg,RED_GREEN_RGTC2_Format:iu,RED_RGTC1_Format:Vm,REVISION:zl,RGBADepthPacking:Ym,RGBAFormat:sn,RGBAIntegerFormat:Hu,RGBA_ASTC_10x10_Format:Jh,RGBA_ASTC_10x5_Format:$h,RGBA_ASTC_10x6_Format:Zh,RGBA_ASTC_10x8_Format:Kh,RGBA_ASTC_12x10_Format:jh,RGBA_ASTC_12x12_Format:Qh,RGBA_ASTC_4x4_Format:kh,RGBA_ASTC_5x4_Format:Hh,RGBA_ASTC_5x5_Format:Vh,RGBA_ASTC_6x5_Format:Gh,RGBA_ASTC_6x6_Format:Wh,RGBA_ASTC_8x5_Format:Xh,RGBA_ASTC_8x6_Format:qh,RGBA_ASTC_8x8_Format:Yh,RGBA_BPTC_Format:gl,RGBA_ETC2_EAC_Format:zh,RGBA_PVRTC_2BPPV1_Format:Oh,RGBA_PVRTC_4BPPV1_Format:Uh,RGBA_S3TC_DXT1_Format:fl,RGBA_S3TC_DXT3_Format:pl,RGBA_S3TC_DXT5_Format:ml,RGBFormat:Bm,RGB_BPTC_SIGNED_Format:eu,RGB_BPTC_UNSIGNED_Format:tu,RGB_ETC1_Format:Fh,RGB_ETC2_Format:Bh,RGB_PVRTC_2BPPV1_Format:Nh,RGB_PVRTC_4BPPV1_Format:Dh,RGB_S3TC_DXT1_Format:dl,RGFormat:Hm,RGIntegerFormat:ku,RawShaderMaterial:Fg,Ray:Vs,Raycaster:l0,Rec709Primaries:Io,RectAreaLight:Qg,RedFormat:Bu,RedIntegerFormat:zu,ReinhardToneMapping:Rm,RenderTarget:rg,RepeatWrapping:wo,ReplaceStencilOp:Px,ReverseSubtractEquation:nm,RingGeometry:ac,SIGNED_RED_GREEN_RGTC2_Format:su,SIGNED_RED_RGTC1_Format:nu,SRGBColorSpace:un,SRGBTransfer:lt,Scene:Qu,ShaderChunk:Ye,ShaderLib:Cn,ShaderMaterial:Un,ShadowMaterial:Og,Shape:Ns,ShapeGeometry:lc,ShapePath:dw,ShapeUtils:Xn,ShortType:Um,Skeleton:Jl,SkeletonHelper:QE,SkinnedMesh:Sg,Source:Rs,Sphere:Xt,SphereGeometry:Ws,Spherical:mu,SphericalHarmonics3:e0,SplineCurve:cd,SpotLight:jg,SpotLightHelper:jE,Sprite:bg,SpriteMaterial:ed,SrcAlphaFactor:wl,SrcAlphaSaturateFactor:fm,SrcColorFactor:am,StaticCopyUsage:$x,StaticDrawUsage:Do,StaticReadUsage:Xx,StereoCamera:AE,StreamCopyUsage:Kx,StreamDrawUsage:Wx,StreamReadUsage:Yx,StringKeyframeTrack:qs,SubtractEquation:tm,SubtractiveBlending:Ph,TOUCH:gs,TangentSpaceNormalMap:$i,TetrahedronGeometry:cc,Texture:yt,TextureLoader:yE,TorusGeometry:hc,TorusKnotGeometry:uc,Triangle:dn,TriangleFanDrawMode:Rx,TriangleStripDrawMode:Ax,TrianglesDrawMode:Tx,TubeGeometry:oa,UVMapping:kl,Uint16BufferAttribute:Yu,Uint32BufferAttribute:$u,Uint8BufferAttribute:L_,Uint8ClampedBufferAttribute:D_,Uniform:vd,UniformsGroup:qE,UniformsLib:fe,UniformsUtils:lg,UnsignedByteType:Mi,UnsignedInt248Type:Fs,UnsignedInt5999Type:Om,UnsignedIntType:Os,UnsignedShort4444Type:Ou,UnsignedShort5551Type:Fu,UnsignedShortType:Ao,VSMShadowMap:kn,Vector2:K,Vector3:R,Vector4:ot,VectorKeyframeTrack:Ho,VideoTexture:LS,WebGL3DRenderTarget:v_,WebGLArrayRenderTarget:y_,WebGLCoordinateSystem:Gn,WebGLCubeRenderTarget:hg,WebGLMultipleRenderTargets:fw,WebGLRenderTarget:Nn,WebGLRenderer:yg,WebGLUtils:xg,WebGPUCoordinateSystem:No,WireframeGeometry:Ug,WrapAroundEnding:Co,ZeroCurvatureEnding:Ts,ZeroFactor:rm,ZeroSlopeEnding:As,ZeroStencilOp:Cx,createCanvasElement:ig},Symbol.toStringTag,{value:"Module"})),Ep={type:"change"},dh={type:"start"},wp={type:"end"},al=new Vs,Tp=new oi,mw=Math.cos(70*Gl.DEG2RAD);class gw extends Yn{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new R,this.cursor=new R,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ms.ROTATE,MIDDLE:ms.DOLLY,RIGHT:ms.PAN},this.touches={ONE:gs.ROTATE,TWO:gs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(v){v.addEventListener("keydown",ue),this._domElementKeyEvents=v},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",ue),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(Ep),n.update(),r=i.NONE},this.update=function(){const v=new R,X=new Wt().setFromUnitVectors(e.up,new R(0,1,0)),z=X.clone().invert(),Y=new R,ne=new Wt,Ae=new R,ze=2*Math.PI;return function(Et=null){const tt=n.object.position;v.copy(tt).sub(n.target),v.applyQuaternion(X),a.setFromVector3(v),n.autoRotate&&r===i.NONE&&O(M(Et)),n.enableDamping?(a.theta+=l.theta*n.dampingFactor,a.phi+=l.phi*n.dampingFactor):(a.theta+=l.theta,a.phi+=l.phi);let wt=n.minAzimuthAngle,Tt=n.maxAzimuthAngle;isFinite(wt)&&isFinite(Tt)&&(wt<-Math.PI?wt+=ze:wt>Math.PI&&(wt-=ze),Tt<-Math.PI?Tt+=ze:Tt>Math.PI&&(Tt-=ze),wt<=Tt?a.theta=Math.max(wt,Math.min(Tt,a.theta)):a.theta=a.theta>(wt+Tt)/2?Math.max(wt,a.theta):Math.min(Tt,a.theta)),a.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,a.phi)),a.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(h,n.dampingFactor):n.target.add(h),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor);let on=!1;if(n.zoomToCursor&&A||n.object.isOrthographicCamera)a.radius=pe(a.radius);else{const an=a.radius;a.radius=pe(a.radius*c),on=an!=a.radius}if(v.setFromSpherical(a),v.applyQuaternion(z),tt.copy(n.target).add(v),n.object.lookAt(n.target),n.enableDamping===!0?(l.theta*=1-n.dampingFactor,l.phi*=1-n.dampingFactor,h.multiplyScalar(1-n.dampingFactor)):(l.set(0,0,0),h.set(0,0,0)),n.zoomToCursor&&A){let an=null;if(n.object.isPerspectiveCamera){const Ri=v.length();an=pe(Ri*c);const Qi=Ri-an;n.object.position.addScaledVector(b,Qi),n.object.updateMatrixWorld(),on=!!Qi}else if(n.object.isOrthographicCamera){const Ri=new R(L.x,L.y,0);Ri.unproject(n.object);const Qi=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),n.object.updateProjectionMatrix(),on=Qi!==n.object.zoom;const es=new R(L.x,L.y,0);es.unproject(n.object),n.object.position.sub(es).add(Ri),n.object.updateMatrixWorld(),an=v.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;an!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(an).add(n.object.position):(al.origin.copy(n.object.position),al.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(al.direction))<mw?e.lookAt(n.target):(Tp.setFromNormalAndCoplanarPoint(n.object.up,n.target),al.intersectPlane(Tp,n.target))))}else if(n.object.isOrthographicCamera){const an=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),an!==n.object.zoom&&(n.object.updateProjectionMatrix(),on=!0)}return c=1,A=!1,on||Y.distanceToSquared(n.object.position)>o||8*(1-ne.dot(n.object.quaternion))>o||Ae.distanceToSquared(n.target)>o?(n.dispatchEvent(Ep),Y.copy(n.object.position),ne.copy(n.object.quaternion),Ae.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Se),n.domElement.removeEventListener("pointerdown",Ne),n.domElement.removeEventListener("pointercancel",S),n.domElement.removeEventListener("wheel",j),n.domElement.removeEventListener("pointermove",I),n.domElement.removeEventListener("pointerup",S),n.domElement.getRootNode().removeEventListener("keydown",Te,{capture:!0}),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",ue),n._domElementKeyEvents=null)};const n=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let r=i.NONE;const o=1e-6,a=new mu,l=new mu;let c=1;const h=new R,u=new K,d=new K,f=new K,m=new K,x=new K,g=new K,p=new K,y=new K,_=new K,b=new R,L=new K;let A=!1;const T=[],P={};let E=!1;function M(v){return v!==null?2*Math.PI/60*n.autoRotateSpeed*v:2*Math.PI/60/60*n.autoRotateSpeed}function C(v){const X=Math.abs(v*.01);return Math.pow(.95,n.zoomSpeed*X)}function O(v){l.theta-=v}function N(v){l.phi-=v}const q=function(){const v=new R;return function(z,Y){v.setFromMatrixColumn(Y,0),v.multiplyScalar(-z),h.add(v)}}(),Z=function(){const v=new R;return function(z,Y){n.screenSpacePanning===!0?v.setFromMatrixColumn(Y,1):(v.setFromMatrixColumn(Y,0),v.crossVectors(n.object.up,v)),v.multiplyScalar(z),h.add(v)}}(),B=function(){const v=new R;return function(z,Y){const ne=n.domElement;if(n.object.isPerspectiveCamera){const Ae=n.object.position;v.copy(Ae).sub(n.target);let ze=v.length();ze*=Math.tan(n.object.fov/2*Math.PI/180),q(2*z*ze/ne.clientHeight,n.object.matrix),Z(2*Y*ze/ne.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(q(z*(n.object.right-n.object.left)/n.object.zoom/ne.clientWidth,n.object.matrix),Z(Y*(n.object.top-n.object.bottom)/n.object.zoom/ne.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function W(v){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c/=v:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function H(v){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c*=v:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function de(v,X){if(!n.zoomToCursor)return;A=!0;const z=n.domElement.getBoundingClientRect(),Y=v-z.left,ne=X-z.top,Ae=z.width,ze=z.height;L.x=Y/Ae*2-1,L.y=-(ne/ze)*2+1,b.set(L.x,L.y,1).unproject(n.object).sub(n.object.position).normalize()}function pe(v){return Math.max(n.minDistance,Math.min(n.maxDistance,v))}function me(v){u.set(v.clientX,v.clientY)}function ke(v){de(v.clientX,v.clientX),p.set(v.clientX,v.clientY)}function Ze(v){m.set(v.clientX,v.clientY)}function $(v){d.set(v.clientX,v.clientY),f.subVectors(d,u).multiplyScalar(n.rotateSpeed);const X=n.domElement;O(2*Math.PI*f.x/X.clientHeight),N(2*Math.PI*f.y/X.clientHeight),u.copy(d),n.update()}function re(v){y.set(v.clientX,v.clientY),_.subVectors(y,p),_.y>0?W(C(_.y)):_.y<0&&H(C(_.y)),p.copy(y),n.update()}function be(v){x.set(v.clientX,v.clientY),g.subVectors(x,m).multiplyScalar(n.panSpeed),B(g.x,g.y),m.copy(x),n.update()}function le(v){de(v.clientX,v.clientY),v.deltaY<0?H(C(v.deltaY)):v.deltaY>0&&W(C(v.deltaY)),n.update()}function Oe(v){let X=!1;switch(v.code){case n.keys.UP:v.ctrlKey||v.metaKey||v.shiftKey?N(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):B(0,n.keyPanSpeed),X=!0;break;case n.keys.BOTTOM:v.ctrlKey||v.metaKey||v.shiftKey?N(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):B(0,-n.keyPanSpeed),X=!0;break;case n.keys.LEFT:v.ctrlKey||v.metaKey||v.shiftKey?O(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):B(n.keyPanSpeed,0),X=!0;break;case n.keys.RIGHT:v.ctrlKey||v.metaKey||v.shiftKey?O(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):B(-n.keyPanSpeed,0),X=!0;break}X&&(v.preventDefault(),n.update())}function Fe(v){if(T.length===1)u.set(v.pageX,v.pageY);else{const X=Ge(v),z=.5*(v.pageX+X.x),Y=.5*(v.pageY+X.y);u.set(z,Y)}}function De(v){if(T.length===1)m.set(v.pageX,v.pageY);else{const X=Ge(v),z=.5*(v.pageX+X.x),Y=.5*(v.pageY+X.y);m.set(z,Y)}}function D(v){const X=Ge(v),z=v.pageX-X.x,Y=v.pageY-X.y,ne=Math.sqrt(z*z+Y*Y);p.set(0,ne)}function J(v){n.enableZoom&&D(v),n.enablePan&&De(v)}function ee(v){n.enableZoom&&D(v),n.enableRotate&&Fe(v)}function oe(v){if(T.length==1)d.set(v.pageX,v.pageY);else{const z=Ge(v),Y=.5*(v.pageX+z.x),ne=.5*(v.pageY+z.y);d.set(Y,ne)}f.subVectors(d,u).multiplyScalar(n.rotateSpeed);const X=n.domElement;O(2*Math.PI*f.x/X.clientHeight),N(2*Math.PI*f.y/X.clientHeight),u.copy(d)}function ie(v){if(T.length===1)x.set(v.pageX,v.pageY);else{const X=Ge(v),z=.5*(v.pageX+X.x),Y=.5*(v.pageY+X.y);x.set(z,Y)}g.subVectors(x,m).multiplyScalar(n.panSpeed),B(g.x,g.y),m.copy(x)}function se(v){const X=Ge(v),z=v.pageX-X.x,Y=v.pageY-X.y,ne=Math.sqrt(z*z+Y*Y);y.set(0,ne),_.set(0,Math.pow(y.y/p.y,n.zoomSpeed)),W(_.y),p.copy(y);const Ae=(v.pageX+X.x)*.5,ze=(v.pageY+X.y)*.5;de(Ae,ze)}function ye(v){n.enableZoom&&se(v),n.enablePan&&ie(v)}function xe(v){n.enableZoom&&se(v),n.enableRotate&&oe(v)}function Ne(v){n.enabled!==!1&&(T.length===0&&(n.domElement.setPointerCapture(v.pointerId),n.domElement.addEventListener("pointermove",I),n.domElement.addEventListener("pointerup",S)),!_e(v)&&(Ke(v),v.pointerType==="touch"?Be(v):V(v)))}function I(v){n.enabled!==!1&&(v.pointerType==="touch"?ae(v):Q(v))}function S(v){switch(Ie(v),T.length){case 0:n.domElement.releasePointerCapture(v.pointerId),n.domElement.removeEventListener("pointermove",I),n.domElement.removeEventListener("pointerup",S),n.dispatchEvent(wp),r=i.NONE;break;case 1:const X=T[0],z=P[X];Be({pointerId:X,pageX:z.x,pageY:z.y});break}}function V(v){let X;switch(v.button){case 0:X=n.mouseButtons.LEFT;break;case 1:X=n.mouseButtons.MIDDLE;break;case 2:X=n.mouseButtons.RIGHT;break;default:X=-1}switch(X){case ms.DOLLY:if(n.enableZoom===!1)return;ke(v),r=i.DOLLY;break;case ms.ROTATE:if(v.ctrlKey||v.metaKey||v.shiftKey){if(n.enablePan===!1)return;Ze(v),r=i.PAN}else{if(n.enableRotate===!1)return;me(v),r=i.ROTATE}break;case ms.PAN:if(v.ctrlKey||v.metaKey||v.shiftKey){if(n.enableRotate===!1)return;me(v),r=i.ROTATE}else{if(n.enablePan===!1)return;Ze(v),r=i.PAN}break;default:r=i.NONE}r!==i.NONE&&n.dispatchEvent(dh)}function Q(v){switch(r){case i.ROTATE:if(n.enableRotate===!1)return;$(v);break;case i.DOLLY:if(n.enableZoom===!1)return;re(v);break;case i.PAN:if(n.enablePan===!1)return;be(v);break}}function j(v){n.enabled===!1||n.enableZoom===!1||r!==i.NONE||(v.preventDefault(),n.dispatchEvent(dh),le(te(v)),n.dispatchEvent(wp))}function te(v){const X=v.deltaMode,z={clientX:v.clientX,clientY:v.clientY,deltaY:v.deltaY};switch(X){case 1:z.deltaY*=16;break;case 2:z.deltaY*=100;break}return v.ctrlKey&&!E&&(z.deltaY*=10),z}function Te(v){v.key==="Control"&&(E=!0,n.domElement.getRootNode().addEventListener("keyup",he,{passive:!0,capture:!0}))}function he(v){v.key==="Control"&&(E=!1,n.domElement.getRootNode().removeEventListener("keyup",he,{passive:!0,capture:!0}))}function ue(v){n.enabled===!1||n.enablePan===!1||Oe(v)}function Be(v){switch(Ve(v),T.length){case 1:switch(n.touches.ONE){case gs.ROTATE:if(n.enableRotate===!1)return;Fe(v),r=i.TOUCH_ROTATE;break;case gs.PAN:if(n.enablePan===!1)return;De(v),r=i.TOUCH_PAN;break;default:r=i.NONE}break;case 2:switch(n.touches.TWO){case gs.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;J(v),r=i.TOUCH_DOLLY_PAN;break;case gs.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;ee(v),r=i.TOUCH_DOLLY_ROTATE;break;default:r=i.NONE}break;default:r=i.NONE}r!==i.NONE&&n.dispatchEvent(dh)}function ae(v){switch(Ve(v),r){case i.TOUCH_ROTATE:if(n.enableRotate===!1)return;oe(v),n.update();break;case i.TOUCH_PAN:if(n.enablePan===!1)return;ie(v),n.update();break;case i.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;ye(v),n.update();break;case i.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;xe(v),n.update();break;default:r=i.NONE}}function Se(v){n.enabled!==!1&&v.preventDefault()}function Ke(v){T.push(v.pointerId)}function Ie(v){delete P[v.pointerId];for(let X=0;X<T.length;X++)if(T[X]==v.pointerId){T.splice(X,1);return}}function _e(v){for(let X=0;X<T.length;X++)if(T[X]==v.pointerId)return!0;return!1}function Ve(v){let X=P[v.pointerId];X===void 0&&(X=new K,P[v.pointerId]=X),X.set(v.pageX,v.pageY)}function Ge(v){const X=v.pointerId===T[0]?T[1]:T[0];return P[X]}n.domElement.addEventListener("contextmenu",Se),n.domElement.addEventListener("pointerdown",Ne),n.domElement.addEventListener("pointercancel",S),n.domElement.addEventListener("wheel",j,{passive:!1}),n.domElement.getRootNode().addEventListener("keydown",Te,{passive:!0,capture:!0}),this.update()}}let Bi=null,Wn=null,fn=null,Ct=null,Cr=null,vr=null,gu=!1;const xw=.055,xu=3e3,_u=.3;function _w(s){return Bi=new yg({canvas:s,antialias:!0,alpha:!1}),Bi.setPixelRatio(Math.min(window.devicePixelRatio,2)),Bi.setSize(s.clientWidth,s.clientHeight),Bi.toneMapping=Du,Bi.toneMappingExposure=1.2,Bi.outputColorSpace=un,Wn=new Qu,Wn.background=new ge(657935),Wn.fog=new na(657935,.08),fn=new Ut(45,s.clientWidth/s.clientHeight,.1,100),fn.position.set(0,1.2,3),fn.lookAt(0,0,0),Ct=new gw(fn,s),Ct.enableDamping=!0,Ct.dampingFactor=.08,Ct.minDistance=1.8,Ct.maxDistance=5,Ct.autoRotate=!1,Ct.addEventListener("start",()=>{clearTimeout(Cr),Ct.autoRotate=!1}),Ct.addEventListener("end",()=>{Cr=setTimeout(()=>{Ct.autoRotate=!0,Ct.autoRotateSpeed=_u},xu)}),yw(),vw(s),Cr=setTimeout(()=>{Ct.autoRotate=!0,Ct.autoRotateSpeed=_u},xu),{scene:Wn,camera:fn}}function yw(){const s=new gd(3359061,.8);Wn.add(s);const e=new Il(16777215,1.8);e.position.set(3,4,2),Wn.add(e);const t=new Il(51623,.6);t.position.set(-3,0,-2),Wn.add(t);const n=new md(6514417,.8,3);n.position.set(0,0,0),Wn.add(n)}function vw(s){new ResizeObserver(()=>{const t=s.clientWidth,n=s.clientHeight;Bi.setSize(t,n,!1),fn.aspect=t/n,fn.updateProjectionMatrix()}).observe(s.parentElement)}function bw(){gu&&vr?(fn.position.lerp(vr,xw),fn.lookAt(0,0,0),fn.position.distanceTo(vr)<.015&&(fn.position.copy(vr),gu=!1,vr=null,Ct.enabled=!0)):Ct.update(),Bi.render(Wn,fn)}function Wo(s){const e=fn.position.length();vr=s.clone().normalize().multiplyScalar(e),gu=!0,Ct.enabled=!1,clearTimeout(Cr)}function fc(){clearTimeout(Cr),Ct.autoRotate=!1}function Xi(){Cr=setTimeout(()=>{Ct.autoRotate=!0,Ct.autoRotateSpeed=_u},xu)}function Mw(){return Wn}const Ap={safe:30,charged:60},fh={safe:51623,charged:16096779,critical:15680580},bd=[3718648,16020150,10980346,16486972],Sw=200,_o={safe:null,charged:null,critical:null},Rp={hidden:{color:0,intensity:0},"revealed-safe":{color:51623,intensity:.6},"revealed-trap":{color:1118481,intensity:0},reward:{color:16766720,intensity:1.2}};function ph(s){return new Xr({color:s,roughness:.6,metalness:.2,emissive:new ge(0),emissiveIntensity:0})}function h0(){_o.safe=ph(fh.safe),_o.charged=ph(fh.charged),_o.critical=ph(fh.critical)}function u0(s,e="hidden"){const n=(_o[s]??_o.safe).clone();return d0(n,e),n}function d0(s,e){if(e==="hidden")s.emissive.copy(s.color),s.emissiveIntensity=.4;else{const t=Rp[e]??Rp.hidden;s.emissive.set(t.color),s.emissiveIntensity=t.intensity}}const f0=1,p0=.065;let pc=null;const qt=new Map;let yu=null;const Ur=new Map;let Ms=-1,Md=-1,yl=null;const m0=3718648,Ew=3718648,ww=51623;function Tw(s){yl=s}function Aw(s){const e=[],t=Math.PI*(3-Math.sqrt(5));for(let n=0;n<s;n++){const i=1-n/(s-1)*2,r=Math.sqrt(1-i*i),o=t*n;e.push(new R(r*Math.cos(o),i,r*Math.sin(o)))}return e}function Rw(s){return Gl.radToDeg(Math.asin(s.y))}function Cw(s){const e=Math.abs(Rw(s));return e<Ap.safe?"safe":e<Ap.charged?"charged":"critical"}function Pw(s,e,t=6){pc=e,h0(),qt.forEach(({mesh:r})=>{r.geometry.dispose(),e.remove(r)}),qt.clear(),Sn(),yu=s;const n=f0/t,i=.82;for(const r of s.tiles){const o=r.zone,a=new R(r.center.x,r.center.y,r.center.z).multiplyScalar(n),l=a.clone().normalize(),c=r.vertices.map(p=>new R(p.x,p.y,p.z).multiplyScalar(n)),h=c.reduce((p,y)=>Math.max(p,a.distanceTo(y)),0),u=c.map(p=>{const y=p.clone().sub(a);return a.clone().add(y.multiplyScalar(i))}),d=[],f=[];for(let p=0;p<u.length;p++){const y=(p+1)%u.length;d.push(a.x,a.y,a.z),d.push(u[p].x,u[p].y,u[p].z),d.push(u[y].x,u[y].y,u[y].z);for(let _=0;_<3;_++)f.push(l.x,l.y,l.z)}const m=new He;m.setAttribute("position",new Me(d,3)),m.setAttribute("normal",new Me(f,3));const x=u0(o,"hidden"),g=new ct(m,x);g.userData.tileId=r.id,e.add(g),qt.set(r.id,{mesh:g,zone:o,state:"hidden",animData:{},center:a,tileRadius:h})}}function Iw(s){pc=s,h0(),Aw(Sw).forEach((t,n)=>{const i=Cw(t),r=new Gr(p0,6),o=u0(i,"hidden"),a=new ct(r,o),l=t.clone().multiplyScalar(f0+.002);a.position.copy(l),a.lookAt(new R(0,0,0)),a.rotateX(Math.PI),a.userData.tileId=n,s.add(a),qt.set(n,{mesh:a,zone:i,state:"hidden",animData:{}})})}function Ei(s){const e=qt.get(s);return e?e.center?e.center.clone():e.mesh.position.clone():new R}function Sd(s,e){const t=qt.get(s);t&&(t.state=e,t.animData={startTime:performance.now()},d0(t.mesh.material,e),t.mesh.material.needsUpdate=!0)}function Lw(s){qt.forEach(t=>{const{state:n,mesh:i,animData:r}=t;if(!r.startTime)return;const o=(s-r.startTime)/1e3;if(n==="revealed-safe")i.material.emissiveIntensity=.4+.3*Math.sin(o*3);else if(n==="revealed-trap"){if(o<.4){const a=.005*(1-o/.4);i.position.x+=(Math.random()-.5)*a,i.position.y+=(Math.random()-.5)*a,i.position.z+=(Math.random()-.5)*a}}else n==="reward"&&(i.material.emissiveIntensity=o<1?1.2*Math.exp(-o*3):.3)});const e=s/1e3;Ur.forEach((t,n)=>{const i=qt.get(n);n===Md?(t.material.opacity=.9,t.material.color.set(ww),i&&(i.mesh.material.emissiveIntensity=.5)):n===Ms?(t.material.opacity=.85,t.material.color.set(Ew),i&&(i.mesh.material.emissiveIntensity=.7)):(t.material.opacity=.35+.2*Math.sin(e*2.5+n*.8),t.material.color.set(m0),i&&i.state==="hidden"&&(i.mesh.material.emissiveIntensity=0))})}function g0(s,e){const t=new l0;t.setFromCamera(s,e);const n=[...qt.values()].map(r=>r.mesh),i=t.intersectObjects(n);return i.length>0?i[0].object.userData.tileId:-1}function Ed(){Sn(),qt.forEach((s,e)=>Sd(e,"hidden"))}function Dw(s){const e=s.tileRadius??p0,t=new Gr(e*.38,32),n=new $n({color:m0,side:Pn,transparent:!0,opacity:.25,depthTest:!1}),i=new ct(t,n),r=s.center??s.mesh.position;return i.position.copy(r).multiplyScalar(1.004),i.lookAt(0,0,0),i.rotateX(Math.PI),i}function x0(s){Sn(),s.forEach(t=>{const n=qt.get(t);if(!n)return;const i=Dw(n);pc.add(i),Ur.set(t,i)});const e=document.getElementById("canvas");e&&(e.style.cursor=s.length?"crosshair":"default")}function Sn(){Ur.forEach(e=>{e.geometry.dispose(),e.material.dispose(),pc.remove(e)}),Ur.clear(),Ms=-1,Md=-1;const s=document.getElementById("canvas");s&&(s.style.cursor="default")}function Nw(s){var n;Ms=Ur.has(s)?s:-1;const e=document.getElementById("canvas");e&&(e.style.cursor=Ms!==-1?"pointer":"crosshair");const t=Ms!==-1?((n=qt.get(Ms))==null?void 0:n.zone)??null:null;yl==null||yl({tileId:Ms,zone:t})}function Uw(s){Md=s}function _0(s){return Ur.has(s)}function Ow(s,e=22){if(yu){const o=yu.tiles[s];return o?[...o.adjacency]:[]}const t=qt.get(s);if(!t)return[];const n=Gl.degToRad(e),i=t.mesh.position.clone().normalize(),r=[];return qt.forEach(({mesh:o},a)=>{a!==s&&i.angleTo(o.position.clone().normalize())<n&&r.push(a)}),r}function Fw(s){const e=[];return qt.forEach((t,n)=>{t.zone===s&&e.push(n)}),e}function mh(){const s=[];return qt.forEach((e,t)=>{s.push({id:t,position:e.mesh.position.clone(),zone:e.zone,state:e.state})}),s}const Bw=1,zw=.008,kw=12,y0=24;let v0=null;const yo=new Map;function Hw(s){v0=s}function Vw(s,e,t){const n=[],i=s.clone().normalize(),r=e.clone().normalize();for(let o=0;o<=t;o++){const a=o/t,l=new R().copy(i).lerp(r,a).normalize();n.push(l.multiplyScalar(Bw+.005))}return n}function Gw(s,e){const t=new sd(s),n=new oa(t,y0,zw,kw,!1),i=new Xr({color:e,emissive:new ge(e),emissiveIntensity:.4,roughness:.3,metalness:.5});return new ct(n,i)}function Ww(s){if(!yo.has(s)){const e=new ki;v0.add(e),yo.set(s,{points:[],group:e})}return yo.get(s)}function b0(s,e,t){const n=Ww(s),i=Ei(e),r=Ei(t),o=Vw(i,r,y0),a=bd[s]??16777215,l=Gw(o,a);n.group.add(l),n.points.push(r.clone())}function Xw(s){const e=yo.get(s);e&&(e.group.clear(),e.points=[])}function wd(){yo.forEach((s,e)=>Xw(e))}const qw=.04,Yw=.008,$w=1.8,Zw=.6;let Td=null;const wi=new Map;function Kw(s){Td=s}function Jw(s){const e=bd[s]??16777215,t=new Ws(qw,16,12),n=new Xr({color:e,emissive:new ge(e),emissiveIntensity:.3,roughness:.4,metalness:.6});return new ct(t,n)}function M0(s,e){wi.has(s)&&w0(s);const t=Jw(s),n=Ei(e);t.position.copy(n.clone().multiplyScalar(1.06)),Td.add(t),wi.set(s,{mesh:t,tileId:e,floatOffset:s*1.3,moveAnim:null,busted:!1})}function S0(s,e){const t=wi.get(s);if(!t)return;const n=t.mesh.position.clone(),i=Ei(e).clone().multiplyScalar(1.06);t.moveAnim={from:n,to:i,startTime:performance.now()},t.tileId=e}function E0(s){const e=wi.get(s);e&&(e.busted=!0,e.mesh.material.color.set(4473924),e.mesh.material.emissiveIntensity=0)}function w0(s){const e=wi.get(s);e&&(Td.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material.dispose(),wi.delete(s))}function Ad(){[...wi.keys()].forEach(w0)}function jw(s){const e=s/1e3;wi.forEach(t=>{const{mesh:n,floatOffset:i,moveAnim:r,busted:o}=t;if(r){const a=(s-r.startTime)/1e3,l=Math.min(a/Zw,1),c=l<.5?2*l*l:-1+(4-2*l)*l,h=r.from.clone().normalize(),u=r.to.clone().normalize(),d=new R().copy(h).lerp(u,c).normalize(),f=r.from.length()+Math.sin(Math.PI*c)*.1;n.position.copy(d.multiplyScalar(f)),l>=1&&(t.moveAnim=null)}else if(!o){const a=n.position.clone().normalize(),l=a.clone().multiplyScalar(1.06),c=a.clone().multiplyScalar(Yw*Math.sin(e*$w+i));n.position.copy(l).add(c)}})}function T0(){const s=new Map;return wi.forEach((e,t)=>{s.set(t,e.mesh.position.clone())}),s}const _r={onReveal:"onReveal",onBust:"onBust",onCashout:"onCashout",onRoundEnd:"onRoundEnd",onRoundStart:"onRoundStart",onTimerSync:"onTimerSync"},Or={CASHOUT:"CASHOUT",MOVE_SELECTED:"MOVE_SELECTED",LOCK_IN:"LOCK_IN",PLACE_BET:"PLACE_BET"},Cp=new Map,Qw=1,eT=.3;function A0(s){const e="/GameJam/",t=s.replace(/^\//,"");return e.endsWith("/")?`${e}${t}`:`${e}/${t}`}const Rd=new Audio(A0("assets/sfx/Cybernetic_Casino_background_music.mp3"));Rd.loop=!0;Rd.volume=eT;function tT(){Rd.play().catch(()=>{})}function nT(s){const e=s.startsWith("http")||s.startsWith("/")?s:A0(s);let t=Cp.get(e);t||(t=new Audio(e),t.volume=Qw,Cp.set(e,t)),t.currentTime=0,t.play().catch(()=>{})}const iT=30;let si=null,pi=0,Cd=0,Ys=!1,En=!1,gh=-1;const vu={onReveal:[],onBust:[],onCashout:[],onRoundEnd:[],onRoundStart:[],onTimerSync:[],onIdleStrikes:[],onLocalMoveTurn:[],onPlayTurn:[]},Ln=new Map,Vi=new Map;function sT(s){si=s,si.addEventListener(_r.onRoundStart,e=>aT(e.detail)),si.addEventListener(_r.onReveal,e=>lT(e.detail)),si.addEventListener(_r.onBust,e=>cT(e.detail)),si.addEventListener(_r.onCashout,e=>hT(e.detail)),si.addEventListener(_r.onRoundEnd,e=>uT(e.detail)),si.addEventListener(_r.onTimerSync,e=>dT(e.detail))}function qe(s,e){vu[s]&&vu[s].push(e)}function Bt(s,e){var t;(t=vu[s])==null||t.forEach(n=>n(e))}function mc(s,e={}){si&&si.dispatchEvent(new CustomEvent(s,{detail:e}))}function Dn(){return Cd}function rT(s,e){if(!Ys||En)return;const t=g0(s,e);t!==-1&&_0(t)&&(Uw(t),mc(Or.MOVE_SELECTED,{tileId:t}))}function oT(s,e){if(!Ys)return;const t=g0(s,e);Nw(t),t!==-1&&!En&&_0(t)?t!==gh&&(gh=t,nT("assets/sfx/Hover select tile.mp3")):gh=-1}function aT({boardSeed:s,playerCount:e=2,timerDuration:t=30,localPlayerId:n=0}){pi=n,Cd=n,Ys=!0,En=!1,Ed(),wd(),Ad(),Ln.clear();const i=Fw("safe");for(let a=0;a<e;a++){const l=fT(i,s,a,e);M0(a,l),Ln.set(a,l)}const r=Ln.get(n);if(r!==void 0){const a=Ei(r);Wo(a),fc()}R0(n),Bt("onRoundStart",{boardSeed:s,playerCount:e,timerDuration:t,localPlayerId:n});const o=!En;Bt("onPlayTurn",{canStep:o,spectating:En}),o&&Bt("onLocalMoveTurn",{})}function lT({tileId:s,type:e,playerId:t,voltage:n}){Sd(s,e==="safe"?"revealed-safe":e==="trap"?"revealed-trap":"reward");const r=Ln.get(t);r!==void 0&&r!==s&&b0(t,r,s),S0(t,s),Ln.set(t,s),t===pi?(R0(t),fc(),Wo(Ei(s))):(Wo(Ei(s)),Xi()),Bt("onReveal",{tileId:s,type:e,playerId:t,voltage:n})}function cT({playerId:s}){E0(s),s===pi&&(En=!0,Sn(),Xi()),Bt("onBust",{playerId:s})}function hT({playerId:s,voltage:e}){s===pi&&(Sn(),Xi()),Bt("onCashout",{playerId:s,voltage:e})}function uT({results:s,matchNumber:e}){Ys=!1,Sn(),Xi(),Bt("onRoundEnd",{results:s,matchNumber:e??1})}function dT({remaining:s}){Bt("onTimerSync",{remaining:s})}function R0(s){const e=Ln.get(s);if(e===void 0)return;const t=Ow(e);x0(t)}function fT(s,e,t,n){if(!s.length)return t*20;const i=Math.floor(s.length/n);return s[(e+t*i)%s.length]}function pT(s,e,t={}){pi=e,s.length,Ys=!0,En=!1,Vi.clear(),Ed(),wd(),Ad(),Ln.clear(),s.forEach((l,c)=>{Vi.set(l.id,c),Ln.set(l.id,l.startTileId),M0(c,l.startTileId)});const n=Vi.get(e)??0;Cd=n;const i=s.find(l=>l.id===e);i!=null&&(Wo(Ei(i.startTileId)),fc());const r=s.map((l,c)=>({playerId:c,name:l.name??`P${c}`,color:l.color??null})),o=t[e]??0,a=iT;Bt("onRoundStart",{playerCount:s.length,localPlayerId:n,players:r,betAmount:o,timerDuration:a})}function mT(s,e){Sn(),!En&&s.length>0&&(x0(s),fc());const t=Math.max(0,(e-Date.now())/1e3);Bt("onTimerSync",{remaining:t});const n=s.length>0&&!En;Bt("onPlayTurn",{canStep:n,spectating:En}),n&&Bt("onLocalMoveTurn",{})}function gT(s,e){for(const t of e){const n=t.tileState==="trap"?"revealed-trap":t.tileState==="reward"?"reward":"revealed-safe";Sd(t.id,n)}for(const t of s){const{playerId:n,action:i,tileId:r,tileState:o,totalVoltage:a,status:l,idleStrikes:c}=t,h=Vi.size>0?Vi.get(n)??0:typeof n=="number"?n:0;if(i==="step"&&r!=null){const u=Ln.get(n);u!==void 0&&u!==r&&b0(h,u,r),S0(h,r),Ln.set(n,r),Bt("onReveal",{tileId:r,type:o==="trap"?"trap":o==="reward"?"reward":"safe",playerId:h,voltage:a})}l==="busted"?(E0(h),n===pi&&(En=!0,Sn(),Xi()),Bt("onBust",{playerId:h})):l==="cashed_out"&&(n===pi&&(Sn(),Xi()),Bt("onCashout",{playerId:h,voltage:a})),i==="timeout"&&n===pi&&c!=null&&Bt("onIdleStrikes",{count:c}),n===pi&&r!=null&&Wo(Ei(r))}Sn()}function Pp(){Ys=!1,En=!1,Sn(),Xi(),Ed(),wd(),Ad(),Ln.clear(),Vi.clear()}function xT(s,e,t=1){Ys=!1,Sn(),Xi();const n={busted:"bust",cashed_out:"cashout",forfeited:"bust",active:"active"},i=(s??[]).map(r=>{const o=Vi.size>0?Vi.get(r.id)??0:typeof r.id=="number"?r.id:0;return{playerId:o,name:r.name??`P${o}`,voltage:r.finalVoltage??r.voltage??1,status:n[r.status]??r.status??"bust",payout:r.payout??0}});Bt("onRoundEnd",{results:i,leaderboard:e,matchNumber:t})}function _T(){const e=document.createElement("canvas");e.width=e.height=64;const t=e.getContext("2d"),n=64/2,i=t.createRadialGradient(n,n,0,n,n,n);return i.addColorStop(0,"rgba(255,255,255,1.0)"),i.addColorStop(.25,"rgba(255,255,255,0.8)"),i.addColorStop(.6,"rgba(255,255,255,0.1)"),i.addColorStop(1,"rgba(255,255,255,0.0)"),t.fillStyle=i,t.fillRect(0,0,64,64),new nd(e)}function yT(){const e=document.createElement("canvas");e.width=e.height=128;const t=e.getContext("2d"),n=128/2,i=t.createRadialGradient(n,n,0,n,n,n);return i.addColorStop(0,"rgba(255,255,255,0.6)"),i.addColorStop(.4,"rgba(255,255,255,0.15)"),i.addColorStop(1,"rgba(255,255,255,0.0)"),t.fillStyle=i,t.fillRect(0,0,128,128),new nd(e)}const vT=12e-6;let qi=null;function bT(s){qi=new ki,s.add(qi),ST(),ET(),wT()}function MT(){qi&&(qi.rotation.y+=vT)}function ST(){const s=_T();qi.add(Ip(3e3,.38,48,62,.8,s)),qi.add(Ip(350,.72,46,60,1,s))}function Ip(s,e,t,n,i,r){const o=new Float32Array(s*3),a=new Float32Array(s*3),l=[[1,1,1],[.75,.85,1],[.68,.8,1],[1,.97,.85],[1,.85,.65]];for(let u=0;u<s;u++){const d=Math.random()*Math.PI*2,f=Math.acos(2*Math.random()-1),m=t+Math.random()*(n-t);o[u*3]=m*Math.sin(f)*Math.cos(d),o[u*3+1]=m*Math.cos(f),o[u*3+2]=m*Math.sin(f)*Math.sin(d);const x=Math.random()<.04?4:Math.floor(Math.random()*4),g=l[x],p=.45+Math.random()*.55;a[u*3]=g[0]*p,a[u*3+1]=g[1]*p,a[u*3+2]=g[2]*p}const c=new He;c.setAttribute("position",new Qe(o,3)),c.setAttribute("color",new Qe(a,3));const h=new ia({size:e,map:r,vertexColors:!0,sizeAttenuation:!0,fog:!1,transparent:!0,opacity:i,depthWrite:!1,alphaTest:.01});return new jl(c,h)}function ET(){const e=new Float32Array(2100),t=new Float32Array(700*3),n=[[.04,.1,.4],[.18,.04,.38],[0,.2,.32],[.08,.04,.28],[.02,.18,.2]];for(let o=0;o<700;o++){const a=Math.random()*Math.PI*2,l=Math.acos(2*Math.random()-1),c=32+Math.random()*22;e[o*3]=c*Math.sin(l)*Math.cos(a),e[o*3+1]=c*Math.cos(l)*.22,e[o*3+2]=c*Math.sin(l)*Math.sin(a);const h=n[Math.floor(Math.random()*n.length)];t[o*3]=h[0],t[o*3+1]=h[1],t[o*3+2]=h[2]}const i=new He;i.setAttribute("position",new Qe(e,3)),i.setAttribute("color",new Qe(t,3));const r=new ia({size:5,map:yT(),vertexColors:!0,sizeAttenuation:!0,fog:!1,transparent:!0,opacity:.18,depthWrite:!1,blending:El,alphaTest:.001});qi.add(new jl(i,r))}function wT(){const s=[{pos:[-18,7,-28],radius:.8,color:1181738,emissive:2756188,opacity:.6},{pos:[23,-4,-22],radius:.45,color:396570,emissive:666186,opacity:.55},{pos:[-9,-11,26],radius:.32,color:1705992,emissive:3936015,opacity:.45},{pos:[28,5,9],radius:.6,color:200463,emissive:536624,opacity:.5}];for(const e of s){const t=new Ws(e.radius,14,14),n=new $n({color:e.emissive,fog:!1,transparent:!0,opacity:e.opacity,depthWrite:!1}),i=new ct(t,n);i.position.set(...e.pos),qi.add(i)}}let Lp=!1;function Ji(){if(Lp)return;Lp=!0;const s=document.createElement("style");s.id="circuit-sphere-hud",s.textContent=`
    /* ── Fonts & resets ─────────────────────────────────────────── */
    @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;600;700&display=swap');

    #hud * { box-sizing: border-box; }

    /* ── Shared panel ────────────────────────────────────────────── */
    .cs-panel {
      background: rgba(6, 14, 28, 0.82);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(0, 201, 167, 0.25);
      border-radius: 6px;
      color: #cbd5e1;
      font-family: 'Rajdhani', 'Segoe UI', sans-serif;
      position: relative;
      pointer-events: auto;
      flex-shrink: 0;
    }

    .cs-panel::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 6px;
      background: linear-gradient(135deg, rgba(0,201,167,0.04) 0%, transparent 60%);
      pointer-events: none;
    }

    /* ── Label / heading ─────────────────────────────────────────── */
    .cs-label {
      font-family: 'Share Tech Mono', monospace;
      font-size: 9px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #475569;
      margin-bottom: 4px;
    }

    .cs-value {
      font-family: 'Share Tech Mono', monospace;
      color: #e2e8f0;
    }

    /* ── Zone colour tokens ──────────────────────────────────────── */
    .zone-safe     { color: #00c9a7; }
    .zone-charged  { color: #f59e0b; }
    .zone-critical { color: #ef4444; }

    /* ── Glow utility ────────────────────────────────────────────── */
    .glow-teal   { text-shadow: 0 0 8px #00c9a7, 0 0 20px #00c9a7aa; }
    .glow-amber  { text-shadow: 0 0 8px #f59e0b, 0 0 20px #f59e0baa; }
    .glow-red    { text-shadow: 0 0 8px #ef4444, 0 0 20px #ef4444aa; }
    .glow-blue   { text-shadow: 0 0 8px #38bdf8, 0 0 20px #38bdf8aa; }

    /* ── Divider ─────────────────────────────────────────────────── */
    .cs-divider {
      border: none;
      border-top: 1px solid rgba(0,201,167,0.12);
      margin: 6px 0;
    }

    /* ── Player slot colours ─────────────────────────────────────── */
    .slot-0 { color: #38bdf8; }
    .slot-1 { color: #f472b6; }
    .slot-2 { color: #a78bfa; }
    .slot-3 { color: #fb923c; }

    /* ── Corner bracket accent ───────────────────────────────────── */
    .cs-corner {
      position: relative;
    }
    .cs-corner::after {
      content: '';
      position: absolute;
      right: 0; bottom: 0;
      width: 10px; height: 10px;
      border-right: 1px solid rgba(0,201,167,0.5);
      border-bottom: 1px solid rgba(0,201,167,0.5);
      border-radius: 0 0 6px 0;
    }

    /* ── Scan-line overlay ───────────────────────────────────────── */
    .cs-panel::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 6px;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0,0,0,0.06) 2px,
        rgba(0,0,0,0.06) 4px
      );
      pointer-events: none;
    }
  `,document.head.appendChild(s)}const TT=[1,1.2,1.4,1.6,1.8,2,2.2,2.5,2.8,3],ys=new Map;let vl=null,bu=null,Mu=0;function AT(s){Ji();const e=document.createElement("div");e.className="cs-panel cs-corner",e.id="cs-voltage",e.innerHTML=`
    <style>
      #cs-voltage {
        width: 100%;
        padding: 12px 10px;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      #cs-voltage .v-title {
        font-family: 'Share Tech Mono', monospace;
        font-size: 8px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #00c9a7;
        text-align: center;
        margin-bottom: 2px;
      }

      #cs-volt-scale {
        display: flex;
        flex-direction: column-reverse;
        gap: 3px;
      }

      .v-zone-marker {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 3px 6px 2px;
        margin: 2px 0 1px;
        border-top: 1px solid rgba(255,255,255,0.06);
      }

      .v-zone-marker .v-zm-dot {
        width: 5px; height: 5px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .v-zone-marker .v-zm-label {
        font-family: 'Share Tech Mono', monospace;
        font-size: 8px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        flex: 1;
      }

      .v-zone-marker .v-zm-range {
        font-family: 'Share Tech Mono', monospace;
        font-size: 8px;
        color: #475569;
        letter-spacing: 0.04em;
      }

      .v-step {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 3px 6px;
        border-radius: 3px;
        transition: all 0.25s ease;
        border: 1px solid transparent;
      }

      .v-step .v-label {
        font-family: 'Share Tech Mono', monospace;
        font-size: 11px;
        color: #334155;
        flex: 1;
        text-align: right;
        transition: color 0.25s;
      }

      .v-step .v-bar {
        width: 4px;
        height: 12px;
        border-radius: 2px;
        background: #1e293b;
        transition: background 0.25s, box-shadow 0.25s;
      }

      .v-step.active {
        border-color: rgba(0, 201, 167, 0.4);
        background: rgba(0, 201, 167, 0.08);
      }
      .v-step.active .v-label { color: #e2e8f0; font-size: 13px; font-weight: bold; }
      .v-step.active .v-bar   { background: #00c9a7; box-shadow: 0 0 6px #00c9a7; }

      .v-step.below-safe .v-bar     { background: #00c9a7aa; }
      .v-step.below-charged .v-bar  { background: #f59e0baa; }
      .v-step.below-critical .v-bar { background: #ef4444aa; }

      #cs-volt-cards { display: flex; flex-direction: column; gap: 4px; }

      .v-card {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 4px 6px;
        border-radius: 4px;
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.06);
        transition: opacity 0.3s;
      }
      .v-card.bust    { opacity: 0.35; }
      .v-card.cashout { opacity: 0.6; }

      .v-card .v-dot {
        width: 7px; height: 7px;
        border-radius: 50%;
        flex-shrink: 0;
      }
      .v-card .v-name {
        font-size: 9px;
        color: #64748b;
        font-family: 'Share Tech Mono', monospace;
        flex: 1;
      }
      .v-card .v-val {
        font-family: 'Share Tech Mono', monospace;
        font-size: 11px;
        color: #e2e8f0;
      }
      .v-card .v-badge {
        font-size: 8px;
        padding: 1px 3px;
        border-radius: 2px;
        background: #1e293b;
        color: #64748b;
      }
      .v-card.bust .v-badge    { background: #7f1d1d33; color: #ef4444; }
      .v-card.cashout .v-badge { background: #0c4a6e33; color: #38bdf8; }
    </style>

    <div class="v-title">Voltage<br>Scale</div>
    <div id="cs-volt-scale"></div>
    <hr class="cs-divider">
    <div id="cs-volt-cards"></div>
  `,s.appendChild(e),vl=e.querySelector("#cs-volt-scale"),bu=e.querySelector("#cs-volt-cards"),ll(1),qe("onRoundStart",({playerCount:t,localPlayerId:n})=>{Mu=n,ys.clear();for(let i=0;i<t;i++)ys.set(i,{voltage:1,status:"active"});ro(),ll(1)}),qe("onReveal",({playerId:t,voltage:n})=>{const i=ys.get(t);i&&(i.voltage=n),ro(),t===Mu&&ll(n)}),qe("onBust",({playerId:t})=>{const n=ys.get(t);n&&(n.status="bust"),ro()}),qe("onCashout",({playerId:t})=>{const n=ys.get(t);n&&(n.status="cashout"),ro()}),qe("onRoundEnd",()=>{ys.clear(),ro(),ll(1)})}const RT={safe:{color:"#00c9a7",label:"Safe",range:"1.0–1.5×"},charged:{color:"#f59e0b",label:"Charged",range:"1.5–2.5×"},critical:{color:"#ef4444",label:"Critical",range:"2.5–3.0×"}};function ll(s){vl.innerHTML="";let e=null;TT.forEach(t=>{const n=t<1.5?"safe":t<2.5?"charged":"critical";if(n!==e){const o=RT[n],a=document.createElement("div");a.className="v-zone-marker",a.innerHTML=`
        <div class="v-zm-dot" style="background:${o.color};box-shadow:0 0 4px ${o.color}"></div>
        <span class="v-zm-label" style="color:${o.color}">${o.label}</span>
        <span class="v-zm-range">${o.range}</span>
      `,vl.appendChild(a),e=n}const i=document.createElement("div");i.className="v-step",Math.abs(t-s)<.15?i.classList.add("active"):t<s&&i.classList.add(`below-${n}`),i.innerHTML=`
      <div class="v-bar"></div>
      <span class="v-label">${t.toFixed(1)}×</span>
    `,vl.appendChild(i)})}const CT=["#38bdf8","#f472b6","#a78bfa","#fb923c"];function ro(){bu.innerHTML="",ys.forEach(({voltage:s,status:e},t)=>{const n=document.createElement("div");n.className=`v-card ${e!=="active"?e:""}`;const i=e==="bust"?"BUST":e==="cashout"?"OUT":"",r=t===Mu?" (YOU)":"";n.innerHTML=`
      <div class="v-dot" style="background:${CT[t]??"#fff"}"></div>
      <span class="v-name">P${t}${r}</span>
      ${i?`<span class="v-badge">${i}</span>`:`<span class="v-val">${s.toFixed(1)}×</span>`}
    `,bu.appendChild(n)})}const Je=Object.freeze({JOIN:"join",PLAYERS:"players",READY:"ready",BET_PHASE:"bet-phase",BET_SUBMIT:"bet-submit",BET_CONFIRMED:"bet-confirmed",GAME_START:"game-start",TURN_BEGIN:"turn-begin",MOVE:"move",MOVE_ACK:"move-ack",TURN_REVEAL:"turn-reveal",TURN_TIMEOUT:"turn-timeout",ROUND_END:"round-end",REMATCH:"rematch",NEW_ROUND:"new-round",NEW_GAME:"new-game",HEARTBEAT:"heartbeat",REJOIN:"rejoin",REJOIN_ACK:"rejoin-ack",STATE_SYNC:"state-sync",PLAYER_DISCONNECTED:"player-disconnected",PLAYER_RECONNECTED:"player-reconnected"}),nn=Object.freeze({STEP:"step",CASHOUT:"cashout",TIMEOUT:"timeout"}),qn=Object.freeze({ACTIVE:"active",BUSTED:"busted",CASHED_OUT:"cashed_out",FORFEITED:"forfeited"}),gn=Object.freeze({SAFE:"safe",CHARGED:"charged",CRITICAL:"critical"}),bn=Object.freeze({SAFE:"safe",TRAP:"trap",REWARD:"reward"}),bt=Object.freeze({LOBBY:"lobby",BETTING:"betting",PLAYING:"playing",RESOLUTION:"resolution",ENDED:"ended"}),Gt={join(s,e){return{type:Je.JOIN,name:s,playerId:e}},players(s){return{type:Je.PLAYERS,list:s}},ready(){return{type:Je.READY}},betPhase(s,e,t){return{type:Je.BET_PHASE,playerList:s,timerDeadline:e,hostTimestamp:t}},betSubmit(s){return{type:Je.BET_SUBMIT,amount:s}},betConfirmed(s){return{type:Je.BET_CONFIRMED,bets:s}},gameStart({seed:s,board:e,playerOrder:t,bets:n,config:i}){return{type:Je.GAME_START,seed:s,board:e,playerOrder:t,bets:n,config:i}},turnBegin({turnNumber:s,timerDeadline:e,hostTimestamp:t,activePlayers:n,resolvedPlayers:i}){return{type:Je.TURN_BEGIN,turnNumber:s,timerDeadline:e,hostTimestamp:t,activePlayers:n,resolvedPlayers:i}},move(s,e){return{type:Je.MOVE,tileId:s,action:e}},moveAck(s,e=null){return{type:Je.MOVE_ACK,ok:s,reason:e}},turnReveal({turnNumber:s,results:e,newlyRevealedTiles:t,boardState:n}){return{type:Je.TURN_REVEAL,turnNumber:s,results:e,newlyRevealedTiles:t,boardState:n}},turnTimeout(s){return{type:Je.TURN_TIMEOUT,forfeitedPlayers:s}},roundEnd({roundNumber:s,totalTurns:e,results:t,leaderboard:n}){return{type:Je.ROUND_END,roundNumber:s,totalTurns:e,results:t,leaderboard:n}},rematch(){return{type:Je.REMATCH}},newRound({seed:s,board:e,playerOrder:t,config:n}){return{type:Je.NEW_ROUND,seed:s,board:e,playerOrder:t,config:n}},newGame(){return{type:Je.NEW_GAME}},heartbeat(){return{type:Je.HEARTBEAT,timestamp:Date.now()}},rejoin(s,e){return{type:Je.REJOIN,playerId:s,roomCode:e}},rejoinAck(s,e=null){return{type:Je.REJOIN_ACK,ok:s,state:e}},stateSync(s){return{type:Je.STATE_SYNC,...s}},playerDisconnected(s,e){return{type:Je.PLAYER_DISCONNECTED,playerId:s,graceDeadline:e}},playerReconnected(s){return{type:Je.PLAYER_RECONNECTED,playerId:s}}};function C0(s){return JSON.stringify(s)}function P0(s){try{return JSON.parse(s)}catch{return console.warn("[Protocol] Failed to parse message:",s),null}}let pn=null,ji=!1,yi="",Xo="",mi="";const qo={};let ui=null,bl=null;const PT=5e3;let gc=0;const uo=[],IT=5,ht={onMessage:null,onPlayerJoin:null,onPlayerLeave:null,onConnected:null,onError:null,onDisconnected:null};function Pd(){return{peer:pn,isHost:ji,myId:yi,myName:Xo,roomCode:mi,clockOffset:gc}}function I0(s){Xo=s}function xh(s,e){s in ht&&(ht[s]=e)}function LT(){const s="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let e="";for(let t=0;t<5;t++)e+=s[Math.floor(Math.random()*s.length)];return e}function DT(s="Player 1"){return new Promise((e,t)=>{mi=LT(),ji=!0,Xo=s;const n="circuit-"+mi;pn=new Peer(n),pn.on("open",i=>{yi=i,console.log(`[Net] Host created room ${mi}, peer ID: ${yi}`),N0(),ht.onConnected&&ht.onConnected(),e(mi)}),pn.on("connection",OT),pn.on("error",i=>{console.error("[Net] Peer error:",i.type,i),ht.onError&&ht.onError(i),t(i)}),pn.on("disconnected",()=>{console.warn("[Net] Peer disconnected from signaling server"),ht.onDisconnected&&ht.onDisconnected()})})}function NT(s,e="Player"){return new Promise((t,n)=>{mi=s.trim().toUpperCase(),ji=!1,Xo=e,pn=new Peer,pn.on("open",i=>{yi=i,console.log(`[Net] Client peer created: ${yi}, joining room ${mi}`),ui=pn.connect("circuit-"+mi,{reliable:!0}),ui.on("open",()=>{console.log("[Net] Connected to host"),Yo(Gt.join(Xo,yi)),N0(),ht.onConnected&&ht.onConnected(),t()}),ui.on("data",r=>{const o=P0(r);o&&D0(o,"host")}),ui.on("close",()=>{console.warn("[Net] Lost connection to host"),ht.onDisconnected&&ht.onDisconnected()}),ui.on("error",r=>{console.error("[Net] Host connection error:",r),ht.onError&&ht.onError(r),n(r)})}),pn.on("error",i=>{console.error("[Net] Peer error:",i.type,i),ht.onError&&ht.onError(i),n(i)})})}function Yi(s){if(!ji){console.warn("[Net] Only host can broadcast");return}const e=C0(s);for(const t of Object.values(qo))if(t.open)try{t.send(e)}catch(n){console.warn("[Net] Send failed to",t.peer,n)}ht.onMessage&&ht.onMessage(s,yi)}function Yo(s){if(ji){ht.onMessage&&ht.onMessage(s,yi);return}if(ui&&ui.open)try{ui.send(C0(s))}catch(e){console.warn("[Net] Send to host failed:",e)}}function L0(){return gc}function UT(){U0(),pn&&(pn.destroy(),pn=null),ji=!1,yi="",mi="",Object.keys(qo).forEach(s=>delete qo[s]),ui=null,gc=0,uo.length=0}function OT(s){s.on("open",()=>{qo[s.peer]=s,console.log(`[Net] Client connected: ${s.peer}`),s.on("data",e=>{const t=P0(e);t&&D0(t,s.peer)}),s.on("close",()=>{console.log(`[Net] Client disconnected: ${s.peer}`),delete qo[s.peer],ht.onPlayerLeave&&ht.onPlayerLeave(s.peer)}),s.on("error",e=>{console.warn(`[Net] Connection error from ${s.peer}:`,e)})})}function D0(s,e){if(s.type===Je.HEARTBEAT){if(!ji&&s.timestamp){const t=Date.now(),n=s.timestamp-t;uo.push(n),uo.length>IT&&uo.shift();const i=[...uo].sort((r,o)=>r-o);gc=i[Math.floor(i.length/2)]}return}ht.onMessage&&ht.onMessage(s,e)}function N0(){U0(),bl=setInterval(()=>{ji&&Yi(Gt.heartbeat())},PT)}function U0(){bl&&(clearInterval(bl),bl=null)}const Ll=30,FT=5;let Id=Ll,Pr=!1,Ld=0,Dd=Ll,vo=null,Fr=!1,O0=0,Ml=null,Su=null,Eu=null,ai=null,wu=null,Ss=null;const Tu=28,F0=2*Math.PI*Tu;function BT(s,{onLock:e}={}){Ji(),Ml=e??null;const t=document.createElement("div");t.id="cs-timer",t.className="cs-panel",t.innerHTML=`
    <style>
      #cs-timer {
        padding: 10px 14px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        min-width: 120px;
      }

      #cs-phase-badge {
        font-family: 'Rajdhani', sans-serif;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #475569;
        text-align: center;
        padding: 2px 10px;
        border-radius: 3px;
        border: 1px solid rgba(71,85,105,0.3);
        background: rgba(71,85,105,0.08);
        transition: color 0.35s, border-color 0.35s, background 0.35s;
      }

      #cs-phase-badge.live {
        color: #00c9a7;
        border-color: rgba(0,201,167,0.4);
        background: rgba(0,201,167,0.08);
      }

      #cs-phase-badge.betting {
        color: #38bdf8;
        border-color: rgba(56,189,248,0.45);
        background: rgba(56,189,248,0.08);
      }

      #cs-phase-badge.betting #cs-phase-dot {
        background: #38bdf8;
        box-shadow: 0 0 6px #38bdf8;
        opacity: 1;
      }

      #cs-phase-badge.ended {
        color: #f59e0b;
        border-color: rgba(245,158,11,0.4);
        background: rgba(245,158,11,0.08);
      }

      #cs-phase-dot {
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #00c9a7;
        box-shadow: 0 0 6px #00c9a7;
        margin-right: 5px;
        vertical-align: middle;
        animation: cs-phase-pulse 1s ease infinite;
        opacity: 0;
        transition: opacity 0.3s;
      }

      #cs-phase-badge.live #cs-phase-dot { opacity: 1; }

      @keyframes cs-phase-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50%       { opacity: 0.4; transform: scale(0.7); }
      }

      #cs-timer .t-label {
        font-family: 'Share Tech Mono', monospace;
        font-size: 8px;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: #475569;
      }

      #cs-timer svg { display: block; overflow: visible; }

      #cs-timer-track {
        fill: none;
        stroke: #1e293b;
        stroke-width: 4;
      }

      #cs-timer-ring {
        fill: none;
        stroke: #00c9a7;
        stroke-width: 4;
        stroke-linecap: round;
        stroke-dasharray: ${F0};
        stroke-dashoffset: 0;
        transform: rotate(-90deg);
        transform-origin: 36px 36px;
        transition: stroke-dashoffset 0.4s linear, stroke 0.3s;
        filter: drop-shadow(0 0 4px #00c9a7);
      }

      #cs-timer-ring.urgent {
        stroke: #ef4444;
        filter: drop-shadow(0 0 6px #ef4444);
        animation: timer-pulse 0.5s ease-in-out infinite alternate;
      }

      @keyframes timer-pulse {
        from { filter: drop-shadow(0 0 4px #ef4444); }
        to   { filter: drop-shadow(0 0 12px #ef4444); }
      }

      #cs-timer-text {
        font-family: 'Share Tech Mono', monospace;
        font-size: 14px;
        fill: #e2e8f0;
        text-anchor: middle;
        dominant-baseline: middle;
      }

      #cs-timer-text.urgent { fill: #ef4444; }

      #cs-turn-label {
        font-family: 'Rajdhani', sans-serif;
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #38bdf8;
        text-align: center;
      }
    </style>

    <div id="cs-phase-badge"><span id="cs-phase-dot"></span>LOBBY</div>
    <div class="t-label" id="cs-timer-kind">Turn Timer</div>
    <svg width="72" height="72" viewBox="0 0 72 72">
      <circle id="cs-timer-track" cx="36" cy="36" r="${Tu}" />
      <circle id="cs-timer-ring"  cx="36" cy="36" r="${Tu}" />
      <text   id="cs-timer-text"  x="36"  y="36">${Ll}</text>
    </svg>
    <div id="cs-turn-label">Waiting…</div>
  `,s.appendChild(t),Su=t.querySelector("#cs-timer-ring"),Eu=t.querySelector("#cs-timer-text"),ai=t.querySelector("#cs-turn-label"),wu=t.querySelector("#cs-timer-kind"),Ss=t.querySelector("#cs-phase-badge"),qe("onRoundStart",({timerDuration:n})=>{Ir(),Ss.className="live",Ss.innerHTML='<span id="cs-phase-dot"></span>LIVE',wu.textContent="Turn Timer";let i=n??Ll;i>100&&(i=Math.round(i/1e3)),ai.textContent="Waiting…",kT(i)}),qe("onPlayTurn",({canStep:n,spectating:i})=>{i?ai.textContent="Spectating":n?ai.textContent="Your Turn":ai.textContent="Stand by"}),qe("onTimerSync",({remaining:n})=>{HT(n)}),qe("onRoundEnd",()=>{Ir(),Pr=!1,Nl(0),ai.textContent="Round Over",Ss.className="ended",Ss.innerHTML='<span id="cs-phase-dot"></span>ROUND OVER'})}function zT(s){Ir();const e=L0(),t=Date.now()+e;Id=Math.max(.5,(s-t)/1e3),O0=s,Fr=!0,Pr=!0,Ss.className="betting",Ss.innerHTML='<span id="cs-phase-dot"></span>BETTING',wu.textContent="Wager window",ai.textContent="Place your bet",Dl()}function Ir(){Fr&&(Fr=!1,vo!=null&&(cancelAnimationFrame(vo),vo=null))}function kT(s){Fr=!1,Id=s,Ld=performance.now(),Dd=s,Pr=!0,Dl()}function HT(s){s>100&&(s=s/1e3),Ld=performance.now(),Dd=s,Nl(s)}function Dl(){if(!Pr)return;if(Fr){const n=L0(),i=Date.now()+n,r=Math.max(0,(O0-i)/1e3);if(Nl(r),r<=0){Pr=!1,Fr=!1,ai.textContent="Starting…";return}vo=requestAnimationFrame(Dl);return}const e=(performance.now()-Ld)/1e3,t=Math.max(0,Dd-e);if(Nl(t),t<=0){Pr=!1,Ml==null||Ml(),mc(Or.LOCK_IN),ai.textContent="Locked In";return}vo=requestAnimationFrame(Dl)}function Nl(s){const e=Math.max(0,Math.min(1,s/Id)),t=F0*(1-e);Su.style.strokeDashoffset=t;const n=Math.ceil(s);Eu.textContent=n;const i=s<=FT;Su.classList.toggle("urgent",i),Eu.classList.toggle("urgent",i)}let B0=!1,Ul=1,bo=!1,Ol=null,Au=null,Fl=null,Ru=null;function VT(s,{getBet:e}={}){Ji();const t=document.createElement("div");t.id="cs-cashout",t.className="cs-panel cs-corner",t.innerHTML=`
    <style>
      #cs-cashout {
        padding: 14px 16px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-width: 0;
      }

      #cs-cashout .co-title {
        font-family: 'Rajdhani', sans-serif;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #00c9a7;
      }

      #cs-win-panel {
        background: rgba(251, 191, 36, 0.08);
        border: 1px solid rgba(251, 191, 36, 0.25);
        border-radius: 6px;
        padding: 10px 14px;
        text-align: center;
      }

      #cs-win-amount {
        font-family: 'Rajdhani', sans-serif;
        font-size: 22px;
        font-weight: 700;
        color: #fbbf24;
        text-shadow: 0 0 12px #fbbf2455;
        letter-spacing: 0.04em;
        line-height: 1.1;
      }

      #cs-win-mult {
        font-family: 'Rajdhani', sans-serif;
        font-size: 16px;
        font-weight: 600;
        color: #d4a010;
        margin-top: 2px;
        letter-spacing: 0.06em;
      }

      #cs-btn-cashout {
        width: 100%;
        padding: 10px 0;
        border: none;
        border-radius: 7px;
        font-family: 'Rajdhani', sans-serif;
        font-size: 17px;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.2s;
        background: linear-gradient(135deg, #0d9488, #0891b2);
        color: #fff;
        box-shadow: 0 0 16px rgba(13,148,136,0.45);
      }

      #cs-btn-cashout:hover:not(:disabled) {
        box-shadow: 0 0 28px rgba(13,148,136,0.75);
        transform: translateY(-1px);
      }

      #cs-btn-cashout:disabled {
        background: #1e293b;
        color: #64748b;
        cursor: not-allowed;
        box-shadow: none;
        transform: none;
      }

      #cs-current-win {
        font-family: 'Rajdhani', sans-serif;
        font-size: 14px;
        font-weight: 600;
        color: #94a3b8;
        text-align: center;
        letter-spacing: 0.04em;
      }
    </style>

    <div class="co-title">Cash Out</div>

    <div id="cs-win-panel">
      <div id="cs-win-amount">—</div>
      <div id="cs-win-mult">Multiplier: ×1.0</div>
    </div>

    <button id="cs-btn-cashout" disabled>Cash Out</button>

    <div id="cs-current-win">Place a bet to see your win</div>
  `,s.appendChild(t),Ol=t.querySelector("#cs-win-amount"),Au=t.querySelector("#cs-win-mult"),Fl=t.querySelector("#cs-current-win"),Ru=t.querySelector("#cs-btn-cashout"),Ru.addEventListener("click",()=>{!B0||bo||(bo=!0,br(!1),mc(Or.CASHOUT))}),qe("onRoundStart",()=>{Ul=1,bo=!1,Dp(),br(!0)}),qe("onReveal",({playerId:n,voltage:i})=>{n===Dn()&&(Ul=i,Dp(e==null?void 0:e()))}),qe("onBust",({playerId:n})=>{n===Dn()&&br(!1)}),qe("onCashout",({playerId:n})=>{n===Dn()&&br(!1)}),qe("onRoundEnd",()=>{br(!1),Ol.textContent="—",Au.textContent="Multiplier: ×1.0",Fl.textContent="Place a bet to see your win"})}function br(s){B0=s,Ru.disabled=!s||bo}function GT(){bo=!0,br(!1)}function Dp(s=0){const e=Ul.toFixed(1);if(Au.textContent=`Multiplier: ×${e}`,s>0){const t=Math.round(s*Ul);Ol.textContent=`${t.toLocaleString()} CR`,Fl.textContent=`Win if cashed out now: ${t.toLocaleString()} CR`}else Ol.textContent=`×${e}`,Fl.textContent="Place a bet to see your win"}const Np=["#38bdf8","#f472b6","#a78bfa","#fb923c"];let ri=new Map,Us=null,Cu=null,Up=0,Hs=null,xc=null;function WT(s){Ji();const e=document.createElement("div");e.id="cs-leaderboard",e.className="cs-panel",e.innerHTML=`
    <style>
      #cs-leaderboard {
        width: 100%;
        padding: 10px 12px;
      }

      #cs-leaderboard .lb-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }

      #cs-leaderboard .lb-title {
        font-family: 'Share Tech Mono', monospace;
        font-size: 8px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #00c9a7;
      }

      #cs-round-num {
        font-family: 'Share Tech Mono', monospace;
        font-size: 8px;
        color: #334155;
        letter-spacing: 0.06em;
      }

      #cs-lb-list { display: flex; flex-direction: column; gap: 5px; }

      .lb-row {
        display: flex;
        align-items: center;
        gap: 7px;
        padding: 5px 8px;
        border-radius: 4px;
        background: rgba(255,255,255,0.025);
        border: 1px solid rgba(255,255,255,0.05);
        transition: all 0.3s;
        position: relative;
        overflow: hidden;
      }

      /* Gold shimmer for leader */
      .lb-row.leader::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, rgba(251,191,36,0.06), transparent);
        pointer-events: none;
      }
      .lb-row.leader { border-color: rgba(251,191,36,0.25); }

      .lb-row.you {
        border-color: rgba(0,201,167,0.2);
        background: rgba(0,201,167,0.04);
      }

      .lb-row.bust    { opacity: 0.35; }
      .lb-row.cashout { opacity: 0.55; }

      .lb-rank {
        font-family: 'Share Tech Mono', monospace;
        font-size: 9px;
        color: #334155;
        width: 12px;
        text-align: center;
      }
      .lb-row.leader .lb-rank { color: #fbbf24; }

      .lb-dot {
        width: 8px; height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .lb-name {
        font-family: 'Rajdhani', sans-serif;
        font-size: 12px;
        font-weight: 600;
        flex: 1;
        color: #94a3b8;
        white-space: nowrap;
        overflow: hidden;
      }
      .lb-row.you .lb-name { color: #e2e8f0; }

      .lb-voltage {
        font-family: 'Share Tech Mono', monospace;
        font-size: 12px;
        color: #e2e8f0;
      }
      .lb-row.leader .lb-voltage { color: #fbbf24; text-shadow: 0 0 6px #fbbf2488; }

      .lb-badge {
        font-family: 'Share Tech Mono', monospace;
        font-size: 8px;
        padding: 1px 4px;
        border-radius: 2px;
      }
      .lb-badge.bust-badge    { background: #7f1d1d33; color: #ef4444; }
      .lb-badge.cashout-badge { background: #0c4a6e33; color: #38bdf8; }
      .lb-badge.you-badge     { background: rgba(0,201,167,0.1); color: #00c9a7; font-size: 7px; }
      .lb-badge.bet-wait      { background: rgba(71,85,105,0.2); color: #64748b; font-size: 7px; }
      .lb-badge.bet-ok        { background: rgba(0,201,167,0.12); color: #00c9a7; font-size: 7px; }

      #cs-lb-empty {
        font-family: 'Share Tech Mono', monospace;
        font-size: 9px;
        color: #334155;
        text-align: center;
        padding: 8px 0;
        letter-spacing: 0.08em;
      }
    </style>

    <div class="lb-header">
      <span class="lb-title">Players</span>
      <span id="cs-round-num">ROUND —</span>
    </div>
    <div id="cs-lb-list">
      <div id="cs-lb-empty">Waiting for round…</div>
    </div>
  `,s.appendChild(e),Us=e.querySelector("#cs-lb-list"),Cu=e.querySelector("#cs-round-num"),qe("onRoundStart",({playerCount:t,players:n})=>{if(Hs=null,xc=null,Up++,Cu.textContent=`ROUND ${Up}`,ri.clear(),n!=null&&n.length)n.forEach(({playerId:i,name:r})=>{ri.set(i,{voltage:1,status:"active",name:r})});else for(let i=0;i<t;i++)ri.set(i,{voltage:1,status:"active",name:`P${i}`});oo()}),qe("onReveal",({playerId:t,voltage:n})=>{const i=ri.get(t);i&&(i.voltage=n),oo()}),qe("onBust",({playerId:t})=>{const n=ri.get(t);n&&(n.status="bust"),oo()}),qe("onCashout",({playerId:t,voltage:n})=>{const i=ri.get(t);i&&(i.status="cashout",n&&(i.voltage=n)),oo()}),qe("onRoundEnd",({results:t})=>{t==null||t.forEach(({playerId:n,voltage:i,status:r,name:o})=>{const a=ri.get(n);a&&(a.voltage=i,a.status=r,o&&(a.name=o))}),oo()})}function XT(s,e){Hs=s??[],xc=e,Cu.textContent="WAGERS",z0()}function qT(s){!Hs&&!s||(Hs=s??[],z0())}function _h(){Hs=null,xc=null}function z0(){!Us||!Hs||(Us.innerHTML="",Hs.forEach((s,e)=>{const t=s.id===xc,n=document.createElement("div");n.className=`lb-row ${t?"you":""}`;const i=s.hasBet?'<span class="lb-badge bet-ok">IN</span>':'<span class="lb-badge bet-wait">…</span>';n.innerHTML=`
      <span class="lb-rank">${e+1}</span>
      <div class="lb-dot" style="background:${s.color??"#94a3b8"};box-shadow:0 0 5px ${s.color??"#fff"}44"></div>
      <span class="lb-name">${s.name??"Player"}${t?' <span class="lb-badge you-badge">YOU</span>':""}</span>
      ${i}
    `,Us.appendChild(n)}))}function oo(){if(Us.innerHTML="",ri.size===0){Us.innerHTML='<div id="cs-lb-empty">Waiting for round…</div>';return}const s=Dn();[...ri.entries()].sort(([,t],[,n])=>{const i=r=>r==="active"?0:r==="cashout"?1:2;return i(t.status)!==i(n.status)?i(t.status)-i(n.status):n.voltage-t.voltage}).forEach(([t,{voltage:n,status:i,name:r}],o)=>{const a=o===0&&i==="active",l=t===s,c=document.createElement("div");c.className=`lb-row ${a?"leader":""} ${l?"you":""} ${i!=="active"?i:""}`;const h=l?'<span class="lb-badge you-badge">YOU</span>':"",u=i==="bust"?'<span class="lb-badge bust-badge">BUST</span>':i==="cashout"?'<span class="lb-badge cashout-badge">OUT</span>':"";c.innerHTML=`
      <span class="lb-rank">${o+1}</span>
      <div class="lb-dot" style="background:${Np[t]??"#fff"}; box-shadow: 0 0 5px ${Np[t]??"#fff"}44"></div>
      <span class="lb-name">${r??`P${t}`} ${h}</span>
      ${u||`<span class="lb-voltage">${n.toFixed(1)}×</span>`}
    `,Us.appendChild(c)})}let li=0,Es=null,Ps=null,_c=null,Ft=null,yh=null,ps=null,Pu=null,Mr=null;function YT(s,e={}){yh=typeof e.submitBet=="function"?e.submitBet:null,ps=typeof e.isBettingPhase=="function"?e.isBettingPhase:null,Pu=typeof e.getBankroll=="function"?e.getBankroll:null,Ji();const t=document.createElement("div");t.id="cs-bet",t.className="cs-panel",t.innerHTML=`
    <style>
      #cs-bet {
        padding: 14px 16px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        transition: opacity 0.3s;
        min-width: 0;
      }

      #cs-bet.locked { opacity: 0.45; pointer-events: none; }

      #cs-bet .bet-head {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 10px;
        flex-wrap: wrap;
      }

      #cs-bet .bet-title {
        font-family: 'Rajdhani', sans-serif;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #00c9a7;
      }

      #cs-bet .bet-balance {
        font-family: 'Share Tech Mono', monospace;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.06em;
        color: #cbd5e1;
        white-space: nowrap;
      }

      #cs-bet .bet-row {
        display: flex;
        gap: 8px;
        align-items: center;
      }

      #cs-bet-input {
        flex: 1;
        min-width: 0;
        background: rgba(30, 41, 59, 0.8);
        border: 1px solid rgba(0,201,167,0.3);
        border-radius: 6px;
        color: #e2e8f0;
        font-family: 'Rajdhani', sans-serif;
        font-size: 15px;
        font-weight: 600;
        padding: 7px 10px;
        outline: none;
        transition: border-color 0.2s, box-shadow 0.2s;
      }
      #cs-bet-input:focus {
        border-color: rgba(0,201,167,0.65);
        box-shadow: 0 0 10px rgba(0,201,167,0.2);
      }
      #cs-bet-input::placeholder {
        color: #64748b;
        font-weight: 600;
      }

      .bet-quick {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
      }

      .bet-chip {
        font-family: 'Rajdhani', sans-serif;
        font-size: 11px;
        font-weight: 600;
        padding: 3px 8px;
        border-radius: 4px;
        border: 1px solid rgba(0,201,167,0.25);
        background: rgba(0,201,167,0.06);
        color: #64748b;
        cursor: pointer;
        transition: all 0.15s;
        white-space: nowrap;
      }
      .bet-chip:hover {
        background: rgba(0,201,167,0.15);
        color: #00c9a7;
        border-color: rgba(0,201,167,0.5);
      }

      #cs-btn-bet {
        width: 100%;
        padding: 10px 0;
        border: none;
        border-radius: 7px;
        font-family: 'Rajdhani', sans-serif;
        font-size: 15px;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        cursor: pointer;
        background: linear-gradient(135deg, #0f766e, #0369a1);
        color: #fff;
        box-shadow: 0 0 14px rgba(15,118,110,0.4);
        transition: all 0.2s;
      }
      #cs-btn-bet:hover:not(:disabled) {
        box-shadow: 0 0 22px rgba(15,118,110,0.65);
        transform: translateY(-1px);
      }
      #cs-btn-bet:disabled {
        background: #1e293b;
        color: #475569;
        cursor: not-allowed;
        box-shadow: none;
      }

      #cs-bet-info {
        font-family: 'Rajdhani', sans-serif;
        font-size: 14px;
        font-weight: 600;
        color: #94a3b8;
        text-align: center;
        letter-spacing: 0.04em;
        min-height: 16px;
      }
    </style>

    <div class="bet-head">
      <span class="bet-title">Place Your Bet</span>
      <span class="bet-balance" id="cs-bet-balance" hidden>Balance: —</span>
    </div>

    <div class="bet-row">
      <input
        id="cs-bet-input"
        type="number"
        min="10"
        step="10"
        placeholder="Enter CR amount"
      />
    </div>

    <div class="bet-quick">
      <button class="bet-chip" data-amount="100">100</button>
      <button class="bet-chip" data-amount="250">250</button>
      <button class="bet-chip" data-amount="500">500</button>
      <button class="bet-chip" data-amount="1000">1K</button>
      <button class="bet-chip" data-amount="2500">2.5K</button>
    </div>

    <button id="cs-btn-bet">Place Bet</button>
    <div id="cs-bet-info">Round starts after all players bet</div>
  `,s.appendChild(t),_c=t,Es=t.querySelector("#cs-bet-input"),Ps=t.querySelector("#cs-btn-bet"),Ft=t.querySelector("#cs-bet-info"),Mr=t.querySelector("#cs-bet-balance"),Hi(),t.querySelectorAll(".bet-chip").forEach(n=>{n.addEventListener("click",()=>{Es.value=n.dataset.amount})}),Ps.addEventListener("click",()=>{const n=parseInt(Es.value,10);if(!n||n<10){Ft.textContent="Min bet is 10 CR",Ft.style.color="#ef4444";return}if(ps!=null&&ps()){yh&&yh(n)?(li=n,Ft.textContent=`Wager sent: ${n.toLocaleString()} CR`,Ft.style.color="#00c9a7",Ps.disabled=!0,Hi()):(Ft.textContent="Invalid amount or exceeds bankroll",Ft.style.color="#ef4444");return}li=n,mc(Or.PLACE_BET,{amount:n}),Ft.textContent=`Bet placed: ${n.toLocaleString()} CR`,Ft.style.color="#00c9a7",Ps.disabled=!0,Hi()}),qe("onRoundStart",(n={})=>{n.betAmount!=null&&n.betAmount>0?(li=n.betAmount,Es.value=String(n.betAmount),Ft.textContent=`Wager: ${n.betAmount.toLocaleString()} CR`,Ft.style.color="#94a3b8"):ps!=null&&ps()||(!li||li<10)&&(li=100,Es.value="100",Ft.textContent="Harness / local bet",Ft.style.color="#64748b"),Hi(),$T()}),qe("onRoundEnd",()=>ZT())}function Hi(){if(!Mr)return;if(!Pu){Mr.hidden=!0;return}const s=Number(Pu());if(!Number.isFinite(s)){Mr.hidden=!0;return}Mr.hidden=!1,Mr.textContent=`Balance: ${Math.round(s).toLocaleString()} CR`}function $T(){_c.classList.add("locked"),Ps.disabled=!0}function ZT(){_c.classList.remove("locked"),Es.value="",Ps.disabled=!1,Ft.textContent="Round starts after all players bet",Ft.style.color="#475569",li=0,Hi()}function KT(){_c.classList.remove("locked"),Ps.disabled=!1,Es.value="",li=0,Ft.textContent="All players must wager to play",Ft.style.color="#94a3b8",Hi()}function JT(){return li}const $o=200,Zo=100,Op=2.2,vh=4,jT={safe:"#0d3b32",charged:"#3b2a07",critical:"#3b0e0e"},QT={hidden:null,"revealed-safe":"#00c9a7","revealed-trap":"#ef4444",reward:"#fbbf24"},e1=bd.map(s=>"#"+s.toString(16).padStart(6,"0"));let Fp=null,$e=null,k0=null,Sl=[];function H0(s){const e=s.clone().normalize(),t=Math.atan2(e.x,e.z),n=Math.asin(Math.max(-1,Math.min(1,e.y)));return{x:(t/Math.PI*.5+.5)*$o,y:(.5-n/Math.PI)*Zo}}function t1(s){Ji();const e=document.createElement("div");e.id="cs-overview",e.className="cs-panel cs-corner",e.innerHTML=`
    <style>
      #cs-overview {
        width: 100%;
        padding: 10px 12px;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      #cs-overview .ov-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      #cs-overview .ov-title {
        font-family: 'Share Tech Mono', monospace;
        font-size: 8px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #00c9a7;
      }

      #cs-ov-canvas {
        border-radius: 3px;
        border: 1px solid rgba(0,201,167,0.15);
        display: block;
        width: 100%;
        image-rendering: pixelated;
      }

      #cs-ov-zone-panel {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-top: 2px;
      }

      .ov-zone-row {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px 8px;
        border-radius: 3px;
        border: 1px solid transparent;
        transition: all 0.35s;
      }
      .ov-zone-row.active-zone {
        background: rgba(255,255,255,0.04);
      }
      .ov-zone-row.active-zone.z-safe     { border-color: rgba(0,201,167,0.3); }
      .ov-zone-row.active-zone.z-charged  { border-color: rgba(245,158,11,0.3); }
      .ov-zone-row.active-zone.z-critical { border-color: rgba(239,68,68,0.3); }

      .ov-zone-dot {
        width: 9px; height: 9px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .ov-zone-name {
        font-family: 'Rajdhani', sans-serif;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        flex: 1;
        color: #475569;
        transition: color 0.35s;
      }
      .ov-zone-row.active-zone .ov-zone-name { color: #e2e8f0; }

      .ov-zone-mult {
        font-family: 'Share Tech Mono', monospace;
        font-size: 10px;
        color: #334155;
        transition: color 0.35s;
      }
      .ov-zone-row.active-zone .ov-zone-mult { color: #94a3b8; }

      .ov-zone-status {
        font-size: 12px;
        opacity: 0.6;
      }
      .ov-zone-row.active-zone .ov-zone-status { opacity: 1; }

      #cs-ov-legend {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        padding-top: 2px;
      }
      .ov-leg {
        display: flex;
        align-items: center;
        gap: 4px;
        font-family: 'Share Tech Mono', monospace;
        font-size: 8px;
        color: #475569;
      }
      .ov-leg-dot {
        width: 6px; height: 6px;
        border-radius: 50%;
      }
    </style>

    <div class="ov-header">
      <span class="ov-title">Overview</span>
    </div>

    <canvas id="cs-ov-canvas" width="${$o}" height="${Zo}"></canvas>

    <div id="cs-ov-zone-panel">
      <div class="ov-zone-row z-safe active-zone" data-zone="safe">
        <div class="ov-zone-dot" style="background:#00c9a7; box-shadow:0 0 5px #00c9a7"></div>
        <span class="ov-zone-name">Safe</span>
        <span class="ov-zone-mult">1.0–1.5×</span>
        <span class="ov-zone-status">✓</span>
      </div>
      <div class="ov-zone-row z-charged" data-zone="charged">
        <div class="ov-zone-dot" style="background:#f59e0b; box-shadow:0 0 5px #f59e0b"></div>
        <span class="ov-zone-name">Charged</span>
        <span class="ov-zone-mult">1.5–2.5×</span>
        <span class="ov-zone-status">⚡</span>
      </div>
      <div class="ov-zone-row z-critical" data-zone="critical">
        <div class="ov-zone-dot" style="background:#ef4444; box-shadow:0 0 5px #ef4444"></div>
        <span class="ov-zone-name">Critical</span>
        <span class="ov-zone-mult">2.5×+</span>
        <span class="ov-zone-status">🔒</span>
      </div>
    </div>

    <div id="cs-ov-legend">
      <div class="ov-leg"><div class="ov-leg-dot" style="background:#00c9a755"></div>revealed</div>
      <div class="ov-leg"><div class="ov-leg-dot" style="background:#ef444488"></div>trap</div>
      <div class="ov-leg"><div class="ov-leg-dot" style="background:#fbbf2488"></div>reward</div>
    </div>
  `,s.appendChild(e),k0=e,Fp=e.querySelector("#cs-ov-canvas"),$e=Fp.getContext("2d"),V0(),qe("onRoundStart",()=>{Sl=mh(),Bp("safe")}),qe("onReveal",({type:t})=>{Sl=mh(),Bp(t==="safe"?"safe":t==="trap"?"critical":"charged")}),qe("onRoundEnd",()=>{Sl=mh()})}function n1(){V0(),s1(),r1(),i1()}function V0(){$e.fillStyle="#060e1c",$e.fillRect(0,0,$o,Zo)}function i1(){$e.strokeStyle="rgba(0,201,167,0.06)",$e.lineWidth=.5;for(let s=1;s<4;s++){const e=s/4*$o;$e.beginPath(),$e.moveTo(e,0),$e.lineTo(e,Zo),$e.stroke()}for(let s=1;s<2;s++){const e=s/2*Zo;$e.beginPath(),$e.moveTo(0,e),$e.lineTo($o,e),$e.stroke()}}function s1(){Sl.forEach(({position:s,zone:e,state:t})=>{const{x:n,y:i}=H0(s),r=QT[t]??jT[e]??"#111",o=t==="hidden"?.5:1;$e.globalAlpha=o,$e.beginPath(),$e.arc(n,i,Op,0,Math.PI*2),$e.fillStyle=r,$e.fill(),t!=="hidden"&&($e.globalAlpha=.35,$e.beginPath(),$e.arc(n,i,Op+2,0,Math.PI*2),$e.fillStyle=r,$e.fill()),$e.globalAlpha=1})}function r1(){T0().forEach((e,t)=>{const{x:n,y:i}=H0(e),r=e1[t]??"#ffffff";$e.globalAlpha=.4,$e.beginPath(),$e.arc(n,i,vh+3,0,Math.PI*2),$e.fillStyle=r,$e.fill(),$e.globalAlpha=1,$e.beginPath(),$e.arc(n,i,vh,0,Math.PI*2),$e.fillStyle=r,$e.fill(),$e.fillStyle="#000",$e.font=`bold ${vh+1}px monospace`,$e.textAlign="center",$e.textBaseline="middle",$e.fillText(t,n,i)}),$e.globalAlpha=1}function Bp(s){k0.querySelectorAll(".ov-zone-row").forEach(e=>{e.classList.toggle("active-zone",e.dataset.zone===s)})}const bh="'Share Tech Mono', monospace",Sr="'Rajdhani', sans-serif";function o1(s,{onCreate:e,onJoin:t,onReady:n}){Ji();const i=a1();s.appendChild(i);const r=i.querySelector("#lob-name-section"),o=i.querySelector("#lob-action-section"),a=i.querySelector("#lob-lobby-section"),l=i.querySelector("#lob-status"),c=i.querySelector("#lob-players"),h=i.querySelector("#lob-room-code"),u=i.querySelector("#lob-name"),d=i.querySelector("#lob-host-btn"),f=i.querySelector("#lob-join-btn"),m=i.querySelector("#lob-code"),x=i.querySelector("#lob-join-confirm"),g=i.querySelector("#lob-ready-btn");let p=!1;function y(T,P=!1){l.textContent=T,l.style.color=P?"#ff4444":"#94a3b8"}d.addEventListener("click",async()=>{const T=u.value.trim()||"Player";d.disabled=!0,f.disabled=!0,y("Creating room…");try{const P=await e(T);h.textContent=P,r.style.display="none",o.style.display="none",a.style.display="flex",p=!0}catch(P){y("Failed to create room: "+P.message,!0),d.disabled=!1,f.disabled=!1}}),f.addEventListener("click",()=>{m.parentElement.style.display="flex",f.style.display="none"}),x.addEventListener("click",async()=>{const T=u.value.trim()||"Player",P=m.value.trim().toUpperCase();if(!P){y("Enter a room code",!0);return}x.disabled=!0,y("Joining room "+P+"…");try{await t(P,T),h.textContent=P,r.style.display="none",o.style.display="none",a.style.display="flex",p=!0}catch(E){y("Failed to join: "+E.message,!0),x.disabled=!1}}),g.addEventListener("click",()=>{g.disabled=!0,g.textContent="WAITING…",n()});function _(){i.style.opacity="0",i.style.transition="opacity 0.4s ease",setTimeout(()=>{i.style.display="none"},450)}function b(){i.style.display="flex",i.style.opacity="1",i.style.transition="",g.disabled=!1,g.textContent="READY"}function L(){p=!1,i.style.display="flex",i.style.opacity="1",i.style.transition="",r.style.display="flex",o.style.display="flex",a.style.display="none",d.disabled=!1,f.disabled=!1,f.style.display="block",m.parentElement.style.display="none",x.disabled=!1,g.disabled=!1,g.textContent="READY",y(""),c.innerHTML=""}function A(T){p&&(c.innerHTML="",T.forEach(P=>{const E=document.createElement("div");Object.assign(E.style,{display:"flex",alignItems:"center",gap:"8px",padding:"4px 0",fontFamily:Sr,fontSize:"13px",color:"#cbd5e1"});const M=document.createElement("span");Object.assign(M.style,{width:"8px",height:"8px",borderRadius:"50%",background:P.color??"#666",flexShrink:"0"});const C=document.createElement("span");C.textContent=P.name,C.style.flex="1";const O=document.createElement("span");O.textContent=P.ready?"READY":"…",O.style.color=P.ready?"#00c9a7":"#64748b",O.style.fontSize="10px",E.append(M,C,O),c.appendChild(E)}))}return{hide:_,show:b,updatePlayers:A,resetToEntry:L}}function a1(){const s=document.createElement("div");Object.assign(s.style,{position:"fixed",inset:"0",display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(6, 10, 20, 0.88)",backdropFilter:"blur(12px)",zIndex:"1000"});const e=document.createElement("div");return Object.assign(e.style,{background:"rgba(12, 20, 40, 0.92)",border:"1px solid rgba(56, 189, 248, 0.25)",borderRadius:"12px",padding:"36px 40px",minWidth:"320px",maxWidth:"400px",width:"90vw",display:"flex",flexDirection:"column",gap:"18px"}),e.innerHTML=`
    <div style="text-align:center">
      <div style="font-family:${bh};font-size:22px;letter-spacing:.18em;
                  color:#38bdf8;text-shadow:0 0 16px #38bdf8aa;margin-bottom:4px">
        CIRCUIT SPHERE
      </div>
      <div style="font-family:${Sr};font-size:12px;letter-spacing:.12em;
                  color:#475569;text-transform:uppercase">
        Multiplayer Hex Sphere
      </div>
    </div>

    <!-- Name -->
    <div id="lob-name-section" style="display:flex;flex-direction:column;gap:8px">
      <label style="font-family:${Sr};font-size:11px;letter-spacing:.1em;
                    color:#64748b;text-transform:uppercase">Your Name</label>
      <input id="lob-name" type="text" placeholder="Player"
        style="background:rgba(30,41,59,0.9);border:1px solid rgba(56,189,248,0.2);
               border-radius:6px;padding:9px 12px;color:#e2e8f0;
               font-family:${Sr};font-size:14px;outline:none;width:100%;box-sizing:border-box" />
    </div>

    <!-- Host / Join -->
    <div id="lob-action-section" style="display:flex;flex-direction:column;gap:10px">
      <button id="lob-host-btn" style="${cl("#0ea5e9")}">HOST ROOM</button>

      <div style="display:flex;flex-direction:column;gap:6px">
        <button id="lob-join-btn" style="${cl("#334155")}">JOIN ROOM</button>
        <div style="display:none;align-items:center;gap:6px" id="lob-join-row">
          <input id="lob-code" type="text" placeholder="ROOM CODE" maxlength="5"
            style="flex:1;background:rgba(30,41,59,0.9);border:1px solid rgba(56,189,248,0.2);
                   border-radius:6px;padding:8px 10px;color:#e2e8f0;
                   font-family:${bh};font-size:14px;letter-spacing:.1em;
                   text-transform:uppercase;outline:none;box-sizing:border-box" />
          <button id="lob-join-confirm" style="${cl("#0ea5e9")}padding:8px 14px;">JOIN</button>
        </div>
      </div>
    </div>

    <!-- In lobby -->
    <div id="lob-lobby-section" style="display:none;flex-direction:column;gap:12px">
      <div style="display:flex;align-items:center;justify-content:space-between">
        <span style="font-family:${Sr};font-size:11px;letter-spacing:.1em;
                     color:#64748b;text-transform:uppercase">Room</span>
        <span id="lob-room-code"
          style="font-family:${bh};font-size:18px;letter-spacing:.2em;
                 color:#38bdf8;text-shadow:0 0 12px #38bdf8aa"></span>
      </div>
      <div id="lob-players" style="display:flex;flex-direction:column;gap:4px;
                                    min-height:40px"></div>
      <button id="lob-ready-btn" style="${cl("#00c9a7")}margin-top:4px">
        READY
      </button>
    </div>

    <!-- Status line -->
    <div id="lob-status"
      style="font-family:${Sr};font-size:12px;color:#64748b;
             text-align:center;min-height:16px"></div>
  `,s.appendChild(e),s}function cl(s,e){return`background:${s};border:none;border-radius:6px;padding:10px 0;width:100%;
          color:#fff;font-family:'Rajdhani',sans-serif;font-size:13px;
          letter-spacing:.12em;font-weight:600;cursor:pointer;`}const l1=["#38bdf8","#f472b6","#a78bfa","#fb923c"],ws="'Share Tech Mono', monospace",fo="'Rajdhani', sans-serif",c1=["1ST","2ND","3RD","4TH"],h1={bust:"BUST",cashout:"CASHED OUT",active:"ACTIVE"},u1={bust:"#ef4444",cashout:"#38bdf8",active:"#00c9a7"};function d1(s,e={}){const t=typeof e.getIsHost=="function"?e.getIsHost:()=>!1,n=e.onHostStartNewGame??(()=>{}),i=e.onLeaveRoom??(()=>{}),r=p1();s.appendChild(r);const o=r.querySelector("#ro-inner"),a=r.querySelector("#ro-list"),l=r.querySelector("#ro-subtitle"),c=r.querySelector("#ro-wait-host"),h=r.querySelector("#ro-new-game"),u=r.querySelector("#ro-leave-room");return h.addEventListener("click",()=>{n(),hl(r)}),u.addEventListener("click",()=>{i(),hl(r)}),qe("onRoundEnd",({results:d,matchNumber:f})=>{f1(a,d??[]),l&&(l.textContent=f!=null?`Match ${f} complete`:"Match complete");const m=t();h.style.display=m?"block":"none",c.style.display=m?"none":"block",zp(r,o)}),qe("onRoundStart",()=>hl(r)),{hide:()=>hl(r),show:()=>zp(r,o)}}function zp(s,e){s.style.display="flex",s.style.opacity="0",e.style.transform="translateY(24px)",requestAnimationFrame(()=>{s.style.transition="opacity 0.35s ease",e.style.transition="transform 0.35s ease",s.style.opacity="1",e.style.transform="translateY(0)"})}function hl(s){s.style.opacity="0",setTimeout(()=>{s.style.display="none"},380)}function f1(s,e){s.innerHTML="";const t=[...e].sort((n,i)=>{const r=n.status==="cashout"?0:1,o=i.status==="cashout"?0:1;return r!==o?r-o:(i.payout??i.voltage??0)-(n.payout??n.voltage??0)});t.forEach((n,i)=>{var f;const r=n.playerId??i,o=l1[r]??"#94a3b8",a=c1[i]??`${i+1}TH`,l=h1[n.status]??((f=n.status)==null?void 0:f.toUpperCase())??"—",c=u1[n.status]??"#94a3b8",h=(n.voltage??1).toFixed(2)+"×",u=n.payout>0?`${Math.round(n.payout).toLocaleString()} CR`:"—",d=document.createElement("div");Object.assign(d.style,{display:"flex",alignItems:"center",gap:"12px",padding:"10px 14px",borderRadius:"8px",background:i===0?"rgba(251,191,36,0.07)":"rgba(255,255,255,0.03)",border:`1px solid ${i===0?"rgba(251,191,36,0.22)":"rgba(255,255,255,0.07)"}`}),d.innerHTML=`
      <span style="font-family:${ws};font-size:10px;color:${i===0?"#fbbf24":"#475569"};
                   width:32px;text-align:center">${a}</span>
      <span style="width:10px;height:10px;border-radius:50%;background:${o};
                   box-shadow:0 0 6px ${o}88;flex-shrink:0;display:inline-block"></span>
      <span style="font-family:${fo};font-size:14px;font-weight:600;
                   color:#e2e8f0;flex:1">${n.name??`P${r}`}</span>
      <span style="font-family:${ws};font-size:11px;color:${c};
                   min-width:80px;text-align:right">${l}</span>
      <span style="font-family:${ws};font-size:12px;color:#cbd5e1;
                   min-width:52px;text-align:right">${h}</span>
      <span style="font-family:${ws};font-size:13px;
                   color:${n.status==="cashout"?"#fbbf24":"#475569"};
                   min-width:90px;text-align:right;
                   text-shadow:${n.status==="cashout"?"0 0 8px #fbbf2477":"none"}">
        ${u}
      </span>
    `,s.appendChild(d)}),t.length===0&&(s.innerHTML=`<div style="text-align:center;color:#475569;
      font-family:${ws};font-size:11px;padding:20px 0">No results</div>`)}function p1(){const s=document.createElement("div");Object.assign(s.style,{position:"fixed",inset:"0",display:"none",alignItems:"center",justifyContent:"center",background:"rgba(4, 8, 18, 0.82)",backdropFilter:"blur(10px)",zIndex:"500",pointerEvents:"auto"});const e=document.createElement("div");return e.id="ro-inner",Object.assign(e.style,{background:"rgba(10, 18, 36, 0.96)",border:"1px solid rgba(56, 189, 248, 0.18)",borderRadius:"14px",padding:"32px 36px",minWidth:"480px",maxWidth:"620px",width:"90vw",maxHeight:"80vh",overflowY:"auto",display:"flex",flexDirection:"column",gap:"20px"}),e.innerHTML=`
    <!-- Header -->
    <div style="text-align:center">
      <div id="ro-subtitle" style="font-family:${ws};font-size:10px;letter-spacing:.22em;
                  color:#475569;text-transform:uppercase;margin-bottom:6px">Match complete</div>
      <div style="font-family:${fo};font-size:28px;font-weight:700;
                  letter-spacing:.1em;color:#e2e8f0">GAME OVER</div>
    </div>

    <!-- Column headers -->
    <div style="display:flex;align-items:center;gap:12px;
                padding:0 14px;font-family:${ws};font-size:8px;
                letter-spacing:.14em;color:#334155;text-transform:uppercase">
      <span style="width:32px;text-align:center">Rank</span>
      <span style="width:10px"></span>
      <span style="flex:1">Player</span>
      <span style="min-width:80px;text-align:right">Result</span>
      <span style="min-width:52px;text-align:right">Mult</span>
      <span style="min-width:90px;text-align:right">Payout</span>
    </div>

    <!-- Results list -->
    <div id="ro-list" style="display:flex;flex-direction:column;gap:8px"></div>

    <!-- Actions -->
    <div style="display:flex;flex-direction:column;align-items:center;gap:10px;padding-top:4px">
      <div id="ro-wait-host" style="display:none;font-family:${fo};font-size:12px;
           color:#64748b;text-align:center;max-width:280px">
        Waiting for host to start the next match…
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;width:100%">
        <button id="ro-new-game" type="button"
          style="display:none;background:rgba(0,201,167,0.15);border:1px solid rgba(0,201,167,0.45);
                 border-radius:8px;padding:10px 24px;color:#00c9a7;
                 font-family:${fo};font-size:13px;font-weight:700;letter-spacing:.12em;
                 cursor:pointer;transition:all 0.2s">
          START NEW GAME
        </button>
        <button id="ro-leave-room" type="button"
          style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.35);
                 border-radius:8px;padding:10px 24px;color:#f87171;
                 font-family:${fo};font-size:13px;font-weight:700;letter-spacing:.12em;
                 cursor:pointer;transition:all 0.2s">
          LEAVE ROOM
        </button>
      </div>
    </div>
  `,s.appendChild(e),s}const Mh="'Rajdhani', sans-serif",m1=4200,g1="96px";function x1(s){const e=y1();s.appendChild(e);let t=null;qe("onLocalMoveTurn",()=>{clearTimeout(t),_1(e),t=setTimeout(()=>kp(e),m1)}),qe("onRoundEnd",()=>{clearTimeout(t),kp(e)})}function _1(s){s.style.display="flex",s.style.opacity="0",s.style.transform="translateX(-50%) translateY(14px)",requestAnimationFrame(()=>{requestAnimationFrame(()=>{s.style.transition="opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",s.style.opacity="1",s.style.transform="translateX(-50%) translateY(0)"})})}function kp(s){s.style.transition="opacity 0.35s ease, transform 0.35s ease",s.style.opacity="0",s.style.transform="translateX(-50%) translateY(10px)",setTimeout(()=>{s.style.display="none"},380)}function y1(){const s=document.createElement("div");if(Object.assign(s.style,{position:"fixed",left:"50%",bottom:g1,top:"auto",transform:"translateX(-50%) translateY(14px)",display:"none",flexDirection:"column",alignItems:"center",gap:"6px",background:"rgba(6, 14, 28, 0.92)",border:"1px solid rgba(0, 201, 167, 0.45)",borderRadius:"10px",padding:"16px 32px",pointerEvents:"none",zIndex:"300",boxShadow:"0 0 32px rgba(0,201,167,0.15), 0 4px 24px rgba(0,0,0,0.5)",backdropFilter:"blur(8px)",minWidth:"340px",textAlign:"center"}),s.innerHTML=`
    <div style="display:flex;align-items:center;gap:10px;justify-content:center">
      <span style="width:7px;height:7px;border-radius:50%;background:#00c9a7;
                   box-shadow:0 0 8px #00c9a7;animation:cs-pulse 1s ease infinite;
                   flex-shrink:0"></span>
      <span style="font-family:${Mh};font-size:12px;font-weight:700;letter-spacing:.2em;
                   color:#00c9a7;text-transform:uppercase">Your Move</span>
      <span style="width:7px;height:7px;border-radius:50%;background:#00c9a7;
                   box-shadow:0 0 8px #00c9a7;animation:cs-pulse 1s ease infinite;
                   flex-shrink:0"></span>
    </div>
    <div style="font-family:${Mh};font-size:26px;font-weight:700;
                letter-spacing:.08em;color:#e2e8f0;line-height:1.1">
      NAVIGATE THE SPHERE
    </div>
    <div style="font-family:${Mh};font-size:14px;font-weight:600;letter-spacing:.1em;
                color:#94a3b8;text-transform:uppercase;line-height:1.6">
      Click glowing tiles to move &nbsp;·&nbsp; Avoid traps &nbsp;·&nbsp; Cash out to win
    </div>
  `,!document.getElementById("cs-gsb-style")){const e=document.createElement("style");e.id="cs-gsb-style",e.textContent=`
      @keyframes cs-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50%       { opacity: 0.4; transform: scale(0.75); }
      }
    `,document.head.appendChild(e)}return s}const v1="'Share Tech Mono', monospace",Hp="'Rajdhani', sans-serif";function b1(s){const{overlay:e,panel:t}=E1();return s.appendChild(e),{show(){M1(e,t)},hide(){S1(e)}}}function M1(s,e){s.style.display="flex",s.style.opacity="0",e.style.transform="translate(-50%, -50%) scale(0.92)",requestAnimationFrame(()=>{requestAnimationFrame(()=>{s.style.transition="opacity 0.35s ease",e.style.transition="transform 0.4s cubic-bezier(0.34,1.4,0.64,1)",s.style.opacity="0.97",e.style.transform="translate(-50%, -50%) scale(1)"})})}function S1(s){s.style.transition="opacity 0.35s ease",s.style.opacity="0",setTimeout(()=>{s.style.display="none"},360)}function E1(){const s=document.createElement("div");Object.assign(s.style,{position:"fixed",inset:"0",display:"none",alignItems:"center",justifyContent:"center",background:"radial-gradient(ellipse at center, rgba(56,189,248,0.06) 0%, rgba(6,14,28,0.72) 55%, rgba(6,14,28,0.88) 100%)",zIndex:"320",pointerEvents:"none"});const e=document.createElement("div");if(Object.assign(e.style,{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%) scale(0.92)",display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",background:"rgba(6, 14, 28, 0.94)",border:"1px solid rgba(56, 189, 248, 0.5)",borderRadius:"14px",padding:"22px 36px",minWidth:"360px",textAlign:"center",boxShadow:"0 0 40px rgba(56,189,248,0.12), 0 12px 48px rgba(0,0,0,0.55)",backdropFilter:"blur(12px)"}),e.innerHTML=`
    <div style="display:flex;align-items:center;gap:10px;justify-content:center">
      <span style="width:7px;height:7px;border-radius:50%;background:#38bdf8;
                   box-shadow:0 0 10px #38bdf8;animation:cs-bet-pulse 1.1s ease infinite;
                   flex-shrink:0"></span>
      <span style="font-family:${Hp};font-size:12px;font-weight:700;letter-spacing:.22em;
                   color:#38bdf8;text-transform:uppercase">Betting Phase</span>
      <span style="width:7px;height:7px;border-radius:50%;background:#38bdf8;
                   box-shadow:0 0 10px #38bdf8;animation:cs-bet-pulse 1.1s ease infinite;
                   flex-shrink:0"></span>
    </div>
    <div style="font-family:${Hp};font-size:28px;font-weight:800;
                letter-spacing:.1em;color:#e0f2fe;line-height:1.1;
                text-shadow:0 0 24px rgba(56,189,248,0.35)">
      PLACE YOUR WAGER
    </div>
    <div style="font-family:${v1};font-size:11px;letter-spacing:.14em;
                color:#94a3b8;text-transform:uppercase;line-height:1.5;max-width:340px">
      Commit a bet before the timer ends &nbsp;·&nbsp; Only players who wager join this round
    </div>
  `,s.appendChild(e),!document.getElementById("cs-bet-banner-style")){const t=document.createElement("style");t.id="cs-bet-banner-style",t.textContent=`
      @keyframes cs-bet-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50%       { opacity: 0.45; transform: scale(0.78); }
      }
    `,document.head.appendChild(t)}return{overlay:s,panel:e}}const Sh="'Share Tech Mono', monospace",w1="'Rajdhani', sans-serif",G0=3500;function T1(s){let e=0,t=null;const{overlay:n,panel:i,bar:r}=R1();s.appendChild(n),qe("onRoundStart",({localPlayerId:o})=>{e=o??0,clearTimeout(t),Vp(n)}),qe("onBust",({playerId:o})=>{o===e&&(clearTimeout(t),A1(n,i,r),t=setTimeout(()=>Vp(n),G0))})}function A1(s,e,t){s.style.display="flex",s.style.opacity="0",e.style.transform="scale(0.88)",t.style.width="100%",requestAnimationFrame(()=>{requestAnimationFrame(()=>{s.style.transition="opacity 0.25s ease",e.style.transition="transform 0.35s cubic-bezier(0.34,1.4,0.64,1)",s.style.opacity="1",e.style.transform="scale(1)",t.style.transition=`width ${G0}ms linear`,requestAnimationFrame(()=>{t.style.width="0%"})})})}function Vp(s){s.style.transition="opacity 0.4s ease",s.style.opacity="0",setTimeout(()=>{s.style.display="none"},420)}function R1(){const s=document.createElement("div");Object.assign(s.style,{position:"fixed",inset:"0",display:"none",alignItems:"center",justifyContent:"center",background:"radial-gradient(ellipse at center, rgba(239,68,68,0.08) 0%, rgba(139,0,0,0.45) 100%)",zIndex:"450",pointerEvents:"none"});const e=document.createElement("div");Object.assign(e.style,{position:"absolute",inset:"0",border:"3px solid rgba(239,68,68,0.6)",animation:"cs-bust-ring 0.3s ease forwards",pointerEvents:"none"}),s.appendChild(e);const t=document.createElement("div");Object.assign(t.style,{position:"relative",background:"rgba(8, 4, 4, 0.96)",border:"1px solid rgba(239,68,68,0.55)",borderRadius:"14px",padding:"36px 48px 24px",display:"flex",flexDirection:"column",alignItems:"center",gap:"10px",boxShadow:"0 0 60px rgba(239,68,68,0.3), 0 0 120px rgba(139,0,0,0.2)",minWidth:"320px",overflow:"hidden",transform:"scale(0.88)"}),t.innerHTML=`
    <!-- Icon -->
    <div style="font-size:40px;line-height:1;filter:drop-shadow(0 0 12px #ef4444);
                animation:cs-bust-shake 0.4s ease">⚡</div>

    <!-- Main label -->
    <div style="font-family:${Sh};font-size:11px;letter-spacing:.28em;
                color:#ef4444;text-transform:uppercase;margin-top:4px">
      Circuit Overloaded
    </div>
    <div style="font-family:${w1};font-size:38px;font-weight:800;
                letter-spacing:.12em;color:#fca5a5;
                text-shadow:0 0 24px #ef444488,0 0 48px #ef444444;
                line-height:1">
      BUSTED
    </div>

    <!-- Subtitle -->
    <div style="font-family:${Sh};font-size:10px;letter-spacing:.18em;
                color:#64748b;text-transform:uppercase;margin-top:2px">
      You stepped on a trap
    </div>

    <div style="font-family:${Sh};font-size:9px;letter-spacing:.14em;
                color:#475569;margin-top:6px">
      spectating remainder of round
    </div>
  `;const n=document.createElement("div");Object.assign(n.style,{position:"absolute",bottom:"0",left:"0",right:"0",height:"3px",background:"rgba(255,255,255,0.05)"});const i=document.createElement("div");if(Object.assign(i.style,{height:"100%",width:"100%",background:"linear-gradient(90deg, #ef4444, #f87171)",boxShadow:"0 0 8px #ef4444"}),n.appendChild(i),t.appendChild(n),s.appendChild(t),!document.getElementById("cs-bust-style")){const r=document.createElement("style");r.id="cs-bust-style",r.textContent=`
      @keyframes cs-bust-ring {
        0%   { opacity: 0.9; transform: scale(1); }
        60%  { opacity: 0.5; transform: scale(1.008); }
        100% { opacity: 0;   transform: scale(1.016); }
      }
      @keyframes cs-bust-shake {
        0%,100% { transform: translateX(0) rotate(0deg); }
        20%     { transform: translateX(-4px) rotate(-8deg); }
        40%     { transform: translateX(4px)  rotate(8deg); }
        60%     { transform: translateX(-3px) rotate(-5deg); }
        80%     { transform: translateX(3px)  rotate(5deg); }
      }
    `,document.head.appendChild(r)}return{overlay:s,panel:t,bar:i}}const Eh="'Rajdhani', sans-serif";function C1(s,{onSpectate:e,onLeave:t}){Ji();const n=document.createElement("div");Object.assign(n.style,{position:"fixed",left:"50%",bottom:"24px",transform:"translateX(-50%)",zIndex:"460",display:"none",flexDirection:"column",alignItems:"center",gap:"10px",pointerEvents:"auto"}),n.innerHTML=`
    <div style="font-family:${Eh};font-size:12px;font-weight:600;color:#94a3b8;
                text-align:center;letter-spacing:0.06em;max-width:320px">
      You're out of this match. Watch the rest or leave the room.
    </div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center">
      <button type="button" id="cs-spec-watch"
        style="background:rgba(0,201,167,0.15);border:1px solid rgba(0,201,167,0.45);
               border-radius:8px;padding:10px 20px;color:#00c9a7;
               font-family:${Eh};font-size:13px;font-weight:700;letter-spacing:0.1em;
               cursor:pointer">
        SPECTATE
      </button>
      <button type="button" id="cs-spec-leave"
        style="background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.4);
               border-radius:8px;padding:10px 20px;color:#f87171;
               font-family:${Eh};font-size:13px;font-weight:700;letter-spacing:0.1em;
               cursor:pointer">
        LEAVE ROOM
      </button>
    </div>
  `,s.appendChild(n),n.querySelector("#cs-spec-watch").addEventListener("click",()=>{r()}),n.querySelector("#cs-spec-leave").addEventListener("click",()=>{r(),t==null||t()});function i(){n.style.display="flex"}function r(){n.style.display="none"}return{show:i,hide:r}}function P1(s){let e=s|0;return function(){e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}const ca={sphereRadius:6,subdivisions:3,turnTimerMs:3e4,trapDensity:{safe:.12,charged:.25,critical:.35},rewardDensity:{safe:.1,charged:.12,critical:.15},voltageRates:{safe:{base:.12,reward:.25,follower:.06},charged:{base:.3,reward:.55,follower:.15},critical:{base:.7,reward:1.3,follower:.35}},zoneBounds:{safeMaxLat:.4,chargedMaxLat:.9}};function I1(s,e=ca){const t=P1(s),{sphereRadius:n,subdivisions:i,zoneBounds:r,trapDensity:o,rewardDensity:a}=e,l=L1(n,i),c=D1(l,n),h=l.map((m,x)=>{const g=Math.abs(Math.asin(m.center.y/n));let p;return g<=r.safeMaxLat?p=gn.SAFE:g<=r.chargedMaxLat?p=gn.CHARGED:p=gn.CRITICAL,{id:x,center:{x:m.center.x,y:m.center.y,z:m.center.z},zone:p,tileType:bn.SAFE,rewardValue:null,adjacency:c[x]||[],vertices:m.vertices.map(y=>({x:y.x,y:y.y,z:y.z})),sides:m.sides}});for(const m of h){const x=t(),g=o[m.zone],p=a[m.zone];x<g?m.tileType=bn.TRAP:x<g+p&&(m.tileType=bn.REWARD,m.rewardValue=e.voltageRates[m.zone].reward)}const u=h.filter(m=>m.zone===gn.SAFE);u.sort((m,x)=>Math.abs(m.center.y)-Math.abs(x.center.y));const d=u.slice(0,Math.min(8,u.length)).map(m=>m.id);for(const m of d)h[m].tileType=bn.SAFE,h[m].rewardValue=null;const f={safe:{minLat:0,maxLat:r.safeMaxLat},charged:{minLat:r.safeMaxLat,maxLat:r.chargedMaxLat},critical:{minLat:r.chargedMaxLat,maxLat:Math.PI/2}};return{tiles:h,startTiles:d,zoneRings:f}}function L1(s,e){const t=window.THREE;if(!t)throw new Error("THREE.js must be loaded before board.js");const n=new t.IcosahedronGeometry(s,e),i=n.attributes.position,r=new Map,o=[],a=(m,x,g)=>`${m*1e3|0},${x*1e3|0},${g*1e3|0}`;function l(m,x,g){const p=a(m,x,g);if(r.has(p))return r.get(p);const y=o.length;return o.push(new t.Vector3(m,x,g)),r.set(p,y),y}const c=[],h=i.count/3;for(let m=0;m<h;m++){const x=m*3,g=m*3+1,p=m*3+2;c.push([l(i.getX(x),i.getY(x),i.getZ(x)),l(i.getX(g),i.getY(g),i.getZ(g)),l(i.getX(p),i.getY(p),i.getZ(p))])}const u=new Map;c.forEach((m,x)=>m.forEach(g=>{u.has(g)||u.set(g,[]),u.get(g).push(x)}));const d=c.map(m=>{const x=new t.Vector3;return m.forEach(g=>x.add(o[g])),x.divideScalar(3).normalize().multiplyScalar(s)}),f=[];return u.forEach((m,x)=>{const g=o[x].clone().normalize().multiplyScalar(s),p=g.clone().normalize(),y=Math.abs(p.y)<.99?new t.Vector3(0,1,0):new t.Vector3(1,0,0),_=new t.Vector3().crossVectors(p,y).normalize(),b=new t.Vector3().crossVectors(p,_).normalize(),L=m.map(A=>{const T=d[A].clone().sub(g);return{angle:Math.atan2(T.dot(b),T.dot(_)),pos:d[A].clone()}});L.sort((A,T)=>A.angle-T.angle),L.length>=5&&f.push({center:g,normal:p,vertices:L.map(A=>A.pos),sides:L.length})}),n.dispose(),f}function D1(s,e){const t={};for(let i=0;i<s.length;i++){const r=s[i].center,o=[];for(let l=0;l<s.length;l++){if(i===l)continue;const c=s[l].center,h=r.x-c.x,u=r.y-c.y,d=r.z-c.z,f=Math.sqrt(h*h+u*u+d*d);o.push({id:l,dist:f})}o.sort((l,c)=>l.dist-c.dist);const a=e*.45;t[i]=o.filter(l=>l.dist<a).slice(0,6).map(l=>l.id)}return t}function Gp(s,e){return s.tiles[e]||null}function N1(s,e,t){const n=s.tiles[e];return n?n.adjacency.includes(t):!1}function W0(s,e,t){const n=s.tiles[e],i=s.tiles[t];if(!n||!i)return!1;const r={[gn.SAFE]:0,[gn.CHARGED]:1,[gn.CRITICAL]:2};return r[i.zone]>=r[n.zone]}function U1(s,e){const t=s.tiles[e];return t?t.adjacency.filter(n=>W0(s,e,n)):[]}function O1(s,e){const t=s.startTiles;if(e>=t.length)return t.slice(0,e);const n=Math.floor(t.length/e),i=[];for(let r=0;r<e;r++)i.push(t[r*n%t.length]);return i}function F1(s,e,{isFollower:t=!1,isSimultaneous:n=!1,simultaneousCount:i=1,rates:r=ca.voltageRates}={}){if(e===bn.TRAP)return{voltageGain:0,breakdown:{base:0,reward:0,resistance:!1}};const o=r[s];if(!o)return console.warn(`[Voltage] Unknown zone: ${s}`),{voltageGain:0,breakdown:{base:0,reward:0,resistance:!1}};let a,l=!1;t?(a=o.follower,l=!0):n&&i>1?a=(o.base+o.follower)/2:a=o.base;let c=0;e===bn.REWARD&&(c=o.reward,n&&i>1&&(c=c/i));const h=a+c;return{voltageGain:Math.round(h*1e3)/1e3,breakdown:{base:a,reward:c,resistance:l}}}const Wp=["#00FFFF","#FF00FF","#FFD700","#00FF88"],Ko=5e3;function X0(s,e,t=0){return{id:s,name:e,color:Wp[t%Wp.length],ready:!1,bankroll:Ko,bet:0,status:qn.ACTIVE,path:[],currentTileId:null,voltage:1,payout:null,tilesExplored:0,deepestZone:gn.SAFE,idleStrikes:0,connected:!0,disconnectedAt:null,graceDeadline:null}}function B1(s,e){s.status=qn.ACTIVE,s.path=[e],s.currentTileId=e,s.voltage=1,s.payout=null,s.tilesExplored=0,s.deepestZone=gn.SAFE,s.idleStrikes=0}function z1(s){s.status=qn.ACTIVE,s.path=[],s.currentTileId=null,s.voltage=1,s.payout=null,s.bet=0,s.tilesExplored=0,s.deepestZone=gn.SAFE,s.idleStrikes=0,s.ready=!1}function ao(s){return s.status===qn.ACTIVE&&s.connected}function k1(s){return s.status===qn.BUSTED||s.status===qn.CASHED_OUT||s.status===qn.FORFEITED}function H1(s,e,t,n){s.path.push(e),s.currentTileId=e,s.voltage+=t;const i={[gn.SAFE]:0,[gn.CHARGED]:1,[gn.CRITICAL]:2};i[n]>i[s.deepestZone]&&(s.deepestZone=n)}function Xp(s){s.status=qn.BUSTED,s.payout=0}function V1(s,e){s.status=qn.CASHED_OUT,s.payout=e*s.voltage}const ii=Object.freeze({IDLE:"idle",AWAITING:"awaiting",RESOLVING:"resolving",REVEALING:"revealing"});function G1(s){const{broadcast:e,turnTimerMs:t=3e4,revealDelayMs:n=2500,getMatchNumber:i=()=>1}=s;let r=ii.IDLE,o=0,a=null,l=null,c=null,h={},u={},d={},f={},m=null;function x(M,C,O,N={}){c=M,h=C,m=O,u=N,o=0,d={},f={},r=ii.IDLE}function g(){return{state:r,turnNumber:o,timerDeadline:a,revealedTiles:f}}function p(){o++,d={},r=ii.AWAITING;const M=Date.now();a=M+t;const C=[],O=[];for(const N of Object.values(h))ao(N)?C.push({id:N.id,name:N.name,currentTileId:N.currentTileId,voltage:N.voltage,status:N.status}):O.push({id:N.id,name:N.name,finalVoltage:N.voltage,status:N.status});e(Gt.turnBegin({turnNumber:o,timerDeadline:a,hostTimestamp:M,activePlayers:C,resolvedPlayers:O})),clearTimeout(l),l=setTimeout(()=>{L()},t)}function y(M,C,O){if(r!==ii.AWAITING)return{ok:!1,reason:"not_awaiting_moves"};const N=h[M];return!N||!ao(N)?{ok:!1,reason:"player_not_active"}:d[M]?{ok:!1,reason:"already_submitted"}:O===nn.CASHOUT?(d[M]={tileId:null,action:nn.CASHOUT},_(),{ok:!0}):O===nn.STEP?N1(c,N.currentTileId,C)?W0(c,N.currentTileId,C)?Gp(c,C)?(d[M]={tileId:C,action:nn.STEP},_(),{ok:!0}):{ok:!1,reason:"invalid_tile"}:{ok:!1,reason:"not_forward"}:{ok:!1,reason:"not_adjacent"}:{ok:!1,reason:"invalid_action"}}function _(){const M=Object.values(h).filter(O=>ao(O)).map(O=>O.id);M.length>0&&M.every(O=>d[O])&&(clearTimeout(l),A())}const b=3;function L(){if(r!==ii.AWAITING)return;const M=[];for(const C of Object.values(h))ao(C)&&!d[C.id]&&(d[C.id]={tileId:null,action:nn.TIMEOUT},M.push(C.id));M.length>0&&e(Gt.turnTimeout(M)),A()}function A(){r=ii.RESOLVING;const M=[],C={},O={};for(const[B,W]of Object.entries(d))W.action===nn.STEP&&W.tileId!=null&&(O[W.tileId]||(O[W.tileId]=[]),O[W.tileId].push(B));for(const[B,W]of Object.entries(d)){const H=h[B];if(!H)continue;if(W.action===nn.CASHOUT){const $=u[B]||H.bet||100;V1(H,$),M.push({playerId:B,action:nn.CASHOUT,tileId:null,tileState:null,voltageGain:0,totalVoltage:H.voltage,status:H.status,isResistanceApplied:!1,isSimultaneousClaim:!1,rewardClaimed:!1,payout:H.payout});continue}if(W.action===nn.TIMEOUT){H.idleStrikes=(H.idleStrikes||0)+1,H.idleStrikes>=b&&Xp(H),M.push({playerId:B,action:nn.TIMEOUT,tileId:null,tileState:null,voltageGain:0,totalVoltage:H.voltage,status:H.status,isResistanceApplied:!1,isSimultaneousClaim:!1,rewardClaimed:!1,payout:null,idleStrikes:H.idleStrikes});continue}const de=Gp(c,W.tileId);if(!de)continue;const pe=de.tileType,me=(O[W.tileId]||[]).length>1,ke=(O[W.tileId]||[]).length,Ze=f[W.tileId]&&f[W.tileId].tileState!==bn.TRAP;if(pe===bn.TRAP)Xp(H),C[W.tileId]||(C[W.tileId]={tileState:pe,revealedBy:[]}),C[W.tileId].revealedBy.push(B),M.push({playerId:B,action:nn.STEP,tileId:W.tileId,tileState:bn.TRAP,voltageGain:0,totalVoltage:H.voltage,status:H.status,isResistanceApplied:!1,isSimultaneousClaim:me,rewardClaimed:!1,payout:null});else{const{voltageGain:$}=F1(de.zone,pe,{isFollower:Ze,isSimultaneous:me,simultaneousCount:ke,rates:m?m.voltageRates:void 0}),re=pe===bn.REWARD&&!Ze;H1(H,W.tileId,$,de.zone),Ze||H.tilesExplored++,!f[W.tileId]&&!C[W.tileId]&&(C[W.tileId]={tileState:pe,revealedBy:[]}),C[W.tileId]&&C[W.tileId].revealedBy.push(B),M.push({playerId:B,action:nn.STEP,tileId:W.tileId,tileState:pe,voltageGain:$,totalVoltage:H.voltage,status:H.status,isResistanceApplied:Ze,isSimultaneousClaim:me,rewardClaimed:re,payout:null})}}for(const[B,W]of Object.entries(C))f[B]={tileState:W.tileState,revealedBy:W.revealedBy,turnRevealed:o};const N={totalRevealed:Object.keys(f).length,totalTrapsFound:Object.values(f).filter(B=>B.tileState===bn.TRAP).length,totalRewardsFound:Object.values(f).filter(B=>B.tileState===bn.REWARD).length},q=Object.entries(C).map(([B,W])=>({id:parseInt(B),tileState:W.tileState,revealedBy:W.revealedBy})),Z=Gt.turnReveal({turnNumber:o,results:M,newlyRevealedTiles:q,boardState:N});e(Z),r=ii.REVEALING,setTimeout(()=>{T()},n)}function T(){Object.values(h).filter(C=>ao(C)).length===0?P():p()}function P(){r=ii.IDLE,clearTimeout(l);const M=Object.values(h).map(N=>({id:N.id,name:N.name,color:N.color,finalVoltage:N.voltage,status:N.status,payout:N.payout||0,pathLength:N.path.length,deepestZone:N.deepestZone,tilesExplored:N.tilesExplored,bustTile:N.status===qn.BUSTED?N.path[N.path.length-1]:null})),C=[...M].sort((N,q)=>q.payout-N.payout).map((N,q)=>({id:N.id,name:N.name,payout:N.payout,rank:q+1})),O=Gt.roundEnd({roundNumber:i(),totalTurns:o,results:M,leaderboard:C});e(O)}function E(){clearTimeout(l),r=ii.IDLE}return{init:x,getState:g,beginTurn:p,handleMove:y,destroy:E}}const qp=2e4,Iu=3e4;let Pt=bt.LOBBY,In=null,st={},Mt=null,St=!1,zt=null,q0=ca,Ti={},Br=null,$s=[],yc=Ko,vc=1,Nd=()=>{},Y0=()=>{},$0=()=>{},Z0=()=>{},K0=()=>{},J0=()=>{},j0=()=>{},Q0=()=>{};function W1(s,e={}){e.onLobbyUpdate&&(Nd=e.onLobbyUpdate),e.onPlayersUpdate&&(Y0=e.onPlayersUpdate),e.onGameStart&&($0=e.onGameStart),e.onBettingPhaseStart&&(Z0=e.onBettingPhaseStart),e.onBettingPhaseUpdate&&(K0=e.onBettingPhaseUpdate),e.onBettingAbortedToLobby&&(J0=e.onBettingAbortedToLobby),e.onRematchLobby&&(j0=e.onRematchLobby),e.onLeaveRoom&&(Q0=e.onLeaveRoom),s.addEventListener(Or.MOVE_SELECTED,t=>{Pt===bt.PLAYING&&Yo(Gt.move(t.detail.tileId,nn.STEP))}),s.addEventListener(Or.CASHOUT,()=>{Pt===bt.PLAYING&&Yo(Gt.move(null,nn.CASHOUT))}),xh("onMessage",Q1),xh("onPlayerLeave",mA),xh("onError",t=>console.error("[Orch]",t))}async function X1(s){St=!0,I0(s);const e=await DT(s);return Mt=Pd().myId,vc=1,st[Mt]=X0(Mt,s,0),st[Mt].ready=!1,Nd(Ud(),!0,e),e}async function q1(s,e){St=!1,I0(e),await NT(s,e),Mt=Pd().myId}function Y1(){St?(st[Mt]&&(st[Mt].ready=!0),qr(),nx()):Yo(Gt.ready())}function $1(s){const e=Number(s);if(!Number.isFinite(e)||e<10||Pt!==bt.BETTING)return!1;const t=rx();return e>t?!1:(St?ix(Mt,e):Yo(Gt.betSubmit(e)),!0)}function Z1(){return Mt}function K1(){return St}function ex(){return Pt}function J1(){return Pt===bt.BETTING?rx():St&&Mt&&st[Mt]?st[Mt].bankroll:yc}function j1(){if(!St||Pt!==bt.ENDED)return;zt==null||zt.destroy(),zt=null,In=null,Ti={},$s=[];const s=[];for(const e of Object.keys(st)){const t=st[e];t.connected?z1(t):s.push(e)}s.forEach(e=>delete st[e]),vc+=1,qr(),Yi(Gt.newGame())}function tx(){zt==null||zt.destroy(),zt=null,In=null,st={},Ti={},$s=[],yc=Ko,Pt=bt.LOBBY,St=!1,Mt=null,vc=1,UT(),Q0()}function Q1(s,e){if(s.type===Je.PLAYERS){Y0(s.list);return}switch(s.type){case Je.JOIN:return eA(s,e);case Je.READY:return tA(e);case Je.BET_PHASE:return lA(s);case Je.BET_SUBMIT:return sA(s,e);case Je.GAME_START:return cA(s);case Je.TURN_BEGIN:return hA(s);case Je.MOVE:return uA(s,e);case Je.TURN_REVEAL:return dA(s);case Je.ROUND_END:return fA(s);case Je.NEW_GAME:return pA()}}function eA(s,e){if(!St)return;const t=Object.keys(st).length;st[e]=X0(e,s.name,t),qr(),Nd(Ud(),!0,Pd().roomCode)}function tA(s){St&&(st[s]&&(st[s].ready=!0),qr(),nx())}function qr(){Yi(Gt.players(Ud()))}function nx(){if(!St)return;const s=Object.values(st);s.length<1||s.every(e=>e.ready)&&nA()}function nA(){if(!St)return;Ti={},Pt=bt.BETTING;const s=Object.values(st).map(n=>({id:n.id,name:n.name,color:n.color,bankroll:n.bankroll,hasBet:!1})),e=Date.now(),t=e+qp;$s=s,Yi(Gt.betPhase(s,t,e)),clearTimeout(Br),Br=setTimeout(()=>sx(),qp)}function iA(){if(!St)return;const s=Object.values(st).map(e=>({id:e.id,name:e.name,color:e.color,bankroll:e.bankroll,hasBet:Ti[e.id]!=null}));$s=s,Yi(Gt.betPhase(s,void 0,void 0))}function sA(s,e){if(!St||Pt!==bt.BETTING)return;const t=Number(s.amount);Number.isFinite(t)&&ix(e,t)}function ix(s,e){if(Pt!==bt.BETTING)return;const t=st[s];if(!t||e<10||e>t.bankroll)return;Ti[s]=e,iA();const n=Object.keys(st);n.length>0&&n.every(i=>Ti[i]!=null)&&(clearTimeout(Br),Br=null,sx())}function sx(){if(!St)return;clearTimeout(Br),Br=null;const s={...Ti};if(Object.keys(s).length===0){rA();return}Yi(Gt.betConfirmed(s)),aA(s)}function rA(){Pt=bt.LOBBY,Ti={};for(const s of Object.values(st))s.ready=!1;qr(),J0()}function oA(s){return{turnTimerMs:Iu,voltageRates:s.voltageRates,trapDensity:s.trapDensity}}function aA(s){const e=(Date.now()^Math.random()*2147483647)>>>0,t={...ca,...q0,turnTimerMs:Iu};In=I1(e,t);const n=Object.keys(s),i=O1(In,n.length),r=n.map((l,c)=>{const h=st[l],u=s[l];return h.bankroll-=u,h.bet=u,B1(h,i[c]),{id:l,name:h.name,color:h.color,startTileId:i[c],bankroll:h.bankroll}}),o={};n.forEach(l=>{o[l]=st[l]}),st=o,zt=G1({broadcast:Yi,turnTimerMs:Iu,revealDelayMs:2500,getMatchNumber:()=>vc}),zt.init(In,st,t,s);const a=oA(t);Yi(Gt.gameStart({seed:e,board:In,playerOrder:r,bets:s,config:a})),zt.beginTurn()}function lA(s){s.playerList&&($s=s.playerList,s.timerDeadline!=null&&(Pt=bt.BETTING,Z0({playerList:s.playerList,timerDeadline:s.timerDeadline,hostTimestamp:s.hostTimestamp??Date.now()})),K0(s.playerList))}function rx(){var e;if(St)return((e=st[Mt])==null?void 0:e.bankroll)??Ko;const s=$s.find(t=>t.id===Mt);return(s==null?void 0:s.bankroll)??Ko}function cA(s){var t;In=s.board,q0={...ca,...s.config??{}},Pt=bt.PLAYING,Pw(In,Mw());const e=s.bets||{};if(!St&&Mt){const n=(t=s.playerOrder)==null?void 0:t.find(i=>i.id===Mt);n&&typeof n.bankroll=="number"&&(yc=n.bankroll)}pT(s.playerOrder,Mt,e),$0()}function hA(s){var n;const e=(n=s.activePlayers)==null?void 0:n.find(i=>i.id===Mt),t=e&&In?U1(In,e.currentTileId):[];mT(t,s.timerDeadline)}function uA(s,e){!St||!zt||zt.handleMove(e,s.tileId,s.action)}function dA(s){gT(s.results,s.newlyRevealedTiles)}function fA(s){if(Pt=bt.ENDED,St&&s.results)for(const e of s.results){const t=st[e.id];t&&e.status==="cashed_out"&&(e.payout??0)>0&&(t.bankroll+=e.payout)}else if(!St&&s.results&&Mt){const e=s.results.find(t=>t.id===Mt);(e==null?void 0:e.status)==="cashed_out"&&(e.payout??0)>0&&(yc+=e.payout)}xT(s.results,s.leaderboard,s.roundNumber??1)}function pA(){Pt=bt.LOBBY,Ti={},$s=[],zt==null||zt.destroy(),zt=null,In=null,j0()}function mA(s){if(!St||!st[s])return;const e=st[s];e.connected=!1,(k1(e)||Pt!==bt.PLAYING)&&delete st[s],(Pt===bt.LOBBY||Pt===bt.ENDED||Pt===bt.BETTING)&&qr(),console.log("[Orch] Player disconnected:",s)}function Ud(){return Object.values(st).map(s=>({id:s.id,name:s.name,ready:!!s.ready,color:s.color}))}window.THREE=pw;const ha=document.getElementById("canvas"),Od=document.getElementById("hud"),Bn=document.getElementById("app"),{scene:bc,camera:Fd}=_w(ha);bT(bc);Iw(bc);Hw(bc);Kw(bc);const ox=new EventTarget;sT(ox);let xt=null,vs=null;const ul=b1(Bn);W1(ox,{onGameStart:()=>{ul.hide(),Ir(),_h(),xt==null||xt.hide()},onPlayersUpdate:s=>xt==null?void 0:xt.updatePlayers(s),onLobbyUpdate:s=>xt==null?void 0:xt.updatePlayers(s),onBettingPhaseStart:({playerList:s,timerDeadline:e})=>{xt==null||xt.hide(),ul.show(),KT(),Hi(),XT(s,Z1()),zT(e)},onBettingPhaseUpdate:s=>{qT(s),Hi()},onBettingAbortedToLobby:()=>{ul.hide(),Ir(),_h(),xt==null||xt.show()},onRematchLobby:()=>{Pp(),vs==null||vs.hide(),ul.hide(),Ir(),_h(),xt==null||xt.show()},onLeaveRoom:()=>{Pp(),vs==null||vs.hide(),xt==null||xt.resetToEntry()}});xt=o1(Bn,{onCreate:s=>X1(s),onJoin:(s,e)=>q1(s,e),onReady:()=>Y1()});let Yp=!1;function ax(){Yp||(Yp=!0,tT())}ha.addEventListener("pointerup",s=>{ax();const{x:e,y:t}=lx(s);rT({x:e,y:t},Fd)});let wh=!1;ha.addEventListener("pointermove",s=>{ax(),!wh&&(wh=!0,requestAnimationFrame(()=>{wh=!1;const{x:e,y:t}=lx(s);oT({x:e,y:t},Fd)}))});function lx(s){const e=ha.getBoundingClientRect();return{x:(s.clientX-e.left)/e.width*2-1,y:-((s.clientY-e.top)/e.height)*2+1}}Object.assign(Od.style,{position:"absolute",inset:"0",zIndex:"330",pointerEvents:"none",display:"grid",gridTemplateColumns:"180px 1fr",gridTemplateRows:"1fr",padding:"14px",gap:"0",boxSizing:"border-box"});function cx(s="flex-start"){const e=document.createElement("div");return Object.assign(e.style,{display:"flex",flexDirection:"column",gap:"10px",justifyContent:s,pointerEvents:"none",minWidth:"0"}),e}const Bd=cx("flex-start"),hx=cx("flex-start");Od.appendChild(Bd);Od.appendChild(hx);WT(Bd);const ua=document.createElement("div");ua.id="cs-bet-cashout-shell";Object.assign(ua.style,{display:"flex",flexDirection:"column",gap:"0",background:"rgba(6, 14, 28, 0.92)",backdropFilter:"blur(14px)",border:"1px solid rgba(0, 201, 167, 0.30)",borderRadius:"12px",boxShadow:"0 0 40px rgba(0,0,0,0.5), 0 0 20px rgba(0,201,167,0.06)",overflow:"hidden",pointerEvents:"auto"});Bd.appendChild(ua);const ux=document.createElement("style");ux.textContent=`
  #cs-bet-cashout-shell #cs-bet,
  #cs-bet-cashout-shell #cs-cashout {
    background: none !important;
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    backdrop-filter: none !important;
  }
  #cs-bet-cashout-shell #cs-bet {
    border-bottom: 1px solid rgba(255,255,255,0.08) !important;
  }
`;document.head.appendChild(ux);YT(ua,{submitBet:s=>$1(s),isBettingPhase:()=>ex()===bt.BETTING,getBankroll:()=>J1()});VT(ua,{getBet:JT});const zd=document.createElement("div");Object.assign(zd.style,{position:"fixed",top:"14px",left:"50%",transform:"translateX(-50%)",display:"flex",justifyContent:"center",pointerEvents:"none",zIndex:"340"});Bn.appendChild(zd);BT(zd,{onLock:GT});const gA=3;let Hn=0;const zn=document.createElement("div");zn.id="cs-idle-bar";Object.assign(zn.style,{position:"fixed",top:"138px",left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:"5px",background:"rgba(6,14,28,0.88)",backdropFilter:"blur(10px)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px",padding:"7px 14px",zIndex:"340",pointerEvents:"none",opacity:"0",transition:"opacity 0.3s",minWidth:"160px"});zn.innerHTML=`
  <div id="cs-idle-label" style="
    font-family:'Rajdhani',sans-serif;font-size:10px;font-weight:700;
    letter-spacing:0.18em;text-transform:uppercase;color:#f59e0b;text-align:center">
    IDLE BUST RISK
  </div>
  <div style="display:flex;gap:5px;justify-content:center">
    <div class="cs-idle-pip" data-pip="1"></div>
    <div class="cs-idle-pip" data-pip="2"></div>
    <div class="cs-idle-pip" data-pip="3"></div>
  </div>
  <div id="cs-idle-warn" style="
    font-family:'Rajdhani',sans-serif;font-size:10px;font-weight:600;
    color:#94a3b8;text-align:center;letter-spacing:0.06em">
    LET TURN TIMER EXPIRE 3× WITHOUT MOVING → BUST
  </div>
`;const dx=document.createElement("style");dx.textContent=`
  .cs-idle-pip {
    width: 32px; height: 8px; border-radius: 4px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    transition: background 0.3s, box-shadow 0.3s;
  }
  .cs-idle-pip.active-1 { background:#f59e0b; box-shadow:0 0 6px #f59e0b; border-color:#f59e0b; }
  .cs-idle-pip.active-2 { background:#f97316; box-shadow:0 0 6px #f97316; border-color:#f97316; }
  .cs-idle-pip.active-3 { background:#ef4444; box-shadow:0 0 8px #ef4444; border-color:#ef4444; }
`;document.head.appendChild(dx);Bn.appendChild(zn);const xA=zn.querySelectorAll(".cs-idle-pip"),Th=zn.querySelector("#cs-idle-label"),yr=zn.querySelector("#cs-idle-warn");function Mc(){xA.forEach((s,e)=>{s.className="cs-idle-pip",e<Hn&&s.classList.add(`active-${Hn}`)}),Hn===0?(yr.textContent="LET TURN TIMER EXPIRE 3× WITHOUT MOVING → BUST",yr.style.color="#94a3b8",Th.style.color="#f59e0b"):Hn===1?(yr.textContent="2 MORE IDLE TURNS → BUST",yr.style.color="#f59e0b",Th.style.color="#f59e0b"):Hn===2&&(yr.textContent="1 MORE IDLE TURN → BUST!",yr.style.color="#f97316",Th.style.color="#f97316")}qe("onRoundStart",()=>{Hn=0,zn.style.opacity="0",Mc()});qe("onIdleStrikes",({count:s})=>{Hn=Math.min(Math.max(0,s|0),gA),zn.style.opacity=Hn>0?"1":"0",Mc()});qe("onBust",({playerId:s})=>{s===Dn()&&(Hn=0,zn.style.opacity="0",Mc())});qe("onCashout",({playerId:s})=>{s===Dn()&&(Hn=0,zn.style.opacity="0",Mc())});const _A={safe:{label:"SAFE ZONE",range:"1.0× – 1.5×",risk:"Low Risk",color:"#00c9a7",icon:"◎"},charged:{label:"CHARGED ZONE",range:"1.5× – 2.5×",risk:"Medium Risk",color:"#f59e0b",icon:"⚡"},critical:{label:"CRITICAL ZONE",range:"2.5× – 3.0×",risk:"High Risk",color:"#ef4444",icon:"☢"}},zr=document.createElement("div");zr.id="cs-tile-info";Object.assign(zr.style,{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flex:"1",pointerEvents:"none",opacity:"0",transition:"opacity 0.25s ease"});hx.appendChild(zr);const Zs=document.createElement("div");Object.assign(Zs.style,{background:"rgba(6, 14, 28, 0.88)",backdropFilter:"blur(10px)",border:"1px solid rgba(0,201,167,0.25)",borderRadius:"10px",padding:"16px 24px",display:"flex",flexDirection:"column",alignItems:"center",gap:"6px",minWidth:"200px",textAlign:"center",transition:"border-color 0.25s"});zr.appendChild(Zs);Zs.innerHTML=`
  <div id="cs-ti-zone"  style="font-family:'Rajdhani',sans-serif;font-size:20px;font-weight:700;letter-spacing:0.1em;line-height:1.1"></div>
  <div id="cs-ti-range" style="font-family:'Rajdhani',sans-serif;font-size:18px;font-weight:700;color:#e2e8f0"></div>
  <div id="cs-ti-risk"  style="font-family:'Rajdhani',sans-serif;font-size:15px;font-weight:600;text-transform:uppercase"></div>
  <div style="font-family:'Rajdhani',sans-serif;font-size:13px;font-weight:600;color:#94a3b8;
       border-top:1px solid rgba(255,255,255,0.08);padding-top:8px;margin-top:2px;width:100%">
    Higher risk = bigger multiplier
  </div>
`;const Ah=Zs.querySelector("#cs-ti-zone"),$p=Zs.querySelector("#cs-ti-range"),Zp=Zs.querySelector("#cs-ti-risk");Tw(({zone:s})=>{if(!s){zr.style.opacity="0";return}const e=_A[s];Ah.textContent=`${e.icon}  ${e.label}`,Ah.style.color=e.color,Ah.style.textShadow=`0 0 10px ${e.color}`,Zs.style.borderColor=`${e.color}55`,$p.textContent=e.range,$p.style.color=e.color,Zp.textContent=e.risk,Zp.style.color=e.color,zr.style.opacity="1"});const wn=document.createElement("div");wn.id="cs-zone-pill";Object.assign(wn.style,{position:"fixed",bottom:"22px",left:"50%",transform:"translateX(-50%)",display:"flex",alignItems:"center",gap:"10px",background:"rgba(6, 14, 28, 0.88)",backdropFilter:"blur(10px)",border:"1px solid rgba(0,201,167,0.35)",borderRadius:"50px",padding:"10px 24px",zIndex:"150",pointerEvents:"none",opacity:"0",transition:"opacity 0.3s, border-color 0.3s"});wn.innerHTML=`
  <div id="cs-zp-dot" style="width:10px;height:10px;border-radius:50%;background:#00c9a7;
       box-shadow:0 0 8px #00c9a7;flex-shrink:0"></div>
  <div id="cs-zp-label" style="font-family:'Rajdhani',sans-serif;font-size:20px;font-weight:700;
       letter-spacing:0.12em;color:#00c9a7;text-shadow:0 0 10px #00c9a7"></div>
  <div id="cs-zp-mult" style="font-family:'Rajdhani',sans-serif;font-size:18px;font-weight:600;
       color:#e2e8f0;letter-spacing:0.06em"></div>
`;Bn.appendChild(wn);const Kp=wn.querySelector("#cs-zp-dot"),Rh=wn.querySelector("#cs-zp-label"),yA=wn.querySelector("#cs-zp-mult"),vA={safe:"#00c9a7",charged:"#f59e0b",critical:"#ef4444"},bA={safe:"SAFE ZONE",charged:"CHARGED ZONE",critical:"CRITICAL ZONE"};qe("onRoundStart",()=>{fx("safe",1),wn.style.opacity="1"});qe("onReveal",({playerId:s,voltage:e,type:t})=>{s===Dn()&&fx(t==="safe"?"safe":t==="trap"?"critical":"charged",e)});qe("onBust",({playerId:s})=>{s===Dn()&&(wn.style.opacity="0")});qe("onCashout",({playerId:s})=>{s===Dn()&&(wn.style.opacity="0")});qe("onRoundEnd",()=>{wn.style.opacity="0"});function fx(s,e){const t=vA[s]??"#00c9a7";Kp.style.background=t,Kp.style.boxShadow=`0 0 8px ${t}`,Rh.textContent=bA[s]??"SAFE ZONE",Rh.style.color=t,Rh.style.textShadow=`0 0 10px ${t}`,yA.textContent=`×${e.toFixed(1)}`,wn.style.borderColor=`${t}55`}const da=document.createElement("div");da.id="cs-side-panel";Object.assign(da.style,{position:"fixed",right:"14px",top:"14px",width:"200px",display:"flex",flexDirection:"column",gap:"0",background:"rgba(6, 14, 28, 0.92)",backdropFilter:"blur(14px)",border:"1px solid rgba(0, 201, 167, 0.30)",borderRadius:"12px",boxShadow:"0 0 40px rgba(0,0,0,0.5), 0 0 20px rgba(0,201,167,0.06)",zIndex:"330",pointerEvents:"none",overflow:"hidden"});const px=document.createElement("style");px.textContent=`
  #cs-side-panel #cs-overview,
  #cs-side-panel #cs-voltage {
    background: none !important;
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    backdrop-filter: none !important;
  }
  #cs-side-panel #cs-overview {
    border-bottom: 1px solid rgba(255,255,255,0.08) !important;
  }
`;document.head.appendChild(px);t1(da);AT(da);Bn.appendChild(da);vs=d1(Bn,{getIsHost:K1,onHostStartNewGame:()=>j1(),onLeaveRoom:()=>tx()});x1(Bn);T1(Bn);const MA=3600;let Bl=null;const kd=C1(Bn,{onSpectate:()=>{},onLeave:()=>tx()});qe("onBust",({playerId:s})=>{s===Dn()&&(clearTimeout(Bl),Bl=setTimeout(()=>{ex()===bt.PLAYING&&kd.show()},MA))});qe("onRoundEnd",()=>{clearTimeout(Bl),kd.hide()});qe("onRoundStart",()=>{clearTimeout(Bl),kd.hide()});const di=document.createElement("div");di.id="cs-pos-label";di.textContent="CURRENT POS.";Object.assign(di.style,{position:"absolute",pointerEvents:"none",fontFamily:"'Rajdhani', sans-serif",fontSize:"13px",fontWeight:"600",letterSpacing:"0.1em",color:"#38bdf8",textShadow:"0 0 8px #38bdf8",background:"rgba(6,14,28,0.75)",border:"1px solid rgba(56,189,248,0.3)",borderRadius:"4px",padding:"3px 8px",whiteSpace:"nowrap",display:"none",transform:"translate(-50%, -220%)"});Bn.appendChild(di);const lo=new R;function SA(){const s=T0(),e=Dn(),t=s.get(e);if(!t){di.style.display="none";return}if(lo.copy(t),lo.project(Fd),lo.z>1){di.style.display="none";return}const n=ha.getBoundingClientRect();di.style.display="block",di.style.left=`${(lo.x+1)/2*n.width+n.left}px`,di.style.top=`${(-lo.y+1)/2*n.height+n.top}px`}function mx(s){MT(),Lw(s),jw(s),n1(),SA(),bw(),requestAnimationFrame(mx)}requestAnimationFrame(mx);
