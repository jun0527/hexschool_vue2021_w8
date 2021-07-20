<template>
    <ul class="buySteps list-unstyled d-flex justify-content-evenly align-items-center
    text-center px-6 mb-5">
      <li class="buyStepsItem d-md-block"
      :class="{'stepActive': step >= 1, 'd-none': step !== 1}">
        <p class="mb-0">1</p>
        <p class="mb-0">購物車列表確認</p>
      </li>
      <li v-if="step === 1" class="d-none d-md-block"><i class="bi bi-arrow-right-circle"></i></li>
      <li v-else class="d-none d-md-block"><i class="bi bi-arrow-right-circle-fill"></i></li>
      <li class="buyStepsItem d-md-block"
      :class="{'stepActive': step >= 2, 'd-none': step !== 2}">
        <p class="mb-0">2</p>
        <p class="mb-0">填寫購買人資料</p>
      </li>
      <li v-if="step <= 2" class="d-none d-md-block"><i class="bi bi-arrow-right-circle"></i></li>
      <li v-else class="d-none d-md-block"><i class="bi bi-arrow-right-circle-fill"></i></li>
      <li class="buyStepsItem d-md-block"
      :class="{'stepActive': step >= 3, 'd-none': step !== 3}">
        <p class="mb-0">3</p>
        <p class="mb-0">確認付款</p>
      </li>
    </ul>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ['step'],
};
</script>
