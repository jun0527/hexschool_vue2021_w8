<template>
  <nav class="nav navbar navbar-expand-md fixed-top top-0 w-100 bg-dark">
    <div class="container">
      <button class="navbar-toggler mobileMenuBtn" type="button"
      data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false"
      aria-label="Toggle navigation"><i class="bi bi-list"></i>
      </button>
      <h1><a class="navbar-brand title" href="#">Pinpin</a></h1>
      <div class="navbar-nav d-flex flex-row d-md-none position-relative">
        <div>
          <a href="#" class="nav-link cartBtn position-relative p-2" data-bs-toggle="dropdown"
          aria-expanded="false" data-bs-auto-close="outside" ref="mobileMyFavoriteList">
            <i class="bi bi-bookmark-star"></i>
            <span class="cartNum bg-danger" v-if="myFavorite.length !== 0">
              {{myFavorite.length}}</span>
          </a>
          <div class="dropdownCartList dropdown-menu dropdown-menu-end p-4 overflow-auto
          position-absolute">
            <DropdownFavoriteList listName="mobileMyFavoriteList"
            @closeDropdownList="closeDropdownList"
            @getFavoriteData="getFavoriteData"/>
          </div>
        </div>
        <div>
          <a href="#" class="nav-link cartBtn position-relative p-2" data-bs-toggle="dropdown"
          aria-expanded="false" data-bs-auto-close="outside" ref="mobileDropdownList">
            <i class="bi bi-cart3"></i>
            <span class="cartNum bg-danger" v-if="cartData.carts.length !== 0">
              {{cartData.carts.length}}</span>
          </a>
          <div class="dropdownCartList dropdown-menu dropdown-menu-end p-4 overflow-auto
          position-absolute">
            <div v-if="JSON.stringify(cartData) !== '{}'">
              <DropdownCartList :cartData="cartData" listName="mobileDropdownList"
              @getCartData="getCartData" @closeDropdownList="closeDropdownList"/>
            </div>
          </div>
        </div>
      </div>
      <div class="mobileMenu collapse navbar-collapse bg-dark" ref="mobileMenu"
      id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/" @click="closeCollapse">首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products" @click="closeCollapse">拼圖列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/customization"
            @click="closeCollapse">客製拼圖</router-link>
          </li>
        </ul>
      </div>
      <div class="dropdown d-none flex-row d-md-flex">
        <div>
          <a href="#" class="nav-link cartBtn position-relative p-2 me-3" data-bs-toggle="dropdown"
          aria-expanded="false" data-bs-auto-close="outside" ref="myFavoriteList">
            <i class="bi bi-bookmark-star"></i>
            <span class="cartNum bg-danger" v-if="myFavorite.length !== 0">
              {{myFavorite.length}}</span>
          </a>
          <div class="dropdownCartList dropdown-menu dropdown-menu-end p-4 overflow-auto
          position-absolute">
            <div>
              <DropdownFavoriteList listName="myFavoriteList"
              @closeDropdownList="closeDropdownList"
              @getFavoriteData="getFavoriteData"/>
            </div>
          </div>
        </div>
        <div>
          <a href="#" class="nav-link cartBtn position-relative p-2"
          id="dropdownMenuButton1" data-bs-toggle="dropdown"
          aria-expanded="false" data-bs-auto-close="outside" ref="dropdownList">
            <i class="bi bi-cart3"></i>
            <span class="cartNum bg-danger"
            v-if="cartData.carts.length !== 0">{{cartData.carts.length}}</span>
          </a>
          <div class="dropdownCartList dropdown-menu dropdown-menu-end p-4 overflow-auto">
            <div v-if="JSON.stringify(cartData) !== '{}'">
              <DropdownCartList :cartData="cartData" listName="dropdownCartList"
              @getCartData="getCartData" @closeDropdownList="closeDropdownList"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <router-view></router-view>
  <footer class="footer bg-dark d-flex">
    <div class="container d-flex justify-content-between align-items-center py-6">
      <a class="title text-white me-4" href="#">Pinpin</a>
      <p class="text-white mb-0">Copyright © Pinpin 2021 | 僅個人作品，無商業用途</p>
      <button type="button" class="btn btn-outline-light d-none d-md-block"
      @click="$router.push('/admin')">管理員登入</button>
    </div>
  </footer>
</template>

<script>
import { Collapse, Dropdown } from 'bootstrap';
import DropdownCartList from '@/components/DropdownCartList.vue';
import DropdownFavoriteList from '@/components/DropdownFavoriteList.vue';

const storageMethods = {
  get() {
    return JSON.parse(localStorage.getItem('pinpinFavorite'));
  },
};

export default {
  data() {
    return {
      menuCollapse: {},
      dropdownCartList: {},
      mobileDropdownList: {},
      mobileMyFavoriteList: {},
      myFavoriteList: {},
      cartData: {
        carts: [],
        total: 3600,
        final_total: 3700,
      },
      myFavorite: storageMethods.get() || [],
      allProducts: [],
      myFavoriteProducts: [],
    };
  },
  components: {
    DropdownCartList,
    DropdownFavoriteList,
  },
  methods: {
    closeCollapse() {
      this.menuCollapse.hide();
    },
    closeDropdownList(dropdown) {
      this[dropdown].hide();
    },
    getFavoriteData() {
      this.myFavorite = storageMethods.get();
    },
    getCartData() {
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url)
        .then((res) => {
          if (res.data.success) {
            this.cartData = res.data.data;
          } else {
            this.$swal({
              title: '購物車資料讀取失敗！',
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
  mounted() {
    this.getCartData();
    this.emitter.on('getCartData', () => {
      this.getCartData();
    });
    this.emitter.on('getfavoriteProduct', () => {
      this.getFavoriteData();
    });
    this.menuCollapse = new Collapse(this.$refs.mobileMenu, {
      toggle: false,
    });
    this.dropdownCartList = new Dropdown(this.$refs.dropdownList);
    this.mobileDropdownList = new Dropdown(this.$refs.mobileDropdownList);
    this.myFavoriteList = new Dropdown(this.$refs.myFavoriteList);
    this.mobileMyFavoriteList = new Dropdown(this.$refs.mobileMyFavoriteList);
  },
  unmounted() {
    this.emitter.off('getCartData', () => {
      this.getCartData();
    });
    this.emitter.off('getfavoriteProduct', () => {
      this.getFavoriteData();
    });
  },
};
</script>
