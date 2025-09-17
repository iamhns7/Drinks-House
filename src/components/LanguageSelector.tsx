import "../index.css";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.setAttribute(
      "dir",
      i18n.language === "ar" ? "rtl" : "ltr"
    );
  }, [i18n.language]);

  return (
    <div className="language-selector">
      <select
        className="language-changer"
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="ar">عربي</option>
      </select>
    </div>
  );
}
