import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import ProductPage from "./dashboard/products/page";
import ProductStockPage from "./dashboard/products/stocks/[productId]/page";
import Home from "./Home";

function App() {
  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<Home />} />

      {/* Product List */}
      <Route path="/dashboard/products" element={<ProductPage />} />

      {/* Product Stock Page */}
      <Route
        path="/dashboard/products/stocks/:productId"
        element={<ProductStockPage />}
      />
    </Routes>
  );
}

export default App;
