import * as React from "react";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
const roomsCollectionRef = collection(db, "rooms");
const coursesCollectionRef = collection(db, "courses");

export default function Reports() {
  const [roomsReport, setRoomsReport] = useState([]);
  const [coursesReport, setCoursesReport] = useState([]);

  useEffect(() => {
    const getRooms = async () => {
      let rooms = await getDocs(roomsCollectionRef);
      rooms = rooms.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setRoomsReport(rooms);
    };
    getRooms();
  }, []);

  useEffect(() => {
    const getCourses = async () => {
      let data = await getDocs(coursesCollectionRef);
      data = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setCoursesReport(data);
    };
    getCourses();
  }, []);

  //courseName, courseCapacity, level, studentsWilling

  const generateCoursesFile = () => {
    var longString = "";
    coursesReport.forEach(function (report, i) {
      longString +=
        report.level +
        " Level Course " +
        ", " +
        "Course Name: " +
        report.courseName +
        ", " +
        "Course Capacity: " +
        report.courseCapacity +
        ", " +
        "Students Willing: " +
        report.studentsWilling +
        ".  \n \n";
    });
    downloadTextFile(longString);
  };

  const generateRoomsReport = () => {
    var longString = "";
    roomsReport.forEach(function (report, i) {
      longString +=
        "Building " +
        "(" +
        report.building +
        "):\n" +
        "Room Name: " +
        report.name +
        ", " +
        "Is Room Occupied: " +
        report.occupied +
        ", " +
        "Room Status: " +
        report.roomStatus +
        ", " +
        "Room Type: " +
        report.type +
        ".  \n \n";
    });
    downloadTextFile(longString);
  };

  const downloadTextFile = (longString) => {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(longString)
    );
    element.setAttribute("download", "Report");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div>
      {roomsReport && (
        <Button
          onClick={() => {
            generateRoomsReport();
          }}
        >
          Download Rooms Report as text file
        </Button>
      )}
      <div>
        {coursesReport && (
          <Button
            onClick={() => {
              generateCoursesFile();
            }}
          >
            Download Courses Report as text file
          </Button>
        )}
      </div>
    </div>
  );
}
