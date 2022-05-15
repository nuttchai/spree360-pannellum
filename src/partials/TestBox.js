import { Pannellum } from "pannellum-react";
import * as React from "react";
import scenesArray from "./ScenesArray";
import Grid from "@material-ui/core/Grid";
import ImageMapper from "react-image-mapper";

function TestBox(props) {
  const [currentScene, setCurrentScene] = React.useState(0);
  const [imgCoords, setImgCoords] = React.useState(0);
  const [yaw, setYaw] = React.useState(0);
  const [pitch, setPitch] = React.useState(0);
  const [sceneImg, setSceneImg] = React.useState(
    scenesArray[currentScene].scenePanoImg
  );
  const panImage = React.useRef(null);
  const hotspotIcon = (hotSpotDiv) => {
    const image = document.createElement("img");
    image.classList.add("image");
    image.setAttribute("width", "30");
    image.setAttribute("height", "30");
    image.setAttribute(
      "src",
      "https://img.icons8.com/material/4ac144/256/camera.png"
    );
    hotSpotDiv.appendChild(image);
  };
  const map = {
    name: "my-map",
    areas: [
      {
        name: "7",
        shape: "circle",
        coords: [150, 112, 5],
        preFillColor: "red"
      },
      {
        name: "8",
        shape: "circle",
        coords: [147, 138, 5],
        preFillColor: "red"
      },
      {
        name: "9",
        shape: "circle",
        coords: [143, 153, 5],
        preFillColor: "red"
      },
      {
        name: "10",
        shape: "circle",
        coords: [148, 196, 5],
        preFillColor: "red"
      },
      {
        name: "5",
        shape: "circle",
        coords: [163, 145, 5],
        preFillColor: "red"
      },
      {
        name: "6",
        shape: "circle",
        coords: [188, 103, 5],
        preFillColor: "red"
      },
      {
        name: "12",
        shape: "circle",
        coords: [185, 184, 5],
        preFillColor: "red"
      },
      {
        name: "13",
        shape: "circle",
        coords: [189, 223, 5],
        preFillColor: "red"
      },
      {
        name: "0",
        shape: "circle",
        coords: [221, 66, 5],
        preFillColor: "red"
      },
      {
        name: "1",
        shape: "circle",
        coords: [214, 91, 5],
        preFillColor: "red"
      },
      {
        name: "2",
        shape: "circle",
        coords: [222, 114, 5],
        preFillColor: "red"
      },
      {
        name: "3",
        shape: "circle",
        coords: [215, 129, 5],
        preFillColor: "red"
      },
      {
        name: "4",
        shape: "circle",
        coords: [212, 146, 5],
        preFillColor: "red"
      },
      {
        name: "11",
        shape: "circle",
        coords: [212, 171, 5],
        preFillColor: "red"
      },
      {
        name: "15",
        shape: "circle",
        coords: [231, 172, 5],
        preFillColor: "red"
      },
      {
        name: "14",
        shape: "circle",
        coords: [222, 208, 5],
        preFillColor: "red"
      },
      {
        name: "31",
        shape: "circle",
        coords: [270, 80, 5],
        preFillColor: "red"
      },
      {
        name: "30",
        shape: "circle",
        coords: [270, 118, 5],
        preFillColor: "red"
      },
      {
        name: "16",
        shape: "circle",
        coords: [269, 146, 5],
        preFillColor: "red"
      },
      {
        name: "18",
        shape: "circle",
        coords: [257, 172, 5],
        preFillColor: "red"
      },
      {
        name: "17",
        shape: "circle",
        coords: [274, 170, 5],
        preFillColor: "red"
      },
      {
        name: "19",
        shape: "circle",
        coords: [261, 205, 5],
        preFillColor: "red"
      },
      {
        name: "20",
        shape: "circle",
        coords: [304, 189, 5],
        preFillColor: "red"
      },
      {
        name: "21",
        shape: "circle",
        coords: [297, 224, 5],
        preFillColor: "red"
      },
      {
        name: "29",
        shape: "circle",
        coords: [300, 104, 5],
        preFillColor: "red"
      },
      {
        name: "22",
        shape: "circle",
        coords: [305, 147, 5],
        preFillColor: "red"
      },
      {
        name: "28",
        shape: "circle",
        coords: [340, 77, 5],
        preFillColor: "red"
      },
      {
        name: "27",
        shape: "circle",
        coords: [335, 112, 5],
        preFillColor: "red"
      },
      {
        name: "26",
        shape: "circle",
        coords: [340, 151, 5],
        preFillColor: "red"
      },
      {
        name: "23",
        shape: "circle",
        coords: [325, 161, 5],
        preFillColor: "red"
      },
      {
        name: "25",
        shape: "circle",
        coords: [340, 165, 5],
        preFillColor: "red"
      },
      {
        name: "24",
        shape: "circle",
        coords: [335, 201, 5],
        preFillColor: "red"
      }
    ]
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <div>{imgCoords}</div>
          <ImageMapper
            src={
              "https://fridayphotos.s3.eu-central-1.amazonaws.com/dot_map.png"
            }
            width={700}
            onImageClick={(evt) =>
              setImgCoords("" + evt.pageX + ", " + evt.pageY)
            }
            onClick={(area) => setCurrentScene(parseInt(area.name))}
            map={map}
          />
        </Grid>
        <Grid item xs={6}>
          <div>
            {" "}
            pitch: {pitch}, yaw: {yaw}, transition: "0"{" "}
          </div>
          <Pannellum
            ref={panImage}
            width="100%"
            height="500px"
            image={scenesArray[currentScene].scenePanoImg + "?resize=800%2C600"}
            pitch={10}
            yaw={180}
            hfov={110}
            autoLoad
            showZoomCtrl={false}
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
                  handleClick={(evt, name) =>
                    setCurrentScene(hotSpot.transition)
                  }
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
