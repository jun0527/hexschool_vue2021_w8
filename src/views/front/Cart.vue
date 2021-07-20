<template>
  <div class="wrap">
    <div class="cartBanner">
      <div class="titleArea">
        <h2>結帳流程</h2>
      </div>
    </div>
    <div class="container py-3 py-md-6" v-if="cartData.carts.length !== 0">
      <buySteps :step="step"></buySteps>
      <table class="cartList table table-hover align-middle">
        <thead>
          <tr>
            <th width="20%" class="d-none d-md-table-cell">圖示</th>
            <th width="25%">產品名稱</th>
            <th width="20%">數量</th>
            <th width="20%">單價</th>
            <th width="15%">刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartData.carts" :key="item.id">
            <td class="d-none d-md-table-cell">
              <div class="cartPictureArea">
                <img :src="item.product.imageUrl" alt="產品圖片"
                :class="{'straight': item.product.category === '直',
                'horizontal': item.product.category === '橫'}">
              </div>
            </td>
            <td>【{{item.product.piece}}】{{item.product.title}}</td>
            <td>
              <div class="qtyArea d-flex">
                <button class="qtyBtn" type="button" @click="changeQty(item, 'reduce')"
                :disabled="item.qty === 1">
                  <i class="icon bi bi-dash-square"></i>
                  <i class="hover bi bi-dash-square-fill"></i>
                </button>
                <span>{{item.qty}}</span>
                <button class="qtyBtn" type="button" @click="changeQty(item, 'add')">
                  <i class="icon bi bi-plus-square"></i>
                  <i class="hover bi bi-plus-square-fill"></i>
                </button>
              </div>
            </td>
            <td>NT${{toCurrency(item.product.price)}}</td>
            <td>
              <button class="deleteBtn" @click="deleteCartAlert('deleteOne', item)">
                <i class="bi bi-x text-dark"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex flex-column flex-md-row
      justify-content-between align-items-end align-items-md-start">
        <button class="btn btn-outline-dark mb-4 mb-md-0" type="button"
        @click="deleteCartAlert('deleteAll')">清空購物車</button>
        <div class="useCouponArea d-flex justify-content-end align-items-center mb-4">
          <p class="mb-0">使用優惠券：</p>
          <input type="text" v-model="coupon" :disabled="isUseCoupon">
          <button class="btn btn-outline-dark" type="button" v-if="!isUseCoupon"
          :disabled="coupon === ''" @click="useCoupon">使用</button>
          <button class="btn btn-outline-dark" type="button" v-else
          @click="isUseCoupon = !isUseCoupon">修改</button>
        </div>
      </div>
      <div class="couponArea text-end" v-if="cartData.total - cartData.final_total !== 0">
        <p>優惠券折扣：-NT${{toCurrency(cartData.total - cartData.final_total)}}</p>
      </div>
      <div class="d-flex justify-content-end align-items-end mb-4">
        <p class="mb-0 me-4">總金額</p>
        <p class="h3 fw-bold mb-0">NT${{toCurrency(cartData.final_total)}}</p>
      </div>
      <div class="d-flex justify-content-center">
        <button class="btn btn-outline-dark me-3" type="button"
        @click="$router.push('/products')">繼續購物</button>
        <button class="btn btn-primary" type="button"
        @click="$router.push('/createOrder')">下一步</button>
      </div>
    </div>
    <div class="noCart text-center py-6" v-else>
      <h2 class="h3 mb-4">購物車中沒有產品</h2>
      <div class="d-flex justify-content-center">
        <button type="button" class="btn btn-primary"
        @click="$router.push('/products')">開始選購</button>
      </div>
    </div>
    <div class="loading" v-if="cartLoading">
      <div class="icon"></div>
    </div>
  </div>
</template>

<script>
import buySteps from '@/components/BuySteps.vue';

