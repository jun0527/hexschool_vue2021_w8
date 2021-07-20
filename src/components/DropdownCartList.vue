<template>
  <div v-if="cartData.carts.length !== 0">
    <h2 class="h3 text-center fw-bold">購物車列表</h2>
    <ul class="list-unstyled m-0">
      <li class="productLi d-flex justify-content-between align-items-center"
      v-for="item in cartData.carts" :key="item.id"
      @click="toOtherPages('product', item.product.id)">
        <div class="d-flex align-items-center">
          <div class="cartPictureArea me-2">
            <img :src="item.product.imageUrl" alt="產品圖片"
            :class="{'straight': item.product.category === '直',
            'horizontal': item.product.category === '橫'}">
          </div>
          <div class="productContent">
            <h3 class="h6 mb-0">【{{item.product.piece}}】{{item.product.title}}</h3>
            <p class="mb-0">NT${{toCurrency(item.product.price)}}</p>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <button class="qtyBtn" type="button" @click.stop="changeQty(item, 'reduce')"
          :disabled="item.qty === 1">
            <i class="icon bi bi-dash-square"></i>
            <i class="hover bi bi-dash-square-fill"></i>
          </button>
          <span class="qty">{{item.qty}}</span>
          <button class="qtyBtn" type="button" @click.stop="changeQty(item, 'add')">
            <i class="icon bi bi-plus-square"></i>
            <i class="hover bi bi-plus-square-fill"></i>
          </button>
          <button class="deleteBtn" @click.stop="deleteCartAlert(item)">
            <i class="bi bi-x text-dark"></i>
          </button>
        </div>
      </li>
      <li class="d-flex justify-content-end align-items-center py-2">
        <p class="mb-0">總金額</p>
        <p class="totalPrice fw-bold mb-0 ms-3">
          NT${{toCurrency(cartData.final_total)}}</p>
      </li>
      <li class="d-flex justify-content-end">
        <button class="w-100 btn btn-primary" type="button"
        @click="toOtherPages('cart')">結帳去</button>
      </li>
    </ul>
  </div>
  <div v-else>
    <h2 class="h3 text-center mb-3">購物車中沒有產品</h2>
    <div class="d-flex justify-content-center">
      <button type="button" class="btn btn-primary"
      @click="toOtherPages('products')">開始選購</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['cartData', 'listName'],
  methods: {
    changeQty(cart, status) {
      let { qty } = cart;
      if (status === 'add') {
        qty += 1;
      } else {
        qty -= 1;
      }
      const obj = {
        data: {
          product_id: cart.id,
          qty,
        },
      };
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/cart/${cart.id}`;
      this.$http.put(url, obj)
        .then((res) => {
          if (res.data.success) {
            // this.getCartData();
            this.$emit('getCartData');
            this.$swal({
              html: `<span class="fw-bold">【${cart.product.piece}】${cart.product.title}</span>購買數量改為${res.data.data.qty}！`,
              showConfirmButton: false,
              icon: 'success',
              timer: 3000,
            });
          } else {
            this.$swal({
              html: `<span class="fw-bold">【${cart.product.piece}】${cart.product.title}</span>購買數量修改失敗！`,
              showConfirmButton: false,
              icon: 'error',
              timer: 3000,
            });
          }
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    deleteCartAlert(cart) {
      this.$swal({
        title: '刪除確認',
        html: `<p>確定要將<span class="fw-bold">【${cart.product.piece}】${cart.product.title}</span>從購物車刪除？</p>`,
        showCancelButton: true,
        confirmButtonClass: 'btn btn-danger me-3',
        confirmButtonText: '刪除',
        cancelButtonText: '取消',
      }).then((result) => {
        if (result.value) {
          this.deleteCart(cart);
        }
      });
    },
    deleteCart(cart) {
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/cart/${cart.id}`;
      this.$http.delete(url)
        .then((res) => {
          if (res.data.success) {
            // this.getCartData();
            this.$emit('getCartData');
            this.$swal({
              html: `將<span class="fw-bold">【${cart.product.piece}】${cart.product.title}</span>從購物車中刪除！`,
              showConfirmButton: false,
              icon: 'success',
              timer: 3000,
            });
          } else {
            this.$swal({
              title: '購物車刪除失敗！',
              showConfirmButton: false,
              icon: 'error',
              timer: 2000,
            });
          }
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    toOtherPages(pagesName, id) {
      if (pagesName === 'cart') {
        this.$router.push('/cart');
      } else if (pagesName === 'product') {
        this.$router.push(`/product/${id}`);
        this.emitter.emit('getProductData', id);
      } else if (pagesName === 'products') {
        this.$router.push('/products');
      }
      this.$emit('closeDropdownList', this.listName);
    },
  },
};
</script>
