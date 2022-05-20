import React from 'react'
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import  Reducer  from './GlobalState/Reducer';
import BeatLoader from "react-spinners/BeatLoader";
const App = React.lazy(() => import("./App"));
const Learning = React.lazy(() => import("./pages/Learning"));
import './index.css'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Reducer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <React.Suspense fallback={<LoadingPage />}>
              <App />
            </React.Suspense>
          } />
          <Route path="learning" element={
            <React.Suspense fallback={<LoadingPage />}><Learning />
            </React.Suspense>
          } />
        </Routes>
      </BrowserRouter>
      </Reducer>
  </React.StrictMode>
)
function LoadingPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <BeatLoader color={"#00000"} loading={true} size={50} />
    </div>
  );
}
