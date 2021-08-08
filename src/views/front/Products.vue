<template>
  <div class="wrap">
    <div class="productsBanner">
      <div class="titleArea">
        <h2>拼圖列表</h2>
      </div>
    </div>
    <div class="container">
      <div class="row py-3 py-md-6">
        <div class="col-md-3 d-none d-md-block">
          <ul class="productMenu list-group list-unstyled text-center">
            <li><a href="#" class="list-group-item list-group-item-action"
            :class="{'active': activeOption === '全部拼圖'}"
            @click.prevent="changeOption('全部拼圖')">
              全部拼圖
            </a></li>
            <li><a href="#" class="list-group-item list-group-item-action"
            :class="{'active': activeOption === '本月新品'}"
            @click.prevent="changeOption('本月新品')">本月新品</a></li>
            <li><a href="#" class="list-group-item list-group-item-action"
            :class="{'active': activeOption === '本月優惠'}"
            @click.prevent="changeOption('本月優惠')">本月優惠</a></li>
            <li class="position-relative">
              <a href="#" class="list-group-item list-group-item-action"
              @click.prevent="collapseSwitch('pieceCollapse')">拼圖片數</a>
              <i class="bi bi-chevron-down position-absolute icon"
              :class="{'iconActive': openCollapse.pieceCollapse}"></i>
              <CollapseList ref="pieceCollapse" :listItem="piece" :activeOption="activeOption"
              option="拼圖片數" @changeOption="changeOption"/>
            </li>
            <li class="position-relative">
              <a href="#" class="list-group-item list-group-item-action"
              @click.prevent="collapseSwitch('styleCollapse')">拼圖風格</a>
              <i class="bi bi-chevron-down position-absolute icon"
              :class="{'iconActive': openCollapse.styleCollapse}"></i>
              <CollapseList ref="styleCollapse" :listItem="style" :activeOption="activeOption"
              option="拼圖風格" @changeOption="changeOption"/>
            </li>
          </ul>
        </div>
        <div class="mobileMenu d-block d-md-none">
          <select class="form-select mb-3"
            @change="changeSelectOption()" v-model="selectOption.menu">
            <option value="全部拼圖" selected>全部拼圖</option>
            <option value="本月新品">本月新品</option>
            <option value="本月優惠">本月優惠</option>
            <option value="拼圖片數">拼圖片數</option>
            <option value="拼圖風格">拼圖風格</option>
          </select>
          <select class="form-select mb-3" v-if="selectOption.pieceShow === true"
          @change="changeOption(selectOption.piece, selectOption.menu)"
          v-model="selectOption.piece">
            <option value=""  disabled selected>請選擇拼圖片數</option>
            <option value="100">100片</option>
            <option value="500">500片</option>
            <option value="1000">1000片</option>
            <option value="2000">2000片</option>
            <option value="4000">4000片</option>
          </select>
          <select class="form-select mb-3" v-if="selectOption.styleShow === true"
          @change="changeOption(selectOption.style, selectOption.menu)"
          v-model="selectOption.style">
            <option value="" disabled selected>請選擇拼圖風格</option>
            <option value="風景">風景</option>
            <option value="建築">建築</option>
            <option value="動物">動物</option>
            <option value="插畫">插畫</option>
          </select>
        </div>
        <div class="col-md-9">
          <ul class="cardList list-unstyled p-0 row">
            <li ref="card" class="col-xl-4 col-md-6 mb-3"
            v-for="(item, index) in renderProducts" :key="item.id">
              <div class="card productCard" @click="toProduct(item.id)">
                <div class="pictureArea overflow-hidden card-img-top position-relative">
                  <img :src="item.imageUrl" alt="產品圖片"
                  class="horizontal">
                </div>
                <div class="card-body d-flex flex-column justify-content-between">
                  <div class="position-relative">
                    <div>
                      <h5 class="card-title fw-bold mb-9">{{item.title}}</h5>
                      <p class="h3 mb-3" v-if="item.price < item.origin_price">
                        NT${{toCurrency(item.price)}}<span class="h6 text-decoration-line-through">
                          NT${{toCurrency(item.origin_price)}}
                          <span class="h6 fw-bold" v-if="item.allPiece.length > 1"></span></span>
                      </p>
                      <p class="h3 mb-3" v-else>NT${{toCurrency(item.origin_price)}}
                        <span class="h6 fw-bold" v-if="item.allPiece.length > 1"></span></p>
                    </div>
                    <div class="d-flex flex-row-reverse justify-content-between">
                      <div class="pieceBtnArea">
                        <button class="pieceBtn badge pieceBadge"
                        :class="{'active': item.currentIdIndex === idIndex}"
                        :disabled="item.currentIdIndex === idIndex"
                        v-for="(piece, idIndex) in item.allPiece" :key="piece"
                        @click.stop="changePiece(item, index, idIndex)">{{piece}}片</button>
                      </div>
                      <button class="favoriteArea" :class="{'active': myFavorite.includes(item.id)}"
                      @click.stop="addMyFavorite(item)">
                        <i class="bi bi-bookmark-star icon"></i>
                        <i class="bi bi-bookmark-star-fill text-primary hover"></i>
                      </button>
                      <button type="button" class="btn btn-primary addCardBtn"
                      @click.stop="addCart(item)">加入購物車</button>
                      <button type="button" class="btn btn-outline-dark moreProductBtn">
                        查看更多</button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <Pagination :paginationData="paginationData" @getData="getRenderProducts"/>
        </div>
      </div>
    </div>
  </div>
  <div class="loading" v-if="getProductListLoading">
    <div class="icon"></div>
  </div>
</template>

