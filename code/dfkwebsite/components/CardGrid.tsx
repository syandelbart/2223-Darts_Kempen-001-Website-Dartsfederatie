import { FunctionComponent } from "react";

const CardGrid : FunctionComponent<any> = ({ children }: any) => {
  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-[95vw] mx-auto">
        {children}
    </div>
    </>
  );
}

export default CardGrid;