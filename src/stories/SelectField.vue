<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option;
          open = false;
          $emit('input', option);
        "
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<style scoped>

.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 32px;
  line-height: 32px;
  font-size: 1em;
}

.custom-select .selected {
  background-color: #282828;
  border-radius: 6px;
  border: 1px solid #666666;
  color: #fff;
  padding-left: 5px;
  cursor: pointer;
  user-select: none;
}

.custom-select .selected.open {
  border: 1px solid #646cff;
  border-radius: 6px 6px 0px 0px;
}

.custom-select .selected:after {
  position: absolute;
  content: "";
  top: 16px;
  right: 8px;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: #fff transparent transparent transparent;
}

.custom-select .items {
  color: #fff;
  border-radius: 0px 0px 6px 6px;
  overflow: hidden;
  border-right: 1px solid #646cff;
  border-left: 1px solid #646cff;
  border-bottom: 1px solid #646cff;
  position: absolute;
  background-color: #0a0a0a;
  left: 0;
  right: 0;
  z-index: 1;
}

.custom-select .items div {
  color: #fff;
  padding-left: 8px;
  cursor: pointer;
  user-select: none;
}

.custom-select .items div:hover {
  background-color: #646cff;
}

.selectHide {
  display: none;
}
</style>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0]
        : null,
      open: false,
    };
  },
  mounted() {
    this.$emit("input", this.selected);
  },
};
</script>
