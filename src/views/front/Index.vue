<template>
<div class="indexBanner mb-5 mb-md-9">
  <div class="d-flex flex-column h-100 justify-content-between">
    <div class="sloganArea d-flex justify-content-end">
      <div class="slogan">
        <h2 class="text-white mb-0">讓拼圖帶你進入</h2>
        <h2 class="text-white mb-4">屬於你的娛樂時光</h2>
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
</div>
<div class="cardCarouselArea container mb-5 mb-md-9" ref="newProductRecommend">
  <h2 class="text-center mb-3 mb-md-4 fw-bold">本月新品</h2>
  <cardCarousel :carouselData="newProducts"
v-if="JSON.stringify(newProducts) !== '[]'"></cardCarousel>
</div>
<div class="anniversaryArea mb-5 mb-md-9" ref="anniversaryArea">
  <div class="py-6">
    <div class="anniversary" :class="{'enlarge': anomation.enlarge.anniversaryArea === true}">
      <h2 class="text-center mb-3 mb-md-4 fw-bold text-white">歡慶周年</h2>
      <p class="text-center text-white">
        在 12/31 前輸入優惠碼 <span class="bg-white text-dark px-2">Pinpin20Off</span><br>
        享 8 折優惠！
      </p>
      <div class="d-flex justify-content-center">
        <button type="button" class="btn btn-primary"
        @click="$router.push('/products')">馬上使用優惠</button>
      </div>
    </div>
  </div>
</div>
<div class="saleProductsArea container mb-5 mb-md-9 overflow-hidden" ref="saleProductsArea">
  <h2 class="text-center mb-3 mb-md-4 fw-bold">本月優惠商品</h2>
  <div class="row">
    <div class="col-md-4">
      <button class="saleProduct position-relative d-block"
      :class="{'moveLeft': anomation.moveLeft}" @click="toProduct('-Mek2lyVJKUj_A0_S_ZP')">
        <img class="w-100 my-2" src="@/assets/images/印度修道院.jpg" alt="產品圖片">
        <div class="hoverText bg-primary">商品詳情</div>
      </button>
      <button class="saleProduct position-relative d-block"
      :class="{'moveLeft': anomation.moveLeft}" @click="toProduct('-Mek4j2xGtnQkt8yqWdk')">
        <img class="w-100 my-2" src="@/assets/images/淺間神社.jpg" alt="產品圖片">
        <div class="hoverText bg-primary">商品詳情</div>
      </button>
    </div>
    <div class="col-md-4 my-2">
      <div class="d-flex flex-column
      justify-content-center align-items-center bg-secondary py-4 h-100">
        <p>每個月都有不同的優惠商品</p>
        <p>千萬別錯過喜歡的商品</p>
        <button class="btn btn-primary" type="button"
        @click="$router.push('/products?option=sale')">優惠專區</button>
      </div>
    </div>
    <div class="col-md-4">
      <button class="saleProduct position-relative d-block"
      :class="{'moveRight': anomation.moveRight}" @click="toProduct('-MefKnC3FrsIcnqu4l7O')">
        <img class="w-100 my-2" src="@/assets/images/竹林間.jpg" alt="產品圖片">
        <div class="hoverText bg-primary">商品詳情</div>
      </button>
      <button class="saleProduct position-relative d-block"
      :class="{'moveRight': anomation.moveRight}" @click="toProduct('-MefLyTTzJ0f34E-jD4r')">
        <img class="w-100 my-2" src="@/assets/images/草叢貓咪.jpg" alt="產品圖片">
        <div class="hoverText bg-primary">商品詳情</div>
      </button>
    </div>
  </div>
</div>
<div class="customizedServiceArea" ref="customizedServiceArea">
  <div class="py-6">
    <div class="customizedService"
    :class="{'enlarge': anomation.enlarge.customizedServiceArea === true}">
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
</div>
<div class="loading" v-if="indexLoading">
  <div class="icon"></div>
</div>
</template>

<script>
import cardCarousel from '@/components/CardCarousel.vue';

export default {
  data() {
    return {
      allProducts: [],
      newProducts: [],
      newProductOffsetTop: 0,
      anomation: {
        moveLeft: false,
        moveRight: false,
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
    cardCarousel,
  },
  methods: {
    getAllProductsData() {
      this.indexLoading = true;
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http.get(url)
        .then((res) => {
          this.allProducts = res.data.products;
          this.getNewProducts();
          this.indexLoading = false;
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    getNewProducts() {
      this.newProducts = [];
      this.allProducts.forEach((item) => {
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
        this.anomation.moveLeft = true;
        this.anomation.moveRight = true;
      } else {
        this.anomation.moveLeft = false;
        this.anomation.moveRight = false;
      }
      if (this.$refs.anniversaryArea.offsetTop < scrollY) {
        this.anomation.enlarge.anniversaryArea = true;
      } else {
        this.anomation.enlarge.anniversaryArea = false;
      }
      if (this.$refs.customizedServiceArea.offsetTop < scrollY) {
        this.anomation.enlarge.customizedServiceArea = true;
      } else {
        this.anomation.enlarge.customizedServiceArea = false;
      }
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
