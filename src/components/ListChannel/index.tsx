import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store/rootSotre";
import ItemChannel from "../ItemChannel";

export default function ListChannel() {
  const listChannel: any = useSelector((state: RootState) => state.channel);
  const userId = localStorage.getItem("userId");

  return (
    <div className="channel-list">
      <div className="channel-list--title">
        <div>List Channel</div>
      </div>
      <div className="channel-list--box">
        {listChannel?.data?.map((item, index) => (
          <ItemChannel
            key={index}
            avartar={item?.profile_image}
            name={item?.room_name}
            desc={item?.roomComment}
          />
        ))}
      </div>
    </div>
  );
}
