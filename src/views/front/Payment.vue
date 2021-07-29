<template>
  <div class="wrap">
    <div class="cartBanner">
      <div class="titleArea">
        <h2 v-if="isPayment">結帳完成</h2>
        <h2 v-else>結帳流程</h2>
      </div>
    </div>
    <div class="container py-3 py-md-6" v-if="JSON.stringify(order) !== '{}'">
      <BuySteps :step="step" v-if="!isPayment"/>
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="OrderCompleted text-center pb-3 mb-4 bg-secondary" v-if="isPayment">
            <i class="bi bi-check2-circle text-primary"></i>
            <h3 class="h2">交易成功</h3>
            <p class="h5">感謝購買，產品將於 1~3 個工作天出貨！</p>
          </div>
          <table class="cartList table table-hover align-middle mb-4">
            <thead>
              <tr class="text-center">
                <th width="20%" class="d-none d-md-table-cell">圖示</th>
                <th width="25%">產品名稱</th>
                <th width="20%">數量</th>
                <th width="20%">單價</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-center" v-for="item in orderProducts" :key="item.id">
                <td class="d-none d-md-table-cell">
                  <div class="cartPictureArea ms-auto me-auto">
                    <img :src="item.product.imageUrl" alt="產品圖片"
                    :class="{'straight': item.product.category === '直',
                    'horizontal': item.product.category === '橫'}">
                  </div>
                </td>
                <td>【{{item.product.piece}}】{{item.product.title}}</td>
                <td>{{item.qty}}</td>
                <td>NT${{toCurrency(item.product.price)}}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="text-center" v-if="originPrice !== order.total">
                <td class="border-0 d-none d-md-table-cell"></td>
                <td class="border-0"></td>
                <td class="text-end border-0">優惠券折扣</td>
                <td class="border-0">-NT${{toCurrency(originPrice - order.total)}}</td>
              </tr>
              <tr class="text-center">
                <td class="border-0 d-none d-md-table-cell"></td>
                <td class="border-0"></td>
                <td class="text-end border-0">總金額</td>
                <td class="h5 fw-bold border-0">NT${{toCurrency(order.total)}}</td>
              </tr>
            </tfoot>
          </table>
          <div class="mb-4">
            <h3 class="h4 fw-bold border-bottom border-2 border-dark px-2 mb-0">訂單資訊</h3>
            <div class="bg-secondary p-3">
              <p class="mb-2">訂單日期：{{orderDate}}</p>
              <p class="mb-2" v-if="isPayment">訂單狀態：已付款</p>
              <p class="mb-2" v-else>訂單狀態：未付款</p>
              <p class="mb-0">付款方式：{{order.user.payment_method}}</p>
            </div>
          </div>
          <div class="mb-4">
            <h3 class="h4 fw-bold border-bottom border-2 border-dark px-2 mb-0">收件人資料</h3>
            <div class="bg-secondary p-3">
              <p class="mb-2">收件人：{{order.user.name}}</p>
              <p class="mb-2">e-mail：{{order.user.email}}</p>
              <p class="mb-2">手機號碼：{{order.user.tel}}</p>
              <p class="mb-2">收件地址：{{order.user.address}}</p>
              <p class="mb-0">留言：{{order.message}}</p>
            </div>
          </div>
          <div class="mb-3 d-flex justify-content-center" v-if="isPayment">
            <button class="btn btn-primary" type="button"
            @click="$router.push('/products')">繼續購買</button>
          </div>
          <div class="mb-3 d-flex justify-content-center" v-else>
            <button class="btn btn-primary" type="button" @click="payment">確認付款</button>
          </div>
        </div>
      </div>
    </div>
    <div class="loading" v-if="paymentLoading">
      <div class="icon"></div>
    </div>
  </div>
</template>

<script>
import BuySteps from '@/components/BuySteps.vue';

export default {
  data() {
    return {
      step: 3,
      order: {},
      orderProducts: [],
      cartId: '',
      orderDate: '',
      originPrice: 0,
      isPayment: false,
      paymentLoading: true,
    };
  },
  props: ['id'],
  components: {
    BuySteps,
  },
  methods: {
    getOrderData() {
      this.paymentLoading = true;
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/order/${this.id}`;
      this.$http.get(url)
        .then((res) => {
          if (res.data.success) {
            this.order = res.data.order;
            this.getOrderDate();
            this.getCartId(this.order.products);
            this.paymentLoading = false;
          } else {
            this.$swal({
              title: '訂單資訊讀取失敗！',
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
    getCartId(carts) {
      this.orderProducts = [];
      this.originPrice = 0;
      this.cartId = Object.keys(carts);
      this.cartId.forEach((item) => {
        if (carts[item].id === item) {
          this.orderProducts.push(carts[item]);
          this.originPrice += carts[item].total;
        }
      });
    },
    getOrderDate() {
      const date = new Date(this.order.create_at * 1000);
      this.orderDate = `${date.getFullYear()}/${(0 + String(date.getMonth() + 1)).slice(-2)}/${date.getDate()}`;
    },
    payment() {
      this.paymentLoading = true;
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/pay/${this.id}`;
      this.$http.post(url)
        .then((res) => {
          if (res.data.success) {
            document.documentElement.scrollTop = 0;
            this.paymentLoading = false;
            this.isPayment = true;
            this.$swal({
              title: '付款完成！',
              showConfirmButton: false,
              icon: 'success',
              timer: 3000,
            });
          } else {
            this.$swal({
              title: '付款失敗！',
              showConfirmButton: false,
              icon: 'error',
              timer: 3000,
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
  mounted() {
    this.getOrderData();
  },
};
</script>
