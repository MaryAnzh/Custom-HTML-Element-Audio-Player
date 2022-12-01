(()=>{"use strict";class t{constructor(t,e="div",s="",i="",n=null){const a=document.createElement(e);Array.isArray(s)&&s.forEach((t=>a.classList.add(t))),"string"==typeof s&&(a.className=s),a.textContent=i,t&&t.append(a),n&&n.forEach((t=>a.setAttribute(t.name,t.value))),this.node=a}destroy(){this.node.remove()}}class e extends t{constructor(){super(null,"nav","nav"),this._navLists=[{name:"main",key:"MAIN"},{name:"about",key:"ABOUT"}],this.perentKey="NAV",this.navItems=[],this._ul=new t(this.node,"ul","nav__list","",null),this._navLists.forEach(((e,s)=>{const i=new t(this._ul.node,"li","nav__list__item","",null),n=0===s?"#/":`#/${e.name}`,a=new t(i.node,"a","nav__list__item__link","",[{name:"href",value:n}]);this.navItems.push({element:a.node,perentKey:this.perentKey,elementKey:e.key})}))}translate(t){this.navItems.forEach((e=>{const s=e.elementKey,i=t.NAV[s];e.element.textContent=i}))}}class s extends t{constructor(s){super(null,"header","header"),this.navItems=[],this.langs=s,this.container=new t(this.node,"div","container"),this._nav=new e,this.navItems=this._nav.navItems,this.container.node.appendChild(this._nav.node),this.langsWrap=new t(this.container.node,"div","container__langs"),this.langs.forEach(((e,s)=>{const i=new t(this.langsWrap.node,"div","header__langs__item"),n=new t(i.node,"input","header__langs__item__input","",[{name:"name",value:"lang"},{name:"id",value:`${e}`},{name:"type",value:"radio"}]);n.node.onchange=()=>this.onChange(e),0===s&&(n.node.checked=!0),new t(i.node,"label","header__langs__item__label",e,[{name:"for",value:`${e}`}])}))}translate(t){this._nav.translate(t)}selectCurrentPage(t){switch(this.navItems.forEach((t=>t.element.classList.remove("active"))),t){case"/":this.navItems[0].element.classList.add("active");break;case"/about":this.navItems[1].element.classList.add("active")}}}class i{constructor(){this.node=document.createElement("footer"),this.node.classList.add("footer"),this.node.textContent="footer"}}const n=[{title:"Jingle Bell Rock",src:"assets/audio/Christmas_Time_-_Jingle_Bell_Rock_(musmore.com).mp3"},{title:"Jingle Bells",src:"assets/audio/Jingle Bells - Christmas Songs.mp3"},{title:"Happy New Year",src:"assets/audio/Happy New Year.mp3"}];class a extends t{constructor(){super(null,"div",["main-page","page"]),this.name="main-page",this.perentKey="MAIN",this.playList=n,this.destroy=()=>{this.node.remove()},this.title=new t(this.node,"h2","main-page__title","Custom HTML Element"),this.audio=document.createElement("audio-player"),this.audio.classList.add("main-page__audio-player"),this.node.appendChild(this.audio),this.audio.playList=n}translate(t){this.title.node.textContent=t.MAIN.TITLE}}class o extends t{constructor(){super(null,"div",["about-page","page"]),this.name="about-page",this.destroy=()=>{this.node.remove()},this._title=new t(this.node,"h2","about-page__title",this.name,null)}translate(t){}}class l extends t{constructor(){super(null,"div",["not-found","page"]),this.name="not-found-page",this.destroy=()=>{this.node.remove()},this._title=new t(this.node,"h2",`${this.name}__title`,this.name)}translate(t){}}const r={NAV:{MAIN:"main",ABOUT:"about"},MAIN:{TITLE:"Custom HTML Element"}},d={NAV:{MAIN:"главная",ABOUT:"о проекте"},MAIN:{TITLE:"Пользовательский HTML элемент"}},h={NAV:{MAIN:"галоўная",ABOUT:"аб праекце"},MAIN:{TITLE:"Спецыялізаваны элемент кіравання"}};class u{constructor(){this.listeners=[]}add(t){this.listeners.push(t)}emit(t){this.listeners.forEach((e=>e(t)))}remove(t){this.listeners=this.listeners.filter((e=>e!==t))}}const c=new class{constructor(){this.onChange=new u,this.langs=["en","ru","by"],this._lang="en"}get lang(){return this._lang}set lang(t){this._lang=t,this.onChange.emit(this.translate(t))}translate(t){switch(t){case"ru":return d;case"by":return h;default:return r}}},m=new class extends t{constructor(){super(document.body,"div","wrapper"),this.currentPage=null,this.translate=t=>{this.header.translate(t),this.currentPage&&this.currentPage.translate(t)},this.header=new s(c.langs),this.footer=new i,this.main=new t(null,"main","main","",null),this.node.append(this.header.node,this.main.node,this.footer.node),this.header.onChange=t=>{c.lang=t},c.onChange.add(this.translate)}addPage(t){console.log("Рисуем страницу"),this.header.selectCurrentPage(t);let e=null;switch(t){case"/":e=new a;break;case"/about":e=new o;break;default:e=new l}this.currentPage=e,this.main.node.appendChild(e.node),this.translate(c.translate(c.lang))}removePage(){null!==this.currentPage&&this.currentPage.destroy()}destroy(){c.onChange.remove(this.translate),super.destroy()}};class _ extends HTMLElement{constructor(){super(),this.audio=new Audio,this.currwntAudioInfo=null,this.waitListItems=[],this.playListItems=[],this.isPlay=!1,this.onClick=t=>{t.icon.onclick=null,t.list.destroy();const e=t.item;e.time=t.time,this.playListItems.push(e),this.waitListItems=this.waitListItems.filter((e=>e!==t)),this.addAudioItem(this.playListUl.node,t.item)},this.onClickPlay=(t,e)=>{this.audio===e?this.play():(this.isPlay&&(this.audio.pause(),this.audio.currentTime=0),this.currwntAudioInfo=t,this.audio=e,this.update(),this.audio.play(),this.isPlay=!0)}}get playList(){return JSON.parse(this.getAttribute("playList"))}set playList(t){this.setAttribute("playList",JSON.stringify(t))}connectedCallback(){this.container=new t(this,"section","audio-player"),this.controls=new t(this.container.node,"div","audio-player__controls"),this.playButton=new t(this.controls.node,"button","audio-player__controls__button","+"),this.playButton.node.onclick=()=>this.play(),this.timeBar=new t(this.controls.node,"div","audio-player__controls__time-bar"),this.timeBarRunner=new t(this.timeBar.node,"div","audio-player__controls__time-bar__runner"),this.times=new t(this.controls.node,"div","audio-player__controls__times"),this.timesTimer=new t(this.times.node,"p","audio-player__controls__times__timer","00:00"),this.timesAudioTime=new t(this.times.node,"p","audio-player__controls__times__audio-time","00:00"),this.soundBar=new t(this.controls.node,"div","audio-player__controls__sound-bar"),this.soundBarRunner=new t(this.soundBar.node,"div","audio-player__controls__sound-bar__runner"),this.lists=new t(this.container.node,"div","audio-player__lists"),this.playListWrap=new t(this.lists.node,"div",["audio-player__lists__play-list","list"]),this.playListTitle=new t(this.playListWrap.node,"h4","list__title","Play List"),this.playListUl=new t(this.playListWrap.node,"ul","audio-player__lists__play-list__list"),this.waitingList=new t(this.lists.node,"h3",["audio-player__lists__waiting-list","list"]),this.waitingListTitle=new t(this.waitingList.node,"h4","list__title","Waiting list"),this.addWaitAudioList(this.waitingList.node,this.playList)}disconnectedCallback(){}attributeChangedCallback(t,e,s){}addWaitAudioList(e,s){const i=new t(e,"ul","items-list");s.forEach(((t,e)=>{this.addWaitAudioItem(i.node,t,e)}))}addWaitAudioItem(e,s,i){const n=new t(e,"li","items-list__item"),a=new Audio;a.src=s.src;const o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.setAttribute("viewBox","0 0 30 15.7"),o.innerHTML='<path d="M29.7,1.4l-14,14c-0.4,0.4-1,0.4-1.4,0l-14-14c-0.4-0.4-0.4-1,0-1.4h29.4C30.1,0.4,30.1,1,29.7,1.4z"/>\n        ',n.node.appendChild(o);const l=new t(n.node,"div","items-list__item__info"),r=(new t(l.node,"p","",s.title),new t(l.node,"p",""));let d=0;a.onloadedmetadata=()=>{d=a.duration,r.node.textContent=this.viewTime(d),a.onloadedmetadata=null};const h={item:s,icon:o,list:n,time:d};this.waitListItems.push(h),o.onclick=()=>this.onClick(h)}addAudioItem(e,s){const i=new t(e,"li","play-list-item"),n=new Audio;n.src=s.src;const a=new t(i.node,"div","play-list-item__icon"),o=new t(i.node,"div","play-list-item__info"),l=(new t(o.node,"p","",s.title),s.time?this.viewTime(s.time):""),r=(new t(o.node,"p","",l),document.createElementNS("http://www.w3.org/2000/svg","svg"));r.setAttribute("viewBox","0 0 30 15.7"),r.innerHTML='<path d="M29.7,1.4l-14,14c-0.4,0.4-1,0.4-1.4,0l-14-14c-0.4-0.4-0.4-1,0-1.4h29.4C30.1,0.4,30.1,1,29.7,1.4z"/>\n        ',i.node.appendChild(r),a.node.onclick=()=>this.onClickPlay(s,n)}update(){}play(){this.isPlay?this.audio.pause():this.audio.play(),this.isPlay=!this.isPlay}viewTime(t){const e=1e3*t;let s=Math.floor(e/1e3/60),i=Math.floor((e-1e3*s*60)/1e3);return i>59&&(s+=1,i-=60),(s<10?`0${s}`:s)+":"+(i<10?`0${i}`:i)}}_.observedAttributes=["playList"],customElements.define("audio-player",_);let p=null;const w=new class{constructor(t){this.route=()=>{const t=this.parseRequestURL();return this.routes.filter((e=>e==t))[0]},this.parseRequestURL=()=>{let t=(location.hash.slice(1).toLowerCase()||"/").split("/"),e={resource:null,id:null,verb:null};return e.resource=t[1],e.id=t[2],e.verb=t[3],(e.resource?"/"+e.resource:"/")+(e.id?"/:id":"")+(e.verb?"/"+e.verb:"")},this.routes=t,this.notFound=new l}}(["/","/about"]),y=()=>{const t=w.route();p=t,m.addPage(t)};window.onload=()=>{y()},window.addEventListener("hashchange",(()=>{m.removePage(),y()}))})();
//# sourceMappingURL=main.js.map