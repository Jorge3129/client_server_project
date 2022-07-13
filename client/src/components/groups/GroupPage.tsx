import {group} from 'console';
import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {IGroup} from '../../models/group';
import groupApi from "../../api/group-api";

const GroupPage = () => {
   const {groupId} = useParams();
   const numberGroupId = parseInt(groupId || '');

   const [group, setGroup] = useState<IGroup>();

   useEffect(() => {
      if (!numberGroupId) return;
      groupApi.getOneGroup(numberGroupId).then(data => {
         if ("id" in data) setGroup(data);
      })
   }, [numberGroupId])

   return (
       <div className=" flex-grow-1">
          {group &&
              <div>
                  <div>{group.name}</div>
                  <p>{group.description}</p>
              </div>
          }
       </div>
   );
};

export default GroupPage;
