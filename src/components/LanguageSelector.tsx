import i18n from "../i18n";
import "../index.css"; 

export default function LanguageSelector() {
  return (
    <div className="language-selector">
      <select
        className="language-changer"
        onChange={(e) => i18n.changeLanguage(e.target.value)}
      >
        <option className="language-changer-option" value="en">English</option>
        <option className="language-changer-option" value="ar">عربي</option>
      </select>
    </div>
  );
}
