import React from "react";
import path from "path";

import JscadRenderer from "@landaujs/landau";

const rpi3bDimensions = {
  boardWidth: 56,
  boardLength: 85,
  boardHeight: 2, // TODO: ?

  boardCornerRadius: 3,

  // X offset of the center point of the mounting holes
  mountingHolesXOffset: 3.5,
  // Y offset of the two outer mounting holes
  mountingHolesYOffsetOuter: 3.5, // = mountingHolesXOffset
  // Y offset of the two inner mounting holes
  mountingHolesYOffsetInner: 3.5 + 58,
  mountingHolesRadius: 2.75 / 2,

  peripheralsYOverhang: 2.25,

  ethernetWidth: 15.25,
  ethernetLength: 21.5,
  ethernetHeight: 13.5,
  ethernetXOffset: 10.25,

  usbPortWidth: 13,
  usbPortLength: 17.5,
  usbPortHeight: 16,
  usbPort1XOffset: 29,
  usbPort2XOffset: 47,
};

// Based on the drawing for "Raspberry Pi 3B"
// https://www.raspberrypi.org/documentation/hardware/raspberrypi/mechanical/README.md
const RaspberryPi3B = () => {
  const {
    boardWidth,
    boardLength,
    boardHeight,

    boardCornerRadius,

    mountingHolesXOffset,
    mountingHolesYOffsetOuter,
    mountingHolesYOffsetInner,
    mountingHolesRadius,

    peripheralsYOverhang,

    ethernetWidth,
    ethernetLength,
    ethernetHeight,
    ethernetXOffset,

    usbPortWidth,
    usbPortLength,
    usbPortHeight,
    usbPort1XOffset,
    usbPort2XOffset,
  } = rpi3bDimensions;

  return (
    <union>
      <align modes={["min", "min", "max"]}>
        <subtract>
          <align modes={["min", "min", "min"]}>
            <CircuitBoard
              size={[boardWidth, boardLength, boardHeight]}
              cornerRadius={boardCornerRadius}
            />
          </align>
          <MountingHoles
            boardSize={[boardWidth, boardLength, boardHeight]}
            mountingHolesXOffset={mountingHolesXOffset}
            mountingHolesYOffsetOuter={mountingHolesYOffsetOuter}
            mountingHolesYOffsetInner={mountingHolesYOffsetInner}
            mountingHolesRadius={mountingHolesRadius}
          />
        </subtract>
      </align>
      <EthernetPort
        size={[ethernetWidth, ethernetLength, ethernetHeight]}
        xOffset={ethernetXOffset}
        yOverhang={peripheralsYOverhang}
      />
      <UsbPorts
        portSize={[usbPortWidth, usbPortLength, usbPortHeight]}
        port1XOffset={usbPort1XOffset}
        port2XOffset={usbPort2XOffset}
        yOverhang={peripheralsYOverhang}
      />
    </union>
  );
};

const CircuitBoard = ({ size, cornerRadius }) => {
  const [width, length, height] = size;
  return (
    <extrudeLinear height={height}>
      <roundedRectangle size={[width, length]} roundRadius={cornerRadius} />
    </extrudeLinear>
  );
};

const MountingHoles = ({
  mountingHolesRadius,
  mountingHolesXOffset,
  mountingHolesYOffsetOuter,
  mountingHolesYOffsetInner,
  boardSize,
}) => {
  const [boardWidth, boardLength, boardHeight] = boardSize;
  return (
    <union>
      <cylinder
        height={boardHeight * 3}
        center={[
          boardWidth - mountingHolesXOffset,
          boardLength - mountingHolesYOffsetOuter,
          0,
        ]}
        mountingHolesRadius={mountingHolesRadius}
      />
      <cylinder
        height={boardHeight * 3}
        center={[
          mountingHolesXOffset,
          boardLength - mountingHolesYOffsetOuter,
          0,
        ]}
        mountingHolesRadius={mountingHolesRadius}
      />
      <cylinder
        height={boardHeight * 3}
        center={[
          boardWidth - mountingHolesXOffset,
          boardLength - mountingHolesYOffsetInner,
          0,
        ]}
        mountingHolesRadius={mountingHolesRadius}
      />
      <cylinder
        height={boardHeight * 3}
        center={[
          mountingHolesXOffset,
          boardLength - mountingHolesYOffsetInner,
          0,
        ]}
        mountingHolesRadius={mountingHolesRadius}
      />
    </union>
  );
};

const EthernetPort = ({ size, xOffset, yOverhang }) => {
  const [_, length, height] = size;

  return (
    <cuboid
      size={size}
      center={[xOffset, length / 2 - yOverhang, height / 2]}
    />
  );
};

const UsbPorts = ({ portSize, port1XOffset, port2XOffset, yOverhang }) => {
  const [_, length, height] = portSize;

  const UsbPort = ({ xOffset }) => {
    return (
      <cuboid
        size={portSize}
        center={[xOffset, length / 2 - yOverhang, height / 2]}
      />
    );
  };
  return (
    <union>
      <UsbPort xOffset={port1XOffset} />
      <UsbPort xOffset={port2XOffset} />
    </union>
  );
};

export { RaspberryPi3B, rpi3bDimensions };
