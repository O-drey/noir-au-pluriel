<template>
  <div class="w-72">
    <Combobox
      v-model.trim="selectedOption"
      :multiple="multiple"
      :name="formName"
      :defaultValue="defaultValue"
    >
      <div class="relative mt-1">
        <div
          :class="[
            'relative w-full cursor-default overflow-hidden bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-sable-600 sm:text-sm',
            inputStyle ? inputStyle : 'rounded-lg',
          ]"
        >
          <ComboboxLabel class="sr-only">{{ label }}</ComboboxLabel>

          <ComboboxInput
            class="w-full border-none py-4 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 placeholder:text-gray-500"
            :placeholder="placeholder"
            :displayValue="(option: unknown) => (option as Option).name"
            @change="query = $event.target.value"
          />
          <ComboboxButton
            class="absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <svg aria-hidden="true" class="text-gray-500 stroke-2 h-4 w-4">
              <use href="#chevron-bas" />
            </svg>
          </ComboboxButton>
        </div>
        <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="query = ''"
        >
          <ComboboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10"
          >
            <div
              v-if="filteredOption.length === 0 && query !== ''"
              class="relative cursor-default select-none px-4 py-2 text-gray-700"
            >
              Nothing found.
            </div>

            <ComboboxOption
              v-for="(option, index) in filteredOption"
              as="template"
              :key="index"
              :value="option"
              v-slot="{ selected, active }"
            >
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4"
                :class="{
                  'bg-sable-100 ': active,
                  'text-gray-900': !active,
                }"
              >
                <span
                  class="block truncate"
                  :class="{
                    'font-medium text-sable-700': selected,
                    'font-normal': !selected,
                  }"
                >
                  {{ option.name }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3"
                  :class="{ 'text-white': active, 'text-sable-600': !active }"
                >
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import {
  Combobox,
  ComboboxLabel,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue"

export type Option = { value: string; name: string; disabled?: boolean }
type RawData = Option[] | Record<string, string>

const props = defineProps<{
  data: RawData
  modelValue?: Option | Option[]
  label: string
  multiple?: boolean
  formName?: string
  defaultValue?: string | {}
  inputStyle?: string
  placeholder?: string
}>()

const emit = defineEmits<{
  (event: "update:modelValue", value: Option | Option[] | undefined): void
}>()
const normalizedData = computed<Option[]>(() =>
  Array.isArray(props.data)
    ? props.data
    : Object.entries(props.data).map(([value, name]) => ({ value, name })),
)

const selectedOption = computed({
  get: () =>
    props.modelValue ?? (props.multiple ? [] : normalizedData.value[0]),
  set: (value) => emit("update:modelValue", value),
})
// const selectedOption = computed(() => {
//   props.multiple ? [] : normalizedData.value
//   emit('update:modelValue', v)
// })
// const selectedOption = ref(props.multiple ? [] : normalizedData.value)
const query = ref("")
let selected = ref(normalizedData.value)

let filteredOption = computed(() =>
  query.value === ""
    ? normalizedData.value
    : normalizedData.value.filter((option) =>
        option.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.value.toLowerCase().replace(/\s+/g, "")),
      ),
)
</script>
