import { yupResolver } from "@hookform/resolvers/yup";
import { useQuestionnaireStore } from "@store";
import { EFormStep, Questionnaire } from "@types";
import { includes } from "lodash";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FirstForm from "./Form/FirstForm";
import SecondForm from "./Form/SecondForm";
import { SummaryContainer } from "./SummaryContainer";

const firstFormSchema = yup
  .object({
    foundation: yup.string().required(),
    size: yup.number().positive().integer().required(),
    roof: yup.string().required(),
    floor: yup.number().positive().integer().required(),
    plants: yup.array().of(yup.string()),
  })
  .required();

const secondFormSchema = yup
  .object({
    floors: yup
      .array()
      .of(
        yup.object().shape({
          room: yup.number().positive().integer().required(),
        })
      )
      .required(),
  })
  .required();

export const QuestionnaireContainer = () => {
  const [schema, setSchema] = useState<any>(firstFormSchema);
  const form = useForm<Questionnaire>({
    resolver: yupResolver(schema),
  });

  const { formStep, nextFormStep } = useQuestionnaireStore();

  useEffect(() => {
    switch (formStep) {
      case EFormStep.Second:
        setSchema(secondFormSchema);
        break;
      case EFormStep.Three:
        setSchema(null);
        break;

      default:
        setSchema(firstFormSchema);
        break;
    }
  }, [formStep]);

  const onSubmithandler = (data: Questionnaire) => nextFormStep(data);

  const renderedForm = () => {
    switch (formStep) {
      case EFormStep.Second:
        return <SecondForm form={form} onSubmit={onSubmithandler} />;
      case EFormStep.Three:
        return <SummaryContainer />;

      default:
        return (
          <div className="pt-32">
            <FirstForm form={form} onSubmit={onSubmithandler} />
          </div>
        );
    }
  };

  return (
    <div className="p-12 flex flex-col gap-10">
      <div className="flex gap-5 w-full h-5">
        <div className="bg-black w-1/3 rounded-xl border"></div>
        <div
          className={`${
            includes([EFormStep.Second, EFormStep.Three], formStep)
              ? "bg-black"
              : "bg-white"
          } border w-1/3 rounded-xl`}
        ></div>
        <div
          className={`${
            includes([EFormStep.Three], formStep) ? "bg-black" : "bg-white"
          } border w-1/3 rounded-xl`}
        ></div>
      </div>
      {renderedForm()}
    </div>
  );
};
