import { createInfiniteScrollObserver } from "../utils/createInfiniteScrollObserver.js";
import { getQueryParams, setQueryParams } from "../utils/urlParams.js";
import { isTestEnvironment } from "../utils/isTestEnvironment.js";
import { getProducts } from "../api/productApi.js";

let infiniteScrollObserverInstance = null;

const productState = {
  products: [],
  isLoading: true,
  error: null,
  totalCount: 0,
  filters: {
    page: 1,
    limit: 20,
    search: "",
    category1: "",
    category2: "",
    sort: "price_asc",
    ...getQueryParams(),
  },

  fetchProducts: async (append = false) => {
    productState.isLoading = true;
    productState.error = null;

    if (!isTestEnvironment()) {
      render();
    }

    try {
      const data = await getProducts(productState.filters);
      productState.products = append ? [...productState.products, ...data.products] : data.products;
      productState.totalCount = data.pagination.total;
    } catch (err) {
      console.error("Failed to fetch products:", err);
      productState.error = err;
    } finally {
      productState.isLoading = false;
      render();
    }
  },

  updateFetchProducts: () => {
    productState.filters.page = productState.filters.page + 1;
    productState.fetchProducts(true);
    setQueryParams(productState.filters);
  },
};

// 장바구니 상태 관리
const cartState = {
  items: [],
  getCartCount() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  },
  addToCart(product) {
    const existingItem = this.items.find((item) => item.productId === product.productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    this.saveToSessionStorage();
    this.updateCartBadge();
    showToast("장바구니에 추가되었습니다", "success");
  },
  removeFromCart(productId) {
    const item = this.items.find((item) => item.productId === productId);
    this.items = this.items.filter((item) => item.productId !== productId);
    this.saveToSessionStorage();
    this.updateCartBadge();
    if (item) {
      showToast(`${item.title}이(가) 장바구니에서 삭제되었습니다`, "info");
    }
  },
  removeSelectedItems(selectedProductIds) {
    const removedItems = this.items.filter((item) => selectedProductIds.includes(item.productId));
    this.items = this.items.filter((item) => !selectedProductIds.includes(item.productId));
    this.saveToSessionStorage();
    this.updateCartBadge();
    if (removedItems.length > 0) {
      showToast(`선택한 ${removedItems.length}개 상품이 삭제되었습니다`, "info");
    }
  },
  clearCart() {
    const itemCount = this.items.length;
    this.items = [];
    this.saveToSessionStorage();
    this.updateCartBadge();
    if (itemCount > 0) {
      showToast("장바구니가 비워졌습니다", "info");
    }
  },
  updateQuantity(productId, quantity) {
    const item = this.items.find((item) => item.productId === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.saveToSessionStorage();
        this.updateCartBadge();
      }
    }
  },
  saveToSessionStorage() {
    sessionStorage.setItem("cart", JSON.stringify(this.items));
  },
  loadFromSessionStorage() {
    const savedCart = sessionStorage.getItem("cart");
    if (savedCart) {
      this.items = JSON.parse(savedCart);
    }
  },
  updateCartBadge() {
    const cartIcon = document.querySelector("#cart-icon-btn");
    if (cartIcon) {
      const count = this.getCartCount();
      let badge = cartIcon.querySelector(".cart-badge");

      if (count > 0) {
        if (!badge) {
          badge = document.createElement("span");
          badge.className =
            "cart-badge absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center";
          cartIcon.appendChild(badge);
        }
        badge.textContent = count;
      } else if (badge) {
        badge.remove();
      }
    }
  },
};

// 토스트 메시지 함수
function showToast(message, type = "success") {
  // 기존 토스트 제거
  const existingToast = document.querySelector(".toast-message");
  if (existingToast) {
    existingToast.remove();
  }

  // 타입별 스타일 설정
  const typeStyles = {
    success: "bg-green-500 text-white",
    info: "bg-blue-500 text-white",
    error: "bg-red-500 text-white",
  };

  // 새 토스트 생성
  const toast = document.createElement("div");
  //하단 가운데
  toast.className = `toast-message fixed bottom-4 left-1/2 transform -translate-x-1/2 ${typeStyles[type]} px-4 py-3 rounded-lg shadow-lg z-50 flex items-center justify-between min-w-64`;

  // 메시지 텍스트
  const messageText = document.createElement("span");
  messageText.textContent = message;
  toast.appendChild(messageText);

  // 닫기 버튼
  const closeButton = document.createElement("button");
  closeButton.className = "ml-3 text-white hover:text-gray-200 focus:outline-none";
  closeButton.innerHTML = `
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
  `;
  closeButton.addEventListener("click", () => {
    if (toast.parentNode) {
      toast.remove();
    }
  });
  toast.appendChild(closeButton);

  document.body.appendChild(toast);

  // 3초 후 자동 제거
  const autoRemoveTimer = setTimeout(() => {
    if (toast.parentNode) {
      toast.remove();
    }
  }, 3000);

  // 닫기 버튼 클릭 시 타이머 취소
  closeButton.addEventListener("click", () => {
    clearTimeout(autoRemoveTimer);
  });
}

