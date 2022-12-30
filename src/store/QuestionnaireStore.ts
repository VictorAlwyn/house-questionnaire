import { EFormStep, Questionnaire } from "@types";
import create, { StateCreator } from "zustand";
import { PersistOptions, persist } from "zustand/middleware";

type QuestionnaireState = {
  data: Questionnaire | undefined;
  formStep: EFormStep;
  addAnswer: (answers: Questionnaire) => void;
  nextFormStep: (answers: Questionnaire) => void;
  customWindowType: string[];
  addCustomWindowType: (type: string) => void;
  roomSpecialProperties: string[];
  addRoomSpecialProperties: (prop: string) => void;
  clear: () => void;
};

type QuestionnairePersist = (
  config: StateCreator<QuestionnaireState>,
  options: PersistOptions<QuestionnaireState>
) => StateCreator<QuestionnaireState>;

const initialState = {
  data: undefined,
  formStep: EFormStep.First,
  customWindowType: [],
  roomSpecialProperties: [],
};

export const useQuestionnaireStore = create<QuestionnaireState>(
  (persist as QuestionnairePersist)(
    (set, get) => ({
      data: initialState.data,
      addAnswer: (answers: Questionnaire) =>
        set((state) => ({ data: { ...state?.data, ...answers } })),
      formStep: initialState.formStep,
      nextFormStep: (answers: Questionnaire) => {
        get().addAnswer(answers);

        switch (get().formStep) {
          case EFormStep.First:
            set({ formStep: EFormStep.Second });
            break;
          case EFormStep.Second:
            set({ formStep: EFormStep.Three });
            break;

          default:
            break;
        }
      },
      customWindowType: initialState.customWindowType,
      addCustomWindowType: (type: string) =>
        set((state) => ({
          customWindowType: [...state?.customWindowType, type],
        })),
      roomSpecialProperties: initialState.roomSpecialProperties,
      addRoomSpecialProperties: (prop: string) =>
        set((state) => ({
          roomSpecialProperties: [...state?.roomSpecialProperties, prop],
        })),
      clear: () => set(initialState),
    }),
    { name: "questionnaire-store" }
  )
);
