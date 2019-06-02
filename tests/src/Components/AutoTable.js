import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function AutoTable(props) {
    const {hederRows,rows } = props;
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ФИО студента</TableCell>
                    {hederRows.map((item, index) => {
                        return <TableCell key={index} align="right">{item}</TableCell>
                    })}
                    <TableCell>Общая оценка</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row, index) => (
                    <TableRow key={index}>
                        {row.map((item, indexRow) => {
                            return indexRow === 0
                                ? <TableCell key={indexRow} style={styles.tableCell}  component="th" scope="row">{item}</TableCell>
                                : <TableCell key={indexRow} style={styles.tableCell} align="right">{item}</TableCell>
                        })}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

const styles={
    tableCell:{
        maxWidth: "200px",
        minWidth: "170px",
    }
}

export default AutoTable;