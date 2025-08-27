 import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/mainLayout.tsx";
import drinkImg from "./assets/drinkImg.jpeg";
import CustomerFormPage from "./pages/CustomerFormPage.tsx";
import CategoryPage from "./pages/CategoryPage.tsx";

function App() {
  return (
    <Router>
      <MainLayout backgroundImage={drinkImg}>
        <Routes>
          <Route path="/" element={<CustomerFormPage />} />
          <Route path="/categories" element={<CategoryPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
 
