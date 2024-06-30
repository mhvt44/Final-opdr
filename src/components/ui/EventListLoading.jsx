import React from "react";
import { EventCardSkeleton } from "./EventCardSkeleton";

export const EventListLoading = () => {
  return (
    <>
      <EventCardSkeleton />
      <EventCardSkeleton />
      <EventCardSkeleton />
      <EventCardSkeleton />
      <EventCardSkeleton />
      <EventCardSkeleton />
    </>
  );
};
