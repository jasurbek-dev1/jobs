import { AnimatedBackground } from './components/AnimatedBackground';
import { ApplicationForm } from './components/ApplicationForm';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-x-hidden">
      <AnimatedBackground />

      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4">
        <ApplicationForm />
      </div>
    </div>
  );
}

export default App;
