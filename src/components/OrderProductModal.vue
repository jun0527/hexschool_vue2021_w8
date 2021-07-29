<template>
  <div class="modal fade" ref="submitModal" tabindex="-1"
  aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h5 class="modal-title text-white" id="exampleModalLabel">訂單資訊</h5>
          <button type="button" class="btn-close btn-close-white" @click="closeModal"></button>
        </div>
        <div class="modal-body" v-if="JSON.stringify(order) !== '{}'">
          <h2 class="h4 fw-bold">購買資料</h2>
          <p>付款日期：{{paidDate}}</p>
          <p>訂單編號：{{order.id}}</p>
          <p>付款方式：{{order.user.payment_method}}</p>
          <p>留言：{{order.message}}</p>
          <hr>
          <h2 class="h4 fw-bold">購買產品</h2>
          <p v-for="product in products" :key="product.title">
            {{product.title}} x {{product.qty}}
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-dark" @click="closeModal">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  data() {
    return {
      orderProductModal: {},
      order: {},
      products: [],
      paidDate: '',
    };
  },
  methods: {
    openModal() {
      this.orderProductModal.show();
      this.getProducts();
    },
    closeModal() {
      this.order = {};
      this.products = [];
      this.orderProductModal.hide();
    },
    getProducts() {
      this.order.cartIds.forEach((item) => {
        const obj = {};
        obj.title = this.order.products[item].product.title;
        obj.qty = this.order.products[item].qty;
        this.products.push(obj);
      });
    },
    getPaidDate() {
      const date = new Date(this.order.paid_date * 1000);
      this.paidDate = `${date.getFullYear()}/${(0 + String(date.getMonth() + 1)).slice(-2)}/${date.getDate()}`;
    },
  },
  mounted() {
    this.orderProductModal = new Modal(this.$refs.submitModal, { backdrop: 'static', keyboard: false });
  },
};
</script>
