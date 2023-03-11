/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
import Image from "next/image";
import DefaultImage from "../public/images/default.png";
import { IoMdClose } from "react-icons/io";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Card from "./Card";
import CardLoader from "./CardLoader";
import CharCard from "./ChatCard";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  collection,
  doc,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const [user, loading] = useAuthState(auth);

 //console.log(user);
  const logout = async () => {
    await signOut(auth);
    if (user) {
      await setDoc(
        doc(db, "users", user?.uid),
        {
          name: user?.displayName,
          email: user?.email,
          imageURL: user?.photoURL,
          online: false,
          lastSeen: serverTimestamp(),
        },
        { merge: true }
      );
    }
  };
  const usersRef = collection(db, "users");
  const [userSnapShots, loading2] = useCollection(usersRef);

  const chatsRef = collection(db, "chats");
  const q = query(chatsRef, where("users", "array-contains", user?.email));
  const [chatSnapShots, loading3] = useCollection(chatsRef);
  return (
    <div className="w-[600px] h-screen p-5 bg-[#001F54]">
      <div className="flex items-center w-full space-x-4">
        <div>
          <button className="text-2xl group">
            <FiMenu />
            <div className="w-[300px] rounded-b-xl rounded-tr-xl absolute bg-[#2D3F6E] flex flex-col justify-center items-center p-5 top-16 left-12 backdrop-blur-sm -z-[1] opacity-0 group-focus:z-[2] group-focus:opacity-100">
              <div className=" w-[100px] h-[100px] overflow-hidden border rounded-full ">
                <Image
                  src={user?.photoURL}
                  width={100}
                  height={100}
                  priority={true}
                  quality={100}
                />
              </div>
              <div className="w-full">
                <h1 className="text-xl my-2">{user?.displayName}</h1>
                <div
                  className="text-xl bg-[#fff] text-black w-full py-1 rounded-md hover:bg-[#f00] transition-colors hover:text-white cursor-pointer"
                  onClick={logout}
                >
                  Logout
                </div>
              </div>
            </div>
          </button>
        </div>
        <div className="relative w-full flex items-center">
          <div className="text-xl absolute left-3">
            <AiOutlineSearch />
          </div>
          <input
            type="text"
            className="border bg-transparent w-full px-10 py-2 rounded-full border-[#FFF] outline-none"
            placeholder="Search Here"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
          ></input>
          {search.length > 0 && (
            <button
              className="absolute right-4 text-2xl"
              onClick={() => {
                setSearch("");
              }}
            >
              <IoMdClose />
            </button>
          )}
        </div>
      </div>
      <div
        className={
          search.length > 0
            ? "w-full h-screen overflow-y-auto mt-5 transition-all"
            : "w-full h-0 overflow-y-auto mt-5 transition-all"
        }
      >
        {!loading2 ? (
          userSnapShots?.docs?.map((item) => {
            if (
              item.data().name.toLowerCase().includes(search.toLowerCase()) &&
              item.data().name !== user?.displayName
            ) {
              return (
                <Card
                  key={item.id}
                  name={item.data().name}
                  imageURL={item.data().imageURL}
                  email={item.data().email}
                  id={item.id}
                  setSearch={setSearch}
                />
              );
            }
          })
        ) : (
          <div>
            <CardLoader />
            <CardLoader />
            <CardLoader />
          </div>
        )}
      </div>
      <div className="w-full h-screen overflow-y-auto mt-2 transition-all">
        {!loading3 ? (
          chatSnapShots?.docs?.map((chat) => {
            return <CharCard key={chat.id} chatData={chat} />;
          })
        ) : (
          <div>
            <CardLoader />
            <CardLoader />
            <CardLoader />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
