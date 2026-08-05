<template>
    <canvas
        ref="canvasRef"
        style="margin: auto; width: 390px; height: 844px"
    ></canvas>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import Map from "./Map";
import Desktop from "./data/Desktop";

let map: Map | undefined;
const canvasRef = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
    const canvas = canvasRef.value;
    if (canvas) {
        map = new Map(canvas);

        map.analysis(Desktop);
    }
});

onUnmounted(() => {
    map?.destroy();
});
</script>
