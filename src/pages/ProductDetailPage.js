import { getProducts } from "../api/productApi.js";
import { cartStore } from "../stores/cartStore.js";
import { Footer } from "../components/Footer.js";
import { isTestEnvironment } from "../utils/isTestEnvironment.js";

// 상품 상세 상태 관리
const productDetailStore = {
  state: {
    product: null,
    relatedProducts: [],
    quantity: 1,
    isLoading: true,
    relatedProductsLoading: false,
    error: null,
  },

  async fetchProductDetail(productId) {
    this.state.isLoading = true;
    this.state.error = null;
    this.state.relatedProducts = []; // 관련 상품 초기화

    if (!isTestEnvironment()) {
      this.render();
    }

    try {
      // 1단계: 상품 상세 정보만 먼저 가져오기
      const data = await getProducts({ limit: 100 });
      this.state.product = data.products.find((p) => p.productId === productId);

      if (!this.state.product) {
        throw new Error("상품을 찾을 수 없습니다.");
      }

      // 2단계: 관련 상품은 별도로 비동기 로드
      this.loadRelatedProducts();
    } catch (err) {
      console.error("Failed to fetch product detail:", err);
      this.state.error = err;
    } finally {
      this.state.isLoading = false;
      this.render();
    }
  },

  async loadRelatedProducts() {
    this.state.relatedProductsLoading = true;
    this.render(); // 로딩 상태 표시

    try {
      // 관련 상품만 별도로 가져오기
      const data = await getProducts({ limit: 100 });

      this.state.relatedProducts = data.products
        .filter((p) => p.category2 === this.state.product.category2 && p.productId !== this.state.product.productId)
        .slice(0, 19); // 19개만
    } catch (err) {
      console.error("Failed to load related products:", err);
    } finally {
      this.state.relatedProductsLoading = false;
      this.render();
    }
  },

  increaseQuantity() {
    console.log("increaseQuantity called, current quantity:", this.state.quantity);
    const maxStock = this.state.product?.stock || 107;
    this.state.quantity = Math.min(this.state.quantity + 1, maxStock);

    const quantityInput = document.querySelector("#quantity-input");
    if (quantityInput) {
      quantityInput.value = this.state.quantity;
    }
  },

  decreaseQuantity() {
    console.log("decreaseQuantity called, current quantity:", this.state.quantity);
    this.state.quantity = Math.max(this.state.quantity - 1, 1);

    const quantityInput = document.querySelector("#quantity-input");
    if (quantityInput) {
      quantityInput.value = this.state.quantity;
    }
  },

  updateQuantity(newQuantity) {
    // 빈 문자열이나 유효하지 않은 값 처리
    if (!newQuantity || newQuantity === "" || isNaN(newQuantity)) {
      this.state.quantity = 1;
      console.log("Invalid input, reset to:", this.state.quantity);
      // input 값만 업데이트 (렌더링하지 않음)
      const quantityInput = document.querySelector("#quantity-input");
      if (quantityInput) {
        quantityInput.value = this.state.quantity;
      }
      return;
    }

    // 입력값을 숫자로 변환하고 범위 제한
    const quantity = parseInt(newQuantity);
    const maxStock = this.state.product?.stock || 107;
    const newQuantityValue = Math.max(1, Math.min(quantity, maxStock));

    // 값이 실제로 변경된 경우에만 업데이트
    if (this.state.quantity !== newQuantityValue) {
      this.state.quantity = newQuantityValue;
      console.log("Updated quantity to:", this.state.quantity);

      // input 값도 업데이트 (렌더링하지 않음)
      const quantityInput = document.querySelector("#quantity-input");
      if (quantityInput) {
        quantityInput.value = this.state.quantity;
      }
    }
  },

  addToCart() {
    if (this.state.product) {
      const productWithQuantity = {
        ...this.state.product,
        quantity: this.state.quantity,
      };
      cartStore.addToCart(productWithQuantity);
    }
  },

  reset() {
    this.state.product = null;
    this.state.relatedProducts = [];
    this.state.quantity = 1;
    this.state.isLoading = true;
    this.state.relatedProductsLoading = false;
    this.state.error = null;
  },

  // 렌더링 콜백 (외부에서 주입)
  render: null,
};

// 전역으로 노출 (HTML onchange/oninput에서 접근 가능하도록)
window.productDetailStore = productDetailStore;

