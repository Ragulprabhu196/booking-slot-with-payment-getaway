// SlotBookingComponent.js
import React, { useState } from 'react';
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Container,
  Box,
} from '@mui/material';
import './App.css';

const SlotBookingComponent = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [amount, setAmount] = useState(100);

 
  const unavailableSlots = [3, 7, 15];

  const handleSlotSelect = (slot) => {
   
    if (!unavailableSlots.includes(slot)) {
      setSelectedSlot(slot);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    console.log('Selected Slot:', selectedSlot);
    console.log('User Details:', formData);

   
    setSelectedSlot(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
    });
    setAmount(100); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount === '') {
      alert('Please enter amount');
    } else {
      var options = {
        key: "rzp_test_6KPpdvUgTN031I",
        key_secret:"CbuknllFLynKGidwClj1H1QR",
        amount: amount *100,
        currency:"INR",
        name:"BOOK YOUR SLOT",
        description:"for testing purpose",
        handler: function(response){
          alert(response.razorpay_payment_id);
        },
        prefill: {
          name:"RAGUL PRABHU S",
          email:"Ragulvyas@gmail.com",
          contact:"9384712638"
        },
        notes:{
          address:"Razorpay Corporate office"
        },
        theme: {
          color:"#3399cc"
        }
      };
      var pay = new window.Razorpay(options);
      pay.open();
    }
  };
  return (
    <Box>
      <Box
        bgcolor="primary.main"
        color="primary.contrastText"
        p={2}
        textAlign="center"
      >
        <Typography variant="h4">EMINEM CONCERT [1.1.2024]</Typography>
      </Box>
      <Container component="main" maxWidth="md">
        <div className="slot-booking">
          <Typography variant="h4" gutterBottom>
            SLOT TO BOOK
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {[...Array(50).keys()].map((slot) => (
              <Grid item key={slot}>
                <Button
                  variant="contained"
                  color={
                    unavailableSlots.includes(slot)
                      ? 'primary' 
                      : selectedSlot === slot
                      ? 'secondary'
                      : 'success' 
                  }
                  onClick={() => handleSlotSelect(slot)}
                >
                  {slot + 1}
                  {unavailableSlots.includes(slot) ? (
                    <Typography variant="caption" className="slot-price">
                      Not Available
                    </Typography>
                  ) : selectedSlot === slot ? (
                    <Typography variant="caption" className="slot-price">
                      Price: {amount} INR
                    </Typography>
                  ) : (
                    <Typography variant="caption" className="slot-price">
                      Available
                    </Typography>
                  )}
                </Button>
              </Grid>
            ))}
          </Grid>

          {selectedSlot !== null && (
            <Paper elevation={3} className="booking-form">
              <Typography variant="h4" gutterBottom>
                Booking Information
              </Typography>
              <form onSubmit={handleBookingSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Name"
                      variant="outlined"
                      fullWidth
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      required
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Phone Number"
                      variant="outlined"
                      fullWidth
                      required
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>

                <Button
                onClick={handleSubmit}
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  className="book-now-button"
                >
                  PAY NOW
                </Button>
              </form>
            </Paper>
          )}
        </div>
      </Container>
    </Box>
  );
};

export default SlotBookingComponent;
