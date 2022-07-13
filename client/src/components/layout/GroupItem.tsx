import {FC} from 'react';
import {IGroup} from "../../models/group";
import {NavLink} from "react-router-dom";
import './styles/GroupItem.css'

interface IProps {
   group: IGroup
}

const GroupItem: FC<IProps> = ({group}) => {
   return (
       <li className="group_list_item">
          <NavLink to={"/groups/" + group.id} className="group_list_item_link">
             <div className="group_list_item_wrapper">
                <span>{group.name}</span>
             </div>
          </NavLink>
       </li>
   );
};

export default GroupItem;
