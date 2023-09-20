import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import "../../Resources/Styles/HomePageCSS/Profile.css";
import ProfileImage from "./ProfileImage";
import Grid from "@mui/material/Grid";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

function ProfileCard() {
  return (
    <Card sx={{  p: 1, boxShadow: 4, mt: 5 }}>
      <CardContent>
        <div id="container">
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <div className="product-details">
                <h1>Welcome, Employee Name</h1>
                <span className="hint-star star">
                  <i className="fa fa-star" aria-hidden="true" />
                  <i className="fa fa-star" aria-hidden="true" />
                  <i className="fa fa-star" aria-hidden="true" />
                  <i className="fa fa-star" aria-hidden="true" />
                  <i className="fa fa-star-o" aria-hidden="true" />
                </span>
                <h3>Designation</h3>
                <h3>Software Engineer</h3>
                <h3>abc@wonderbiz.in</h3>
              </div>
            </Grid>
            <Grid item xs={4} >
              <ProfileImage />
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
