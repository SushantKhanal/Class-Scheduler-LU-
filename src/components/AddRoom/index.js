import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

import { db } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const roomTypes = ["lab", "classroom"];

export default function AddRoom(props) {
  let [building, setBuilding] = useState("");
  let [capacity, setCapacity] = useState("");
  let [name, setName] = useState("");
  let [occupied, setOccupied] = useState(false);
  let [type, setType] = useState("");

  const roomsCollectionRef = collection(db, "rooms");

  //CREATE
  const addRoomInfo = async () => {
    try {
      const result = await addDoc(roomsCollectionRef, {
        building,
        capacity: parseInt(capacity),
        name,
        occupied: false,
        type,
      });
      console.log("result", result);
    } catch (err) {
      console.log(err);
    }
  };

  const resetState = () => {
    setBuilding("");
    setCapacity("");
    setName("");
    setOccupied(false);
    setType("");
  };

  const onSubmit = async () => {
    if (!building || !capacity || !name || occupied !== false || !type) {
      alert("Cannot Submit without complete information!");
      return;
    }
    addRoomInfo();
    resetState();
  };

  return (
    <div>
      <Grid container spacing={3} marginBottom={10}>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="building"
            label="Building Name"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            value={building}
            onChange={(event) => {
              setBuilding(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="capacity"
            label="Room Capacity"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            value={capacity}
            onChange={(event) => {
              setCapacity(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="name"
            label="Room Name"
            fullWidth
            variant="standard"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth style={{ marginTop: 20 }}>
            <InputLabel id="demo-simple-select-label">
              Select Room Type
            </InputLabel>
            <Select
              value={type}
              label="Select Room Type"
              onChange={(event) => {
                setType(event.target.value);
              }}
            >
              {roomTypes.map((type, index) => {
                return (
                  <MenuItem key={index} value={type}>
                    {type}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => onSubmit()}
          style={{ width: "30%", marginTop: "20px" }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
