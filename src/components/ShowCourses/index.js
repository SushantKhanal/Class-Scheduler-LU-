import * as React from "react";
import { db } from "../../firebase-config";
import { getDocs, collection } from "firebase/firestore";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

export default function ShowCourses(props) {
  const coursesCollectionRef = collection(db, "courses");
  let [courses, setCourses] = React.useState([]);

  React.useEffect(() => {
    const getCourses = async () => {
      let data = await getDocs(coursesCollectionRef);
      data = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setCourses(data);
      console.log("The collection of rooms is here, ", data);
    };
    getCourses();
  }, []);

  return (
    <div>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {courses.map(
          ({ courseName, courseCapacity, level, studentsWilling }, index) => (
            <React.Fragment
              key={`${courseName}(${level})(${studentsWilling})(${courseCapacity})`}
            >
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={`${level} level course:`}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {`${courseName}, Capacity: ${courseCapacity}, Students: ${studentsWilling}`}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          )
        )}
      </List>
    </div>
  );
}
