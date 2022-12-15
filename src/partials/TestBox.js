import { Pannellum } from "pannellum-react";
import * as React from "react";
import scenesArray from "./ScenesArray";
import Grid from "@material-ui/core/Grid";
import ImageMapper from "react-image-mapper";
import { useReducer } from "react";

function setMapColor(map, newArea) {
  map.areas.forEach((area) => {
    area.preFillColor = newArea == area.name ? "green" : "red";
  });
  return map;
}
function TestBox(props) {
  const [currentScene, setCurrentScene] = React.useState(0);
  const [imgCoords, setImgCoords] = React.useState(0);
  const [yaw, setYaw] = React.useState(0);
  const [pitch, setPitch] = React.useState(0);
  const [sceneImg, setSceneImg] = React.useState(
    scenesArray[currentScene].scenePanoImg
  );
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  const [map, setMap] = React.useState({
    name: "my-map",
    areas: [
      {
        name: "0",
        shape: "circle",
        coords: [325, 46, 5],
        preFillColor: "green",
      },
      {
        name: "1",
        shape: "circle",
        coords: [334, 70, 5],
        preFillColor: "red",
      },
      {
        name: "2",
        shape: "circle",
        coords: [300, 46, 5],
        preFillColor: "red",
      },
      {
        name: "3",
        shape: "circle",
        coords: [310, 65, 5],
        preFillColor: "red",
      },
      {
        name: "4",
        shape: "circle",
        coords: [310, 85, 5],
        preFillColor: "red",
      },
      {
        name: "5",
        shape: "circle",
        coords: [334, 96, 5],
        preFillColor: "red",
      },
    ],
  });

  const panImage = React.useRef(null);
  const hotspotIcon = (hotSpotDiv) => {
    const image = document.createElement("img");
    image.classList.add("image");
    image.setAttribute("width", "30");
    image.setAttribute("height", "30");
    image.setAttribute("src", require("../assets/navigator.png"));
    hotSpotDiv.appendChild(image);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={1}>
          <div
            style={{
              position: "absolute",
              bottom: "0",
              left: "0",
            }}
          >
            {/* <div>{imgCoords}</div> */}
            <ImageMapper
              src={
                "https://fridayphotos.s3.eu-central-1.amazonaws.com/dot_map.png"
              }
              width={400}
              onImageClick={(evt) =>
                setImgCoords("" + evt.pageX + ", " + evt.pageY)
              }
              onClick={(area) => {
                setCurrentScene(parseInt(area.name));
                setMap(setMapColor(map, area.name));
              }}
              map={map}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          {/* <div>
            {" "}
            pitch: {pitch}, yaw: {yaw}, transition: "0"{" "}
          </div> */}
          <Pannellum
            ref={panImage}
            width="100%"
            height="86vh"
            image={
              scenesArray[currentScene].scenePanoImg + "?resize=1200%2C600"
            }
            pitch={0}
            yaw={0}
            hfov={135}
            autoLoad
            showZoomCtrl
            onMouseup={(event) => {
              setPitch(
                panImage.current.getViewer().mouseEventToCoords(event)[0]
              );
              setYaw(panImage.current.getViewer().mouseEventToCoords(event)[1]);
            }}
          >
            {scenesArray[currentScene].hotSpotsArr.map((hotSpot) => {
              return (
                <Pannellum.Hotspot
                  type="custom"
                  pitch={hotSpot.pitch}
                  yaw={hotSpot.yaw}
                  tooltip={hotspotIcon}
                  handleClick={(evt, name) => {
                    setCurrentScene(hotSpot.transition);
                    setMap(setMapColor(map, hotSpot.transition));
                    forceUpdate();
                  }}
                  name="image info"
                />
              );
            })}
          </Pannellum>
        </Grid>
      </Grid>
    </>
  );
}

export default TestBox;
