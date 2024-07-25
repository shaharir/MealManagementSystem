import { RouterProvider } from "react-router-dom";
import router from "./Route/Router";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
