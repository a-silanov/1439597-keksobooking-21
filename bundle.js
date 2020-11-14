(()=>{"use strict";window.utils={invokeIfKeyIs:(e,t)=>o=>o.key===e&&t(o),invokeIfButtonIs:(e,t)=>o=>o.button===e&&t(o),getTruncatedArray:(e,t)=>(e=>{for(let t=e.length-1;t>0;t--){const o=Math.floor(Math.random()*(t+1));[e[t],e[o]]=[e[o],e[t]]}return e})(e).slice(0,t),removeArray:e=>e.forEach((e=>e.remove()))},window.debounce=e=>{let t=null;return(...o)=>{t&&window.clearTimeout(t),t=window.setTimeout((()=>{e(...o)}),500)}},(()=>{const e="GET",t="POST",o="https://21.javascript.pages.academy/keksobooking/data",r="https://21.javascript.pages.academy/keksobooking",n=(e,t,o,r,n)=>{const a=new XMLHttpRequest;a.responseType="json",a.addEventListener("load",(()=>{200===a.status?e(a.response):t("Произошла ошибка "+a.status+a.statusText)})),a.addEventListener("error",(()=>{t("Произошла ошибка соединения")})),a.addEventListener("timeout",(()=>{t("Запрос не успел выполниться за 1000 мс")})),a.timeout=1e3,a.open(o,r),a.send(n)};window.backend={download:(t,r)=>n(t,r,e,o),upload:(e,o,a)=>n(e,o,t,r,a)}})(),(()=>{const e=document.querySelector("#success").content.querySelector(".success"),t=document.querySelector("#error").content.querySelector(".error"),o=o=>{const r=document.createDocumentFragment();let n="";n="success"===o?e.cloneNode(!0):t.cloneNode(!0),r.appendChild(n),document.querySelector("main").appendChild(r)},r=()=>{document.querySelector(".success")?document.querySelector(".success").remove():document.querySelector(".error").remove(),document.removeEventListener("click",r),document.removeEventListener("keydown",n)},n=window.utils.invokeIfKeyIs("Escape",r);window.messageHandler={onDownloadError:e=>{o("error"),document.querySelector(".error__message").textContent=e,document.addEventListener("click",r),document.addEventListener("keydown",n)},show:e=>{o(""+e),document.addEventListener("click",r),document.addEventListener("keydown",n),document.querySelector(".error__button")&&document.querySelector(".error__button").addEventListener("click",r)}}})(),(()=>{const e=document.querySelector(".map"),t=document.querySelector(".ad-form"),o=e.querySelector(".map__filters"),r=Array.from(t.querySelectorAll(".ad-form__element, .ad-form-header")),n=Array.from(e.querySelectorAll(".map__filter, .map__features")),a=Array.from(e.querySelectorAll(".map__checkbox")),d=e.querySelector(".map__pin--main"),i=(e,t)=>{e.forEach((e=>{e.disabled=!t}))},s=e=>{window.elementsRender.renderAllPins(e),window.advertsList=e},c=()=>{window.backend.download(s,window.messageHandler.onDownloadError),e.classList.remove("map--faded"),t.classList.remove("ad-form--disabled"),o.classList.remove("map__filters--disabled"),i(n,!0),i(r,!0),i(a,!0),d.removeEventListener("mousedown",u),d.removeEventListener("keydown",l)},u=window.utils.invokeIfButtonIs(0,c),l=window.utils.invokeIfKeyIs("Enter",c);window.pageMode={activate:c,deactivate:()=>{i(r,!1),i(n,!1),i(a,!1),e.classList.add("map--faded"),o.classList.add("map__filters--disabled"),t.classList.add("ad-form--disabled"),window.pinMove.setAddress(),d.addEventListener("mousedown",u),d.addEventListener("keydown",l)},reset:()=>{t.reset(),window.photoUpload.reset(),window.filterAdverts.resetFilter(),window.pinMove.setDefualtPosition(),window.pinMove.setAddress(),window.utils.removeArray(Array.from(e.querySelectorAll(".map__pin:not(.map__pin--main)"))),window.cardPopup.close()}}})(),(()=>{const e={flat:"Квартира",bungalow:"Бунгало",house:"Дом",palace:"Дворец"},t={wifi:"popup__feature--wifi",dishwasher:"popup__feature--dishwasher",parking:"popup__feature--parking",washer:"popup__feature--washer",elevator:"popup__feature--elevator",conditioner:"popup__feature--conditioner"},o="img",r="45",n="40",a="Фотография жилья",d=document.querySelector("#pin").content.querySelector(".map__pin"),i=document.querySelector("#card").content.querySelector(".map__card"),s=document.querySelector(".map"),c=s.querySelector(".map__filters-container"),u=s.querySelector(".map__pins"),l=(e,t,o,r)=>{void 0!==r?e.querySelector(t)[o]=r:e.querySelector(t).style.display="none"},m=e=>{const t=d.cloneNode(!0);return t.style=`top: ${e.location.y-70}px; left: ${e.location.x-25}px`,l(t,"img","src",""+e.author.avatar),l(t,"img","alt",""+e.offer.title),t},p=d=>{const s=i.cloneNode(!0);return window.utils.removeArray(Array.from(s.querySelectorAll(".popup__feature"))),s.querySelector(".popup__photo").remove(),l(s,".popup__avatar","src",""+d.author.avatar),l(s,".popup__title","textContent",""+d.offer.title),l(s,".popup__text--address","textContent",""+d.offer.address),l(s,".popup__text--price","textContent",d.offer.price+" руб./ночь"),l(s,".popup__type","textContent",""+e[d.offer.type]),l(s,".popup__text--capacity","textContent",`Количество комнат: ${d.offer.rooms}; Максимальное количество гостей: ${d.offer.guests}`),l(s,".popup__text--time","textContent",`Заезд после ${d.offer.checkin}, выезд до ${d.offer.checkout}`),((e,o)=>{const r=o.querySelector(".popup__features"),n=Array.from(e.offer.features),a=document.createDocumentFragment();n.forEach((e=>{const o=document.createElement("li");o.classList.add("popup__feature",""+t[e]),a.appendChild(o)})),r.appendChild(a)})(d,s),l(s,".popup__description","textContent",""+d.offer.description),((e,t)=>{const d=Array.from(e.offer.photos),i=document.createDocumentFragment();d.forEach((e=>{const t=document.createElement(o);t.src=""+e,t.width=r,t.height=n,t.alt=a,t.classList.add("popup__photo"),i.appendChild(t)})),t.querySelector(".popup__photos").appendChild(i)})(d,s),s},f=e=>{const t=document.createDocumentFragment();window.utils.getTruncatedArray(e,5).map(m).forEach((e=>t.appendChild(e))),u.appendChild(t)};window.elementsRender={renderPin:m,renderCard:p,renderAllPins:f,renderSelectedCard:(e,t)=>{const o=document.createDocumentFragment();e.forEach((e=>{t===e.offer.title&&o.appendChild(p(e))})),s.insertBefore(o,c)},renderFilteredPins:e=>{window.utils.removeArray(Array.from(s.querySelectorAll(".map__pin:not(.map__pin--main)"))),f(e)}}})(),(()=>{const e="Значение меньше минимума символов на ",t="Превышение максимума символов на ",o="Цена меньше минимума на ",r="Цена превышает максимум на ",n={BUNGALOW:"0",FLAT:"1 000",HOUSE:"5 000",PALACE:"10 000"},a=document.querySelector(".ad-form"),d=a.querySelector("[name='rooms']"),i=a.querySelector("[name='capacity']"),s=a.querySelector("[name='title']"),c=a.querySelector("[name='type']"),u=a.querySelector("[name='price']"),l=a.querySelector("[name='timein']"),m=a.querySelector("[name='timeout']"),p=(e,t,o,r,n,a)=>{t<o?e.setCustomValidity(n+(o-t)):t>r?e.setCustomValidity(a+(t-r)):e.setCustomValidity(""),e.reportValidity()},f=()=>p(s,s.value.length,30,100,e,t),w=()=>p(u,u.value,parseInt(n[c.value.toUpperCase()].replace(" ",""),10),1e6,o,r),y=()=>{u.placeholder=n[c.value.toUpperCase()]},v=(e,t)=>{t.value=e.value},_=e=>e<=3?Array.from({length:e},((e,t)=>t+1)):[0],h=()=>{var e,t;e=parseInt(d.options[d.selectedIndex].value,10),t=parseInt(i.options[i.selectedIndex].value,10),_(e).includes(0)&&0!==t?i.setCustomValidity("Данное помещение не преднозначено для гостей"):_(e).includes(t)?i.setCustomValidity(""):i.setCustomValidity("Максимально возможное количество гостей в данном помещении: "+e),i.reportValidity()};window.formValidation={onTitleEnter:f,onTypeChange:y,onPriceEnter:w,onCheckInOutChange:v,onRoomsOrGuestsChange:h,onSubmitButtonClick:()=>{f(),y(),w(),v(l,m),h()}}})(),(()=>{const e=["jpg","jpeg","png"],t="img",o="70",r="70",n=document.querySelector(".ad-form"),a=n.querySelector(".ad-form-header__input"),d=n.querySelector(".ad-form-header__preview img"),i=n.querySelector(".ad-form__input[type='file']"),s=n.querySelector(".ad-form__photo"),c=(n,a)=>{const d=n.files[0],i=d.name.toLowerCase();if(e.some((e=>i.endsWith(e)))){const e=new FileReader;e.addEventListener("load",(()=>{if("IMG"===a.tagName)a.src=e.result;else{const n=document.createElement(t);n.src=e.result,n.width=o,n.height=r,a.appendChild(n)}})),e.readAsDataURL(d)}};a.addEventListener("change",(()=>{c(a,d)})),i.addEventListener("change",(()=>{c(i,s)})),window.photoUpload={reset:()=>{d.src="img/muffin-grey.svg",s.querySelector("img")&&s.querySelector("img").remove()}}})(),(()=>{const e=document.querySelector(".map"),t=Math.round(32.5),o={MIN:0-t,MAX:e.offsetWidth-t},r={MIN:46,MAX:546},n=e.querySelector(".map__pin--main"),a=document.querySelector(".ad-form").querySelector("[name='address']"),d=n.offsetLeft,i=n.offsetTop,s=(e,t,o,r)=>{n.style[e]=r<t?t+"px":r>o?o+"px":r+"px"},c=()=>{const e=n.offsetLeft+t,o=n.offsetTop+84;a.value=`${e}, ${o}`};window.pinMove={move:e=>{e.preventDefault();const t={x:e.clientX,y:e.pageY},a=e=>{e.preventDefault();const a=t.x-e.clientX,d=t.y-e.pageY;t.x=e.clientX,t.y=e.pageY;const i={x:n.offsetLeft-a,y:n.offsetTop-d};s("left",o.MIN,o.MAX,i.x),s("top",r.MIN,r.MAX,i.y),c()},d=e=>{e.preventDefault(),c(),document.removeEventListener("mousemove",a),document.removeEventListener("mouseup",d)};document.addEventListener("mousemove",a),document.addEventListener("mouseup",d)},setAddress:c,setDefualtPosition:()=>{n.style.left=d+"px",n.style.top=i+"px"}}})(),(()=>{const e=document.querySelector("[name='housing-type']"),t=document.querySelector("[name='housing-price']"),o=document.querySelector("[name='housing-rooms']"),r=document.querySelector("[name='housing-guests']"),n=n=>{const a=t.value,d=e.value,i=parseInt(o.value,10),s=parseInt(r.value,10),c=Array.from(document.querySelectorAll("[name='features']:checked"));return(n.offer.type===d||"any"===e.value)&&(n.offer.rooms===i||"any"===o.value)&&(n.offer.guests===s||"any"===r.value)&&(((e,t)=>"low"===t&&e.offer.price<1e4||"middle"===t&&e.offer.price>=1e4&&e.offer.price<=5e4||"high"===t&&e.offer.price>5e4)(n,a)||"any"===t.value)&&((e,t)=>{let o=!0;const r=Array.from(e.offer.features);return t.forEach((e=>{r.includes(e.value)||(o=!1)})),o})(n,c)};window.filterAdverts={getFilteredList:()=>{let e=[];for(let t=0;t<window.advertsList.length&&(n(window.advertsList[t])&&e.push(window.advertsList[t]),5!==e.length);t++);return e},resetFilter:()=>{e.selectedIndex=0,t.selectedIndex=0,o.selectedIndex=0,r.selectedIndex=0,Array.from(document.querySelectorAll("[name='features']:checked")).forEach((e=>{e.checked=!1}))}}})(),(()=>{const e="Enter",t=document.querySelector(".ad-form"),o=document.querySelector(".map__pin--main"),r=t.querySelector("[name='title']"),n=t.querySelector("[name='type']"),a=t.querySelector("[name='price']"),d=t.querySelector("[name='rooms']"),i=t.querySelector("[name='capacity']"),s=t.querySelector("[name='timein']"),c=t.querySelector("[name='timeout']"),u=t.querySelector(".ad-form__reset"),l=document.querySelector("[name='housing-type']"),m=document.querySelector("[name='housing-price']"),p=document.querySelector("[name='housing-rooms']"),f=document.querySelector("[name='housing-guests']"),w=Array.from(document.querySelectorAll("[name='features']")),y=document.querySelector(".map__pins"),v=t.querySelector(".ad-form__submit"),_=()=>{window.messageHandler.show("success"),window.pageMode.reset(),window.pageMode.deactivate()},h=()=>{window.messageHandler.show("error")},g=window.debounce((()=>{document.querySelector(".map__card")&&window.cardPopup.close();const e=window.filterAdverts.getFilteredList();window.elementsRender.renderFilteredPins(e)}));window.pageMode.deactivate(),o.addEventListener("mousedown",(e=>window.pinMove.move(e))),y.addEventListener("click",(e=>{const t=e.target,o=t.parentNode;o.classList.contains("map__pin")&&!o.classList.contains("map__pin--main")&&(e.preventDefault(),window.cardPopup.close(),window.cardPopup.open(t.alt))})),y.addEventListener("keydown",(t=>{const o=t.target;t.key!==e||o.classList.contains("map__pin--main")||(t.preventDefault(),window.cardPopup.close(),window.cardPopup.open(o.querySelector("img").alt))}),!0),r.addEventListener("input",window.formValidation.onTitleEnter),n.addEventListener("change",window.formValidation.onTypeChange),a.addEventListener("input",window.formValidation.onPriceEnter),s.addEventListener("change",(()=>window.formValidation.onCheckInOutChange(s,c))),c.addEventListener("change",(()=>window.formValidation.onCheckInOutChange(c,s))),i.addEventListener("change",window.formValidation.onRoomsOrGuestsChange),d.addEventListener("change",window.formValidation.onRoomsOrGuestsChange),v.addEventListener("click",window.formValidation.onSubmitButtonClick),v.addEventListener("keydown",window.utils.invokeIfKeyIs(e,window.formValidation.onSubmitButtonClick)),t.addEventListener("submit",(e=>{const o=new FormData(t);window.backend.upload(_,h,o),e.preventDefault()})),u.addEventListener("click",(()=>{window.pageMode.reset(),window.pageMode.deactivate()})),l.addEventListener("change",g),m.addEventListener("change",g),p.addEventListener("change",g),f.addEventListener("change",g),w.forEach((e=>e.addEventListener("change",g)))})(),(()=>{const e=()=>{const e=document.querySelector(".map__card"),o=document.querySelector(".map__pin--active");e&&(e.remove(),o.classList.remove("map__pin--active")),document.removeEventListener("keydown",t)},t=window.utils.invokeIfKeyIs("Escape",e);window.cardPopup={open:o=>{window.elementsRender.renderSelectedCard(Array.from(window.advertsList),o),document.querySelector(`img[alt='${o}']`).parentNode.classList.add("map__pin--active"),document.addEventListener("keydown",t),document.querySelector(".popup__close").addEventListener("click",e)},close:e}})()})();