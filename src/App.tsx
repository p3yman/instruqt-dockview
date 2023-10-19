import { DockView } from "./components/DockView";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
      <div className="grow">
        <DockView />
      </div>
    </div>
  );
}

export default App;