// 테스트 환경에서 상태를 초기화하는 함수
export function resetState() {
  productState.products = [];
  productState.isLoading = true;
  productState.error = null;
  productState.totalCount = 0;
  productState.filters = {
    page: 1,
    limit: 20,
    search: "",
    category1: "",
    category2: "",
    sort: "price_asc",
    ...getQueryParams(),
  };

  cartState.items = [];
  cartState.saveToSessionStorage();
  cartState.updateCartBadge();

  if (infiniteScrollObserverInstance) {
    infiniteScrollObserverInstance.destroy();
    infiniteScrollObserverInstance = null;
  }
}

// 테스트 환경에서 전역 함수로 노출
if (isTestEnvironment()) {
  window.__TEST_STATE_RESET__ = resetState;
  window.__TEST_CART_STATE__ = cartState;
  window.__TEST_SHOW_TOAST__ = showToast;
}

const setupInfiniteScrollObserver = () => {
  // 이미 인스턴스가 존재하면 다시 생성하지 않음 (단 한 번만 초기화)
  if (!infiniteScrollObserverInstance) {
    infiniteScrollObserverInstance = createInfiniteScrollObserver(productState.updateFetchProducts, {
      getIsLoading: () => productState.isLoading,
      hasMore: () => productState.products.length < productState.totalCount,
    });
  }
  // init 호출: 초기 또는 DOM 변경 시 트리거 요소 관찰 시작
  infiniteScrollObserverInstance.init();
};

const setupEventListeners = () => {
  const { error, filters, fetchProducts } = productState;

  if (error) {
    document.querySelector("#retry-button")?.addEventListener("click", fetchProducts);
  }

  const searchInput = document.querySelector("#search-input");
  const performSearch = () => {
    filters.page = 1;
    setQueryParams(filters);
    fetchProducts();
  };

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      filters.search = e.target.value.trim();
    });

    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        performSearch();
      }
    });
  }

  document.querySelector("#limit-select")?.addEventListener("change", (e) => {
    filters.limit = Number(e.target.value);
    filters.page = 1;
    setQueryParams(filters);
    fetchProducts();
  });

  document.querySelector("#sort-select")?.addEventListener("change", (e) => {
    filters.sort = e.target.value;
    filters.page = 1;
    setQueryParams(filters);
    fetchProducts();
  });

  // 장바구니 버튼 클릭 이벤트
  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const productId = button.getAttribute("data-product-id");
      const productCard = button.closest(".product-card");
      const product = {
        productId,
        title: productCard.querySelector("h3").textContent,
        brand: productCard.querySelector("p").textContent,
        image: productCard.querySelector("img").src,
        lprice: parseInt(productCard.querySelector(".text-lg").textContent.replace(/[^0-9]/g, "")),
      };

      cartState.addToCart(product);
    });
  });
};

export function ProductListPage() {
  const { isLoading, filters, products, error, totalCount } = productState;

  return /* HTML */ `
    <div class="min-h-screen bg-gray-50">
      ${Header()}
      <main class="max-w-md mx-auto px-4 py-4">
        ${Filters({ isLoading, filters })}
        <div class="mb-6">${ProductGrid({ isLoading, products, error, totalCount, limit: filters.limit })}</div>
      </main>
      <!-- 무한 스크롤 트리거 -->
      <div class="infinite-scroll-trigger"></div>
      ${Footer()}
    </div>
  `;
}

export function initializeProductListPage() {
  cartState.loadFromSessionStorage();

  render();
  setupInfiniteScrollObserver();
  productState.fetchProducts();
  cartState.updateCartBadge();
}

function Header() {
  return /* HTML */ `
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
            </button>
          </div>
        </div>
      </div>
    </header>
  `;
}

