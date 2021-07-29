<template>
  <div class="py-4">
    <h2 class="text-center">商品管理</h2>
    <div class="d-flex justify-content-end">
      <button type="button" class="btn btn-primary mb-3"
      @click="openModal('addProduct')">建立新商品</button>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th width="25%">商品名稱</th>
          <th width="15%">拼圖片數</th>
          <th width="15%">原價</th>
          <th width="15%">售價</th>
          <th width="15%">編輯狀態</th>
          <th width="15%">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr class="align-middle" v-for="(item, index) in products" :key="item.id">
          <td>{{item.title}}</td>
          <td>{{item.piece}}片</td>
          <td>{{item.origin_price}}</td>
          <td>{{item.price}}</td>
          <td>
            <input class="checkbox" type="checkbox" :id="`enabled${item.id}`"
            @change="changeStatus('is_enabled', index)" :checked="item.is_enabled===1">
            <label class="checkbox me-3" :for="`enabled${item.id}`">啟用</label>
            <input class="checkbox" type="checkbox" :id="`newProduct${item.id}`"
            @change="changeStatus('newProduct', index)" :checked="item.isNewProduct">
            <label class="checkbox" :for="`newProduct${item.id}`">新品</label>
          </td>
          <td>
            <button type="button" class="btn btn-primary me-2"
            @click="openModal('editProduct', index)">編輯</button>
              <button type="button" class="btn btn-outline-danger" @click="deleteProduct(item)">
              刪除</button></td>
        </tr>
      </tbody>
    </table>
    <Pagination :paginationData="paginationData" @getData="getProductsData"/>
  </div>
  <div class="loading" v-if="getProductsLoading">
    <div class="icon"></div>
  </div>
  <ProductModal ref="productModal" @getProducts="getProductsData"/>
  <DeleteModal ref="deleteModal" @getProducts="getProductsData"/>
</template>

<script>
import swal from 'sweetalert';
import ProductModal from '@/components/ProductModal.vue';
import DeleteModal from '@/components/DeleteModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      products: [],
      tempData: {},
      getProductsLoading: true,
      paginationData: '',
    };
  },
  components: {
    ProductModal,
    DeleteModal,
    Pagination,
  },
  methods: {
    getProductsData(page = 1) {
      document.documentElement.scrollTop = 0;
      this.getProductsLoading = true;
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.$http.get(url)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
            this.paginationData = res.data.pagination;
            this.getProductsLoading = false;
          } else {
            swal('產品資料讀取失敗！');
          }
        })
        .catch(() => {
          swal('網頁發生錯誤，請重新整理此頁面！');
        });
    },
    changeStatus(status, index) {
      this.getProductsLoading = true;
      let tempEnabled = 0;
      let tempNewProduct = false;
      this.tempData = this.products[index];
      if (status === 'is_enabled') {
        if (status === 1) {
          tempEnabled = 0;
        } else {
          tempEnabled = 1;
        }
        this.tempData.is_enabled = tempEnabled;
      } else {
        tempNewProduct = !this.products[index].isNewProduct;
        this.tempData.isNewProduct = tempNewProduct;
      }
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempData.id}`;
      this.$http.put(url, { data: this.tempData })
        .then((res) => {
          if (res.data.success) {
            if (status === 'is_enabled') {
              swal(`將狀態更新為${tempEnabled === 1 ? '啟用' : '不啟用'}！`);
            } else {
              swal(`將狀態更新為${tempNewProduct ? '新品' : '非新品'}！`);
            }
            this.getProductsData(this.paginationData.current_page);
          } else {
            swal('更新產品狀態失敗！');
          }
        })
        .catch(() => {
          swal('網頁發生錯誤，請重新整理此頁面！');
        });
    },
    openModal(modal, index) {
      if (modal === 'editProduct') {
        this.$refs.productModal.tempData = { ...this.products[index] };
        this.$refs.productModal.editId = this.products[index].id;
        this.$refs.productModal.isSameProduct = true;
      }
      this.$refs.productModal.modal = modal;
      this.$refs.productModal.openModal();
    },
    deleteProduct(product) {
      this.$refs.deleteModal.openModal();
      this.$refs.deleteModal.deleteStatus = 'deleteProduct';
      this.$refs.deleteModal.deleteProduct = { ...product };
    },
  },
  mounted() {
    this.getProductsData();
  },
};
</script>
