import LuhrgoyfModal from '@/components/modals/LuhrgoyfModal.vue'
import CounterModal from '@/components/modals/CounterModal.vue'
import ManaModal from '@/components/modals/ManaModal.vue'
import EmblemModal from '@/components/modals/EmblemModal.vue'

const modals = {
  lhurgoyf: LuhrgoyfModal,
  counter: CounterModal,
  mana: ManaModal,
  emblem: EmblemModal,
} as const

export type ModalId = keyof typeof modals

export type ManaColor = ['white', 'blue', 'black', 'red', 'green', 'colorless']
export type ManaCount = Record<ManaColor[number], { value: number; color: string }>
