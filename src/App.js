import './App.css';
import Dashboard from './components/dashboard';
import ToastWrapper from './components/toast';
function App() {
  return (
    <div className="bg-[#d6d7da] h-[100vh] flex items-center justify-center">
      <ToastWrapper/>
      <Dashboard />
    </div>
  );
}

export default App;



