import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import styles from "../styles/Home.module.css";
import BackendApi from "./api/city";
import Image from "next/image";

export default function Home({ data }) {
  const [viewport, setViewport] = useState({
    latitude: 7.1881,
    longitude: 21.0936,
    width: "100vw",
    height: "100vh",
    zoom: 2,
  });
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <div className={styles.container}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPGL_KEY}
        mapStyle="mapbox://styles/olanetsoft/ckw3qwz2u552414o566mnbj8z"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {data.cities.map((city) => (
          <Marker
            key={city.founded}
            latitude={Number(city.latitude)}
            longitude={Number(city.longitude)}
          >
            <button
              className="marker-btn"
              onClick={(e) => {
                e.preventDefault();
                setSelectedCity(city);
              }}
            >
              <Image
                src="https://www.pngitem.com/pimgs/m/23-235941_location-icon-vector-location-logo-hd-png-transparent.png"
                alt="city icon"
                width={40}
                height={40}
              />
            </button>
          </Marker>
        ))}

        {selectedCity ? (
          <Popup
            latitude={Number(selectedCity.latitude)}
            longitude={Number(selectedCity.longitude)}
            onClose={() => {
              setSelectedCity(null);
            }}
          >
            <div>
              <h4>Name: {selectedCity.name}</h4>
              <h4>Native Name: {selectedCity.name_native}</h4>
              <h4>Country: {selectedCity.country}</h4>
              <h4>Continent: {selectedCity.continent}</h4>
              <h4>Population: {selectedCity.population}</h4>

              <h4>
                Landmarks:{" "}
                {selectedCity.landmarks.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </h4>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await BackendApi.getAllCities();
  return {
    props: {
      data,
    },
  };
}
