import LuhrgoyfModal from '@/components/modals/LuhrgoyfModal.vue'
import ManaModal from '@/components/modals/ManaModal.vue'
import EmblemModal from '@/components/modals/EmblemModal.vue'
import DiceModal from '@/components/modals/DiceModal.vue'
import CoinModal from '@/components/modals/CoinModal.vue'

const modals = {
  lhurgoyf: LuhrgoyfModal,
  mana: ManaModal,
  emblem: EmblemModal,
  dice: DiceModal,
  coin: CoinModal,
} as const

export type ModalId = keyof typeof modals

export type ManaColor = ['white', 'blue', 'black', 'red', 'green', 'colorless']
export type ManaCount = Record<ManaColor[number], { value: number; color: string }>

export interface Emblem {
  name: string
  count: number
}