// 테스트 환경에서 전역 함수로 노출
if (isTestEnvironment()) {
  window.__TEST_PRODUCT_DETAIL_STATE__ = productDetailStore;
}

export function ProductDetailPage() {
  const { product, relatedProducts, quantity, isLoading, relatedProductsLoading, error } = productDetailStore.state;

  if (isLoading) {
    return /* HTML */ `
      <div class="min-h-screen bg-gray-50">
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
                </button>
              </div>
            </div>
          </div>
        </header>
        <main class="max-w-md mx-auto px-4 py-4">
          <div class="py-20 bg-gray-50 flex items-center justify-center">
            <div class="text-center">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p class="text-gray-600">상품 정보를 불러오는 중...</p>
            </div>
          </div>
        </main>
        ${Footer()}
      </div>
    `;
  }

  if (error || !product) {
    return /* HTML */ `
      <div class="min-h-screen bg-gray-50">
        <div class="text-center py-10">
          <p class="text-red-500 mb-4">상품을 불러오는데 실패했습니다.</p>
          <button onclick="window.history.back()" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            뒤로 가기
          </button>
        </div>
      </div>
    `;
  }

  return /* HTML */ `
    <div class="min-h-screen bg-gray-50">
      <!-- 헤더 -->
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
                ${cartStore.getCartCount() > 0
                  ? `
                <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  ${cartStore.getCartCount()}
                </span>
                `
                  : ""}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main class="max-w-md mx-auto px-4 py-4">
        <!-- 브레드크럼 -->
        <nav class="mb-4">
          <div class="flex items-center space-x-2 text-sm text-gray-600">
            <a href="/" data-link="" class="hover:text-blue-600 transition-colors">홈</a>
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
            <button class="breadcrumb-link" data-category1="${product.category1 || "카테고리"}">
              ${product.category1 || "카테고리"}
            </button>
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
            <button class="breadcrumb-link" data-category2="${product.category2 || "서브카테고리"}">
              ${product.category2 || "서브카테고리"}
            </button>
          </div>
        </nav>

        <!-- 상품 상세 정보 -->
        <div class="bg-white rounded-lg shadow-sm mb-6">
          <!-- 상품 이미지 -->
          <div class="p-4">
            <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img
                src="${product.image}"
                alt="${product.title}"
                class="w-full h-full object-cover product-detail-image"
              />
            </div>
            <!-- 상품 정보 -->
            <div>
              <p class="text-sm text-gray-600 mb-1">${product.brand || ""}</p>
              <h1 class="text-xl font-bold text-gray-900 mb-3">${product.title}</h1>
              <!-- 평점 및 리뷰 -->
              <div class="flex items-center mb-3">
                <div class="flex items-center">
                  ${Array.from({ length: 5 }, (_, i) => {
                    const rating = product.rating || 4.0;
                    const isFilled = i < Math.floor(rating);
                    const isHalf = i === Math.floor(rating) && rating % 1 > 0;
                    const color = isFilled || isHalf ? "text-yellow-400" : "text-gray-300";
                    return `<svg class="w-4 h-4 ${color}" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>`;
                  }).join("")}
                </div>
                <span class="ml-2 text-sm text-gray-600"
                  >${product.rating || 4.0} (${product.reviewCount || 749}개 리뷰)</span
                >
              </div>
              <!-- 가격 -->
              <div class="mb-4">
                <span class="text-2xl font-bold text-blue-600">${product.lprice?.toLocaleString()}원</span>
              </div>
              <!-- 재고 -->
              <div class="text-sm text-gray-600 mb-4">재고 ${product.stock || 107}개</div>
              <!-- 설명 -->
              <div class="text-sm text-gray-700 leading-relaxed mb-6">
                ${product.description || product.title}에 대한 상세 설명입니다. 브랜드의 우수한 품질을 자랑하는
                상품으로, 고객 만족도가 높은 제품입니다.
              </div>
            </div>
          </div>
          <!-- 수량 선택 및 액션 -->
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
                  value="${quantity}"
                  min="1"
                  max="${product.stock || 107}"
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
            <!-- 액션 버튼 -->
            <button
              id="add-to-cart-btn"
              data-product-id="${product.productId}"
              class="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              장바구니 담기
            </button>
          </div>
        </div>

        <!-- 상품 목록으로 이동 -->
        <div class="mb-6">
          <button
            class="block w-full text-center bg-gray-100 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-200 transition-colors go-to-product-list"
          >
            상품 목록으로 돌아가기
          </button>
        </div>

        <!-- 관련 상품 섹션: 상품이 로드된 후에만 표시 -->
        ${product
          ? `
        <div class="bg-white rounded-lg shadow-sm">
          <div class="p-4 border-b border-gray-200">
            <h2 class="text-lg font-bold text-gray-900">관련 상품</h2>
            <p class="text-sm text-gray-600">같은 카테고리의 다른 상품들</p>
          </div>
          <div class="p-4">
            ${
              relatedProductsLoading
                ? `
              <!-- 로딩 상태 -->
              <div class="text-center py-8">
                <div class="inline-flex items-center">
                  <svg class="animate-spin h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span class="text-sm text-gray-600">관련 상품을 불러오는 중...</span>
                </div>
              </div>
            `
                : relatedProducts.length > 0
                  ? `
              <!-- 관련 상품 목록 -->
              <div class="grid grid-cols-2 gap-3 responsive-grid">
                ${relatedProducts
                  .map(
                    (relatedProduct) => /* HTML */ `
                      <div
                        class="bg-gray-50 rounded-lg p-3 related-product-card cursor-pointer"
                        data-product-id="${relatedProduct.productId}"
                      >
                        <div class="aspect-square bg-white rounded-md overflow-hidden mb-2">
                          <img
                            src="${relatedProduct.image}"
                            alt="${relatedProduct.title}"
                            class="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">${relatedProduct.title}</h3>
                        <p class="text-sm font-bold text-blue-600">${relatedProduct.lprice?.toLocaleString()}원</p>
                      </div>
                    `,
                  )
                  .join("")}
              </div>
            `
                  : `
              <!-- 관련 상품 없음 -->
              <div class="text-center py-8">
                <p class="text-sm text-gray-500">관련 상품이 없습니다.</p>
              </div>
            `
            }
          </div>
        </div>
        `
          : ""}
      </main>
      ${Footer()}
    </div>
  `;
}

