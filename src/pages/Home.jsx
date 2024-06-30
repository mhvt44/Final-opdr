import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { FeaturedEvent } from "../components/ui/FeaturedEvent";
import { NextEvent } from "../components/ui/NextEvent";
import { fetchData } from "../js/fetchers";
import { useLocalStorage } from "primereact/hooks";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

export const loader = async () => {
  const events = await fetchData("events?_sort=startTime&_order=asc");

  if (!events.ok) {
    throw new Error(
      `Failed to load events. ${events.status} ${events.statusText}`
    );
  }

  return { events: await events.json() };
};

export const Home = () => {
  const { events } = useLoaderData();
  const [showWelcome, setShowWelcome] = useLocalStorage(true, "showWelcome");

  const dialogFooterContent = (
    <div>
      <Button
        label="Close"
        icon="pi pi-times"
        onClick={() => setShowWelcome(false)}
        className="mt-2"
        autoFocus
      />
    </div>
  );

  const nextEvent = events.find(
    (event) => new Date() <= new Date(event.startTime) 
  );
  let randomEvent = events[Math.floor(Math.random() * events.length)]; 

  if (randomEvent === nextEvent && events.length > 1) {
    while (randomEvent === nextEvent) {
      randomEvent = events[Math.floor(Math.random() * events.length)];
    }
  }

  return (
    <>
      <div className="flex flex-column align-items-center justify-content-center w-full h-full max-w-1200">
        <div className="flex gap-4 flex-column m-4 w-full">
          <Link className="no-underline" to={`/event/${randomEvent.id}`}>
            <FeaturedEvent
              title={randomEvent.title}
              image={randomEvent.image}
              startTime={randomEvent.startTime}
              location={randomEvent.location}
            />
          </Link>

          {nextEvent ? (
            <Link className="no-underline" to={`/event/${nextEvent.id}`}>
              <NextEvent
                title={nextEvent.title}
                image={nextEvent.image}
                startTime={nextEvent.startTime}
                location={nextEvent.location}
              />
            </Link>
          ) : null}
        </div>
      </div>
    </>
  );
};
