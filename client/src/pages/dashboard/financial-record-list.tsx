import { useMemo, useState } from "react";
import { FinancialRecord, useFinancialRecords } from "../../contexts/financial-record-context"
import {useTable,Column,Row,CellProps} from 'react-table';

interface EditableCellProps extends CellProps<FinancialRecord> {
    updateRecord: (rowIndex: number, columnId: string, value: any) => void;
    editable: boolean;
}

const EditableCell : React.FC<EditableCellProps> = ({value: initialValue, row, column, updateRecord, editable}) =>{
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);
    
    // Determing if the user is editing, if so, render the input
    // if not, display the value if it is a string, otherwise convert to astring before displaying
    return (
    <div onClick={()=> editable && setIsEditing(true)}>
        {isEditing? 
        <input value={value} onChange={(e)=> setValue(e.target.value)} autoFocus style={{width: "100%"}}/>
        : typeof value === "string" 
        ? (value) 
        : (value.toString()) }
    </div>
    )
}

export const FinancialRecordList = () => {
    const {records} = useFinancialRecords();
    const columns : Array<Column<FinancialRecord>> = useMemo(()=>[
        {
            Header: "Description",
            accessor: "description",
            cell: (props) => (
                <EditableCell {...props} updateRecord={()=>null} editable={true}/>
            )
        }
    ])
    const {getTableBodyProps,getTableProps,rows,prepareRow,headerGroups} = useTable({
        columns,
        data: records,
    });

    return (
        <div className="table-container">
            <table {...getTableBodyProps()} className="table">
                <thead>
                    {headerGroups.map((hg) => (
                        <tr {...hg.getHeaderGroupProps()}>
                            {hg.headers.map((column) => (
                                <th {...column.getHeaderProps()} >{column.render("Header")}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row,idx) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell)=>(
                                    <td {...cell.getCellProps()}> {cell.render("Cell")}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};