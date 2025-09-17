import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import MainPage from "./pages/MainPage.tsx";
import drinkImg from "./assets/drinkImg.jpeg";
import MainLayout from "./layout/MainLayout.tsx";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.setAttribute("dir", i18n.language === "ar" ? "rtl" : "ltr");
  }, [i18n.language]);

  return (
    <Router>
      <MainLayout backgroundImage={drinkImg}>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
