import React from "react";

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

  microUsbPortWidth: 5.5,
  microUsbPortLength: 7.75,
  microUsbPortHeight: 3,
  microUsbPortXOverhang: 1.5,
  microUsbPortYOffset: 10.6,

  hdmiPortWidth: 12.25,
  hdmiPortLength: 14.75,
  hdmiPortHeight: 6.5,
  hdmiPortXOverhang: 1.75,
  hdmiPortYOffset: 32,

  audioPortWidth: 15,
  audioPortLength: 7.25,
  audioPortHeight: 6,
  audioPortXOverhang: 2.5,
  audioPortYOffset: 53.5,

  sdCardWidth: 12,
  sdCardLength: 17,
  sdCardHeight: 1,
  sdCardYOverhang: 3,
  sdCardXOffset: 28,
  sdCardZOffset: -1,
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

    microUsbPortWidth,
    microUsbPortLength,
    microUsbPortHeight,
    microUsbPortXOverhang,
    microUsbPortYOffset,

    hdmiPortWidth,
    hdmiPortLength,
    hdmiPortHeight,
    hdmiPortXOverhang,
    hdmiPortYOffset,

    audioPortWidth,
    audioPortLength,
    audioPortHeight,
    audioPortXOverhang,
    audioPortYOffset,

    sdCardWidth,
    sdCardLength,
    sdCardHeight,
    sdCardYOverhang,
    sdCardXOffset,
    sdCardZOffset,
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
      <MicroUsbPort
        boardLength={boardLength}
        size={[microUsbPortWidth, microUsbPortLength, microUsbPortHeight]}
        xOverhang={microUsbPortXOverhang}
        yOffset={microUsbPortYOffset}
      />
      <HdmiPort
        boardLength={boardLength}
        size={[hdmiPortWidth, hdmiPortLength, hdmiPortHeight]}
        xOverhang={hdmiPortXOverhang}
        yOffset={hdmiPortYOffset}
      />
      <AudioPort
        boardLength={boardLength}
        size={[audioPortWidth, audioPortLength, audioPortHeight]}
        xOverhang={audioPortXOverhang}
        yOffset={audioPortYOffset}
      />
      <SdCard
        boardSize={[boardWidth, boardLength, boardHeight]}
        size={[sdCardWidth, sdCardLength, sdCardHeight]}
        yOverhang={sdCardYOverhang}
        xOffset={sdCardXOffset}
        zOffset={sdCardZOffset}
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

const MicroUsbPort = ({ boardLength, size, xOverhang, yOffset }) => {
  const [width, _, height] = size;

  return (
    <cuboid
      size={size}
      center={[width / 2 - xOverhang, boardLength - yOffset, height / 2]}
    />
  );
};

const HdmiPort = ({ boardLength, size, xOverhang, yOffset }) => {
  const [width, _, height] = size;

  return (
    <cuboid
      size={size}
      center={[width / 2 - xOverhang, boardLength - yOffset, height / 2]}
    />
  );
};

const AudioPort = ({ boardLength, size, xOverhang, yOffset }) => {
  const [width, _, height] = size;

  return (
    <cuboid
      size={size}
      center={[width / 2 - xOverhang, boardLength - yOffset, height / 2]}
    />
  );
};

const SdCard = ({ boardSize, size, yOverhang, xOffset, zOffset }) => {
  const [width, length, height] = size;
  const [boardWidth, boardLength, boardHeight] = boardSize;

  return (
    <cuboid
      size={size}
      center={[
        xOffset,
        boardLength - length / 2 + yOverhang,
        -boardHeight - height / 2,
      ]}
    />
  );
};

export { RaspberryPi3B, rpi3bDimensions };
export default RaspberryPi3B;
