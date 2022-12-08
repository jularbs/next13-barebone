import React, { useState, useEffect } from "react";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Input,
  Spinner,
} from "reactstrap";

import { removeInquiry } from "actions/inquiry";
import withNotifications from "hoc/withNotifications";

const DeleteComponent = ({
  isOpen,
  setIsOpen,
  values,
  list,
  setList,
  notify,
}) => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  useEffect(() => {
    if (isOpen) {
      setFormValues({
        ...values,
      });
    } else {
      setFormValues({});
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (deleteConfirmation === "DANGER") {
      removeInquiry("", formValues._id)
        .then((data) => {
          setLoading(false);
          setIsOpen(false);
          //update inquiry list

          const removed = list.filter((item) => item._id !== values._id);
          setList(removed);

          notify({
            type: "success",
            message: "Inquiry removed successfully",
          });
        })
        .catch((e) => {
          setLoading(false);
          notify({
            type: "danger",
            message: "There was a problem removing the inquiry",
          });
        });
    } else {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Modal
        toggle={() => {
          setIsOpen(!isOpen);
          setFormValues({});
        }}
        isOpen={isOpen}
      >
        <ModalHeader>Deleting Inquiry from {values.companyName}</ModalHeader>
        <ModalBody className="py-0">
          <FormGroup className="mb-0">
            <label className="form-control-label" htmlFor="title">
              Confirm delete by typing "DANGER"
            </label>
            <Input
              onChange={(e) => {
                setDeleteConfirmation(e.target.value);
              }}
              type="text"
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-end">
          <div>
            <Button
              outline
              className="px-5"
              onClick={() => {
                setIsOpen(false);
                setFormValues({});
              }}
            >
              Cancel
            </Button>
            <Button color="danger" onClick={handleSubmit} className="px-5">
              {loading && <Spinner color="white" size="sm" className="mr-2" />}
              Delete Station
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default withNotifications(DeleteComponent);
