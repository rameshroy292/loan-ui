import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { connect } from 'react-redux';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const columns = [
  { id: 'name', label: ' Name'},
  { id: 'email', label: 'Email Id' },
  { id: 'mobileno', label: 'Mobile No'},
  { id: 'address', label: 'Address Details'},
  { id: 'loanamount', label: 'Loan Amount Requested'}, 
  { id: 'aadhar', label: 'Aadhar Number'},
  { id: 'pannumber', label: 'Pan Number'}, 
];


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const  LoanListing = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [reciveData, setReciveData] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect( () => {
    if(props.loanInfos){
      setReciveData(props.loanInfos)
    }
  },[props.loanInfos]);

  return (
    <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Loan Details
        </Typography>
       
      </Toolbar>
    </AppBar><br/><br/><br/>
    <Paper className={classes.root}>

<TableContainer  className={classes.container}>
  <Table stickyHeader aria-label="sticky table">
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{ minWidth: column.minWidth }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {props.loanInfos && props.loanInfos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
        return (
          <TableRow hover role="checkbox" tabIndex={-1} key={i}>
            {columns.map((column) => {
              const value = row[column.id];
              return (
                <TableCell key={column.id} align={column.align}>
                  {column.format && typeof value === 'number' ? column.format(value) : value}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
</TableContainer>
<TablePagination
  rowsPerPageOptions={[5, 10, 15, 20]}
  component="div"
  count={reciveData.length}
  rowsPerPage={rowsPerPage}
  page={page}
  onChangePage={handleChangePage}
  onChangeRowsPerPage={handleChangeRowsPerPage}
/>

</Paper>

  </Dialog>
   
  );
};

function mapState(state){
  return{
    loanInfos: state.loanInfoRequest.loanInfo,
  };
}

const actionCreators = {
  
};


export default connect(mapState, actionCreators)(LoanListing);

