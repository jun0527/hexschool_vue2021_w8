<template>
  <div class="wrap">
    <div class="cartBanner">
      <div class="titleArea">
        <h2>結帳流程</h2>
      </div>
    </div>
    <div class="container py-3 py-md-6">
      <BuySteps :step="step"/>
      <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8">
          <h3 class="text-center fw-bold">購買人資料</h3>
          <p><span class="text-danger">*</span>為必填</p>
          <Form v-slot="{ errors }" @submit="sendOrder">
            <div class="mb-3">
              <label for="name" class="form-label">姓名
                <span class="text-danger">*</span></label>
              <Field id="name" name="姓名" type="text"
              class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
              placeholder="請輸入姓名" rules="required" v-model="user.name"></Field>
              <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email
                <span class="text-danger">*</span></label>
              <Field id="email" name="email" type="email"
              class="form-control" :class="{ 'is-invalid': errors['email'] }"
              placeholder="請輸入 Email" rules="email|required" v-model="user.email"></Field>
              <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="mb-3">
              <label for="tel" class="form-label">手機
                <span class="text-danger">*</span></label>
              <Field id="tel" name="手機" type="tel"
              class="form-control" :class="{ 'is-invalid': errors['手機'] }"
              placeholder="請輸入手機" :rules="isPhone" v-model="user.tel"></Field>
              <ErrorMessage name="手機" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">地址
                <span class="text-danger">*</span></label>
              <Field id="address" name="地址" type="text"
              class="form-control" :class="{ 'is-invalid': errors['地址'] }"
              placeholder="請輸入地址" rules="required" v-model="user.address"></Field>
              <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="mb-3">
              <label for="paymentMethod" class="form-label">付款方式
                <span class="text-danger">*</span></label>
              <Field id="paymentMethod" name="付款方式"
              class="form-control" :class="{ 'is-invalid': errors['付款方式'] }"
              rules="required" v-model="user.payment_method" as="select">
                <option value="" selected disabled>請輸入付款方式</option>
                <option value="WebATM">WebATM</option>
                <option value="ATM">ATM</option>
                <option value="信用卡">信用卡</option>
                <option value="ApplePay">ApplePay</option>
                <option value="GooglePay">GooglePay</option>
              </Field>
              <ErrorMessage name="付款方式" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="mb-3">
              <label for="message" class="form-label">留言</label>
              <Field id="message" name="留言" type="text"
              class="form-control messageArea"
              placeholder="請輸入留言" v-model="message" as="textarea"></Field>
            </div>
            <div class="mb-3 d-flex justify-content-center">
              <button class="btn btn-outline-dark me-3" type="button"
              @click="$router.push('/cart')">上一步</button>
              <button class="btn btn-primary" type="submit">送出訂單</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BuySteps from '@/components/BuySteps.vue';

export default {
  data() {
    return {
      step: 2,
      user: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment_method: '',
      },
      message: '',
    };
  },
  components: {
    BuySteps,
  },
  methods: {
    toCustomizationFrom() {
      document.documentElement.scrollTop = this.$refs.customizationFromArea.offsetTop - 152;
    },
    isPhone(value) {
      if (!value) {
        return '手機 為必填';
      }
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '手機 須為正確的手機號碼';
    },
    sendOrder() {
      const obj = {
        data: {
          user: this.user,
          message: this.message,
        },
      };
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/order`;
      this.$http.post(url, obj)
        .then((res) => {
          if (res.data.success) {
            this.emitter.emit('getCartData');
            this.$router.push(`/payment/${res.data.orderId}`);
          } else {
            this.$swal({
              title: '訂單送出失敗！',
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
  },
};
</script>
