<template>
  <div class="wrap container py-3 py-md-6" v-if="JSON.stringify(product) !== '{}'">
    <nav class="mb-4" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a class="text-decoration-none text-dark" href="#">首頁</a></li>
        <li class="breadcrumb-item"><a class="text-decoration-none text-dark"
        href="#/products">拼圖列表</a></li>
        <li class="breadcrumb-item active" aria-current="page">{{product.title}}</li>
      </ol>
    </nav>
    <div class="row mb-5 mb-md-9">
      <div class="productPictureArea col-md-6 d-flex justify-content-center
      align-items-center">
        <img :src="product.imageUrl" alt="產品圖片"
        :class="{'straight': product.category === '直', 'horizontal': product.category === '橫'}">
      </div>
      <div class="col-md-6 d-flex flex-column justify-content-between">
        <div class="productContent position-relative">
          <button class="favoriteArea" :class="{'active': myFavorite.includes(product.id)}"
          @click.stop="addMyFavorite(product)">
            <i class="bi bi-bookmark-star icon"></i>
            <i class="bi bi-bookmark-star-fill text-primary hover"></i>
          </button>
          <h2 class="fw-bold mb-3">{{product.title}}</h2>
          <h3 class="h6 titleS">拼圖介紹</h3>
          <p>{{product.content}}</p>
          <h3 class="h6 titleS">拼圖資訊</h3>
          <div class="mb-2">
            <p v-if="product.allPiece.length === 1">拼圖片數：{{product.piece}}</p>
            <div class="d-flex align-items-center" else>
              <p class="mb-0">拼圖片數：</p>
              <button type="button" class="btn btn-sm btn-outline-dark me-2 "
              :class="{'active': piece === product.piece}" @click="toProduct(index)"
              v-for="(piece, index) in product.allPiece" :key="piece">{{piece}}片</button>
            </div>
          </div>
          <p>拼圖風格：<span v-for="item in product.style" :key="item">{{item}}</span></p>
          <hr class="d-none d-md-block">
        </div>
        <div>
          <p class="fs-2 text-decoration-line-through mb-0"
          v-if="product.price < product.origin_price">
            NT${{toCurrency(product.origin_price)}}
          </p>
          <p class="h3 mb-3">NT${{toCurrency(product.price)}}</p>
          <div class="d-flex">
            <div class="qtyArea d-flex me-3">
              <button class="qtyBtn" type="button" :disabled="qty === 1" @click="qty -= 1">
                <i class="icon bi bi-dash-square"></i>
                <i class="hover bi bi-dash-square-fill"></i>
              </button>
              <span class="qty">{{qty}}</span>
              <button class="qtyBtn" type="button" @click="qty += 1">
                <i class="icon bi bi-plus-square"></i>
                <i class="hover bi bi-plus-square-fill"></i>
              </button>
            </div>
            <button class="btn btn-primary px-5" type="button" @click="addCart">加入購物車</button>
          </div>
        </div>
      </div>
    </div>
    <hr class="d-block d-md-none">
    <div class="cardCarouselArea" ref="newProductRecommend" v-if="relatedProducts.length !== 0">
      <h2 class="text-center mb-3 mb-md-4 fw-bold">相關產品</h2>
      <CardCarousel :carouselData="renderRelatedProducts"
      @getProductData="getProductData" @changePiece="changePiece" :key="renderRelatedProducts"/>
    </div>
  </div>
  <div class="loading" v-if="getProductLoading">
    <div class="icon"></div>
  </div>
</template>

<script>
import CardCarousel from '@/components/CardCarousel.vue';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
const storageMethods = {
  save(favorite) {
    const favoriteString = JSON.stringify(favorite);
    localStorage.setItem('pinpinFavorite', favoriteString);
  },
  get() {
    return JSON.parse(localStorage.getItem('pinpinFavorite'));
  },
};

