import "./App.css";
import AllRoutes from "./Routes/AllRoutes";
import { AuthProvider } from "./Routes/AuthContext";

function App() {
  return (
    <AuthProvider>
      <AllRoutes />
    </AuthProvider>
  );
}

export default App;
