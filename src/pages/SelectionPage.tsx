import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Stack,
  Paper,
  Drawer,
  IconButton,
  Avatar,
  Tabs,
  Tab,
} from "@mui/material";
import { FaCarSide, FaExchangeAlt, FaTaxi } from "react-icons/fa";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useClerk, useUser } from "@clerk/clerk-react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

const SelectionPage: React.FC = () => {
  const { isLoaded, user } = useUser();
  const { signOut } = useClerk(); // Access Clerk methods
  const navigate = useNavigate();

  // Debugging log
  console.log('User Loaded:', isLoaded);
  console.log('User Data:', user);

  // Show a loading spinner while user data is loading
  if (!isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading user data...</p>
      </div>
    );
  }

  // Redirect to sign-in if no user is found
  if (!user) {
    navigate('/user/sign-in');
    return null;
  }

  const [tripType, setTripType] = useState<string | null>(null);
  const [oneWayDateTime, setOneWayDateTime] = useState<Date | null>(null);
  const [roundTripStart, setRoundTripStart] = useState<Date | null>(null);
  const [roundTripEnd, setRoundTripEnd] = useState<Date | null>(null);
  const [rideShareDateTime, setRideShareDateTime] = useState<Date | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false); // State for the side panel
  const [tabIndex, setTabIndex] = useState(0); // State for tabs
  const [photo, setPhoto] = useState(""); // Example photo URL

  type TripDetails = 
    | { tripType: "one-way"; dateTime: string }
    | { tripType: "round-trip"; startDateTime: string; endDateTime: string }
    | { tripType: "ride-sharing"; dateTime: string };

  const handleContinue = () => {
    if (!tripType) {
      alert("Please select a trip type.");
      return;
    }

    let tripDetails: TripDetails;

    if (tripType === "one-way") {
      if (!oneWayDateTime) {
        alert("Please select a date and time.");
        return;
      }
      tripDetails = { tripType: "one-way", dateTime: oneWayDateTime.toISOString() };
    } else if (tripType === "round-trip") {
      if (!roundTripStart || !roundTripEnd) {
        alert("Please select both start and return dates.");
        return;
      }
      tripDetails = {
        tripType: "round-trip",
        startDateTime: roundTripStart.toISOString(),
        endDateTime: roundTripEnd.toISOString(),
      };
    } else if (tripType === "ride-sharing") {
      if (!rideShareDateTime) {
        alert("Please select a date and time.");
        return;
      }
      tripDetails = { tripType: "ride-sharing", dateTime: rideShareDateTime.toISOString() };
    } else {
      // fallback for type safety
      alert("Invalid trip type.");
      return;
    }

    // Navigate to the Dashboard with trip details
    navigate("/dashboard", { state: tripDetails });
  };
  
  const handleSignOut = async () => {
    await signOut();
    navigate("/"); // Redirect to the landing page after signing out
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmDelete) {
      try {
        if (user && typeof user.delete === "function") {
          await user.delete(); // Delete the user from Clerk
          alert("Your account has been deleted.");
          navigate("/"); // Redirect to the home page
        } else {
          throw new Error("User object is not available or delete method is missing.");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("Failed to delete account. Please try again.");
      }
    }
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #ccfbf1, #99f6e4, #5eead4)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2, sm: 4, lg: 6 },
          py: { xs: 4, sm: 6, lg: 8 },
          gap: 4,
        }}
      >
        {/* Profile Button */}
        <IconButton
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
          }}
          onClick={() => setDrawerOpen(true)}
        >
          <Avatar src={photo || user?.profileImageUrl || "https://via.placeholder.com/150"} />
        </IconButton>

        {/* Profile Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box
            sx={{
              width: { xs: "100%", sm: 300 }, // Full width on small screens
              p: 3,
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {/* Close Button for Small Screens */}
            <IconButton
              sx={{
                alignSelf: "flex-end",
                display: { xs: "block", sm: "none" }, // Show only on small screens
              }}
              onClick={() => setDrawerOpen(false)}
            >
              <CloseIcon />
            </IconButton>

            <Tabs
              value={tabIndex}
              onChange={(_, newValue) => setTabIndex(newValue)}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="My Account" />
              <Tab label="My Rides" />
            </Tabs>

            {tabIndex === 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                  My Account
                </Typography>
                <TextField
                  label="Name"
                  value={user?.fullName || ""}
                  fullWidth
                  disabled
                  sx={{ mt: 2 }}
                />
                <TextField
                  label="Email"
                  value={user?.primaryEmailAddress?.emailAddress || ""}
                  fullWidth
                  disabled
                  sx={{ mt: 2 }}
                />
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
                  <Avatar
                    src={photo || user?.profileImageUrl || "https://via.placeholder.com/150"}
                    sx={{ width: 64, height: 64 }}
                  />
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<EditIcon />}
                  >
                    Upload Photo
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handlePhotoChange}
                    />
                  </Button>
                </Stack>
              </Box>
            )}

            {tabIndex === 1 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                  My Rides
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  {/* Example rides */}
                  - Ride 1: One Way, 2023-04-01<br />
                  - Ride 2: Round Trip, 2023-04-05 to 2023-04-07<br />
                  - Ride 3: Ride Sharing, 2023-04-10<br />
                </Typography>
              </Box>
            )}

            <Button
              variant="contained"
              color="error"
              onClick={handleSignOut}
              sx={{ mt: 3 }}
            >
              Sign Out
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={handleDeleteAccount}
              sx={{ mt: 2 }}
            >
              Delete Account
            </Button>
          </Box>
        </Drawer>

        <Typography
          variant="h3"
          fontWeight="bold"
          mb={4}
          color="gray.800"
          textAlign="center"
          sx={{ fontSize: { xs: "1.8rem", sm: "2.5rem", lg: "3rem" } }}
        >
          Welcome Back!<br /><br />
          <span style={{ color: "#0d9488", fontFamily: "Arial, sans-serif"  }}>Where you off to today?</span>
        </Typography>

        {/* Trip Type Selector */}
        <ToggleButtonGroup
          value={tripType}
          exclusive
          onChange={(_, newTripType) => setTripType(newTripType)}
          sx={{
            mb: 6,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <ToggleButton
            value="one-way"
            sx={{
              p: 4,
              width: { xs: "100px", sm: "150px", lg: "200px" },
              height: { xs: "120px", sm: "160px", lg: "220px" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 3,
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
              backgroundColor: "white",
              ":hover": {
                transform: "scale(1.1)",
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
                backgroundColor: "#f0fdfa",
              },
              transition: "all 0.3s ease",
            }}
          >
            <Stack alignItems="center" spacing={1}>
              <FaCarSide size={36} color="teal" />
              <Typography fontSize={{ xs: "1rem", sm: "1.2rem", lg: "1.5rem" }} fontWeight="bold">
                One Way
              </Typography>
            </Stack>
          </ToggleButton>

          <ToggleButton
            value="round-trip"
            sx={{
              p: 4,
              width: { xs: "100px", sm: "150px", lg: "200px" },
              height: { xs: "120px", sm: "160px", lg: "220px" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 3,
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
              backgroundColor: "white",
              ":hover": {
                transform: "scale(1.1)",
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
                backgroundColor: "#f0fdfa",
              },
              transition: "all 0.3s ease",
            }}
          >
            <Stack alignItems="center" spacing={1}>
              <FaExchangeAlt size={36} color="teal" />
              <Typography fontSize={{ xs: "1rem", sm: "1.2rem", lg: "1.5rem" }} fontWeight="bold">
                Round Trip
              </Typography>
            </Stack>
          </ToggleButton>

          <ToggleButton
            value="ride-sharing"
            sx={{
              p: 4,
              width: { xs: "100px", sm: "150px", lg: "200px" },
              height: { xs: "120px", sm: "160px", lg: "220px" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 3,
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
              backgroundColor: "white",
              ":hover": {
                transform: "scale(1.1)",
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
                backgroundColor: "#f0fdfa",
              },
              transition: "all 0.3s ease",
            }}
          >
            <Stack alignItems="center" spacing={1}>
              <FaTaxi size={36} color="teal" />
              <Typography fontSize={{ xs: "1rem", sm: "1.2rem", lg: "1.5rem" }} fontWeight="bold">
                Ride Sharing
              </Typography>
            </Stack>
          </ToggleButton>
        </ToggleButtonGroup>

        {/* Input Fields */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          {tripType === "one-way" && (
            <Paper
              sx={{
                p: 3,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                ":hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
                },
                transition: "all 0.3s ease",
              }}
              elevation={3}
            >
              <DateTimePicker
                label="Select Date & Time"
                value={oneWayDateTime}
                onChange={setOneWayDateTime}
                slotProps={{
                  textField: { fullWidth: true }
                }}
              />
            </Paper>
          )}

          {tripType === "round-trip" && (
            <Paper
              sx={{
                p: 3,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                ":hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
                },
                transition: "all 0.3s ease",
              }}
              elevation={3}
            >
              <Stack spacing={3}>
              <DateTimePicker
                label="Start Date & Time"
                value={roundTripStart}
                onChange={setRoundTripStart}
                slotProps={{
                  textField: { fullWidth: true }
                }}
              />
              <DateTimePicker
                label="Return Date & Time"
                value={roundTripEnd}
                onChange={setRoundTripEnd}
                slotProps={{
                  textField: { fullWidth: true }
                }}
              />
              </Stack>
            </Paper>
          )}

          {tripType === "ride-sharing" && (
            <Paper
              sx={{
                p: 3,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                ":hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
                },
                transition: "all 0.3s ease",
              }}
              elevation={3}
            >
              <DateTimePicker
                label="Select Ride Share Time"
                value={rideShareDateTime}
                onChange={setRideShareDateTime}
                slotProps={{
                  textField: { fullWidth: true }
                }}
              />
            </Paper>
          )}
        </Box>

        {/* Continue Button */}
        <Button
          variant="contained"
          size="large"
          sx={{
            mt: 2,
            px: { xs: 6, sm: 8 },
            py: { xs: 2, sm: 3 },
            borderRadius: 4,
            fontWeight: "bold",
            fontSize: { xs: "1.2rem", sm: "1.5rem" },
            backgroundColor: "teal",
            ":hover": { backgroundColor: "#0d9488" },
          }}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default SelectionPage;