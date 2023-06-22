import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { fetchData } from '../utils/data';
import { Modal, Box, Fade } from '@mui/material';
import { StyledTree } from './TreeLayout';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'scroll'
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export function CustomizedTables() {
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [focussedRow, setFocussedRow] = useState('0');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const startModal = (id) => {
        setFocussedRow(id);
        handleOpen();
    }


    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const rawData = await fetchData();
            setRows(rawData);
            setLoading(false);
        }
        loadData();
    }, []);

    return (
        <div>
            {loading ? (
                <h4>Loading...</h4>) :
                <>
                    <TableContainer component={ Paper }>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">Name</StyledTableCell>
                            <StyledTableCell align="right">Age</StyledTableCell>
                            <StyledTableCell align="left">Occupation</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            rows.map((row) => (
                                <StyledTableRow key={row.ID} onClick={() => startModal(row.ID)}>
                                    <StyledTableCell component="th" scope="row"> {row.Name} </StyledTableCell>
                                    <StyledTableCell align="right">{row.Age}</StyledTableCell>
                                    <StyledTableCell align="left">{row.Occupation}</StyledTableCell>
                                </StyledTableRow>
                            ))
                        }
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Fade in={open}>
                            <Box sx={style}>
                                <StyledTree focus = {focussedRow}></StyledTree>
                            </Box>
                        </Fade>
                    </Modal>
                </>
            }
        </div>
    );
}