<template>
  <div class="modal fade" ref="submitModal" tabindex="-1"
  aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h5 class="modal-title text-white" id="exampleModalLabel">訂單產品</h5>
          <button type="button" class="btn-close btn-close-white" @click="closeModal"></button>
        </div>
        <div class="modal-body">
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
  },
  mounted() {
    this.orderProductModal = new Modal(this.$refs.submitModal, { backdrop: 'static', keyboard: false });
  },
};
</script>
