<script lang="tsx" setup>
import bulletinLogo from "@/images/613916ed843f957505f63cbc_bulletin-logo.svg";
import { HTMLAttributes, ref, SetupContext, watch } from "vue";
import { useToggle } from "@vueuse/core";
import useInjectImageDimensions from "@/composables/useInjectImageDimensions";

const imageRef = ref<HTMLImageElement | null>(null);

const [showDropDown, toggleDropdown] = useToggle();

useInjectImageDimensions(imageRef, bulletinLogo);

const linkSets = {
  categories: ["finance", "business", "sports", "entertainment", "travel"],
  pages: [
    "landing page 1",
    "landing page 2",
    "landing page 3",
    "landing page 4",
    "about",
    "contact",
  ],
};

type LinkSetsWithActiveState = {
  [prop in keyof typeof linkSets]: {
    values: typeof linkSets[prop];
    active: boolean;
  };
};

const linkSetsWithValueAndAnActiveState = ref(
  Object.entries(linkSets).reduce((carry, [key, value]) => {
    const newObject = {
      [key]: { values: value, active: false },
    };

    return { ...carry, ...newObject };
  }, {} as LinkSetsWithActiveState)
);

function setLinkSetWithTitleAndActiveStateToActiveStateValue(payload: {
  active: boolean;
  linkTitle: keyof typeof linkSets;
}) {
  linkSetsWithValueAndAnActiveState.value[payload.linkTitle].active =
    payload.active;
}
</script>

<template>
  <nav>
    <div class="relative">
      <div class="w-5/6 lg:w-4/6 max-w-screen-xl mx-auto">
        <div data-padding-layer class="py-4 px-2">
          <div data-content-layer class="flex justify-between items-center">
            <a href="/">
              <img alt="Bulletin Logo" class="w-40" ref="imageRef" />
            </a>
            <button data-hamburger-menu @click="toggleDropdown()">
              <HamburgerIcon />
            </button>
          </div>
        </div>
      </div>
      <div class="absolute left-0 right-0">
        <DropDown
          :linkSets="linkSetsWithValueAndAnActiveState"
          v-show="!showDropDown"
          :aria-hidden="showDropDown"
          @link-title-and-active-state-sent="
            setLinkSetWithTitleAndActiveStateToActiveStateValue
          "
        />
      </div>
    </div>
  </nav>
</template>

<script lang="tsx">
import Button from "./Button.vue";

function DownIcon() {
  return (
    <svg class="w-6 h-6 " viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z"
      />
    </svg>
  );
}
type DropDownProps = Omit<HTMLAttributes, "class" | "style"> & {
  linkSets: LinkSetsWithActiveState;
};

const replaceEmptySpaceWithADash = (string: string) =>
  string.replace(/\s+/, "-");

export default {
  components: {
    HamburgerIcon() {
      return (
        <svg class="w-8 h-8 " viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M3 18v-2h18v2Zm0-5v-2h18v2Zm0-5V6h18v2Z"
          />
        </svg>
      );
    },

    MobileDropDown(
      { linkSets, ...restAttrs }: DropDownProps,
      { emit }: SetupContext
    ) {
      const dropDownLinks = Object.entries(linkSets).map(
        ([linkTitle, { values: links, active }]) => (
          <div {...restAttrs} key={linkTitle}>
            <button
              class="px-4 py-2 flex justify-between w-full"
              onClick={() =>
                emit("link-title-and-active-state-sent", {
                  linkTitle,
                  active: !active,
                })
              }
            >
              <span class="text-xl capitalize font-semibold">{linkTitle}</span>
              <DownIcon />
            </button>
            <ul style={{ display: active ? "block" : "none" }}>
              {links.map((link) => (
                <li class="font-medium" key={link}>
                  <a href={`/${replaceEmptySpaceWithADash(link)}`}>
                    <div class="px-6 py-3">{link}</div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )
      );

      return (
        <div class="bg-gray-50 capitalize text-lg">
          <div class="w-4/5 grid mx-auto py-8">
            {dropDownLinks}
            <div class="transtion-opacity duration-200 ease-in hover:opacity-80">
              <Button
                size="lg"
                class="bg-purple-600 w-full text-gray-50 rounded-lg"
              >
                <div class="grid place-items-center">Subscribe</div>
              </Button>
            </div>
          </div>
        </div>
      );
    },
  },
};
</script>
