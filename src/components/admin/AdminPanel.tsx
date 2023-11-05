import { useState } from "react";
import { Close } from "./Icon/CloseIcon";

type button = {
  text: string;
  showRegister: React.Dispatch<React.SetStateAction<boolean>>;
};

const AdminButton = (props: button) => {
  return (
    <button
      className="bg-slate"
      onClick={() => props.showRegister((prevState) => !prevState)}
    >
      {props.text}
    </button>
  );
};

type popUp = {
  showRegister: React.Dispatch<React.SetStateAction<boolean>>;
};

const PopUp = (props: popUp) => {
  return (
    <section className="fixed top-0 left-0 w-full h-full">
      <div className="bg-slate-900 w-full h-full absolute top-0 left-0 z-0 opacity-80"></div>
      <div className="z-10 w-full h-full absolute top-0 left-0 flex flex-col">
        <div className="flex flex-row justify-end items-center p-4">
          <button
            onClick={() => props.showRegister((prevState) => !prevState)}
            className="text-white"
          >
            <Close />
          </button>
        </div>
      </div>
    </section>
  );
};
const Panel = () => {
  const [showRegister, setShowRegister] = useState(false);
  return (
    <section className="bg-slate-400 flex flex-col py-2">
      <AdminButton text="Crea Operatore" showRegister={setShowRegister} />
      {showRegister && <PopUp showRegister={setShowRegister}></PopUp>}
    </section>
  );
};

export { Panel };
