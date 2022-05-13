import React from 'react'
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
const App = React.lazy(() => import("./App"));
const Login = React.lazy(() => import("./pages/Login"));
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <React.Suspense fallback={<LoadingPage />}>
      <App />
      </React.Suspense>
      } />
      <Route path="Login" element={
      <React.Suspense fallback={<LoadingPage />}><Login />
      </React.Suspense>
    } />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
function LoadingPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <BeatLoader color={"#00000"} loading={true} size={50} />
    </div>
  );
}
