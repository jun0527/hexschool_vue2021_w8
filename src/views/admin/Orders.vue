<template>
  <div class="py-4">
    <h2 class="text-center">訂單管理</h2>
    <div class="d-flex justify-content-end">
      <button type="button" class="btn btn-danger mb-3"
      @click="openModal('deleteModal','','deleteAllOrder')">刪除全部</button>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th width="10%">日期</th>
          <th width="10%">姓名、電話</th>
          <th width="30%">email、地址</th>
          <th width="10%">總金額</th>
          <th width="10%">是否付款</th>
          <th width="20%">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr class="align-middle" v-for="(item, index) in orders" :key="item.id">
          <td>{{item.date}}</td>
          <td>
            {{item.user.name}}<br>
            {{item.user.tel}}
          </td>
          <td>
            <p class="mb-0" :title="item.user.email">{{item.user.email}}</p>
            <p class="mb-0" :title="item.user.address">{{item.user.address}}</p>
          </td>
          <td>{{item.total}}</td>
          <td>
            <input type="checkbox" class="checkbox" :id="item.id" :checked="item.is_paid" disabled>
            <span class="isEnabled">{{item.is_paid ? '已付款' : '未付款'}}</span>
          </td>
          <td>
            <button type="button" class="btn btn-outline-primary me-2"
            @click="openModal('productModal', index)">
              查看訂單產品</button>
            <button type="button" class="btn btn-outline-danger"
            @click="openModal('deleteModal', index)">
              刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :paginationData="pagination"
    @getData="getOrdersData"></pagination>
  </div>
  <div class="loading" v-if="getOedersLoading">
    <div class="icon"></div>
  </div>
  <orderProductModal ref="productModal"></orderProductModal>
  <changeStatusModal ref="changeStatusModal" @getOrders="getOrdersData"></changeStatusModal>
  <deleteModal ref="deleteModal" @getOrder="getOrdersData"></deleteModal>
</template>

<script>
import orderProductModal from '@/components/OrderProductModal.vue';
import changeStatusModal from '@/components/ChangeStatusModal.vue';
import deleteModal from '@/components/DeleteModal.vue';
import pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      orders: [],
      originOrders: [],
      pagination: {},
      getOedersLoading: true,
    };
  },
  components: {
    orderProductModal,
    changeStatusModal,
    deleteModal,
    pagination,
  },
  methods: {
    getOrdersData(page = 1) {
      this.getOedersLoading = true;
      document.documentElement.scrollTop = 0;
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
      this.$http.get(url)
        .then((res) => {
          if (res.data.success) {
            this.orders = JSON.parse(JSON.stringify(res.data.orders));
            this.originOrders = res.data.orders;
            this.pagination = res.data.pagination;
            this.orders.forEach((item, index) => {
              const date = new Date(item.create_at * 1000);
              this.orders[index].date = `${date.getFullYear()}/${(0 + String(date.getMonth() + 1)).slice(-2)}/${date.getDate()}`;
              const cartIds = Object.keys(item.products);
              this.orders[index].cartIds = cartIds;
            });
            this.getOedersLoading = false;
          }
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    openModal(modal, index, status) {
      if (modal === 'productModal') {
        this.$refs.productModal.order = this.orders[index];
      } else if (modal === 'changeStatusModal') {
        this.$refs.changeStatusModal.order = this.originOrders[index];
        this.$refs.changeStatusModal.page = this.pagination.current_page;
      } else if (modal === 'deleteModal' && status === 'deleteAllOrder') {
        this.$refs.deleteModal.deleteStatus = status;
      } else if (modal === 'deleteModal') {
        this.$refs.deleteModal.deleteStatus = modal;
        this.$refs.deleteModal.deleteOrderId = this.orders[index].id;
      }
      this.$refs[modal].openModal();
    },
  },
  created() {
    this.getOrdersData();
  },
};
</script>
