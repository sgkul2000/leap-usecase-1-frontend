import Card from "components/card";
import InputField from "components/fields/InputField";
import React, { useState, useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  } from "@chakra-ui/modal";
  import { useDisclosure } from "@chakra-ui/hooks";
  import {
    MdOutlineDeleteOutline,
    MdOutlineEdit
  } from "react-icons/md";
  import axios from "axios"
   

const ColumnsTable = (props) => {

  const [currentRow, setCurrentRow] = useState("")
  const [currentRowValues, setCurrentRowValues] = useState({})
  const [locInput, setLocInput] = useState("")
  const [qtyInput, setQtyInput] = useState(0)

  // const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { isOpen: isUpdateOpen, onOpen: onUpdateOpen, onClose: onUpdateClose } = useDisclosure();

  const openDeleteModal = (id) => {
    console.log(id)
    setCurrentRow(id)
    onDeleteOpen()
  }

  const openUpdateModal = async (values) => {
    setCurrentRowValues(values)
    setLocInput(values.name)
    setQtyInput(values.description)
    onUpdateOpen()
  }

  const closeDeleteModal = (id) => {
    setCurrentRow("")
    onDeleteClose()
  }

  const handleLocChange = (e) => {
    setLocInput(e.target.value);
  }
  const handleQtyChange = (e) => {
    setQtyInput(e.target.value);
  }

  const deleteStore = ( ) => {
    axios
    .delete(process.env.REACT_APP_BASE_URL + "/store/" + currentRow)
    .then( () => {
      props.fetchData()
      setCurrentRow("")
      onDeleteClose()
    }).catch(console.error)
  }

  const createStore = () => {
    axios
    .post(process.env.REACT_APP_BASE_URL + "/store/", {
      location: locInput,
      quantity: qtyInput
    })
    .then( () => {
      props.fetchData()
      setLocInput("")
      setQtyInput("")
      onCreateClose()
    }).catch(console.error)
  }

  const updateStore = () => {
    axios
    .put(process.env.REACT_APP_BASE_URL + "/store/" + currentRowValues.id, {
      location: locInput,
      quantity: qtyInput
    })
    .then( () => {
      props.fetchData()
      setLocInput("")
      setQtyInput("")
      onUpdateClose()
    }).catch(console.error)
  }

  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 5;

  return (
    <Card extra={"w-full pb-10 p-4 h-full"}>
      <header className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Store List
        </div>
        <button onClick={onCreateOpen} className="rounded-xl bg-brand-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          Add Store
        </button>
      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                    className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700"
                  >
                    <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                      {column.render("Header")}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data;
                    if (cell.column.Header === "ID") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "LOCATION") {
                      data = (
                        <p className="mr-[10px] text-sm font-semibold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "QUANTITY") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "ACTIONS") {
                      data = (
                        <div>
                          <button onClick={() => {openDeleteModal(cell.row.values.id)}} className="mr-2 rounded-xl border-2 border-red-500 px-5 py-3 text-base font-medium text-red-500 transition duration-200 hover:bg-red-600/5 active:bg-red-700/5 dark:border-red-400 dark:bg-red-400/10 dark:text-white dark:hover:bg-brand-300/10 dark:active:bg-brand-200/10">
                            <MdOutlineDeleteOutline />
                          </button>
                          <button onClick={() => {openUpdateModal(cell.row.values)}} className="rounded-xl border-2 border-brand-500 px-5 py-3 text-base font-medium text-brand-500 transition duration-200 hover:bg-brand-600/5 active:bg-brand-700/5 dark:border-brand-400 dark:bg-brand-400/10 dark:text-white dark:hover:bg-brand-300/10 dark:active:bg-brand-200/10">
                              <MdOutlineEdit />
                          </button>
                        </div>
                      );
                    }
                    return (
                      <td
                        className="pt-[14px] pb-[20px] sm:text-[14px]"
                        {...cell.getCellProps()}
                        key={index}
                      >
                        {data}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* create modal */}
      <Modal isOpen={isCreateOpen} onClose={onCreateClose} className="!z-[1010]">
        <ModalOverlay className="bg-[#000] !opacity-30" />
        <ModalContent className="!z-[1002] !m-auto !w-max min-w-[350px] !max-w-[85%] md:top-[12vh]">
          <ModalBody>
            <Card extra="px-[30px] pt-[35px] pb-[40px] max-w-[450px] flex flex-col !z-[1004]">
              <h1 className="mb-[20px] text-2xl font-bold">Update Store</h1>
              <div className="input-wrapper mb-5">
              <InputField
                onChange={handleLocChange}
                value={locInput}
                label="Location"
                placeholder="Mumbai"
                id="name"
                type="text"
              />
              <InputField
                onChange={handleQtyChange}
                value={qtyInput}
                label="Quantity"
                placeholder="100"
                id="name"
                type="number"
              />
              </div>
              <div className="flex gap-2">
                <button onClick={() => { createStore()}} className="rounded-xl bg-brand-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                  Submit
                </button>
                <button
                  onClick={onCreateClose}
                  className="linear rounded-xl border-2 border-red-500 px-5 py-3 text-base font-medium text-red-500 transition duration-200 hover:bg-red-600/5 active:bg-red-700/5 dark:border-red-400 dark:bg-red-400/10 dark:text-white dark:hover:bg-red-300/10 dark:active:bg-red-200/10"
                >
                  Close
                </button>
              </div>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* delete modal */}
      <Modal isOpen={isDeleteOpen} onClose={closeDeleteModal} className="!z-[1010]">
        <ModalOverlay className="bg-[#000] !opacity-30" />
        <ModalContent className="!z-[1002] !m-auto !w-max min-w-[350px] !max-w-[85%] md:top-[12vh]">
          <ModalBody>
            <Card extra="px-[30px] pt-[35px] pb-[40px] max-w-[450px] flex flex-col !z-[1004]">
              <h1 className="mb-[20px] text-2xl font-bold">Delete Store {currentRow}</h1>
              <p className="mb-[20px]">
                Are you sure you want to delete this store?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {deleteStore()}}
                  className="linear rounded-xl border-2 border-red-500 px-5 py-3 text-base font-medium text-red-500 transition duration-200 hover:bg-red-600/5 active:bg-red-700/5 dark:border-red-400 dark:bg-red-400/10 dark:text-white dark:hover:bg-red-300/10 dark:active:bg-red-200/10"
                >
                  Delete
                </button>
                <button onClick={closeDeleteModal} className="linear text-navy-700 rounded-xl bg-gray-100 px-5 py-3 text-base font-medium transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30">
                  Close
                </button>
              </div>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* update modal */}
      <Modal isOpen={isUpdateOpen} onClose={onUpdateClose} className="!z-[1010]">
        <ModalOverlay className="bg-[#000] !opacity-30" />
        <ModalContent className="!z-[1002] !m-auto !w-max min-w-[350px] !max-w-[85%] md:top-[12vh]">
          <ModalBody>
            <Card extra="px-[30px] pt-[35px] pb-[40px] max-w-[450px] flex flex-col !z-[1004]">
              <h1 className="mb-[20px] text-2xl font-bold">Create Store</h1>
              <div className="input-wrapper mb-5">
              <InputField
                onChange={handleLocChange}
                value={locInput}
                label="Location"
                placeholder="Mumbai"
                id="name"
                type="text"
              />
              <InputField
                onChange={handleQtyChange}
                value={qtyInput}
                label="Quantity"
                placeholder="100"
                id="name"
                type="number"
              />
              </div>
              <div className="flex gap-2">
                <button onClick={() => { updateStore()}} className="rounded-xl bg-brand-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                  Submit
                </button>
                <button
                  onClick={onUpdateClose}
                  className="linear rounded-xl border-2 border-red-500 px-5 py-3 text-base font-medium text-red-500 transition duration-200 hover:bg-red-600/5 active:bg-red-700/5 dark:border-red-400 dark:bg-red-400/10 dark:text-white dark:hover:bg-red-300/10 dark:active:bg-red-200/10"
                >
                  Close
                </button>
              </div>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default ColumnsTable;
