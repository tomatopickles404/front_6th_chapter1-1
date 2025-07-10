import { cartStore } from "../stores/cartStore.js";

export function CartModal() {
  const { items } = cartStore.state;
  const totalAmount = items.reduce((sum, item) => sum + item.lprice * item.quantity, 0);

  if (items.length === 0) {
    return /* HTML */ `
      <div class="cart-modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="cart-modal bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-hidden">
          <div class="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 class="text-lg font-bold text-gray-900">장바구니</h2>
            <button id="cart-modal-close-btn" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div class="p-4 text-center">
            <p class="text-gray-500">장바구니가 비어있습니다</p>
          </div>
        </div>
      </div>
    `;
  }

  return /* HTML */ `
    <div class="cart-modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="cart-modal bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-hidden">
        <div class="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 class="text-lg font-bold text-gray-900">장바구니</h2>
          <button id="cart-modal-close-btn" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="p-4">
          <!-- 전체 선택 체크박스 -->
          <div class="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              id="cart-modal-select-all-checkbox"
              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label for="cart-modal-select-all-checkbox" class="text-sm font-medium text-gray-900">전체선택</label>
          </div>

          <!-- 장바구니 상품 목록 -->
          <div class="space-y-3 mb-4 max-h-60 overflow-y-auto">
            ${items
              .map(
                (item) => /* HTML */ `
                  <div class="cart-item flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                    <input
                      type="checkbox"
                      class="cart-item-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div class="flex-1">
                      <h3 class="text-sm font-medium text-gray-900 line-clamp-2">${item.title}</h3>
                      <p class="text-sm text-gray-600">${item.lprice?.toLocaleString()}원</p>
                    </div>
                    <div class="flex items-center gap-2">
                      <button
                        class="quantity-decrease-btn w-6 h-6 flex items-center justify-center border border-gray-300 rounded bg-gray-50 hover:bg-gray-100"
                        data-product-id="${item.productId}"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                        </svg>
                      </button>
                      <input
                        type="number"
                        class="quantity-input w-12 h-6 text-center text-sm border border-gray-300 rounded"
                        value="${item.quantity}"
                        min="1"
                        data-product-id="${item.productId}"
                      />
                      <button
                        class="quantity-increase-btn w-6 h-6 flex items-center justify-center border border-gray-300 rounded bg-gray-50 hover:bg-gray-100"
                        data-product-id="${item.productId}"
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
                      <button
                        class="cart-item-remove-btn text-red-500 hover:text-red-700"
                        data-product-id="${item.productId}"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                `,
              )
              .join("")}
          </div>

          <!-- 총 금액 -->
          <div class="flex justify-between items-center mb-4 p-3 bg-gray-50 rounded-lg">
            <span class="text-sm font-medium text-gray-900">총 금액</span>
            <span class="text-lg font-bold text-blue-600">${totalAmount.toLocaleString()}원</span>
          </div>

          <!-- 버튼들 -->
          <div class="flex gap-2">
            <button
              id="cart-modal-clear-cart-btn"
              class="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors text-sm"
            >
              전체 비우기
            </button>
            <button
              id="cart-modal-remove-selected-btn"
              class="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors text-sm"
            >
              선택 삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function setupCartModalEventListeners() {
  // 모달 닫기 버튼
  document.querySelector("#cart-modal-close-btn")?.addEventListener("click", () => {
    closeCartModal();
  });

  // 배경 클릭으로 모달 닫기
  document.querySelector(".cart-modal-overlay")?.addEventListener("click", (e) => {
    if (e.target.classList.contains("cart-modal-overlay")) {
      closeCartModal();
    }
  });

  // ESC 키로 모달 닫기
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.querySelector(".cart-modal-overlay")) {
      closeCartModal();
    }
  });

  // 전체 선택 체크박스
  document.querySelector("#cart-modal-select-all-checkbox")?.addEventListener("change", (e) => {
    const checkboxes = document.querySelectorAll(".cart-item-checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = e.target.checked;
    });
  });

  // 개별 상품 체크박스
  document.querySelectorAll(".cart-item-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      updateSelectAllCheckbox();
    });
  });

  // 수량 증가 버튼
  document.querySelectorAll(".quantity-increase-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.dataset.productId;
      const item = cartStore.state.items.find((item) => item.productId === productId);
      if (item) {
        cartStore.updateQuantity(productId, item.quantity + 1);
        renderCartModal();
      }
    });
  });

  // 수량 감소 버튼
  document.querySelectorAll(".quantity-decrease-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.dataset.productId;
      const item = cartStore.state.items.find((item) => item.productId === productId);
      if (item && item.quantity > 1) {
        cartStore.updateQuantity(productId, item.quantity - 1);
        renderCartModal();
      }
    });
  });

  // 수량 입력 필드
  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("change", (e) => {
      const productId = e.target.dataset.productId;
      const quantity = parseInt(e.target.value) || 1;
      cartStore.updateQuantity(productId, quantity);
      renderCartModal();
    });
  });

  // 삭제 버튼
  document.querySelectorAll(".cart-item-remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.dataset.productId;
      cartStore.removeFromCart(productId);
      renderCartModal();
    });
  });

  // 선택 삭제 버튼
  document.querySelector("#cart-modal-remove-selected-btn")?.addEventListener("click", () => {
    const selectedCheckboxes = document.querySelectorAll(".cart-item-checkbox:checked");
    const selectedProductIds = Array.from(selectedCheckboxes).map((checkbox) => {
      const cartItem = checkbox.closest(".cart-item");
      const removeBtn = cartItem.querySelector(".cart-item-remove-btn");
      return removeBtn.dataset.productId;
    });

    if (selectedProductIds.length > 0) {
      cartStore.removeSelectedItems(selectedProductIds);
      renderCartModal();
    }
  });

  // 전체 비우기 버튼
  document.querySelector("#cart-modal-clear-cart-btn")?.addEventListener("click", () => {
    cartStore.clearCart();
    closeCartModal();
  });
}

function updateSelectAllCheckbox() {
  const checkboxes = document.querySelectorAll(".cart-item-checkbox");
  const selectAllCheckbox = document.querySelector("#cart-modal-select-all-checkbox");

  if (checkboxes.length === 0) return;

  const allChecked = Array.from(checkboxes).every((checkbox) => checkbox.checked);
  const someChecked = Array.from(checkboxes).some((checkbox) => checkbox.checked);

  selectAllCheckbox.checked = allChecked;
  selectAllCheckbox.indeterminate = someChecked && !allChecked;
}

export function openCartModal() {
  const modalContainer = document.createElement("div");
  modalContainer.id = "cart-modal-container";
  document.body.appendChild(modalContainer);

  renderCartModal();
  setupCartModalEventListeners();
}

export function closeCartModal() {
  const modalContainer = document.getElementById("cart-modal-container");
  if (modalContainer) {
    modalContainer.remove();
  }
}

export function renderCartModal() {
  const modalContainer = document.getElementById("cart-modal-container");
  if (modalContainer) {
    modalContainer.innerHTML = CartModal();
    setupCartModalEventListeners();
  }
}
