<template>
  <div class="collapse" ref="collapse">
    <ul class="collapseList list-unstyled text-center d-flex flex-column">
      <li v-for="item in listItem" :key="item">
        <a href="#" class="d-block text-decoration-none py-2"
          :class="{'collapseListActive': activeOption === item}"
          @click.prevent="changeOption(item, option)">{{item}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { Collapse } from 'bootstrap';

export default {
  data() {
    return {
      collapseList: {},
    };
  },
  emits: ['changeOption'],
  props: ['listItem', 'option', 'activeOption'],
  methods: {
    collapseSwitch() {
      this.collapseList.toggle();
    },
    changeOption(option, optionName) {
      this.$emit('changeOption', option, optionName);
    },
  },
  mounted() {
    this.collapseList = new Collapse(this.$refs.collapse, {
      toggle: false,
    });
  },
};
</script>
