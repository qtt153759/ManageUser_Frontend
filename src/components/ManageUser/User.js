import React, { useEffect, useState, useRef } from "react";
import { fetchUsers, deleteUser } from "../../Service/userService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
const User = () => {
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currenLimit, setCurrentLimit] = useState(3);
    const userDelete = useRef({});
    const [totalPages, setTotalPages] = useState(0);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    useEffect(() => {
        fetchListUsers();
    }, [currentPage]);
    const fetchListUsers = async () => {
        let response = await fetchUsers(currentPage, currenLimit);
        if (response && response.data && response.data.EC === 0) {
            setTotalPages(response.data.DT.totalPages);
            setListUsers(response.data.DT.users);
        }
    };
    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
    };
    const handleDeleteUser = async ({ id, email, username }) => {
        userDelete.current = { id, email, username };
        console.log(userDelete.current);
        setIsShowModalDelete(true);
    };
    const confirmDeleteUser = async () => {
        let response = await deleteUser(userDelete.current.id);
        if (response && response.data.EC === 0) {
            toast.success(response.data.EM);
            await fetchListUsers();
            setIsShowModalDelete(false);
        } else {
            toast.error(response.data.EM);
        }
    };
    const handleClose = () => {
        setIsShowModalDelete(false);
    };
    return (
        <>
            <div className="container manage-user-container">
                <div className="user-header">
                    <div className="title">
                        <h3>Table user</h3>
                    </div>
                    <div className="actions">
                        <button className="btn btn-success">Refresh</button>
                        <button className="btn btn-primary">
                            Add new user
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
                                                <td>{index + 1}</td>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td>{item.username}</td>
                                                <td>
                                                    {item.Group
                                                        ? item.Group.name
                                                        : ""}
                                                </td>
                                                <td className="">
                                                    <button className="btn btn-warning mx-2">
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() =>
                                                            handleDeleteUser(
                                                                item
                                                            )
                                                        }
                                                    >
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
                userData={userDelete.current}
                handleClose={handleClose}
                confirmDeleteUser={confirmDeleteUser}
            />
        </>
    );
};

export default User;
