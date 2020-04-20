import React, { useState } from "react";
import Container from "../components/Container";
import Dialog from "../components/Dialog";
import SideSheet from "../components/SideSheet";

export default function Home() {
  return (
    <Container>
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
