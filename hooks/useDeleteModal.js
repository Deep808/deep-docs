import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";

const useDeleteModal = (fileName, openModal, handleModal, deleteADoc) => {
  return (
    <Dialog className="z-50" size="sm" open={openModal} handler={handleModal}>
      <DialogHeader className="text-md flex flex-col md:flex-none lg:flex-none">
        Are you sure you want to delete
        <span className="underline text-red-500 ml-2">{fileName}?</span>
      </DialogHeader>
      <DialogFooter>
        <Button
          variant="text"
          color="blue"
          onClick={handleModal}
          className="mr-4"
        >
          <span>Cancel</span>
        </Button>
        <Button onClick={deleteADoc} variant="gradient" color="red">
          <span>Delete</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default useDeleteModal;
