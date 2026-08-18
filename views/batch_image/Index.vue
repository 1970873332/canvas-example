<template>
  <canvas ref="canvasRef" style="width: 100%; height: 100%"></canvas>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import Map from "./Map";

let map: Map | undefined;
const canvasRef = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  const canvas = canvasRef.value;
  if (canvas) {
    map = new Map(canvas);
  }
});

onUnmounted(() => {
  map?.destroy();
});
</script>