export default {
  data() {
    return {
      product: {},
      allProducts: [],
      products: [],
      relatedProducts: [],
      renderRelatedProducts: [],
      myFavorite: storageMethods.get() || [],
      renderCardNum: 0,
      qty: 1,
      getProductLoading: false,
    };
  },
  props: ['id'],
  components: {
    CardCarousel,
  },
  methods: {
    getProductData(id = this.id) {
      this.getProductLoading = true;
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http.get(url)
        .then((res) => {
          if (res.data.success) {
            this.product = res.data.product;
            this.getAllProductsData();
            // this.allProductsProcessing();
            this.getProductLoading = false;
          } else {
            this.$swal({
              title: '產品資訊讀取失敗！',
              showConfirmButton: false,
              icon: 'error',
              timer: 2000,
            });
          }
        })
        .catch(() => {
          this.$swal({
            title: '網頁發生錯誤，請重新整理此頁面！',
            showConfirmButton: false,
            icon: 'error',
            timer: 2000,
          });
        });
    },
    getAllProductsData() {
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http.get(url)
        .then((res) => {
          if (res.data.success) {
            this.allProducts = res.data.products;
            this.allProductsProcessing();
          } else {
            this.$swal({
              title: '產品資訊讀取失敗！',
              showConfirmButton: false,
              icon: 'error',
              timer: 2000,
            });
          }
        })
        .catch(() => {
          this.$swal({
            title: '網頁發生錯誤，請重新整理此頁面！',
            showConfirmButton: false,
            icon: 'error',
            timer: 2000,
          });
        });
    },
    allProductsProcessing() {
      this.products = [];
      this.allProducts.forEach((product) => {
        if (product.sameProductNum[0] === 1 && product.sameProductNum[1] > 1) {
          this.products.push(product);
          const filterIndex = this.products.length - 1;
          this.products[filterIndex].currentIdIndex = 0;
          this.products[filterIndex].allId = [];
          this.allProducts.forEach((item) => {
            if (product.title === item.title && product.id !== item.id) {
              product.allPiece.forEach((piece, index) => {
                if (piece === item.piece) {
                  this.products[filterIndex].allId[index] = item.id;
                } else if (piece === product.piece) {
                  this.products[filterIndex].allId[index] = product.id;
                }
              });
            }
          });
        } else if (product.sameProductNum[1] === 1) {
          this.products.push(product);
          const filterIndex = this.products.length - 1;
          this.products[filterIndex].currentIdIndex = 0;
          this.products[filterIndex].allId = [];
          this.products[filterIndex].allId.push(product.id);
        }
        if (product.title === this.product.title) {
          const filterIndex = this.products.length - 1;
          this.product.allId = this.products[filterIndex].allId;
        }
      });
      this.getRelatedProducts();
    },
    getRelatedProducts() {
      this.relatedProducts = [];
      this.product.style.forEach((style) => {
        this.products.forEach((item) => {
          item.style.forEach((key) => {
            if (style === key && item.title !== this.product.title) {
              this.relatedProducts.push(item);
            }
          });
        });
      });
      this.rondomProducts();
    },
    rondomProducts() {
      const otherProducts = [];
      this.renderRelatedProducts = [];
      this.relatedProducts.forEach((item) => {
        if (item.title === this.product.title) {
          this.renderRelatedProducts.push(item);
        } else {
          otherProducts.push(item);
        }
      });
      const setArr = new Set([]);
      let arrSize = 5;
      if (otherProducts.length < 5) {
        arrSize = otherProducts.length;
      }
      for (let num = 0; setArr.size < arrSize; num += 1) {
        const rondomNum = getRandomInt(otherProducts.length);
        setArr.add(otherProducts[rondomNum]);
      }
      this.renderRelatedProducts = [...this.renderRelatedProducts, ...setArr];
      this.renderCardNum = this.renderRelatedProducts.length;
    },
    addMyFavorite(item) {
      if (this.myFavorite.includes(item.id)) {
        this.myFavorite.splice(this.myFavorite.indexOf(item.id), 1);
        this.$swal({
          title: `將${item.title}從收藏列表中移除！`,
          showConfirmButton: false,
          icon: 'success',
          timer: 2000,
        });
      } else {
        this.myFavorite.push(item.id);
        this.$swal({
          title: `將${item.title}加入收藏！`,
          showConfirmButton: false,
          icon: 'success',
          timer: 2000,
        });
      }
      storageMethods.save(this.myFavorite);
      this.emitter.emit('getfavoriteProduct');
    },
    addCart() {
      const obj = {
        data: {
          product_id: this.product.id,
          qty: this.qty,
        },
      };
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.post(url, obj)
        .then((res) => {
          if (res.data.success) {
            this.emitter.emit('getCartData');
            this.$swal({
              title: `將${this.product.title}加入購物車！`,
              showConfirmButton: false,
              icon: 'success',
              timer: 2000,
            });
          } else {
            this.$swal({
              title: '加入購物車失敗！',
              showConfirmButton: false,
              icon: 'error',
              timer: 2000,
            });
          }
        })
        .catch(() => {
          this.$swal({
            title: '網頁發生錯誤，請重新整理此頁面！',
            showConfirmButton: false,
            icon: 'error',
            timer: 2000,
          });
        });
    },
    changePiece(item, index, idIndex) {
      this.renderRelatedProducts[index].currentIdIndex = idIndex;
      const id = item.allId[idIndex];
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http.get(url)
        .then((res) => {
          if (res.data.success) {
            this.renderRelatedProducts[index].id = res.data.product.id;
            this.renderRelatedProducts[index].price = res.data.product.price;
            this.renderRelatedProducts[index].origin_price = res.data.product.origin_price;
          } else {
            this.$swal({
              title: '產品切換失敗！',
              showConfirmButton: false,
              icon: 'error',
              timer: 2000,
            });
          }
        })
        .catch(() => {
          this.$swal({
            title: '網頁發生錯誤，請重新整理此頁面！',
            showConfirmButton: false,
            icon: 'error',
            timer: 2000,
          });
        });
    },
    toProduct(index) {
      const id = this.product.allId[index];
      this.$router.push(`/product/${id}`);
      this.getProductData(id);
    },
  },
  created() {
    this.getProductData();
    this.emitter.on('getProductData', (id) => {
      this.getProductData(id);
    });
    this.emitter.on('addMyFavorite', (item) => {
      this.addMyFavorite(item);
    });
    this.emitter.on('getFavorite', () => {
      this.myFavorite = storageMethods.get();
    });
  },
  unmounted() {
    this.emitter.off('getProductData', (id) => {
      this.getProductData(id);
    });
    this.emitter.off('addMyFavorite', (item) => {
      this.addMyFavorite(item);
    });
    this.emitter.off('getFavorite', () => {
      this.myFavorite = storageMethods.get();
    });
  },
};
</script>
