import { Avatar, Box, Button, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useMemo, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function UserTable({ filteredPeople }) {
    const theme = useTheme();

    const [pageSize, setPageSize] = useState(5);
    function handleOptionClick() {
        console.log("hello")
    }

    const columns = useMemo(() => [
        { field: "photoUrl", headerName: "Avatar", width: 60, renderCell: params => <Avatar src={params.row.photoUrl} />, sortable: false, filterable: false },

        { field: "id", headerName: "Id", width: 60 },
        { field: "firstName", headerName: "Name", width: 100, },
        { field: "email", headerName: "Email", width: 250 },
        { field: "gender", headerName: "Gender", width: 250 },

        { field: "categories", headerName: "Role", width: 100 },
        {
            field: "options", headerName: "Options", width: 200,

            renderCell: (params) => (
                <>
                    <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => handleOptionClick()}
                        style={{ marginRight: 10 }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
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
                margin:"5%",
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
                

            }}>
            <DataGrid
                columns={columns}
                rows={rows}
                getRowsId={row => row.id}
                rowsPerPageOptions={[5, 10, 20]}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
               
            />
        </Box>
    )
}

export default UserTable