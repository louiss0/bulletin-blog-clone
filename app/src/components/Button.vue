<script lang="ts" setup>
import { useAttrs, computed, HTMLAttributes } from "vue";

interface Props extends HTMLAttributes {
  href?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const { size = "md" } = defineProps<Props>();

const { class: $class, ...restAttrs } = useAttrs();

const classObject = computed(() => ({
  "py-1 px-3": size === "xs",
  "py-2 px-6": size === "sm",
  "py-3 px-9": size === "md",
  "py-4 px-12": size === "lg",
  "py-5 px-14": size === "xl",
}));
</script>

<template>
  <template v-if="href">
    <a :href="href" :class="$class" v-bind="restAttrs">
      <div :class="classObject">
        <slot />
      </div>
    </a>
  </template>
  <template v-else>
    <button :class="$class" v-bind="restAttrs">
      <div :class="classObject">
        <slot />
      </div>
    </button>
  </template>
</template>
