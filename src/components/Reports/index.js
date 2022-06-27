import * as React from "react";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
const userCollectionRef = collection(db, "deliveryInfo");

export default function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      let data = await getDocs(userCollectionRef);
      data = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setReports(data);
    };
    getUsers();
  }, []);

  const generateTextFile = () => {
    var longString = "";
    reports.forEach(function (report, i) {
      longString +=
        "Parcel " +
        (i + 1) +
        "(" +
        report.deliveryStatus +
        "):\n" +
        "Current Address: " +
        report.currentAddress +
        ", " +
        "Receiver Status: " +
        report.receiverAddress +
        ", " +
        "Receiver Name: " +
        report.receiverName +
        ", " +
        "Receiver Zip: " +
        report.receiverZip +
        ", " +
        "Sender Address: " +
        report.senderAddress +
        ", " +
        "Sender Name: " +
        report.senderName +
        ", " +
        "Sender Zip: " +
        report.senderZip +
        ", " +
        "Tracking Number: " +
        report.trackingNumber +
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
    element.setAttribute("download", "reports");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div>
      {reports && (
        <Button
          onClick={() => {
            // generateTextFile();
          }}
        >
          Download Text File
        </Button>
      )}
    </div>
  );
}
