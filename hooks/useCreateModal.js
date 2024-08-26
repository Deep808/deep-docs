import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const useCreateModal = (handleOpen, open, input, setInput, createDocument) => {
  return (
    <Dialog size="sm" open={open} handler={handleOpen}>
      <DialogHeader className="text-md">Create a new document</DialogHeader>
      <DialogBody>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="outline-none w-full text-gray-600 font-semibold"
          placeholder="Enter name of document..."
          onKeyDown={(e) => e.key === "Enter" && createDocument()}
          type="text"
        />
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-4"
        >
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="blue" onClick={createDocument}>
          <span>Create</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default useCreateModal;
