import React from 'react'
import Box from '@mui/system/Box';
import Grid from '@mui/system/Unstable_Grid';
import styled from '@mui/system/styled';
import Cards from './Cards';

function LeavesCard() {
    const myArray = [
        {
            type : "casual leave",
            days : 13,
        },
        {
            type : "Earned Leave",
            days : 13,
        },
        {
            type : "Maternity Leave",
            days : 20,
        }
    ];
    console.log(myArray[0]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={4}>
            <Cards  />
          {/* <Item>xs=8</Item> */}
        </Grid>
        <Grid xs={4}>
        <Cards />

          {/* <Item>xs=4</Item> */}
        </Grid>
        <Grid xs={4}>
        <Cards />

          {/* <Item>xs=4</Item> */}
        </Grid>
      </Grid>
    </Box>
  )
}

export default LeavesCard