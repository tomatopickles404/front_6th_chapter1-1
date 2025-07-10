import { getProducts } from "../api/productApi.js";
import { createInfiniteScrollObserver } from "../utils/createInfiniteScrollObserver.js";
import { getQueryParams, setQueryParams } from "../utils/urlParams.js";
import { isTestEnvironment } from "../utils/isTestEnvironment.js";

const state = {
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
};

let infiniteScrollObserverInstance = null;

// 테스트 환경에서 상태를 초기화하는 함수
export function resetState() {
  state.products = [];
  state.isLoading = true;
  state.error = null;
  state.totalCount = 0;
  state.filters = {
    page: 1,
    limit: 20,
    search: "",
    category1: "",
    category2: "",
    sort: "price_asc",
    ...getQueryParams(),
  };

  if (infiniteScrollObserverInstance) {
    infiniteScrollObserverInstance.destroy();
    infiniteScrollObserverInstance = null;
  }
}

// 테스트 환경에서 전역 함수로 노출
if (isTestEnvironment()) {
  window.__TEST_STATE_RESET__ = resetState;
}

const fetchProducts = async (append = false) => {
  state.isLoading = true;
  state.error = null;

  if (!isTestEnvironment()) {
    render();
  }

  try {
    const data = await getProducts(state.filters);
    state.products = append ? [...state.products, ...data.products] : data.products;
    state.totalCount = data.pagination.total;
  } catch (err) {
    console.error("Failed to fetch products:", err);
    state.error = err;
  } finally {
    state.isLoading = false;
    render();
  }
};

const setupInfiniteScrollObserver = () => {
  // 이미 인스턴스가 존재하면 다시 생성하지 않음 (단 한 번만 초기화)
  if (!infiniteScrollObserverInstance) {
    infiniteScrollObserverInstance = createInfiniteScrollObserver(updateFetchProducts, {
      getIsLoading: () => state.isLoading, // 현재 로딩 중인지 여부 전달
      hasMore: () => state.products.length < state.totalCount, // 더 불러올 데이터가 있는지 여부 전달
    });
  }
  // init 호출: 초기 또는 DOM 변경 시 트리거 요소 관찰 시작
  infiniteScrollObserverInstance.init();
};

const updateFetchProducts = () => {
  state.filters.page = state.filters.page + 1;
  setQueryParams(state.filters);
  fetchProducts(true);
};

const setupEventListeners = () => {
  const { error, filters } = state;

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
};

export function ProductListPage() {
  const { isLoading, filters, products, error, totalCount } = state;

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
  render();
  fetchProducts();
  setupInfiniteScrollObserver();
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
