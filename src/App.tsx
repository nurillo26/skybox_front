import { useSelector } from 'react-redux';
import './App.css';

import { RootState } from './redux/store';
import { Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';

function App() {
  const user = useSelector((state: RootState) => state.userSlice.user);

  return (
    <div>
      {user ? (
        <>
          <Home />
        </>
      ) : (
        <Navigate to="/signin" />
      )}

      {/* <Home /> */}
    </div>
  );
}

export default App;