export default {
  data() {
    return {
      step: 1,
      cartData: {
        carts: [],
        total: 3600,
        final_total: 3700,
      },
      coupon: '',
      isUseCoupon: false,
      cartLoading: true,
    };
  },
  components: {
    buySteps,
  },
  methods: {
    getCartData() {
      this.cartLoading = true;
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url)
        .then((res) => {
          if (res.data.success) {
            this.cartData = res.data.data;
            if (this.cartData.carts.length !== 0) {
              if (res.data.data.carts[0].coupon !== undefined) {
                this.coupon = res.data.data.carts[0].coupon.code;
                this.isUseCoupon = true;
              }
            }
            this.cartLoading = false;
          }
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    changeQty(cart, status) {
      let { qty } = cart;
      if (status === 'add') {
        qty += 1;
      } else {
        qty -= 1;
      }
      const obj = {
        data: {
          product_id: cart.id,
          qty,
        },
      };
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/cart/${cart.id}`;
      this.$http.put(url, obj)
        .then((res) => {
          if (res.data.success) {
            this.getCartData();
            this.$swal({
              html: `<span class="fw-bold">【${cart.product.piece}】${cart.product.title}</span>購買數量改為${res.data.data.qty}！`,
              showConfirmButton: false,
              icon: 'success',
              timer: 3000,
            });
          } else {
            this.$swal({
              html: `<span class="fw-bold">【${cart.product.piece}】${cart.product.title}</span>購買數量修改失敗！`,
              showConfirmButton: false,
              icon: 'error',
              timer: 3000,
            });
          }
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    deleteCartAlert(status, cart) {
      let alertHtml = '';
      if (status === 'deleteOne') {
        alertHtml = `<p>確定要將<span class="fw-bold">【${cart.product.piece}】${cart.product.title}</span>從購物車刪除？</p>`;
      } else {
        alertHtml = '確定要清空購物車？';
      }
      this.$swal({
        title: '刪除確認',
        html: alertHtml,
        showCancelButton: true,
        confirmButtonClass: 'btn btn-danger me-3',
        confirmButtonText: '刪除',
        cancelButtonText: '取消',
      }).then((result) => {
        if (result.value) {
          if (status === 'deleteOne') {
            this.deleteCart(cart);
          } else {
            this.deleteAllCart();
          }
        }
      });
    },
    deleteCart(cart) {
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/cart/${cart.id}`;
      this.$http.delete(url)
        .then((res) => {
          if (res.data.success) {
            this.emitter.emit('getCartData');
            this.getCartData();
            this.$swal({
              html: `將<span class="fw-bold">【${cart.product.piece}】${cart.product.title}</span>從購物車中刪除！`,
              showConfirmButton: false,
              icon: 'success',
              timer: 3000,
            });
          } else {
            this.$swal({
              title: '購物車刪除失敗！',
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
    deleteAllCart() {
      this.cartLoading = true;
      document.documentElement.scrollTop = 0;
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/carts`;
      this.$http.delete(url)
        .then((res) => {
          if (res.data.success) {
            this.emitter.emit('getCartData');
            this.getCartData();
            this.cartLoading = false;
            this.$swal({
              title: '成功清空購物車！',
              showConfirmButton: false,
              icon: 'success',
              timer: 2000,
            });
          } else {
            this.$swal({
              title: '清空購物車失敗！',
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
    useCoupon() {
      const obj = {
        data: {
          code: this.coupon,
        },
      };
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/coupon`;
      this.$http.post(url, obj)
        .then((res) => {
          if (res.data.success) {
            this.getCartData();
            this.isUseCoupon = true;
            this.$swal({
              title: '套用優惠券成功！',
              showConfirmButton: false,
              icon: 'success',
              timer: 2000,
            });
          } else {
            this.$swal({
              title: `${res.data.message}`,
              showConfirmButton: false,
              icon: 'error',
              timer: 2000,
            });
          }
        });
    },
  },
  mounted() {
    this.getCartData();
  },
};
</script>
