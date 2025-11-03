// /src/stores/useCardStore.ts
import { create } from 'zustand';
import { getCards, deleteCard, updateCardTitle, CardData } from '@/utils/card/CardUtils';

type CardStore = {
  cards: CardData[];
  isSettingsModalOpen: boolean;
  isEditMode: boolean;
  isEditNicknameModalOpen: boolean;
  newNickname: string;
  editingCardId: string | null;

  // actions
  loadCards: () => void;
  toggleSettingsModal: () => void;
  toggleEditMode: () => void;
  handleDeleteCard: (id: string) => void;
  handleSaveNickname: () => void;
  setNewNickname: (name: string) => void;
  openNicknameModal: (id: string, nickname: string) => void;
  closeNicknameModal: () => void;
};

export const useCardStore = create<CardStore>((set, get) => ({
  cards: [],
  isSettingsModalOpen: false,
  isEditMode: false,
  isEditNicknameModalOpen: false,
  newNickname: '',
  editingCardId: null,

  loadCards: () => set({ cards: getCards() }),

  toggleSettingsModal: () =>
    set(state => ({ isSettingsModalOpen: !state.isSettingsModalOpen })),

  toggleEditMode: () =>
    set(state => ({
      isEditMode: !state.isEditMode,
      cards: state.cards.map(card => ({
        ...card,
        isEdit: !state.isEditMode,
      })),
    })),

  handleDeleteCard: id => {
    deleteCard(id);
    set(state => ({
      cards: state.cards.filter(c => c.id !== id),
    }));
  },

  openNicknameModal: (id, nickname) =>
    set({
      isEditNicknameModalOpen: true,
      editingCardId: id,
      newNickname: nickname,
    }),

  closeNicknameModal: () =>
    set({
      isEditNicknameModalOpen: false,
      editingCardId: null,
      newNickname: '',
    }),

  setNewNickname: name => set({ newNickname: name }),

  handleSaveNickname: () => {
    const { editingCardId, newNickname, cards } = get();
    if (editingCardId && newNickname.trim()) {
      updateCardTitle(editingCardId, newNickname.trim());
      set({
        cards: cards.map(c =>
          c.id === editingCardId ? { ...c, title: newNickname.trim() } : c
        ),
      });
    }
    set({
      isEditNicknameModalOpen: false,
      editingCardId: null,
      newNickname: '',
    });
  },
}));
