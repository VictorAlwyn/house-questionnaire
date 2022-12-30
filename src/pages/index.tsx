import { QuestionnaireContainer } from "@containers";
import { BasicLayout } from "@layouts";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";

const Page: NextPageWithLayout = () => {
  return <QuestionnaireContainer />;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};

export default Page;
