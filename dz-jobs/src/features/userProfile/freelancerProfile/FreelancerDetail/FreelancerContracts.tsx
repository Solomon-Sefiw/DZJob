import {
    Box,
    Typography,
    Avatar,
    Card,
    Divider,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Rating,
  } from "@mui/material";
  import {
    DzJobUserDto,
    useGetContractsByFreelancerQuery,
  } from "../../../../app/services/DZJobsApi";
  import { SchoolOutlined } from "@mui/icons-material";
  import { ContractStatus } from "../../../../app/services/enums";
  import React from "react";
  
  interface FreelancerProps {
    freelancer: DzJobUserDto;
  }
  
  export const FreelancerContracts: React.FC<FreelancerProps> = ({ freelancer }) => {
    if (!freelancer) return null; // Ensure valid data before rendering
    const pagination= { pageNumber: 0, pageSize: 10 };
  
    const { data: items, isLoading, isError } = useGetContractsByFreelancerQuery({
      pageNumber: pagination.pageNumber + 1,
      pageSize: pagination.pageSize,
      status: ContractStatus.Completed,
      freelancerId: freelancer.id ?? undefined,
    });
  
    if (isLoading) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <CircularProgress size={24} />
        </Box>
      );
    }
  
    if (isError) {
      return (
        <Typography variant="body2" color="error" sx={{ textAlign: "center", my: 2 }}>
          Failed to load Completed Contracts details.
        </Typography>
      );
    }
  
    if (!items?.items?.length) {
      return (
        <Typography variant="body2" color="textSecondary" sx={{ textAlign: "center", my: 2 }}>
          No Completed Contracts available.
        </Typography>
      );
    }
  
    return (
      <Card sx={{ p: 1, borderRadius: "12px", boxShadow: 2, flex: "1 1 400px", maxWidth: 600 }}>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
            <SchoolOutlined />
          </Avatar>
          <Typography variant="h6" fontWeight="bold">
            Completed Contracts
          </Typography>
        </Box>
  
        <Divider sx={{ mb: 2 }} />
  
        {/* Contract List */}
        <List>
          {items.items.map((contract, index) => (
            <ListItem
              key={index}
              sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
            >
              <ListItemText
                primary={contract.jobTitle}
                secondary={`Client: ${contract.employer} | Date: ${contract.endDate}`}
              />
              {/* Rating Component */}
              <Rating
                name={`contract-rating-${index}`}
                value={2.5 } // Assuming the contract has a 'rating' field
                onChange={(newValue) => {
                  console.log(`New rating for contract ${contract.id}:`, newValue);
                  // Implement logic to save/update the rating for the contract
                }}
                precision={0.5}
                size="small"
              />
            </ListItem>
          ))}
        </List>
      </Card>
    );
  };
  