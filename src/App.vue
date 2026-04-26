<template>
  <main class="min-h-svh bg-[var(--color-cyber-background)] text-[var(--color-text-primary)]">
    <QrGenerator />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import QrGenerator from "./components/QrGenerator.vue";

export default defineComponent({
  name: "App",
  components: { QrGenerator },
});
</script>
