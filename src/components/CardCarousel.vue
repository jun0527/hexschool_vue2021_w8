<template>
  <div class="position-relative">
    <button class="btn carouselDirectionBtn leftBtn" @click="moveCarousel('left')"
    :disabled="atHeadOfList" type="button">
      <i class="bi bi-chevron-left"></i>
    </button>
    <div class="cardCarousel">
      <div class="overflow-hidden">
        <ul class="carouselCardList p-0 row flex-nowrap"
        :style="{'transform': `translateX(${currentOffset}px)`}">
          <li ref="card" class="col-lg-4 col-md-6 mb-3"
            v-for="item in carouselData" :key="item.id">
              <div class="card productCard" @click="toProduct(item.id)">
                <div :class="{'card-img-top': item.category === '橫'}"
                class="pictureArea overflow-hidden">
                  <img :src="item.imageUrl" alt="產品圖片"
                  :class="{'straight': item.category === '直', 'horizontal': item.category === '橫'}">
                </div>
                <div class="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 class="card-title fw-bold">{{item.title}}</h5>
                    <span class="badge bg-grayDark pieceBadge me-2 mb-2">{{item.piece}}</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-end">
                    <div>
                      <span class="h6 text-decoration-line-through"
                      v-if="item.price < item.origin_price">
                        NT${{toCurrency(item.origin_price)}}</span>
                      <p class="h3 mb-2">NT${{toCurrency(item.origin_price)}}</p>
                    </div>
                    <button type="button" class="btn btn-outline-dark moreProductBtn">查看更多</button>
                  </div>
                </div>
              </div>
            </li>
        </ul>
      </div>
    </div>
    <button class="btn carouselDirectionBtn rightBtn" type="button"
    :disabled="atEndOfList" @click="moveCarousel('right')">
      <i class="bi bi-chevron-right"></i>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentOffset: 0,
      renderCardNum: 3,
      leftOverflowNum: 0,
      cardWidth: '',
    };
  },
  props: ['carouselData'],
  computed: {
    atEndOfList() {
      return this.currentOffset
      <= (this.cardWidth * -1) * (this.carouselData.length - this.renderCardNum);
    },
    atHeadOfList() {
      return this.currentOffset === 0;
    },
  },
  methods: {
    moveCarousel(direction) {
      if (direction === 'right' && !this.atEndOfList) {
        this.leftOverflowNum += 1;
      } else if (direction === 'left' && !this.atHeadOfList) {
        this.leftOverflowNum -= 1;
      }
      this.currentOffset = this.leftOverflowNum * -this.cardWidth;
    },
    resizeEvent() {
      this.cardWidth = this.$refs.card.offsetWidth;
      this.currentOffset = this.leftOverflowNum * -this.cardWidth;
      if (window.innerWidth < 768) {
        this.renderCardNum = 1;
      } else if (window.innerWidth < 992) {
        this.renderCardNum = 2;
      } else {
        this.renderCardNum = 3;
      }
    },
    toProduct(id) {
      this.$router.push(`/product/${id}`);
      this.$emit('getProductData', id);
    },
  },
  mounted() {
    this.cardWidth = this.$refs.card.offsetWidth;
    if (window.innerWidth < 768) {
      this.renderCardNum = 1;
    } else if (window.innerWidth < 992) {
      this.renderCardNum = 2;
    } else {
      this.renderCardNum = 3;
    }
    window.addEventListener('resize', this.resizeEvent);
  },
  unmounted() {
    window.removeEventListener('resize', this.resizeEvent);
  },
};
</script>
