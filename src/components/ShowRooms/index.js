import * as React from "react";
import { db } from "../../firebase-config";
import { getDocs, collection } from "firebase/firestore";
import ListItems from "./ListItems";

export default function ShowRooms(props) {
  const roomsCollectionRef = collection(db, "rooms");
  let [rooms, setRooms] = React.useState([]);

  React.useEffect(() => {
    const getRooms = async () => {
      let data = await getDocs(roomsCollectionRef);
      data = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setRooms(data);
      console.log("The collection of rooms is here, ", data);
    };
    getRooms();
  }, []);

  return (
    <div>
      {/* <Typography paragraph>List of Rooms: </Typography> */}
      <ListItems rooms={rooms} userData={props.userData} />
    </div>
  );
}
