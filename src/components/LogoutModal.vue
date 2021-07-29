<template>
  <div class="modal fade" tabindex="-1"  ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h5 class="modal-title text-white">登出確認</h5>
          <button type="button" class="btn-close btn-close-white"
          @click="closeModal"></button>
      </div>
        <div class="modal-body">
          <p>確定要登出？</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-dark" @click="closeModal">取消</button>
        <button type="button" class="btn btn-danger" @click="logOut">登出</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';
import swal from 'sweetalert';

export default {
  data() {
    return {
      logoutModal: {},
    };
  },
  methods: {
    openModal() {
      this.logoutModal.show();
    },
    closeModal() {
      this.logoutModal.hide();
    },
    logOut() {
      const url = `${process.env.VUE_APP_URL}logout`;
      this.$http.post(url)
        .then((res) => {
          if (res.data.success) {
            swal('登出成功！');
            document.cookie = 'vue2021_w7="";';
            this.closeModal();
            this.$router.push('/signIn');
          } else {
            swal('登出失敗！');
          }
        })
        .catch(() => {
          swal('網頁發生錯誤，請重新整理此頁面！');
        });
    },
  },
  mounted() {
    this.logoutModal = new Modal(this.$refs.modal, { backdrop: 'static', keyboard: false });
  },
};
</script>
