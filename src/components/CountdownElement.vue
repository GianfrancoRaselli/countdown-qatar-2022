<template>
  <div class="element">
    <div class="element-circle" v-text="num" />
    <div class="element-title" v-text="title" />
  </div>
</template>

<script>
export default {
  name: 'CountdownElementComponent',
  components: {},
  props: {
    num: { type: Number, require: true },
    title: { type: String, require: true },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {},
};
</script>

<style>
.element {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 0.6rem;
}

.element-circle {
  font-size: 4rem;
  background: #3232327b; /* fallback for old browsers */
  background: radial-gradient(circle, #3232327b 0%, #4040407b 50%, #6060609f 100%);
  height: 2.5em;
  width: 2.5em;
  border: 0.4rem solid;
  border-radius: 100%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 10px 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.element-title {
  font-size: 1.55em;
}

@media (max-width: 400px) {
  .element-circle {
    font-size: 3rem;
  }
}

@media (max-width: 300px) {
  .element-circle {
    font-size: 4rem;
  }
}
</style>
