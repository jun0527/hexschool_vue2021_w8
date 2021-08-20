<template>
<main>
  <section class="indexBanner mb-5 mb-md-9">
    <div class="d-flex flex-column h-100 justify-content-between">
      <div class="sloganArea d-flex justify-content-end">
        <div class="slogan">
          <h2 class="text-white fw-bold mb-2">讓拼圖帶你進入</h2>
          <h2 class="text-white fw-bold mb-3">屬於你的娛樂時光</h2>
          <h3 class="h5 d-none d-sm-block text-white mb-4">－沉浸在拼圖的世界，享受拼圖的樂趣。</h3>
          <button type="button" class="btn btn-primary"
          @click="$router.push('/products')">馬上選購</button>
        </div>
      </div>
      <div class="justify-content-center d-none d-sm-flex">
        <button class="down" type="button" @click="moveDown">
          <i class="icon bi bi-chevron-down text-white"></i>
        </button>
      </div>
    </div>
  </section>
  <section class="cardCarouselArea container mb-5 mb-md-9" ref="newProductRecommend">
    <h2 class="text-center mb-3 mb-md-4 fw-bold">本月新品</h2>
    <CardCarousel :carouselData="newProducts" @changePiece="changePiece"
    v-if="JSON.stringify(newProducts) !== '[]'"/>
  </section>
  <section class="puzzleSkillArea container mb-5 mb-md-9 overflow-hidden" ref="puzzleSkillArea">
    <div class="row gx-0 align-items-stretch justify-content-between">
      <div class="col-md-5 col-lg-4 imageArea position-relative"
      :class="{'moveLeft': animation.moveLeft.puzzleSkillArea}"></div>
      <div class="col-md-7 col-lg-8 position-relative"
      :class="{'moveRight': animation.moveRight.puzzleSkillArea}">
        <div class="bg-secondary d-flex flex-column justify-content-center
        align-items-center py-3 h-100">
          <h2 class="text-center mb-3 mb-md-4 fw-bold">拼圖小技巧</h2>
          <p class="text-center">想要入門拼圖但不知道從何開始，<br>讓拼圖小技巧協助你完成第一副拼圖！</p>
          <ul>
            <li class="mb-2">找出拼圖的邊邊，將邊框拼出來。</li>
            <li class="mb-2">將拼圖用顏色或圖案做分類。</li>
          </ul>
          <p class="mb-2">接下來就可以進入拼圖的趣味世界。</p>
          <p class="text-center">來尋找你的第一副拼圖吧！</p>
          <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-primary"
            @click="$router.push('/products')">選購拼圖</button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="anniversaryArea mb-5 mb-md-9" ref="anniversaryArea">
    <div class="py-6">
      <div class="anniversary" :class="{'enlarge': animation.enlarge.anniversaryArea}">
        <h2 class="text-center mb-3 mb-md-4 fw-bold text-white">歡慶周年</h2>
        <p class="text-center text-white mb-2">感謝大家這一年的支持</p>
        <p class="text-center text-white">
          即日起到 12/31 輸入優惠碼 <span class="bg-white text-dark px-2">Pinpin20Off</span><br>
          享 8 折優惠！
        </p>
        <div class="d-flex justify-content-center">
          <button type="button" class="btn btn-primary"
          @click="$router.push('/products')">馬上使用優惠</button>
        </div>
      </div>
    </div>
  </section>
  <section class="saleProductsArea container mb-5 mb-md-9 overflow-hidden" ref="saleProductsArea">
    <h2 class="text-center mb-3 mb-md-4 fw-bold">本月優惠商品</h2>
    <div class="row">
      <div class="col-md-4">
        <button class="saleProduct position-relative d-block"
        :class="{'moveLeft': animation.moveLeft.saleProductsArea}"
        @click="toProduct('-Mek2lyVJKUj_A0_S_ZP')">
          <img class="w-100 my-2" src="@/assets/images/印度修道院.jpg" alt="產品圖片">
          <div class="hoverText bg-primary">商品詳情</div>
        </button>
        <button class="saleProduct position-relative d-block"
        :class="{'moveLeft': animation.moveLeft.saleProductsArea}"
        @click="toProduct('-Mek4j2xGtnQkt8yqWdk')">
          <img class="w-100 my-2" src="@/assets/images/淺間神社.jpg" alt="產品圖片">
          <div class="hoverText bg-primary">商品詳情</div>
        </button>
      </div>
      <div class="col-md-4 my-2">
        <div class="d-flex flex-column
        justify-content-center align-items-center bg-secondary py-4 h-100">
          <p>每個月都有不同的優惠拼圖</p>
          <p>千萬別錯過喜歡的拼圖</p>
          <p>來尋找屬於你的拼圖吧</p>
          <button class="btn btn-primary" type="button"
          @click="$router.push('/products?option=sale')">優惠專區</button>
        </div>
      </div>
      <div class="col-md-4">
        <button class="saleProduct position-relative d-block"
        :class="{'moveRight': animation.moveRight.saleProductsArea}"
        @click="toProduct('-MefKnC3FrsIcnqu4l7O')">
          <img class="w-100 my-2" src="@/assets/images/竹林間.jpg" alt="產品圖片">
          <div class="hoverText bg-primary">商品詳情</div>
        </button>
        <button class="saleProduct position-relative d-block"
        :class="{'moveRight': animation.moveRight.saleProductsArea}"
        @click="toProduct('-MefLyTTzJ0f34E-jD4r')">
          <img class="w-100 my-2" src="@/assets/images/草叢貓咪.jpg" alt="產品圖片">
          <div class="hoverText bg-primary">商品詳情</div>
        </button>
      </div>
    </div>
  </section>
  <section class="customizedServiceArea" ref="customizedServiceArea">
    <div class="py-6">
      <div class="customizedService"
      :class="{'enlarge': animation.enlarge.customizedServiceArea}">
        <h2 class="text-center mb-3 mb-md-4 fw-bold text-white">客製拼圖</h2>
        <p class="text-center text-white">
          把美好的回憶變成拼圖<br>永久保存
        </p>
        <div class="d-flex justify-content-center">
          <button type="button" class="btn btn-primary"
          @click="$router.push('/customization')">馬上客製拼圖</button>
        </div>
      </div>
    </div>
  </section>
  <div class="loading" v-if="indexLoading">
    <div class="icon"></div>
  </div>
