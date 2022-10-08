<script lang="tsx" setup>
import bulletinLogo from "@/images/613916ed843f957505f63cbc_bulletin-logo.svg";
import { HTMLAttributes, ref, SetupContext } from "vue";
import { useToggle, onClickOutside } from "@vueuse/core";

import useInjectImageDimensions from "@/composables/useInjectImageDimensions";
import Button from "./Button.vue";

const imageRef = ref<HTMLImageElement | null>(null);

const [showDropDown, toggleDropdown] = useToggle();

useInjectImageDimensions(imageRef, bulletinLogo);

const mobileDropdownFunctionRef: FunctionRef = (element) => {
  console.log("mobileDropdownFunctionRef");
  onClickOutside(element as HTMLElement, resetAllActiveStatesToFalse);
};
const destopDropdownFunctionRef: FunctionRef = (element) => {
  console.log("destopDropdownFunctionRef");
  onClickOutside(element as HTMLElement, resetAllActiveStatesToFalse);
};
const categories = ["finance", "business", "sports", "entertainment", "travel"];
const pages = [
  "landing page 1",
  "landing page 2",
  "landing page 3",
  "landing page 4",
  "about",
  "contact",
];

const linkSets = {
  categories,
  pages,
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

function resetAllActiveStatesToFalse() {
  Object.values(linkSetsWithValueAndAnActiveState.value).forEach(
    (value) => (value.active = false)
  );
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

            <div class="hidden lg:block">
              <div class="flex gap-4 items-center">
                <DesktopDropDown
                  :linkSets="linkSetsWithValueAndAnActiveState"
                  :desktopDropdownFunctionRef="destopDropdownFunctionRef"
                  @link-title-and-active-state-sent="
                    setLinkSetWithTitleAndActiveStateToActiveStateValue
                  "
                />
                <Button
                  class="text-md text-gray-50 rounded-md bg-purple-700"
                  size="sm"
                >
                  Subscribe
                </Button>
              </div>
            </div>
            <div class="lg:hidden">
              <button data-hamburger-menu @click="toggleDropdown()">
                <HamburgerIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute w-full top-full z-10">
        <div class="lg:hidden">
          <Transition
            enter-from-class="-translate-y-full opacity-0"
            enter-to-class="translate-y-0 opacity-80"
            enter-active-class="transition duration-500 ease-in"
            leave-active-class="transition duration-500 ease-out"
            leave-from-class="translate-y-0 opacity-80"
            leave-to-class="-translate-y-full opacity-0"
          >
            <MobileDropDown
              :linkSets="linkSetsWithValueAndAnActiveState"
              v-show="showDropDown"
              :mobileDropdownFunctionRef="mobileDropdownFunctionRef"
              :aria-hidden="showDropDown"
              @link-title-and-active-state-sent="
                setLinkSetWithTitleAndActiveStateToActiveStateValue
              "
            />
          </Transition>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="tsx">
import { FunctionRef } from "@/types";
import { replaceEmptySpaceWithADash } from "@/utils";

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
  linkSets: {
    [key: string]: {
      values: Array<string>;
      active: boolean;
    };
  };
};

type MobileDropDownProps = DropDownProps & {
  mobileDropdownFunctionRef: FunctionRef;
};

type DesktopDropDownProps = DropDownProps & {
  desktopDropdownFunctionRef: FunctionRef;
};

function sendLinkTitleAndActiveState(
  emit: SetupContext["emit"],
  linkTitle: string,
  active: boolean
) {
  return () =>
    emit("linkTitleAndActiveStateSent", {
      linkTitle,
      active: !active,
    });
}

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

    DesktopDropDown(props: DesktopDropDownProps, { emit }) {
      const { linkSets, desktopDropdownFunctionRef, ...restAttrs } = props;

      const linkSetEntries = Object.entries(linkSets);

      return (
        <div {...restAttrs}>
          <ul class="flex gap-4">
            {linkSetEntries.map(([linkTitle, { values: links, active }]) => {
              return (
                <div class="relative">
                  <li>
                    <button
                      onClick={sendLinkTitleAndActiveState(
                        emit,
                        linkTitle,
                        active
                      )}
                      class="capitalize font-semibold hover:text-gray-500"
                    >
                      <div class="px-4 py-6">
                        <div class="flex gap-2">
                          <span>{linkTitle}</span>
                          <DownIcon />
                        </div>
                      </div>
                    </button>

                    <div
                      class="absolute top-full"
                      ref={desktopDropdownFunctionRef}
                      style={{ display: active ? "block" : "none" }}
                    >
                      <div class="bg-gray-50 rounded-3xl shadow-lg shadow-gray-400">
                        <ul class="">
                          <div class="w-56">
                            {links.map((link) => (
                              <li class="capitalize px-4 py-6 hover:text-gray-500">
                                <a
                                  href={`/${replaceEmptySpaceWithADash(link)}`}
                                  class=" block "
                                >
                                  {link}
                                </a>
                              </li>
                            ))}
                          </div>
                        </ul>
                      </div>
                    </div>
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
      );
    },

    MobileDropDown(props: MobileDropDownProps, { emit }) {
      const { linkSets, mobileDropdownFunctionRef, ...restAttrs } = props;

      const linkSetEntries = Object.entries(linkSets);

      return (
        <div class="bg-gray-50 capitalize text-lg py-8">
          <div class="w-4/5 grid mx-auto gap-12">
            <div ref={mobileDropdownFunctionRef} {...restAttrs}>
              {linkSetEntries.map((linkSetEntry) => {
                const [linkTitle, { values: links, active }] = linkSetEntry;

                return (
                  <div key={linkTitle}>
                    <button
                      class="px-4 py-2 flex justify-between w-full"
                      onClick={sendLinkTitleAndActiveState(
                        emit,
                        linkTitle,
                        active
                      )}
                    >
                      <span class="text-xl capitalize font-semibold">
                        {linkTitle}
                      </span>
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
                );
              })}
            </div>

            <div class="transtion-opacity duration-200 ease-in hover:opacity-80">
              <Button class="bg-purple-600 w-full text-gray-50 rounded-lg">
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
