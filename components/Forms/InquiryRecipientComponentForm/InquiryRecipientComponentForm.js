//TODOS: edit component
import { Button, Card, CardHeader, CardBody, Table } from "reactstrap";
import { useState, useEffect } from "react";

import { getRecipientList } from "actions/inquiryRecipient";
import dynamic from "next/dynamic";
const AddComponent = dynamic(() => import("./AddComponent"));
const DeleteComponent = dynamic(() => import("./DeleteComponent"));
const UpdateComponent = dynamic(() => import("./UpdateComponent"));
import { useRouter } from "next/router";
const InquiryRecipientComponentForm = () => {
  const router = useRouter();

  const [recipientList, setRecipientList] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteValues, setDeleteValues] = useState({});
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateValues, setUpdateValues] = useState({});
  const [selected, setSelected] = useState("");

  useEffect(() => {
    getRecipientList().then((data) => {
      if (data.data) {
        setRecipientList(data.data);
      }
    });
  }, []);

  useEffect(() => {
    setSelected(router.query.selected);
  }, [router.query.selected]);

  const showRecipientListData = () => {
    return recipientList.map((item, index) => (
      <tr
        key={index}
        style={{
          backgroundColor: selected == item.slug ? "rgba(0,0,0,.1)" : "",
        }}
      >
        <td
          onClick={() => {
            if (selected !== item.slug)
              router.push(
                {
                  pathname: router.route,
                  query: {
                    selected: item.slug,
                  },
                },
                `${router.route}?selected=${item.slug}`,
                { shallow: true }
              );
          }}
          style={{ cursor: "pointer" }}
        >
          <div>{item.name}</div>
          <div>{item.email}</div>
        </td>
        <td>
          <div className="d-flex justify-content-end">
            <Button
              size="sm"
              color="danger"
              outline
              onClick={() => {
                setIsDeleteModalOpen(true);
                setDeleteValues(item);
              }}
            >
              Delete
            </Button>
            <Button
              size="sm"
              color="primary"
              className="px-3"
              onClick={() => {
                setIsUpdateModalOpen(true);
                setUpdateValues(item);
              }}
            >
              Edit
            </Button>
          </div>
        </td>
      </tr>
    ));
  };

  const showRecipientListTable = () => {
    return (
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Recipient</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="list">{showRecipientListData()}</tbody>
      </Table>
    );
  };

  return (
    <>
      <AddComponent
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        values={recipientList}
        setValues={setRecipientList}
      />
      <DeleteComponent
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        values={deleteValues}
        list={recipientList}
        setList={setRecipientList}
      />
      <UpdateComponent
        isOpen={isUpdateModalOpen}
        setIsOpen={setIsUpdateModalOpen}
        values={updateValues}
        list={recipientList}
        setList={setRecipientList}
      />
      <Card>
        <CardHeader className="d-flex align-items-center justify-content-between">
          <h2 className="mb-0 d-inline-block">Recipients</h2>
          <Button
            size="sm"
            color="primary"
            onClick={() => {
              setIsAddModalOpen(true);
            }}
          >
            + Add Recipient Option
          </Button>
        </CardHeader>
        <CardBody className="p-0">{showRecipientListTable()}</CardBody>
      </Card>
    </>
  );
};

export default InquiryRecipientComponentForm;
