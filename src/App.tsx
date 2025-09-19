import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage.tsx";
import drinkImg from "./assets/drinkImg.jpeg";
import MainLayout from "./layout/MainLayout.tsx";

function App() {
 
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
