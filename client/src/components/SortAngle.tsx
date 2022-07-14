import React, {FC} from 'react';

interface IProps {
   show?: boolean,
   up?: boolean
   className?: string
}

const SortAngle: FC<IProps> = ({up, show, className}) => {

   if (!show) return null;

   return (
       <span className={className || ""}>
            {up
                ? <i className="fa-solid fa-angle-up"/>
                : <i className="fa-solid fa-angle-down"/>}
        </span>
   );
};

export default SortAngle;
