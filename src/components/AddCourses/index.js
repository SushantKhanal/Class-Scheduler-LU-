import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { db } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const levels = ["Phd", "Graduate", "Undergraduate"];

export default function AddCourses(props) {
  let [courseName, setCourseName] = useState("");
  let [courseCapacity, setCourseCapacity] = useState("");
  let [level, setLevel] = useState("");
  let [studentsWilling, setStudentsWilling] = useState("");
  const coursesCollectionRef = collection(db, "courses");

  //CREATE
  const addCourseInfo = async () => {
    try {
      const result = await addDoc(coursesCollectionRef, {
        courseName,
        courseCapacity: parseInt(courseCapacity),
        level,
        studentsWilling: parseInt(studentsWilling),
      });
      console.log("result", result);
    } catch (err) {
      console.log(err);
    }
  };

  const resetState = () => {
    setCourseName("");
    setCourseCapacity("");
    setLevel("");
    setStudentsWilling("");
  };

  const onSubmit = async () => {
    if (!courseName || !courseCapacity || !level || !studentsWilling) {
      alert("Cannot Submit without complete information!");
      return;
    }
    addCourseInfo();
    resetState();
  };

  return (
    <div>
      <Grid container spacing={3} marginBottom={10}>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="courseName"
            label="Course Name"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            value={courseName}
            onChange={(event) => {
              setCourseName(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="courseCapacity"
            label="Course Capacity"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            value={courseCapacity}
            onChange={(event) => {
              setCourseCapacity(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="studentsWilling"
            label="Students Willing"
            fullWidth
            variant="standard"
            value={studentsWilling}
            onChange={(event) => setStudentsWilling(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth style={{ marginTop: 20 }}>
            <InputLabel id="demo-simple-select-label">
              Select Course Level
            </InputLabel>
            <Select
              value={level}
              label="Select Course Level"
              onChange={(event) => {
                setLevel(event.target.value);
              }}
            >
              {levels.map((level, index) => {
                return (
                  <MenuItem key={index} value={level}>
                    {level}
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
