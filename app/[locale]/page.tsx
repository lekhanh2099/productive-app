import { useTranslations } from "next-intl";

export default function Home() {
 const t = useTranslations("AUTH.SIGN_IN");

 return <div>{t("DESC")}</div>;
}
