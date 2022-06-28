import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { db } from "../../../firebase-config";
import { doc, updateDoc, getDocs, collection } from "firebase/firestore";

export default function ListItems(props) {
  //UPDATE
  const [rooms, setRooms] = React.useState(props.rooms);
  const roomsCollectionRef = collection(db, "rooms");

  React.useEffect(() => {
    setRooms(props.rooms);
  }, [props.rooms]);

  const updateRoom = async (id, roomStatus) => {
    try {
      const roomDoc = doc(db, "rooms", id);
      const newFields = { roomStatus: roomStatus };
      if (roomStatus === "APPROVED") newFields["occupied"] = true;
      if (roomStatus === "") newFields["occupied"] = false;
      await updateDoc(roomDoc, newFields);
      getRooms();
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  const getRooms = async () => {
    let data = await getDocs(roomsCollectionRef);
    data = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setRooms(data);
  };

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {rooms.map(
        (
          { building, capacity, name, occupied, type, roomStatus, id },
          index
        ) => (
          <React.Fragment key={`${building} ${name} (${type})`}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={`${name} (${type})`}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {`${building} Building, Capacity: ${capacity}, Occupied: ${occupied}`}
                    </Typography>
                  </React.Fragment>
                }
              />
              {occupied === false &&
                roomStatus === "" &&
                props.userData.userType === "client" && (
                  <Button
                    onClick={async () => {
                      //change room status to "REQUESTED"
                      await updateRoom(id, "REQUESTED");
                    }}
                  >
                    Request Room
                  </Button>
                )}
              {occupied === false &&
                roomStatus === "REQUESTED" &&
                props.userData.userType === "client" && (
                  <Button disabled>Request Pending</Button>
                )}
              {occupied === true && roomStatus === "APPROVED" && (
                <Button disabled>APPROVED</Button>
              )}
              {occupied === true &&
                roomStatus === "APPROVED" &&
                props.userData.userType === "admin" && (
                  <Button
                    onClick={async () => {
                      await updateRoom(id, "");
                    }}
                  >
                    CANCEL
                  </Button>
                )}
              {occupied === false &&
                roomStatus === "REQUESTED" &&
                props.userData.userType === "admin" && (
                  <Button
                    onClick={async () => {
                      await updateRoom(id, "APPROVED");
                    }}
                  >
                    Approve
                  </Button>
                )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        )
      )}
    </List>
  );
}
