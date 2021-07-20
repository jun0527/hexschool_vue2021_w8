<template>
  <div class="modal fade" ref="modal" tabindex="-1"
  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header bg-dark">
        <h5 class="modal-title text-white">訂單狀態確認</h5>
        <button type="button" class="btn-close btn-close-white" @click="closeModal"></button>
      </div>
      <div class="modal-body">
        <p v-if="!order.is_paid">確定要將訂單狀態更改成已付款？</p>
        <p v-else>確定要將訂單狀態更改成未付款？</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-dark" @click="closeModal">取消</button>
        <button type="button" class="btn btn-danger" @click="changeStatus">確認</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import swal from 'sweetalert';
import { Modal } from 'bootstrap';

export default {
  data() {
    return {
      changeStatusModal: {},
      order: {},
      page: '',
    };
  },
  methods: {
    openModal() {
      this.changeStatusModal.show();
    },
    closeModal() {
      this.order = {};
      this.changeStatusModal.hide();
    },
    changeStatus() {
      const obj = {};
      obj.data = { ...this.order };
      obj.data.is_paid = !obj.data.is_paid;
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/admin/order/${this.order.id}`;
      this.$http.put(url, obj)
        .then((res) => {
          if (res.data.success) {
            swal('更改訂單付款狀態成功！');
            this.closeModal();
            this.$emit('getOrders', this.page);
          } else {
            swal('該改訂單付款狀態失敗！');
            this.closeModal();
          }
        })
        .catch((err) => {
          console.dir(err);
        });
    },
  },
  mounted() {
    this.changeStatusModal = new Modal(this.$refs.modal, { backdrop: 'static', keyboard: false });
  },
};
</script>
