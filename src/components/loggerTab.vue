<template>
  <div class="q-pa-md" v-for="item in items" :key="item">
    <q-expansion-item expand-separator label="Variable Table">
      <q-table
        class="bg-gray"
        dark
        :columns="getCols(item)"
        :rows="item"
      />
    </q-expansion-item>
  </div>
</template>
<script>
export default {
  props: ["items"],
  methods: {
    getTableName: (varObj) => Object.keys(varObj)[0],
    getCols: function (arr) {
      let ar = {};
      arr[0] == undefined ? (ar = {}) : (ar = [...arr][0]);
      return Object.keys(ar).map((i) => {
        return { name: i, label: i, align: "left", field: i, sortable: true };
      });
    },
  },
  mounted() {},
};
</script>
