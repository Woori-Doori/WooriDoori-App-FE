import React from "react";
import { SettingModal } from "@/components/modal/card/SettingModal";
import ChoiceModal from "@/components/modal/ChoiceModal";
import { useCardStore } from "@/stores/useCardStore";
import { useNavigate } from "react-router-dom";

export const CardModals: React.FC = () => {
  const navigate = useNavigate();
  const {
    isSettingsModalOpen,
    isEditNicknameModalOpen,
    newNickname,
    toggleSettingsModal,
    toggleEditMode,
    handleSaveNickname,
    closeNicknameModal,
    setNewNickname,
  } = useCardStore();

  const addCard = () => {
    navigate('/card/cards');
    toggleSettingsModal();
  };

  const editByCard = () => {
    toggleEditMode();
    toggleSettingsModal();
  };

  return (
    <>
      {/* 설정 모달 */}
      <SettingModal
        isOpen={isSettingsModalOpen}
        onClickAdd={addCard}
        onClickEdit={editByCard}
        onClose={() => {if(isSettingsModalOpen){toggleSettingsModal();}}}
      />

      {/* 별명 편집 모달 */}
      <ChoiceModal
        message="변경할 카드별명을 입력해주세요"
        isOpen={isEditNicknameModalOpen}
        onConfirm={handleSaveNickname}
        onCancel={closeNicknameModal}
        btnTitle="저장"
        btnColor="text-blue-500"
        inputVisible={true}
        inputValue={newNickname}
        onInputChange={setNewNickname}
        inputPlaceholder="카드별명을 입력하세요"
      />
    </>
  );
};
