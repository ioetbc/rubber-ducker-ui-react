import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";

import { RubberDuckerContext } from "../context/RubberDuckerContext";
import { db } from "../../firebaseApp";
import { collection, onSnapshot } from "firebase/firestore";

import { HeadingFive, HeadingThree, Paragraph } from "./Fonts";

const Container = styled.div`
  background: red;
  padding: 12px;
  border: white solid 1px;
  margin-top: 4px;

  .list {
    list-style: none;
  }
  .from {
    /* margin-left: 20px; */
  }
  .rating {
    text-align: center;
  }
  .content {
    display: flex;
    gap: 8px;
  }
`;

export const ProfileReviews = () => {
  const { currentCollaborator } = useContext(RubberDuckerContext);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);

  useEffect(() => {
    const fetchReviews = async () => {
      const collectionRef = collection(
        db,
        `reviews/${currentCollaborator.username}/reviews`
      );
      onSnapshot(collectionRef, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          setReviews((reviews) => [...reviews, { ...change.doc.data() }]);
        });
        setRating(
          snapshot.docChanges().reduce((prev, current) => {
            return prev + current.doc.data().rating;
          }, 0) / snapshot.docChanges().length
        );
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
    <Container>
      <HeadingThree text="reviews" />
      {!reviews.length && <p>no reviews yet</p>}
      <HeadingFive className="rating" text={"*".repeat(rating)} />
      <ul className="list">
        {reviews.map((review) => (
          <li>
            <div className="content">
              <Paragraph text={review.message} />
              <Paragraph text={"*".repeat(review.rating)} />
            </div>
            <HeadingFive className="from" text={`from ${review.from}`} />
          </li>
        ))}
      </ul>
    </Container>
  );
};
