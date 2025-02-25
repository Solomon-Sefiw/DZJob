import {
  Alert,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { Fragment, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { JobDto, useGetAllJobQuery, useGetJobCountByStatusQuery } from "../../../app/api";
import { Pagination } from "../../../components/Pagination";
export const ApprovedJobRole = () => {
  const [pagination, setPagination] = useState<{
    pageNumber: number;
    pageSize?: number;
  }>({
    pageNumber: 0,
    pageSize: 10,
  });

  const { data: counts, isLoading: isCountsLoading } =
    useGetJobCountByStatusQuery();

  const { data: items, isLoading: isListLoading } = useGetAllJobQuery({
    pageNumber: pagination.pageNumber + 1,
    pageSize: pagination.pageSize,
    status: 1,
  });

  const { searchQuery } = useOutletContext<{ searchQuery: string }>();

  const filteredJobRoles = searchQuery
    ? (items?.items || []).filter((option) =>
        option.title?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : items?.items || [];

  const showNoMatchingAlert = searchQuery && filteredJobRoles.length === 0;

  const [dialogOpened, setDialogOpened] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleDialogClose = () => {
    setDialogOpened(false);
    setSelectedId(null);
  };

  const handleDialogOpen = (id: number) => {
    setDialogOpened(true);
    setSelectedId(id);
  };

  const isLoading = isCountsLoading || isListLoading;

  return (
    <Box>
      {!isLoading && !!counts?.approved && (
        <Paper>
          <TableContainer>
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Job Category
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Job Role Category
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Job Grade</TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(filteredJobRoles || []).map((item: JobDto) => (
                  <Fragment key={item.id}>
                    <TableRow>
                      <TableCell
                        sx={{
                          
                        }}
                      >
                        {item.title}
                      </TableCell>
                      <TableCell
                        sx={{
                  
                        }}
                      >
                        {item.description}
                      </TableCell>
                      <TableCell
                        sx={{

                        }}
                      >
                        {item.jobCategory}
                      </TableCell>
                      <TableCell
                        sx={{
                        
                        }}
                      >
                        {item.jobType}
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 1,
                          }}
                        >

                        </Box>
                      </TableCell>
                    </TableRow>
                  </Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {showNoMatchingAlert && (
        <Alert severity="info" sx={{ m: 2 }}>
          No Approved Job Role found with name {searchQuery}!!
        </Alert>
      )}

      <Pagination
        pageNumber={pagination.pageNumber}
        pageSize={pagination.pageSize}
        onChange={setPagination}
        totalRowsCount={counts?.approved}
        rowsPerPageOptions={[10, 20, 50]}
      />

    </Box>
  );
};
