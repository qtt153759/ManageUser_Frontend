import React, { useEffect, useState } from "react";
import { fetchUsers } from "../../Service/userService";
import ReactPaginate from "react-paginate";

const User = () => {
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currenLimit, setCurrentLimit] = useState(4);
    const [totalPages, setTotalPages] = useState(0);
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
    return (
        <div className="container manage-user-container">
            <div className="user-header">
                <div className="title">
                    <h3>Table user</h3>
                </div>
                <div className="actions">
                    <button className="btn btn-success">Refresh</button>
                    <button className="btn btn-primary">Add new user</button>
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
                                            <td className="d-flex gap-2">
                                                <button className="btn btn-warning">
                                                    Edit
                                                </button>
                                                <button className="btn btn-danger">
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
    );
};

export default User;
