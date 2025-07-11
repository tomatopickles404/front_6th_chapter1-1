(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e){if(t.type!==`childList`)continue;for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();const e=`modulepreload`,t=function(e){return`/front_6th_chapter1-1/`+e},n={},r=function(r,i,a){let o=Promise.resolve();if(i&&i.length>0){let r=function(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))},s=document.getElementsByTagName(`link`),c=document.querySelector(`meta[property=csp-nonce]`),l=c?.nonce||c?.getAttribute(`nonce`);o=r(i.map(r=>{if(r=t(r,a),r in n)return;n[r]=!0;let i=r.endsWith(`.css`),o=i?`[rel="stylesheet"]`:``,c=!!a;if(c)for(let e=s.length-1;e>=0;e--){let t=s[e];if(t.href===r&&(!i||t.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${r}"]${o}`))return;let u=document.createElement(`link`);if(u.rel=i?`stylesheet`:e,i||(u.as=`script`),u.crossOrigin=``,u.href=r,l&&u.setAttribute(`nonce`,l),document.head.appendChild(u),i)return new Promise((e,t)=>{u.addEventListener(`load`,e),u.addEventListener(`error`,()=>t(Error(`Unable to preload CSS for ${r}`)))})}))}function s(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return o.then(e=>{for(let t of e||[]){if(t.status!==`rejected`)continue;s(t.reason)}return r().catch(s)})};function i(){let e={},t=``,n=(t,n,r=null)=>{e[t]={component:n,initializer:r}},r=e=>{t=e},i=e=>{window.history.pushState(null,null,e),o()},a=t=>{if(e[t])return{route:e[t],params:{}};for(let n in e)if(n.includes(`:`)){let r=n.replace(/:[^/]+/g,`([^/]+)`),i=RegExp(`^${r}$`),a=t.match(i);if(a){let t={},r=n.match(/:[^/]+/g)||[];return r.forEach((e,n)=>{let r=e.slice(1);t[r]=a[n+1]}),{route:e[n],params:t}}}return null},o=()=>{let e=window.location.pathname,n=a(e);if(n){let{route:e,params:t}=n;window.routeParams=t,document.getElementById(`root`).innerHTML=e.component(),e.initializer&&e.initializer()}else t&&(document.getElementById(`root`).innerHTML=t())};return window.addEventListener(`popstate`,o),document.addEventListener(`DOMContentLoaded`,()=>{document.body.addEventListener(`click`,e=>{e.target.matches(`[data-link]`)&&(e.preventDefault(),i(e.target.href))}),o()}),{registerRoute:n,setNotFoundComponent:r,navigateTo:i,router:o}}function a(e,t={}){let n=null,r=null,i=i=>{if(!i){console.warn(`Intersection Observer: Node to observe is null or undefined.`);return}r===i&&n||(n&&n.disconnect(),n=new IntersectionObserver(t=>{t[0].isIntersecting&&e()},t),n.observe(i),r=i)},a=e=>{n&&e&&(n.unobserve(e),r===e&&(r=null))},o=()=>{n&&(n.disconnect(),n=null,r=null)};return{observe:i,unobserve:a,disconnect:o}}function o(e,t={}){let{rootMargin:n=`200px`,threshold:r=.1,enabled:i=!0,getIsLoading:o=()=>!1,hasMore:s=()=>!0}=t,c=i,l=null,{observe:u,unobserve:d,disconnect:f}=a(()=>{c&&!o()&&s()&&e?e():s()||f()},{rootMargin:n,threshold:r}),p=(e=`.infinite-scroll-trigger`)=>{let t=document.querySelector(e);t?(l&&l!==t&&d(l),l=t,u(t)):(l&&(f(),console.log(`Infinite scroll trigger element not found, disconnecting observer.`)),l=null)},m=(e=`.infinite-scroll-trigger`)=>{p(e)},h=()=>{c=!0,l&&!o()&&s()&&u(l)},g=()=>{c=!1,l&&d(l)},_=()=>{f(),l=null,c=!1};return{init:p,updateTrigger:m,enable:h,disable:g,destroy:_}}const s={show(e,t=`success`){let n=document.querySelector(`.toast-message`);n&&n.remove();let r={success:`bg-green-500 text-white`,info:`bg-blue-500 text-white`,error:`bg-red-500 text-white`},i=document.createElement(`div`);i.className=`toast-message fixed bottom-4 left-1/2 transform -translate-x-1/2 ${r[t]} px-4 py-3 rounded-lg shadow-lg z-50 flex items-center justify-between min-w-64`;let a=document.createElement(`span`);a.textContent=e,i.appendChild(a);let o=document.createElement(`button`);o.className=`ml-3 text-white hover:text-gray-200 focus:outline-none`,o.innerHTML=`
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    `,o.addEventListener(`click`,()=>{i.parentNode&&i.remove()}),i.appendChild(o),document.body.appendChild(i);let s=setTimeout(()=>{i.parentNode&&i.remove()},3e3);o.addEventListener(`click`,()=>{clearTimeout(s)})}},c={state:{items:[]},getCartCount(){return this.state.items.length},addToCart(e){let t=this.state.items.find(t=>t.productId===e.productId);t?t.quantity+=e.quantity||1:this.state.items.push({...e,quantity:e.quantity||1}),this.saveToLocalStorage(),this.updateCartBadge(),s.show(`장바구니에 추가되었습니다`,`success`)},removeFromCart(e){let t=this.state.items.find(t=>t.productId===e);this.state.items=this.state.items.filter(t=>t.productId!==e),this.saveToLocalStorage(),this.updateCartBadge(),t&&s.show(`${t.title}이(가) 장바구니에서 삭제되었습니다`,`info`)},removeSelectedItems(e){let t=this.state.items.filter(t=>e.includes(t.productId));this.state.items=this.state.items.filter(t=>!e.includes(t.productId)),this.saveToLocalStorage(),this.updateCartBadge(),t.length>0&&s.show(`선택한 ${t.length}개 상품이 삭제되었습니다`,`info`)},clearCart(){let e=this.state.items.length;this.state.items=[],this.saveToLocalStorage(),this.updateCartBadge(),e>0&&s.show(`장바구니가 비워졌습니다`,`info`)},updateQuantity(e,t){let n=this.state.items.find(t=>t.productId===e);n&&(t<=0?this.removeFromCart(e):(n.quantity=t,this.saveToLocalStorage(),this.updateCartBadge()))},saveToLocalStorage(){localStorage.setItem(`shopping_cart`,JSON.stringify(this.state.items))},loadFromLocalStorage(){let e=localStorage.getItem(`shopping_cart`);e&&(this.state.items=JSON.parse(e))},updateCartBadge(){let e=document.querySelector(`#cart-icon-btn`);if(e){let t=this.getCartCount(),n=e.querySelector(`.cart-badge`);t>0?(n||(n=document.createElement(`span`),n.className=`cart-badge absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center`,e.appendChild(n)),n.textContent=t):n&&n.remove()}},reset(){this.state.items=[],this.saveToLocalStorage(),this.updateCartBadge()},clearAll(){this.state.items=[],localStorage.removeItem(`shopping_cart`),this.updateCartBadge()}};function l(){return`
    <header class="bg-white shadow-sm sticky top-0 z-40">
      <div class="max-w-md mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <h1 class="text-xl font-bold text-gray-900">
            <a href="/" data-link="">쇼핑몰</a>
          </h1>
          <div class="flex items-center space-x-2">
            <!-- 장바구니 아이콘 -->
            <button id="cart-icon-btn" class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"
                ></path>
              </svg>
              ${c.getCartCount()>0?`
              <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                ${c.getCartCount()}
              </span>
              `:``}
            </button>
          </div>
        </div>
      </div>
    </header>
  `}function u(){var e;(e=document.querySelector(`#cart-icon-btn`))?.addEventListener(`click`,()=>{r(async()=>{let{openCartModal:e}=await import(`./CartModal-D9NSVwpr.js`);return{openCartModal:e}},[]).then(({openCartModal:e})=>{e()})})}const d=()=>!1;async function f(e={}){let{limit:t=20,search:n=``,category1:r=``,category2:i=``,sort:a=`price_asc`}=e,o=e.current??e.page??1,s=new URLSearchParams({page:o.toString(),limit:t.toString(),...n&&{search:n},...r&&{category1:r},...i&&{category2:i},sort:a.trim()}),c=await fetch(`/api/products?${s}`);return await c.json()}async function p(e){let t=await fetch(`/api/products/${e}`);return await t.json()}function m(){let e={},t=window.location.search.substring(1),n=/([^&=]+)=([^&]*)/g,r;for(;r=n.exec(t);)e[decodeURIComponent(r[1])]=decodeURIComponent(r[2]);return e}function h(e){let t=Object.keys(e).filter(t=>e[t]!==void 0&&e[t]!==null&&e[t]!==``).map(t=>{let n=encodeURIComponent(e[t]);return`${encodeURIComponent(t)}=${n}`}).join(`&`),n=`${window.location.pathname}${t?`?`+t:``}${window.location.hash}`;window.history.pushState({path:n},``,n)}const g={state:{products:[],isLoading:!0,error:null,totalCount:0,filters:{page:1,limit:20,search:``,category1:``,category2:``,sort:`price_asc`}},async fetchProducts(e=!1){this.state.isLoading=!0,this.state.error=null,d()||this.render();try{let t=await f(this.state.filters);this.state.products=e?[...this.state.products,...t.products]:t.products,this.state.totalCount=t.pagination.total}catch(e){console.error(`Failed to fetch products:`,e),this.state.error=e}finally{this.state.isLoading=!1,this.render()}},updateFetchProducts(){this.state.filters.page=this.state.filters.page+1,h(this.state.filters),this.fetchProducts(!0)},updateFilters(e){this.state.filters={...this.state.filters,...e,page:1},h(this.state.filters),this.fetchProducts()},reset(){this.state.products=[],this.state.isLoading=!0,this.state.error=null,this.state.totalCount=0,this.state.filters={page:1,limit:20,search:``,category1:``,category2:``,sort:`price_asc`,...m()}},initializeFromURL(){let e=m();this.state.filters={...this.state.filters,...e,page:1},e.limit&&(this.state.filters.limit=Number(e.limit))},render:null};function _(){return`
    <footer class="bg-white shadow-sm sticky top-0 z-40">
      <div class="max-w-md mx-auto py-8 text-center text-gray-500">
        <p>© 2025 항해플러스 프론트엔드 쇼핑몰</p>
      </div>
    </footer>
  `}function v({isLoading:e,products:t,totalCount:n,limit:r,error:i}){return e?`
      <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
        <!-- 로딩 스켈레톤 -->
        ${Array.from({length:r}).map(()=>`
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                <div class="aspect-square bg-gray-200"></div>
                <div class="p-3">
                  <div class="h-4 bg-gray-200 rounded mb-2"></div>
                  <div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div class="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            `).join(``)}
      </div>

      <div class="text-center py-4">
        <div class="inline-flex items-center">
          <svg class="animate-spin h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span class="text-sm text-gray-600">상품을 불러오는 중...</span>
        </div>
      </div>
    `:i?`
      <div class="text-center py-10">
        <p class="text-red-500 mb-4">상품을 불러오는데 실패했습니다: ${i.message}</p>
        <button id="retry-button" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">재시도</button>
      </div>
    `:t.length===0?`
      <div class="text-center py-10">
        <p class="text-gray-500">상품이 없습니다.</p>
      </div>
    `:`
    <div class="mb-4 text-sm text-gray-600">
      총 <span class="font-medium text-gray-900">${n.toLocaleString()}개</span>의 상품
    </div>
    <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
      ${t.map(({productId:e,title:t,brand:n,image:r,lprice:i})=>{var a;return`
            <div
              class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden product-card"
              data-product-id="${e}"
            >
              <!-- 상품 이미지 -->
              <div
                class="aspect-square bg-gray-100 overflow-hidden cursor-pointer product-image"
                data-product-id="${e}"
              >
                <img
                  src="${r}"
                  alt="${t}"
                  class="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                  loading="lazy"
                />
              </div>
              <!-- 상품 정보 -->
              <div class="p-3">
                <div class="cursor-pointer product-info mb-3" data-product-id="${e}">
                  <h3 class="text-sm font-medium text-gray-900 line-clamp-2 mb-1">${t}</h3>
                  <p class="text-xs text-gray-500 mb-2">${n}</p>
                  <p class="text-lg font-bold text-gray-900">${(a=Number(i))?.toLocaleString()}원</p>
                </div>
                <!-- 장바구니 버튼 -->
                <button
                  class="w-full bg-blue-600 text-white text-sm py-2 px-3 rounded-md hover:bg-blue-700 transition-colors add-to-cart-btn"
                  data-product-id="${e}"
                >
                  장바구니 담기
                </button>
              </div>
            </div>
          `}).join(``)}
    </div>
    <div class="text-center py-4 text-sm text-gray-500">모든 상품을 확인했습니다</div>
  `}function y({isLoading:e,filters:t}){let{search:n,limit:r,sort:i,category1:a,category2:o}=t;return`
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
      <!-- 검색창 -->
      <div class="mb-4">
        <div class="flex gap-2">
          <div class="relative flex-1">
            <input
              type="text"
              id="search-input"
              placeholder="상품명을 검색해보세요..."
              value="${n}"
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <!-- 검색 아이콘 -->
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <!-- 필터 옵션 -->
      <div class="space-y-3">
        <!-- 카테고리 필터 -->
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <label class="text-sm text-gray-600">카테고리:</label>
            <button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">전체</button>
            ${a?`<button data-breadcrumb="category1" class="text-xs hover:text-blue-800 hover:underline">${a}</button>`:``}
            ${o?`<button data-breadcrumb="category2" class="text-xs hover:text-blue-800 hover:underline">${o}</button>`:``}
          </div>
          <!-- 1depth 카테고리 -->
          <div class="flex flex-wrap gap-2">
            ${e?` <div class="text-sm text-gray-500 italic">카테고리 로딩 중...</div> `:`
                  <div class="flex flex-wrap gap-2">
                    <button
                      data-category1="생활/건강"
                      class="category1-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      생활/건강
                    </button>
                    <button
                      data-category1="디지털/가전"
                      class="category1-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors
              bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      디지털/가전
                    </button>
                  </div>
                `}
          </div>

          <!-- 2depth 카테고리 -->
          ${a===`생활/건강`?`
                <div class="flex flex-wrap gap-2">
                  <button
                    data-category2="자동차용품"
                    class="category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    자동차용품
                  </button>
                </div>
              `:``}
        </div>
        <!-- 기존 필터들 -->
        <div class="flex gap-2 items-center justify-between">
          <!-- 페이지당 상품 수 -->
          <div class="flex items-center gap-2">
            <label class="text-sm text-gray-600">개수:</label>
            <select
              id="limit-select"
              class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="10" ${r===10?`selected`:``}>10개</option>
              <option value="20" ${r===20?`selected`:``}>20개</option>
              <option value="50" ${r===50?`selected`:``}>50개</option>
              <option value="100" ${r===100?`selected`:``}>100개</option>
            </select>
          </div>
          <!-- 정렬 -->
          <div class="flex items-center gap-2">
            <label class="text-sm text-gray-600">정렬:</label>
            <select
              id="sort-select"
              class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="price_asc" ${i===`price_asc`?`selected`:``}>가격 낮은순</option>
              <option value="price_desc" ${i===`price_desc`?`selected`:``}>가격 높은순</option>
              <option value="name_asc" ${i===`name_asc`?`selected`:``}>이름순</option>
              <option value="name_desc" ${i===`name_desc`?`selected`:``}>이름 역순</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  `}let b=null;function x(){g.reset(),c.reset(),b&&(b.destroy(),b=null)}d()&&(window.__TEST_STATE_RESET__=x,window.__TEST_CART_STATE__=c,window.__TEST_SHOW_TOAST__=(e,t)=>{r(async()=>{let{toastService:e}=await import(`./toastService-D0jeGg-Z.js`);return{toastService:e}},[]).then(({toastService:n})=>{n.show(e,t)})});const S=()=>{b||=o(g.updateFetchProducts.bind(g),{getIsLoading:()=>g.state.isLoading,hasMore:()=>g.state.products.length<g.state.totalCount}),b.init()};function C(){let{isLoading:e,filters:t,products:n,error:r,totalCount:i}=g.state;return`
    <div class="min-h-screen bg-gray-50">
      ${l()}
      <main class="max-w-md mx-auto px-4 py-4">
        ${y({isLoading:e,filters:t})}
        <div class="mb-6">${v({isLoading:e,products:n,error:r,totalCount:i,limit:t.limit})}</div>
      </main>
      <!-- 무한 스크롤 트리거 -->
      <div class="infinite-scroll-trigger"></div>
      ${_()}
    </div>
  `}function w(){c.loadFromLocalStorage(),g.initializeFromURL(),g.render=E,E(),S(),g.fetchProducts(),c.updateCartBadge()}function T(){var e,t,n,r,i,a;let{error:o,filters:s}=g.state;o&&(e=document.querySelector(`#retry-button`))?.addEventListener(`click`,()=>g.fetchProducts()),u();let l=document.querySelector(`#search-input`),d=()=>{s.page=1,g.updateFilters({search:s.search})};l&&(l.addEventListener(`input`,e=>{s.search=e.target.value.trim()}),l.addEventListener(`keydown`,e=>{e.key===`Enter`&&(e.preventDefault(),d())})),(t=document.querySelector(`#limit-select`))?.addEventListener(`change`,e=>{g.updateFilters({limit:Number(e.target.value)})}),(n=document.querySelector(`#sort-select`))?.addEventListener(`change`,e=>{g.updateFilters({sort:e.target.value})}),document.querySelectorAll(`.category1-filter-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault();let n=e.getAttribute(`data-category1`);g.updateFilters({category1:n,category2:``})})}),document.querySelectorAll(`.category2-filter-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault();let n=e.getAttribute(`data-category2`);g.updateFilters({category2:n})})}),(r=document.querySelector(`[data-breadcrumb='reset']`))?.addEventListener(`click`,e=>{e.preventDefault(),g.updateFilters({category1:``,category2:``})}),(i=document.querySelector(`[data-breadcrumb='category1']`))?.addEventListener(`click`,e=>{e.preventDefault();let t=e.target.textContent;g.updateFilters({category1:t,category2:``})}),(a=document.querySelector(`[data-breadcrumb='category2']`))?.addEventListener(`click`,e=>{e.preventDefault();let t=e.target.textContent;g.updateFilters({category2:t})}),document.querySelectorAll(`.add-to-cart-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault();let n=e.getAttribute(`data-product-id`),r=e.closest(`.product-card`),i={productId:n,title:r.querySelector(`h3`).textContent,brand:r.querySelector(`p`).textContent,image:r.querySelector(`img`).src,lprice:parseInt(r.querySelector(`.text-lg`).textContent.replace(/[^0-9]/g,``)),quantity:1};c.addToCart(i)})}),document.querySelectorAll(`.product-image, .product-info`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault();let n=e.dataset.productId,r=new URLSearchParams(window.location.search),i=r.get(`sort`),a=i?`?sort=${i}`:``;window.history.pushState({},``,`/product/${n}${a}`),window.dispatchEvent(new Event(`popstate`))})})}function E(){document.getElementById(`root`).innerHTML=C(),T(),S()}function D(){return`
    <header class="bg-white shadow-sm sticky top-0 z-40">
      <div class="max-w-md mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <button onclick="window.history.back()" class="p-2 text-gray-700 hover:text-gray-900 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <h1 class="text-lg font-bold text-gray-900">상품 상세</h1>
          </div>
          <div class="flex items-center space-x-2">
            <!-- 장바구니 아이콘 -->
            <button id="cart-icon-btn" class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"
                ></path>
              </svg>
              ${c.getCartCount()>0?`
              <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                ${c.getCartCount()}
              </span>
              `:``}
            </button>
          </div>
        </div>
      </div>
    </header>
  `}function O(){var e;(e=document.querySelector(`#cart-icon-btn`))?.addEventListener(`click`,()=>{r(async()=>{let{openCartModal:e}=await import(`./CartModal-D9NSVwpr.js`);return{openCartModal:e}},[]).then(({openCartModal:e})=>{e()})})}function k(e){return`
    <nav class="mb-4">
      <div class="flex items-center space-x-2 text-sm text-gray-600">
        <a href="/" data-link="" class="hover:text-blue-600 transition-colors">홈</a>
        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
        <button class="breadcrumb-link" data-category1="${e?.category1}">${e?.category1}</button>
        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
        <button class="breadcrumb-link" data-category2="${e?.category2}">${e?.category2}</button>
      </div>
    </nav>
  `}function A(e,t,n){var r,i;return`
    <div class="bg-white rounded-lg shadow-sm mb-6">
      <!-- 상품 이미지 -->
      <div class="p-4">
        <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
          <img src="${e.image}" alt="${e.title}" class="w-full h-full object-cover product-detail-image" />
        </div>
        <!-- 상품 정보 -->
        <div>
          <p class="text-sm text-gray-600 mb-1">${e.brand||``}</p>
          <h1 class="text-xl font-bold text-gray-900 mb-3">${e.title}</h1>
          <!-- 평점 및 리뷰 -->
          <div class="flex items-center mb-3">
            <div class="flex items-center">
              ${Array.from({length:5},(e,n)=>{let r=n<Math.floor(t),i=n===Math.floor(t)&&t%1>0,a=r||i?`text-yellow-400`:`text-gray-300`;return`<svg class="w-4 h-4 ${a}" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>`}).join(``)}
            </div>
            <span class="ml-2 text-sm text-gray-600"
              >${t??0} (${n?.toLocaleString()??0}개 리뷰)</span
            >
          </div>
          <!-- 가격 -->
          <div class="mb-4">
            <span class="text-2xl font-bold text-blue-600">${(r=Number(e.lprice))?.toLocaleString()}원</span>
          </div>
          <!-- 재고 -->
          <div class="text-sm text-gray-600 mb-4">재고 ${e==null||(i=e.stock)==null?void 0:i.toLocaleString()}개</div>
          <!-- 설명 -->
          <div class="text-sm text-gray-700 leading-relaxed mb-6">
            ${e?.description||e?.title}에 대한 상세 설명입니다. 브랜드의 우수한 품질을 자랑하는 상품으로,
            고객 만족도가 높은 제품입니다.
          </div>
        </div>
      </div>
    </div>
  `}function j(e,t){return`
    <div class="border-t border-gray-200 p-4">
      <div class="flex items-center justify-between mb-4">
        <span class="text-sm font-medium text-gray-900">수량</span>
        <div class="flex items-center">
          <button
            id="quantity-decrease"
            class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
            </svg>
          </button>
          <input
            type="number"
            id="quantity-input"
            value="${t}"
            min="1"
            max="${e?.stock}"
            class="w-16 h-8 text-center text-sm border-t border-b border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            id="quantity-increase"
            class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `}function M(e){return`
    <!-- 액션 버튼 -->
    <div class="p-4">
      <button
        id="add-to-cart-btn"
        data-product-id="${e.productId}"
        class="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
      >
        장바구니 담기
      </button>
    </div>

    <!-- 상품 목록으로 이동 -->
    <div class="mb-6">
      <button
        class="block w-full text-center bg-gray-100 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-200 transition-colors go-to-product-list"
      >
        상품 목록으로 돌아가기
      </button>
    </div>
  `}function N(e,t){return t||e.length===0?``:`
    <div class="bg-white rounded-lg shadow-sm">
      <div class="p-4 border-b border-gray-200">
        <h2 class="text-lg font-bold text-gray-900">관련 상품</h2>
        <p class="text-sm text-gray-600">같은 카테고리의 다른 상품들</p>
      </div>
      <div class="p-4">
        <!-- 관련 상품 목록 -->
        <div class="grid grid-cols-2 gap-3 responsive-grid">
          ${e.map(e=>{var t;return`
                <div
                  class="bg-gray-50 rounded-lg p-3 related-product-card cursor-pointer"
                  data-product-id="${e.productId}"
                >
                  <div class="aspect-square bg-white rounded-md overflow-hidden mb-2">
                    <img
                      src="${e.image}"
                      alt="${e.title}"
                      class="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">${e.title}</h3>
                  <p class="text-sm font-bold text-blue-600">${(t=Number(e.lprice))?.toLocaleString()}원</p>
                </div>
              `}).join(``)}
        </div>
      </div>
    </div>
  `}const P=2**53-1,F={state:{product:null,relatedProducts:[],quantity:1,isLoading:!0,relatedProductsLoading:!1,error:null,reviewCount:0,rating:0},async fetchProductDetail(e){this.state.isLoading=!0,this.state.error=null,this.state.relatedProducts=[],this.state.quantity=1,this.state.reviewCount=0,this.state.rating=0,d()||this.render();try{let t=await p(e);if(this.state.product=t,this.state.reviewCount=t?.reviewCount??0,this.state.rating=t?.rating??0,!this.state.product)throw Error(`상품을 찾을 수 없습니다.`);this.loadRelatedProducts()}catch(e){console.error(`Failed to fetch product detail:`,e),this.state.error=e}finally{this.state.isLoading=!1,this.render()}},async loadRelatedProducts(){this.state.relatedProductsLoading=!0,this.render();try{let e=await f({category2:this.state.product.category2,limit:20});this.state.relatedProducts=e.products.filter(e=>e.productId!==this.state.product.productId).slice(0,19)}catch(e){console.error(`Failed to load related products:`,e)}finally{this.state.relatedProductsLoading=!1,this.render()}},increaseQuantity(){var e;let t=(e=this.state.product)?.stock;this.state.quantity=Math.min(this.state.quantity+1,t||P),this.updateQuantityInput()},decreaseQuantity(){this.state.quantity=Math.max(this.state.quantity-1,1),this.updateQuantityInput()},updateQuantity(e){var t;if(!e||e===``||isNaN(e)){this.state.quantity=1;let e=document.querySelector(`#quantity-input`);e&&(e.value=this.state.quantity);return}let n=parseInt(e),r=(t=this.state.product)?.stock,i=Math.max(1,Math.min(n,r||P));if(this.state.quantity!==i){this.state.quantity=i;let e=document.querySelector(`#quantity-input`);e&&(e.value=this.state.quantity)}},updateQuantityInput(){let e=document.querySelector(`#quantity-input`);e&&(e.value=this.state.quantity,e.dispatchEvent(new Event(`input`,{bubbles:!0})))},addToCart(){if(this.state.product){let e={...this.state.product,quantity:this.state.quantity};c.addToCart(e)}},reset(){this.state.product=null,this.state.relatedProducts=[],this.state.quantity=1,this.state.isLoading=!0,this.state.relatedProductsLoading=!1,this.state.error=null},render:null};window.productDetailStore=F,d()&&(window.__TEST_PRODUCT_DETAIL_STATE__=F);function I(){return`
    <div class="min-h-screen bg-gray-50">
      ${D()}
      <main class="max-w-md mx-auto px-4 py-4">
        <div class="py-20 bg-gray-50 flex items-center justify-center">
          <div class="text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p class="text-gray-600">상품 정보를 불러오는 중...</p>
          </div>
        </div>
      </main>
      ${_()}
    </div>
  `}function L(){let{product:e,relatedProducts:t,quantity:n,isLoading:r,relatedProductsLoading:i,error:a,reviewCount:o,rating:s}=F.state;return r?I():a||!e?`
      <div class="min-h-screen bg-gray-50">
        <div class="text-center py-10">
          <p class="text-red-500 mb-4">상품을 불러오는데 실패했습니다.</p>
          <button onclick="window.history.back()" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            뒤로 가기
          </button>
        </div>
      </div>
    `:`
    <div class="min-h-screen bg-gray-50">
      ${D()}
      <main class="max-w-md mx-auto px-4 py-4">
        ${k(e)} ${A(e,s,o)}
        ${j(e,n)} ${M(e)}
        ${N(t,i)}
      </main>
      ${_()}
    </div>
  `}function R(){var e;c.loadFromLocalStorage();let t=(e=window.routeParams)?.productId;t?(F.render=B,F.fetchProductDetail(t)):console.error(`Product ID not found in route params`)}function z(){O();let e=document._productDetailListener;e&&document.removeEventListener(`click`,e);let t=e=>{if(e.target.closest(`#quantity-increase`)){F.increaseQuantity();let e=document.querySelector(`#quantity-input`);e&&(e.value=F.state.quantity)}if(e.target.closest(`#quantity-decrease`)){F.decreaseQuantity();let e=document.querySelector(`#quantity-input`);e&&(e.value=F.state.quantity)}if(e.target.closest(`#add-to-cart-btn`)&&F.addToCart(),e.target.closest(`.related-product-card`)){let t=e.target.closest(`.related-product-card`),n=t.dataset.productId;window.history.pushState({},``,`/product/${n}`),window.dispatchEvent(new Event(`popstate`))}if(e.target.closest(`.go-to-product-list`)){let e=new URLSearchParams(window.location.search),t=e.get(`sort`),n=t?`?sort=${t}`:``;window.history.pushState({},``,`/${n}`),window.dispatchEvent(new Event(`popstate`))}};document.addEventListener(`click`,t),document._productDetailListener=t;let n=document.querySelector(`#quantity-input`);if(n){let e=n.cloneNode(!0);n.parentNode.replaceChild(e,n),e.addEventListener(`change`,e=>{F.updateQuantity(e.target.value)}),e.addEventListener(`blur`,e=>{F.updateQuantity(e.target.value)}),e.addEventListener(`keydown`,e=>{e.key===`Enter`&&(e.preventDefault(),F.updateQuantity(e.target.value),e.target.blur())})}}function B(){document.getElementById(`root`).innerHTML=L(),setTimeout(()=>{z()},0)}function V(){return`
    <main class="max-w-md mx-auto px-4 py-4">
      <div class="text-center my-4 py-20 shadow-md p-6 bg-white rounded-lg">
        <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#4285f4;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#1a73e8;stop-opacity:1" />
            </linearGradient>
            <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="8" flood-color="#000000" flood-opacity="0.1" />
            </filter>
          </defs>

          <!-- 404 Numbers -->
          <text
            x="160"
            y="85"
            font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            font-size="48"
            font-weight="600"
            fill="url(#blueGradient)"
            text-anchor="middle"
          >
            404
          </text>

          <!-- Icon decoration -->
          <circle cx="80" cy="60" r="3" fill="#e8f0fe" opacity="0.8" />
          <circle cx="240" cy="60" r="3" fill="#e8f0fe" opacity="0.8" />
          <circle cx="90" cy="45" r="2" fill="#4285f4" opacity="0.5" />
          <circle cx="230" cy="45" r="2" fill="#4285f4" opacity="0.5" />

          <!-- Message -->
          <text
            x="160"
            y="110"
            font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            font-size="14"
            font-weight="400"
            fill="#5f6368"
            text-anchor="middle"
          >
            페이지를 찾을 수 없습니다
          </text>

          <!-- Subtle bottom accent -->
          <rect x="130" y="130" width="60" height="2" rx="1" fill="url(#blueGradient)" opacity="0.3" />
        </svg>

        <a
          href="/"
          data-link
          class="inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >홈으로</a
        >
      </div>
    </main>
  `}const H=[{path:`/`,component:C,initializer:w},{path:`/product/:productId`,component:L,initializer:R},{path:`/non-existent-page`,component:V}],U=()=>r(async()=>{let{worker:e,workerOptions:t}=await import(`./browser-BuWd68VU.js`);return{worker:e,workerOptions:t}},[]).then(({worker:e,workerOptions:t})=>e.start(t)),W=i();function G(){H.forEach(e=>{W.registerRoute(e.path,e.component,e.initializer)}),W.setNotFoundComponent(V),W.router()}d()?G():U().then(G);export{c as cartStore,s as toastService};