export function initializeProductDetailPage() {
  // URL에서 productId 추출 (window.routeParams 사용)
  const productId = window.routeParams?.productId;

  if (productId) {
    // 렌더링 콜백 설정
    productDetailStore.render = render;
    productDetailStore.fetchProductDetail(productId);
  } else {
    console.error("Product ID not found in route params");
  }

  // 이벤트 리스너 설정
  setupEventListeners();
}

function setupEventListeners() {
  // 수량 증가/감소 버튼
  document.querySelector("#quantity-increase")?.addEventListener("click", () => {
    productDetailStore.increaseQuantity();
  });

  document.querySelector("#quantity-decrease")?.addEventListener("click", () => {
    productDetailStore.decreaseQuantity();
  });

  const quantityInput = document.querySelector("#quantity-input");
  if (quantityInput && !quantityInput.hasAttribute("data-listeners-attached")) {
    quantityInput.setAttribute("data-listeners-attached", "true");

    // change 이벤트 (포커스 아웃 시)
    quantityInput.addEventListener("change", (e) => {
      productDetailStore.updateQuantity(e.target.value);
    });

    // blur 이벤트 (포커스 아웃 시, 최종 검증)
    quantityInput.addEventListener("blur", (e) => {
      productDetailStore.updateQuantity(e.target.value);
    });

    // Enter 키 입력 시
    quantityInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        productDetailStore.updateQuantity(e.target.value);
        quantityInput.blur();
      }
    });
  }

  // 장바구니 담기 버튼
  document.querySelector("#add-to-cart-btn")?.addEventListener("click", () => {
    productDetailStore.addToCart();
  });

  // 관련 상품 클릭
  document.querySelectorAll(".related-product-card").forEach((card) => {
    card.addEventListener("click", () => {
      const productId = card.dataset.productId;
      window.history.pushState({}, "", `/product/${productId}`);
      window.dispatchEvent(new Event("popstate"));
    });
  });

  document.querySelector(".go-to-product-list")?.addEventListener("click", () => {
    window.history.pushState({}, "", "/");
    window.dispatchEvent(new Event("popstate"));
  });
}

function render() {
  document.getElementById("root").innerHTML = ProductDetailPage();
  setupEventListeners();
}