</main>

</template>

<script>
import CardCarousel from '@/components/CardCarousel.vue';

export default {
  data() {
    return {
      allProducts: [],
      products: [],
      newProducts: [],
      newProductOffsetTop: 0,
      animation: {
        moveLeft: {
          saleProductsArea: false,
          puzzleSkillArea: false,
        },
        moveRight: {
          saleProductsArea: false,
          puzzleSkillArea: false,
        },
        enlarge: {
          anniversaryArea: false,
          customizedServiceArea: false,
        },
      },
      renderCardNum: 0,
      indexLoading: true,
    };
  },
  components: {
    CardCarousel,
  },
  methods: {
    getAllProductsData() {
      this.indexLoading = true;
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http.get(url)
        .then((res) => {
          if (res.data.success) {
            this.allProducts = res.data.products;
            this.allProductsProcessing();
            this.indexLoading = false;
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
      this.getNewProducts();
    },
    getNewProducts() {
      this.newProducts = [];
      this.products.forEach((item) => {
        if (item.isNewProduct) {
          this.newProducts.push(item);
        }
      });
      this.newProducts.reverse();
    },
    moveDown() {
      document.documentElement.scrollTop = this.$refs.newProductRecommend.offsetTop - 152;
    },
    scrollEvent() {
      const scrollY = window.scrollY + window.innerHeight;
      if (this.$refs.saleProductsArea.offsetTop < scrollY) {
        this.animation.moveLeft.saleProductsArea = true;
        this.animation.moveRight.saleProductsArea = true;
      } else {
        this.animation.moveLeft.saleProductsArea = false;
        this.animation.moveRight.saleProductsArea = false;
      }
      if (this.$refs.anniversaryArea.offsetTop < scrollY) {
        this.animation.enlarge.anniversaryArea = true;
      } else {
        this.animation.enlarge.anniversaryArea = false;
      }
      if (this.$refs.customizedServiceArea.offsetTop < scrollY) {
        this.animation.enlarge.customizedServiceArea = true;
      } else {
        this.animation.enlarge.customizedServiceArea = false;
      }
      if (this.$refs.puzzleSkillArea.offsetTop < scrollY) {
        this.animation.moveLeft.puzzleSkillArea = true;
        this.animation.moveRight.puzzleSkillArea = true;
      } else {
        this.animation.moveLeft.puzzleSkillArea = false;
        this.animation.moveRight.puzzleSkillArea = false;
      }
    },
    changePiece(item, index, idIndex) {
      this.newProducts[index].currentIdIndex = idIndex;
      const id = item.allId[idIndex];
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http.get(url)
        .then((res) => {
          if (res.data.success) {
            this.newProducts[index].id = res.data.product.id;
            this.newProducts[index].price = res.data.product.price;
            this.newProducts[index].origin_price = res.data.product.origin_price;
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
  },
  mounted() {
    window.addEventListener('scroll', this.scrollEvent);
    this.getAllProductsData();
  },
  unmounted() {
    window.removeEventListener('scroll', this.scrollEvent);
  },
};
</script>
