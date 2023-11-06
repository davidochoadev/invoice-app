import { useState } from "react";
import { Close, OperatorConfig } from "./Icon/Icons";
import { useMediaQuery } from "react-responsive"
import { HandleOperators } from "./Operators/HandleOperators";

type button = {
  text: string;
  showRegister: React.Dispatch<React.SetStateAction<boolean>>;
};

const AdminButton = (props: button) => {
   const isMobile = useMediaQuery({ maxWidth: 768 });
  return (
    <button
      className="bg-slate-200 flex flex-row gap-2 items-center justify-center py-2 px-2 w-full rounded-lg group hover:bg-blue-500 md:w-min hover:text-white shadow-md"
      onClick={() => props.showRegister((prevState) => !prevState)}
    >
      <OperatorConfig />
      {isMobile ? props.text : ""} 
    </button>
  );
};

type popUp = {
  showRegister: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

const PopUp = (props: popUp) => {
  return (
    <section className="fixed top-0 left-0 w-full h-full">
      <div className="bg-black w-full h-full absolute top-0 left-0 z-0 opacity-70"></div>
      <div className="z-10 w-full h-full absolute top-0 left-0 flex flex-col">
        <div className="flex flex-row justify-end items-center p-4 fixed top-0 right-0 bg-black opacity-50">
          <button
            onClick={() => props.showRegister((prevState) => !prevState)}
            className="text-white"
          >
            <Close />
          </button>
        </div>
        {props.children}
      </div>
    </section>
  );
};

const Panel = () => {
  const [showRegister, setShowRegister] = useState(true);
  return (
    <section className="bg-white border flex flex-col py-2 px-4 md:px-2 w-full md:w-1/12 items-center ">
      <AdminButton text="Gestisci Operatori" showRegister={setShowRegister} />
      {showRegister && 
         <PopUp showRegister={setShowRegister}>
            <HandleOperators />
         </PopUp>
      }
    </section>
  );
};

export { Panel };
