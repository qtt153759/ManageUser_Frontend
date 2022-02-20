import React, { useEffect, useState, useRef } from "react";
import { fetchUsers, deleteUser } from "../../Service/userService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";
import _ from "lodash";
const User = () => {
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    const userData = useRef({});
    const [totalPages, setTotalPages] = useState(0);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [isShowModalUser, setIsShowModalUser] = useState(false);
    const [action, setAction] = useState("");
    useEffect(() => {
        fetchListUsers();
    }, [currentPage]);
    const fetchListUsers = async () => {
        let response = await fetchUsers(currentPage, currentLimit);
        if (response && response.EC === 0) {
            setTotalPages(response.DT.totalPages);
            setListUsers(response.DT.users);
        }
    };
    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
    };
    const handleDeleteUser = async ({ id, email, username }) => {
        userData.current = { id, email, username };
        setIsShowModalDelete(true);
    };
    const handleEditUser = (item) => {
        userData.current = _.cloneDeep(item);
        setIsShowModalUser(true);
        setAction("EDIT");
    };
    const handleCreateUser = () => {
        setIsShowModalUser(true);
        setAction("CREATE");
    };
    const confirmDeleteUser = async () => {
        let response = await deleteUser(userData.current.id);
        if (response && response.EC === 0) {
            toast.success(response.EM);
            await fetchListUsers();
            setIsShowModalDelete(false);
        } else {
            toast.error(response.EM);
        }
    };
    const handleClose = async () => {
        setIsShowModalUser(false);
        setIsShowModalDelete(false);
        await fetchListUsers();
    };
    const handleRefresh = async () => {
        await fetchListUsers();
    };
    return (
        <>
            <div className="container manage-user-container">
                <div className="user-header d-flex justify-content-between mt-4 mb-5">
                    <div className="title d-flex align-items-center ">
                        <h1>Manage user</h1>
                    </div>
                    <div className="actions d-flex gap-3 p-2">
                        <button
                            className="btn btn-success d-flex align-content-center"
                            onClick={() => handleRefresh()}
                        >
                            <i className="fa fa-refresh pe-2 fs-4" />
                            Refresh
                        </button>
                        <button
                            className="btn btn-primary d-flex align-content-center"
                            onClick={() => handleCreateUser()}
                        >
                            <i className="fa fa-plus-circle pe-2 fs-4" /> Add new user
                        </button>
                    </div>
                </div>
                <div className="user-body">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">ID</th>
                                <th scope="col">Email</th>
                                <th scope="col">Username</th>
                                <th scope="col">Group</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUsers && listUsers.length > 0 ? (
                                <>
                                    {listUsers.map((item, index) => {
                                        return (
                                            <tr key={`row-${index}`}>
                                                <td>
                                                    {(currentPage - 1) * currentLimit + index + 1}
                                                </td>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td>{item.username}</td>
                                                <td>{item.Group ? item.Group.name : ""}</td>
                                                <td className="">
                                                    <button
                                                        className="btn btn-warning mx-2"
                                                        onClick={() => handleEditUser(item)}
                                                    >
                                                        <i className="fa fa-pencil pe-2 fs-6" />
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => handleDeleteUser(item)}
                                                    >
                                                        <i className="fa fa-trash-o pe-2 fs-6" />
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </>
                            ) : (
                                <>
                                    <tr>
                                        <td>Not found users</td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                    {totalPages > 0 && (
                        <div className="user-footer">
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={totalPages}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    )}
                </div>
            </div>
            <ModalDelete
                show={isShowModalDelete}
                userData={userData.current}
                handleClose={handleClose}
                confirmDeleteUser={confirmDeleteUser}
            />
            <ModalUser
                show={isShowModalUser}
                handleClose={handleClose}
                dataModalUser={userData.current}
                action={action}
            />
        </>
    );
};

export default User;
