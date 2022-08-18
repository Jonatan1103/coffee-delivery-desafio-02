import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { CompletedOrder } from "./pages/CompletedOrder";
import { Home } from "./pages/Home";
import { OrderConfirmedPage } from "./pages/OrderConfirmed";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/order" element={<CompletedOrder/>}/>
        <Route path="/orderConfirmed" element={<OrderConfirmedPage/>}/>
      </Route>
    </Routes>
  )
}