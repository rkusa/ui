import React, { useState } from "react";
import Container from "../components/Container";
import Dialog from "../components/Dialog";
import SideSheet from "../components/SideSheet";
import { Theme } from "../theme";
import styled from "styled-components";
import { HStack } from "../components/Stack";

export default function Home() {
  return (
    <Container>
      <ColorsSection />
      <DialogSection />
      <SideSheetSection />
    </Container>
  );
}

function DialogSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <h2>Dialog</h2>

      <button type="button" onClick={() => setIsOpen(true)}>
        Open Dialog
      </button>
      {isOpen && (
        <Dialog onDismiss={() => setIsOpen(false)}>
          Dialog content ...
          <button>something to focus</button>
        </Dialog>
      )}
    </>
  );
}

function SideSheetSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <h2>Side Sheet</h2>

      <button type="button" onClick={() => setIsOpen(true)}>
        Open Side Sheet
      </button>
      {isOpen && (
        <SideSheet title="Side Sheet" onDismiss={() => setIsOpen(false)}>
          Side Sheet content ...
          <button>something to focus</button>
        </SideSheet>
      )}
    </>
  );
}

const ColorSquare = styled.div<{ color: keyof Theme["palette"] }>`
  display: block;
  width: 64px;
  height: 64px;
  background-color: ${(props) => props.theme.palette[props.color]};
  margin-right: 8px;
`;

const LightContainer = styled.div`
  padding: 8px;
  background-color: ${(props) => props.theme.palette.white};
`;

const DarkContainer = styled.div`
  padding: 8px;
  background-color: ${(props) => props.theme.palette.black};
`;

function ColorsSection() {
  const colors = (
    <>
      <ColorSquare color="gray100" />
      <ColorSquare color="gray200" />
      <ColorSquare color="gray300" />
      <ColorSquare color="gray400" />
      <ColorSquare color="gray500" />
      <ColorSquare color="gray600" />
      <ColorSquare color="gray700" />
      <ColorSquare color="gray800" />
      <ColorSquare color="gray900" />
    </>
  );
  return (
    <>
      <h2>Color</h2>
      <HStack as={LightContainer} halign="left">
        {colors}
      </HStack>
      <HStack as={DarkContainer} halign="left">
        {colors}
      </HStack>
    </>
  );
}
