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
      align-items-center mb-5 mb-md-0">
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
          <p class="mb-2">拼圖片數：{{product.piece}}</p>
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
      <cardCarousel :carouselData="renderRelatedProducts"
      @getProductData="getProductData" :key="renderRelatedProducts"></cardCarousel>
    </div>
  </div>
  <div class="loading" v-if="getProductLoading">
    <div class="icon"></div>
  </div>
</template>

<script>
import cardCarousel from '@/components/CardCarousel.vue';

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
      allProducts: [
        {
          category: '直',
          piece: '100片',
          style: ['風景'],
          activity: '本月新品',
          content: '這是內容',
          description: 'Sit down please 名設計師設計',
          id: '-L9tH8jxVb2Ka_DYPwng2',
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/jun0527/1625937151451.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=bLO%2BEo1MgVi8dIbwIxuXkwe3hqWXYGJWnQsh8P%2FuHM2%2FVBXZ5N6BpUJBQbDz78aP5kzXBLDwFWPnG%2BoPGO1BpgztTMhGbOYr6nD50RP%2F9wpkE4i61QhEhFagDKd2HmFxGLHxROkzh1zn9jip%2FeFG36%2B%2Beko3xgHHNuG9ghqG2VR69LfWPSxL%2F%2FjSyYitcl7EI2%2BFlWHRGy0x4tg4HeUSAhazJ%2FMvj%2FeclN7cq32flO6c4Z2hTJ%2FpZqEgtljV89NRZOUjg2gbRvKZCilI1IOCjHCM%2BNxLvYjoIvDIOXIz7%2FFiFZMOYrdI50nuiMZXudilexzrCRZ3%2FwqDcx1zGybSKg%3D%3D',
          imagesUrl: [
            '圖片網址一',
            '圖片網址二',
            '圖片網址三',
            '圖片網址四',
            '圖片網址五',
          ],
          is_enabled: 1,
          num: 1,
          origin_price: 600,
          price: 500,
          title: '東京鐵塔',
          unit: '個',
        },
        {
          category: '直',
          piece: '500片',
          style: ['風景'],
          activity: '本月新品',
          content: '這是內容',
          description: 'Sit down please 名設計師設計',
          id: '-L9tH8jxVb2Ka_DYPwng',
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/jun0527/1625937151451.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=bLO%2BEo1MgVi8dIbwIxuXkwe3hqWXYGJWnQsh8P%2FuHM2%2FVBXZ5N6BpUJBQbDz78aP5kzXBLDwFWPnG%2BoPGO1BpgztTMhGbOYr6nD50RP%2F9wpkE4i61QhEhFagDKd2HmFxGLHxROkzh1zn9jip%2FeFG36%2B%2Beko3xgHHNuG9ghqG2VR69LfWPSxL%2F%2FjSyYitcl7EI2%2BFlWHRGy0x4tg4HeUSAhazJ%2FMvj%2FeclN7cq32flO6c4Z2hTJ%2FpZqEgtljV89NRZOUjg2gbRvKZCilI1IOCjHCM%2BNxLvYjoIvDIOXIz7%2FFiFZMOYrdI50nuiMZXudilexzrCRZ3%2FwqDcx1zGybSKg%3D%3D',
          imagesUrl: [
            '圖片網址一',
            '圖片網址二',
            '圖片網址三',
            '圖片網址四',
            '圖片網址五',
          ],
          is_enabled: 1,
          num: 1,
          origin_price: 1000,
          price: 600,
          title: '東京鐵塔',
          unit: '個',
        },
        {
          category: '橫',
          piece: '1000片',
          style: ['風景'],
          activity: '本月新品',
          content: '這是內容',
          description: 'Sit down please 名設計師設計',
          id: '-L9tH8jxVb2Ka_DYPwng',
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/jun0527/1625380925789.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=f9uLvoPfl3QoONOzxq7eHe76nwqhdRhU%2BiwK6ewvPq5Ti6x0PFCHL8dhXJcJdp3oIdJ4jSj4R5c00QaqCBXDkuIYMOJB2RH7TkYLDEkeasgCVheh8bqzOTpb5dzonsFvUcjabF4q3nI%2Fi0U0XkiIfS9YMspVM7gD6fccMMgIAgl6jkuV%2BUuNCp6R%2FAaOuexmzBS7ArLFfhDinYVjmf%2Fn6E%2FWpCYE%2B9k%2F%2FZz%2Fbz68%2FmkHL2Op6ypnnjk7fPCoELB0a7hZtwKSoBQWvE2Q70m2dOOEw319uR3J4%2FoA%2F19wwkKGg1auo2OVWd7voZERFC5eD3LKlXuReCMELuEWf5M29g%3D%3D',
          imagesUrl: [
            '圖片網址一',
            '圖片網址二',
            '圖片網址三',
            '圖片網址四',
            '圖片網址五',
          ],
          is_enabled: 1,
          num: 1,
          origin_price: 1000,
          price: 1000,
          title: '熱氣球',
          unit: '個',
        },
        {
          category: '橫',
          piece: '2000片',
          style: ['風景'],
          activity: '本月新品',
          content: '這是內容',
          description: 'Sit down please 名設計師設計',
          id: '-L9tH8jxVb2Ka_DYPwng',
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/jun0527/1625380925789.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=f9uLvoPfl3QoONOzxq7eHe76nwqhdRhU%2BiwK6ewvPq5Ti6x0PFCHL8dhXJcJdp3oIdJ4jSj4R5c00QaqCBXDkuIYMOJB2RH7TkYLDEkeasgCVheh8bqzOTpb5dzonsFvUcjabF4q3nI%2Fi0U0XkiIfS9YMspVM7gD6fccMMgIAgl6jkuV%2BUuNCp6R%2FAaOuexmzBS7ArLFfhDinYVjmf%2Fn6E%2FWpCYE%2B9k%2F%2FZz%2Fbz68%2FmkHL2Op6ypnnjk7fPCoELB0a7hZtwKSoBQWvE2Q70m2dOOEw319uR3J4%2FoA%2F19wwkKGg1auo2OVWd7voZERFC5eD3LKlXuReCMELuEWf5M29g%3D%3D',
          imagesUrl: [
            '圖片網址一',
            '圖片網址二',
            '圖片網址三',
            '圖片網址四',
            '圖片網址五',
          ],
          is_enabled: 1,
          num: 1,
          origin_price: 1500,
          price: 1500,
          title: '熱氣球',
          unit: '個',
        },
        {
          category: '橫',
          piece: '4000片',
          style: ['風景'],
          activity: '本月新品',
          content: '這是內容',
          description: 'Sit down please 名設計師設計',
          id: '-L9tH8jxVb2Ka_DYPwng',
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/jun0527/1625380925789.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=f9uLvoPfl3QoONOzxq7eHe76nwqhdRhU%2BiwK6ewvPq5Ti6x0PFCHL8dhXJcJdp3oIdJ4jSj4R5c00QaqCBXDkuIYMOJB2RH7TkYLDEkeasgCVheh8bqzOTpb5dzonsFvUcjabF4q3nI%2Fi0U0XkiIfS9YMspVM7gD6fccMMgIAgl6jkuV%2BUuNCp6R%2FAaOuexmzBS7ArLFfhDinYVjmf%2Fn6E%2FWpCYE%2B9k%2F%2FZz%2Fbz68%2FmkHL2Op6ypnnjk7fPCoELB0a7hZtwKSoBQWvE2Q70m2dOOEw319uR3J4%2FoA%2F19wwkKGg1auo2OVWd7voZERFC5eD3LKlXuReCMELuEWf5M29g%3D%3D',
          imagesUrl: [
            '圖片網址一',
            '圖片網址二',
            '圖片網址三',
            '圖片網址四',
            '圖片網址五',
          ],
          is_enabled: 1,
          num: 1,
          origin_price: 2500,
          price: 2500,
          title: '熱氣球',
          unit: '個',
        },
      ],
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
    cardCarousel,
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
            this.getProductLoading = false;
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
          this.getRelatedProducts();
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    getRelatedProducts() {
      this.relatedProducts = [];
      this.product.style.forEach((style) => {
        this.allProducts.forEach((item) => {
          item.style.forEach((key) => {
            if (style === key && item.id !== this.product.id) {
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
        .catch((err) => {
          console.dir(err);
        });
    },
  },
  created() {
    this.getProductData();
    this.emitter.on('getProductData', (id) => {
      this.getProductData(id);
    });
  },
};
</script>
