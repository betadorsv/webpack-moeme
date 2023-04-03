import React from "react";

interface ItemChannelProps {
  avartar?: String;
  name?: String;
  desc?: String;
}

function ItemChannel({ avartar, name, desc }: ItemChannelProps) {
  return (
    <div className="channel-item">
      <div className="channel-item--thumnail">
        <img
          height={100}
          src="https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/news/2023/03_29_revuelto/s1.jpg"
        />
      </div>
      <div className="channel-item--info">
        <h5>{name?.length > 0 ? name : "No Name"}</h5>
        <p>{desc?.length > 0 ? desc : "No Desciption"}</p>
      </div>
    </div>
  );
}

export default ItemChannel;
