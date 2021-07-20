<template>
  <nav class="nav navbar navbar-expand-md fixed-top top-0 w-100 bg-dark">
    <div class="container">
      <button class="navbar-toggler mobileMenuBtn" type="button"
      data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false"
      aria-label="Toggle navigation"><i class="bi bi-list"></i>
      </button>
      <h1><a class="navbar-brand title" href="#">Pinpin</a></h1>
      <div class="mobileMenu collapse navbar-collapse bg-dark" ref="mobileMenu"
      id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/">商品管理</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/orders">訂單管理</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/coupon">優惠券管理</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="openModal">登出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="wrap container">
    <router-view></router-view>
    <logoutModal ref="logoutModal"></logoutModal>
  </div>
</template>

<script>
import logoutModal from '@/components/LogoutModal.vue';

export default {
  data() {
    return {
      check: false,
    };
  },
  components: {
    logoutModal,
  },
  methods: {
    checkSignIn() {
      const url = `${process.env.VUE_APP_URL}api/user/check`;
      this.$http.post(url)
        .then((res) => {
          if (res.data.success) {
            this.check = true;
          } else {
            this.check = false;
            this.$router.push('/signIn');
          }
        });
    },
    openModal() {
      this.$refs.logoutModal.openModal();
    },
  },
  created() {
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)vue2021_w7\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = myCookie;
  },
  mounted() {
    this.checkSignIn();
  },
};
</script>
