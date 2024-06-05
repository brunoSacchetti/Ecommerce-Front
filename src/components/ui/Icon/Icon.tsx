import { FC } from "react";

interface IconCustom {
  icon: string;
  fnOnclick?: () => void;
}

export const IconCustom: FC<IconCustom> = ({ icon, fnOnclick }) => {
  return (
    <span
      onClick={() => {
        fnOnclick && fnOnclick();
      }}
      className="material-symbols-outlined"
    >
      {icon}
    </span>
  );
};
