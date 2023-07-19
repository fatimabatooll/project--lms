import { Avatar, Box, Button, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useMemo, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './UserTable.css';

function UserTable({ filteredPeople }) {

    const [pageSize, setPageSize] = useState(5);
    function handleOptionClick() {
        console.log("hello")
    }

    const columns = useMemo(() => [
        { field: "photoUrl", headerName: "Avatar", width: 60, renderCell: params => <Avatar src={params.row.photoUrl} />, sortable: false, filterable: false, headerClassName: "bold-header" },

        { field: "id", headerName: "Id", width: 60, headerClassName: "bold-header" },
        { field: "firstName", headerName: "Name", width: 100, headerClassName: "bold-header" },
        { field: "email", headerName: "Email", width: 250, headerClassName: "bold-header" },
        { field: "gender", headerName: "Gender", width: 250, headerClassName: "bold-header" },

        { field: "categories", headerName: "Role", width: 100, headerClassName: "bold-header" },
        {
            field: "options", headerName: "Options", width: 200, headerClassName: "bold-header",

            renderCell: (params) => (
                <>
                    <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => handleOptionClick()}
                        style={{ marginRight: 10, color: "#468FAF", borderColor: "#468FAF" }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        style={{ color: "#2A6F97", borderColor: "#2A6F97" }}
                        onClick={() => handleOptionClick()}
                    >
                        Delete
                    </Button>
                </>
            ),
        }
    ], [])
    const rows = filteredPeople.map((person) => ({
        photoUrl: person.photoUrl,
        id: person.id,
        firstName: person.first_name,
        email: person.email,
        gender: person.gender,
        categories: person.categories,
    }));
    return (
        <Box
            sx={{
                height: 600,
                // width: 900,
                // width: "100%",
                margin: "5%",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'


            }}>
            <DataGrid
                columns={columns}
                rows={rows}
                getRowsId={row => row.id}
                rowsPerPageOptions={[5, 10, 20]}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                sx={{
                    border: 'none',
                    '.MuiDataGrid-columnHeader:focus': {
                        outline: 'none',
                    },
                    '.MuiDataGrid-cell:focus': {
                        outline: 'none',
                    },
                }}
            />
        </Box>
    )
}

export default UserTable