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
          <td>{{item.piece}}</td>
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
    <pagination :paginationData="paginationData" @getData="getProductsData"></pagination>
  </div>
  <div class="loading" v-if="getProductsLoading">
    <div class="icon"></div>
  </div>
  <productModal ref="productModal" @getProducts="getProductsData"></productModal>
  <deleteModal ref="deleteModal" @getProducts="getProductsData"></deleteModal>
</template>

<script>
import swal from 'sweetalert';
import productModal from '@/components/ProductModal.vue';
import deleteModal from '@/components/DeleteModal.vue';
import pagination from '@/components/Pagination.vue';

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
    productModal,
    deleteModal,
    pagination,
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
          }
        })
        .catch((err) => {
          console.dir(err);
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
        .catch((err) => {
          console.dir(err);
        });
    },
    openModal(modal, index) {
      if (modal === 'editProduct') {
        this.$refs.productModal.tempData.title = this.products[index].title;
        this.$refs.productModal.tempData.category = this.products[index].category;
        this.$refs.productModal.tempData.imageUrl = this.products[index].imageUrl;
        this.$refs.productModal.tempData.content = this.products[index].content;
        this.$refs.productModal.tempData.origin_price = this.products[index].origin_price;
        this.$refs.productModal.tempData.price = this.products[index].price;
        this.$refs.productModal.tempData.unit = this.products[index].unit;
        this.$refs.productModal.tempData.is_enabled = this.products[index].is_enabled;
        this.$refs.productModal.tempData.isNewProduct = this.products[index].isNewProduct;
        this.$refs.productModal.tempData.style = this.products[index].style;
        this.$refs.productModal.tempData.piece = this.products[index].piece;
        this.$refs.productModal.editId = this.products[index].id;
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
