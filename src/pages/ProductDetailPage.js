import { getProducts, getProduct } from "../api/productApi.js";
import { cartStore } from "../stores/cartStore.js";
import { Footer } from "../components/Footer.js";
import { ProductDetailHeader } from "../components/ProductDetailHeader.js";
import { ProductDetailBreadcrumb } from "../components/ProductDetailBreadcrumb.js";
import { ProductDetailInfo } from "../components/ProductDetailInfo.js";
import { ProductQuantitySelector } from "../components/ProductQuantitySelector.js";
import { ProductActionButtons } from "../components/ProductActionButtons.js";
import { RelatedProducts } from "../components/RelatedProducts.js";
import { isTestEnvironment } from "../utils/isTestEnvironment.js";

const MAX_STOCK = Number.MAX_SAFE_INTEGER;

// 상품 상세 상태 관리
const productDetailStore = {
  state: {
    product: null,
    relatedProducts: [],
    quantity: 1,
    isLoading: true,
    relatedProductsLoading: false,
    error: null,
    reviewCount: 0,
    rating: 0,
  },

  async fetchProductDetail(productId) {
    this.state.isLoading = true;
    this.state.error = null;
    this.state.relatedProducts = []; // 관련 상품 초기화
    this.state.quantity = 1; // 수량 초기화
    this.state.reviewCount = 0;
    this.state.rating = 0;

    if (!isTestEnvironment()) {
      this.render();
    }

    try {
      // 개별 상품 API 사용
      const product = await getProduct(productId);
      this.state.product = product;
      this.state.reviewCount = product?.reviewCount ?? 0;
      this.state.rating = product?.rating ?? 0;

      if (!this.state.product) {
        throw new Error("상품을 찾을 수 없습니다.");
      }

      // 관련 상품 로딩
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
      // 관련 상품만 효율적으로 가져오기 (같은 카테고리 기준)
      const data = await getProducts({
        category2: this.state.product.category2,
        limit: 20,
      });

      this.state.relatedProducts = data.products
        .filter((p) => p.productId !== this.state.product.productId)
        .slice(0, 19); // 19개만
    } catch (err) {
      console.error("Failed to load related products:", err);
    } finally {
      this.state.relatedProductsLoading = false;
      this.render();
    }
  },

  increaseQuantity() {
    const maxStock = this.state.product?.stock;
    this.state.quantity = Math.min(this.state.quantity + 1, maxStock || MAX_STOCK);

    const quantityInput = document.querySelector("#quantity-input");
    if (quantityInput) {
      quantityInput.value = this.state.quantity;
    }
  },

  decreaseQuantity() {
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
      const quantityInput = document.querySelector("#quantity-input");
      if (quantityInput) {
        quantityInput.value = this.state.quantity;
      }
      return;
    }

    // 입력값을 숫자로 변환하고 범위 제한
    const quantity = parseInt(newQuantity);
    const maxStock = this.state.product?.stock;
    const newQuantityValue = Math.max(1, Math.min(quantity, maxStock || MAX_STOCK));

    // 값이 실제로 변경된 경우에만 업데이트
    if (this.state.quantity !== newQuantityValue) {
      this.state.quantity = newQuantityValue;

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

function renderLoading() {
  return /* HTML */ `
    <div class="min-h-screen bg-gray-50">
      ${ProductDetailHeader()}
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

export function ProductDetailPage() {
  const { product, relatedProducts, quantity, isLoading, relatedProductsLoading, error, reviewCount, rating } =
    productDetailStore.state;

  if (isLoading) {
    return renderLoading();
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
      ${ProductDetailHeader()}
      <main class="max-w-md mx-auto px-4 py-4">
        ${ProductDetailBreadcrumb(product)} ${ProductDetailInfo(product, rating, reviewCount)}
        ${ProductQuantitySelector(product, quantity)} ${ProductActionButtons(product)}
        ${RelatedProducts(relatedProducts, relatedProductsLoading)}
      </main>
      ${Footer()}
    </div>
  `;
}

export function initializeProductDetailPage() {
  // 장바구니 데이터 로드
  cartStore.loadFromLocalStorage();

  // URL에서 productId 추출 (window.routeParams 사용)
  const productId = window.routeParams?.productId;

  if (productId) {
    // 렌더링 콜백 설정
    productDetailStore.render = render;
    productDetailStore.fetchProductDetail(productId);
  } else {
    console.error("Product ID not found in route params");
  }

  // 이벤트 리스너는 render 함수에서 설정됨
}

function setupEventListeners() {
  // 이벤트 위임을 사용하여 document 레벨에서 이벤트 처리
  document.addEventListener("click", (e) => {
    // 수량 증가 버튼
    if (e.target.closest("#quantity-increase")) {
      productDetailStore.increaseQuantity();
    }

    // 수량 감소 버튼
    if (e.target.closest("#quantity-decrease")) {
      productDetailStore.decreaseQuantity();
    }

    // 장바구니 담기 버튼
    if (e.target.closest("#add-to-cart-btn")) {
      productDetailStore.addToCart();
    }

    // 관련 상품 클릭
    if (e.target.closest(".related-product-card")) {
      const card = e.target.closest(".related-product-card");
      const productId = card.dataset.productId;
      window.history.pushState({}, "", `/product/${productId}`);
      window.dispatchEvent(new Event("popstate"));
    }

    // 상품 목록으로 돌아가기 버튼
    if (e.target.closest(".go-to-product-list")) {
      // 현재 정렬 상태를 URL에 포함
      const currentParams = new URLSearchParams(window.location.search);
      const sort = currentParams.get("sort");
      const queryString = sort ? `?sort=${sort}` : "";

      window.history.pushState({}, "", `/${queryString}`);
      window.dispatchEvent(new Event("popstate"));
    }
  });

  // input의 value 관력 이벤트는 직접 바인딩 (이벤트 위임이 어려움)
  const quantityInput = document.querySelector("#quantity-input");
  if (quantityInput) {
    // 기존 이벤트 리스너 제거 (중복 방지)
    const newQuantityInput = quantityInput.cloneNode(true);
    quantityInput.parentNode.replaceChild(newQuantityInput, quantityInput);

    // 새로운 이벤트 리스너 추가
    newQuantityInput.addEventListener("change", (e) => {
      productDetailStore.updateQuantity(e.target.value);
    });

    newQuantityInput.addEventListener("blur", (e) => {
      productDetailStore.updateQuantity(e.target.value);
    });

    newQuantityInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        productDetailStore.updateQuantity(e.target.value);
        e.target.blur();
      }
    });
  }
}

function render() {
  document.getElementById("root").innerHTML = ProductDetailPage();

  // DOM이 완전히 렌더링된 후에 이벤트 리스너 설정
  setTimeout(() => {
    setupEventListeners();
  }, 0);
}
