import Loader from './shared/common/loader';
import RouterComponents from './routes';
import { useEffect, useState } from 'react';
import './styles/global.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setShowLoader(false);
  }, [])

  return (
    showLoader ? <Loader /> : <div className="App">
      <RouterComponents />
      <ToastContainer theme='dark'
        stacked
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
    </div>
  )
}

export default App;
