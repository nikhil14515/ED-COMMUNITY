import React from "react";
import { doc, getDoc } from "firebase/firestore";

import { getAuth } from "firebase/auth";



const Message = ({ msg }) => {
  const message = msg?.data()?.message;
  const createdAt = msg?.data()?.createdAt;
  const newDate = new Date(createdAt?.seconds * 1000);
  const auth = getAuth();
  const user = auth.currentUser;
  if (user !== null) {
    const displayName = user.displayName;
  }
  console.log(user);
  const time = newDate
    .toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
    .slice(0, 5);
  // console.log(time);
  return (
    <div className="min-w-[100px] bg-[#ff910058] p-2 rounded-b-xl rounded-tr-xl">
      {message}
      <div className="w-full text-end">
        {"User-"}
        {time} {
            time >= 12 ? "PM" : "AM"
        }
      </div>
    </div>
  );
};

export default Message;
