import{cartStore as e}from"./main-DA9x1ve1.js";function t(){let{items:t}=e.state,n=t.reduce((e,t)=>e+t.lprice*t.quantity,0);return t.length===0?`
      <div class="fixed inset-0 z-50 overflow-y-auto cart-modal">
        <!-- 배경 오버레이 -->
        <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity cart-modal-overlay"></div>
        <!-- 모달 컨테이너 -->
        <div class="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4">
          <div
            class="relative bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-hidden"
          >
            <!-- 헤더 -->
            <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h2 class="text-lg font-bold text-gray-900 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"
                  ></path>
                </svg>
                장바구니
              </h2>

              <button id="cart-modal-close-btn" class="text-gray-400 hover:text-gray-600 p-1">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <!-- 컨텐츠 -->
            <div class="flex flex-col max-h-[calc(90vh-120px)]">
              <!-- 빈 장바구니 -->
              <div class="flex-1 flex items-center justify-center p-8">
                <div class="text-center">
                  <div class="text-gray-400 mb-4">
                    <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"
                      ></path>
                    </svg>
                  </div>
                  <h3 class="text-lg font-medium text-gray-900 mb-2">장바구니가 비어있습니다</h3>
                  <p class="text-gray-600">원하는 상품을 담아보세요!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `:`
    <div class="fixed inset-0 z-50 overflow-y-auto cart-modal">
      <!-- 배경 오버레이 -->
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity cart-modal-overlay"></div>
      <!-- 모달 컨테이너 -->
      <div class="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4">
        <div
          class="relative bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-hidden"
        >
          <!-- 헤더 -->
          <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <h2 class="text-lg font-bold text-gray-900 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"
                ></path>
              </svg>
              장바구니
              <span class="text-sm font-normal text-gray-600 ml-1">(${t.length})</span>
            </h2>
            <button id="cart-modal-close-btn" class="text-gray-400 hover:text-gray-600 p-1">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <!-- 컨텐츠 -->
          <div class="flex flex-col max-h-[calc(90vh-120px)]">
            <!-- 전체 선택 섹션 -->
            <div class="p-4 border-b border-gray-200 bg-gray-50">
              <label class="flex items-center text-sm text-gray-700">
                <input
                  type="checkbox"
                  id="cart-modal-select-all-checkbox"
                  class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2"
                />
                전체선택 (${t.length}개)
              </label>
            </div>
            <!-- 아이템 목록 -->
            <div class="flex-1 overflow-y-auto">
              <div class="p-4 space-y-4">
                ${t.map(e=>{var t;return`
                      <div
                        class="flex items-center py-3 border-b border-gray-100 cart-item"
                        data-product-id="${e.productId}"
                      >
                        <!-- 선택 체크박스 -->
                        <label class="flex items-center mr-3">
                          <input
                            type="checkbox"
                            class="cart-item-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded 
                        focus:ring-blue-500"
                            data-product-id="${e.productId}"
                          />
                        </label>
                        <!-- 상품 이미지 -->
                        <div class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                          <img
                            src="${e.image}"
                            alt="${e.title}"
                            class="w-full h-full object-cover cursor-pointer cart-item-image"
                            data-product-id="${e.productId}"
                          />
                        </div>
                        <!-- 상품 정보 -->
                        <div class="flex-1 min-w-0">
                          <h4
                            class="text-sm font-medium text-gray-900 truncate cursor-pointer cart-item-title"
                            data-product-id="${e.productId}"
                          >
                            ${e.title}
                          </h4>
                          <p class="text-sm text-gray-600 mt-1">${(t=e.lprice)?.toLocaleString()}원</p>
                          <!-- 수량 조절 -->
                          <div class="flex items-center mt-2">
                            <button
                              class="quantity-decrease-btn w-7 h-7 flex items-center justify-center 
                         border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100"
                              data-product-id="${e.productId}"
                            >
                              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M20 12H4"
                                ></path>
                              </svg>
                            </button>
                            <input
                              type="number"
                              value="${e.quantity}"
                              min="1"
                              class="quantity-input w-12 h-7 text-center text-sm border-t border-b 
                        border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                              data-product-id="${e.productId}"
                            />
                            <button
                              class="quantity-increase-btn w-7 h-7 flex items-center justify-center 
                         border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
                              data-product-id="${e.productId}"
                            >
                              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M12 4v16m8-8H4"
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                        <!-- 가격 및 삭제 -->
                        <div class="text-right ml-3">
                          <p class="text-sm font-medium text-gray-900">
                            ${(e.lprice*e.quantity).toLocaleString()}원
                          </p>
                          <button
                            class="cart-item-remove-btn mt-1 text-xs text-red-600 hover:text-red-800"
                            data-product-id="${e.productId}"
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    `}).join(``)}
              </div>
            </div>
          </div>
          <!-- 하단 액션 -->
          <div class="sticky bottom-0 bg-white border-t border-gray-200 p-4">
            <!-- 선택된 아이템 정보 -->
            <!-- 총 금액 -->
            <div class="flex justify-between items-center mb-4">
              <span class="text-lg font-bold text-gray-900">총 금액</span>
              <span class="text-xl font-bold text-blue-600">${n.toLocaleString()}원</span>
            </div>
            <!-- 액션 버튼들 -->
            <div class="space-y-2">
              <div class="flex gap-2">
                <button
                  id="cart-modal-clear-cart-btn"
                  class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md 
                         hover:bg-gray-700 transition-colors text-sm"
                >
                  전체 비우기
                </button>
                <button
                  id="cart-modal-checkout-btn"
                  class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md 
                         hover:bg-blue-700 transition-colors text-sm"
                >
                  구매하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `}function n(){var t,n,i,s,c;(t=document.querySelector(`#cart-modal-close-btn`))?.addEventListener(`click`,()=>{a()}),(n=document.querySelector(`.cart-modal-overlay`))?.addEventListener(`click`,e=>{e.target.classList.contains(`cart-modal-overlay`)&&a()}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&document.querySelector(`.cart-modal-overlay`)&&a()}),(i=document.querySelector(`#cart-modal-select-all-checkbox`))?.addEventListener(`change`,e=>{let t=document.querySelectorAll(`.cart-item-checkbox`);t.forEach(t=>{t.checked=e.target.checked})}),document.querySelectorAll(`.cart-item-checkbox`).forEach(e=>{e.addEventListener(`change`,()=>{r()})}),document.querySelectorAll(`.quantity-increase-btn`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.dataset.productId,r=e.state.items.find(e=>e.productId===n);r&&(e.updateQuantity(n,r.quantity+1),setTimeout(()=>o(),0))})}),document.querySelectorAll(`.quantity-decrease-btn`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.dataset.productId,r=e.state.items.find(e=>e.productId===n);r&&r.quantity>1&&(e.updateQuantity(n,r.quantity-1),setTimeout(()=>o(),0))})}),document.querySelectorAll(`.quantity-input`).forEach(t=>{t.addEventListener(`change`,t=>{let n=t.target.dataset.productId,r=parseInt(t.target.value)||1;e.updateQuantity(n,r),setTimeout(()=>o(),0)})}),document.querySelectorAll(`.cart-item-remove-btn`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.dataset.productId;e.removeFromCart(n),setTimeout(()=>o(),0)})}),(s=document.querySelector(`#cart-modal-clear-cart-btn`))?.addEventListener(`click`,()=>{e.clearCart(),a()}),(c=document.querySelector(`#cart-modal-checkout-btn`))?.addEventListener(`click`,()=>{a()})}function r(){let e=document.querySelectorAll(`.cart-item-checkbox`),t=document.querySelector(`#cart-modal-select-all-checkbox`);if(e.length===0)return;let n=Array.from(e).every(e=>e.checked),r=Array.from(e).some(e=>e.checked);t.checked=n,t.indeterminate=r&&!n}function i(){let e=document.createElement(`div`);e.id=`cart-modal-container`,document.body.appendChild(e),o()}function a(){let e=document.getElementById(`cart-modal-container`);e&&e.remove()}function o(){let e=document.getElementById(`cart-modal-container`);e&&(e.innerHTML=t(),n())}export{i as openCartModal};