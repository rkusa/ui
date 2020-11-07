import React, { useState } from "react";
import Container from "../components/Container";
import Dialog from "../components/Dialog";
import SideSheet from "../components/SideSheet";
import { Theme } from "../theme";
import styled from "@emotion/styled";
import { HStack } from "../components/Stack";
import Button from "../components/Button";
import { Save } from "react-feather";

export default function Home() {
  return (
    <Container>
      <ColorsSection />
      <DialogSection />
      <SideSheetSection />
      <ButtonSection />
    </Container>
  );
}

function DialogSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <h2>Dialog</h2>

      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
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

      <Button onClick={() => setIsOpen(true)}>Open Side Sheet</Button>
      {isOpen && (
        <SideSheet title="Side Sheet" onDismiss={() => setIsOpen(false)}>
          Side Sheet content ...
          <Button>something to focus</Button>
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

function ButtonSection() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <h2>Button</h2>

      <HStack halign="left" valign="middle" mb>
        <Button>save</Button>
        <Button intent="primary">save</Button>
        <Button intent="danger">save</Button>
        <Button intent="success">save</Button>

        <Button naked>save</Button>
        <Button naked intent="primary">
          save
        </Button>
        <Button naked intent="danger">
          save
        </Button>
        <Button naked intent="success">
          save
        </Button>
      </HStack>

      <HStack halign="left" valign="middle" mb>
        <Button disabled>save</Button>
        <Button disabled intent="primary">
          save
        </Button>
        <Button disabled intent="danger">
          save
        </Button>
        <Button disabled intent="success">
          save
        </Button>

        <Button disabled naked>
          save
        </Button>
        <Button disabled naked intent="primary">
          save
        </Button>
        <Button disabled naked intent="danger">
          save
        </Button>
        <Button disabled naked intent="success">
          save
        </Button>
      </HStack>

      <HStack halign="left" valign="middle" mb>
        <Button isLoading>save</Button>
        <Button isLoading intent="primary">
          save
        </Button>
        <Button isLoading intent="danger">
          save
        </Button>
        <Button isLoading intent="success">
          save
        </Button>

        <Button isLoading naked>
          save
        </Button>
        <Button isLoading naked intent="primary">
          save
        </Button>
        <Button isLoading naked intent="danger">
          save
        </Button>
        <Button isLoading naked intent="success">
          save
        </Button>
      </HStack>

      <HStack halign="left" valign="middle" mb>
        <Button icon={<Save />}>save</Button>
        <Button icon={<Save />} intent="primary">
          save
        </Button>
        <Button icon={<Save />} intent="danger">
          save
        </Button>
        <Button icon={<Save />} intent="success">
          save
        </Button>

        <Button icon={<Save />} naked>
          save
        </Button>
        <Button icon={<Save />} naked intent="primary">
          save
        </Button>
        <Button icon={<Save />} naked intent="danger">
          save
        </Button>
        <Button icon={<Save />} naked intent="success">
          save
        </Button>
      </HStack>

      <HStack halign="left" valign="middle" mb>
        <Button icon={<Save />} />
        <Button icon={<Save />} intent="primary" />
        <Button icon={<Save />} intent="danger" />
        <Button icon={<Save />} intent="success" />

        <Button icon={<Save />} naked />
        <Button icon={<Save />} naked intent="primary" />
        <Button icon={<Save />} naked intent="danger" />
        <Button icon={<Save />} naked intent="success" />
      </HStack>

      <HStack halign="left" valign="middle" mb>
        <Button icon={<Save />} isLoading />
        <Button icon={<Save />} isLoading intent="primary" />
        <Button icon={<Save />} isLoading intent="danger" />
        <Button icon={<Save />} isLoading intent="success" />

        <Button icon={<Save />} isLoading naked />
        <Button icon={<Save />} isLoading naked intent="primary" />
        <Button icon={<Save />} isLoading naked intent="danger" />
        <Button icon={<Save />} isLoading naked intent="success" />
      </HStack>

      <HStack halign="left" valign="middle" mb>
        <Button isLoading={isLoading} onClick={() => setIsLoading((l) => !l)}>
          loading toggle
        </Button>
        <Button
          icon={<Save />}
          isLoading={isLoading}
          onClick={() => setIsLoading((l) => !l)}
        >
          loading toggle
        </Button>
      </HStack>
    </>
  );
}
