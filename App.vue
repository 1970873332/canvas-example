<template>
    <div class="examples-layout">
        <!-- 左侧缩略图列表 -->
        <aside class="examples-sidebar">
            <div class="sidebar-header" style="-webkit-app-region: drag">
                <h2>Examples</h2>
            </div>
            <nav class="examples-list">
                <router-link
                    v-for="item in List"
                    :key="item.path"
                    :to="item.path"
                    class="example-item"
                    :class="{ active: currentRoute === item.path }"
                >
                    <div class="example-thumbnail">
                        <span class="example-icon">{{ item.icon }}</span>
                    </div>
                    <span class="example-name">{{ item.name }}</span>
                </router-link>
            </nav>
        </aside>

        <!-- 右侧路由内容 -->
        <main class="examples-content">
            <router-view />
        </main>
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import List from "./router/List";

const route = useRoute();
const currentRoute = computed(() => route.path);
</script>

<style scoped>
.examples-layout {
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
}

.examples-sidebar {
    width: 280px;
    min-width: 280px;
    background: #1a1a2e;
    color: #fff;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #333;
}

.sidebar-header {
    padding: 20px;
    border-bottom: 1px solid #333;
}

.sidebar-header h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
}

.examples-list {
    flex: 1;
    overflow-y: auto;
    padding: 12px;
}

.example-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s;
    text-decoration: none;
    color: #a0a0a0;
    margin-bottom: 4px;
}

.example-item:hover {
    background: #2a2a4a;
    color: #fff;
}

.example-item.active {
    background: #4a4a6a;
    color: #fff;
}

.example-thumbnail {
    width: 48px;
    height: 48px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.example-icon {
    font-size: 20px;
}

.example-name {
    font-size: 14px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.examples-content {
    flex: 1;
    background: #0f0f1a;
    overflow: auto;
    position: relative;
}
</style>
