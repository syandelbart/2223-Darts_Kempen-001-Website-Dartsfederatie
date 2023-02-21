import { FunctionComponent } from "react";

const Card : FunctionComponent<any> = ({ children }: any) => {
  return (
    <>
    <div className="bg-nav-background py-5 px-10 rounded-lg text-white flex-1">
        {children}
    </div>
    </>
  );
}

export default Card;