<script>
import CollapseList from '@/components/CollapseList.vue';
import Pagination from '@/components/Pagination.vue';

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
      allProducts: [],
      paginationData: {},
      products: [],
      filterAllProducts: [],
      renderProducts: [],
      piece: ['100', '500', '1000', '2000', '4000'],
      style: ['風景', '建築', '動物', '插畫'],
      openCollapse: {
        pieceCollapse: false,
        styleCollapse: false,
      },
      activeOption: '全部拼圖',
      selectOption: {
        menu: '全部拼圖',
        piece: '',
        style: '',
        pieceShow: false,
        styleShow: false,
      },
      saleOption: false,
      myFavorite: storageMethods.get() || [],
      getProductListLoading: true,
    };
  },
  components: {
    CollapseList,
    Pagination,
  },
  methods: {
    getAllProductsData() {
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http.get(url)
        .then((res) => {
          if (res.data.success) {
            this.allProducts = res.data.products;
            this.allProductsProcessing();
            if (this.$route.query.option === 'sale' && !this.saleOption) {
              this.changeOption('本月優惠');
              this.selectOption.menu = '本月優惠';
              this.saleOption = true;
            }
            this.getProductListLoading = false;
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
      });
      this.products.reverse();
      this.changeOption('全部拼圖');
    },
    collapseSwitch(collapse) {
      this.$refs[collapse].collapseSwitch();
      this.openCollapse[collapse] = !this.openCollapse[collapse];
    },
    changeOption(option, optionName) {
      this.getProductListLoading = true;
      this.filterAllProducts = [];
      this.activeOption = option;
      this.selectOption.piece = '';
      this.selectOption.style = '';
      if (option === '全部拼圖') {
        this.products.forEach((item) => {
          this.filterAllProducts.push(item);
        });
      } else if (option === '本月新品') {
        this.products.forEach((item) => {
          if (item.isNewProduct) {
            this.filterAllProducts.push(item);
          }
        });
      } else if (option === '本月優惠') {
        this.products.forEach((item) => {
          if (item.price < item.origin_price) {
            this.filterAllProducts.push(item);
          }
        });
      } else if (optionName === '拼圖片數') {
        this.selectOption.piece = option;
        this.products.forEach((item) => {
          item.allPiece.forEach((piece) => {
            if (piece.toString() === option) {
              this.filterAllProducts.push(item);
            }
          });
        });
      } else if (optionName === '拼圖風格') {
        this.selectOption.style = option;
        this.products.forEach((item) => {
          item.style.forEach((i) => {
            if (i === option) {
              this.filterAllProducts.push(item);
            }
          });
        });
      }
      this.getPaginationData();
      this.getRenderProducts();
    },
    getRenderProducts(page = 1) {
      document.documentElement.scrollTop = 0;
      this.getPaginationData(page);
      this.renderProducts = [];
      const minNum = (page - 1) * 10;
      const maxNum = page * 10 - 1;
      this.filterAllProducts.forEach((item, index) => {
        if (minNum <= index && index <= maxNum) {
          this.renderProducts.push(item);
        }
      });
      this.renderProducts.forEach((item, index) => {
        if (item.piece.toString() !== this.selectOption.piece && this.selectOption.piece !== '') {
          const pieceIndex = item.allPiece.indexOf(parseInt(this.selectOption.piece, 10));
          this.changePiece(item, index, pieceIndex);
        } else if (this.selectOption.piece === '') {
          this.changePiece(item, index, 0);
        }
      });
      setTimeout(() => {
        this.getProductListLoading = false;
      }, 300);
    },
    getPaginationData(page = 1) {
      this.getProductListLoading = true;
      const pageData = {};
      pageData.total_pages = Math.ceil(this.filterAllProducts.length / 10);
      pageData.current_page = page;
      if (pageData.current_page + 1 > pageData.total_pages) {
        pageData.has_next = false;
      } else {
        pageData.has_next = true;
      }
      if (pageData.current_page === 1) {
        pageData.has_pre = false;
      } else {
        pageData.has_pre = true;
      }
      this.paginationData = pageData;
    },
    changeSelectOption() {
      this.selectOption.pieceShow = false;
      this.selectOption.styleShow = false;
      // this.selectOption.piece = '';
      // this.selectOption.style = '';
      if (this.selectOption.menu === '拼圖片數') {
        this.selectOption.pieceShow = true;
      } else if (this.selectOption.menu === '拼圖風格') {
        this.selectOption.styleShow = true;
      } else {
        this.changeOption(this.selectOption.menu);
      }
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
    changePiece(item, index, idIndex) {
      this.renderProducts[index].currentIdIndex = idIndex;
      const id = item.allId[idIndex];
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http.get(url)
        .then((res) => {
          if (res.data.success) {
            this.renderProducts[index].id = res.data.product.id;
            this.renderProducts[index].price = res.data.product.price;
            this.renderProducts[index].piece = res.data.product.piece;
            this.renderProducts[index].origin_price = res.data.product.origin_price;
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
    toProduct(id) {
      this.$router.push(`/product/${id}`);
    },
    addCart(product) {
      const obj = {
        data: {
          product_id: product.id,
          qty: 1,
        },
      };
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.post(url, obj)
        .then((res) => {
          if (res.data.success) {
            this.emitter.emit('getCartData');
            this.$swal({
              title: `將${product.title}加入購物車！`,
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
  },
  created() {
    this.getAllProductsData();
    this.emitter.on('addMyFavorite', (item) => {
      this.addMyFavorite(item);
    });
    this.emitter.on('getFavorite', () => {
      this.myFavorite = storageMethods.get();
    });
  },
  unmounted() {
    this.emitter.off('addMyFavorite', (item) => {
      this.addMyFavorite(item);
    });
    this.emitter.off('getFavorite', () => {
      this.myFavorite = storageMethods.get();
    });
  },
};
</script>
