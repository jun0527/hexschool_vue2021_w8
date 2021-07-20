<template>
  <div class="wrap">
    <div class="sigInBanner">
      <div class="titleArea">
        <h2>後台登入</h2>
      </div>
    </div>
    <div class="container py-3 py-md-6">
      <div class="row justify-content-center px-4">
        <Form class="signInArea col-lg-4 col-md-6 col-sm-8 p-4"
        v-slot="{errors}" @submit="signIn()">
          <h2 class="text-center">管理員登入</h2>
          <div class="formGroup mb-3">
            <label for="email">帳號</label>
            <Field type="email" class="form-control" :class="{'is-invalid': errors['email']}"
            id="email" name="email" v-model.trim="user.username" placeholder="請輸入email"
            rules="required|email"></Field>
            <ErrorMessage class="invalid-feedback" name="email"></ErrorMessage>
          </div>
          <div class="formGroup mb-3">
            <label  for="password">密碼</label>
            <Field type="password" class="form-control" :class="{'is-invalid': errors['密碼']}"
            id="password" name="密碼" v-model.trim="user.password" placeholder="請輸入密碼"
            rules="required"></Field>
            <ErrorMessage class="invalid-feedback" name="密碼"></ErrorMessage>
          </div>
          <div class="formGroup mb-3">
            <button type="submit" class="btn btn-primary w-100">登入</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert';

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      token: '',
      expired: '',
    };
  },
  methods: {
    signIn() {
      const url = `${process.env.VUE_APP_URL}admin/signin`;
      this.$http.post(url, this.user)
        .then((res) => {
          if (res.data.success) {
            this.token = res.data.token;
            this.expired = new Date(res.data.expired);
            document.cookie = `vue2021_w7=${this.token}; expires=${this.expired}`;
            swal('登入成功！');
            this.$router.push('/admin/');
          } else {
            swal('登入失敗，請確認email及密碼是否正確！');
          }
        })
        .catch((err) => {
          console.dir(err);
        });
    },
  },
};
</script>
