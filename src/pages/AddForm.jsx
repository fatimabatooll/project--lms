import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Paper, Box, Button } from '@mui/material';
import cryptoRandomString from 'crypto-random-string';
const AddForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };
  const handleFirstName = (e) => {
    setFirstName(e.target.value)
    setFullName(e.target.value + ' ' + lastName)
  }
  const handleLastName = (e) => {
    setLastName(e.target.value)
    setFullName(firstName + ' ' + e.target.value)
  }
  const handlePassword = (e) => {
    const userPassword = e.target.value;
    if(userPassword === '') {
      const randomPassword = generateRandomPassword()
      setPassword(randomPassword);
    } else {
      setPassword(userPassword)
    }
  }
  const generateRandomPassword = () => {
    return cryptoRandomString({ length: 10, type: 'alphanumeric' });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if(!password) {
      const randomPassword = generateRandomPassword()
      setPassword(randomPassword)
    }
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);
    console.log('FullName:', fullName);
    console.log('Password:', password);
    console.log('Type:', type);
    console.log('Image:', imageFile);
    console.log('Is Active:', isActive);
  };
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Box sx={{ maxWidth: '700px', p: 4, border: '1px solid #ccc', borderRadius: '4px' }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First name"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={firstName}
                    onChange={handleFirstName}
                    />
                </Grid>
                 <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                    value={lastName}
                 onChange={handleLastName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    autoComplete="email"
                    variant="standard"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="password"
                    name="password"
                    label="Password"
                    fullWidth
                    autoComplete="new-password"
                    variant="standard"
                    value={password}
                    onChange={handlePassword}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
               <TextField
             id="outlined-read-only-input"
             label="Read Only"
             variant="standard"
             value={fullName}
             InputProps={{
             readOnly: true,
             }}
           />
         </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      label="Type"
                    >
                      <MenuItem value="">
                        <em>Type</em>
                      </MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="instructor">Instructor</MenuItem>
                      <MenuItem value="learner">Learner</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Image Title"
                    variant="standard"
                    value={imageFile ? imageFile.name : ''}
                    // Add any additional form fields you need here.
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    type="file"
                    accept="image/*"
                    id="image-upload"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="image-upload">
                    <Button variant="contained" component="span" sx={{backgroundColor:"#61A5C2"}}>
                      Upload Image
                    </Button>
                  </label>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox color="secondary" name="active" value="no" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
                    }
                    label="Active"
                  />
                </Grid>
                <Grid item xs={12}>
                <Button type="submit" variant="contained" component="span"  sx={{backgroundColor:"#61A5C2"}}>
                  Submit
                </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Box>
      </Box>
    </>
  );
};
export default AddForm;