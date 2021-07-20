<template>
  <div v-if="myFavoriteProducts.length !== 0">
    <h2 class="h3 text-center fw-bold">收藏列表</h2>
    <ul class="list-unstyled m-0">
      <li class="favoriteLi d-flex justify-content-between align-items-center"
      v-for="(item, index) in myFavoriteProducts" :key="item.id"
      @click="toOtherPages('product', item.id)">
        <div class="cartPictureArea me-2">
          <img :src="item.imageUrl" alt="產品圖片"
          :class="{'straight': item.category === '直',
          'horizontal': item.category === '橫'}">
        </div>
        <div class="productContent">
          <h3 class="h6 mb-0">【{{item.piece}}】{{item.title}}</h3>
          <p class="mb-0 ps-2">NT${{toCurrency(item.price)}}</p>
        </div>
        <div class="d-flex align-items-center">
          <button class="deleteBtn" @click.stop="deleteFavorite(item, index)">
              <i class="bi bi-x text-dark"></i>
          </button>
        </div>
      </li>
    </ul>
  </div>
  <div v-else>
    <h2 class="h3 text-center mb-3">收藏列表沒有產品</h2>
    <div class="d-flex justify-content-center">
      <button type="button" class="btn btn-primary"
      @click="toOtherPages('products')">產品列表</button>
    </div>
  </div>
</template>

<script>
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
      myFavorite: storageMethods.get() || [],
      allProducts: [],
      myFavoriteProducts: [],
    };
  },
  props: ['listName'],
  methods: {
    getAllProductsData() {
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http.get(url)
        .then((res) => {
          this.allProducts = res.data.products;
          this.getFavoriteProducts();
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    getFavoriteProducts() {
      this.myFavoriteProducts = [];
      this.myFavorite.forEach((item) => {
        this.allProducts.forEach((product) => {
          if (item === product.id) {
            this.myFavoriteProducts.push(product);
          }
        });
      });
    },
    deleteFavorite(item, index) {
      this.myFavorite.splice(index, 1);
      storageMethods.save(this.myFavorite);
      this.$emit('getFavoriteData');
      this.getAllProductsData();
      this.emitter.emit('addMyFavorite', item);
    },
    toOtherPages(pagesName, id) {
      if (pagesName === 'cart') {
        this.$router.push('/cart');
      } else if (pagesName === 'product') {
        this.$router.push(`/product/${id}`);
        this.emitter.emit('getProductData', id);
      } else if (pagesName === 'products') {
        this.$router.push('/products');
      }
      this.$emit('closeDropdownList', this.listName);
    },
  },
  mounted() {
    this.getAllProductsData();
    this.emitter.on('getfavoriteProduct', () => {
      this.myFavorite = storageMethods.get();
      this.getAllProductsData();
    });
  },
};
</script>