function ProductGrid({ isLoading, products, totalCount, limit, error }) {
  if (isLoading) {
    return /* HTML */ `
      <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
        <!-- 로딩 스켈레톤 -->
        ${Array.from({ length: limit })
          .map(
            () => /* HTML */ `
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                <div class="aspect-square bg-gray-200"></div>
                <div class="p-3">
                  <div class="h-4 bg-gray-200 rounded mb-2"></div>
                  <div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div class="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            `,
          )
          .join("")}
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
    `;
  }

  if (error) {
    return /* HTML */ `
      <div class="text-center py-10">
        <p class="text-red-500 mb-4">상품을 불러오는데 실패했습니다: ${error.message}</p>
        <button id="retry-button" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">재시도</button>
      </div>
    `;
  }

  if (products.length === 0) {
    return /* HTML */ `
      <div class="text-center py-10">
        <p class="text-gray-500">상품이 없습니다.</p>
      </div>
    `;
  }

  return /* HTML */ `
    <div class="mb-4 text-sm text-gray-600">
      총 <span class="font-medium text-gray-900">${totalCount}개</span>의 상품
    </div>
    <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
      ${products
        .map(
          ({ productId, title, brand, image, lprice }) => /* HTML */ `
            <div
              class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden product-card"
              data-product-id="${productId}"
            >
              <!-- 상품 이미지 -->
              <div class="aspect-square bg-gray-100 overflow-hidden cursor-pointer product-image">
                <img
                  src="${image}"
                  alt="${title}"
                  class="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                  loading="lazy"
                />
              </div>
              <!-- 상품 정보 -->
              <div class="p-3">
                <div class="cursor-pointer product-info mb-3">
                  <h3 class="text-sm font-medium text-gray-900 line-clamp-2 mb-1">${title}</h3>
                  <p class="text-xs text-gray-500 mb-2">${brand}</p>
                  <p class="text-lg font-bold text-gray-900">${lprice?.toLocaleString()}원</p>
                </div>
                <!-- 장바구니 버튼 -->
                <button
                  class="w-full bg-blue-600 text-white text-sm py-2 px-3 rounded-md hover:bg-blue-700 transition-colors add-to-cart-btn"
                  data-product-id="${productId}"
                >
                  장바구니 담기
                </button>
              </div>
            </div>
          `,
        )
        .join("")}
    </div>
    <div class="text-center py-4 text-sm text-gray-500">모든 상품을 확인했습니다</div>
  `;
}

function Filters({ isLoading, filters }) {
  const { search, limit, sort } = filters;
  return /* HTML */ `
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
      <!-- 검색창 -->
      <div class="mb-4">
        <div class="flex gap-2">
          <div class="relative flex-1">
            <input
              type="text"
              id="search-input"
              placeholder="상품명을 검색해보세요..."
              value="${search}"
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
          </div>
          <!-- 1depth 카테고리 -->
          <div class="flex flex-wrap gap-2">
            ${isLoading
              ? /* HTML */ ` <div class="text-sm text-gray-500 italic">카테고리 로딩 중...</div> `
              : /* HTML */ `
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
              <option value="10" ${limit === 10 ? "selected" : ""}>10개</option>
              <option value="20" ${limit === 20 ? "selected" : ""}>20개</option>
              <option value="50" ${limit === 50 ? "selected" : ""}>50개</option>
              <option value="100" ${limit === 100 ? "selected" : ""}>100개</option>
            </select>
          </div>
          <!-- 정렬 -->
          <div class="flex items-center gap-2">
            <label class="text-sm text-gray-600">정렬:</label>
            <select
              id="sort-select"
              class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="price_asc" ${sort === "price_asc" ? "selected" : ""}>가격 낮은순</option>
              <option value="price_desc" ${sort === "price_desc" ? "selected" : ""}>가격 높은순</option>
              <option value="name_asc" ${sort === "name_asc" ? "selected" : ""}>이름순</option>
              <option value="name_desc" ${sort === "name_desc" ? "selected" : ""}>이름 역순</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  `;
}

function Footer() {
  return /* HTML */ `
    <footer class="bg-white shadow-sm sticky top-0 z-40">
      <div class="max-w-md mx-auto py-8 text-center text-gray-500">
        <p>© 2025 항해플러스 프론트엔드 쇼핑몰</p>
      </div>
    </footer>
  `;
}

function render() {
  document.getElementById("root").innerHTML = ProductListPage();
  setupEventListeners();
  setupInfiniteScrollObserver();
}
