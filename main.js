(()=>{"use strict";class e{constructor(e,t="div",s,n="",a){const i=document.createElement(t);Array.isArray(s)&&s.forEach((e=>i.classList.add(e))),"string"==typeof s&&(i.className=s),i.textContent=n,e&&e.append(i),a&&a.forEach((e=>i.setAttribute(e.name,e.value))),this.node=i}destroy(){this.node.remove()}}class t{constructor(){this._navLists=["main","about"],this.navItems=[],this.node=document.createElement("nav"),this.node.className="nav",this._ul=new e(this.node,"ul","nav__list","",null),this._navLists.forEach(((t,s)=>{const n=new e(this._ul.node,"li","nav__list__item",t,null),a=0===s?"#/":`#/${t}`;new e(n.node,"a","nav__list__item__link","",[{name:"href",value:a}]),this.navItems.push(n.node)}))}}class s{constructor(){this.navItems=[],this.node=document.createElement("header"),this.node.classList.add("header"),this._nav=new t,this.navItems=this._nav.navItems,this.node.appendChild(this._nav.node)}selectCurrentPage(e){switch(this.navItems.forEach((e=>e.classList.remove("active"))),e){case"/":this.navItems[0].classList.add("active");break;case"/about":this.navItems[1].classList.add("active")}}}class n{constructor(){this.node=document.createElement("footer"),this.node.classList.add("footer"),this.node.textContent="footer"}}class a{constructor(){this.name="main-page",this.destroy=()=>{this.page.node.remove()},this.page=new e(null,"div",this.name,"",null),this.title=new e(this.page.node,"h2",`${this.name}__title`,this.name,null),this.audio=new e(this.page.node,"audio-player","custom","",[{name:"playButtonSize",value:"20"}])}}let i=0;class o{constructor(){this.name="about-page",this.destroy=()=>{this.page.node.remove()},this.page=new e(null,"div","about-page","",null),this.page.node.id=(i++).toString(),this._title=new e(this.page.node,"h2","about-page__title",this.name,null)}}class l{constructor(){this.name="not-found-page",this.destroy=()=>{this.page.node.remove()},this.page=new e(null,"div",this.name,"",null),this._title=new e(this.page.node,"h2",`${this.name}__title`,this.name,null)}}const r=new class{constructor(){this._currentPage=null,this._body=document.querySelector("body"),this._wrapper=new e(this._body,"div","wrapper","",null),this._header=new s,this._footer=new n,this.main=new e(null,"main","main","",null),this._wrapper.node.append(this._header.node,this.main.node,this._footer.node)}addPage(e){this._header.selectCurrentPage(e);let t=null;switch(e){case"/":t=new a;break;case"/about":t=new o;break;default:t=new l}this._currentPage=t,this.main.node.appendChild(t.page.node)}removePage(){null!==this._currentPage&&this._currentPage.destroy()}};class h extends HTMLElement{constructor(){super(),this.audio=new Audio,this.isPlay=!1,this.audio.src="assets/audio/Christmas_Time_-_Jingle_Bell_Rock_(musmore.com).mp3"}get playButtonSize(){return+this.getAttribute("playButtonSize")}set playButtonSize(e){this.setAttribute("playButtonSize",e.toString())}connectedCallback(){this.container=new e(this,"section","audio-palayer","",null),this.playButton=new e(this.container.node,"button","audio-palayer__button","+",null),this.playButton.node.onclick=()=>this.play()}disconnectedCallback(){}attributeChangedCallback(e,t,s){}update(){}play(){this.isPlay?this.audio.pause():this.audio.play(),this.isPlay=!this.isPlay}}h.observedAttributes=["playButtonSize"],customElements.define("audio-player",h);let u=null;const d=new class{constructor(e){this.route=()=>{const e=this.parseRequestURL();return this.routes.filter((t=>t==e))[0]},this.parseRequestURL=()=>{let e=(location.hash.slice(1).toLowerCase()||"/").split("/"),t={resource:null,id:null,verb:null};return t.resource=e[1],t.id=e[2],t.verb=e[3],(t.resource?"/"+t.resource:"/")+(t.id?"/:id":"")+(t.verb?"/"+t.verb:"")},this.routes=e,this.notFound=new l}}(["/","/about"]),c=()=>{const e=d.route();u=e,r.addPage(e)};window.onload=()=>{c()},window.addEventListener("hashchange",(()=>{r.removePage(),c()}))})();
//# sourceMappingURL=main.js.map