<template>
  <div class="wrap">
    <div class="customizationBanner">
      <div class="titleArea">
          <h2>客製拼圖</h2>
        </div>
    </div>
    <div class="container py-3 py-md-6">
      <div class="row mb-5 mb-md-9 overflow-hidden">
        <div class="col-md-4 gx-1 mb-1 mb-md-3 d-block d-md-none">
          <div class="h-100 d-flex flex-column justify-content-center
          align-items-center bg-secondary py-4">
            <h3 class="fw-bold mb-3">將美好的回憶變成拼圖</h3>
            <button type="button" class="btn btn-primary" @click="toCustomizationFrom">
              預約客製拼圖
            </button>
          </div>
        </div>
        <div class="col-md-8 mb-0 mb-md-3 gx-1 gx-md-4">
          <img ref="graduation" class="w-100 position-relative"
          :class="{'moveLeft': move.graduation}"
          src="@/assets/images/畢業圖2.jpg" alt="客製拼圖圖片">
        </div>
        <div class="col-md-4 mb-1 mb-md-3">
          <div class="h-100 d-flex justify-content-center align-items-center bg-secondary">
            <h3 class="fw-bold d-none d-md-block">值得紀念的畫面</h3>
          </div>
        </div>
        <div class="col-6 col-md-4 mb-0 mb-md-3 gx-1 gx-md-4">
          <img ref="wedding" class="w-100 position-relative" :class="{'moveLeft': move.wedding}"
          src="@/assets/images/婚紗圖.jpg" alt="客製拼圖圖片">
        </div>
        <div class="col-md-4 mb-3 d-none d-md-block">
          <div class="h-100 d-flex flex-column justify-content-center
          align-items-center bg-secondary">
            <h3 class="fw-bold text-center mb-1 mb-md-3">將美好的回憶<br>變成拼圖</h3>
            <button type="button" class="btn btn-primary" @click="toCustomizationFrom">
              預約客製拼圖
            </button>
          </div>
        </div>
        <div class="col-6 col-md-4 mb-0 mb-md-3 gx-1 gx-md-4">
          <img ref="travel" class="w-100 position-relative" :class="{'moveRight': move.travel}"
          src="@/assets/images/登山圖.jpg" alt="客製拼圖圖片">
        </div>
        <div class="col-md-4 mb-1 mb-md-3">
          <div class="h-100 d-flex justify-content-center align-items-center bg-secondary">
            <h3 class="fw-bold d-none d-md-block">珍惜的人事物</h3>
          </div>
        </div>
        <div class="col-md-8 mb-0 mb-md-3 gx-1 gx-md-4">
          <img ref="pet" class="w-100 position-relative" :class="{'moveRight': move.pet}"
          src="@/assets/images/家中萌寵.jpg" alt="客製拼圖圖片">
        </div>
      </div>
      <div ref="customizationFromArea">
        <h3 class="text-center fw-bold">預約客製拼圖</h3>
        <p class="text-center">請先留下基本資料，我們將派專人與您聯絡。</p>
        <div class="row">
          <Form class="customizationFrom" v-slot="{ errors }" @submit="sendData" :key="isClearData">
            <p><span class="text-danger">*</span>為必填</p>
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
              <label for="paymentMethod" class="form-label">客製拼圖片數
                <span class="text-danger">*</span></label>
              <Field id="paymentMethod" name="課製拼圖片數"
              class="form-control" :class="{ 'is-invalid': errors['課製拼圖片數'] }"
              rules="required" v-model="piece" as="select">
                <option value="" selected disabled>請選擇客製拼圖片數</option>
                <option value="100片">100片</option>
                <option value="500片">500片</option>
                <option value="1000片">1000片</option>
                <option value="2000片">2000片</option>
                <option value="4000片">4000片</option>
              </Field>
              <ErrorMessage name="課製拼圖片數" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="mb-3">
              <label for="message" class="form-label">留言</label>
              <Field id="message" name="留言" type="text"
              class="form-control messageArea"
              placeholder="若有其他需求可在此處說明" v-model="message" as="textarea"></Field>
            </div>
            <div class="mb-3 d-flex justify-content-center">
              <button class="btn btn-primary" type="submit">送出</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: '',
        email: '',
        tel: '',
      },
      piece: '',
      message: '',
      isClearData: true,
      move: {
        graduation: false,
        wedding: false,
        travel: false,
        pet: false,
      },
    };
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
    scrollEvent() {
      const scrollY = window.scrollY + window.innerHeight;
      if (this.$refs.graduation.offsetTop < scrollY) {
        this.move.graduation = true;
      } else {
        this.move.graduation = false;
      }
      if (this.$refs.wedding.offsetTop < scrollY) {
        this.move.wedding = true;
      } else {
        this.move.wedding = false;
      }
      if (this.$refs.travel.offsetTop < scrollY) {
        this.move.travel = true;
      } else {
        this.move.travel = false;
      }
      if (this.$refs.pet.offsetTop < scrollY) {
        this.move.pet = true;
      } else {
        this.move.pet = false;
      }
    },
    sendData() {
      this.clearData();
      this.isClearData = !this.isClearData;
      this.$swal({
        title: '預約成功',
        text: '專人將在近期與您聯絡！',
        showConfirmButton: false,
        icon: 'success',
        timer: 2000,
      });
    },
    clearData() {
      this.user.name = '';
      this.user.email = '';
      this.user.tel = '';
      this.piece = '';
      this.message = '';
    },
  },
  mounted() {
    window.addEventListener('scroll', this.scrollEvent);
  },
  unmounted() {
    window.removeEventListener('scroll', this.scrollEvent);
  },
};
</script>
