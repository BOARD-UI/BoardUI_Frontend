import { Window } from "./Components/Window";
import { RoomSubmenu } from "./Components/RoomSubmenu";

import "./css/CardButton.css";
import "./css/CardInput.css";
import "./css/CardUI.css";
import "./css/Home.css"

export function Home() {
  return (
      <div className="Container">
            <Window />
            <RoomSubmenu/>  
      </div>
  );
}