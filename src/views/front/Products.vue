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
              <collapseList ref="pieceCollapse" :listItem="piece" :activeOption="activeOption"
              option="拼圖片數" @changeOption="changeOption"></collapseList>
            </li>
            <li class="position-relative">
              <a href="#" class="list-group-item list-group-item-action"
              @click.prevent="collapseSwitch('styleCollapse')">拼圖風格</a>
              <i class="bi bi-chevron-down position-absolute icon"
              :class="{'iconActive': openCollapse.styleCollapse}"></i>
              <collapseList ref="styleCollapse" :listItem="style" :activeOption="activeOption"
              option="拼圖風格" @changeOption="changeOption"></collapseList>
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
          @click="changeOption(selectOption.piece, selectOption.menu)"
          v-model="selectOption.piece">
            <option value=""  disabled selected>請選擇拼圖片數</option>
            <option value="100片">100片</option>
            <option value="500片">500片</option>
            <option value="1000片">1000片</option>
            <option value="2000片">2000片</option>
            <option value="4000片">4000片</option>
          </select>
          <select class="form-select mb-3" v-if="selectOption.styleShow === true"
          @click="changeOption(selectOption.style, selectOption.menu)"
          v-model="selectOption.style">
            <option value="" disabled selected>請選擇拼圖風格</option>
            <option value="風景">風景</option>
            <option value="建築">建築</option>
            <option value="動物">動物</option>
            <option value="插畫">插畫</option>
            <option value="繪畫工作室">繪畫工作室</option>
          </select>
        </div>
        <div class="col-md-9">
          <ul class="cardList list-unstyled p-0 row">
            <li ref="card" class="col-xl-4 col-md-6 mb-3 position-relative"
            v-for="item in renderProducts" :key="item.id">
              <div class="card productCard" @click="toProduct(item.id)">
                <div class="pictureArea overflow-hidden card-img-top">
                  <img :src="item.imageUrl" alt="產品圖片"
                  :class="{'straight': item.category === '直', 'horizontal': item.category === '橫'}">
                </div>
                <div class="card-body d-flex flex-column justify-content-between">
                  <div class="position-relative">
                    <h5 class="card-title fw-bold">{{item.title}}</h5>
                    <span class="badge bg-grayDark pieceBadge me-2 mb-3">{{item.piece}}</span>
                    <p class="h3 mb-3" v-if="item.price < item.origin_price">
                      NT${{toCurrency(item.price)}}<span class="h6 text-decoration-line-through">
                        NT${{toCurrency(item.origin_price)}}</span>
                    </p>
                    <p class="h3 mb-3" v-else>NT${{toCurrency(item.origin_price)}}</p>
                  </div>
                  <div class="d-flex flex-row-reverse justify-content-between">
                    <button class="favoriteArea" :class="{'active': myFavorite.includes(item.id)}"
                    @click.stop="addMyFavorite(item)">
                      <i class="bi bi-bookmark-star icon"></i>
                      <i class="bi bi-bookmark-star-fill text-primary hover"></i>
                    </button>
                    <button type="button" class="btn btn-primary addCardBtn"
                    @click.stop="addCart(item)">加入購物車</button>
                    <button type="button" class="btn btn-outline-dark moreProductBtn">查看更多</button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <pagination :paginationData="paginationData" @getData="getRenderProducts"></pagination>
        </div>
      </div>
    </div>
  </div>
  <div class="loading" v-if="getProductListLoading">
    <div class="icon"></div>
  </div>
</template>

<script>
import collapseList from '@/components/CollapseList.vue';
import pagination from '@/components/Pagination.vue';

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
      products: [],
      paginationData: {},
      allProducts: [],
      filterAllProducts: [],
      renderProducts: [],
      piece: ['100片', '500片', '1000片', '2000片', '4000片'],
      style: ['風景', '建築', '動物', '插畫', '繪畫工作室'],
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
    collapseList,
    pagination,
  },
  methods: {
    getProductsData(page = 1) {
      this.getProductListLoading = true;
      document.documentElement.scrollTop = 0;
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/products?page=${page}`;
      this.$http.get(url)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
            this.renderProducts = res.data.products;
            this.paginationData = res.data.pagination;
            this.getAllProductsData();
          }
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    getAllProductsData() {
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http.get(url)
        .then((res) => {
          this.allProducts = res.data.products;
          if (this.$route.query.option === 'sale' && !this.saleOption) {
            this.changeOption('本月優惠');
            this.selectOption.menu = '本月優惠';
            this.saleOption = true;
          }
          this.getProductListLoading = false;
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    collapseSwitch(collapse) {
      this.$refs[collapse].collapseSwitch();
      this.openCollapse[collapse] = !this.openCollapse[collapse];
    },
    changeOption(option, optionName) {
      this.getProductListLoading = true;
      this.filterAllProducts = [];
      this.activeOption = option;
      if (option === '全部拼圖') {
        this.getProductsData();
        return;
      }
      if (option === '本月新品') {
        this.allProducts.forEach((item) => {
          if (item.isNewProduct) {
            this.filterAllProducts.push(item);
          }
        });
      } else if (option === '本月優惠') {
        this.allProducts.forEach((item) => {
          if (item.price < item.origin_price) {
            this.filterAllProducts.push(item);
          }
        });
      } else if (optionName === '拼圖片數') {
        this.allProducts.forEach((item) => {
          if (item.piece === option) {
            this.filterAllProducts.push(item);
          }
        });
      } else if (optionName === '拼圖風格') {
        this.allProducts.forEach((item) => {
          item.style.forEach((i) => {
            if (i === option) {
              this.filterAllProducts.push(item);
            }
          });
        });
      }
      this.filterAllProducts.reverse();
      this.getPaginationData();
      this.getRenderProducts();
    },
    getRenderProducts(page = 1) {
      document.documentElement.scrollTop = 0;
      this.getPaginationData(page);
      this.renderProducts = [];
      const minNum = (page - 1) * 10;
      const maxNum = page * 10 - 1;
      if (this.activeOption === '全部拼圖') {
        this.getProductsData(page);
      } else {
        this.filterAllProducts.forEach((item, index) => {
          if (minNum <= index && index <= maxNum) {
            this.renderProducts.push(item);
          }
        });
      }
      this.getProductListLoading = false;
    },
    getPaginationData(page = 1) {
      const pageData = {};
      pageData.total_pages = Math.ceil(this.filterAllProducts.length / 10);
      pageData.current_page = page;
      if (pageData.category + 1 > pageData.total_pages) {
        pageData.has_next = false;
      } else {
        pageData.has_next = true;
      }
      if (pageData.category === 1) {
        pageData.has_pre = false;
      } else {
        pageData.has_pre = true;
      }
      this.paginationData = pageData;
    },
    changeSelectOption() {
      this.selectOption.pieceShow = false;
      this.selectOption.styleShow = false;
      this.selectOption.piece = '';
      this.selectOption.style = '';
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
        .catch((err) => {
          console.dir(err);
        });
    },
  },
  created() {
    this.getProductsData();
    this.emitter.on('addMyFavorite', (item) => {
      this.addMyFavorite(item);
    });
  },
};
</script>
