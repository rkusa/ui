import React, { useState } from "react";
import Container from "../components/Container";
import Dialog from "../components/Dialog";

export default function Home() {
  return (
    <Container>
      <DialogSection />
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
