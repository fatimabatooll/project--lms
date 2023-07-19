import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import { Select, MenuItem, Button } from '@mui/material';
import data from "../data.json";
import UserTable from './UserTable';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '45ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  color: 'inherit',
  '& .MuiSelect-selectMenu': {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    minWidth: '120px',
  },
}));

export default function Searchbar() {
  const [inputVal, setInputVal] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [people, setPeople] = React.useState(data);

  const handleInputChange = (event) => {
    setInputVal(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredPeople = people
    .filter((person) =>
      person.first_name.toLowerCase().includes(inputVal.toLowerCase())
    )
    .filter((person) => selectedCategory === "" || person.categories === selectedCategory);

  const handleAddUser = () => {
    // Implement the logic to add a new user here
    console.log('Add User button clicked');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search by name"
              inputProps={{ 'aria-label': 'search' }}
              value={inputVal}
              onChange={handleInputChange}
            />
          </Search>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
         <InputLabel id="demo-select-small-label">Sort by:</InputLabel>
      <FormControl sx={{ m: 4, minWidth: 170 }} size="small">
      <InputLabel id="demo-select-small-label">Categories</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={selectedCategory}
        label="categories"
        onChange={handleCategoryChange}
      >
              {Array.from(new Set(data.map((person) => person.categories))).map((category) => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
         
            </Select>
        </FormControl>
            
            <Button variant="contained" onClick={handleAddUser}>
              Add User
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <UserTable filteredPeople={filteredPeople}/>
    </Box>
  );
}
