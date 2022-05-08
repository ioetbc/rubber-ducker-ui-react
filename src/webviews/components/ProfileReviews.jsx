import React, { useEffect, useContext, useState } from "react";
import { RubberDuckerContext } from "../context/RubberDuckerContext";
import { db } from "../../firebaseApp";
import { collection, onSnapshot } from "firebase/firestore";

export const ProfileReviews = () => {
  const { currentCollaborator } = useContext(RubberDuckerContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const collectionRef = collection(
        db,
        `reviews/${currentCollaborator.username}/messages`
      );
      onSnapshot(collectionRef, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          setReviews((reviews) => [...reviews, { ...change.doc.data() }]);
        });
      });
    };

    try {
      setReviews([]);
      fetchReviews();
    } catch (error) {
      console.log("Error getting the reviews", error);
    }
  }, [currentCollaborator.username]);

  return (
    <ul>
      {reviews.map((review) => (
        <li>{review.message}</li>
      ))}
    </ul>
  );
};
