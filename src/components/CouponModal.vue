<template>
  <div ref="modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <Form v-slot={errors} @submit="postCoupon(modal)" :key="clearForm">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title">優惠券建立</h5>
            <button type="button" class="btn-close btn-close-white" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div class="formGroup mb-3">
              <label for="title" class="form-label">優惠券名稱</label>
              <Field type="text" class="form-control"
              :class="{'is-invalid': errors['優惠券名稱']}" id="title"
              name="優惠券名稱" placeholder="請輸入優惠券名稱"
              rules="required" v-model="tempData.title"></Field>
              <ErrorMessage name="優惠券名稱" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="formGroup mb-3">
              <label for="percent" class="form-label">優惠券折扣數</label>
              <Field type="number" class="form-control"
              :class="{'is-invalid': errors['優惠券折扣數']}" id="percent" name="優惠券折扣數"
              placeholder="請輸入優惠券折扣數(單位為%)" :rules="percentRule" min="0"
              v-model.number="tempData.percent"></Field>
              <ErrorMessage name="優惠券折扣數" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="formGroup mb-3">
              <label for="code" class="form-label">優惠代碼</label>
              <Field type="text" class="form-control"
            :class="{'is-invalid': errors['優惠代碼']}" id="code" name="優惠代碼"
            placeholder="請輸入優惠代碼" rules="required"
            v-model="tempData.code"></Field>
            <ErrorMessage name="優惠代碼" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="formGroup mb-3">
              <label for="due_date" class="form-label">到期日</label>
              <Field type="date" class="form-control"
            :class="{'is-invalid': errors['到期日']}"
            id="due_date" name="到期日" placeholder="請輸入到期日"
            rules="required" v-model="tempData.due_date_string"></Field>
            <ErrorMessage name="到期日" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="formGroup mb-3" v-if="modal === 'addCoupon'">
              <input type="checkbox" id="is_enabled" name="is_enabled" @change="isEnabled">
              <label for="is_enabled">是否啟用</label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-dark"
            data-bs-dismiss="modal" @click="closeModal">取消</button>
            <button type="submit" class="btn btn-primary" v-if="modal === 'addCoupon'">建立</button>
            <button type="submit" class="btn btn-primary" v-else>編輯</button>
          </div>
        </Form>
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
      couponModal: {},
      modal: '',
      tempData: {
        title: '',
        percent: '',
        due_date_string: '',
        code: '',
        is_enabled: 0,
      },
      clearForm: false,
    };
  },
  emits: ['getCouponsData'],
  methods: {
    openModal() {
      this.clearForm = false;
      this.couponModal.show();
    },
    closeModal() {
      this.clearForm = true;
      this.clearData();
      this.modal = '';
      this.couponModal.hide();
    },
    clearData() {
      this.tempData = {
        title: '',
        percent: '',
        due_date_string: '',
        code: '',
        is_enabled: 0,
      };
    },
    percentRule(value) {
      if (!value) {
        return '優惠券折扣數 為必填欄位';
      }
      if (value >= 100) {
        return '優惠券折扣數 必須小於100';
      }
      if (value <= 0) {
        return '優惠券折扣數 不得小於等於0';
      }
      return true;
    },
    isEnabled() {
      if (this.tempData.is_enabled) {
        this.tempData.is_enabled = 0;
      } else {
        this.tempData.is_enabled = 1;
      }
    },
    postCoupon(modal) {
      const obj = {};
      obj.data = { ...this.tempData };
      obj.data.due_date = Date.parse(this.tempData.due_date_string) / 1000;
      if (modal === 'addCoupon') {
        const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/admin/coupon`;
        this.$http.post(url, obj)
          .then((res) => {
            if (res.data.success) {
              this.$emit('getCouponsData');
              swal('優惠券建立成功！');
              this.closeModal();
            } else {
              swal('優惠券建立失敗！');
              this.closeModal();
            }
          })
          .catch(() => {
            swal('網頁發生錯誤，請重新整理此頁面！');
          });
      } else if (modal === 'editCoupon') {
        const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempData.id}`;
        this.$http.put(url, obj)
          .then((res) => {
            if (res.data.success) {
              this.$emit('getCouponsData');
              swal('優惠券修改成功！');
              this.closeModal();
            } else {
              swal('優惠券修改失敗！');
              this.closeModal();
            }
          })
          .catch(() => {
            swal('網頁發生錯誤，請重新整理此頁面！');
          });
      }
    },
  },
  mounted() {
    this.couponModal = new Modal(this.$refs.modal, { backdrop: 'static', keyboard: false });
  },
};
</script>
