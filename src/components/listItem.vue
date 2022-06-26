<template>
  <q-item
    class="q-my-sm"
    clickable
    v-ripple
    @click="if (goTo != undefined) goTo();"
  >
    <q-item-section avatar>
      <q-icon left :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label> {{ text }} </q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-icon :name="iconRight ?? 'chevron_right'" />
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: ["icon", "text", "goTo", "iconRight"],
};
</script>
