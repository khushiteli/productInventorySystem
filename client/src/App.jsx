import Inventory from "./pages/Inventory";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" reverseOrder={false} />
      <header className="bg-blue-600 text-white p-4 shadow">
        <h1 className="text-xl font-semibold text-center">
          Product Inventory System
        </h1>
      </header>

      <main className="py-6">
        <Inventory />
      </main>
    </div>
  );
}
