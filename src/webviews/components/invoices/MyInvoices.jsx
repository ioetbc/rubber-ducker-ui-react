import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { db } from "../../../firebaseApp";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

import { RubberDuckerContext } from "../../context/RubberDuckerContext";
import { getMessengerDocName } from "../../utils/db/getMessengerDocName";

import { InvoiceTile } from "./InvoiceTile";
import { HeadingTwo } from "../misc/Fonts";

const Container = styled.div`
  width: 100%;
  padding: 12px;
`;

export const MyInvoices = () => {
  const { currentUser } = useContext(RubberDuckerContext);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      console.log("currentUser.hasInvoiced", currentUser.hasInvoiced);
      currentUser.hasInvoiced.forEach(async (githubId) => {
        //   const docName = getMessengerDocName([currentUser.githubId, githubId]);
        const reference = collection(
          db,
          `invoices/${currentUser.githubId}/${githubId}`
        );
        const q = query(reference, orderBy("createdAt", "desc"));

        const snapshot = await getDocs(q);
        console.log("snapshot", snapshot);
        snapshot.forEach((doc) => {
          setInvoices((current) => [doc.data(), ...current]);
        });
      });
    };

    try {
      fetchInvoices();
    } catch (error) {
      console.log("Error getting the messages", error);
    }
  }, []);

  console.log("invoices", invoices);

  return (
    <Container>
      <HeadingTwo text="invoices" />
      {invoices.map((invoice) => (
        <InvoiceTile
          amount={invoice.amount}
          status={invoice.status}
          recipient={invoice.to}
          minutes={invoice.minutes}
          profileURL={invoice.user.profileURL}
        />
      ))}
    </Container>
  );
};
